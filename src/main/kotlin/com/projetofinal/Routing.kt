    package com.projetofinal

    //region Imports
    import com.projetofinal.rank_class.ClubeData
    import com.projetofinal.tables.Golo
    import com.projetofinal.tables.Cartoes
    import com.projetofinal.tables.Jogo
    import com.projetofinal.tables.NacionalidadesTable
    import com.projetofinal.funcs.hashPassword
    import com.projetofinal.funcs.isValidPassword
    import com.projetofinal.funcs.isAgeAbove13
    import com.projetofinal.funcs.calcularPontos
    import com.projetofinal.tables.Liga
    import com.projetofinal.tables.Clube
    import com.projetofinal.tables.Noticias
    import com.projetofinal.tables.KickTable
    import io.ktor.server.application.*
    import io.ktor.server.http.content.*
    import io.ktor.server.response.*
    import io.ktor.server.routing.*
    import io.ktor.server.request.*
    import org.jetbrains.exposed.sql.*
    import org.jetbrains.exposed.sql.transactions.transaction
    import java.time.LocalDate
    import java.time.format.DateTimeFormatter
    import io.ktor.http.HttpStatusCode
    import io.ktor.http.ContentType
    import io.ktor.server.routing.routing
    import io.ktor.server.response.respondRedirect
    import io.ktor.server.routing.post
    import java.time.LocalTime
    import java.sql.SQLException
    //endregion

    //region variaveis globais
    var isAdminLoggedIn: Boolean = false
    var isUserLoggedIn: Boolean = false
    //endregion

    // region configureRouting
    fun Application.configureRouting() {
        routing {
            // Rota para a página principal (redireciona para o homepage_adm.html)
            get("/") {
                call.respondRedirect("/static/index.html")

            }

            //region check-user/adm
            //region check-user
            get("/check-user") {
                println("Endpoint /check-user foi chamado")

                // Verifica se o usuário está logado
                if (isUserLoggedIn == false && isAdminLoggedIn == false) {
                    println("não tem usuário logado")
                    call.respond(HttpStatusCode.OK, "/static/index.html?erro=not_logged_in")
                } else {
                    // Verifica se o usuário é administrador
                    if (isAdminLoggedIn == true) {
                        println("Usuário administrador logado")
                        call.respond(HttpStatusCode.OK, "/static/homepage_adm.html")
                    } else {
                        println("Usuário normal logado")
                        call.respond(HttpStatusCode.OK, "user")
                    }
                }
            }
            //endregion

            //region check-adm
            get("/check-adm") {
                println("Endpoint /check-user foi chamado")

                // Verifica se o usuário está logado
                if (isUserLoggedIn == false && isAdminLoggedIn == false) {
                    println("não tem usuário logado")
                    call.respond(HttpStatusCode.OK, "/static/index.html?erro=not_logged_in")
                } else {
                    // Verifica se o usuário é administrador
                    if (isAdminLoggedIn == true) {
                        println("Usuário administrador logado")
                        call.respond(HttpStatusCode.OK, "adm")
                    } else {
                        println("Usuário normal logado")
                        call.respond(HttpStatusCode.OK, "/static/homepage.html")
                    }
                }
            }
            //endregion
            //endregion

            //region check-logout
            get("/logout") {
                println("Usuário fez logout")
                isAdminLoggedIn = false
                isUserLoggedIn = false
                call.respondRedirect("/static/index.html?status=logged_out")
            }
            //endregion

                //region register
            post("/register") {
                val params = call.receiveParameters()

                val username = params["username"] ?: ""
                val name = params["name"] ?: ""
                val email = params["email"] ?: ""
                val password = params["password"] ?: ""
                val birthdate = params["birthdate"] ?: ""
                val nationality = params["nationality"] ?: ""

                // Validação: Campos obrigatórios
                if (username.isBlank() || email.isBlank() || password.isBlank() || birthdate.isBlank()) {
                    call.respondRedirect("/static/registar.html?erro=campos_vazios")
                    return@post
                }

                // Validação: Data de nascimento
                val birthdateParsed = try {
                    LocalDate.parse(birthdate, DateTimeFormatter.ISO_DATE)
                } catch (e: Exception) {
                    null
                }

                if (birthdateParsed == null || !isAgeAbove13(birthdateParsed)) {
                    call.respondRedirect("/static/registar.html?erro=idade_invalida")
                    return@post
                }

                // Verificação: Nacionalidade existente no banco de dados
                val nationalityExists = transaction {
                    NacionalidadesTable.select { NacionalidadesTable.nacionalidade eq nationality }.count() > 0
                }


                if (!nationalityExists) {
                    call.respondRedirect("/static/registar.html?erro=nacionalidade_invalida")
                    return@post
                }

                // Validação: Senha forte
                if (!isValidPassword(password)) {
                    call.respondRedirect("/static/registar.html?erro=senha_fraca")
                    return@post
                }

                // Verificação no banco de dados: Username ou e-mail já existe
                val userExists = transaction {
                    KickTable.select {
                        (KickTable.username eq username) or (KickTable.email eq email)
                    }.count() > 0
                }

                if (userExists) {
                    call.respondRedirect("/static/registar.html?erro=usuario_existente")
                    return@post
                }

                // Criptografar a senha antes de salvar
                val encryptedPassword = hashPassword(password)

                // Inserir os dados no banco de dados via stored procedure
                try {
                    transaction {
                        exec(
                            """
                    CALL InsertKickUser(
                        '$username',
                        '$name',
                        '$nationality',
                        '$email',
                        '$birthdateParsed',
                        '$encryptedPassword'
                    )
                    """.trimIndent()
                        )
                    }
                    call.respondRedirect("/static/index.html?status=success")
                } catch (e: Exception) {
                    call.respondRedirect("/static/registar.html?erro=erro_interno")
                }
            }
            //endregion

            //region login
            post("/login") {
                val params = call.receiveParameters()
                val username = params["username"] ?: ""
                val password = params["password"] ?: ""

                if (username.isBlank() || password.isBlank()) {
                    call.respondRedirect("/static/index.html?erro=campos_vazios")
                    return@post
                }

                val userExists = transaction {
                    KickTable.select { KickTable.username eq username }.firstOrNull()
                }

                if (userExists == null) {
                    call.respondRedirect("/static/index.html?erro=invalid")
                    return@post
                }

                val encryptedPassword = hashPassword(password)
                if (userExists[KickTable.password] != encryptedPassword) {
                    call.respondRedirect("/static/index.html?erro=invalid")
                    return@post
                }

                val isAdmin = userExists[KickTable.adm] == 1

                // Redirecionar com base no valor de 'adm'
                if (isAdmin) {
                    isAdminLoggedIn = isAdmin
                    call.respondRedirect("/static/homepage_adm.html")
                } else {
                    isUserLoggedIn = true;
                    call.respondRedirect("/static/homepage.html")
                }
            }
            //endregion

            //region news

            //region create-news
            post("/create-news") {
                val params = call.receiveParameters()
                val title = params["title"]
                val content = params["content"]
                val category = params["category"]

                // Verificar se os campos estão vazios ou se a categoria está com o valor padrão "all"
                if (title.isNullOrBlank() || content.isNullOrBlank() || category.isNullOrBlank() || category == "all") {
                    call.respondRedirect("/static/criar_noticias.html?status=error")
                    return@post
                }

                // Lógica para salvar a notícia no banco de dados
                try {
                    transaction {
                        exec(
                            """
                    CALL InserirNoticias(
                        '$title',
                        '$content',
                        '$category'
          
                    )
                    """.trimIndent()
                        )
                    }
                    call.respondRedirect("/static/criar_noticias.html?status=success")
                } catch (e: Exception) {
                    call.respondRedirect("/static/criar_noticias.html?status=error")
                }
            }
            //endregion

            //region /news
            get("/news") {
                // Consultando as notícias no banco de dados
                val newsList = transaction {
                    Noticias.selectAll().map {
                        "${it[Noticias.tituloNoticias]} - ${it[Noticias.descricaoNoticias]} - ${it[Noticias.categoria]}"
                    }
                }

                // Convertendo a lista em uma string e retornando como resposta
                call.respondText(newsList.joinToString("\n"))
            }
            //endregion

            //endregion

            //region users

            //region users
            get("/users") {
                try {
                    // Consultando os usuários no banco de dados
                    val userList = transaction {
                        KickTable.selectAll().map {
                            "${it[KickTable.username]} - ${it[KickTable.name]} - ${it[KickTable.email]} - ${it[KickTable.nationality]} - ${it[KickTable.adm]}"
                        }
                    }

                    call.respondText(userList.joinToString("\n"), contentType = ContentType.Text.Plain)
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.InternalServerError, "Erro ao buscar usuários: ${e.message}")
                }
            }
            //endregion

            //region delete-user
            post("/delete-user") {
                val params = call.receiveParameters()
                val username = params["username"] ?: ""

                if (username.isBlank()) {
                    call.respondRedirect("/static/gerir_users.html?erro=usuario_nao_encontrado")
                    return@post
                }

                try {
                    println("Deletando usuário: $username") // Verifique se o username é correto
                    transaction {
                        exec(
                            """
                CALL delete_user_by_username('$username')
                """.trimIndent()
                        )
                    }
                    call.respondRedirect("/static/gerir_users.html?status=sucesso")
                } catch (e: Exception) {
                    e.printStackTrace() // Log para verificar o erro
                    call.respondRedirect("/static/gerir_users.html?erro=erro_interno")
                }
            }
            //endregion

            //region toggle_admin
            post("/toggle_admin") {
                try {
                    // Receber os parâmetros enviados na requisição
                    val parameters = call.receiveParameters()
                    println("Parâmetros recebidos: $parameters") // Log para verificar os parâmetros recebidos

                    val username = parameters["username"] // Extrai o username enviado no body

                    if (username == null) {
                        // Se os parâmetros não forem enviados ou forem inválidos, retorna erro
                        println("Erro: username não foi enviado.") // Log para identificar problema
                        call.respond(HttpStatusCode.BadRequest, "Parâmetros inválidos")
                        return@post
                    }

                    try {
                        println("Tentando executar a query para o username: $username") // Log antes da execução da query

                        transaction {
                            exec(
                                """
                    CALL toggle_adm_value_by_username(
                        '$username'
                    )
                    """.trimIndent()
                            )
                        }

                        println("Query executada com sucesso para o username: $username") // Log de sucesso
                        call.respond(HttpStatusCode.OK, "Status de admin alterado com sucesso")
                    } catch (e: Exception) {
                        // Caso ocorra algum erro inesperado
                        println("Erro ao executar a query: ${e.message}") // Log do erro
                        call.respond(HttpStatusCode.InternalServerError, "Erro ao processar a requisição: ${e.message}")
                    }
                } catch (e: Exception) {
                    // Log para erros gerais na requisição
                    println("Erro ao processar a requisição: ${e.message}")
                    call.respond(HttpStatusCode.InternalServerError, "Erro ao processar a requisição: ${e.message}")
                }
            }
            //endregion
            //endregion

            //region liga

            //region create-liga
            post("/create-liga") {
                val params = call.receiveParameters()
                val Nomedaliga = params["Nomedaliga"]
                val Descricaodaliga = params["Descricaodaliga"]
                val Numeromaximo = params["Numeromaximo"]?.toIntOrNull()

                // Verificar se os campos estão vazios
                if (Nomedaliga.isNullOrBlank() || Descricaodaliga.isNullOrBlank() || Numeromaximo == null) {
                    call.respondRedirect("/static/liga.html?status=error_criar")
                    return@post
                }

                try {
                    // Tenta salvar a liga no banco de dados
                    transaction {
                        exec(
                            """
                CALL Criar_Liga(
                    '$Nomedaliga',
                    '$Descricaodaliga',
                    $Numeromaximo
                )
                """.trimIndent()
                        )
                    }
                    call.respondRedirect("/static/liga.html?status=success_criar")
                } catch (e: Exception) {
                    if (e.message?.contains("unique constraint", true) == true ||
                        e.message?.contains("duplicate", true) == true
                    ) {
                        // Liga com nome duplicado
                        call.respondRedirect("/static/liga.html?status=exists_criar")
                    } else {
                        // Outro erro
                        call.respondRedirect("/static/liga.html?status=error_criar")
                    }
                }
            }
            //endregion

            //region edit-liga
            post("/edit-liga") {

                val params = call.receiveParameters()
                val leagueId = params["leagueId"]
                val leagueName = params["name"]
                val leagueDescription = params["description"]
                val maxClubs = params["maxClubs"]?.toIntOrNull()

                // Realizar validação dos campos obrigatórios
                if (leagueId.isNullOrBlank() || leagueName.isNullOrBlank() || leagueDescription.isNullOrBlank() || maxClubs == null) {
                    call.respondRedirect("/static/liga.html?status=campos_obrigatorios_editar")
                    return@post
                }
                // Verificar a quantidade de clubes associados à liga
                val clubCount = transaction {
                    Clube.select { Clube.liga eq leagueId }
                        .count()  // Conta o número de clubes que estão associados à liga
                }
                // Verificar se o número de clubes é menor que o valor de maxClubs
                if (clubCount > maxClubs) {
                    // Se o número de clubes for menor que o limite, exibe um erro
                    call.respondRedirect("/static/liga.html?status=num_clubes_menor_que_max_editar")
                    return@post
                }


                // Verificar se o nome da nova liga já existe em outra liga (diferente do leagueId)
                val duplicateLeague = transaction {
                    Liga.select {
                        (Liga.Nomedaliga eq leagueName) and (Liga.Nomedaliga neq leagueId)
                    }.singleOrNull()
                }

                if (duplicateLeague != null) {
                    // Caso exista uma liga com o mesmo nome, redireciona com erro
                    call.respondRedirect("/static/liga.html?status=liga_ja_existente_editar")
                    return@post
                }

                try {
                    transaction {
                        exec(
                            """
                    CALL Editar_Liga(
                        '$leagueName',
                        '$leagueDescription',
                        '$maxClubs'
          
                    )
                    """.trimIndent()
                        )
                    }
                    call.respondRedirect("/static/liga.html?status=success_editar")
                } catch (e: Exception) {
                    call.respondRedirect("/static/liga.html?status=error_editar")
                }

            }
            //endregion

            //region liga
            get("/liga") {

                try {
                    // Consultando as ligas no banco de dados
                    val ligas = transaction {
                        Liga.selectAll().map {
                            "${it[Liga.Nomedaliga]} - ${it[Liga.DescricaoDaLiga]} - ${it[Liga.NumeroMaximo]}"
                        }
                    }
                    // Responde com os dados formatados
                    call.respondText(ligas.joinToString("\n"))
                } catch (e: Exception) {
                    println("Erro ao consultar a tabela 'liga': ${e.message}") // DEBUG: Erro na transação
                    e.printStackTrace() // DEBUG: Stack trace completo no console

                    // Responde com erro ao cliente
                    call.respondText(
                        "Erro ao buscar ligas no banco de dados",
                        status = HttpStatusCode.InternalServerError
                    )
                }
            }
            //endregion

            //region delete-liga
            post("/delete-liga") {
                val params = call.receiveParameters()
                val nomeDaLiga = params["NomeDaLiga"]

                // Verificar se o nome da liga foi fornecido
                if (nomeDaLiga.isNullOrBlank()) {
                    call.respondRedirect("/static/liga.html?status=error_delete")
                    return@post
                }

                // Lógica para excluir a liga no banco de dados
                try {
                    transaction {
                        exec(
                            """
                CALL Excluir_Liga(
                    '$nomeDaLiga'
                )
            """.trimIndent()
                        )
                    }
                    call.respondRedirect("/static/liga.html?status=success_delete")
                } catch (e: Exception) {
                    call.respondRedirect("/static/liga.html?status=error_delete")
                }

            }
            //endregion

            //endregion

            //region clube

            //region create-clube
            post("/create-clube") {
                val params = call.receiveParameters() // Função suspensa chamada corretamente

                val nomeEquipe = params["NomeEquipe"]
                val liga = params["Liga"]
                val nomeTreinador = params["NomeTreinador"]
                val anoFundacao = params["AnoFundacao"]?.toIntOrNull()
                val jogadores = params["Jogadores"]

                println("NomeEquipe: $nomeEquipe")
                println("Liga: $liga")
                println("NomeTreinador: $nomeTreinador")
                println("AnoFundacao: $anoFundacao")
                println("Jogadores: $jogadores")

                // Verificar se todos os campos obrigatórios estão preenchidos
                if (nomeEquipe.isNullOrBlank() || liga.isNullOrBlank() || nomeTreinador.isNullOrBlank() ||
                    anoFundacao == null || jogadores.isNullOrBlank()
                ) {
                    println("Erro: Algum campo está vazio ou inválido")
                    call.respondRedirect("/static/clube.html?status=error")
                    return@post
                }

                // Verificar se a liga fornecida existe
                val ligaExiste = transaction {
                    Liga.select { Liga.Nomedaliga eq liga }.singleOrNull()
                }

                if (ligaExiste == null) {
                    println("Erro: A liga '$liga' não existe")
                    call.respondRedirect("/static/clube.html?status=liga_not_exists")
                    return@post
                }

                // Verificar se já existe um clube com o mesmo nome
                val clubeExiste = transaction {
                    Clube.select { Clube.nomeEquipa eq nomeEquipe }.count() > 0
                }

                if (clubeExiste) {
                    println("Erro: Já existe um clube com o nome '$nomeEquipe'")
                    call.respondRedirect("/static/clube.html?status=clube_exists")
                    return@post
                }

                // Inserir o novo clube na tabela Clube
                try {
                    transaction {
                        exec(
                            """
                CALL InserirClube(
                    '$nomeEquipe',
                    '$liga',
                    '$nomeTreinador',
                    '$anoFundacao',
                    '$jogadores'
                )
                """.trimIndent()
                        )
                    }
                    println("Clube inserido com sucesso")
                    call.respondRedirect("/static/clube.html?status=success")
                } catch (e: Exception) {
                    println("Erro ao inserir o clube: ${e.message}")
                    call.respondRedirect("/static/clube.html?status=error")
                }
            }
            //endregion

            //region clube
            get("/clube") {
                try {
                    val clubes = transaction {
                        Clube.selectAll().map {
                            // Verifica se o campo 'jogadores' é nulo e, caso seja, substitui por uma string vazia
                            val jogadores =
                                it[Clube.jogadores]?.replace(" ", "_") ?: "" // Caso seja null, retorna uma string vazia
                            "${it[Clube.nomeEquipa]} - ${it[Clube.liga]} - ${it[Clube.nomeTreinador]} - ${it[Clube.anoFundacao]} - $jogadores"
                        }
                    }

                    call.respondText(clubes.joinToString("\n"))
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.InternalServerError, "Erro ao processar a solicitação: ${e.message}")
                }
            }
            //endregion

            //region delete-clube
            post("/delete-clube") {
                val params = call.receiveParameters()
                val clube = params["clube"]

                // Verificar se o nome da liga foi fornecido
                if (clube.isNullOrBlank()) {
                    call.respondRedirect("/static/clube.html?status=error_delete")
                    return@post
                }

                // Lógica para excluir a liga no banco de dados
                try {
                    transaction {
                        exec(
                            """
                CALL DeleteClube(
                    '$clube'
                )
            """.trimIndent()
                        )
                    }
                    call.respondRedirect("/static/clube.html?status=success_delete")
                } catch (e: Exception) {
                    call.respondRedirect("/static/clube.html?status=error_delete")
                }

            }
            //endregion

            //region edit-clube
            post("/edit-clube") {
                val params = call.receiveParameters() // Função suspensa chamada corretamente
                val nomeAntigo = params["NomeEquipe"]
                val nomeEquipe = params["nome-novo"]
                val liga = params["Liga"]
                val nomeTreinador = params["NomeTreinador"]
                val anoFundacao = params["AnoFundacao"]?.toIntOrNull()
                val jogadores = params["Jogadores"]

                println("NomeEquipe_antigo: $nomeAntigo")
                println("NomeEquipe_atual: $nomeEquipe")
                println("Liga: $liga")
                println("NomeTreinador: $nomeTreinador")
                println("AnoFundacao: $anoFundacao")
                println("Jogadores: $jogadores")

                // Verificar se todos os campos obrigatórios estão preenchidos
                if (nomeEquipe.isNullOrBlank() || liga.isNullOrBlank() || nomeTreinador.isNullOrBlank() ||
                    anoFundacao == null || jogadores.isNullOrBlank() || nomeAntigo.isNullOrBlank()
                ) {
                    println("Erro: Algum campo está vazio ou inválido")
                    call.respondRedirect("/static/clube.html?status=error_edit")
                    return@post
                }

                // Verificar se a liga fornecida existe
                val ligaExiste = transaction {
                    Liga.select { Liga.Nomedaliga eq liga }.singleOrNull()
                }

                if (ligaExiste == null) {
                    println("Erro: A liga '$liga' não existe")
                    call.respondRedirect("/static/clube.html?status=liga_not_exists")
                    return@post
                }


                val clubeExiste = transaction {
                    Clube.select { (Clube.nomeEquipa eq nomeEquipe) and (Clube.nomeEquipa neq nomeAntigo) }.count() > 0
                }

                if (clubeExiste) {
                    println("Erro: Já existe um clube com o nome '$nomeEquipe', diferente do nome antigo")
                    call.respondRedirect("/static/clube.html?status=clube_exists")
                    return@post
                }

                // Atualizar o clube na tabela Clube
                try {
                    transaction {
                        exec(
                            """
                CALL AtualizarClube(
                    '$nomeAntigo',
                    '$nomeEquipe',
                    '$liga',
                    '$nomeTreinador',
                    '$anoFundacao',
                    '$jogadores'
                )
                """.trimIndent()
                        )
                    }
                    println("Clube atualizado com sucesso")
                    call.respondRedirect("/static/clube.html?status=success_edit")
                } catch (e: Exception) {
                    println("Erro ao atualizar o clube: ${e.message}")
                    call.respondRedirect("/static/clube.html?status=error_edit")
                }
            }
            //endregion

            //endregion

            //region game

            //region create-game
            post("/create-game") {
                val parameters = call.receiveParameters()
                val gameDate = parameters["game_date"]
                val gameTime = parameters["game_time"]
                val homeTeam = parameters["home_team"]
                val awayTeam = parameters["away_team"]

                if (gameDate.isNullOrBlank() || gameTime.isNullOrBlank() || homeTeam.isNullOrBlank() || awayTeam.isNullOrBlank()) {
                    call.respondRedirect("/static/jogos.html?status=error_campos")
                    return@post
                }

                val currentDate = LocalDate.now()
                val currentTime = LocalTime.now()

                val gameDateParsed = LocalDate.parse(gameDate)
                val gameTimeParsed = LocalTime.parse(gameTime)

                if (gameDateParsed.isBefore(currentDate) ||
                    (gameDateParsed.isEqual(currentDate) && gameTimeParsed.isBefore(currentTime))
                ) {
                    call.respondRedirect("/static/jogos.html?status=error_date_time")
                    return@post
                }

                if (homeTeam == awayTeam) {
                    call.respondRedirect("/static/jogos.html?status=error_same_teams")
                    return@post
                }

                val gameName = "${homeTeam.replace(" ", "").lowercase()}VS${awayTeam.replace(" ", "").lowercase()}"

                val gameExists = transaction {
                    Jogo.select { Jogo.jogo eq gameName }.count() > 0
                }

                if (gameExists) {
                    call.respondRedirect("/static/jogos.html?status=error_game_exists")
                    return@post
                }

                // Verificar se as equipes já têm jogos agendados para o mesmo dia
                val teamsAlreadyHaveGame = transaction {
                    Jogo.select {
                        (Jogo.data_ eq gameDateParsed) and (
                                (Jogo.equipCasa eq homeTeam) or
                                        (Jogo.equipFora eq homeTeam) or
                                        (Jogo.equipCasa eq awayTeam) or
                                        (Jogo.equipFora eq awayTeam)
                                )
                    }.count() > 0
                }
                val teamsSameLeague = transaction {
                    val homeTeamLeague = Clube.select { Clube.nomeEquipa eq homeTeam }
                        .singleOrNull()?.get(Clube.liga)
                    val awayTeamLeague = Clube.select { Clube.nomeEquipa eq awayTeam }
                        .singleOrNull()?.get(Clube.liga)

                    // Prints para depuração
                    println("Liga da equipe da casa ($homeTeam): $homeTeamLeague")
                    println("Liga da equipe visitante ($awayTeam): $awayTeamLeague")

                    // Verificar se ambas as equipes têm liga e se as ligas são iguais
                    val areTeamsInSameLeague = homeTeamLeague != null && awayTeamLeague != null && homeTeamLeague == awayTeamLeague
                    println("As equipes estão na mesma liga? $areTeamsInSameLeague")

                    return@transaction areTeamsInSameLeague
                }
                if (!teamsSameLeague) {
                    call.respondRedirect("/static/jogos.html?status=error_different_league")
                    return@post
                }


                if (teamsAlreadyHaveGame) {
                    call.respondRedirect("/static/jogos.html?status=error_teams_already_have_game")
                    return@post
                }

                try {
                    transaction {
                        exec(
                            """
                CALL criar_jogo(
                    '$gameName',
                    '$gameDate',
                    '$gameTime',
                    '$homeTeam',
                    '$awayTeam'
                )
                """.trimIndent()
                        )
                    }
                    println("Jogo inserido com sucesso")
                    call.respondRedirect("/static/jogos.html?status=success_create")
                } catch (e: Exception) {
                    println("Erro ao inserir o jogo: ${e.message}")
                    call.respondRedirect("/static/jogos.html?status=error_create")
                }
            }
            //endregion

            //region games
            get("/get-games") {
                try {
                    val games = transaction {
                        Jogo.select { Jogo.estado eq "pendente" }.map {
                            "${it[Jogo.jogo]} - Data: ${it[Jogo.data_]} - Hora: ${it[Jogo.hora]}"
                        }
                    }

                    if (games.isEmpty()) {
                        call.respondText(
                            "Nenhum jogo com estado 'dependente' encontrado.",
                            status = HttpStatusCode.NotFound
                        )
                    } else {
                        call.respondText(games.joinToString("\n"), contentType = ContentType.Text.Plain)
                    }
                } catch (e: Exception) {
                    call.respondText(
                        "Erro ao carregar jogos: ${e.localizedMessage}",
                        status = HttpStatusCode.InternalServerError
                    )
                }
            }

            //endregion

            //region delete-game
            post("/delete-game") {
                val parameters = call.receiveParameters()
                val game = parameters["game"]

                if (game.isNullOrBlank()) {
                    call.respondRedirect("/static/jogos.html?status=jogo_nao_encontrado")
                    return@post
                }

                try {
                    transaction {
                        exec(
                            """
                CALL excluir_jogo('$game')
                """.trimIndent()
                        )
                    }
                    call.respondRedirect("/static/jogos.html?status=sucesso-delete")
                } catch (e: Exception) {
                    e.printStackTrace()
                    call.respondRedirect("/static/jogos.html?status=erro-delete")
                }
            }
            //endregion

            //region edit-game
            post("/edit-game") {
                val params = call.receiveParameters() // Função suspensa chamada corretamente
                val jogo = params["game"]
                val data = params["date"]
                val hora = params["hora"]

                // Verificar se todos os campos obrigatórios estão preenchidos
                if (jogo.isNullOrBlank() || data.isNullOrBlank() || hora.isNullOrBlank()) {

                    call.respondRedirect("/static/jogos.html?status=error_campos")
                    return@post
                }

                val currentDate = LocalDate.now()
                val currentTime = LocalTime.now()

                val gameDateParsed = LocalDate.parse(data)
                val gameTimeParsed = LocalTime.parse(hora)

                if (gameDateParsed.isBefore(currentDate) ||
                    (gameDateParsed.isEqual(currentDate) && gameTimeParsed.isBefore(currentTime))
                ) {
                    call.respondRedirect("/static/jogos.html?status=error_date_time_edit")
                    return@post
                }

                // Atualizar o clube na tabela Clube
                try {
                    transaction {
                        exec(
                            """
                CALL EditarDataHoraJogo(
                    '$jogo',
                    '$data',
                    '$hora'
                )
                """.trimIndent()
                        )
                    }
                    println("Clube atualizado com sucesso")
                    call.respondRedirect("/static/jogos.html?status=success_edit")
                } catch (e: Exception) {
                    println("Erro ao atualizar o clube: ${e.message}")
                    call.respondRedirect("/static/jogos.html?status=error-edit")
                }
            }
            //endregion
            //endregion

            //region edit-result
            //region load-game
            get("/load-game") {
                try {
                    // Obter a data de hoje
                    val today = LocalDate.now()

                    // Lista para armazenar os dados do jogo
                    val games = transaction {
                        Jogo
                            .select { (Jogo.data_ eq today) and (Jogo.estado neq "Terminado") }
                            .map { jogoRow ->
                                val jogoId = jogoRow[Jogo.jogo]
                                val estado = jogoRow[Jogo.estado]
                                val hora = jogoRow[Jogo.hora]

                                // Contagem dos gols por equipe
                                var golosCasaCount = Golo
                                    .select { (Golo.jogo eq jogoId) and (Golo.club eq jogoRow[Jogo.equipCasa]) }
                                    .count()

                                var golosForaCount = Golo
                                    .select { (Golo.jogo eq jogoId) and (Golo.club eq jogoRow[Jogo.equipFora]) }
                                    .count()

                                // Contando os autogols e atualizando as equipes
                                val autogolosCasa = Golo
                                    .select { (Golo.jogo eq jogoId) and (Golo.club eq jogoRow[Jogo.equipFora]) and (Golo.tipoGolo eq "autogol") }
                                    .count()

                                val autogolosFora = Golo
                                    .select { (Golo.jogo eq jogoId) and (Golo.club eq jogoRow[Jogo.equipCasa]) and (Golo.tipoGolo eq "autogol") }
                                    .count()

                                // Atualizando as contagens de gols
                                golosCasaCount -= autogolosFora  // Autogolos contra a casa
                                golosForaCount -= autogolosCasa  // Autogolos contra a fora
                                golosCasaCount += autogolosCasa // Autogolos a favor da casa (considerando o autogolo)
                                golosForaCount += autogolosFora // Autogolos a favor da fora (considerando o autogolo)

                                // Obtendo os jogadores que marcaram gols para cada equipe
                                val jogadoresCasa = Clube
                                    .select { Clube.nomeEquipa eq jogoRow[Jogo.equipCasa] }
                                    .singleOrNull()?.get(Clube.jogadores)
                                    ?.split(",") ?: emptyList()

                                val jogadoresFora = Clube
                                    .select { Clube.nomeEquipa eq jogoRow[Jogo.equipFora] }
                                    .singleOrNull()?.get(Clube.jogadores)
                                    ?.split(",") ?: emptyList()

                                // Construção de uma string para cada jogo
                                "Jogo: $jogoId\n" +
                                        "Hora: $hora\n" +
                                        "Estado: $estado\n" +
                                        "Equipe Casa: ${jogoRow[Jogo.equipCasa]} - Gols: $golosCasaCount - Jogadores: ${
                                            jogadoresCasa.joinToString(
                                                ", "
                                            )
                                        }\n" +
                                        "Equipe Fora: ${jogoRow[Jogo.equipFora]} - Gols: $golosForaCount - Jogadores: ${
                                            jogadoresFora.joinToString(
                                                ", "
                                            )
                                        }\n"
                            }
                    }
                    // Retornando a lista como texto
                    call.respondText(games.joinToString("\n\n"), contentType = ContentType.Text.Plain)
                } catch (e: Exception) {
                    call.respondText(
                        "Erro ao carregar os jogos: ${e.message}",
                        status = HttpStatusCode.InternalServerError
                    )
                }
            }
            //endregion

            //region Goal
            post("/submit-goal") {
                // Recebendo os parâmetros do formulário via x-www-form-urlencoded
                val parameters = call.receiveParameters()
                val goalType = parameters["goalType"] ?: "desconhecido"
                val player = parameters["player"] ?: "desconhecido"
                val club = parameters["club"] ?: "desconhecido"

                // Verificando se algum campo está vazio
                if (goalType.isBlank() || player.isBlank() || club.isBlank()) {
                    call.respondRedirect("/static/editar_resultado.html?status=campos_vazios")
                    return@post
                }

                // Verificando se o clube existe dentro de uma transação
                try {
                    val clubeValido = transaction {
                        Clube.select { Clube.nomeEquipa eq club }.singleOrNull() != null
                    }

                    if (!clubeValido) {
                        call.respondRedirect("/static/editar_resultado.html?status=clube-nao-existe")
                        return@post
                    }

                    val hoje = LocalDate.now()

                    // Consultando o jogo dentro da mesma transação
                    val jogo = transaction {
                        Jogo.select {
                            (Jogo.data_ eq hoje) and
                                    ((Jogo.equipCasa eq club) or (Jogo.equipFora eq club))
                        }.singleOrNull()
                    }

                    if (jogo != null) {
                        val nomeJogo = jogo[Jogo.jogo]
                        val estadoJogo = jogo[Jogo.estado]
                        if (estadoJogo != "Em andamento") {
                            call.respondRedirect("/static/editar_resultado.html?status=jogo-nao-em-andamento")
                            return@post
                        }

                        // Verificando se o jogador tem dois amarelos ou um vermelho
                        val cartoes = transaction {
                            Cartoes.select {
                                (Cartoes.jogo eq nomeJogo) and
                                        (Cartoes.jogador eq player) and
                                        (Cartoes.club eq club)
                            }.toList()
                        }

                        val amarelos = cartoes.count { it[Cartoes.tipoCartao] == "amarelo" }
                        val vermelhos = cartoes.count { it[Cartoes.tipoCartao] == "vermelho" }

                        // Se o jogador tem 2 cartões amarelos ou 1 vermelho
                        if (amarelos >= 2 || vermelhos >= 1) {
                            call.respondRedirect("/static/editar_resultado.html?status=erro-cartao-vermelho-ou-amarelo")
                            return@post
                        }

                        // Chamada para o stored procedure, inserindo o gol
                        transaction {
                            exec(
                                """
                    CALL inserir_gol(
                        '$nomeJogo',  -- Passando nomeJogo para a SP
                        '$player',     -- Passando o nome do clube
                        '$club',   -- Passando o nome do jogador
                        '$goalType'  -- Passando o tipo do gol
                    )
                """.trimIndent()
                            )
                        }
                    } else {
                        call.respondRedirect("/static/editar_resultado.html?status=jogo-nao-encontrado")
                        return@post
                    }

                    // Redirecionamento com sucesso (exemplo)
                    call.respondRedirect("/static/editar_resultado.html?status=sucesso-golo")
                } catch (e: Exception) {
                    println("Erro ao processar o gol: ${e.message}")
                    call.respondRedirect("/static/editar_resultado.html?status=erro-processamento")
                }
            }
            //endregion

            //region card
            post("/submit-card") {
                // Recebendo os parâmetros do formulário via x-www-form-urlencoded
                val parameters = call.receiveParameters()
                val card_type = parameters["card_type"] ?: "desconhecido"
                val player = parameters["player"] ?: "desconhecido"
                val club = parameters["club"] ?: "desconhecido"

                // Verificando se algum campo está vazio
                if (card_type.isBlank() || player.isBlank() || club.isBlank()) {
                    call.respondRedirect("/static/editar_resultado.html?status=campos_vazios")
                    return@post
                }

                // Verificando se o clube existe dentro de uma transação
                try {
                    val clubeValido = transaction {
                        Clube.select { Clube.nomeEquipa eq club }.singleOrNull() != null
                    }

                    if (!clubeValido) {
                        call.respondRedirect("/static/editar_resultado.html?status=clube-nao-existe")
                        return@post
                    }

                    val hoje = LocalDate.now()

                    // Consultando o jogo dentro da mesma transação
                    val jogo = transaction {
                        Jogo.select {
                            (Jogo.data_ eq hoje) and
                                    ((Jogo.equipCasa eq club) or (Jogo.equipFora eq club))
                        }.singleOrNull()
                    }

                    if (jogo != null) {
                        val nomeJogo = jogo[Jogo.jogo]
                        val estadoJogo = jogo[Jogo.estado]
                        if (estadoJogo != "Em andamento") {
                            call.respondRedirect("/static/editar_resultado.html?status=jogo-nao-em-andamento")
                            return@post
                        }

                        // Verificando se o jogador tem dois amarelos ou um vermelho
                        val cartoes = transaction {
                            Cartoes.select {
                                (Cartoes.jogo eq nomeJogo) and
                                        (Cartoes.jogador eq player) and
                                        (Cartoes.club eq club)
                            }.toList()
                        }

                        val amarelos = cartoes.count { it[Cartoes.tipoCartao] == "amarelo" }
                        val vermelhos = cartoes.count { it[Cartoes.tipoCartao] == "vermelho" }

                        // Se o jogador tem 2 cartões amarelos ou 1 vermelho
                        if (amarelos >= 2 || vermelhos >= 1) {
                            call.respondRedirect("/static/editar_resultado.html?status=erro-cartao-vermelho-ou-amarelo")
                            return@post
                        }

                        // Chamada para o stored procedure, inserindo o gol
                        transaction {
                            exec(
                                """
                    CALL inserir_cartao(
                        '$nomeJogo',  -- Passando nomeJogo para a SP
                        '$club',     -- Passando o nome do clube
                        '$player',   -- Passando o nome do jogador
                        '$card_type'  -- Passando o tipo do gol
                    )
                """.trimIndent()
                            )
                        }
                    } else {
                        call.respondRedirect("/static/editar_resultado.html?status=jogo-nao-encontrado")
                        return@post
                    }

                    // Redirecionamento com sucesso (exemplo)
                    call.respondRedirect("/static/editar_resultado.html?status=sucesso-card")
                } catch (e: Exception) {
                    println("Erro ao processar o gol: ${e.message}")
                    call.respondRedirect("/static/editar_resultado.html?status=erro-processamento")
                }
            }
            //endregion

            //region update-game-status
            post("/update-game-status") {
                // Recebe os parâmetros do corpo da requisição
                val parameters = call.receiveParameters()
                val jogoNome = parameters["jogoNome"]
                val status = parameters["status"]

                // Lista de status válidos
                val statusList = listOf("Pendente", "Intervalo", "Em andamento", "Terminado")

                // Verifica se o nome do jogo e o status foram fornecidos
                if (jogoNome == null || status == null) {
                    println("Erro: campos vazios")
                    call.respondText("/static/editar_resultado.html?status=campos_vazios")
                    return@post
                }

                // Verifica se o status fornecido é válido
                if (status !in statusList) {
                    println("Erro: status inválido")
                    call.respondText("/static/editar_resultado.html?status=status_invalido")
                    return@post
                }

                // Verifica se o jogo existe no banco de dados
                val jogo = transaction {
                    Jogo
                        .select { Jogo.jogo eq jogoNome }
                        .singleOrNull()
                }
                if (jogo == null) {
                    println("Erro: jogo não encontrado")
                    call.respondText("/static/editar_resultado.html?status=jogo_nao_encontrado")
                    return@post
                }

                val estadoAtual = jogo[Jogo.estado]
                println("Estado Atual: $estadoAtual")

                // Lógica de validação das transições de status
                when (estadoAtual) {
                    "Pendente" -> {
                        if (status != "Em andamento") {
                            println("Erro: transição inválida de Pendente para $status")
                            call.respondText("/static/editar_resultado.html?status=transicao_invalida")
                            return@post
                        }
                    }

                    "Em andamento" -> {
                        if (status != "Intervalo" && status != "Terminado") {
                            println("Erro: transição inválida de Em andamento para $status")
                            call.respondText("/static/editar_resultado.html?status=transicao_invalida")
                            return@post
                        }
                    }

                    "Intervalo" -> {
                        // Intervalo só pode ir para "Em andamento"
                        if (status != "Em andamento") {
                            println("Erro: transição inválida de Intervalo para $status")
                            call.respondText("/static/editar_resultado.html?status=transicao_invalida")
                            return@post
                        }
                    }

                    "Terminado" -> {
                        // "Terminado" não pode ser alterado para nenhum outro estado
                        println("Erro: transição inválida de Terminado para $status")
                        call.respondText("/static/editar_resultado.html?status=transicao_invalida")
                        return@post
                    }
                }

                // Atualiza o estado do jogo
                transaction {
                    Jogo
                        .update({ Jogo.jogo eq jogoNome }) {
                            it[Jogo.estado] = status
                        }
                }
                println("Estado do jogo atualizado para $status")

                // Se o estado for "Terminado", calcula os gols e define quem ganhou
                if (status == "Terminado") {
                    // Contabiliza os gols para a equipe da casa
                    val golsCasa = transaction {
                        Golo
                            .select { Golo.jogo eq jogoNome and (Golo.club eq jogo[Jogo.equipCasa]) }
                            .andWhere { Golo.tipoGolo neq "autogol" }  // Não conta gols contra
                            .count()
                    }
                    println("Gols Casa: $golsCasa")

                    // Contabiliza os gols contra para a equipe da casa
                    val golsContraCasa = transaction {
                        Golo
                            .select { Golo.jogo eq jogoNome and (Golo.club eq jogo[Jogo.equipCasa]) }
                            .andWhere { Golo.tipoGolo eq "autogol" }  // Conta gols contra
                            .count()
                    }
                    println("Gols Contra Casa: $golsContraCasa")

                    // Contabiliza os gols para a equipe visitante
                    val golsFora = transaction {
                        Golo
                            .select { Golo.jogo eq jogoNome and (Golo.club eq jogo[Jogo.equipFora]) }
                            .andWhere { Golo.tipoGolo neq "autogol" }  // Não conta gols contra
                            .count()
                    }
                    println("Gols Fora: $golsFora")

                    // Contabiliza os gols contra para a equipe visitante
                    val golsContraFora = transaction {
                        Golo
                            .select { Golo.jogo eq jogoNome and (Golo.club eq jogo[Jogo.equipFora]) }
                            .andWhere { Golo.tipoGolo eq "autogol" }  // Conta gols contra
                            .count()
                    }
                    println("Gols Contra Fora: $golsContraFora")

                    val totalGolsCasa = golsCasa + golsContraFora
                    val totalGolsFora = golsFora + golsContraCasa
                    var vitoriaCasa = 0
                    var vitoriaFora = 0
                    var derrotaCasa = 0
                    var derrotaFora = 0
                    var empate = 0  // Tornando 'empate' mutável

                    // Determina o vencedor, perdedor e se houve empate
                    val resultado = when {
                        totalGolsCasa > totalGolsFora -> {
                            vitoriaCasa = 1
                            derrotaFora = 1
                        }

                        totalGolsCasa < totalGolsFora -> {
                            vitoriaFora = 1
                            derrotaCasa = 1
                        }

                        else -> {
                            empate = 1
                        }
                    }
                    println("Resultado: $resultado")

                    val equipeCasa = jogo[Jogo.equipCasa]
                    val equipeFora = jogo[Jogo.equipFora]

                    try {
                        // Chamada para o stored procedure, inserindo o gol
                        println("Chamada para o procedimento armazenado para $equipeCasa")
                        transaction {
                            exec(
                                """
                CALL UpdateClubeStats(
                    '$equipeCasa',  
                    '$totalGolsCasa',     
                    '$totalGolsFora',   
                    '$vitoriaCasa',
                    '$empate',
                    '$derrotaCasa'
                )
            """.trimIndent()
                            )
                        }

                        println("Chamada para o procedimento armazenado para $equipeFora")
                        transaction {
                            exec(
                                """
                CALL UpdateClubeStats(
                    '$equipeFora',  
                    '$totalGolsFora',     
                    '$totalGolsCasa',   
                    '$vitoriaFora',
                    '$empate',
                    '$derrotaFora'
                )
            """.trimIndent()
                            )
                        }

                    } catch (e: Exception) {
                        println("Erro ao chamar o procedimento armazenado: ${e.message}")
                        call.respondRedirect("/static/editar_resultado.html?status=erro-processamento")
                        return@post
                    }
                }

                // Redireciona com status de sucesso
                println("Processamento bem-sucedido")
                call.respondText("/static/editar_resultado.html?status=sucesso-status")
            }
            //endregion

            //endregion

            //region show-game-resul

            get("/games-by-date") {
                try {
                    // Obtém os parâmetros da requisição
                    val parameters = call.request.queryParameters
                    val dateString = parameters["date"]

                    if (dateString == null) {
                        call.respond(HttpStatusCode.BadRequest, "Data não fornecida.")
                        return@get
                    }

                    // Converte a string para LocalDate
                    val date = LocalDate.parse(dateString)
                    println("Data recebida: $date")

                    // Consultando os jogos do dia
                    val jogosDoDia = transaction {
                        try {
                            println("Iniciando consulta dos jogos...")

                            val jogos = Jogo
                                .select { Jogo.data_ eq date } // Usar java.sql.Date para comparar apenas a data (sem hora)
                                .map { jogo ->

                                    // Dados do jogo
                                    val equipCasa = jogo[Jogo.equipCasa]
                                    val equipFora = jogo[Jogo.equipFora]
                                    val jogoNome = jogo[Jogo.jogo]

                                    // Coletando os gols e autogols
                                    val golsCasa = Golo.select { Golo.jogo eq jogoNome and (Golo.club eq equipCasa) and (Golo.tipoGolo eq "gol") }
                                        .map { it[Golo.jogador] to "gol" } // Tipo "gol"
                                    val autogolsCasa = Golo.select { Golo.jogo eq jogoNome and (Golo.club eq equipFora) and (Golo.tipoGolo eq "autogol") }
                                        .map { it[Golo.jogador] to "autogol" } // Tipo "autogol"

                                    val golsFora = Golo.select { Golo.jogo eq jogoNome and (Golo.club eq equipFora) and (Golo.tipoGolo eq "gol") }
                                        .map { it[Golo.jogador] to "gol" }
                                    val autogolsFora = Golo.select { Golo.jogo eq jogoNome and (Golo.club eq equipCasa) and (Golo.tipoGolo eq "autogol") }
                                        .map { it[Golo.jogador] to "autogol" }

                                    // Contando o total de gols e autogols
                                    val totalGolsCasa = golsCasa.size + autogolsCasa.size
                                    val totalGolsFora = golsFora.size + autogolsFora.size

                                    // Listando cartões para cada equipe
                                    val amarelosCasa = Cartoes.select {
                                        Cartoes.jogo eq jogoNome and (Cartoes.club eq equipCasa) and (Cartoes.tipoCartao eq "amarelo")
                                    }.map { it[Cartoes.jogador] }

                                    val vermelhosCasa = Cartoes.select {
                                        Cartoes.jogo eq jogoNome and (Cartoes.club eq equipCasa) and (Cartoes.tipoCartao eq "vermelho")
                                    }.map { it[Cartoes.jogador] }

                                    val amarelosFora = Cartoes.select {
                                        Cartoes.jogo eq jogoNome and (Cartoes.club eq equipFora) and (Cartoes.tipoCartao eq "amarelo")
                                    }.map { it[Cartoes.jogador] }

                                    val vermelhosFora = Cartoes.select {
                                        Cartoes.jogo eq jogoNome and (Cartoes.club eq equipFora) and (Cartoes.tipoCartao eq "vermelho")
                                    }.map { it[Cartoes.jogador] }

                                    // Retornando os dados do jogo como texto simples
                                    """
                        Jogo: $jogoNome
                        Equipos: $equipCasa x $equipFora
                        Hora: ${jogo[Jogo.hora]}
                        Estado: ${jogo[Jogo.estado]}
                        Gols Casa: $totalGolsCasa (${(golsCasa + autogolsCasa).joinToString(", ") { "${it.first} (${it.second})" }})
                        Gols Fora: $totalGolsFora (${(golsFora + autogolsFora).joinToString(", ") { "${it.first} (${it.second})" }})
                        Cartões Amarelos Casa: ${amarelosCasa.joinToString(", ")}
                        Cartões Vermelhos Casa: ${vermelhosCasa.joinToString(", ")}
                        Cartões Amarelos Fora: ${amarelosFora.joinToString(", ")}
                        Cartões Vermelhos Fora: ${vermelhosFora.joinToString(", ")}
                        """
                                }

                            println("Consulta concluída: ${jogos.size} jogos encontrados.")
                            jogos.joinToString("\n\n")  // Junta os jogos com uma linha em branco entre eles
                        } catch (e: Exception) {
                            println("Erro ao consultar os jogos: ${e.message}")
                            throw e // Re-throw a exceção para ser capturada pelo bloco outer
                        }
                    }

                    // Respondendo com os dados dos jogos como texto
                    call.respondText(jogosDoDia)
                } catch (e: Exception) {
                    println("Erro ao processar a requisição: ${e.message}")
                    call.respond(HttpStatusCode.InternalServerError, "Erro interno do servidor")
                }
            }

            //endregion

            //region rank
            get("/rank") {
                try {
                    // Obtém o nome da liga via parâmetro
                    val ligaNome = call.request.queryParameters["liga"]

                    if (ligaNome == null) {
                        call.respond(HttpStatusCode.BadRequest, "Liga não fornecida.")
                        return@get
                    }

                    // Verifica se a liga existe no banco de dados
                    val ligaExistente = transaction {
                        Clube
                            .select { Clube.liga eq ligaNome }
                            .limit(1)
                            .count() > 0
                    }

                    if (!ligaExistente) {
                        call.respond(HttpStatusCode.NotFound, "Liga não encontrada.")
                        return@get
                    }

                    // Consulta os clubes da liga fornecida dentro de uma transação
                    val clubes = transaction {
                        Clube
                            .select { Clube.liga eq ligaNome }
                            .mapNotNull {
                                val nome = it[Clube.nomeEquipa]
                                val jogos = it[Clube.jogos]
                                val vitorias = it[Clube.vitorias]
                                val empates = it[Clube.empates]
                                val derrotas = it[Clube.derrotas]
                                val golosMarcados = it[Clube.golosMarcados]
                                val golosSofridos = it[Clube.golosSofridos]
                                if (nome != null && jogos != null && vitorias != null && empates != null &&
                                    derrotas != null && golosMarcados != null && golosSofridos != null) {
                                    ClubeData(
                                        nome = nome,
                                        jogos = jogos,
                                        vitorias = vitorias,
                                        empates = empates,
                                        derrotas = derrotas,
                                        golosMarcados = golosMarcados,
                                        golosSofridos = golosSofridos,
                                        pontos = calcularPontos(vitorias, empates)
                                    )
                                } else {
                                    null
                                }
                            }
                    }

                    // Ordena os clubes por pontos e aplica os critérios de desempate
                    val clubesComDesempate = clubes.sortedWith { clube1, clube2 ->
                        // Primeiro, compara pelos pontos
                        val pontoCompare = clube2.pontos.compareTo(clube1.pontos)
                        if (pontoCompare != 0) return@sortedWith pontoCompare

                        // Caso os pontos sejam iguais, aplica os critérios de desempate
                        val vitoriaCompare = clube2.vitorias.compareTo(clube1.vitorias)
                        if (vitoriaCompare != 0) return@sortedWith vitoriaCompare

                        val empateCompare = clube2.empates.compareTo(clube1.empates)
                        if (empateCompare != 0) return@sortedWith empateCompare

                        val golosMarcadosCompare = clube2.golosMarcados.compareTo(clube1.golosMarcados)
                        if (golosMarcadosCompare != 0) return@sortedWith golosMarcadosCompare

                        val golosSofridosCompare = clube1.golosSofridos.compareTo(clube2.golosSofridos)
                        return@sortedWith golosSofridosCompare
                    }

                    // Formata o ranking como texto
                    var posicao = 1
                    val rankingTexto = clubesComDesempate.take(10).joinToString("\n\n") { clube ->
                        """
                        Posição: $posicao
                        Clube: ${clube.nome}
                        Jogos: ${clube.jogos}
                        Vitórias: ${clube.vitorias}
                        Empates: ${clube.empates}
                        Derrotas: ${clube.derrotas}
                        Gols Marcados: ${clube.golosMarcados}
                        Gols Sofridos: ${clube.golosSofridos}
                        Pontos: ${clube.pontos}
                    """.trimIndent().also { posicao++ }
                    }

                    // Envia o ranking como texto
                    call.respondText(rankingTexto)
                } catch (e: SQLException) {
                    println("Erro ao acessar os dados da liga: ${e.message}")
                    call.respond(HttpStatusCode.InternalServerError, "Erro ao acessar os dados da liga: ${e.message}")
                } catch (e: Exception) {
                    println("Erro ao processar a requisição: ${e.message}")
                    call.respond(HttpStatusCode.InternalServerError, "Erro interno do servidor")
                }
            }
            //endregion

            // Rota para arquivos estáticos
            static("/static") {
                resources("static")
            }
        }
    }

    //endregion

   /* data class ClubeData(
        val nome: String,
        val jogos: Int,
        val vitorias: Int,
        val empates: Int,
        val derrotas: Int,
        val golosMarcados: Int,
        val golosSofridos: Int,
        val pontos: Int
    )*/
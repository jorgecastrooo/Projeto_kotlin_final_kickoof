package com.projetofinal


import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.Database

fun Application.module() {

    configureRouting()
    initDatabase()
}

fun initDatabase() {
    // Configuração do HikariCP para conexão com o banco
    val config = HikariConfig().apply {
        driverClassName = "com.mysql.cj.jdbc.Driver"
        jdbcUrl = "jdbc:mysql://localhost:3306/kickoof"
        username = "root"
        password = "jorge123"
    }

    val dataSource = HikariDataSource(config)
    Database.connect(dataSource)

    // Teste simples para verificar a conexão
    try {
        dataSource.connection.use { connection ->
            if (connection.isValid(2)) {
                println("Conexão com o banco de dados estabelecida com sucesso!")
            } else {
                println("Falha ao conectar com o banco de dados.")
            }
        }
    } catch (e: Exception) {
        println("Erro ao testar conexão: ${e.message}")
    }
}
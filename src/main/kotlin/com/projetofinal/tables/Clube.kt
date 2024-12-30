package com.projetofinal.tables

import org.jetbrains.exposed.sql.Table

object Clube : Table("clube") {
    val nomeEquipa = varchar("Clube", 60) // Nome da equipe (chave primária)
    val liga = varchar("liga", 100).nullable() // Liga, pode ser nula
    val nomeTreinador = varchar("treinador", 60).nullable() // Nome do treinador, pode ser nulo
    val anoFundacao = integer("fundacao").nullable() // Ano de fundação, pode ser nulo
    val jogadores = varchar("jogadores", 1000).nullable() // Lista de jogadores, pode ser nula
    val jogos = integer("jogos").default(0) // Total de jogos disputados, valor inicial é 0
    val vitorias = integer("vitorias").default(0) // Total de vitórias, valor inicial é 0
    val empates = integer("empates").default(0) // Total de empates, valor inicial é 0
    val derrotas = integer("derrotas").default(0) // Total de derrotas, valor inicial é 0
    val golosMarcados = integer("golos_marcados").default(0) // Total de gols marcados, valor inicial é 0
    val golosSofridos = integer("golos_sofridos").default(0) // Total de gols sofridos, valor inicial é 0
}


package com.projetofinal.tables

import org.jetbrains.exposed.sql.Table

object Golo : Table("golo") {
    val idGolo = integer("idgolo").autoIncrement()
    val jogo = varchar("jogo", 100)
    val jogador = varchar("jogador", 100)
    val club = varchar("clube", 100)
    val tipoGolo = varchar("tipo_golo", 100)
}

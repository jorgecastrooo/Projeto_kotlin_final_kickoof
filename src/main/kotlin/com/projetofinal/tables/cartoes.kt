package com.projetofinal.tables

import org.jetbrains.exposed.sql.Table

object Cartoes : Table("cartoes") {
    val idCartao = integer("idcartao").autoIncrement()
    val jogo = varchar("jogo", 100)
    val club = varchar("clube", 100)
    val jogador = varchar("jogador", 100)
    val tipoCartao = varchar("tipo_cartao", 100)
}
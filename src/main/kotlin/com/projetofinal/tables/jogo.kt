package com.projetofinal.tables

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.date
import org.jetbrains.exposed.sql.javatime.time

object Jogo : Table("jogo") {
    val jogo = varchar("jogo", 100)
    val data_ = date("data")
    val hora = time("hora")
    val equipCasa = varchar("equip_casa", 60)
    val equipFora = varchar("equip_fora", 60)
    val estado = varchar("estado", 60)
}
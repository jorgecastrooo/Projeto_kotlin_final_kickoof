package com.projetofinal.tables

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.date

object KickTable : Table("kick") {
    val username = varchar("UserName", 100)
    val name = varchar("Name", 100).nullable()
    val email = varchar("e-mail", 100)
    val nationality = varchar("Nacionalidade", 45).nullable()
    val birthdate = date("data de nascimento").nullable()
    val password = varchar("Password", 255)
    val adm = integer("adm").default(0)
}
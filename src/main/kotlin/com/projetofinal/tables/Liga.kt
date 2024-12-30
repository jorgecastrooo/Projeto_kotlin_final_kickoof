package com.projetofinal.tables

import org.jetbrains.exposed.sql.Table

object Liga : Table("liga") {
    val Nomedaliga = varchar("Nomedaliga", 100) // Campo Nomedaliga (PK)
    val DescricaoDaLiga = varchar("Descriçãodaliga", 600) // Campo Descrição da Liga
    val NumeroMaximo = integer("Numeromaximo") // Campo Número Máximo
    override val primaryKey = PrimaryKey(Nomedaliga) // Define Nomedaliga como chave primária
}

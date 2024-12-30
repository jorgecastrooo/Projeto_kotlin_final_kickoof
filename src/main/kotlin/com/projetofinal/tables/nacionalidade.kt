package com.projetofinal.tables

import org.jetbrains.exposed.sql.Table

object NacionalidadesTable : Table("nacionalidades") {
    val nacionalidade = varchar("nacionalidade", 100)
}

package com.projetofinal.tables

import org.jetbrains.exposed.sql.Table

object Noticias : Table() {
    val id = integer("id").autoIncrement()
    val tituloNoticias = varchar("titulo_noticias", 100)
    val descricaoNoticias = varchar("descricao_noticias", 600)
    val categoria = varchar("categoria", 100)
    override val primaryKey = PrimaryKey(id)
}
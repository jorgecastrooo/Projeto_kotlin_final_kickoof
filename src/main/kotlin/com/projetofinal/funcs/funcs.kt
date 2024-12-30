package com.projetofinal.funcs

//region imports
import java.security.MessageDigest
import java.time.LocalDate
import java.time.temporal.ChronoUnit
import kotlin.text.toByteArray
//endregion

//region isAgeAbove13
fun isAgeAbove13(birthdate: LocalDate): Boolean {
    val age = ChronoUnit.YEARS.between(birthdate, LocalDate.now())
    return age >= 13
}
//endregion

// region isValidPassword
fun isValidPassword(password: String): Boolean {
    val passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\$%^&*(),.?\":{}|<>]).{8,}\$".toRegex()
    return passwordRegex.matches(password)
}
//endregion

// region hashPassword
fun hashPassword(password: String): String {
    val messageDigest = MessageDigest.getInstance("SHA-256")
    val hashBytes = messageDigest.digest(password.toByteArray())
    return hashBytes.joinToString("") { "%02x".format(it) }
}
//endregion

//region calcularPontos
fun calcularPontos(vitorias: Int, empates: Int): Int {
    return (vitorias * 3) + (empates * 1)
}
//endregion
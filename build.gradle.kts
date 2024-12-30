plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.ktor)
    kotlin("plugin.serialization") version "1.9.10"  // Certifique-se de adicionar o plugin de serialização
}

group = "com.projetofinal"
version = "0.0.1"

application {
    mainClass.set("io.ktor.server.netty.EngineMain")

    val isDevelopment: Boolean = project.ext.has("development")
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=$isDevelopment")
}

repositories {
    mavenCentral()
}

dependencies {
    // Ktor core dependencies
    implementation("io.ktor:ktor-server-core:2.4.0")
    implementation("io.ktor:ktor-server-netty:2.4.0")
    implementation("io.ktor:ktor-server-content-negotiation:2.4.0")
    implementation("io.ktor:ktor-serialization-kotlinx-json:2.4.0") // Ktor com serialização JSON

    // Ktor Sessions and Authentication dependencies
    implementation("io.ktor:ktor-server-sessions:2.4.0")
    implementation("io.ktor:ktor-server-auth:2.4.0")

    // Database dependencies
    implementation("com.zaxxer:HikariCP:5.0.1")
    implementation("org.jetbrains.exposed:exposed-core:0.42.0")
    implementation("org.jetbrains.exposed:exposed-dao:0.42.0")
    implementation("org.jetbrains.exposed:exposed-jdbc:0.42.0")
    implementation("org.jetbrains.exposed:exposed-java-time:0.42.0")

    // MySQL driver
    implementation("mysql:mysql-connector-java:8.0.33")

    // Testing dependencies
    testImplementation("io.ktor:ktor-server-tests:2.3.4")
    testImplementation("org.jetbrains.kotlin:kotlin-test:1.9.10")

    // Logging and other Ktor features
    implementation("io.ktor:ktor-server-host-common:2.4.0")
    implementation("io.ktor:ktor-server-config-yaml:2.4.0")
    implementation("io.ktor:ktor-server-cors:2.4.0")

    implementation("org.jetbrains.kotlin:kotlin-stdlib")
}

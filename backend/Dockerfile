# Build stage
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /build
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests -X
RUN ls -la target/

# Run stage  
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /build/target/*.jar app.jar
RUN ls -la /app/
EXPOSE 8080
ENTRYPOINT ["java", "-Dspring.profiles.active=railway", "-jar", "app.jar"]

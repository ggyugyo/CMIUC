# 1단계: 애플리케이션 빌드
FROM gradle:8.5-jdk17 as builder
WORKDIR /app

# Gradle 빌드에 필요한 파일들 복사
COPY build.gradle settings.gradle /app/
COPY src /app/src

# 빌드 수행
RUN gradle build -x test --parallel --continue

# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim


COPY --from=builder /build/libs/*.jar /app/app.jar

# Make port 8081 available to the world outside this container
EXPOSE 8081

# Run the JAR file when the container launches
ENTRYPOINT ["java","-jar","/app/app.jar"]
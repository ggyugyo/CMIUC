# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Build the Spring Boot application
RUN ./gradlew build

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the JAR file when the container launches
ENTRYPOINT ["java", "-jar", "build/libs/CMIUC.jar"]
package com.gugu.cmiuc.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

@Configuration
public class SwaggerConfig {
    @Value("${springdoc.swagger-ui.info.title}")
    private String title;
    @Value("${springdoc.swagger-ui.info.description}")
    private String description;
    @Value("${springdoc.swagger-ui.info.version}")
    private String version;

    final static String AUTHORIZATION = "Authorization";

    @Bean
    public OpenAPI openAPI() {
        SecurityRequirement addSecurityItem = new SecurityRequirement();
        addSecurityItem.addList(AUTHORIZATION);

        return new OpenAPI()
                .addSecurityItem(addSecurityItem)
                .components(components())
                .info(apiInfo());
    }

    private Info apiInfo() {
        return new Info()
                .title(title)
                .description(description)
                .version(version);
    }

    private Components components() {
        return new Components()
                .addSecuritySchemes(AUTHORIZATION, securityScheme());
    }

    private SecurityScheme securityScheme() {
        return new SecurityScheme()
                .name(HttpHeaders.AUTHORIZATION)
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat(AUTHORIZATION)
                .in(SecurityScheme.In.HEADER);
    }
}

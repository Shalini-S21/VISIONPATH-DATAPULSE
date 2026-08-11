package com.visionpath.aimentor.config;
import io.swagger.v3.oas.models.*; import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.*;
@Configuration public class SwaggerConfig {
    @Bean public OpenAPI openAPI() { return new OpenAPI().info(new Info().title("VisionPath AI Mentor Service API").description("AI Career Assistance — Works without API key via intelligent fallback responses").version("1.0.0")); }
}

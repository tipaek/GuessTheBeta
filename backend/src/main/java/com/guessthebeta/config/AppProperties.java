package com.guessthebeta.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private String googleClientId;
    private String jwtSecret;
    private String corsOrigins;

    public String getGoogleClientId() { return googleClientId; }
    public void setGoogleClientId(String googleClientId) { this.googleClientId = googleClientId; }

    public String getJwtSecret() { return jwtSecret; }
    public void setJwtSecret(String jwtSecret) { this.jwtSecret = jwtSecret; }

    public String getCorsOrigins() { return corsOrigins; }
    public void setCorsOrigins(String corsOrigins) { this.corsOrigins = corsOrigins; }
}

package gn.cam.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/uploads/**")
                .addResourceLocations( "file:C:/Users/Gerson Gutierrez/Desktop/PROYECTO CAMARAS CON JAVA Y REACT/Camaras-fotograficas-spring boot/uploads/");
    }
}

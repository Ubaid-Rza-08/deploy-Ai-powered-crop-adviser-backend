package com.sih.farmer.controller;

import com.sih.farmer.security.AuthUtil;
import com.sih.farmer.service.WeatherService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Slf4j
public class WeatherController {

    private final WeatherService weatherService;
    private final AuthUtil authUtil;

    @GetMapping("/location")
    public ResponseEntity<Map<String, Object>> searchWeather(@RequestParam String city, HttpServletRequest request)
            throws Exception {
        log.info("Searching weather for city: {}", city);

        // Extract JWT token (optional)
        String token = getTokenFromRequest(request);
        String phoneNumber = null;
        if (token != null) {
            try {
                phoneNumber = authUtil.getPhoneFromToken(token);
            } catch (Exception e) {
                log.warn("Failed to extract phone from token: {}", e.getMessage());
                // Continue without phone (skip alert)
            }
        }

        return ResponseEntity.ok(weatherService.getWeatherByCityAsMap(city, phoneNumber));
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;  // No token, proceed without
    }
}
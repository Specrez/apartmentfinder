package com.apartmentfinder.controller;

import com.apartmentfinder.entity.Unit;
import com.apartmentfinder.entity.User;
import com.apartmentfinder.entity.SavedUnit;
import com.apartmentfinder.service.UnitService;
import com.apartmentfinder.repository.UserRepository;
import com.apartmentfinder.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/units")
@CrossOrigin(origins = "*")
public class UnitController {

    @Autowired
    private UnitService unitService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/public/available")
    public ResponseEntity<List<Unit>> getAvailableUnits() {
        List<Unit> units = unitService.getAllAvailableUnits();
        return ResponseEntity.ok(units);
    }

    @GetMapping("/public/search")
    public ResponseEntity<List<Unit>> searchUnits(
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) BigDecimal minRent,
            @RequestParam(required = false) BigDecimal maxRent,
            @RequestParam(required = false) Integer bedrooms,
            @RequestParam(required = false) Integer bathrooms) {

        List<Unit> units = unitService.searchUnits(district, city, minRent, maxRent, bedrooms, bathrooms);
        return ResponseEntity.ok(units);
    }

    @GetMapping("/public/{unitId}")
    public ResponseEntity<Unit> getUnitById(@PathVariable Long unitId) {
        Optional<Unit> unit = unitService.getUnitById(unitId);
        if (unit.isPresent()) {
            return ResponseEntity.ok(unit.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{unitId}/save")
    public ResponseEntity<?> saveUnit(@PathVariable Long unitId,
            @RequestHeader("Authorization") String authHeader) {
        User user = getUserFromToken(authHeader);
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }

        if (unitService.saveUnit(user, unitId)) {
            return ResponseEntity.ok(Map.of("message", "Unit saved successfully"));
        } else {
            return ResponseEntity.badRequest().body("Failed to save unit or already saved");
        }
    }

    @DeleteMapping("/{unitId}/unsave")
    public ResponseEntity<?> unsaveUnit(@PathVariable Long unitId,
            @RequestHeader("Authorization") String authHeader) {
        User user = getUserFromToken(authHeader);
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }

        if (unitService.unsaveUnit(user, unitId)) {
            return ResponseEntity.ok(Map.of("message", "Unit unsaved successfully"));
        } else {
            return ResponseEntity.badRequest().body("Failed to unsave unit");
        }
    }

    @GetMapping("/saved")
    public ResponseEntity<List<SavedUnit>> getSavedUnits(@RequestHeader("Authorization") String authHeader) {
        User user = getUserFromToken(authHeader);
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }

        List<SavedUnit> savedUnits = unitService.getUserSavedUnits(user);
        return ResponseEntity.ok(savedUnits);
    }

    @GetMapping("/{unitId}/is-saved")
    public ResponseEntity<Map<String, Boolean>> isUnitSaved(@PathVariable Long unitId,
            @RequestHeader("Authorization") String authHeader) {
        User user = getUserFromToken(authHeader);
        if (user == null) {
            return ResponseEntity.ok(Map.of("saved", false));
        }

        boolean isSaved = unitService.isUnitSavedByUser(user, unitId);
        return ResponseEntity.ok(Map.of("saved", isSaved));
    }

    private User getUserFromToken(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (jwtUtil.validateToken(token) && !jwtUtil.isTokenExpired(token)) {
                Long userId = jwtUtil.getUserIdFromToken(token);
                Optional<User> user = userRepository.findById(userId);
                return user.orElse(null);
            }
        }
        return null;
    }
}

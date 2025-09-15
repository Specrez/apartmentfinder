package com.apartmentfinder.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.apartmentfinder.entity.Building;
import com.apartmentfinder.service.BuildingService;

@RestController
@RequestMapping("/buildings")
@CrossOrigin(origins = "*")
public class BuildingController {

    @Autowired
    private BuildingService buildingService;

    // Owner submits a building for approval
    @PostMapping("/submit")
    public ResponseEntity<?> submitBuilding(@RequestBody Building building, @RequestParam Long ownerId) {
        try {
            Building createdBuilding = buildingService.createBuilding(building, ownerId);
            return ResponseEntity.ok(Map.of(
                    "message", "Building submitted for approval successfully",
                    "building", createdBuilding
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Get buildings by owner ID
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<Building>> getBuildingsByOwner(@PathVariable Long ownerId) {
        try {
            List<Building> buildings = buildingService.getBuildingsByOwner(ownerId);
            return ResponseEntity.ok(buildings);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Get all approved buildings (for public listings)
    @GetMapping("/approved")
    public ResponseEntity<List<Building>> getApprovedBuildings() {
        List<Building> buildings = buildingService.getApprovedBuildings();
        return ResponseEntity.ok(buildings);
    }

    // Get building by ID
    @GetMapping("/{id}")
    public ResponseEntity<Building> getBuildingById(@PathVariable Long id) {
        Optional<Building> building = buildingService.getBuildingById(id);
        if (building.isPresent()) {
            return ResponseEntity.ok(building.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update building (only owner can update their own buildings)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBuilding(@PathVariable Long id, @RequestBody Building buildingDetails) {
        try {
            Building updatedBuilding = buildingService.updateBuilding(id, buildingDetails);
            return ResponseEntity.ok(Map.of(
                    "message", "Building updated successfully",
                    "building", updatedBuilding
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Delete building
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBuilding(@PathVariable Long id) {
        try {
            buildingService.deleteBuilding(id);
            return ResponseEntity.ok(Map.of("message", "Building deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}

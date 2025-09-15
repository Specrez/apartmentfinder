package com.apartmentfinder.controller;

import com.apartmentfinder.service.AdminService;
import com.apartmentfinder.entity.Owner;
import com.apartmentfinder.entity.Building;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/dashboard/stats")
    public ResponseEntity<Map<String, Long>> getDashboardStats() {
        Map<String, Long> stats = adminService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/owners/pending")
    public ResponseEntity<List<Owner>> getPendingOwners() {
        List<Owner> pendingOwners = adminService.getPendingOwners();
        return ResponseEntity.ok(pendingOwners);
    }

    @GetMapping("/buildings/pending")
    public ResponseEntity<List<Building>> getPendingBuildings() {
        List<Building> pendingBuildings = adminService.getPendingBuildings();
        return ResponseEntity.ok(pendingBuildings);
    }

    @PostMapping("/owners/{ownerId}/approve")
    public ResponseEntity<?> approveOwner(@PathVariable Long ownerId) {
        if (adminService.approveOwner(ownerId)) {
            return ResponseEntity.ok(Map.of("message", "Owner approved successfully"));
        } else {
            return ResponseEntity.badRequest().body("Failed to approve owner");
        }
    }

    @PostMapping("/owners/{ownerId}/reject")
    public ResponseEntity<?> rejectOwner(@PathVariable Long ownerId) {
        if (adminService.rejectOwner(ownerId)) {
            return ResponseEntity.ok(Map.of("message", "Owner rejected successfully"));
        } else {
            return ResponseEntity.badRequest().body("Failed to reject owner");
        }
    }

    @PostMapping("/buildings/{buildingId}/approve")
    public ResponseEntity<?> approveBuilding(@PathVariable Long buildingId) {
        if (adminService.approveBuilding(buildingId)) {
            return ResponseEntity.ok(Map.of("message", "Building approved successfully"));
        } else {
            return ResponseEntity.badRequest().body("Failed to approve building");
        }
    }

    @PostMapping("/buildings/{buildingId}/reject")
    public ResponseEntity<?> rejectBuilding(@PathVariable Long buildingId) {
        if (adminService.rejectBuilding(buildingId)) {
            return ResponseEntity.ok(Map.of("message", "Building rejected successfully"));
        } else {
            return ResponseEntity.badRequest().body("Failed to reject building");
        }
    }
}

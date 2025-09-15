package com.apartmentfinder.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apartmentfinder.entity.Building;
import com.apartmentfinder.entity.Owner;
import com.apartmentfinder.repository.BuildingRepository;
import com.apartmentfinder.repository.EmployeeRepository;
import com.apartmentfinder.repository.OwnerRepository;
import com.apartmentfinder.repository.UserRepository;

@Service
public class AdminService {

    @Autowired
    private OwnerRepository ownerRepository;

    @Autowired
    private BuildingRepository buildingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Owner> getPendingOwners() {
        return ownerRepository.findByStatus(Owner.ApprovalStatus.PENDING);
    }

    public List<Building> getPendingBuildings() {
        return buildingRepository.findByStatus(Building.ApprovalStatus.PENDING);
    }

    public boolean approveOwner(Long ownerId) {
        return ownerRepository.findById(ownerId)
                .map(owner -> {
                    owner.setStatus(Owner.ApprovalStatus.APPROVED);
                    owner.setApprovedAt(LocalDateTime.now());
                    ownerRepository.save(owner);
                    return true;
                })
                .orElse(false);
    }

    public boolean rejectOwner(Long ownerId) {
        return ownerRepository.findById(ownerId)
                .map(owner -> {
                    owner.setStatus(Owner.ApprovalStatus.REJECTED);
                    ownerRepository.save(owner);
                    return true;
                })
                .orElse(false);
    }

    public boolean approveBuilding(Long buildingId) {
        return buildingRepository.findById(buildingId)
                .map(building -> {
                    building.setStatus(Building.ApprovalStatus.APPROVED);
                    building.setApprovedAt(LocalDateTime.now());
                    buildingRepository.save(building);
                    return true;
                })
                .orElse(false);
    }

    public boolean rejectBuilding(Long buildingId) {
        return buildingRepository.findById(buildingId)
                .map(building -> {
                    building.setStatus(Building.ApprovalStatus.REJECTED);
                    buildingRepository.save(building);
                    return true;
                })
                .orElse(false);
    }

    public Map<String, Long> getDashboardStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.countActiveUsers());
        stats.put("totalOwners", ownerRepository.countApprovedOwners());
        stats.put("totalEmployees", employeeRepository.countAllActiveEmployees());
        stats.put("totalBuildings", buildingRepository.countApprovedBuildings());
        stats.put("pendingOwnerApprovals", ownerRepository.countPendingOwners());
        stats.put("pendingBuildingApprovals", buildingRepository.countPendingBuildings());
        return stats;
    }
}

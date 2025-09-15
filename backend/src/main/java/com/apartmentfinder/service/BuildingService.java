package com.apartmentfinder.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apartmentfinder.entity.Building;
import com.apartmentfinder.entity.Owner;
import com.apartmentfinder.repository.BuildingRepository;
import com.apartmentfinder.repository.OwnerRepository;

@Service
public class BuildingService {

    @Autowired
    private BuildingRepository buildingRepository;

    @Autowired
    private OwnerRepository ownerRepository;

    public Building createBuilding(Building building, Long ownerId) {
        // Find the owner
        Optional<Owner> ownerOpt = ownerRepository.findById(ownerId);
        if (!ownerOpt.isPresent()) {
            throw new RuntimeException("Owner not found with id: " + ownerId);
        }

        Owner owner = ownerOpt.get();

        // Check if owner is approved
        if (!owner.getStatus().equals(Owner.ApprovalStatus.APPROVED)) {
            throw new RuntimeException("Only approved owners can submit buildings for approval");
        }

        // Set the owner and default status
        building.setOwner(owner);
        building.setStatus(Building.ApprovalStatus.PENDING);

        // Save the building
        return buildingRepository.save(building);
    }

    public List<Building> getBuildingsByOwner(Long ownerId) {
        Optional<Owner> ownerOpt = ownerRepository.findById(ownerId);
        if (!ownerOpt.isPresent()) {
            throw new RuntimeException("Owner not found with id: " + ownerId);
        }
        return buildingRepository.findByOwner(ownerOpt.get());
    }

    public List<Building> getPendingBuildings() {
        return buildingRepository.findByStatus(Building.ApprovalStatus.PENDING);
    }

    public List<Building> getApprovedBuildings() {
        return buildingRepository.findByStatus(Building.ApprovalStatus.APPROVED);
    }

    public Optional<Building> getBuildingById(Long id) {
        return buildingRepository.findById(id);
    }

    public Building updateBuilding(Long id, Building buildingDetails) {
        Optional<Building> buildingOpt = buildingRepository.findById(id);
        if (!buildingOpt.isPresent()) {
            throw new RuntimeException("Building not found with id: " + id);
        }

        Building building = buildingOpt.get();

        // Update fields (only allow certain fields to be updated)
        if (buildingDetails.getBuildingName() != null) {
            building.setBuildingName(buildingDetails.getBuildingName());
        }
        if (buildingDetails.getAddress() != null) {
            building.setAddress(buildingDetails.getAddress());
        }
        if (buildingDetails.getDistrict() != null) {
            building.setDistrict(buildingDetails.getDistrict());
        }
        if (buildingDetails.getCity() != null) {
            building.setCity(buildingDetails.getCity());
        }
        if (buildingDetails.getTotalUnits() != null) {
            building.setTotalUnits(buildingDetails.getTotalUnits());
        }
        if (buildingDetails.getYearBuilt() != null) {
            building.setYearBuilt(buildingDetails.getYearBuilt());
        }
        if (buildingDetails.getDescription() != null) {
            building.setDescription(buildingDetails.getDescription());
        }
        if (buildingDetails.getAmenities() != null) {
            building.setAmenities(buildingDetails.getAmenities());
        }
        if (buildingDetails.getPhotos() != null) {
            building.setPhotos(buildingDetails.getPhotos());
        }

        return buildingRepository.save(building);
    }

    public void deleteBuilding(Long id) {
        if (!buildingRepository.existsById(id)) {
            throw new RuntimeException("Building not found with id: " + id);
        }
        buildingRepository.deleteById(id);
    }
}

package com.apartmentfinder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.apartmentfinder.entity.Building;
import com.apartmentfinder.entity.Owner;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {

    List<Building> findByStatus(Building.ApprovalStatus status);

    List<Building> findByOwner(Owner owner);

    List<Building> findByOwnerAndStatus(Owner owner, Building.ApprovalStatus status);

    List<Building> findByDistrictAndCity(String district, String city);

    List<Building> findByDistrict(String district);

    List<Building> findByCity(String city);

    @Query("SELECT COUNT(b) FROM Building b WHERE b.status = 'APPROVED'")
    long countApprovedBuildings();

    @Query("SELECT COUNT(b) FROM Building b WHERE b.status = 'PENDING'")
    long countPendingBuildings();

    @Query("SELECT COUNT(e) FROM Employee e WHERE e.building.id = :buildingId")
    long countEmployeesByBuildingId(@Param("buildingId") Long buildingId);
}

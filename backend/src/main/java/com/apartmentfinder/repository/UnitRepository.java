package com.apartmentfinder.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.apartmentfinder.entity.Building;
import com.apartmentfinder.entity.Unit;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Long> {

    List<Unit> findByBuilding(Building building);

    List<Unit> findByStatus(Unit.UnitStatus status);

    List<Unit> findByBuildingAndStatus(Building building, Unit.UnitStatus status);

    // Search filters
    @Query("SELECT u FROM Unit u JOIN u.building b WHERE "
            + "(:district IS NULL OR b.district = :district) AND "
            + "(:city IS NULL OR b.city = :city) AND "
            + "(:minRent IS NULL OR u.rent >= :minRent) AND "
            + "(:maxRent IS NULL OR u.rent <= :maxRent) AND "
            + "(:bedrooms IS NULL OR u.bedrooms = :bedrooms) AND "
            + "(:bathrooms IS NULL OR u.bathrooms = :bathrooms) AND "
            + "u.status = 'AVAILABLE' AND b.status = 'APPROVED'")
    List<Unit> findAvailableUnitsWithFilters(
            @Param("district") String district,
            @Param("city") String city,
            @Param("minRent") BigDecimal minRent,
            @Param("maxRent") BigDecimal maxRent,
            @Param("bedrooms") Integer bedrooms,
            @Param("bathrooms") Integer bathrooms
    );

    @Query("SELECT u FROM Unit u JOIN u.building b WHERE "
            + "u.status = 'AVAILABLE' AND b.status = 'APPROVED' "
            + "ORDER BY u.createdAt DESC")
    List<Unit> findAllAvailableUnits();

    @Query("SELECT COUNT(u) FROM Unit u WHERE u.building.id = :buildingId AND u.status = 'OCCUPIED'")
    long countOccupiedUnitsByBuildingId(@Param("buildingId") Long buildingId);

    @Query("SELECT COUNT(u) FROM Unit u WHERE u.building.id = :buildingId")
    long countTotalUnitsByBuildingId(@Param("buildingId") Long buildingId);
}

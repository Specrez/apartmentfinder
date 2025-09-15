package com.apartmentfinder.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.apartmentfinder.entity.Building;
import com.apartmentfinder.entity.Employee;
import com.apartmentfinder.entity.Owner;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(String email);

    boolean existsByEmail(String email);

    List<Employee> findByBuilding(Building building);

    List<Employee> findByOwner(Owner owner);

    List<Employee> findByOwnerAndBuilding(Owner owner, Building building);

    List<Employee> findByIsActive(Boolean isActive);

    @Query("SELECT COUNT(e) FROM Employee e WHERE e.building.id = :buildingId AND e.isActive = true")
    long countActiveEmployeesByBuildingId(@Param("buildingId") Long buildingId);

    @Query("SELECT COUNT(e) FROM Employee e WHERE e.isActive = true")
    long countAllActiveEmployees();
}

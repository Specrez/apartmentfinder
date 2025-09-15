package com.apartmentfinder.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.apartmentfinder.entity.Building;
import com.apartmentfinder.entity.Employee;
import com.apartmentfinder.entity.Owner;
import com.apartmentfinder.repository.BuildingRepository;
import com.apartmentfinder.repository.EmployeeRepository;

@Service
public class OwnerService {

    @Autowired
    private BuildingRepository buildingRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Building> getOwnerBuildings(Owner owner) {
        return buildingRepository.findByOwner(owner);
    }

    public List<Employee> getOwnerEmployees(Owner owner) {
        return employeeRepository.findByOwner(owner);
    }

    public boolean addBuilding(Building building) {
        try {
            buildingRepository.save(building);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean addEmployee(Employee employee, Long buildingId) {
        Optional<Building> building = buildingRepository.findById(buildingId);
        if (building.isEmpty()) {
            return false;
        }

        // Check if building has less than 5 employees
        long currentEmployeeCount = employeeRepository.countActiveEmployeesByBuildingId(buildingId);
        if (currentEmployeeCount >= 5) {
            return false;
        }

        // Check if email is already taken
        if (employeeRepository.existsByEmail(employee.getEmail())) {
            return false;
        }

        employee.setBuilding(building.get());
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        employeeRepository.save(employee);
        return true;
    }

    public boolean updateBuilding(Building building) {
        if (buildingRepository.existsById(building.getId())) {
            buildingRepository.save(building);
            return true;
        }
        return false;
    }

    public boolean deactivateEmployee(Long employeeId) {
        return employeeRepository.findById(employeeId)
                .map(employee -> {
                    employee.setIsActive(false);
                    employeeRepository.save(employee);
                    return true;
                })
                .orElse(false);
    }

    public boolean activateEmployee(Long employeeId) {
        return employeeRepository.findById(employeeId)
                .map(employee -> {
                    employee.setIsActive(true);
                    employeeRepository.save(employee);
                    return true;
                })
                .orElse(false);
    }

    public List<Employee> getBuildingEmployees(Long buildingId) {
        Optional<Building> building = buildingRepository.findById(buildingId);
        if (building.isPresent()) {
            return employeeRepository.findByBuilding(building.get());
        }
        return List.of();
    }
}

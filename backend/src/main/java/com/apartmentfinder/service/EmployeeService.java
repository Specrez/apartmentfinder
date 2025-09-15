package com.apartmentfinder.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apartmentfinder.entity.Building;
import com.apartmentfinder.entity.Employee;
import com.apartmentfinder.entity.Unit;
import com.apartmentfinder.repository.BuildingRepository;
import com.apartmentfinder.repository.UnitRepository;

@Service
public class EmployeeService {

    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private BuildingRepository buildingRepository;

    public List<Unit> getBuildingUnits(Employee employee) {
        return unitRepository.findByBuilding(employee.getBuilding());
    }

    public boolean addUnit(Unit unit, Employee employee) {
        unit.setBuilding(employee.getBuilding());
        try {
            unitRepository.save(unit);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean updateUnit(Unit unit, Employee employee) {
        Optional<Unit> existingUnit = unitRepository.findById(unit.getId());
        if (existingUnit.isPresent()
                && existingUnit.get().getBuilding().getId().equals(employee.getBuilding().getId())) {
            unit.setBuilding(employee.getBuilding());
            unitRepository.save(unit);
            return true;
        }
        return false;
    }

    public boolean deleteUnit(Long unitId, Employee employee) {
        Optional<Unit> unit = unitRepository.findById(unitId);
        if (unit.isPresent()
                && unit.get().getBuilding().getId().equals(employee.getBuilding().getId())) {
            unitRepository.deleteById(unitId);
            return true;
        }
        return false;
    }

    public Optional<Unit> getUnit(Long unitId, Employee employee) {
        Optional<Unit> unit = unitRepository.findById(unitId);
        if (unit.isPresent()
                && unit.get().getBuilding().getId().equals(employee.getBuilding().getId())) {
            return unit;
        }
        return Optional.empty();
    }

    public Building getEmployeeBuilding(Employee employee) {
        return employee.getBuilding();
    }
}

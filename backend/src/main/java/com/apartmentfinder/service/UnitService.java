package com.apartmentfinder.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apartmentfinder.entity.SavedUnit;
import com.apartmentfinder.entity.Unit;
import com.apartmentfinder.entity.User;
import com.apartmentfinder.repository.SavedUnitRepository;
import com.apartmentfinder.repository.UnitRepository;

@Service
public class UnitService {

    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private SavedUnitRepository savedUnitRepository;

    public List<Unit> getAllAvailableUnits() {
        return unitRepository.findAllAvailableUnits();
    }

    public List<Unit> searchUnits(String district, String city, BigDecimal minRent,
            BigDecimal maxRent, Integer bedrooms, Integer bathrooms) {
        return unitRepository.findAvailableUnitsWithFilters(
                district, city, minRent, maxRent, bedrooms, bathrooms);
    }

    public Optional<Unit> getUnitById(Long unitId) {
        return unitRepository.findById(unitId);
    }

    public List<SavedUnit> getUserSavedUnits(User user) {
        return savedUnitRepository.findByUser(user);
    }

    public boolean saveUnit(User user, Long unitId) {
        Optional<Unit> unit = unitRepository.findById(unitId);
        if (unit.isEmpty()) {
            return false;
        }

        // Check if already saved
        if (savedUnitRepository.existsByUserAndUnit(user, unit.get())) {
            return false;
        }

        SavedUnit savedUnit = new SavedUnit(user, unit.get());
        savedUnitRepository.save(savedUnit);
        return true;
    }

    public boolean unsaveUnit(User user, Long unitId) {
        Optional<Unit> unit = unitRepository.findById(unitId);
        if (unit.isEmpty()) {
            return false;
        }

        if (savedUnitRepository.existsByUserAndUnit(user, unit.get())) {
            savedUnitRepository.deleteByUserAndUnit(user, unit.get());
            return true;
        }
        return false;
    }

    public boolean isUnitSavedByUser(User user, Long unitId) {
        Optional<Unit> unit = unitRepository.findById(unitId);
        if (unit.isEmpty()) {
            return false;
        }
        return savedUnitRepository.existsByUserAndUnit(user, unit.get());
    }
}

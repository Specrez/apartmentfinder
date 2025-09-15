package com.apartmentfinder.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.apartmentfinder.entity.SavedUnit;
import com.apartmentfinder.entity.Unit;
import com.apartmentfinder.entity.User;

@Repository
public interface SavedUnitRepository extends JpaRepository<SavedUnit, Long> {

    List<SavedUnit> findByUser(User user);

    List<SavedUnit> findByUnit(Unit unit);

    Optional<SavedUnit> findByUserAndUnit(User user, Unit unit);

    boolean existsByUserAndUnit(User user, Unit unit);

    void deleteByUserAndUnit(User user, Unit unit);

    @Query("SELECT COUNT(s) FROM SavedUnit s WHERE s.unit.id = :unitId")
    long countSavedByUnitId(@Param("unitId") Long unitId);
}

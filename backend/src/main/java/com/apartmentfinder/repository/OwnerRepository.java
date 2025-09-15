package com.apartmentfinder.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.apartmentfinder.entity.Owner;

@Repository
public interface OwnerRepository extends JpaRepository<Owner, Long> {

    Optional<Owner> findByEmail(String email);

    boolean existsByEmail(String email);

    List<Owner> findByStatus(Owner.ApprovalStatus status);

    @Query("SELECT COUNT(o) FROM Owner o WHERE o.status = 'APPROVED'")
    long countApprovedOwners();

    @Query("SELECT COUNT(o) FROM Owner o WHERE o.status = 'PENDING'")
    long countPendingOwners();
}

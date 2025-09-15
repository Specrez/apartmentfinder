package com.apartmentfinder.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.apartmentfinder.entity.Admin;
import com.apartmentfinder.entity.Employee;
import com.apartmentfinder.entity.Owner;
import com.apartmentfinder.entity.User;
import com.apartmentfinder.repository.AdminRepository;
import com.apartmentfinder.repository.EmployeeRepository;
import com.apartmentfinder.repository.OwnerRepository;
import com.apartmentfinder.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private OwnerRepository ownerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<Admin> authenticateAdmin(String email, String password) {
        Optional<Admin> admin = adminRepository.findByEmail(email);
        if (admin.isPresent() && passwordEncoder.matches(password, admin.get().getPassword())) {
            return admin;
        }
        return Optional.empty();
    }

    public Optional<Owner> authenticateOwner(String email, String password) {
        Optional<Owner> owner = ownerRepository.findByEmail(email);
        if (owner.isPresent()
                && owner.get().getStatus() == Owner.ApprovalStatus.APPROVED
                && passwordEncoder.matches(password, owner.get().getPassword())) {
            return owner;
        }
        return Optional.empty();
    }

    public Optional<Employee> authenticateEmployee(String email, String password) {
        Optional<Employee> employee = employeeRepository.findByEmail(email);
        if (employee.isPresent()
                && employee.get().getIsActive()
                && passwordEncoder.matches(password, employee.get().getPassword())) {
            return employee;
        }
        return Optional.empty();
    }

    public Optional<User> authenticateUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()
                && user.get().getIsActive()
                && passwordEncoder.matches(password, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }

    public String determineUserRole(String email) {
        if (adminRepository.existsByEmail(email)) {
            return "admin";
        } else if (ownerRepository.existsByEmail(email)) {
            return "owner";
        } else if (employeeRepository.existsByEmail(email)) {
            return "employee";
        } else if (userRepository.existsByEmail(email)) {
            return "user";
        }
        return null;
    }

    public boolean registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return false;
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return true;
    }

    public boolean registerOwner(Owner owner) {
        if (ownerRepository.existsByEmail(owner.getEmail())) {
            return false;
        }
        owner.setPassword(passwordEncoder.encode(owner.getPassword()));
        ownerRepository.save(owner);
        return true;
    }
}

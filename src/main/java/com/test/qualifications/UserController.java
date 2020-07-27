package com.test.qualifications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // CREATE
    @PostMapping("")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // READ
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    // UPDATE
    @PatchMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        Optional<User> oldUser = userRepository.findById(id);
        if (oldUser.isPresent()) {

            // First Name
            if (user.getFirstName() != null) {
                oldUser.get().setFirstName(user.getFirstName());
            }

            // Last Name
            if (user.getLastName() != null) {
                oldUser.get().setLastName(user.getLastName());
            }

            // EDIPI
            if (user.getEdipi() != null) {
                oldUser.get().setEdipi(user.getEdipi());
            }

            // Unit
            if (user.getUnit() != null) {
                oldUser.get().setUnit(user.getUnit());
            }

            // Base
            if (user.getBase() != null) {
                oldUser.get().setBase(user.getBase());
            }

            // AFSC
            if (user.getAfsc() != null) {
                oldUser.get().setAfsc(user.getAfsc());
            }

            // Role
            if (user.getRole() != null) {
                oldUser.get().setRole(user.getRole());
            }

            // Email
            if (user.getEmail() != null) {
                oldUser.get().setEmail(user.getEmail());
            }

            // Password
            if (user.getPassword() != null) {
                oldUser.get().setPassword(user.getPassword());
            }

            // Grade
            if (user.getGrade() != null) {
                oldUser.get().setGrade(user.getGrade());
            }

            return userRepository.save(oldUser.get());
        } else {
            return null;
        }
    }

    // DELETE

    // LIST
    @GetMapping("")
    public Iterable<User> getAll() {
        return userRepository.findAll();
    }
}

package com.test.qualifications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
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

    // find by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    // find by last name
    @GetMapping("/last/{lastName}")
    public Iterable<User> getUserByLastName(@PathVariable String lastName) {
        return userRepository.findByLastNameLike(lastName);
    }

    // find by unit
    @GetMapping("/unit/{unit}")
    public Iterable<User> getUsersByUnit(@PathVariable String unit) {
        return userRepository.findByUnitLike(unit);
    }

    // find by email
    @PostMapping("/email/")
    public User getUserByEmail(@RequestBody User user) {
        User retrievedUser = userRepository.findByEmail(user.getEmail());
        if ((user.getEmail() == retrievedUser.getEmail()) && (user.getPassword() == retrievedUser.getPassword())) {
            return retrievedUser;
        } else return null;
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
        } else return null;
    }

    // DELETE
    @DeleteMapping("/{id}")
    public Map<String, Long> deleteUser(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        user.ifPresent(userRepository::delete);
        Map<String, Long> count = new HashMap<>();
        count.put("count", userRepository.count());
        return count;
    }

    // LIST
    @GetMapping("")
    public Iterable<User> getAll() {
        return userRepository.findAll();
    }
}

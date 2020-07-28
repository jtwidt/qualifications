package com.test.qualifications;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    public Iterable<User> findByLastNameLike (String lastName);

    public Iterable<User> findByUnitLike (String unit);
}

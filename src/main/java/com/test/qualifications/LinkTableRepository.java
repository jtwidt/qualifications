package com.test.qualifications;

import org.springframework.data.repository.CrudRepository;

public interface LinkTableRepository extends CrudRepository<LinkTable, Long> {
    public Iterable<LinkTable> findByUser(User user);

    public Iterable<LinkTable> findByTask(Task task);
}

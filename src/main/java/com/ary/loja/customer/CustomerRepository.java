package com.ary.loja.customer;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Integer> {
    
    Customer findCustomerById(Integer id);

    Optional<Customer> findCustomerByEmail(String email);

    Optional<Customer> findStudentByEmail(String email);

}

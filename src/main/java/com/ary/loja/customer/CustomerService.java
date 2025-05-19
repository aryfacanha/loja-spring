package com.ary.loja.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    public CustomerRepository customerRepository;


    public List<Customer> getAllCustomers(){

    return (List<Customer>) customerRepository.findAll();
        
    }

    public Customer getCustomerById(Integer id) {

        return customerRepository.findCustomerById(id);
    }

}

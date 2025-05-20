package com.ary.loja.customer;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class CustomerService {

    private CustomerRepository customerRepository;


    public List<Customer> getAllCustomers(){

    return (List<Customer>) customerRepository.findAll();
        
    }

    public Customer getCustomerById(Integer id) {

        return customerRepository.findCustomerById(id);
    }

    public void addNewCustomer(Customer customer) {
        
        Optional<Customer> newCustomer = customerRepository.findCustomerByEmail(customer.getEmail());

        if (newCustomer.isPresent()){
            throw new IllegalStateException("User with the email " + customer.getEmail() + " already exists");
        }

        customerRepository.save(customer);


    }

    public void deleteCustomerById(Integer id) {
    
        boolean exists = customerRepository.existsById(id);
        
        if (!exists) {
            throw new IllegalStateException("Customer with ID "+ id +" does not exist.");
        }

        customerRepository.deleteById(id);
    }

    public void updateCustomerById(Integer id, String name, String email) {

        Customer customer = customerRepository.findCustomerById(id);

        if (customer.getId() == null) {
            throw new IllegalStateException("Customer with ID "+ id +" does not exist.");
        }

        Optional<Customer> emailExists = customerRepository.findCustomerByEmail(email);

        
        if(email != null && email.length() > 0 && !Objects.equals(email, customer.getEmail())){

            if(emailExists.isPresent()) {
            throw new IllegalStateException("User with the email " + email + " already exists");
            }
            customer.setEmail(email);
        }

        if(name != null && name.length() > 0 && !Objects.equals(name, customer.getName())){
            customer.setName(name);
        }
        
        customerRepository.save(customer);

    }

}

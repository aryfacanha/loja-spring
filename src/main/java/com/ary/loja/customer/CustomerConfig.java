package com.ary.loja.customer;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CustomerConfig {


// Created for testing purposes

    @Bean
    CommandLineRunner commandLineRunner(CustomerRepository repository) {
        return args -> {
            Customer joe = new Customer("Joe", "joe@hotmail.com");
            Customer sin = new Customer("SinBad", "sin@gmail.com");

            repository.saveAll(List.of(joe, sin));
        };
    }
    
}

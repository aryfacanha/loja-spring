package com.ary.loja.product;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Integer> {
    
    List<Product> findByNameContaining(String str);

}

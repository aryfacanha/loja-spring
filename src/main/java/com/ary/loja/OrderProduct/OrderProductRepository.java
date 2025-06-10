package com.ary.loja.orderproduct;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderProductRepository extends CrudRepository<OrderProduct, Integer> {

    List<OrderProduct> findOrderProductByOrderId(Integer orderId);
    
}

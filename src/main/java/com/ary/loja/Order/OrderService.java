package com.ary.loja.Order;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class OrderService {

    public final OrderRepository orderRepository;

    public Order getOrderById(Integer id) {
        return orderRepository.findById(id).get();
    }
    
}

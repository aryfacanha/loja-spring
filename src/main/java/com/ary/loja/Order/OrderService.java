package com.ary.loja.order;

import org.springframework.stereotype.Service;

import com.ary.loja.orderproduct.OrderProductRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class OrderService {

    public final OrderProductRepository orderProductRepository;
    public final OrderRepository orderRepository;

    public Order getOrderById(Integer id) {
        return orderRepository.findById(id).get();
    }
}

package com.ary.loja.order;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ary.loja.orderproduct.OrderProductRepository;
import com.ary.loja.product.Product;

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

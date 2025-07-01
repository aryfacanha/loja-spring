package com.ary.loja.order;

import java.util.List;

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

    public void addOrder(Order order) {
        orderRepository.save(order);
    }

    public List<Order> getAll() {
        return (List<Order>)orderRepository.findAll();
    }

    public void deleteOrder(Integer id) {
        orderRepository.deleteById(id);
    }
}

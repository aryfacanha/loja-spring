package com.ary.loja.order;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        return (List<Order>) orderRepository.findAll();
    }

    public void deleteOrder(Integer id) {
        orderRepository.deleteById(id);
    }

    public Map<String, Double> getStatsByMonthAndYear(int year, int month) {
        Double avg = orderRepository.findAverageSale(year, month);
        Double max = orderRepository.findMaxSale(year, month);
        Double min = orderRepository.findMinSale(year, month);

        Map<String, Double> stats = new HashMap<>();
        stats.put("avg", avg != null ? avg : 0.0);
        stats.put("max", max != null ? max : 0.0);
        stats.put("min", min != null ? min : 0.0);

        return stats;
    }

}

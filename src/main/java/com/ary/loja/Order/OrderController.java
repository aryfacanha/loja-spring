package com.ary.loja.order;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "*")
@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/order")
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Integer id) {
        return orderService.getOrderById(id);
    }

    @GetMapping("/all")
    public List<Order> getOrders() {
        return orderService.getAll();
    }

    @PostMapping
    public void addNewOrder(@RequestBody Order order) {
        order.setOrderProducts(order.getOrderProducts());
        orderService.addOrder(order);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteOrder(@PathVariable Integer id) {
        orderService.deleteOrder(id);
    }

    @GetMapping("/stats/{year}/{month}")
    public Map<String, Double> getStats(@PathVariable int year, @PathVariable int month) {
        return orderService.getStatsByMonthAndYear(year, month);
    }

}

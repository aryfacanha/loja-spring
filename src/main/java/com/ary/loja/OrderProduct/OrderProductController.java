package com.ary.loja.orderproduct;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@CrossOrigin(origins = "*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/orderproduct")
public class OrderProductController {
    
    private final OrderProductService orderProductService;

    @GetMapping("/{id}")
    public OrderProduct getOrderProductById(@PathVariable Integer id) {
        return orderProductService.getOrderProductById(id);
    }
    
    @GetMapping
    public List<OrderProduct> getProductsByOrderId(@RequestParam Integer orderId){
        return orderProductService.getProductsByOrderId(orderId);
    }
    

}

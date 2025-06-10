package com.ary.loja.orderproduct;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;


@AllArgsConstructor
@Service
public class OrderProductService {

    private final OrderProductRepository orderProductRepository;

    public OrderProduct getOrderProductById(Integer id) {
        return orderProductRepository.findById(id).get();
    }

    public List<OrderProduct> getProductsByOrderId(Integer orderId) {
        return orderProductRepository.findOrderProductByOrderId(orderId);
    }
    
    
}

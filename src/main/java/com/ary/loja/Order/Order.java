package com.ary.loja.order;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.ary.loja.customer.Customer;
import com.ary.loja.orderproduct.OrderProduct;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "customer_order")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDateTime orderDateTime;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDateTime paymentDateTime;
    private Double totalPrice;
    private Boolean cancelled;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    @OneToMany(mappedBy = "order")
    private List<OrderProduct> orderProducts = new ArrayList<>();

    public Order(LocalDateTime orderDateTime, LocalDateTime paymentDateTime, Double totalPrice, Boolean cancelled,
            Customer customer, List<OrderProduct> orderProductList) {
        this.orderDateTime = orderDateTime;
        this.paymentDateTime = paymentDateTime;
        this.totalPrice = totalPrice;
        this.cancelled = cancelled;
        this.customer = customer;
        this.orderProducts = orderProductList;
    }

}

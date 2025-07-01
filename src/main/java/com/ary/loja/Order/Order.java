package com.ary.loja.order;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import com.ary.loja.customer.Customer;
import com.ary.loja.orderproduct.OrderProduct;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "customer_order")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime orderDateTime;

    private Boolean cancelled;

    @Transient
    public Double getTotal() {
        return orderProducts.stream()
                .mapToDouble(op -> op.getPrice() * op.getQuantity())
                .sum();
    }

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderProduct> orderProducts = new ArrayList<>();

    public Order(LocalDateTime orderDateTime, Boolean cancelled,
            Customer customer, List<OrderProduct> orderProductList) {
        this.orderDateTime = orderDateTime;
        this.cancelled = cancelled;
        this.customer = customer;
        this.orderProducts = orderProductList;
    }

    public void setOrderProducts(List<OrderProduct> orderProducts) {
        this.orderProducts = orderProducts;
        for (OrderProduct op : orderProducts) {
            op.setOrder(this);
        }
    }

    public String getFormattedOrderDateTime() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        return orderDateTime.format(formatter);
    }

}

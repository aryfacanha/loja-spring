package com.ary.loja.orderproduct;

import java.time.LocalDate;

import com.ary.loja.order.Order;
import com.ary.loja.product.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table
@Entity
public class OrderProduct {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  @Column(nullable = false)
  private Double price;
  private LocalDate refundDateTime;
  @Column(nullable = false)
  private Integer quantity;
  @ManyToOne
  @JoinColumn(name = "product_id")
  private Product product;
  @ManyToOne
  @JsonIgnore
  @JoinColumn(name = "order_id")
  private Order order;

  public OrderProduct(Double price, LocalDate refundDateTime, Product product, Order order, Integer quantity) {
    this.price = price;
    this.refundDateTime = refundDateTime;
    this.product = product;
    this.order = order;
    this.quantity = quantity;
  }
 
}

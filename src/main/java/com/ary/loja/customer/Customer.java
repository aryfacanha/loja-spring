package com.ary.loja.customer;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table
public class Customer {
  @Id
  @GeneratedValue(strategy= GenerationType.IDENTITY)
  private Integer id;
  @Column(nullable = false)
  private String name;
  @Column(nullable = false)
  private String email;

}

package com.ary.loja.product;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import com.ary.loja.brand.Brand;
import com.ary.loja.category.Category;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table
public class Product {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private Double price;
    private String name;
    private String description;
    private Boolean refundable;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime creationDateTime;


    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @ManyToMany
    @JoinTable(name="product_category", joinColumns=@JoinColumn(name="product_id"), inverseJoinColumns=@JoinColumn(name="category_id"))
    private List<Category> categories;


    public Product(String name, String description, Double price, Boolean refundable, List<Category> categories, Brand brand) {
        this.name = name;
        this.price = price;
        this.refundable = refundable;
        this.description = description;
        this.categories = categories;
        this.brand = brand;
        this.creationDateTime = LocalDateTime.now();
    }

    public String getFormattedCreationDateTime() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        return creationDateTime.format(formatter);
    }

}

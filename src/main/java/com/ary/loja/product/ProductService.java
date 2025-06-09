package com.ary.loja.product;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return (List<Product>) productRepository.findAll();
    }

    public Product getProductById(Integer id) {
        return productRepository.findById(id).get();
    }

    public void addNewProduct(Product product) {
        productRepository.save(product);
    }

    @Transactional
    public void updateProductById(Integer id, String name, Double price, String description, Boolean refundable) {

        Product product = productRepository.findById(id).get();

        if (name != null && !Objects.equals(product.getName(), name)) {
            product.setName(name);
        }

        if (price != null && Double.compare(product.getPrice(), price) != 0) {
            product.setPrice(price);
        }

        if (description != null && !Objects.equals(product.getDescription(), description)) {
            product.setDescription(description);
        }

        if (refundable != null && !Objects.equals(product.getRefundable(), refundable)) {
            product.setRefundable(refundable);
        }

    }

    public void deleteProductById(Integer id) {
        Product product = productRepository.findById(id).get();

        productRepository.delete(product);
    }

}

package com.ary.loja.product;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ary.loja.brand.Brand;

import lombok.AllArgsConstructor;



@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/product")
public class ProductController {

    private final ProductService productService;
    
    @GetMapping("/all")
    public List<Product> getProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Integer id) {
        return productService.getProductById(id);
    }

    @PostMapping
    public void addProduct(Product product) {
        productService.addNewProduct(product);
    }

    @PutMapping("/{id}")
    public void updateProduct(@PathVariable Integer id, @RequestParam(required=false) String name, @RequestParam(required=false) Double price, @RequestParam(required=false) String description, @RequestParam(required=false) Boolean refundable, @RequestParam(required = false) Brand brand) {
        productService.updateProductById(id, name, price, description, refundable, brand);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProductById(@PathVariable Integer id) {
        productService.deleteProductById(id);
    }

    @GetMapping("/search")
    public List<Product> getProductsByName(@RequestParam String str) {
        return productService.getProductsByName(str);
    }
    

}

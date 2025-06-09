package com.ary.loja.brand;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/brand")
public class BrandController {

    private final BrandService brandService;

    @GetMapping("/all")
    public List<Brand> getAllBrands(){
        return brandService.getAllBrands();
    }

    @GetMapping("/{id}")
    public Brand getBrandById(@PathVariable Integer id) {
        return brandService.findBrandById(id);
    }
    
    @PostMapping
    public void addBrand(Brand brand) {
        brandService.addBrand(brand);
    }

    @PutMapping
    public void updateBrand(Brand brand) {
        brandService.updateBrand(brand);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBrand(@PathVariable Integer id) {
        brandService.deleteBrandById(id);
    }
}

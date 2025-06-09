package com.ary.loja.brand;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class BrandService {
 
    private final BrandRepository brandRepository;

    private boolean isNamePresent(String name) {

        Optional<Brand> nameExists = brandRepository.findByName(name);

        return nameExists.isPresent();

    }

    private void checkName(String name) {

          if(isNamePresent(name)) {
            throw new IllegalStateException("Brand with the name " + name + " already exists");
        }
     

    }

    public List<Brand> getAllBrands() {
        return (List<Brand>) brandRepository.findAll();
    }

    public Brand findBrandById(Integer id) {
        return brandRepository.findById(id).get();
    }

    public void addBrand(Brand brand) {

        String name = brand.getName();

        if(name == null || name.trim().isEmpty()) {
            throw new IllegalStateException("Name not present");
        }
        checkName(name);

        brandRepository.save(brand);
    }

    public void updateBrand(Brand brand) {

        if(brand.getId() == null) {
            throw new IllegalStateException("ID not present");
        }

        checkName(brand.getName());
     
        brandRepository.save(brand);
    }

    public void deleteBrandById(Integer id) {
        
        Optional<Brand> brandExists = brandRepository.findById(id);

        if(!brandExists.isPresent()) {
            throw new IllegalStateException("Brand with ID "+ id +" not found");
        }

        brandRepository.deleteById(id);
    }
    
}

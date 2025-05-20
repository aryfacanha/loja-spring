package com.ary.loja.category;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Service
public class CategoryService {

    private CategoryRepository categoryRepository;

    private boolean isNameAvailable(String name) {

        Optional<Category> nameExists = categoryRepository.findByName(name);

        if (nameExists.isPresent()) {
            throw new IllegalStateException("Category with the name " + name + " already exists");
        }

        return true;
    }

    public List<Category> getAllCategories() {
        return (List<Category>) categoryRepository.findAll();
    }

    public Category getCategoryById(Integer id) {
        return categoryRepository.findById(id).get();
    }

    @Transactional
    public void updateCategoryById(Integer id, String name, String description) {

        Category category = categoryRepository.findById(id).get();

        if (name != null && name.length() > 0 && !Objects.equals(name, category.getName()) && isNameAvailable(name)) {

            category.setName(name);

        }

        if (description != null && !Objects.equals(description, category.getDescription())) {
            category.setDescription(description);
        }

    }

    public void deleteCategoryById(Integer id) {

        Category category = categoryRepository.findById(id).get();

        categoryRepository.delete(category);
    }

    public void addCategory(Category category) {

        if(isNameAvailable(category.getName())){
            categoryRepository.save(category);
        }

    }

}

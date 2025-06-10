// Brands

function getBrands(callback) {
    $.ajax({
        url: 'http://localhost:8080/api/brand/all',
        method: "GET",
    }
    ).done(
        function (data) {
            if (typeof callback === "function") {
                callback(data);
            }
        }
    )
}

function getBrand(brandId, callback) {

    $.ajax({
        url: `http://localhost:8080/api/brand/${brandId}`,
        method: 'GET',
    }).done(
        function (data) {
            if (typeof callback === 'function') {
                callback(data)
            }
        }
    ).fail(function (xhr, status, error) {
        let message = "Erro desconhecido";
        if (xhr.responseJSON && xhr.responseJSON.message) {
            message = xhr.responseJSON.message;
        } else if (xhr.responseText) {
            message = xhr.responseText;
        }
        alert("Erro ao buscar marca: " + message);
    })

}

// Category

function getCategory(categoryId, callback) {

    $.ajax({
        url: `http://localhost:8080/api/category/${categoryId}`,
        method: 'GET',
    }).done(
        function (data) {
            if (typeof callback === 'function') {
                callback(data)
            }
        }
    ).fail(function (xhr, status, error) {
        let message = "Erro desconhecido";
        if (xhr.responseJSON && xhr.responseJSON.message) {
            message = xhr.responseJSON.message;
        } else if (xhr.responseText) {
            message = xhr.responseText;
        }
        alert("Erro ao buscar categoria: " + message);
    })

}

function getCategories(callback) {
    $.ajax({
        url: 'http://localhost:8080/api/category/all',
        method: "GET",
    }
    ).done(
        function (data) {

            if (typeof callback === 'function') {
                callback(data)
            }

        }
    )
}
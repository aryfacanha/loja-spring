// Load navbar
document.addEventListener("DOMContentLoaded", function () {
  fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar-placeholder").innerHTML = data;
    });
});

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

// Customers

function getCustomer(customerId, callback) {

    $.ajax({
        url: `http://localhost:8080/api/customer/${customerId}`,
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
        alert("Erro ao buscar cliente: " + message);
    })

}

function getCustomers(callback) {
    $.ajax({
        url: 'http://localhost:8080/api/customer/all',
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

// Products

function getProducts(callback) {
    $.ajax({
        url: 'http://localhost:8080/api/product/all',
        method: "GET",
    }
    ).done(
        function (data) {
            if (typeof callback === 'function') {
                return callback(data)
            }
        }
    )
}

function getProduct(productId, callback) {

    $.ajax({
        url: `http://localhost:8080/api/product/${productId}`,
        method: 'GET',
    }).done(
        function (data) {
            if (typeof callback === 'function') {
                return callback(data)
            }
        }
    ).fail(function (xhr, status, error) {
        let message = "Erro desconhecido";
        if (xhr.responseJSON && xhr.responseJSON.message) {
            message = xhr.responseJSON.message;
        } else if (xhr.responseText) {
            message = xhr.responseText;
        }
        alert("Erro ao buscar produto: " + message);
    })

}

function getProductsByName(str, callback) {
    $.ajax({
        url: `http://localhost:8080/api/product/search?str=${str}`,
        method: "GET",
    }
    ).done(
        function (data) {
            if (typeof callback === 'function') {
                return callback(data)
            }
        }
    )
}

// Orders

function debounceInput(selector, delay, callback) {
    let timer;
    $(selector).on('input', function () {
        clearTimeout(timer);
        const value = $(this).val();
        timer = setTimeout(() => callback(value), delay);
    });
}

function getOrders(callback) {
    $.ajax({
        url: 'http://localhost:8080/api/order/all',
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

function getOrder(orderId, callback) {

    $.ajax({
        url: `http://localhost:8080/api/order/${orderId}`,
        method: 'GET',
    }).done(
        function (data) {
            if (typeof callback === 'function') {
                return callback(data)
            }
        }
    ).fail(function (xhr, status, error) {
        let message = "Erro desconhecido";
        if (xhr.responseJSON && xhr.responseJSON.message) {
            message = xhr.responseJSON.message;
        } else if (xhr.responseText) {
            message = xhr.responseText;
        }
        alert("Erro ao buscar pedido: " + message);
    })

}

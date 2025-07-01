function createProduct() {
    $.ajax({
        url: 'http://localhost:8080/api/product',
        method: 'POST',
        data: $("#form").serialize()
    }).done(
        function () {
            alert("Produto cadastrado")
            updateTable();
        }
    ).fail(function (xhr, status, error) {
        let message = "Erro desconhecido";
        if (xhr.responseJSON && xhr.responseJSON.message) {
            message = xhr.responseJSON.message;
        } else if (xhr.responseText) {
            message = xhr.responseText;
        }
        alert("Erro ao salvar produto: " + message);
    })
}


function updateTable() {

    getProducts(function (data) {

        $('#products').empty()

        if (data.length > 0) {

                
            for (i = 0; i < data.length; i++) {
                let product = data[i]
                let categories = '';
                for (j = 0; j < product.categories.length; j++) {
                    categories += `${product.categories[j].name}, `
                }
                categories = categories.trim().slice(0, -1)

                $('#products').append(`<tr>
                    <th scope="col">
                        <div>${product.id}</div>
                    </th>
                    <th scope="col">
                        ${product.name}
                    </th>
                    <th scope="col">
                        R$ ${product.price}
                    </th>
                    <th scope="col">
                        ${product.description == null ? '' : product.description}
                    </th>
                    <th scope="col">
                        ${product.brand.name}
                    </th>
                    <th scope="col">
                        ${categories}
                    </th>
                    <th scope="col">
                        ${product.refundable == true ? 'Sim' : 'Não'}
                    </th>
                    <th scope="col" class="text-center">
                        <button class="btn border btn-update" product="${product.id}">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </th>
                    <th scope="col" class="text-center">
                        <button class="btn border btn-delete" product="${product.id}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </th>
                </tr>`)
            }
        }

    })
}

function updateForm(productId) {

    getProduct(productId, function (data) {


        if (data != null) {

            if ($('#id').val() == '' || $('#id').val() == null) {
                $('#btn-cancel').toggleClass('d-none')
                $('#btn-save').val('update')
            }

            $('#id').val(data.id)
            $('#name').val(data.name)
            $('#price').val(data.price)
            $('#description').val(data.description)
            $('#refundable').val(`${data.refundable}`).change()

            $('#brands').val(`${data.brand.id}`).change()

            for (i = 0; i < data.categories.length; i++) {
                $(`#cat${data.categories[i].id}`).prop('checked', true)
            }
            $('#btn-save').html('Atualizar')

        }
    })
}

function fillBrands(select) {


    getBrands(function (data) {

        $(select).empty()

        $(select).append(`<option value="">--</option>`)

        if (data.length > 0) {
            for (i = 0; i < data.length; i++) {
                $(select).append(`<option value="${data[i].id}">${data[i].name}</option>`)
            }
        }
    })

}

function fillCategories(element) {

    getCategories(function (data) {

        $(element).empty()

        if (data.length > 0) {
            for (i = 0; i < data.length; i++) {
                $(element).append(`<div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="categories[]" id="cat${data[i].id}" value="${data[i].id}">
                        <label class="form-check-label" for="cat${data[i].id}">${data[i].name}</label>
                    </div>`)
            }
        }
    })

}

function updateProduct(productId) {
    $.ajax({
        url: `http://localhost:8080/api/product/${productId}`,
        method: 'PUT',
        data: $("#form").serialize()
    }).done(
        function () {
            alert("Produto atualizada")
            updateTable();
        }
    ).fail(function (xhr, status, error) {
        let message = "Erro desconhecido";
        if (xhr.responseJSON && xhr.responseJSON.message) {
            message = xhr.responseJSON.message;
        } else if (xhr.responseText) {
            message = xhr.responseText;
        }
        alert("Erro ao salvar produto: " + message);
    })
}

function deleteProduct(productId) {

    if (!confirm("Deseja deletar o item?")) {
        return
    }

    $.ajax({
        url: `http://localhost:8080/api/product/delete/${productId}`,
        method: "DELETE",
    }).done(
        function () {
            alert("Produto Deletado")
            updateTable()
        }
    ).fail(function (xhr, status, error) {
        let message = "Erro desconhecido";
        if (xhr.responseJSON && xhr.responseJSON.message) {
            message = xhr.responseJSON.message;
        } else if (xhr.responseText) {
            message = xhr.responseText;
        }
        alert("Erro ao deletar produto: " + message);
    })
}

$(document).on("click", ".btn-update", function (event) {
    let product = $(this).attr('product')
    updateForm(product)
})

$(document).on("click", ".btn-delete", function (event) {
    let product = $(this).attr('product')
    deleteProduct(product)

})

$(function () {
    $('#btn-save').on("click", function (event) {
        event.preventDefault()
        createProduct()
    })

    $('#btn-cancel').on("click", function (event) {
        $('#form input').val('')
        $(this).toggleClass('d-none')
        $('#btn-save').val('update')
        $('#btn-save').html('Cadastrar')
        $('#refundable').val('true')
        $('[name="categories[]"]').prop('checked', false)
        $('#description').val('')
        $('#brands').val('')
    })

    updateTable();
    fillBrands('#brands');
    fillCategories('#categories-div')

})

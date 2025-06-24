
// Order Object

let orderProducts = []

function createOrder() {
    $.ajax({
        url: 'http://localhost:8080/api/order',
        method: 'POST',
        data: JSON.stringify(order),
    }).done(
        function () {
            alert("Pedido cadastrado")
            updateTable();
        }
    ).fail(function (xhr, status, error) {
        let message = "Erro desconhecido";
        if (xhr.responseJSON && xhr.responseJSON.message) {
            message = xhr.responseJSON.message;
        } else if (xhr.responseText) {
            message = xhr.responseText;
        }
        alert("Erro ao salvar pedido: " + message);
    })
}


function updateTable() {

    getOrders(function (data) {
        $('#orders').empty()

        if (data.length > 0) {

            for (i = 0; i < data.length; i++) {
                let order = data[i]
                $('#orders').append(`<tr>
                    <th scope="col">
                        <div>${order.id}</div>
                    </th>
                    <th scope="col">
                        ${order.name}
                    </th>
                    <th scope="col">
                        ${order.email}
                    </th>
                    <th scope="col" class="text-center">
                        <button class="btn border btn-update" order="${order.id}">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </th>
                    <th scope="col" class="text-center">
                        <button class="btn border btn-delete" order="${order.id}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </th>
                </tr>`)
            }
        }
    })

}

function fillCustomers(select) {

    getCustomers(function (data) {

        for (let i = 0; i < data.length; i++) {

            let customer = data[i]

            $(`#${select}`).append(`<option value="${customer.id}">${customer.name}</option>`);
        }

    })


}



function updateForm(order) {

    getOrder(order, function (data) {
        if (data != null) {

            if ($('#id').val() == '' || $('#id').val() == null) {
                $('#btn-cancel').toggleClass('d-none')
                $('#btn-save').val('update')
            }

            $('#id').val(data.id)
            $('#name').val(data.name)
            $('#email').val(data.email)
            $('#btn-save').html('Atualizar')


        }
    })


}

function updateOrder(orderId) {
    $.ajax({
        url: `http://localhost:8080/api/order/${orderId}`,
        method: 'PUT',
        data: $("#form").serialize()
    }).done(
        function () {
            alert("Pedido atualizado")
            updateTable();
        }
    ).fail(function (xhr, status, error) {
        let message = "Erro desconhecido";
        if (xhr.responseJSON && xhr.responseJSON.message) {
            message = xhr.responseJSON.message;
        } else if (xhr.responseText) {
            message = xhr.responseText;
        }
        alert("Erro ao salvar pedido: " + message);
    })
}

function deleteOrder(orderId) {

    if (!confirm("Deseja deletar o item?")) {
        return
    }

    $.ajax({
        url: `http://localhost:8080/api/order/delete/${orderId}`,
        method: "DELETE",
    }).done(
        function () {
            alert("Pedido Deletada")
            getOrders();
        }
    ).fail(function (xhr, status, error) {
        let message = "Erro desconhecido";
        if (xhr.responseJSON && xhr.responseJSON.message) {
            message = xhr.responseJSON.message;
        } else if (xhr.responseText) {
            message = xhr.responseText;
        }
        alert("Erro ao deletar pedido: " + message);
    })
}

function findProducts(str, element) {

    getProductsByName(str, function (data) {

        $(element).empty()

        if (data.length > 0) {
            for (i = 0; i < data.length; i++) {
                $(element).append(`<div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="orderProducts[]" id="prod${i}" value="${data[i].id}">
                        <label class="form-check-label" for="prod${i}">${data[i].name}</label>
                    </div>`)
            }
        }
    })
}

// Listeners

let prodCount = 0;

$(document).on("click", ".btn-update", function (event) {
    let order = $(this).attr('order')
    updateForm(order)
})

$(document).on("click", ".btn-delete", function (event) {
    let order = $(this).attr('order')
    deleteOrder(order)

})

$(document).on("click", "#btn-add", function (opt) {

    const selectedOption = $('#product-select').find('option:selected');
    const value = selectedOption.val();


    if (value == null || value == '') {
        return
    }

    getProduct(value, function (data) {

        if (data != null) {

            let categories = '';
            for (i = 0; i < data.categories.length; i++) {
                categories += `${data.categories[i].name}, `
            }
            categories = categories.trim().slice(0, -1)

            let found = orderProducts.find(e => e.product.id === data.id);

            if (found) {

                console.log(found)

                const prodRow = $(`#prodRow${data.id} .prodCount`)

                console.log(prodRow)

                found.quantity += 1

                console.log(found.quantity)

                prodRow.html(found.quantity)

                return
            }

            let orderProduct = {
                price: data.price,
                quantity: 1,
                product: data
            }

            prodCount++

            orderProducts.push(orderProduct)

            $('#product-list').append(`<tr id="prodRow${data.id}">
                    <th scope="col">
                        ${data.name}
                    </th>
                    <th scope="col">
                        R$ ${data.price}
                    </th>
                    <th scope="col">
                        ${data.description == null ? '' : data.description}
                    </th>
                    <th scope="col">
                        ${data.brand.name}
                    </th>
                    <th scope="col">
                        ${categories}
                    </th>
                    <th scope="col">
                        ${data.refundable == true ? 'Sim' : 'Não'}
                    </th>
                    <th scope="col" class="prodCount">
                        1
                    </th>
                    <th scope="col" class="text-center">
                        <button class="btn border btn-remove" type="button" productId="${data.id}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </th>
                </tr>`)

        }
    })

})

$(document).on("click", ".btn-remove", function (event) {

    const productId = Number($(this).attr('productId'));

    let foundIndex = orderProducts.findIndex(e => e.product.id === productId);

    if (foundIndex === -1) {
        return
    }

    
    const found = orderProducts[foundIndex]

    if (found.quantity == 1) {
        orderProducts.splice(foundIndex, 1)
        $(`#prodRow${productId}`).remove()
        prodCount--
        return
    }

    found.quantity -= 1

    $(`#prodRow${productId} .prodCount`).html(found.quantity)


})

$(function () {

    $('#form').on("submit", function (event) {
        event.preventDefault()
        let orderDate = $('#orderDate').val()
        let customer = $('#customer').val()
        let cancelled = $('#cancelled').val()

        let order = {
            orderProducts: orderProducts,
            customer: { id: customer },
            cancelled: cancelled,
            orderDateTime: orderDate
        }
        console.log(orderProducts)
        //createOrder()
    })

    debounceInput('#product-search', 500, function (str) {

        getProductsByName(str, function (data) {

            let nullOption = `<option value="">--</option>`

            let select = $('#product-select')

            select.empty()



            if (data == null || data.length == 0) {
                select.append(nullOption)
                return
            }


            for (i = 0; i < data.length; i++) {

                let prod = data[i]

                select.append(`<option value="${prod.id}">${prod.name}</option>`)

            }
        })

    })

    $('#btn-cancel').on("click", function (event) {
        $('#form input').val('')
        $('#email').val('')
        $(this).toggleClass('d-none')
        $('#btn-save').val('update')
        $('#btn-save').html('Cadastrar')
    })

    fillCustomers('customer');

    updateTable();

})

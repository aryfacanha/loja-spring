function createCustomer() {
    $.ajax({
        url: 'http://localhost:8080/api/customer',
        method: 'POST',
        data: $("#form").serialize()
    }).done(
        function () {
            alert("Cliente cadastrado")
            updateTable();
        }
    ).fail(function (xhr, status, error) {
        let message = "Erro desconhecido";
        if (xhr.responseJSON && xhr.responseJSON.message) {
            message = xhr.responseJSON.message;
        } else if (xhr.responseText) {
            message = xhr.responseText;
        }
        alert("Erro ao salvar cliente: " + message);
    })
}


function updateTable(data) {

    getCustomers(function (data) {
        $('#customers').empty()

        if (data.length > 0) {

            for (i = 0; i < data.length; i++) {
                let customer = data[i]
                $('#customers').append(`<tr>
                    <th scope="col">
                        <div>${customer.id}</div>
                    </th>
                    <th scope="col">
                        ${customer.name}
                    </th>
                    <th scope="col">
                        ${customer.email}
                    </th>
                    <th scope="col" class="text-center">
                        <button class="btn border btn-update" customer="${customer.id}">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </th>
                    <th scope="col" class="text-center">
                        <button class="btn border btn-delete" customer="${customer.id}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </th>
                </tr>`)
            }
        }
    })

}



function updateForm(customer) {

    getCustomer(customer, function (data) {
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

function updateCustomer(customerId) {
    $.ajax({
        url: `http://localhost:8080/api/customer/${customerId}`,
        method: 'PUT',
        data: $("#form").serialize()
    }).done(
        function () {
            alert("Cliente atualizado")
            updateTable();
        }
    ).fail(function (xhr, status, error) {
        let message = "Erro desconhecido";
        if (xhr.responseJSON && xhr.responseJSON.message) {
            message = xhr.responseJSON.message;
        } else if (xhr.responseText) {
            message = xhr.responseText;
        }
        alert("Erro ao salvar cliente: " + message);
    })
}

function deleteCustomer(customerId) {

    if (!confirm("Deseja deletar o item?")) {
        return
    }

    $.ajax({
        url: `http://localhost:8080/api/customer/delete/${customerId}`,
        method: "DELETE",
    }).done(
        function () {
            alert("Cliente Deletado")
            updateTable()
        }
    ).fail(function (xhr, status, error) {
        let message = "Erro desconhecido";
        if (xhr.responseJSON && xhr.responseJSON.message) {
            message = xhr.responseJSON.message;
        } else if (xhr.responseText) {
            message = xhr.responseText;
        }
        alert("Erro ao deletar cliente: " + message);
    })
}

$(document).on("click", ".btn-update", function (event) {
    let customer = $(this).attr('customer')
    updateForm(customer)
})

$(document).on("click", ".btn-delete", function (event) {
    let customer = $(this).attr('customer')
    deleteCustomer(customer)

})

$(function () {
    $('#btn-save').on("click", function (event) {
        event.preventDefault()
        createCustomer()
    })

    $('#btn-cancel').on("click", function (event) {
        $('#form input').val('')
        $('#email').val('')
        $(this).toggleClass('d-none')
        $('#btn-save').val('update')
        $('#btn-save').html('Cadastrar')
    })

    updateTable();
})

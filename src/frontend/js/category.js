function createCategory() {
    $.ajax({
        url: 'http://localhost:8080/api/category',
        method: 'POST',
        data: $("#form").serialize()
    }).done(
        function () {
            alert("Categoria cadastrada")
            location.reload()
        }
    ).fail(function (xhr, status, error) {
        let message = "Erro desconhecido";
        if (xhr.responseJSON && xhr.responseJSON.message) {
            message = xhr.responseJSON.message;
        } else if (xhr.responseText) {
            message = xhr.responseText;
        }
        alert("Erro ao salvar categoria: " + message);
    })
}


function updateTable(data) {

    getCategories(function (data) {
        $('#categories').empty()

        if (data.length > 0) {

            for (i = 0; i < data.length; i++) {
                let category = data[i]
                $('#categories').append(`<tr>
                    <th scope="col">
                        <div>${category.id}</div>
                    </th>
                     <th scope="col">
                        <div>${category.formattedCreationDateTime}</div>
                    </th>
                    <th scope="col">
                        ${category.name}
                    </th>
                    <th scope="col">
                        ${category.description == null ? '' : category.description}
                    </th>
                    <th scope="col" class="text-center">
                        <button class="btn border btn-update" category="${category.id}">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </th>
                    <th scope="col" class="text-center">
                        <button class="btn border btn-delete" category="${category.id}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </th>
                </tr>`)
            }
        }
    })

}



function updateForm(category) {

    getCategory(category, function (data) {
        if (data != null) {

            if ($('#id').val() == '' || $('#id').val() == null) {
                $('#btn-cancel').toggleClass('d-none')
                $('#btn-save').val('update')
            }

            $('#id').val(data.id)
            $('#name').val(data.name)
            $('#description').val(data.description)
            $('#btn-save').html('Atualizar')


        }
    })


}

function updateCategory(categoryId) {
    $.ajax({
        url: `http://localhost:8080/api/category/${categoryId}`,
        method: 'PUT',
        data: $("#form").serialize()
    }).done(
        function () {
            alert("Categoria atualizada")
            updateTable();
        }
    ).fail(function (xhr, status, error) {
        let message = "Erro desconhecido";
        if (xhr.responseJSON && xhr.responseJSON.message) {
            message = xhr.responseJSON.message;
        } else if (xhr.responseText) {
            message = xhr.responseText;
        }
        alert("Erro ao salvar categoria: " + message);
    })
}

function deleteCategory(categoryId) {

    if (!confirm("Deseja deletar o item?")) {
        return
    }

    $.ajax({
        url: `http://localhost:8080/api/category/delete/${categoryId}`,
        method: "DELETE",
    }).done(
        function () {
            alert("Categoria Deletada")
            updateTable()
        }
    ).fail(function (xhr, status, error) {
        let message = "Erro desconhecido";
        if (xhr.responseJSON && xhr.responseJSON.message) {
            message = xhr.responseJSON.message;
        } else if (xhr.responseText) {
            message = xhr.responseText;
        }
        alert("Erro ao deletar categoria: " + message);
    })
}

$(document).on("click", ".btn-update", function (event) {
    let category = $(this).attr('category')
    updateForm(category)
})

$(document).on("click", ".btn-delete", function (event) {
    let category = $(this).attr('category')
    deleteCategory(category)

})

$(function () {
    $('#btn-save').on("click", function (event) {
        event.preventDefault()
        createCategory()
    })

    $('#btn-cancel').on("click", function (event) {
        $('#form input').val('')
        $('#description').val('')
        $(this).toggleClass('d-none')
        $('#btn-save').val('update')
        $('#btn-save').html('Cadastrar')
    })

    updateTable();
})

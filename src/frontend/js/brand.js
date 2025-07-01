function createBrand() {
    $.ajax({
        url: 'http://localhost:8080/api/brand',
        method: 'POST',
        data: $("#form").serialize()
    }).done(
        function () {
            alert("Marca cadastrada")
            updateTable();
        }
    ).fail(function (xhr, status, error) {
        let message = "Erro desconhecido";
        if (xhr.responseJSON && xhr.responseJSON.message) {
            message = xhr.responseJSON.message;
        } else if (xhr.responseText) {
            message = xhr.responseText;
        }
        alert("Erro ao salvar marca: " + message);
    })
}

function updateTable() {

    getBrands(function (data) {

        $('#brands').empty()

        if (data.length > 0) {

            for (i = 0; i < data.length; i++) {
                let brand = data[i]
                $('#brands').append(`<tr>
                    <th scope="col">
                        <div>${brand.id}</div>
                    </th>
                    <th scope="col">
                        <div>${brand.formattedCreationDateTime}</div>
                    </th>
                    <th scope="col">
                        ${brand.name}
                    </th>
                    <th scope="col" class="text-center">
                        <button class="btn border btn-update" brand="${brand.id}">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </th>
                    <th scope="col" class="text-center">
                        <button class="btn border btn-delete" brand="${brand.id}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </th>
                </tr>`)
            }
        }
    })
}

function updateForm(data) {

    if (data != null) {

        if ($('#id').val() == '' || $('#id').val() == null) {
            $('#btn-cancel').toggleClass('d-none')
            $('#btn-save').val('update')
            
        }

        $('#id').val(data.id)
        $('#name').val(data.name)
        $('#btn-save').html('Atualizar')

    }
}

function deleteBrand(brandId) {

    if (!confirm("Deseja deletar o item?")) {
        return
    }

    $.ajax({
        url: `http://localhost:8080/api/brand/delete/${brandId}`,
        method: "DELETE",
    }).done(
        function () {
            alert("Marca Deletada")
            updateTable();
        }
    ).fail(function (xhr, status, error) {
        let message = "Erro desconhecido";
        if (xhr.responseJSON && xhr.responseJSON.message) {
            message = xhr.responseJSON.message;
        } else if (xhr.responseText) {
            message = xhr.responseText;
        }
        alert("Erro ao deletar marca: " + message);
    })
}

$(document).on("click", ".btn-update", function (event) {
    let brand = $(this).attr('brand')
    getBrand(brand, updateForm)
})

$(document).on("click", ".btn-delete", function (event) {
    let brand = $(this).attr('brand')
    deleteBrand(brand)
})

$(function () {
    $('#btn-save').on("click", function (event) {
        event.preventDefault()
        createBrand()
    })

    $('#btn-cancel').on("click", function (event) {
        $('#form input').val('')
        $(this).toggleClass('d-none')
        $('#btn-save').val('update')
        $('#btn-save').html('Cadastrar')
    })

    updateTable();

})


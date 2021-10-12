var host = "https://gdb72580c38ae21-computer.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/";

function consultComputer() {

    $.ajax({
        url: host + "computer/computer",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta.items);
            showComputerTable(respuesta.items);
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        },
        complete: function (xhr, status) {
            //console.log(status);
        }

    });

}

function showComputerTable(items) {
    if (items.length > 0) {
        var tabla = `<table border="1">
                  <tr>
                    <th>ID</th>
                    <th>BRAND</th>
                    <th>MODEL</th>
                    <th>CATEGORY_ID</th>
                    <th>NAME</th>
                    
                    <th>ACCIONES</th>
                  </tr>`;


        for (var i = 0; i < items.length; i++) {
            tabla += `<tr>
                   <td>${items[i].id}</td>
                   <td>${items[i].brand}</td>
                   <td>${items[i].model}</td>
                   <td>${items[i].category_id}</td>
                   <td>${items[i].name}</td>
                   <td>
                        <button onclick="deleteComputerById(${items[i].id})">Eliminar</button>

                        <a href="detalleComputer.html?id=${items[i].id}">
                            <button type="submit"> Editar </button>
                        </a>
                   </td> 
                   </tr>`;
        }
        tabla += `</table>`;
        $("#computertable").html(tabla);
    }
    else {
        alert("No existen computadores para mostrar");
        window.location.href = "/"
    }
}

function saveComputer() {
 
    var id = +$("#id_computer").val();
    var brand= $("#brand").val();
    var  model= +$("#model").val();
    var category_id= +$("#category_id").val();
    var name=$("#namecomputer").val();

    if (id == 0 || brand.length === 0|| name.length === 0 || model==0 || category_id==0) {
        alert("No se puede guardar el computador, tiene campos vacios");
    }
    else {
        var computer = new Object();
        computer.id = id;
        computer.brand=brand;
        computer.model=model;
        computer.category_id=category_id;
        computer.name=name;

        $.ajax({
            url: host + "computer/computer",
            type: 'POST',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(computer),
            statusCode: {
                201: function () {
                    alert('Se ha guardado el computador con id: ' + id);
                    consultComputer();
                },
                555: function () {
                    alert('Un error ocurrio, No se puede guardar el computador con el id: ' + id)
                }
            }
        });

    }
}

function deleteComputerById(id) {
    console.log("ejecutando funcion para eliminar")
    console.log(id)

    var computer = new Object();
    computer.id = id;

    $.ajax({
        url: host+"computer/computer",
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(computer),
        statusCode: {
            204: function () {
                alert('Se ha eliminado el computador cond id: ' + id);
                consultComputer()
            },
            555: function () {
                alert('Un error ocurrio, No se puede eliminar el computador con el id: ' + id)
                window.location.href = "/"
            }
        }
    });
}
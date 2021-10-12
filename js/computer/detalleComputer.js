$(document).ready(function () {
    console.log("document ready!");
    let searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('id')){
        let id = searchParams.get('id')
        consultComputerById(id);
    }
});

var host = "https://gdb72580c38ae21-computer.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/";

function consultComputerById(id){
    $.ajax({
        url: host+"computer/computer/"+id,
        type: 'GET',
        dataType: 'json',
        success: function(respuesta){
            console.log(respuesta.items);
            if (respuesta.items.length==1){
                updateComputerForm(respuesta.items[0]);
            }else{
                alert('No se encuentra el computador con el id '+id);
                window.location.href = "/"
            }
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
            window.location.href = "/"
        }
    });
}

function updateComputerForm(item){
    $("#id_computer").val(item.id);
    $("#brand").val(item.brand);
    $("#model").val(item.model);
    $("#category_id").val(item.category_id);
    $("#namecomputer").val(item.name);
}

function updateComputer() {
    console.log("ejecutando funcion para actualizar");

    var id = +$("#id_computer").val();
    var brand= $("#brand").val();
    var  model= +$("#model").val();
    var category_id= +$("#category_id").val();
    var name=$("#namecomputer").val();

    if (brand.length === 0|| name.length === 0 || model==0 || category_id==0) {
        alert("No se puede actualizar el computador, tiene campos vacios");
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
            type: 'PUT',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(computer),
            statusCode: {
                201: function () {
                    alert('Se ha actualizado el computdor');
                    window.location.href = "/"
                },
                555:function(){
                    alert('Un error ocurrio, No se puede actualziar el computador')
                }
            }
        });
    }
}
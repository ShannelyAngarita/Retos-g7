var host="https://gdb72580c38ae21-computer.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/";

function consultClient(){

    $.ajax({
        url: host+"client/client",
        type: 'GET',
        dataType: 'json',
        success: function(respuesta){
            console.log(respuesta.items);
            showResult(respuesta.items);
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema'+status);
        },
        complete: function (xhr, status) {
            console.log(status);
        }
        
    });

}

function showResult(items){
    if (items.length > 0)
    {
        var tabla = `<table border="1">
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>AGE</th>
          <th>ACCIONES</th>
        </tr>`;
        
        for (var i=0; i < items.length; i++) {
        tabla +=`<tr>
                <td>${items[i].id}</td>
                <td>${items[i].name}</td>
                <td>${items[i].email}</td>
                <td>${items[i].age}</td>
                <td>
                    <button onclick="deleteClientById(${items[i].id})">Eliminar</button>
                    <a href="detalleClient.html?id=${items[i].id}">
                        <button type="submit"> Editar </button>
                    </a>
                </td> 
                </tr>`;
        }
        tabla +=`</table>`;
        $("#clienttable").html(tabla);

    }
    else{
        alert("No existen clientes para mostrar");
        window.location.href = "/"
    }
}

function saveClient() {
    var id=+$("#id").val();
    var name=$("#name").val();
    var email=$("#email").val();
    var age=+$("#age").val();
    
    if (id==0 || name.length ===0 || email.length ===0 ||age==0 ){
        alert("No se puede guardar el cliente, tiene campos vacios");
    }
    else{
        var client = new Object();
        client.id=id;
        client.name=name;
        client.email=email;
        client.age=age;
        var jsonclient=JSON.stringify(client);
        console.log(client)
        $.ajax({
            url: host+"client/client",
            type: 'POST',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data:jsonclient,
            statusCode:{
                201:function(){
                    alert('Se ha guardado el cliente con id: '+id);
                    consultClient();
                },
                555:function(){
                    alert('Un error ocurrio, No se puede guardar el cliente con el id: '+ id)
                }
            }
        });

    }
}

function deleteClientById(id){
    console.log("ejecutando funcion para eliminar")
    console.log(id)
    
    var client = new Object();
    client.id=id;
    
    $.ajax({
        url: host+"client/client",
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(client),
        statusCode:{
            204:function(){
                alert('Se ha eliminado el cliente con id: '+id);
                consultClient();
            }
        },
    });
}

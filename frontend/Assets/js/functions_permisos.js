var tablePermits;
//nuevo permiso
document.addEventListener('DOMContentLoaded', function(){

    tableRoles = $('#tablePermits').dataTable( {
        "aProcessing":true,
        "aServerSide":true,
        "language":{
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax":{
            "url": " "+base_url+"/permits/getPermits",
            "dataSrc":""
        },
        "columns":[ 
            {data: "id_modules"},
            {data: "name_modules"},
            {data: "name_role"},
            {data: "view_modules", 
            "searchable": false,
            "orderable":false,
            "render": function (data, type ,row) {
                if (row.view_modules == 1) {
                    return '<span class="align-bottom badge badge-pill badge-success"><i class="fas fa-check-circle"></i></span>';
                } else {
                    return '<span class="align-bottom badge badge-pill badge-danger"><i class="fas fa-times"></i></span>';
                }
            }
            },
            {data: "create_modules", 
            "searchable": false,
            "orderable":false,
            "render": function (data, type ,row) {
                if (row.create_modules == 1) {
                    return '<span class="align-bottom badge badge-pill badge-success"><i class="fas fa-check-circle"></i></span>';
                } else {
                    return '<span class="align-bottom badge badge-pill badge-danger"><i class="fas fa-times"></i></span>';
                }
            }
            },
            {data: "edit_modules", 
            "searchable": false,
            "orderable":false,
            "render": function (data, type ,row) {
                if (row.edit_modules == 1) {
                    return '<span class="align-bottom badge badge-pill badge-success"><i class="fas fa-check-circle"></i></span>';
                } else {
                    return '<span class="align-bottom badge badge-pill badge-danger"><i class="fas fa-times"></i></span>';
                }
            }
            },
            {data: "delete_modules", 
            "searchable": false,
            "orderable":false,
            "render": function (data, type ,row) {
                if (row.delete_modules == 1) {
                    return '<span class="align-bottom badge badge-pill badge-success"><i class="fas fa-check-circle"></i></span>';
                } else {
                    return '<span class="align-bottom badge badge-pill badge-danger"><i class="fas fa-times"></i></span>';
                }
            }
            },
            {data: "fechaCreacion"},
            {data: 0,"render": function (data ,type ,row) {
                return '<div class="text-center"><button class="btn btn-secondary btn-sm btnPermisosRole" onClick="btnPermisosRole('+row.id_roles+')" title="Permisos"><i class="fas fa-key"></i></button><button class="btn btn-primary btn-sm btnEditRole" onClick="ftnEditRol('+row.id_roles+')" title="Editar"><i class="fas fa-pencil-alt"></i></button><button class="btn btn-danger btn-sm btnDelRole" onClick="ftnDelRol('+row.id_roles+')" title="Eliminar"><i class="fas fa-trash-alt"></i></button></div>'
            }}
        ],
        "resonsieve":"true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [[0,"asc"]]
        
    });

    //Nuevo permiso
    var formPermit = document.querySelector("#formPermits");
    formPermit.onsubmit = function(e){
    e.preventDefault();
    var id_permits = document.querySelector('#idPermits').value;
    var modules = document.querySelector('#modules').value;
    var pk_fk_id_roles = document.querySelector('#pk_fk_id_roles').value;
    var view = document.querySelector('#view').value;
    var create = document.querySelector('#create').value;
    var edit = document.querySelector('#edit').value;
    var delet = document.querySelector('#delete').value;

    if (modules == '' || pk_fk_id_roles == '') 
    {
        swal("Atención", "Todos los campos son obligatorios.", "error");
        return false;
    }
    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var ajaxUrl = base_url+'/permits/setPermit';
    var formData = new FormData(formPermit);
    request.open("POST",ajaxUrl,true);
    request.send(formData);
        /*var formDataJson = {"idRole":id_roles,"name_role":name_role,"description_role":description_role,"role_status":role_status};
        console.log(formDataJson);
        request.open("PUT",ajaxUrl,true);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(formDataJson));*/
        request.onreadystatechange = function () {
            
            if (request.readyState == 4 && request.status == 200) {
                    
                var objData = JSON.parse(request.responseText);
        
                if (objData.status) 
                {
                    $('#modalPermits').modal("hide");
                    formPermit.reset();
                    swal("Permmiso", objData.msg , "success");
                    tablePermits.api().ajax.reload();
                }else{
                    swal("Error", objData.msg , "error")
                }
            }
        }
    }
})



window.addEventListener('load', function () {
    ftnModules();
    ftnRolespermits();
},false);

//obtener modulos
function ftnModules() {
    var ajaxUrl = base_url+'/permits/getModules';
    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    request.open("GET",ajaxUrl,true);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var objData = JSON.parse(request.responseText);
            var $select = $('#modules');
            $.each(objData,function (id_roles, name) {
                $select.append('<option value="'+name.id_modules+'">'+name.name_modules+'</option>');       
            });
            document.querySelector('#modules').value = 1;
            $('#modules').selectpicker('render');
        }
    }
}
//obtener roles
function ftnRolespermits() {
    var ajaxUrl = base_url+'/roles/getRoles';
    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    request.open("GET",ajaxUrl,true);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var objData = JSON.parse(request.responseText);
            var $select = $('#pk_fk_id_roles');
            $.each(objData,function (id_roles, name) {
                $select.append('<option value="'+name.id_roles+'">'+name.name_role+'</option>');       
            });
            document.querySelector('#pk_fk_id_roles').value = 1;
            $('#pk_fk_id_roles').selectpicker('render');
        }
    }
}

function openModal() {

    document.querySelector('#idPermits').value = "";
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
    document.querySelector('#btnText').innerHTML = "Guardar";
    document.querySelector('#titleModal').innerHTML = "Nuevo Permiso";
    document.querySelector('#updated_att').innerHTML = "";
    document.querySelector('#formPermits').reset();

    $('#modalPermits').modal('show');
}
var enmiendas = [];
enmiendas.push(new Enmienda("ENM01","SUSTRATO HUERTO","Nuestro SUSTRATO HUERTO URBANO está elaborado en base a compost y perlita, reforzado con Bokashi, humus y biocarbón.","BIOINSUMOS CHAKRANA","BIOINSUMOS CHAKRANA","14.990","Sustrato","Disponible","30","EnmiendaSolida","40 litros","BlueExpress"))
enmiendas.push(new Enmienda("ENM02","ABONO BOKASHI","ABONO BOKASHI es un abono orgánico de origen natural completo para tus plantas","BIOINSUMOS CHAKRANA","BIOINSUMOS CHAKRANA","29.990","Abonos","No Disponible","30","EnmiendaSolida","20 litros","BlueExpress"))

function Listarenmiendas(){
    var filas = "";
    for (let i = 0; i <enmiendas.length; i++) {
        var e = enmiendas[i];
        filas += "<tr>";
        filas += "<td>" + e.codigo.toUpperCase() + "</td>";
        filas += "<td>" + e.nombre.toUpperCase() + "</td>";
        filas += "<td>" + e.descripcion + "</td>";
        filas += "<td>" + e.marca.toUpperCase() + "</td>";
        filas += "<td>" + e.proveedor.toUpperCase() + "</td>";
        filas += "<td>" + e.precio + "</td>";
        filas += "<td>" + e.categoria.toUpperCase() + "</td>";
        filas += "<td>" + e.disponibilidad.toUpperCase() + "</td>";
        filas += "<td>" + e.stock.toUpperCase() + "</td>";
        filas += "<td>" + e.tipo.toUpperCase() + "</td>";
        filas += "<td>" + e.formato.toUpperCase() + "</td>";
        filas += "<td>" + e.despacho.toUpperCase() + "</td>";
        filas += "</tr>";
    }
    document.getElementById("tabladedatos").innerHTML = filas;
}
document.addEventListener("DOMContentLoaded",function(){Listarenmiendas();});

function limpiarCampos(x) {
    if (x === 1) {
        document.getElementById("txtcodigo").value = "";
    }
    document.getElementById("txtnom").value = "";
    document.getElementById("txtdesc").value = "";
    document.getElementById("txtmarca").value = "";
    document.getElementById("txtpro").value = "";
    document.getElementById("prec").value = "";
    document.getElementById("txtcat").value = "";
    document.getElementById("disponible").checked = true;
    document.getElementById("noDisponible").checked =false;
    document.getElementById("txtstock").value = "";
    document.getElementById("EnmiendaSolida").checked = true;
    document.getElementById("EnmiendaLiquida").checked = false;
    document.getElementById("txtFormato").value = "";
    document.getElementById("txtdespacho").value = "";
}

function consultar() {
    var cod = document.getElementById("txtcodigo").value;
    // Expresión regular para verificar si el código está en el rango de "ENM01" a "ENM30"
    const codigoRegex = /^ENM(0[1-9]|1\d|2\d|30)$/;

    if (!codigoRegex.test(cod)) {
        alert("El código debe estar en el rango de ENM01 hasta ENM30");
        document.getElementById("txtcodigo").focus();
        return;
    }

    let sw = 0;
    for (let i = 0; i < enmiendas.length; i++) {
        var e = enmiendas[i];
        if (cod === e.codigo) {
            sw = 1;
            document.getElementById("txtnom").value = e.nombre;
            document.getElementById("txtdesc").value = e.descripcion;
            document.getElementById("txtmarca").value = e.marca;
            document.getElementById("txtpro").value = e.proveedor;
            document.getElementById("prec").value = e.precio;
            document.getElementById("txtcat").value = e.categoria;
            if (e.disponibilidad === "Disponible") {
                document.getElementById("disponible").checked = true;
            } else {
                document.getElementById("noDisponible").checked = true;
            }
            document.getElementById("txtstock").value = e.stock;
            if (e.tipo === "EnmiendaSolida") {
                document.getElementById("EnmiendaSolida").checked = true;
            } else {
                document.getElementById("EnmiendaLiquida").checked = true;
            }
            document.getElementById("txtFormato").value = e.formato;
            document.getElementById("txtdespacho").value = e.despacho;
        }
    }

    var msg = "";
    if(sw === 0){
        msg = msg + "<div class='alert alert-warning alert-dismissible fade show' role='alert'>"
        msg = msg + "<strong>Enmienda no encontrada!</strong>"
        msg = msg + "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>"
        msg = msg + "</div>"
    }else if(sw === 1){
        msg = msg + "<div class='alert alert-success alert-dismissible fade show' role='alert'>"
        msg = msg + "<strong>Enmienda encontrada!</strong>"
        msg = msg + "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>"
        msg = msg + "</div>"
    }
    document.getElementById("mensajes").innerHTML = msg;
}

function registrar(){
    var cod = document.getElementById("txtcodigo").value.toUpperCase();
    var nom = document.getElementById("txtnom").value.toUpperCase();
    var des = document.getElementById("txtdesc").value.toUpperCase();
    var mar = document.getElementById("txtmarca").value.toUpperCase();
    var prov = document.getElementById("txtpro").value.toUpperCase();
    var pre = document.getElementById("prec").value;
    var cat = document.getElementById("txtcat").value.toUpperCase();

    var mdisp = "";
    if (document.getElementById("disponible").checked === true) {
        mdisp = "Disponible";
    } else {
        mdisp = "No Disponible";
    }

    var stock = document.getElementById("txtstock").value;
    var mtip = "";
    if (document.getElementById("EnmiendaSolida").checked === true) {
        mtip = "EnmiendaSolida";
    } else {
        mtip = "EnmiendaLiquida";
    }
    var form = document.getElementById("txtFormato").value.toUpperCase();
    var desp = document.getElementById("txtdespacho").value.toUpperCase();
    var errores = "";
    if (cod.trim().length < 2 || cod.trim().length > 5) {
        errores += "El código debe contener entre 2 y 5 caracteres!\n";
    } else {
        let x = 0;
        for (let i = 0; i < enmiendas.length; i++) {
            var e = enmiendas[i];
            if (cod === e.codigo) {
                x = 1;
                break;
            }
        }
        if (x === 1) {
            errores += "El código ya se encuentra registrado!\n";
        }
    }

    if (nom.trim().length < 2 || nom.trim().length > 14) {
        errores += "El nombre debe contener entre 2 y 14 caracteres!\n";
    }

    if (des.trim().length < 2 || des.trim().length > 40) {
        errores += "La descripción debe contener entre 2 y 40 caracteres!\n";
    }

    if (mar.trim().length < 2 || mar.trim().length > 40) {
        errores += "La marca debe contener entre 2 y 30 caracteres!\n";
    }

    if (prov.trim().length < 2 || prov.trim().length > 40) {
        errores += "El proveedor debe contener entre 2 y 40 caracteres!\n";
    }

    if (isNaN(pre) || pre <= 0) {
        errores += "El precio es incorrecto!\n";
    }

    if (cat.trim().length === 0) {
        errores += "Debe ingresar la categoría!\n";
    }

    if (isNaN(stock) || stock <= 0) {
        errores += "El stock es incorrecto!\n";
    }

    if (form.trim().length === 0) {
        errores += "Debe ingresar el formato del producto seleccionado!\n";
    }

    if (desp.trim().length === 0) {
        errores += "Debe ingresar el método de despacho!\n";
    }

    if (errores !== "") {
        alert(errores);
    } else {
        enmiendas.push(new Enmienda(cod, nom, des, mar, prov, pre, cat, mdisp, stock, mtip, form, desp));
        var msg = "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
        msg += "<strong>Enmienda registrado correctamente!</strong>";
        msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
        msg += "</div>";
        document.getElementById("mensajes").innerHTML = msg;
        Listarenmiendas();
        limpiarCampos();
    }
}

function modificar(){
    var cod = document.getElementById("txtcodigo").value.toUpperCase();
    var nom = document.getElementById("txtnom").value.toUpperCase();
    var des = document.getElementById("txtdesc").value.toUpperCase();
    var mar = document.getElementById("txtmarca").value.toUpperCase();
    var prov = document.getElementById("txtpro").value.toUpperCase();
    var pre = document.getElementById("prec").value;
    var cat = document.getElementById("txtcat").value.toUpperCase();

    var mdisp = "";
    if (document.getElementById("disponible").checked === true) {
        mdisp = "Disponible";
    } else {
        mdisp = "No Disponible";
    }

    var stock = document.getElementById("txtstock").value;
    var mtip = "";
    if (document.getElementById("EnmiendaSolida").checked === true) {
        mtip = "EnmiendaSolida";
    } else {
        mtip = "EnmiendaLiquida";
    }
    var form = document.getElementById("txtFormato").value.toUpperCase();
    var desp = document.getElementById("txtdespacho").value.toUpperCase();

    var errores = "";
    if (cod.trim().length < 2 || cod.trim().length > 5) {
        errores += "El código debe contener entre 2 y 5 caracteres!\n";
    } else {
        let x = 0;
        for (let i = 0; i < enmiendas.length; i++) {
            var e = enmiendas[i];
            if (cod === e.codigo) {
                x = 1;
                break;
            }
        }
        if (x === 0) {
            errores += "El código no se encuentra registrado!\n";
        }
    }

    if (nom.trim().length < 2 || nom.trim().length > 14) {
        errores += "El nombre debe contener entre 2 y 14 caracteres!\n";
    }

    if (des.trim().length < 2 || des.trim().length > 40) {
        errores += "La descripción debe contener entre 2 y 40 caracteres!\n";
    }

    if (mar.trim().length < 2 || mar.trim().length > 40) {
        errores += "La marca debe contener entre 2 y 40 caracteres!\n";
    }

    if (prov.trim().length < 2 || prov.trim().length > 40) {
        errores += "El proveedor debe contener entre 2 y 40 caracteres!\n";
    }

    if (isNaN(pre) || pre <= 0) {
        errores += "El precio es incorrecto!\n";
    }

    if (cat.trim().length === 0) {
        errores += "Debe ingresar la categoría!\n";
    }

    if (isNaN(stock) || stock <= 0) {
        errores += "El stock es incorrecto!\n";
    }

    if (form.trim().length === 0) {
        errores += "Debe ingresar el formato del producto seleccionado!\n";
    }

    if (desp.trim().length === 0) {
        errores += "Debe ingresar el método de despacho!\n";
    }

    if (errores !== "") {
        alert(errores);
    } else {
        var sw = 0;
        for (let i = 0; i < enmiendas.length; i++) {
            var e = enmiendas[i];
            if (cod === e.codigo) {
                var x = confirm ("¿Desea modificar el registro?")
                if (x === true){
                    sw = 1;
                    enmiendas[i].nombre = nom;
                    enmiendas[i].descripcion = des;
                    enmiendas[i].marca = mar;
                    enmiendas[i].proveedor = prov;
                    enmiendas[i].precio = pre;
                    enmiendas[i].categoria = cat;
                    enmiendas[i].disponibilidad = mdisp;
                    enmiendas[i].stock = stock;
                    enmiendas[i].tipo = mtip;
                    enmiendas[i].formato = form;
                    enmiendas[i].despacho = desp;
                    break;
                }else{
                    sw = 1;
                }
            }
        }

        var msg = "";
        if (sw === 0) {
            msg += "<div class='alert alert-warning alert-dismissible fade show' role='alert'>";
            msg += "<strong>Enmienda no encontrada!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        } else {
            msg += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
            msg += "<strong>Enmienda modificada correctamente!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        }
        document.getElementById("mensajes").innerHTML = msg;
        Listarenmiendas();
        limpiarCampos();
    }
}

function eliminar() {
    var cod = document.getElementById("txtcodigo").value.toUpperCase();
    var errores = "";

    if (cod.trim().length < 2 || cod.trim().length > 5) {
        errores += "El código debe contener entre 2 y 5 caracteres! \n";
    } else {
        let x = 0;
        for (let i = 0; i < enmiendas.length; i++) {
            if (cod === enmiendas[i].codigo) {
                x = 1;
                break;
            }
        }
        if (x === 0) {
            errores += "El código no se encuentra registrado!\n";
        }
    }

    if (errores !== "") {
        alert(errores);
    } else {
        let sw = 0;
        for (let i = 0; i < enmiendas.length; i++) {
            if (cod === enmiendas[i].codigo) {
                var x = confirm("Desea eliminar el registro?");
                if (x === true) {
                    sw = 1;
                    enmiendas.splice(i, 1);
                    break;
                } else {
                    sw = 2;
                }
            }
        }

        let msg = "";
        if (sw === 0) {
            msg += "<div class='alert alert-warning alert-dismissible fade show' role='alert'>";
            msg += "<strong>Enmienda no encontrada!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        } else if (sw === 1) {
            msg += "<div class='alert alert-success alert-dismissible fade show' role='alert'>";
            msg += "<strong>Enmienda eliminada correctamente!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        } else if (sw === 2) {
            msg += "<div class='alert alert-warning alert-dismissible fade show' role='alert'>";
            msg += "<strong>La enmienda no fue eliminada!</strong>";
            msg += "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
            msg += "</div>";
        }
        document.getElementById("mensajes").innerHTML = msg;
        Listarenmiendas();
        limpiarCampos();
    }
}


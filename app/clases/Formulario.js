class Formulario {
    constructor(tarea = {}) {
        if(tarea.idtarea){
            this.llenarCampos(tarea);
        }else{
            this.crearEventos();
        }
    }

    llenarCampos(tarea){
        this.limpiarFormulario();

        document.getElementById('idtarea').value = tarea.idtarea;
        document.getElementById('nombre').value = tarea.nombre;
        document.getElementById('descripcion').value = tarea.descripcion;
        document.getElementById('responsable').value = tarea.responsable;
    }

    guardarDatos() {
        var idtarea = document.getElementById('idtarea').value;
        var nombre = document.getElementById('nombre').value;
        var descripcion = document.getElementById('descripcion').value;
        var responsable = document.getElementById('responsable').value;

        var listado = new Listado(idtarea, nombre, descripcion, responsable);
        listado.guardarItem();

        this.limpiarFormulario();
    }

    limpiarFormulario() {
        document.getElementById('idtarea').value = 0;
        document.getElementById('nombre').value = '';
        document.getElementById('descripcion').value = '';
        document.getElementById('responsable').value = '';
    }

    crearEventos() {
        var instancia = this;
        document.getElementById('btn_guardar').addEventListener('click', function () {
            instancia.guardarDatos();
        });
    }
}


class Listado {

    constructor(idtarea, nombre, descripcion, responsable) {
        this.idtarea = idtarea;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.responsable = responsable;

        this.actualizarLista();
    }

    guardarItem() {
        let tarea = {
            'nombre': this.nombre,
            'descripcion': this.descripcion,
            'responsable': this.responsable,
        }

        let ls = localStorage.getItem('listado');
        let listado = JSON.parse(ls || '[]');

        if(this.idtarea > 0){
            tarea.idtarea = this.idtarea;
            listado = listado.map(t => t.idtarea != this.idtarea ? t : tarea);
        }else{
            tarea.idtarea = listado.length + 1;
            listado.push(tarea);
        }
        console.log(listado,tarea);
        ls = JSON.stringify(listado);
        localStorage.setItem('listado', ls);

        this.actualizarLista();
    }

    actualizarLista() {
        var instancia = this;

        let ls = localStorage.getItem('listado');
        let listado = JSON.parse(ls || '[]');

        var lista = document.getElementById('lista');
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }

        listado.forEach(function (tarea, index) {
            let plantilla = instancia.plantilla(tarea);
            lista.insertAdjacentHTML('beforeend', plantilla);
        });

        this.crearEventos();
    }

    plantilla(tarea) {
        let out = "";
        out += "<div class='card mt-2'>";
        out += "<div class='card-header'>" + tarea.nombre + "</div>";
        out += "<div class='card-body'>" + tarea.descripcion + "</div>";
        out += "<div class='card-footer'>";
        out += "<div class='row'>";
        out += "<div class='col-md-10'>";
        out += tarea.responsable;
        out += "</div>";
        out += "<div class='col-md-2'>";
        out += "<button class='btn btn_edit' idTarea='"+tarea.idtarea+"'>E</button><button class='btn btn_delete' idTarea='"+tarea.idtarea+"'>X</button></div>";
        out += "</div>";
        out += "</div>";
        out += "</div>";

        return out;
    }

    crearEventos(){
        let instancia = this;

        let editar = document.querySelectorAll('.btn_edit');

        editar.forEach(function(e, index){
            e.addEventListener('click', function(){
                instancia.editar(e.getAttribute('idTarea'));
            });
        });

        let eliminar = document.querySelectorAll('.btn_delete');

        eliminar.forEach(function(e, index){
            e.addEventListener('click', function(){
                instancia.eliminar(e.getAttribute('idTarea'));
            });
        });
    }

    editar(idTarea){
        let ls = localStorage.getItem('listado');
        let listado = JSON.parse(ls);

        let tarea = listado.find(t => t.idtarea == idTarea);
        let formulario = new Formulario(tarea);
    }

    eliminar(idTarea){
        let ls = localStorage.getItem('listado');
        let listado = JSON.parse(ls);

        listado = listado.filter(t => t.idtarea != idTarea);
        ls = JSON.stringify(listado);

        localStorage.setItem('listado', ls);

        this.actualizarLista();
    }

}
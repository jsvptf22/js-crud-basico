import Task from './Task';

export default class Form {
    constructor(callback) {
        this.Task = new Task();
        document.getElementById('btn_guardar').addEventListener('click', () => {
            this.saveTask(callback);
        });
    }

    set Task(Task) {
        document.getElementById('idtarea').value = Task.id;
        document.getElementById('nombre').value = Task.name;
        document.getElementById('descripcion').value = Task.description;
        document.getElementById('responsable').value = Task.manager;
    }

    get Task() {
        return new Task(
            document.getElementById('idtarea').value,
            document.getElementById('nombre').value,
            document.getElementById('descripcion').value,
            document.getElementById('responsable').value
        );
    }

    saveTask(callback) {
        callback(this.Task);
    }
}

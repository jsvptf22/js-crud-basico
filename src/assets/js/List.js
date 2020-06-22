export default class List {
    constructor(editCallback, deleteCallback) {
        this.editCallback = editCallback;
        this.deleteCallback = deleteCallback;
    }

    refreshList(items) {
        var nodeList = document.getElementById('lista');
        while (nodeList.firstChild) {
            nodeList.removeChild(nodeList.firstChild);
        }

        items.forEach((Task) => {
            let template = List.template(Task);
            nodeList.insertAdjacentHTML('beforeend', template);
        });

        this.createEvents();
    }

    static template(Task) {
        return `
        <div class='card mt-2'>
            <div class='card-header'>${Task.name}</div>
            <div class='card-body'>${Task.description}</div>
            <div class='card-footer'>
                <div class='row'>
                    <div class='col'>
                        ${Task.manager}
                    </div>
                    <div class='col-auto'>
                        <button class='btn btn_edit btn-primary' taskId='${Task.id}'>
                            Editar
                        </button>
                        <button class='btn btn_delete btn-danger' taskId='${Task.id}'>
                            eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
    }

    createEvents() {
        let editBtn = document.querySelectorAll('.btn_edit');

        editBtn.forEach((e) => {
            e.addEventListener('click', () => {
                this.editCallback(+e.getAttribute('taskId'));
            });
        });

        let deleteBtn = document.querySelectorAll('.btn_delete');

        deleteBtn.forEach((e) => {
            e.addEventListener('click', () => {
                this.deleteCallback(+e.getAttribute('taskId'));
            });
        });
    }
}

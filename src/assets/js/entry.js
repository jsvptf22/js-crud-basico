import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Form from './Form';
import Task from './Task';
import Repository from './Repository';
import List from './List';

let RepositoryManager = new Repository();
let ListManager = null;
let FormManager = null;

const saveTask = (task) => {
    if (!+task.id) {
        task.id = RepositoryManager.items.length + 1;
        RepositoryManager.add(task);
    } else {
        RepositoryManager.items = RepositoryManager.items.map((t) =>
            +t.id === +task.id ? task : t
        );
    }
    ListManager.refreshList(RepositoryManager.items);
    FormManager.Task = new Task();
};

const deleteCallback = (taskId) => {
    RepositoryManager.remove(taskId);
    ListManager.refreshList(RepositoryManager.items);
};

const editCallback = (taskId) => {
    let Task = RepositoryManager.items.find((t) => +t.id === +taskId);
    FormManager.Task = Task;
};

FormManager = new Form(saveTask);
ListManager = new List(editCallback, deleteCallback);
ListManager.refreshList(RepositoryManager.items);

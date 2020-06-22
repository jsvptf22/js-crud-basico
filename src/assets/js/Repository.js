export default class Repository {
    constructor() {
        let str = localStorage.getItem('taskList') || '[]';
        this.items = JSON.parse(str);
    }

    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;

        let list = JSON.stringify(value);
        localStorage.setItem('taskList', list);
    }

    add(Task) {
        let items = this.items;
        items.push(Task);
        this.items = items;
    }

    remove(taskId) {
        this.items = this.items.filter((t) => +t.id !== +taskId);
    }
}

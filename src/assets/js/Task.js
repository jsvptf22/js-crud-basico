export default class Task {
    constructor(id = 0, name = '', description = '', manager = '') {
        this.id = id;
        this.name = name;
        this.description = description;
        this.manager = manager;
    }
}

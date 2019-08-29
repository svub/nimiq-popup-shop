export default class DummyStorage {
    constructor(repository) {
        this.repository = repository;
        this.namespace = `dummy-${this.repository}`;
    }

    static async create(repository) {
        const dummy = new DummyStorage(repository);
        return new Promise(resolve => resolve(dummy));
    }

    _id(id) { return `${this.namespace}-${id}`; }

    store(data){
        const id = Math.floor(Math.random()*10e10).toString(16);
        localStorage[this._id(id)] = data;
        return id;
    }

    load(id) {
        return localStorage[this._id(id)];
    }

    list() {
        const results = [];
        for (let x = 0; x < localStorage.length; x++) {
            const key = localStorage.key(x);
            if (key.startsWith(this.namespace)) {
                results.push(localStorage.getItem(key));
            }
        }
        return results;
    }
}

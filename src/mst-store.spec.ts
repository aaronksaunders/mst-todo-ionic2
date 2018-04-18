import { } from 'jasmine';
import Store, { ITodoStoreType } from './mst-store';

describe('Test Store', () => {
    let store: ITodoStoreType

    beforeEach(() => {
        store = new Store() as ITodoStoreType
    });

    it('should create component', () => expect(store).toBeDefined());

    it('add item to store and length be one', () => {
        store.addItem({
            id: new Date().getTime() + store.todos.length + "",
            title: "aaron",
            description: "",
            when: new Date() + ""
        })

        expect(store.todos.length).toBe(1)
    })

    it('add item to store and length be two', () => {
        store.addItem({
            id: new Date().getTime() + store.todos.length + "",
            title: "aaron",
            description: "",
            when: new Date() + ""
        })

        store.addItem({
            id: new Date().getTime() + store.todos.length + "",
            title: "aaron",
            description: "",
            when: new Date() + ""
        })
        expect(store.todos.length).toBe(2)
    })

    it('remove item from store', () => {
        store.addItem({
            id: new Date().getTime() + store.todos.length + "",
            title: "aaron",
            description: "",
            when: new Date() + ""
        })

        store.addItem({
            id: new Date().getTime() + store.todos.length + "",
            title: "aaron",
            description: "",
            when: new Date() + ""
        })

        expect(store.todos.length).toBe(2)

        store.deleteItem(store.todos[1])

        expect(store.todos.length).toBe(1)
        // console.log(store.todos.slice())
    })
})
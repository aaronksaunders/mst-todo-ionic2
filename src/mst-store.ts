import { types, onSnapshot, getSnapshot, destroy } from "mobx-state-tree"
import { Injectable } from "@angular/core";

import remotedev from 'mobx-remotedev/lib/dev';
import makeInspectable from 'mobx-devtools-mst';

const Todo = types.model("Todo", {
    id : types.identifier(),
    title: types.string,
    description: types.string,
    when: types.string
}).actions(self => ({
    delete() {
        destroy(self)
    }
}))


const TodoStore = types.model("TodoStore", {
    todos: types.optional(types.array(Todo), [])
}).actions(self => ({
    addItem(_value) {
        self.todos.push(Todo.create(_value))
    },
    deleteItem(_item) {
        _item.delete()
    }
}))


export type ITodoStoreType = typeof TodoStore.Type
export interface ITodoStore extends ITodoStoreType { };


@Injectable()
@remotedev({ name: 'TodoStore-aks', global: true, onlyActions: true })
export default class Store {
    constructor() {
        let myStore = TodoStore.create({})
        makeInspectable(myStore);
        return myStore as ITodoStoreType
    }
}

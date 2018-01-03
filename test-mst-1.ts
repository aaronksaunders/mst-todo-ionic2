import { types, onSnapshot, getSnapshot } from "mobx-state-tree"

const Todo = types.model("Todo", {
    title: types.string,
    description: types.string,
    when: types.string
}).actions(self => ({

}))

//let x = Todo.create({})

let x1 = Todo.create({
    title: "Aaron",
    description: "Test Description",
    when: new Date() + ""
})

console.log(getSnapshot(x1))

const TodoStore = types.model("Todo", {
    todos: types.optional(types.array(Todo), [])
}).actions(self => ({
    addItem(_value: typeof Todo.Type) {
        self.todos.push(Todo.create(_value))
    }
}))

// will generate the same error..
let theStore = TodoStore.create({})

console.log(getSnapshot(theStore))

theStore.addItem({
    title: "Aaron",
    description: "Test Description",
    when: new Date() + ""
})

theStore.addItem({
    title: "Andrea",
    description: "Test Description for Andrea",
    when: new Date() + ""
})

console.log(getSnapshot(theStore))
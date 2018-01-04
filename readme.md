
Work In Progress...
Please log questions and comments as issues
--

# Mobx-State-Tree Ionic Framework

- Based on Ionic Todo Example from here https://www.joshmorony.com/build-a-todo-app-from-scratch-with-ionic-2-video-tutorial/
- The Mobx-State-Tree Example from here: https://github.com/mobxjs/mobx-state-tree
- And finally the mobx-angular example found here: https://github.com/mobxjs/mobx-angular

The above lists the source materials for the example, I am just pulling it all together here. **There is no overview of the todo app here at all, see the referenced blog post for those materials.** We will be starting with the assumption you have that application functioning on your own

## Installation Requirements for The Mobx State Tree

```console
npm install --save mobx-angular mobx mobx-state-tree
```

## Starting The Mobx State Tree

Look into quokka for testing out state tree before integrating it into the application

- https://quokkajs.com/
- see file `test-mst-1.ts` for how I tested the store before integrating in application
- visual studio code plugin for it: https://quokkajs.com/docs/#getting-started

Starting with this code to layout the fields for the Todo object that we are using

```typescript
import { types, onSnapshot } from "mobx-state-tree"

const Todo = types.model("Todo", {
    title: types.string,
    description: types.string,
    when : types.string
}).actions(self => ({

}))

// create the object
let x = Todo.create({})
```

Errors are generated becuase we are trying to create the object without the required fields

```console
[mobx-state-tree] Error while converting `{}` to `Todo`:​​
​​at path "/title" value `undefined` is not assignable to type: `string` (Value is not a string).​​
​​at path "/description" value `undefined` is not assignable to type: `string` (Value is not a string).​​
​​at path "/when" value `undefined` is not assignable to type: `string` (Value is not a string).​​
```

```typescript
let x1 = Todo.create({
    title: "Aaron",
    description: "Test Description",
    when: new Date() + ""
})

console.log(getSnapshot(x1))
```

will get the correct output

```javascript
{
  title: 'Aaron',​​​​​
  description: 'Test Description',​​​​​
  when: 'Tue Jan 02 2018 22:20:02 GMT-0500 (EST)'
}​​​​​
```

But we need something to actually hold the Todo Items so we will create a store to hold them

```javascript
const TodoStore = types.model("TodoStore", {
    todos : types.array(Todo)
}).actions(self => ({

}))

// will generate the same error..
let theStore = TodoStore.create({})
```

lets intoduce `types.maybe`

```javascript
const TodoStore = types.model("TodoStore", {
    todos : types.maybe(types.array(Todo))
}).actions(self => ({

}))

// will generate the same error.. without the maybe
let theStore = TodoStore.create({})
```

 we can fix the problem using the `types.optional` with a default value for the array which you can see in the code.
 ```javascript
  // will throw error when creating the object
 todos : types.maybe(types.array(Todo)) 
 
 // will default to an empty array when creating the object
 todos : types.optional(types.array(Todo),[]) 
 ```

We will add the first function to add items to the `todoStore` that was created; notice the type of the `Todo` object to ensure that we get the type checking when attempting to create the object
 ```javascript
 const TodoStore = types.model("TodoStore", {
    todos : types.optional(types.array(Todo),[])
}).actions(self => ({
    addItem(_value: typeof Todo.Type) {
        self.todos.push(Todo.create(_value))
    }
}))

// 1) create the store
let theStore = TodoStore.create({})

// 2) create a todo
theStore.addItem({
    title: "Aaron",
    description: "Test Description",
    when: new Date() + ""
})
 ```

### Add the Mobx State Tree store to the angular application

Paste the following code in the beginning of `home.ts` file. This is a temporary solution to show the integration of the store. We will eventually create a provider and inject the store using DI

 ```javascript
 import { types, onSnapshot, getSnapshot } from "mobx-state-tree"

// TEMP, WILL MOVE LATER
const Todo = types.model("Todo", {
  title: types.string,
  description: types.string,
  when: types.string
}).actions(self => ({

}))

const TodoStore = types.model("TodoStore", {
  todos: types.optional(types.array(Todo), [])
}).actions(self => ({
  addItem(_value: typeof Todo.Type) {
    self.todos.push(Todo.create(_value))
  }
}))
// TEMP, WILL MOVE LATER

```

Modify constructor by adding the following lines of code to the `home.ts` file
```javascript

let items = [
  { title: 'hi1', description: 'test1', when: "2018-01-03T02:12:12.766Z" },
  { title: 'hi2', description: 'test2', when: "2018-01-02T02:52:12.766Z" },
  { title: 'hi3', description: 'test3', when: "2018-01-01T01:52:12.766Z" }
];

// create the store with a default set of items
this.todoStore = TodoStore.create({ todos: items })

```
Modify properties for the page by adding the following lines of code to the `home.ts` file

```javascript

import { Component, ChangeDetectionStrategy } from '@angular/core'; // <== NEW LINE - ChangeDetectionStrategy

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush, // <== NEW LINE
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items;
  public todoStore: typeof TodoStore.Type // <== NEW LINE

```

finally open up the `home.html` and add the `*mobxAutorun` directive to the page to allow the page to detect the changes in the mobx-state-tree.

also notice where we are accessing the list of `todos` directly from the `todoStore.todos` property

See mobx-angular documentation for more information on `*mobxAutorun` directive -> https://github.com/mobxjs/mobx-angular

```html

<ion-list *mobxAutorun>
    <ion-item
        *ngFor="let item of todoStore.todos"
        (click)="viewItem(item)">
        <h1>{{item.title}}</h1>
        <div>{{item.description}}</div>
        <div>{{item.when | date: "medium" }}</div>
    </ion-item>
</ion-list>

```
At this point the application should run and you should see the items appearing in the list again.

- [TODO] Connect the addItem function to the todoStore connect to application
- [TODO] Connect the deleteItem function to the todoStore
- [TODO] Add list-item-swipe to list to implement deleteItem
- [TODO] Connect delete action in UI to delete in todoStore
- [TODO] Move store to seperate file and make it a provider
- [TODO] Connect angularfire2

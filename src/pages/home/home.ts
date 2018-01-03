import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { types, onSnapshot, getSnapshot, destroy } from "mobx-state-tree"


// TEMP, WILL MOVE LATER
const Todo = types.model("Todo", {
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
  addItem(_value: typeof Todo.Type) {
    self.todos.push(Todo.create(_value))
  },
  deleteItem(_item) {
    _item.delete()
  }
}))
// TEMP, WILL MOVE LATER


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items;
  public todoStore: typeof TodoStore.Type

  /**
   * Creates an instance of HomePage.
   * @param {NavController} navCtrl 
   * @param {ModalController} modalCtrl 
   * @memberof HomePage
   */
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

    let items = [
      { title: 'hi1', description: 'test1', when: "2018-01-03T02:12:12.766Z" },
      { title: 'hi2', description: 'test2', when: "2018-01-02T02:52:12.766Z" },
      { title: 'hi3', description: 'test3', when: "2018-01-01T01:52:12.766Z" }
    ];

    this.todoStore = TodoStore.create({ todos: items })

    console.log(getSnapshot(this.todoStore.todos))

  }

  ionViewDidLoad() {


  }

  /**
   * 
   * 
   * @memberof HomePage
   */
  addItem() {

    let addModal = this.modalCtrl.create(AddItemPage);

    addModal.onDidDismiss((item) => {

      if (item) {
        item.when = new Date() + ""

        this.todoStore.addItem(item)
      }

    });

    addModal.present();
  }

  /**
   * 
   * 
   * @param {any} item 
   * @memberof HomePage
   */
  saveItem(item) {
    this.items.push(item);
  }

  /**
   * 
   * 
   * @param {any} item 
   * @memberof HomePage
   */
  deleteItem(item) {
    console.log(item)
    this.todoStore.deleteItem(item)
  }
  viewItem(item) {

  }

}
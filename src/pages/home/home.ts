import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';

// MST
import TodoStore, { ITodoStore, ITodoStoreType } from "../../mst-store"





@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items;
  public todoStore: ITodoStoreType

  /**
   * Creates an instance of HomePage.
   * @param {NavController} navCtrl 
   * @param {ModalController} modalCtrl 
   * @memberof HomePage
   */
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public _todoStore: TodoStore) {

    this.todoStore = _todoStore as ITodoStore

  }

  ionViewDidLoad() {

    this.todoStore.addItem({
      title: 'hi1',
      description: 'test1',
      when: "2018-01-03T02:12:12.766Z"
    })

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
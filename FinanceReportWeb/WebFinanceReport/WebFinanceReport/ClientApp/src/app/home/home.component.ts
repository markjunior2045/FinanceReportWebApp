import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BaseValues, Item } from '../model/finance.model';
import { Guid } from '../model/guid.model';
import { DataService } from '../services/dataservice';
import { FinanceService } from '../services/finance.service';
import { DialogInsert } from './Insert/dialog-insert';
import { DialogUpdate } from './Update/dialog-update';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  public base:BaseValues;
  public items:Array<Item>;
  public newItem: Item;
  public itemEdit: Item;
  public name:string = "NAME";
  public columnsToDisplay: string[] = ['name','price','date','edit','delete'];
  

  constructor(private _service: FinanceService, private dialog: MatDialog) { 
  }

  ngOnInit(){
    this.values();
    this.getItems();
  }

  async values(){
    await this._service.getBaseValues().then(result =>{
      this.base = result;
    })
  }

  async getItems(){
    await this._service.getAllItems().then(result => {
      this.items = result;
    }).catch(error => {
      console.log(error);
      
    })
  }

  async editItem(item: Item){
    await this._service.updateItem(item).then(() => {
      this.getItems();
      this.values();
    })
  }

  async deleteItemByid(id: any){
    if(confirm("Tem certeza?")){
      await this._service.deleteItem(id).then(() => {
        this.getItems();
        this.values();
      })
    }
  }

  async addNewItem(item: Item){
    await this._service.addItem(item).then(() =>{
      this.getItems();
      this.values();
    })
  }

  openNewItemDialog(): void {
    const dialogRef = this.dialog.open(DialogInsert, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.newItem = result;
        if(this.newItem.name == "" || this.newItem.price.toString() == "")
          alert("Preencha os campos corretamente!");
        else
          this.addNewItem(this.newItem);
      }
    });
  }

  openEditItemDialog(item: Item): void {
    const dialogRef = this.dialog.open(DialogUpdate, {
      data: {name: item.name, price: item.price},
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.itemEdit = result;
        if(this.itemEdit.name == "" || this.itemEdit.price.toString() == "")
          alert("Preencha os campos corretamente!");
        else{
          item.name = this.itemEdit.name;
          item.price = this.itemEdit.price
          this.editItem(item);
        }
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { BaseValues, Item } from '../model/finance.model';
import { Guid } from '../model/guid.model';
import { DataService } from '../services/dataservice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  public base:BaseValues;
  public items:Array<Item>;
  public columnsToDisplay: string[] = ['name','price','date','edit','delete'];

  constructor(private _dataService: DataService) { 
  }

  ngOnInit(){
    this.values();
    this.getItems();
  }

  //TODO Create a Finance Service and move to there
  getBaseValues(): Promise<BaseValues>{
    return this._dataService.get('api/Finance/BaseValues') as Promise<BaseValues>;
  }

  //TODO Create a Finance Service and move to there
  getAllItems(): Promise<Array<Item>>{
    return this._dataService.get('api/Finance/AllItems') as Promise<Array<Item>>;
  }

  //TODO Create a Finance Service and move to there
  deleteItem(itemId: Guid): Promise<void>{
    return this._dataService.delete(`api/Finance/${itemId}/DeleteItem`) as Promise<void>;
  }

  //TODO Create a Finance Service and move to there
  updateItem(item: Item): Promise<void>{
    return this._dataService.doPost('api/Finance/UpdateItem', item) as Promise<void>
  }

  async values(){
    await this.getBaseValues().then(result =>{
      this.base = result;
    })
  }

  async getItems(){
    await this.getAllItems().then(result => {
      this.items = result;
    }).catch(error => {
      console.log(error);
      
    })
  }

  async editItem(item: Item){
    await this.updateItem(item).then(() => {
      this.getItems();
      this.values();
    })
  }

  async deleteItemByid(id: any){
    if(confirm("Tem certeza?")){
      await this.deleteItem(id).then(() => {
        this.getItems();
        this.values();
      })
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { BaseValues, Item } from '../model/finance.model';
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

  async values(){
    await this.getBaseValues().then(result =>{
      this.base = result;
    })
  }

  async getItems(){
    await this.getAllItems().then(result => {
      this.items = result;
    })
  }

  editItem(id: any){
    console.log("Edit: ", id);
  }

  deleteItem(id: any){
    if(confirm("Tem certeza que deseja DELETAR esse item?"))
      console.log("Delete: ", id);
  }
}

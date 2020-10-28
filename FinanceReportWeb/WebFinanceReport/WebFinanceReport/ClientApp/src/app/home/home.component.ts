import { Component, OnInit } from '@angular/core';
import { BaseValues } from '../model/finance.model';
import { DataService } from '../services/dataservice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  public base:BaseValues;
  
  constructor(private _dataService: DataService) { 
  }

  ngOnInit(){
    this.values();
  }

  //TODO Create a Finance Service and move to there
  getBaseValues(): Promise<BaseValues>{
    return this._dataService.get('api/Finance/BaseValues') as Promise<BaseValues>;
  }

  async values(){
    await this.getBaseValues().then(result =>{
      this.base = result;
    })
  }
}

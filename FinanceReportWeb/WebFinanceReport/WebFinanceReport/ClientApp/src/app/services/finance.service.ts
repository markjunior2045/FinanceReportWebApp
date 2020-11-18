import { Injectable } from '@angular/core';
import { BaseValues, Item } from '../model/finance.model';
import { Guid } from '../model/guid.model';
import { DataService } from './dataservice';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private _dataService: DataService) { }

  getBaseValues(): Promise<BaseValues>{
    return this._dataService.get('api/Finance/BaseValues') as Promise<BaseValues>;
  }

  getAllItems(): Promise<Array<Item>>{
    return this._dataService.get('api/Finance/AllItems') as Promise<Array<Item>>;
  }

  deleteItem(itemId: Guid): Promise<void>{
    return this._dataService.delete(`api/Finance/${itemId}/DeleteItem`) as Promise<void>;
  }

  updateItem(item: Item): Promise<void>{
    return this._dataService.doPost('api/Finance/UpdateItem', item) as Promise<void>
  }

  addItem(item: Item): Promise<void>{
    return this._dataService.doPost('api/Finance/AddItem', item) as Promise<void>
  }
}

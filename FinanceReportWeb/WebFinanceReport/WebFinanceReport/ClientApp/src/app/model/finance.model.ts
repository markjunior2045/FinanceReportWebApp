import { Guid } from "./guid.model";

export interface BaseValues{
  totalSpent: number;
  totalAvailable: number;
  salary: number;
  salaryAvailable: number;
}

export interface Item{
  id: Guid;
  accountId: Guid;
  name: string;
  price: number;
  buyDate: Date;
}
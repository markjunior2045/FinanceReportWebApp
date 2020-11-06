import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { promise } from "protractor";

export class DataService {

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string){}

    get<T>(url: string): Promise<T>{
        return new Promise<T>((resolve, reject) => {
            this.http.get<T>(this.baseUrl + url).subscribe(result => {
                resolve(result);
            }, error => {
                reject(error);
            })
        }).catch(error => {
            return Promise.reject(error);
        })
    }

    delete<T>(url: string): Promise<T>{
        return new Promise<T>((resolve, reject) => {
            this.http.delete<T>(this.baseUrl + url)
                .subscribe(result => {
                    resolve(result);
                }, error => reject(error))
        }).catch(error => {
            return Promise.reject(error);
        })
    }

    doPost<T>(url: string, data: any): Promise<T>{
        return new Promise<T>((resolve, reject) => {
            this.http.post<T>(this.baseUrl + url, data)
                .subscribe(result => {
                    resolve(result);
                }, error => reject(error))
        }).catch(error => {
            return Promise.reject(error);
        })
    }

    doPut<T>(url: string, data: any): Promise<T>{
        return new Promise<T>((resolve, reject) => {
            this.http.put<T>(this.baseUrl + url, data)
                .subscribe(result => {
                    resolve(result);
                }, error => reject(error))
        }).catch(error => {
            return Promise.reject(error);
        })
    }
}
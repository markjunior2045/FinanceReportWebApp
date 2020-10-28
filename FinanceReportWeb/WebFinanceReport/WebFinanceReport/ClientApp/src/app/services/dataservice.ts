import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";

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
}
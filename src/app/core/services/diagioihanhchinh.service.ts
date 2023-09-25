import { Injectable, OnInit } from '@angular/core';
import { DataService } from './data.service'; 
import { NotificationService } from './notification.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DiagioihanhchinhService{

 
  constructor( private _data: DataService, private _notify: NotificationService,private _http : HttpClient ) {
      
  }
  

  public getdata(){
    return this._http.get<any[]>('../../../assets/DiaGioiHanhChinhVN.json')
  }
  





}

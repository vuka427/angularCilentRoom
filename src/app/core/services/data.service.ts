import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpEvent } from '@angular/common/http'
import { Router } from '@angular/router'
import { SystemConstants } from '../common/system.constants';
import { AuthenService } from '../services/authen.service'
import { MessageContstants } from '../common/message.constants';
import { Observable,throwError } from 'rxjs';
import { NotificationService } from './notification.service';
import { UtilityService } from './utility.service';
import { error } from 'jquery';
import { DataTablesResponse } from '../domain/datatable/datatable.response';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  

  constructor(
    private _http: HttpClient, 
    private _router: Router, 
    private _authen: AuthenService,
    private _notify: NotificationService,
    private _utility: UtilityService,
   
    ) {

  }

  get(uri: string) {
    const headers= new HttpHeaders()
    
    .set('Authorization', `Bearer ${this._authen.getLoggedInUser()?.access_token }`);
    return this._http.get<Response>(SystemConstants.BASE_API + uri, { headers: headers });
    
  }

  post(uri: string, data?: any) {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${this._authen.getLoggedInUser()?.access_token }`);
    return this._http.post<Response>(SystemConstants.BASE_API + uri, data, { headers: headers });
        
  }

  postForDataTable(uri: string, data?: any) {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${this._authen.getLoggedInUser()?.access_token }`);
    return this._http.post<DataTablesResponse>(SystemConstants.BASE_API + uri, data, { headers: headers });
        
  }

  put(uri: string, data?: any) {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${this._authen.getLoggedInUser()?.access_token }`);

    return this._http.put<Response>(SystemConstants.BASE_API + uri, data, { headers: headers }).subscribe(this.extractData);
  }
  
  delete(uri: string, key: string, id: string) {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${this._authen.getLoggedInUser()?.access_token }`);

    return this._http.delete<Response>(SystemConstants.BASE_API + uri + "/?" + key + "=" + id, { headers: headers });
    
  }

  postFile(uri: string, data: any) {
    const headers= new HttpHeaders()
    .set('Authorization', `Bearer ${this._authen.getLoggedInUser()?.access_token }`);
    console.log("header",headers);
    //headers.append('Accept', 'application/json');
    return this._http.post<Response>(SystemConstants.BASE_API + uri, data, { headers: headers });
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private errorData(err: any) {
    console.log(err.error);
    return err.error.errors || {};
  }
 

  public handleError(error: any ): any {
    console.log("call api có lỗi rồi");
    console.log(error);
    if (error.status == 401) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      //this._notify.printErrorMessage(MessageContstants.LOGIN_AGAIN_MSG);
      this._utility.navigateToLogin();
    }
    else if (error.status == 403) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notify.printErrorMessage(MessageContstants.FORBIDDEN);
      this._utility.navigateToLogin();
    }
    if (error.status == 400) {
      
      this._notify.printErrorMessage("có lỗi xảy ra !");
      
    }
    else {
      let errMsg = JSON.parse(error._body).Message;
      this._notify.printErrorMessage(errMsg);
      

      return throwError(() => new Error(errMsg) );
    }
    

  }


}

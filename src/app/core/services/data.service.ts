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

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private headers?: HttpHeaders;

  constructor(
    private _http: HttpClient, 
    private _router: Router, 
    private _authen: AuthenService,
    private _notify: NotificationService,
    private _utility: UtilityService,
   
    ) {

  }


  get(uri: string): any {
    this.headers?.delete("Authorization");
    this.headers?.append("Authorization", "Bearer" + this._authen.getLoggedInUser()?.access_token);

    return this._http.get<Response>(SystemConstants.BASE_API + uri, { headers: this.headers }).subscribe(this.extractData);
  }

  post(uri: string, data?: any) {
    this.headers?.delete("Authorization");
    this.headers?.append("Authorization", "Bearer" + this._authen.getLoggedInUser()?.access_token);

    return this._http.post<Response>(SystemConstants.BASE_API + uri, data, { headers: this.headers })
        
  }

  put(uri: string, data?: any) {
    this.headers?.delete("Authorization");
    this.headers?.append("Authorization", "Bearer" + this._authen.getLoggedInUser()?.access_token);

    return this._http.put<Response>(SystemConstants.BASE_API + uri, data, { headers: this.headers }).subscribe(this.extractData);
  }
  delete(uri: string, key: string, id: string) {
    this.headers?.delete("Authorization");
    this.headers?.append("Authorization", "Bearer" + this._authen.getLoggedInUser()?.access_token);

    return this._http.delete<Response>(SystemConstants.BASE_API + uri + "/?" + key + "=" + id, { headers: this.headers })
    .subscribe({
      next: this.extractData,
      error: err => { this._notify.printErrorMessage("bị j đó rồi"); console.log("sdfdsf");}
       ,
      complete: () => this._notify.printErrorMessage("ok rồi đó "),

    });
  }

  postFile(uri: string, data?: string) {
    let postFileHeaders = new HttpHeaders();
    postFileHeaders.delete("Authorization");
    postFileHeaders.append("Authorization", "Bearer" + this._authen.getLoggedInUser()?.access_token);
    return this._http.post<Response>(SystemConstants.BASE_API + uri, data, { headers: postFileHeaders }).subscribe(this.extractData);
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
    if (error.status == 401) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notify.printErrorMessage(MessageContstants.LOGIN_AGAIN_MSG);
      this._utility.navigateToLogin();
    }
    else if (error.status == 403) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notify.printErrorMessage(MessageContstants.FORBIDDEN);
      this._utility.navigateToLogin();
    }
    if (error.status == 400) {
      
      this._notify.printErrorMessage("bị j đó rồi");
      
    }
    else {
      let errMsg = JSON.parse(error._body).Message;
      this._notify.printErrorMessage(errMsg);
      

      return throwError(() => new Error(errMsg) );
    }
    

  }


}
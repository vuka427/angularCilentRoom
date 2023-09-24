import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpResponse} from '@angular/common/http'
import { SystemConstants } from '../common/system.constants';
import { LoggedInUser } from '../domain/loggedin.user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private _http: HttpClient) { }

  login(username: string, password:string){
    let body = "Username="+ encodeURIComponent(username) +
                "&Password="+ encodeURIComponent(password)+
                "&grant_type=password";

    let bodyj = {
      Username : encodeURIComponent(username),
      Password : encodeURIComponent(password)
    }
    const headers = new HttpHeaders();
    headers.set('accept', '*/*');
    headers.set('Content-Type', 'application/json');
    headers.set("cache-control", "no-cache");
    let promise = new Promise((resolve, reject) => {
        this._http.post(SystemConstants.BASE_API + '/api/auth/login',  bodyj, {headers: headers})
          .subscribe( {
            
            next: (response: any) => {

              console.log("response=>",response.status);

              const user: LoggedInUser = this.jwtService.decodeToken(response.token) as LoggedInUser;

              user.access_token = response.token;
            

              console.log("user",user);
              console.log("access token ",user.access_token);

              if (user && user.access_token) {
                  localStorage.removeItem(SystemConstants.CURRENT_USER);
                  localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
                  resolve(true);
                }
                else {
                  
                  reject(false);
                }
            },
             error : (err: any) => {
             
              reject(err);
              }
        });
    });

    return promise;
  }

  logout(){
    localStorage.removeItem(SystemConstants.CURRENT_USER);
  }

  isUserAuthenticated(): boolean{
    const user = localStorage.getItem(SystemConstants.CURRENT_USER);
    if (user != null) {
      return true;
    }
    else {
      return false;
    }
  }
  getLoggedInUser() : LoggedInUser | null{
    let user: LoggedInUser;
    if (this.isUserAuthenticated()) {
      var userData = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER)??"");
      user = new LoggedInUser(userData.access_token,
        userData.username,
        userData.fullName,
        userData.email,
        userData.avatar, userData.roles, userData.permissions,userData.usertype);
    }
    else {
      return null;
    }
    return user;
  }



}

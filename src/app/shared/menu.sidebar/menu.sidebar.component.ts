import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SidebarModel } from './sidebar.model';
import { SystemConstants } from 'src/app/core/common/system.constants';
import { LoggedInUser } from 'src/app/core/domain/loggedin.user';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu.sidebar.component.html',
  styleUrls: ['./menu.sidebar.component.css']
})
export class MenuSidebarComponent {
  result: SidebarModel[] = [];
  public user? : LoggedInUser;

  constructor(private _http: HttpClient) {
    this.user = JSON.parse( localStorage.getItem(SystemConstants.CURRENT_USER)?? "" );
    if(this.user?.usertype == 'landlord'){
      this._http.get<SidebarModel[]>('../../../assets/sidebar.landlord.data.json').subscribe((res) => {
        this.result = res;
      });
    }else if(this.user?.usertype == 'tenant'){
      this._http.get<SidebarModel[]>('../../../assets/sidebar.tenant.data.json').subscribe((res) => {
        this.result = res;
      });
    }else if(this.user?.usertype == 'admin'){
      this._http.get<SidebarModel[]>('../../../assets/sidebar.admin.data.json').subscribe((res) => {
        this.result = res;
      });
    }
    

  }
}

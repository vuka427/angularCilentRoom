import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SidebarModel } from './sidebar.model';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu.sidebar.component.html',
  styleUrls: ['./menu.sidebar.component.css']
})
export class MenuSidebarComponent {
  result: SidebarModel[] = [];

  constructor(private _http: HttpClient) {
    this._http.get<SidebarModel[]>('../../../assets/sidebar.data.json').subscribe((res) => {
      this.result = res;
    });
  }
}

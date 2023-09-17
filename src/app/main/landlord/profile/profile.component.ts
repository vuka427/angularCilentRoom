import { Component, OnInit } from '@angular/core';
import { SystemConstants } from 'src/app/core/common/system.constants';
import { LoggedInUser } from 'src/app/core/domain/loggedin.user';
import { UserProfile } from 'src/app/core/domain/profile.user';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit  {

  public user? :UserProfile ;

  constructor(private _data: DataService){
    
  }
  
  ngOnInit(): void {
    this.loadData;
  }

  loadData(): void{
     this._data.get("").subscribe({
      

     });
  }

}

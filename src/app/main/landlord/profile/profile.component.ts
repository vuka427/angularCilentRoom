import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SystemConstants } from 'src/app/core/common/system.constants';
import { LoggedInUser } from 'src/app/core/domain/loggedin.user';
import { UserProfile } from 'src/app/core/domain/profile.user';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AuthenService } from 'src/app/core/services/authen.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [DatePipe]
})
export class ProfileComponent implements OnInit  {

   userProfile: any = {
    id: "",
    userName: "",
    fullName: "",
    email: "",
    avatar: "",
    dateOfBirth: new Date,
    phone: "",
    cccd: "",
    address: ""
   };
  public currentUser? : LoggedInUser;


  constructor(
    private _data: DataService, 
    private _datePipe : DatePipe
     ){
      

          
    
      }
  ngOnInit(): void {
    this.loadData();
  }
 
  
  loadData(): void{

    this.currentUser = JSON.parse( localStorage.getItem(SystemConstants.CURRENT_USER)?? "" );
    

    this._data.get('/api/User/getuserprofile?userid='+this.currentUser?.userid).subscribe({
    next: (res:Response)=>{
      
      this.userProfile = res ;
      this.userProfile.dateOfBirth = this._datePipe.transform(this.userProfile.dateOfBirth, "yyyy-MM-dd");
      console.log("user profile ", this.userProfile);
    },
    error: this._data.handleError,
    complete: () => {console.log("get user profile success!");} ,
    
    });
    
    
  }

  private extractData(res: Response) {

    console.log("user profile ", res);

    return {};
  }

}

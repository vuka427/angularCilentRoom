import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SystemConstants } from 'src/app/core/common/system.constants';
import { LoggedInUser } from 'src/app/core/domain/loggedin.user';

import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [DatePipe]
})
export class ProfileComponent implements OnInit  {

  public userProfile: any = {
    id: "",
    userName: "",
    fullName: "",
    email: "",
    avatarUrl: "#",
    dateOfBirth: new Date,
    phone: "",
    cccd: "",
    address: ""
   };
  public currentUser? : LoggedInUser;
  public loading = false;
  public fileName : any;
  public imageSrc: any;


  constructor(
    private _data: DataService, 
    private _datePipe : DatePipe,
    private _notify: NotificationService
     ){}


  ngOnInit(): void {
    this.loadData();
  }
 
   loadData(): void{

    this.currentUser = JSON.parse( localStorage.getItem(SystemConstants.CURRENT_USER)?? "" );
    

    this._data.get('/api/User/getuserprofile?userid='+this.currentUser?.userid).subscribe({
    next: (res:Response)=>{
        this.userProfile = res ;
        if(this.userProfile.avatarUrl != null){
          this.fileName = this.userProfile.avatarUrl;
          this.imageSrc = SystemConstants.BASE_API+"/contents/avatar/"+  this.userProfile.avatarUrl;
        }
          
        this.userProfile.dateOfBirth = this._datePipe.transform(this.userProfile.dateOfBirth, "yyyy-MM-dd");
        console.log("user profile", this.userProfile);
      },
      error: this._data.handleError,
      complete: () => {console.log("get user profile success !");} 
    });
  }

  public updateUserProfile(){
    this.loading = true;
    console.log("datasend",this.userProfile);
    this._data.post('/api/User/updateuserprofile',this.userProfile).subscribe({
      next: this.extractData,
      error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !");console.log(err);  this.loading = false;} ,
      complete: () => { this._notify.printSuccessMessage("Cập nhật tài khoản thành công !"); this.loading = false;} ,
    });
    
  }

  private extractData(res: Response) {
    this.loading = false;
    console.log("repone ", res);
    return {};
  }


 
  onFileSelected(event:any) {
    this.currentUser = JSON.parse( localStorage.getItem(SystemConstants.CURRENT_USER)?? "" );
    const file :File = event.target.files[0];

    if (file) {

      this.fileName = file;
      console.log (this.fileName);

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);

      
      let formData:FormData = new FormData();
    
      formData.append('fileUpload', file);

      this._data.postFile("/api/User/uploadavatar?userid="+this.currentUser?.userid, formData ).subscribe({
        next: this.extractData,
        error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !"); console.log(err);} ,
        complete: () => { this._notify.printSuccessMessage("Upload avatar thành công !");} ,
      });;

        
    }
}




}

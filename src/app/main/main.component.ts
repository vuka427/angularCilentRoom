import { AfterContentInit, Component, ElementRef, OnInit } from '@angular/core';
import { SystemConstants } from '../core/common/system.constants';
import { UrlConstants } from '../core/common/url.constants';
import { UtilityService } from '../core/services/utility.service';
import { LoggedInUser } from '../core/domain/loggedin.user';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterContentInit, OnInit {

  public user? : LoggedInUser;
  public userTypeBg : string = 'bg-gradient-primary';
  public profileLink : string = '';



  constructor(private elementRef: ElementRef,private _utility : UtilityService){
    
  }

  ngOnInit(): void {
    this.user = JSON.parse( localStorage.getItem(SystemConstants.CURRENT_USER)?? "" );
    
    switch (this.user?.usertype) {
        case "landlord":
            console.log("giao diện chủ trọ");
            this.userTypeBg = "bg-gradient-primary" ;
            this.profileLink = "/landlord/profile";
            break;
        case "tenant":
            console.log("giao diện người thuê trọ");
            this.userTypeBg = "bg-gradient-success";
            this.profileLink = "/tenant/profile";
            break;
        case "admin":
            console.log("giao diện admin");
            this.userTypeBg = "bg-gradient-warning";
            this.profileLink = "/admin/profile";
            break;
    }
    

    
  }




  ngAfterContentInit(): void {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/sb-admin-2.min.js"
    this.elementRef.nativeElement.appendChild(s);

   
    
  }

  public Logout(){
    
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._utility.navigate(UrlConstants.LOGIN);
      
  }

}

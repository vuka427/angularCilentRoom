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
export class MainComponent implements AfterContentInit {

   public user? : LoggedInUser;
  constructor(private elementRef: ElementRef,private _utility : UtilityService){
    
  }




  ngAfterContentInit(): void {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/sb-admin-2.min.js"
    this.elementRef.nativeElement.appendChild(s);

    this.user = JSON.parse( localStorage.getItem(SystemConstants.CURRENT_USER)?? "" );
    console.log(this.user);
  }

  public Logout(){
    
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._utility.navigate(UrlConstants.LOGIN);
      
  }

}

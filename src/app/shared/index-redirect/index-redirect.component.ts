import { Component, ElementRef, OnInit } from '@angular/core';
import { SystemConstants } from 'src/app/core/common/system.constants';
import { LoggedInUser } from 'src/app/core/domain/loggedin.user';
import { UtilityService } from 'src/app/core/services/utility.service';

@Component({
  selector: 'app-index-redirect',
  templateUrl: './index-redirect.component.html',
  styleUrls: ['./index-redirect.component.css']
})
export class IndexRedirectComponent implements OnInit {

  public user? : LoggedInUser;


  constructor(private elementRef: ElementRef, private _utility : UtilityService) { }

  ngOnInit() {
    
    this.user = JSON.parse( localStorage.getItem(SystemConstants.CURRENT_USER)?? "" );
      
    switch (this.user?.usertype) {
      case "landlord":
          console.log("giao diện chủ trọ");
          this._utility.navigate('/landlord/index');
          break;
      case "tenant":
          console.log("giao diện người thuê trọ");
          this._utility.navigate('/tenant/index');
          break;
      case "admin":
          console.log("giao diện admin");
         
          break;
        }
  
      
      
    }
    
    
    
    


  

}

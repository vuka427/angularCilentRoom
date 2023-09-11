import { Component } from '@angular/core';
import { LoggedInUser } from 'src/app/core/domain/loggedin.user';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AuthenService } from 'src/app/core/services/authen.service';
import { MessageContstants } from 'src/app/core/common/message.constants';
import { UrlConstants } from 'src/app/core/common/url.constants';
import { Router } from '@angular/router'


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  loading = false;
  model: any = {};

  constructor( 
    private _authen: AuthenService,
    private _notify: NotificationService, 
    private _router: Router
    ){

  }

  login(): any{
    this.loading = true;
    this._authen.login(this.model.username,this.model.password).then( data => {
       this._router.navigate([UrlConstants.HOME]);
      },
      error=>{
        console.log(" promise fail ");
        this._notify.printErrorMessage(MessageContstants.SYSTEM_ERROR_MSG);
        this.loading = false;
      }
    );
    
  }

}

import { Component } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UtilityService } from 'src/app/core/services/utility.service';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})
export class TenantComponent {
  loading = false;
  model: any = {};

  constructor(private _dataService : DataService, private _notify : NotificationService, private _utility: UtilityService){}

  public register(){
    this._dataService.post('/api/Auth/registertenant',this.model).subscribe({
      next: this.extractData,
      error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại"); this.errorData(err) } ,
      complete: () => {this._notify.printSuccessMessage(" Đăng ký tài khoản thành công!"); this._utility.navigateToLogin();} ,
    });
    console.log('result');
  }

  private extractData(res: Response) {

    return {};
  }

  private errorData(err: any) {
    console.log(err.error);
    this._notify.printErrorMessage("kjk");
    return err.error.errors || {};
  }

}

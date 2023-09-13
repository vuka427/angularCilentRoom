import { Component } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.css']
})
export class LandlordComponent {
  loading = false;
  model: any = {};

  constructor(private _dataService : DataService){}

  public register(){
    this._dataService.post('/api/Auth/registerlandlord',this.model);
  }

}

import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { HousetypePipe } from 'src/app/shared/pipe/housetype.pipe';
import {NgbModal, ModalDismissReasons, NgbTooltipModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  
  constructor(
    private _data : DataService,
    private _notify : NotificationService,
    private _modalService: NgbModal
    
  ){}


  public rooms : any;


  ngOnInit(): void {
    this.loadData();
  }


  // load dữ liệu ban đầu
  public loadData(){ 
    
    this._data.get("/api/room/tenant/all").subscribe(
      {
        next: res => { 
          this.rooms = res;
          console.log("respone tenant room ", res);
          
         
        },
        error: err => { console.log(err); this._data.handleError(err); },
        complete: () => { console.log("load room"); }, 
      });
  }

}

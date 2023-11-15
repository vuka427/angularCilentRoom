import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { HousetypePipe } from 'src/app/shared/pipe/housetype.pipe';
import {NgbModal, ModalDismissReasons, NgbTooltipModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { RoomModel } from 'src/app/core/domain/room/room.model';

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

  @ViewChild('detailRoomModal') detailRoomModal : TemplateRef<any>; 
  
  public rooms : any;  
  public detailRoom : RoomModel | any = {};


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

  //mở đóng model chi tiết phòng
  public openDetailRoomModal(roomId:number){
    this.detailRoom = {};
    this.detailRoom.contracts = {};
    this.detailRoom.contracts.members ={};
    this.loadDetailRoom(roomId);
    
    this._modalService.open(this.detailRoomModal, { size: 'xl' });
  }
  public closeDetailRoomModal(){
    this._modalService.dismissAll(this.detailRoomModal);
  }


  public loadDetailRoom(roomid: number){
    console.log("load detail room id : ",roomid);
    this._data.get('/api/room/tenant/detail/full?roomid='+roomid).subscribe(
      {
        next: res => {
          console.log(res);
          this.detailRoom = res;
          if( this.detailRoom.contracts == null || this.detailRoom.contracts.members == null){
            this.detailRoom.contracts = {};
            this.detailRoom.contracts.members ={};
          }
            
        },
        error: err => { this._data.handleError(err); console.log(err); },
        complete: () => {  },
      }
    );
  }


}

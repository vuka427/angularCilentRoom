import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SystemConstants } from 'src/app/core/common/system.constants';
import { RoomModel } from 'src/app/core/domain/room/room.model';
import { AreaModel } from 'src/app/core/domain/room/area.model';
import { BranchModel } from 'src/app/core/domain/room/branch.model';
import {NgbModal, ModalDismissReasons, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HousetypePipe } from '../../../shared/pipe/housetype.pipe';
import { ImageRoomModel } from 'src/app/core/domain/room/image.room';




@Component({
  selector: 'app-utilites',
  templateUrl: './utilites.component.html',
  styleUrls: ['./utilites.component.css']
})
export class UtilitesComponent implements OnInit {
  constructor(
    private _data : DataService,
    private _notify : NotificationService,
    private _modalService: NgbModal,
    private _housetypePipe: HousetypePipe
  ){}
  


  public branches: BranchModel[] | any;
  public isSearch: boolean = false;

  public currentBranchId: number=0;
  public currentBranchIndex: number=0;

  ngOnInit(): void {
    this.loadData();
    
  }
 //thiết lập nhà trọ hiện tại
 public setCurrentBranch(id: number, index : number){
  console.log('current branch :',id,'current index :',index );
  this.currentBranchId = id;
  this.currentBranchIndex = index;
 }

   // load dữ liệu ban đầu
  public loadData(){

    this._data.get("/api/branch/allroom").subscribe(
      {
        next: res => { 
          console.log("respone all branch", res);
          this.branches = res;
          this.currentBranchId = this.branches[0].id;
        },
        error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !");console.log(err); this._data.handleError(err); },
        complete: () => { console.log("load all room"); }, 
      });
  }






}

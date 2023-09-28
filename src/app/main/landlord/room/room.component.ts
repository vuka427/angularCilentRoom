import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SystemConstants } from 'src/app/core/common/system.constants';
import { RoomModel } from 'src/app/core/domain/room/room.model';
import { AreaModel } from 'src/app/core/domain/room/area.model';
import { BranchModel } from 'src/app/core/domain/room/branch.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit{

  @ViewChild('addAreaModal') addAreaModal : TemplateRef<any>; 

constructor(
  private _data : DataService,
  private _notify : NotificationService,
  private _modalService: NgbModal
){}


public branches: BranchModel[] | any;
public currentBranchId: number=0;



public ngOnInit(): void {
    this.loadData();
    
}

public setCurrentBranch(id: number){
  console.log('current branch :',id);
  this.currentBranchId = id;
}

public loadData(){

   this._data.get("/api/branch/allroom").subscribe(
    {
      next: res => { 
        console.log("respone all branch", res);
        this.branches = res;
        this.currentBranchId = this.branches[0].id;
        

      },
      error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !");console.log(err); },
      complete: () => { this._notify.printSuccessMessage("load data thành công !"); }, 
    });
 }

openAddAreaModal(){
  this._modalService.open(this.addAreaModal);
}





}

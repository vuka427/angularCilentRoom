import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SystemConstants } from 'src/app/core/common/system.constants';
import { RoomModel } from 'src/app/core/domain/room/room.model';
import { AreaModel } from 'src/app/core/domain/room/area.model';
import { BranchModel } from 'src/app/core/domain/room/branch.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';


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
public currentBranchIndex: number=0;

public frArea : FormGroup ;
public frRoom : FormGroup ;
public isValidAreaFormSubmitted :boolean | null = null;
public isValidRoomFormSubmitted :boolean | null = null;


public showFormCreateRoom: boolean = true;
public areaSelect: any[] =[];

public ngOnInit(): void {
    this.loadData();

    this.frArea = new FormGroup({
      areaname: new FormControl('',Validators.required),
      description : new FormControl(''),
      branchId : new FormControl(0),
    });
    
    this.frRoom= new FormGroup({
      branchid: new FormControl(null,Validators.required),
      areaid: new FormControl(null,Validators.required),
      roomnumber: new FormControl('',Validators.required),
      witdh: new FormControl('',Validators.required),
      height: new FormControl('',Validators.required),
      length: new FormControl('',Validators.required),
      ismezzanine: new FormControl('true',Validators.required),
      price: new FormControl('',Validators.required),
      maxmember: new FormControl('',Validators.required),
      devices: new FormArray([])
    });

    
}

get devices() {
  return this.frRoom.get('devices') as FormArray;
}

public setCurrentBranch(id: number, index : number){
  console.log('current branch :',id,'current index :',index );
  this.currentBranchId = id;
  this.currentBranchIndex = index;
}

public loadData(){

   this._data.get("/api/branch/allroom").subscribe(
    {
      next: res => { 
        console.log("respone all branch", res);
        this.branches = res;
        this.currentBranchId = this.branches[0].id;
      },
      error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !");console.log(err); this._data.handleError(err); },
      complete: () => { this._notify.printSuccessMessage("load data thành công !"); }, 
    });
 }

public openAddAreaModal(){
  this._modalService.open(this.addAreaModal);
}
public closeAddAreaModal(){
  this._modalService.dismissAll(this.addAreaModal);
}

public onAreaSubmit(){
  this.isValidAreaFormSubmitted = false;
  if (this.frArea.invalid) {
    return;
  }
  this.isValidAreaFormSubmitted = true;
  this.frArea.patchValue({branchId: this.currentBranchId});
  console.log('submited',this.frArea.value );
  this._data.post('/api/branch/area/add',this.frArea.value).subscribe(
    {
      next: res => { console.log("repone ", res);},
      error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !"); console.log(err); },
      complete: () => { 
        this._notify.printSuccessMessage("Thêm khu vực thành công !"); 
        this.closeAddAreaModal();
        this.LoadAreaData(this.currentBranchId, this.currentBranchIndex);
      },
    }
  );


}

public LoadAreaData(branchId: number, branchIndex : number){

    this._data.get('/api/branch/areas?branchId='+branchId).subscribe(
      {
        next: res => { 
          console.log("repone ", res); 
          let branch : BranchModel| any = res;
          this.branches[branchIndex].areas = branch.areas ;
        },
        error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !"); console.log(err); },
        complete: () => {  },
      }
    );
}

public onFormCreateRoomSubmit(){

}

public addDevices(){
  console.log("add devices");
  const group = new FormGroup({
    devicename: new FormControl('',Validators.required),
    quantity: new FormControl(0,Validators.required),
    description: new FormControl('')
  });
  
  let s = this.frRoom.get('devices') as FormArray;
  s.push(group);
}
public removeDevices(index:number){
  console.log("remove devices");
  
  let s = this.frRoom.get('devices') as FormArray;
  s.removeAt(index);
}
get services() {
  return this.frRoom.get('devices') as FormArray;
}

public setSelectArea(event: any): void{
  let a:any = this.branches
  console.log(event.target.options[event.target.options.selectedIndex].text);
  this.areaSelect = a.find(data => data.id == event.target.value).areas;
}


}


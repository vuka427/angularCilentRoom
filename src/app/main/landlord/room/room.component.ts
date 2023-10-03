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



@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
 

  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit{

  @ViewChild('addAreaModal') addAreaModal : TemplateRef<any>; 
  @ViewChild('deleteAreaModal') deleteAreaModal : TemplateRef<any>; 
  @ViewChild('editAreaModal') editAreaModal : TemplateRef<any>; 

  constructor(
    private _data : DataService,
    private _notify : NotificationService,
    private _modalService: NgbModal,
    private _housetypePipe: HousetypePipe
  ){}


  public branches: BranchModel[] | any;

  public currentBranchId: number=0;
  public currentBranchIndex: number=0;

  public frArea : FormGroup ;
  public frUpdateArea : FormGroup ;
  public frRoom : FormGroup ;

  public isValidAreaFormSubmitted :boolean | null = null;
  public isValidAreaEditFormSubmitted :boolean | null = null;
  public isValidRoomFormSubmitted :boolean | null = null;


  public showFormCreateRoom: boolean = false;
  public areaSelect: any[] =[];

  public fileName : any;
  public imageSrc: any;

  public isSearch: boolean = false;

  public areaNameDelete:string;
  public areaIdDelete: number = 0 ;

  public ngOnInit(): void {
      this.loadData();

      this.frArea = new FormGroup({
        areaname: new FormControl('',Validators.required),
        description : new FormControl(''),
        branchId : new FormControl(0),
      });

      this.frUpdateArea = new FormGroup({
        areaid: new FormControl(null,Validators.required),
        areaname: new FormControl('',Validators.required),
        description : new FormControl(''),
        branchId : new FormControl(0),
      });
      
      this.frRoom= new FormGroup({
        branchid: new FormControl(null,Validators.required),
        areaid: new FormControl(null,Validators.required),
        roomnumber: new FormControl('',Validators.required),
        acreage: new FormControl('',Validators.required),
        ismezzanine: new FormControl('true',Validators.required),
        price: new FormControl('',Validators.required),
        maxmember: new FormControl('',Validators.required),
        devices: new FormArray([])
      });

      
  }

  get devices() {
    return this.frRoom.get('devices') as FormArray;
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
 //mở đóng model thêm
  public openAddAreaModal(){
    this._modalService.open(this.addAreaModal);
  }
  public closeAddAreaModal(){
    this._modalService.dismissAll(this.addAreaModal);
  }
  //mở đóng model xóa
  public openDeleteAreaModal(areaName : string , housetype:string, areaId: number){
    this.areaIdDelete = areaId;
    this.areaNameDelete = this._housetypePipe.transform(housetype,false) + ' '+  areaName;
    this._modalService.open(this.deleteAreaModal);
  }
  public closeDeleteAreaModal(){
    this._modalService.dismissAll(this.deleteAreaModal);
  }
   //mở đóng model sửa
  public openEditAreaModal(branchid:string, areaid:string, areaname: string, description:string){
    this.frUpdateArea.setValue({areaid: areaid,areaname : areaname, description: description, branchId : branchid});
    this._modalService.open(this.editAreaModal);
  }
  public closeEditAreaModal(){
    this._modalService.dismissAll(this.editAreaModal);
  }
 
  //thêm dãy tầng
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

 //xóa dãy tầng
  public onDeleteAreaSubmit(){

    this._data.delete('/api/branch/area/delete',"areaid",this.areaIdDelete.toString()).subscribe(
      {
        next: res => { console.log("repone ", res);},
        error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !"); console.log(err); },
        complete: () => { 
          this._notify.printSuccessMessage("Xóa dãy tầng thành công !"); 
          this.closeAddAreaModal();
          this.LoadAreaData(this.currentBranchId, this.currentBranchIndex);
        },
      }
    );
  }
  // sửa dãy tầng
  public onEditAreaSubmit(){
    this.isValidAreaEditFormSubmitted  = false;
    if (this.frUpdateArea.invalid) {
      return;
    }
    this.isValidAreaEditFormSubmitted  = true;
    this.frUpdateArea.patchValue({branchId: this.currentBranchId});
    console.log('submited',this.frUpdateArea.value );
    this._data.put('/api/branch/area/edit',this.frUpdateArea.value).subscribe(
      {
        next: res => { console.log("repone ", res);},
        error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !"); console.log(err); },
        complete: () => { 
          this._notify.printSuccessMessage("Cập nhật thông tin dãy-tầng thành công !"); 
          this.closeAddAreaModal();
          console.log(this.currentBranchId, this.currentBranchIndex);
          this.LoadAreaData(this.currentBranchId, this.currentBranchIndex);
        },
      }
    );
  }
 // load lại branch
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
 // load lại area
  public LoadRoomInAreaData( branchIndex : number ,areaId: number){

    this._data.get('/api/branch/area?areaid='+areaId).subscribe(
      {
        next: res => { 
          console.log("repone ", res); 
          let area : AreaModel| any = res;
          let areas : any[] = this.branches[branchIndex].areas;
          areas.find(e => e.id == areaId ).rooms = area.rooms ;

        },
        error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !"); console.log(err); },
        complete: () => { },
      }
    );
  }

 // thêm phòng
  public onFormCreateRoomSubmit(){
    console.log('submit');
    this.isValidRoomFormSubmitted = false;
    
    if (this.frRoom.invalid) {
      console.log("is invalid",this.frRoom.errors );
			return;
		}
    this.isValidRoomFormSubmitted = true;

    console.log('submited',this.frRoom.value );

    this._data.post('/api/room/add',this.frRoom.value).subscribe(
      {
        next: res => { console.log("repone ", res);},
        error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !");console.log(err);},
        complete: () => { 
          this._notify.printSuccessMessage("Thêm phòng trọ thành công !"); 
          this.LoadRoomInAreaData(this.currentBranchIndex,this.frRoom.controls['areaid'].value);
          this.closeFromCreateRoom();
          
        },
      }
    );
  }
  // thêm phòng -> thêm thiết bị
  public addDevices(){
    console.log("add devices");
    const group = new FormGroup({
      devicename: new FormControl('',Validators.required),
      quantity: new FormControl(1,Validators.required),
      description: new FormControl('')
    });
    
    let s = this.frRoom.get('devices') as FormArray;
    s.push(group);
  }
  // thêm phòng -> xóa thiêt bị
  public removeDevices(index:number){
    console.log("remove devices");
    
    let s = this.frRoom.get('devices') as FormArray;
    s.removeAt(index);
  }
  get services() {
    return this.frRoom.get('devices') as FormArray;
  }

 // thêm phòng -> thiết lập khu vực
  public setSelectArea(event: any): void{
    let a : any[] = this.branches;
    this.areaSelect = a.find((data) =>  data.id == event.target.value).areas ;

  }
//mở form thêm phòng 
  public openFromCreateRoom(branchId: any, areaId: any){

    this.frRoom.patchValue({branchid: branchId , areaid:areaId });
    if(branchId){
       let a : any[] = this.branches;
       this.areaSelect = a.find((data) =>  data.id == branchId ).areas ;
    }
   
    this.showFormCreateRoom= true;
  }
  //đóng form thêm phòng
  public closeFromCreateRoom(){
    this.imageNumber = 0;
    this.imagePreviewSrc=[];
    this.ImageUploads=[];
    this.showFormCreateRoom= false;
  }

  // upload file
  public ImageUploads : File[] = [];
  public imagePreviewSrc : any[] = [];
  public imageNumber : number = 0;

  public  onFileSelected(event:any) {
    if(this.imageNumber < 6){

     
      const file :File = event.target.files[0];
      
      console.log(this.ImageUploads);

      if (file) {
        this.imageNumber +=1;
        this.ImageUploads.push( event.target.files[0]);

        this.fileName = file;
        console.log (this.fileName);

        const reader = new FileReader();

        reader.onload = e => this.imagePreviewSrc.push(reader.result);
        reader.readAsDataURL(file);

        console.log(this.imagePreviewSrc);

      }
    }else{
      this._notify.printErrorMessage(" Cho phép tải lên tối đa 6 tắm ảnh !");
    }
    

  }
  public removeImageUpload(index: number){
    this.imageNumber -=1;
    this.imagePreviewSrc.splice(index,1);
    this.ImageUploads.splice(index,1);
  }

  public uploadImage(){



    this.imageNumber = 0;
    this.imagePreviewSrc=[];
    this.ImageUploads=[];
    


  }
 // end upload file

}
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SystemConstants } from 'src/app/core/common/system.constants';
import { RoomModel } from 'src/app/core/domain/room/room.model';
import { AreaModel } from 'src/app/core/domain/room/area.model';
import { BranchModel } from 'src/app/core/domain/room/branch.model';
import {NgbModal, ModalDismissReasons, NgbTooltipModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HousetypePipe } from '../../../shared/pipe/housetype.pipe';
import { ImageRoomModel } from 'src/app/core/domain/room/image.room';
import { InvoiceModel } from 'src/app/core/domain/invoice/invoice.model';



@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
 
  
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit{

  @ViewChild('addAreaModal') addAreaModal : TemplateRef<any>; 
  @ViewChild('deleteAreaModal') deleteAreaModal : TemplateRef<any>; 
  @ViewChild('editAreaModal') editAreaModal : TemplateRef<any>; 
  @ViewChild('deleteRoomModal') deleteRoomModal : TemplateRef<any>; 
  @ViewChild('createInvoiceModal') createInvoiceModal : TemplateRef<any>; 
  @ViewChild('detailRoomModal') detailRoomModal : TemplateRef<any>; 
  @ViewChild('editRoomModal') editRoomModal : TemplateRef<any>; 
  @ViewChild('createRoomModal') createRoomModal : TemplateRef<any>;
  @ViewChild('addMemberRoomModal') addMemberRoomModal : TemplateRef<any>; 

  constructor(
    private _data : DataService,
    private _notify : NotificationService,
    private _modalService: NgbModal,
    private _housetypePipe: HousetypePipe
  ){}

  public roomStatus:string = "none";

  public branches: BranchModel[] | any;

  public currentBranchId: number=0;
  public currentBranchIndex: number=0;

  public frArea : FormGroup ;
  public frUpdateArea : FormGroup ;
  public frRoom : FormGroup ;
  public frURoom : FormGroup ;
  public frInvoice : FormGroup ;
  public frMember : FormGroup ;

  public isValidAreaFormSubmitted :boolean | null = null;
  public isValidAreaEditFormSubmitted :boolean | null = null;
  public isValidRoomEditFormSubmitted :boolean | null = null;
  public isValidRoomFormSubmitted :boolean | null = null;
  public isValidInvoiceFormSubmitted :boolean | null = null;
  public isValidMemberFormSubmitted :boolean | null = null;


  public showFormCreateRoom: number = 0;
  public areaSelect: any[] =[];

  public fileName : any;
  public imageSrc: any;

  public isSearch: boolean = false;

  public areaNameDelete:string;
  public areaIdDelete: number = 0 ;

  public roomNameDelete:string;
  public roomIdDelete: number = 0 ;



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

      this.frURoom= new FormGroup({
        id: new FormControl(),
        branchid: new FormControl({value: '', disabled: true},Validators.required),
        areaid: new FormControl({value: '', disabled: true},Validators.required),
        roomnumber: new FormControl('',Validators.required),
        acreage: new FormControl('',Validators.required),
        ismezzanine: new FormControl('true',Validators.required),
        price: new FormControl('',Validators.required),
        maxmember: new FormControl('',Validators.required),
        devices: new FormArray([])
      });

      this.frInvoice = new FormGroup({
        roomid: new FormControl(0,Validators.required),
        contractid: new FormControl(0,Validators.required),
        newelectricnumber: new FormControl('',Validators.required),
        newwaternumber: new FormControl('',Validators.required),
        services: new FormArray([])
      });

      this.frMember = new FormGroup({
        fullname : new FormControl('',Validators.required),
        dateofbirth : new FormControl('',Validators.required),
        cccd : new FormControl('',Validators.required),
        dateofissuance : new FormControl('',Validators.required),
        placeofissuance : new FormControl('',Validators.required),
        permanentaddress : new FormControl('',Validators.required),
        phone : new FormControl('',Validators.required),
        gender : new FormControl('male',Validators.required),
        ispermanent : new FormControl('no',Validators.required),
        permanentdate : new FormControl('no',Validators.required),
        job : new FormControl('',Validators.required),
        commencingon : new FormControl('',Validators.required),
      });



  }

  get devices() {
    return this.frRoom.get('devices') as FormArray;
  }
  get udevices() {
    return this.frURoom.get('devices') as FormArray;
  }
  get serviceItems() {
    return this.frInvoice.get('services') as FormArray;
  }

 //thiết lập nhà trọ hiện tại
  public setCurrentBranch(id: number, index : number){
    console.log('current branch :',id,'current index :',index );
    this.currentBranchId = id;
    this.currentBranchIndex = index;
  }
  
  // load dữ liệu ban đầu
  public loadData(){ 
    console.log(this.roomStatus);
    this._data.get("/api/branch/allroom?roomstatus="+this.roomStatus).subscribe(
      {
        next: res => { 
          console.log("respone all branch", res);
          this.branches = res;
          this.currentBranchId = this.branches[0].id;
        },
        error: err => { console.log(err); this._data.handleError(err); },
        complete: () => { console.log("load all room"); }, 
      });
  }

 //mở đóng model thêm khu vực
  public openAddAreaModal(){
    this._modalService.open(this.addAreaModal);
  }
  public closeAddAreaModal(){
    this._modalService.dismissAll(this.addAreaModal);
  }
  //mở đóng model xóa khu vực
  public openDeleteAreaModal(areaName : string , housetype:string, areaId: number){
    this.areaIdDelete = areaId;
    this.areaNameDelete = this._housetypePipe.transform(housetype,false) + ' '+  areaName;
    this._modalService.open(this.deleteAreaModal);
  }
  public closeDeleteAreaModal(){
    this._modalService.dismissAll(this.deleteAreaModal);
  }
   //mở đóng model sửa khu vực
  public openEditAreaModal(branchid:string, areaid:string, areaname: string, description:string){
    this.frUpdateArea.setValue({areaid: areaid,areaname : areaname, description: description, branchId : branchid});
    this._modalService.open(this.editAreaModal);
  }
  public closeEditAreaModal(){
    this._modalService.dismissAll(this.editAreaModal);
  }
  //mở đóng model xóa phòng
  public openDeleteRoomModal(areaName : string , roomNumber:string, roomId: number){
    this.roomIdDelete = roomId;
    this.roomNameDelete = areaName +'.'+roomNumber;
    this._modalService.open(this.deleteRoomModal);
  }
  public closeDeleteRoomModal(){
    this._modalService.dismissAll(this.deleteRoomModal);
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
    this.isValidAreaEditFormSubmitted = false;
    if (this.frUpdateArea.invalid){ 
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
        next: res => { this.uploadImage(res); console.log("repone ", res);},
        error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !");console.log(err);},
        complete: () => { 
          this._notify.printSuccessMessage("Thêm phòng trọ thành công !"); 
          this.LoadRoomInAreaData(this.currentBranchIndex,this.frRoom.controls['areaid'].value);
          this.closeCreateRoomModal();
          
        },
      }
    );
  }

  // chỉnh sửa phòng
  public editCurrentAreaId: number;
  public onFormUpdateRoomSubmit(){
    console.log('submit');
    this.isValidRoomEditFormSubmitted = false;
    
    if (this.frURoom.invalid) {
      console.log("is invalid");
			return;
		}
    this.isValidRoomEditFormSubmitted = true;

    console.log('submited',this.frURoom.value );

    this._data.put('/api/room/edit',this.frURoom.value).subscribe(
      {
        next: res => { this.uploadImage(res); console.log("repone ", res);},
        error: err => { this._data.handleError(err);console.log(err);},
        complete: () => { 
          this._notify.printSuccessMessage("Cập nhật thông tin phòng thành công !"); 
          this.LoadRoomInAreaData(this.currentBranchIndex,this.editCurrentAreaId);
          this.closeEditRoomModal();
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

  get editRoomId() {
    return this.frURoom.get('id')?.value;
  }

  // chỉnh sửa phòng -> thêm thiết bị
  public addDevicesEditForm(){
    console.log("add devices edit form");
    const group = new FormGroup({
      devicename: new FormControl('',Validators.required),
      quantity: new FormControl(1,Validators.required),
      description: new FormControl('')
    });
    
    let s = this.frURoom.get('devices') as FormArray;
    s.push(group);
  }
  // chỉnh sửa phòng -> xóa thiêt bị
  public removeDevicesEditForm(index:number){
    console.log("remove devices edit form");
    
    let s = this.frURoom.get('devices') as FormArray;
    s.removeAt(index);
  }
  
 
 // thêm phòng -> thiết lập khu vực
  public setSelectArea(event: any): void{
    let a : any[] = this.branches;
    this.areaSelect = a.find((data) =>  data.id == event.target.value).areas ;

  }


  //mở đóng model thêm phòng
  public openCreateRoomModal(branchId: any, areaId: any){
    this.frRoom.patchValue({branchid: branchId , areaid:areaId });
    if(branchId){
       let a : any[] = this.branches;
       this.areaSelect = a.find((data) =>  data.id == branchId ).areas ;
    }
    this._modalService.open(this.createRoomModal,{size:"xl"});
  }

  public closeCreateRoomModal(){
    this.imageNumber = 0;
    this.imagePreviewSrc=[];
    this.ImageUploads=[];
    let s = this.frRoom.get('devices') as FormArray;
    s.clear();
    this._modalService.dismissAll(this.createRoomModal);
  }




  public imageRooms: ImageRoomModel[];
  public indexEditImageRooms: number =0;
  //mở form chỉnh sửa phòng 
 //mở đóng model chỉnh sửa phòng
 public openEditRoomModal(roomid:number, branchName:string, areaName:string){

  this._data.get('/api/room/detail?roomid='+roomid).subscribe(
    {
      next: res => { 
        let room : RoomModel| any = res;
        console.log("repone ", room);   
        this.frURoom.patchValue({ id: room.id,
          branchid: branchName,
          areaid: areaName,
          roomnumber: room.roomNumber,
          acreage: room.acreage,
          ismezzanine: room.isMezzanine? "true": "false" ,
          price: room.price ,
          maxmember: room.maxMember,
         });

         this.imageRooms = room.imageRooms;
         this.indexEditImageRooms = room.imageRooms.length;
       
         this.editCurrentAreaId = room.areaId;
         let s = this.frURoom.get('devices') as FormArray;

          room.devices.forEach((e:any)=> {
            const group = new FormGroup({
              id: new FormControl(e.id),
              devicename: new FormControl(e.deviceName,Validators.required),
              quantity: new FormControl(e.quantity,Validators.required),
              description: new FormControl(e.description)
            });
            s.push(group);
          });
      },
      error: err => { this._data.handleError(err); console.log(err); },
      complete: () => { },
    }
  );
  this._modalService.open(this.editRoomModal,{size:"xl"});
}
public closeEditRoomModal(){

  this.imageNumber = 0;
  this.imagePreviewSrc=[];
  this.ImageUploads=[];
  this.indexEditImageRooms =0;
  let s = this.frURoom.get('devices') as FormArray;
  s.clear();
  this._modalService.dismissAll(this.editRoomModal);
}



  // xóa ảnh
  public deleteImageRoom( index: number,imageid:number){
    
    
    this._data.delete('/api/room/image/delete',"imageid",imageid.toString()).subscribe(
      {
        next: res => { console.log("repone ", res);},
        error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !"); console.log(err); },
        complete: () => { 
          this.imageRooms.splice(index,1);
          this._notify.printSuccessMessage("Xóa ảnh thành công !"); 
          this.indexEditImageRooms-=1;
          
        },
      }
    );

  }
 // cập nhật ảnh 
  onUploadOnefile(event:any) {
  
    const file :File = event.target.files[0];
    
    if (file) {

      this.fileName = file;

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);

      let formData:FormData = new FormData();
    
      formData.append('fileUpload', file);

      this._data.postFile('/api/room/uploadoneimage?roomid='+this.editRoomId.toString(), formData ).subscribe({
        next: res => {
           let image: ImageRoomModel | any = res;
           this.imageRooms.push(image);

          },
        error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !"); console.log(err);} ,
        complete: () => { this._notify.printSuccessMessage("Thêm ảnh thành công !"); this.indexEditImageRooms+=1;} ,
      });

      event.target.files.clear;

    }
}

   //xóa phòng
   public onDeleteRoomSubmit(){
    this._data.delete('/api/room/delete',"roomid",this.roomIdDelete.toString()).subscribe(
      {
        next: res => { console.log("repone ", res);},
        error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !"); console.log(err); },
        complete: () => { 
          this._notify.printSuccessMessage("Xóa phòng thành công !"); 
          this.closeAddAreaModal();
          this.LoadAreaData(this.currentBranchId, this.currentBranchIndex);
        },
      }
    );
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
      this._notify.printErrorMessage("Cho phép tải lên tối đa 6 tắm ảnh !");
    }
    
  }

  public removeImageUpload(index: number){
    this.imageNumber -=1;
    this.imagePreviewSrc.splice(index,1);
    this.ImageUploads.splice(index,1);
  }

  public uploadImage(roomId: any){
    if (this.ImageUploads.length>0) {

      let formData:FormData = new FormData();

      this.ImageUploads.forEach(file => {
        formData.append('fileUpload-'+file.name,file);
      });
      
      this._data.postFile("/api/room/uploadimage?roomid="+roomId.toString(), formData ).subscribe({
        next: ()=>{},
        error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !"); console.log(err);} ,
        complete: () => { this._notify.printSuccessMessage("Upload ảnh thành công !");} ,
      });;
    }

    this.imageNumber = 0;
    this.imagePreviewSrc=[];
    this.ImageUploads=[];

  }
 // end upload file


  //mở đóng model lập hóa đơn
  public openCreateInvoiceModal(roomid : number){
    this.totalPrice =0;
    this.elecPrice =0;
    this.elecNumber =0;
    this.wanterPrice =0;
    this.wanterNumber =0;
    let s = this.frInvoice.get('services') as FormArray;
    s.clear()

    this.loadDataToINvoice(roomid)
    this._modalService.open(this.createInvoiceModal, { size: 'lg', backdrop: 'static' });
  }

  public offCreateInvoiceModal(){
    this.totalPrice =0;
    this.elecPrice=0;
    this.elecNumber=0;
    this.wanterPrice=0;
    this.wanterNumber=0;
    let s = this.frInvoice.get('services') as FormArray;
    s.clear()
    this._modalService.dismissAll(this.createInvoiceModal);
  }
 

  public invoice :InvoiceModel | any = {};
  // load data to invoice 
  public loadDataToINvoice(roomid: number){
    console.log("load data to invoice room id : ",roomid);
    this._data.get('/api/invoice/info?roomid='+roomid).subscribe(
      {
        next: res => { 
          console.log(res);
          this.invoice = res;

          let s = this.frInvoice.get('services') as FormArray;
          this.frInvoice.patchValue({
            roomid: roomid,
            contractid: this.invoice.contractId,
            newelectricnumber: this.invoice.newElectricNumber,
            newwaternumber: this.invoice.newWaterNumber

          });

          if(this.invoice.serviceItems!=null)
          this.invoice.serviceItems.forEach((e:any)=> {
            const group = new FormGroup({
              servicename: new FormControl(e.serviceName,Validators.required),
              price: new FormControl(e.price,Validators.required),
              quantity: new FormControl(e.quantity,Validators.required),
              description: new FormControl(e.description)
            });
            s.push(group);
          });

          this.setEUse();
          this.setWUse();

        },
        error: err => { this._data.handleError(err); console.log(err); },
        complete: () => { this.setTotalPrice(); },
      }
    );
  }


  // chỉnh lập hóa đơn
  public onFormCreateInvoiceSubmit(){
    console.log('submit invoice');

    this.isValidInvoiceFormSubmitted = false;
    
    if (this.frInvoice.invalid) {
      console.log("is invalid");
      console.log(this.frInvoice.errors);
      return;
    }
    this.isValidInvoiceFormSubmitted= true;

    console.log('submited',this.frInvoice.value );

    this._data.post('/api/invoice/create',this.frInvoice.value).subscribe(
      {
        next: res => { console.log("repone ", res);},
        error: err => { this._data.handleError(err); console.log(err);},
        complete: () => { 

          this._notify.printSuccessMessage("Lặp hóa đơn thành công!"); 
          this.offCreateInvoiceModal();

        },
      }
    );
  }

  public totalPrice: number =0;
  public elecNumber : number =0;
  public wanterNumber : number =0;
  public elecPrice : number =0;
  public wanterPrice : number =0;


  public setEUse(){
    let en = this.frInvoice.get('newelectricnumber')?.value as number;
    if(en!=null){
      this.elecNumber = en - this.invoice.oldElectricNumber;
      this.elecPrice=this.elecNumber *  this.invoice.electricityCosts;
    }else {
      this.elecPrice=0;
      this.elecNumber=0;
    }
    this.setTotalPrice()
  }

  public setWUse(){
    let wn = this.frInvoice.get('newwaternumber')?.value as number;
    if(wn!=null){
      this.wanterNumber = wn - this.invoice.oldWaterNumber;
      this.wanterPrice=this.wanterNumber * this.invoice.waterCosts;
    }else {
      this.wanterPrice=0;
      this.wanterNumber=0;
    }
    this.setTotalPrice()
  }

  public setTotalPrice(){
    let serviceTotalPrice : number =0;
    let s = this.frInvoice.get('services') as FormArray;
    s.controls.forEach((element, index) => {
      serviceTotalPrice += element.get('price')?.value * element.get('quantity')?.value;
    });
    this.totalPrice = this.invoice.rentalPrice + this.wanterPrice + this.elecPrice + serviceTotalPrice;
  }

 // invoice -> thêm dịch vụ
  public addSevices(){
    console.log("add service");
    const group = new FormGroup({
      servicename: new FormControl('',Validators.required),
      price: new FormControl(0,Validators.required),
      quantity: new FormControl(1,Validators.required),
      description: new FormControl('')
    });
    
    let s = this.frInvoice.get('services') as FormArray;
    s.push(group);
    console.log(this.frInvoice.value);
    

  }

  // invoice -> xóa dịch vụ
  public removeSevices(index:number){
    console.log("remove services");
    let s = this.frInvoice.get('services') as FormArray;
    s.removeAt(index);
    this.setTotalPrice();
  }


  //mở đóng model thêm khu vực
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


  public detailRoom : RoomModel | any = {};


  // load data to invoice 
  public loadDetailRoom(roomid: number){
    console.log("load detail room id : ",roomid);
    this._data.get('/api/room/detail/full?roomid='+roomid).subscribe(
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

  get permanentDate() {
    return this.frMember.get('permanentdate');
  } 
  get isPermanent() {
    return this.frMember.get('ispermanent');
  } 

  public setPermanentDate(){
     console.log(this.isPermanent?.value);
    if(this.isPermanent?.value == "yes"){
      
      this.permanentDate?.enable();
      this.permanentDate?.setValue('');
      this.permanentDate?.setValidators([Validators.required]);
      this.permanentDate?.updateValueAndValidity();
      
    }else{
      this.permanentDate?.setValue('');
      this.permanentDate?.clearValidators();
      this.permanentDate?.updateValueAndValidity();
      this.permanentDate?.disable();
    }

    
    
  }

  //mở đóng model thêm thành viên
  public roomIdAddMember : number =0 ;
  public openAddMemberModal(roomId:number){
    this.roomIdAddMember = roomId;
    this.setPermanentDate();
    this._modalService.open(this.addMemberRoomModal,{size:"lg"});
  }
  public closeAddMemberModal(){
    this.roomIdAddMember = 0;
    this._modalService.dismissAll(this.addMemberRoomModal);
  }

  public onAddMemberSubmit(){
    console.log('submit');
    this.isValidMemberFormSubmitted = false;
    
    if (this.frMember.invalid) {
      console.log("is invalid",this.frMember.errors );
			return;
		}

    this.isValidMemberFormSubmitted = true;
    console.log('submited',this.frMember.value ,"-", this.roomIdAddMember);
    this._data.post('/api/customer/create?roomid='+this.roomIdAddMember, this.frMember.value).subscribe(
      {
        next: res => { console.log("respone ", res);},
        error: err => { this._notify.printErrorMessage("Có lỗi xảy ra vui lòng thử lại !");console.log(err);},
        complete: () => { 
          this._notify.printSuccessMessage("Thêm thành viên thành công !");
          
        },
      }
    );
  }



}
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/services/data.service';
import { DiagioihanhchinhService } from 'src/app/core/services/diagioihanhchinh.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BranchModel } from 'src/app/core/domain/room/branch.model';
import { RoomModel } from 'src/app/core/domain/room/room.model';

@Component({
  selector: 'app-create.transact',
  templateUrl: './create.transact.component.html',
  styleUrls: ['./create.transact.component.css']
})
export class CreateTransactComponent implements OnInit {

  constructor(
    private _http : HttpClient,
    private _data : DataService,
    private _notify : NotificationService,
    private _diagioi : DiagioihanhchinhService,
    private _elementRef: ElementRef,
    private _render: Renderer2,
    private _modalService: NgbModal
  ){}


  public frcontract : FormGroup;
  public isValidFormSubmitted: boolean | null = null;

  public brancheSelect: BranchModel[] | any;
  public areaSelect: any[] =[];
  public roomSelect: any[] =[];

  public vietnamdata : any[] =[];
  public District: any[] =[];
  public Wards: any[] =[];

  public currentBranch: BranchModel|any = {};
  public currentRoom: RoomModel|any = {};




  ngOnInit(): void {
     this.frcontract = new FormGroup({

      a_lessor : new FormControl('',Validators.required),
      a_dateofbirth : new FormControl('',Validators.required),
      a_cccd : new FormControl('',Validators.required),
      a_dateofissuance : new FormControl('',Validators.required),
      a_placeofissuance : new FormControl('',Validators.required),
      a_permanentaddress : new FormControl('',Validators.required),
      a_phone : new FormControl('',Validators.required),

      b_lessee : new FormControl('',Validators.required),
      b_dateofbirth : new FormControl('',Validators.required),
      b_cccd : new FormControl('',Validators.required),
      b_dateofissuance : new FormControl('',Validators.required),
      b_placeofissuance : new FormControl('',Validators.required),
      b_permanentaddress : new FormControl('',Validators.required),
      b_phone : new FormControl('',Validators.required),

      rentalprice : new FormControl('',Validators.required),
      durationofhouselease : new FormControl('',Validators.required),
      commencingon : new FormControl('',Validators.required),
      endingon : new FormControl('',Validators.required),
      roomid : new FormControl(null,Validators.required),
      branchid : new FormControl(null,Validators.required),
      areaid : new FormControl(null,Validators.required),
      deposit : new FormControl('',Validators.required),

    });

    this.loadData();
   
  }

  public loadData(){

    this._data.get("/api/branch/allroom").subscribe(
      {
        next: res => { 
          console.log("respone all branch", res);
          this.brancheSelect = res;
          
        },
        error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !");console.log(err); this._data.handleError(err); },
        complete: () => { console.log("load all room"); }, 
      });
  }

  public onSubmit(){
    console.log('submit');
    this.isValidFormSubmitted = false;
    
    if (this.frcontract.invalid) {
      console.log("is invalid",this.frcontract.errors );
			return;
		}
    this.isValidFormSubmitted = true;
    console.log('submited',this.frcontract.value );
    this._data.post('/api/contract/add',this.frcontract.value).subscribe(
      {
        next: res => { console.log("repone ", res);},
        error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !");console.log(err);},
        complete: () => { this._notify.printSuccessMessage("Thêm hợp đồng thành công !"); },
      }
    );

  }

  public setDistrict(event: any): void{
    
    console.log(event.target.options[event.target.options.selectedIndex].text);
    this.District = this.vietnamdata.find(data => data.Id == event.target.value).Districts;
  }

  public setWard(event: any): void{
    console.log(event.target.options[event.target.options.selectedIndex].text);
    this.Wards = this.District.find(data => data.Id == event.target.value).Wards;
  }

  public AddService(){
    console.log("add service");
    const group = new FormGroup({
      name: new FormControl('',Validators.required),
      price: new FormControl('',Validators.required)
    });
    
    let s = this.frcontract.get('services') as FormArray;
    s.push(group);
  }
  public RemoveService(index:number){
    console.log("remove service");
    
    let s = this.frcontract.get('services') as FormArray;
    s.removeAt(index);
  }
  get services() {
    return this.frcontract.get('services') as FormArray;
  }

  // thêm phòng -> thiết lập khu vực
  public setSelectArea(event: any): void{
    let a : any[] = this.brancheSelect;
    this.currentBranch = a.find((data) =>  data.id == event.target.value);
    this.areaSelect = a.find((data) =>  data.id == event.target.value).areas ;

  }
  // thêm phòng -> thiết lập khu vực
  public setSelectRoom(event: any): void{
    let a : any[] = this.areaSelect;
    this.roomSelect = a.find((data) =>  data.id == event.target.value).rooms ;

  }
  public SelectRoom(event: any): void{
    let a : any[] = this.roomSelect;
    this.currentRoom = a.find((data) =>  data.id == event.target.value) ;
    this.frcontract.patchValue({rentalprice: this.currentRoom.price });

  }
  
  





}

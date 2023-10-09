import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/services/data.service';
import { DiagioihanhchinhService } from 'src/app/core/services/diagioihanhchinh.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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


  public frcontract : FormGroup ;
  public isValidFormSubmitted: boolean | null = null;

  public vietnamdata : any[] =[];
  public District: any[] =[];
  public Wards: any[] =[];




  ngOnInit(): void {
     this.frcontract = new FormGroup({

      a_lessor : new FormControl('',Validators.required),
      a_dateofbirth : new FormControl('',Validators.required),
      a_cccd : new FormControl('',Validators.required),
      a_dateofissuance : new FormControl('',Validators.required),
      a_placeofissuance : new FormControl('',Validators.required),
      a_permanentaddress : new FormControl('',Validators.required),
      a_phone : new FormControl('',Validators.required),

      b_Lessee : new FormControl('',Validators.required),
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
      roomnumber : new FormControl('',Validators.required),
      branchname : new FormControl('',Validators.required),
      branchaddress : new FormControl('',Validators.required),
      housetype : new FormControl('',Validators.required),
      areaname : new FormControl('',Validators.required),
      acreage : new FormControl('',Validators.required),
      ismezzanine : new FormControl('',Validators.required),
      deposit : new FormControl('',Validators.required),

      

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
    this._data.post('/api/branch/add',this.frcontract.value).subscribe(
      {
        next: res => { console.log("repone ", res);},
        error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !");console.log(err);},
        complete: () => { this._notify.printSuccessMessage("Thêm nhà trọ thành công !"); },
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




}

import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit,  Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DiagioihanhchinhService } from 'src/app/core/services/diagioihanhchinh.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataTableLanguage} from '../../../../core/domain/datatable/datatable.language';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit,OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective; 

  @ViewChild('editModal') deleteModal: TemplateRef<any>;
  
  datatableElement: any = DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  public displayCreate :boolean = false;
  public styleTable: string = "block";

  public frbranch : FormGroup ;
  public isValidFormSubmitted: boolean | null = null;

  public vietnamdata : any[] =[];
  public District: any[] =[];
  public Wards: any[] =[];

  public deleteBranchId: Number;

constructor(
  private _http : HttpClient,
  private _data : DataService,
  private _notify : NotificationService,
  private _diagioi : DiagioihanhchinhService,
  private _elementRef: ElementRef,
  private _render: Renderer2,
  private _modalService: NgbModal
){

  this._diagioi.getdata().subscribe((res) => {
       this.vietnamdata = res;
    });;
}
 

  
  ngOnInit(): void {

    

    this.dtOptions = {
      serverSide: true,     // Set the flag 
      ajax: (dataTablesParameters: any, callback) => {
        this._data.postForDataTable(
            '/api/branch/branchesfordatatable',
            dataTablesParameters
          ).subscribe(
            {
              next: resp  => {
                console.log("Respone=> ", resp)
                callback({
                  recordsTotal: resp.recordsTotal,
                  recordsFiltered: resp.recordsFiltered,
                  data: resp.data
                });
              },
              error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại"); this._data.handleError(err)} ,
              
            });
           
      },
      language: DataTableLanguage.vietnam_datatables,
      columns: [{
          title: 'ID',
          data: 'id'
        }, {
          title: 'Tên nhà trọ',
          data: 'branchName'
        }, {
          title: 'Mô tả',
          data: 'description'
        }, {
          title: 'Địa chỉ',
          data: 'address'
        }, {
          title: 'Tác vụ',
          data: null,
          defaultContent: '',
          render: function (data: any, type: any,row: any, full: any) {
            return '<button type="button" deletebtn branchid="'+row.id+'" class="btn btn-sm btn-danger"   >Xóa </button>';
          }
        }
      ]
    };


    this.frbranch = new FormGroup({
      branchname: new FormControl('',Validators.required),
      housetype : new FormControl('row',Validators.required),
      description: new FormControl(''),
      internalregulation: new FormControl(''),
      province: new FormControl('',Validators.required),
      district: new FormControl('',Validators.required),
      wards: new FormControl('',Validators.required),
      address: new FormControl('',Validators.required),
      electricitycosts: new FormControl('',Validators.required),
      watercosts: new FormControl('',Validators.required),
      services: new FormArray([])

    });

  }



  ngAfterViewInit(): void {

    this.dtTrigger.next('');

    this._render.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("branchid") || event.target.hasAttribute("deletebtn")) {
        //this.deleteBranch(event.target.getAttribute("branchid"))
        
        this.deleteBranchId = event.target.getAttribute("branchid");
        this.openModal();
       
      }
    });
  }

  openModal(){
    this._modalService.open(this.deleteModal);
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  

  get branchname(){ return this.frbranch.get('branchname');}



  public CreateOn(){
    this.displayCreate = true;
    this.styleTable = "none";
  }

  public CreateOff(){
    this.displayCreate = false;
    this.styleTable = "block";

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
    
    let s = this.frbranch.get('services') as FormArray;
    s.push(group);
  }
  public RemoveService(index:number){
    console.log("remove service");
    
    let s = this.frbranch.get('services') as FormArray;
    s.removeAt(index);
  }
  get services() {
    return this.frbranch.get('services') as FormArray;
  }


  public onSubmit(){
    console.log('submit');
    this.isValidFormSubmitted = false;
    
    if (this.frbranch.invalid) {
      console.log("is invalid",this.frbranch.errors );
			return;
		}
    this.isValidFormSubmitted = true;
    console.log('submited',this.frbranch.value );
    this._data.post('/api/branch/add',this.frbranch.value).subscribe(
      {
        next: res => { console.log("repone ", res);},
        error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !");console.log(err);},
        complete: () => { this._notify.printSuccessMessage("Thêm nhà trọ thành công !"); this.CreateOff(); this.rerender();},
      }
    );

  }

  public deleteBranch(){
   
   this._data.delete('/api/branch/delete','branchid',this.deleteBranchId.toString()).subscribe({
    next: () => {},
    error: err => { this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại"); console.log("122");},
    complete: () => {this._notify.printSuccessMessage("Xóa nhà trọ thành công"); this.rerender();},

  });


    
  }

  public rerender(): void {
    
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      //dtInstance.destroy();
      dtInstance.ajax.reload(); 
      // Call the dtTrigger to rerender again

      this.dtTrigger.next('');
      
    });
  }

}

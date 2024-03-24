import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { DiagioihanhchinhService } from 'src/app/core/services/diagioihanhchinh.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {DataTableLanguage} from '../../../core/domain/datatable/datatable.language';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { BranchModel } from 'src/app/core/domain/room/branch.model';
import { InvoiceModel } from 'src/app/core/domain/invoice/invoice.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [DatePipe]
})
export class CustomerComponent {
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective ; 
  @ViewChild('InvoiceDetailModal') InvoiceDetailModal : TemplateRef<any>; 
  @ViewChild('InvoiceAgreeModal') InvoiceAgreeModal : TemplateRef<any>; 

  @ViewChild('deleteMemberModal') deleteMemberModal : TemplateRef<any>; 
  @ViewChild('detailMemberModal') detailMemberModal : TemplateRef<any>; 

  datatableElement: any = DataTableDirective;

  public dtOptions: DataTables.Settings = {};

  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _http : HttpClient,
    private _data : DataService,
    private _notify : NotificationService,
    private _diagioi : DiagioihanhchinhService,
    private _elementRef: ElementRef,
    private _render: Renderer2,
    private _modalService: NgbModal,
    private _datePipe : DatePipe
  ){}


  public status_filter: string ='none';
  public branch_filter: string ='0';
  
  public branches: BranchModel[] | any;
  public member :any = {};

  public frMember : FormGroup ;

  public isValidMemberFormSubmitted :boolean | null = null;

  listenerFn = () => {};

  ngAfterViewInit(): void {
    this.dtTrigger.next('');

    this.listenerFn = this._render.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("memberid") && event.target.hasAttribute("detailbtn")) {
          let memberId = event.target.getAttribute("memberid") as number;
          this.loadMemberData(memberId);
          this.openDetailMemberModal(memberId);
          
         
      }else{
        if(event.target.hasAttribute("memberid") && event.target.hasAttribute("deletebtn")){
          let memberId = event.target.getAttribute("memberid") as number;
          this.openDeleteMemberModal(memberId);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.listenerFn();
  }

  // load dữ liệu ban đầu
  public loadDataBranch(){ 

    this._data.get("/api/branch/all").subscribe(
      {
        next: res => { 
          console.log("respone list branch", res);
          this.branches = res;
        },
        error: err => { console.log(err); this._data.handleError(err); },
        complete: () => { console.log("load all room"); }, 
      });
  }

 
  ngOnInit() {
    this.loadDataBranch();
    this.dtOptions = {
      serverSide: true,     // Set the flag 
      ajax: (dataTablesParameters: any, callback) => {
        this._data.postForDataTable(
            '/api/customer/invoicefordatatable?status='+this.status_filter+'&branchid='+this.branch_filter,
            dataTablesParameters
          ).subscribe(
            {
              next: resp => {
                console.log("Respone=> ", resp)
                callback({
                  recordsTotal: resp.recordsTotal,
                  recordsFiltered: resp.recordsFiltered,
                  data: resp.data
                });
              },
              error: err => {  this._data.handleError(err)} ,
              
            });
           
      },
      language: DataTableLanguage.vietnam_datatables,
      columns: [{
          title: 'STT',
          data: 'index'
        }, 
        {
          title: 'Họ tên',
          data: 'fullName'
        }, 
        {
          title: 'Đại diện',
          data: null,
          defaultContent: '',
          render: function (data: any, type: any, row: any, full: any) {
            if ( row.isRepresent ) return '<span >X</span>';
            return '';
          }
        }, 
        {
          title: 'Giới tính',
          data: null,
          defaultContent: '',
          render: function (data: any, type: any, row: any, full: any) {
            if (!row.gender ) return '<span >Nữ</span>';
            if ( row.gender ) return '<span >Nam</span>';
            return '';
          }
        }, 
        {
          title: 'Ngày sinh',
          data: 'dateOfBirth'
        },
        {
          title: 'CCCD',
          data: 'cccd'
        },  
        {
          title: 'Nghề nghiệp',
          data: 'job'
        }, 
        {
          title: 'Địa chỉ',
          data: 'permanentAddress'
        }, 
        {
          title: 'Số phòng',
          data: 'roomName'
        }, 
        {
          title: 'Nhà trọ',
          data: 'branchName'
        }, 
        {
          title: 'Trạng thái',
          data: null,
          defaultContent: '',
          render: function (data: any, type: any, row: any, full: any) {
            if (row.isActive ) return '<span class="badge badge-pill badge-success">Còn ở</span>';
            if ( !row.isActive ) return '<span class="badge badge-pill badge-secondary">Rời đi</span>';
            return '';
          }
        }, 
        {
          title: 'Tác vụ',
          data: null,
          defaultContent: '',
          render: function (data: any, type: any,row: any, full: any) {
            let html = '<button type="button" detailbtn memberid="'+row.id+'" class="btn btn-sm btn-primary mr-2" >Chi tiết</button>';
            if(!row.isRepresent){
              html = html + '<button type="button" deletebtn memberid="'+row.id+'" class="btn btn-sm btn-danger" >Xóa</button>';
            }else{
              html = html + '<button type="button" disabled class="btn btn-sm btn-danger" >Xóa</button>';
            }

            return html;
          }
        }
      ]
    };

    this.frMember = new FormGroup({
      id : new FormControl('',Validators.required),
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
      endingon : new FormControl(''),
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

  //mở đóng model 
  public openInvoiceDetailModal(){
    this._modalService.dismissAll(this.InvoiceDetailModal);
    this._modalService.open(this.InvoiceDetailModal, { size: 'lg', backdrop: 'static'});
  }

  public closeInvoiceDetailModal(){
    this._modalService.dismissAll(this.InvoiceDetailModal);
  }

  //mở đóng delete member modal 
  public openDeleteMemberModal(memberid:number){
    this.deleteMemberId = memberid.toString();
    this._modalService.dismissAll(this.deleteMemberModal);
    this._modalService.open(this.deleteMemberModal);
  }

  public closeDeleteMemberModal(){
    this._modalService.dismissAll(this.deleteMemberModal);
  }

  public deleteMemberId:string;
  // delete member 
  public deleteMember(){
    
      console.log("delete member id : ",this.deleteMemberId);
          this._data.delete('/api/customer/delete','memberid',this.deleteMemberId).subscribe(
            {
              next: res => { 
                console.log(res);
              },
              error: err => { this._data.handleError(err); console.log(err); },
              complete: () => { this._notify.printSuccessMessage("Xóa thành viên thành công !"); this.rerender() },
            }
          );
    
    this._modalService.dismissAll(this.InvoiceAgreeModal);
  }



  //mở đóng detail member modal 
  public openDetailMemberModal( memberid:number ){
    this._modalService.dismissAll(this.detailMemberModal);
    this._modalService.open(this.detailMemberModal,{ size: 'lg'});
  }

  public closeDetailMemberModal(){
    this._modalService.dismissAll(this.detailMemberModal);
  }



  // load member data 
  public loadMemberData(memberid: number){
    console.log("load member by id : ",memberid);
    this._data.get('/api/customer/detail?memberid='+memberid).subscribe(
      {
        next: res => { 
          console.log(res);
          this.member = res;
          this.frMember.patchValue({
            id : this.member.id,
            fullname : this.member.fullName,
            dateofbirth :  this._datePipe.transform(this.member.dateOfBirth , "yyyy-MM-dd"),
            cccd : this.member.cccd,
            dateofissuance : this._datePipe.transform(this.member.dateOfIssuance , "yyyy-MM-dd"),
            placeofissuance : this.member.placeOfIssuance,
            permanentaddress : this.member.permanentAddress,
            phone : this.member.phone,
            gender : this.member.gender==false?'female':'male',
            ispermanent : this.member.isPermanent==true?'yes':'no',
            permanentdate :  this._datePipe.transform(this.member.permanentDate , "yyyy-MM-dd"),
            job : this.member.job,
            commencingon : this._datePipe.transform(this.member.commencingOn  , "yyyy-MM-dd"),
            endingon : this._datePipe.transform(this.member.endingOn , "yyyy-MM-dd"),
          });

         this.setPermanentDate();


        },
        error: err => { this._data.handleError(err); console.log(err); },
        complete: () => { },
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
      //this.permanentDate?.setValue('');
      this.permanentDate?.setValidators([Validators.required]);
      this.permanentDate?.updateValueAndValidity();
      
    }else{
      this.permanentDate?.setValue('');
      this.permanentDate?.clearValidators();
      this.permanentDate?.updateValueAndValidity();
      this.permanentDate?.disable();
    }

    
    
  }

  public roomIdAddMember : number = 0 ;
  public onUpdateMemberSubmit(){
    console.log('submit');
    this.isValidMemberFormSubmitted = false;
    
    if (this.frMember.invalid) {
      console.log("is invalid",this.frMember.errors );
			return;
		}

    this.isValidMemberFormSubmitted = true;
    console.log('submited',this.frMember.value ,"-", this.roomIdAddMember);
    this._data.put('/api/customer/update', this.frMember.value).subscribe(
      {
        next: res => { console.log("respone ", res);},
        error: err => { this._notify.printErrorMessage("Có lỗi xảy ra vui lòng thử lại !");console.log(err);},
        complete: () => { 

          this._notify.printSuccessMessage("Cập nhật thành công !");
          this.closeDetailMemberModal();
          this.rerender();

        },
      }
    );
  }

 

 

}

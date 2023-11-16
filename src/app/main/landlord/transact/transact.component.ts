import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataTableLanguage } from '../../../core/domain/datatable/datatable.language';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ContractModel } from 'src/app/core/domain/contract/contract.model'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { InvoiceModel } from 'src/app/core/domain/invoice/invoice.model';


@Component({
  selector: 'app-transact',
  templateUrl: './transact.component.html',
  styleUrls: ['./transact.component.css']
})
export class TransactComponent implements OnInit, OnDestroy, AfterViewInit {


  constructor(
    private _http: HttpClient,
    private _data: DataService,
    private _notify: NotificationService,
    private _render: Renderer2,
    private _modalService: NgbModal
  ) {
  }
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  @ViewChild('DetailModal') detailModal: TemplateRef<any>;
  @ViewChild('EndContractModal') EndContractModal: TemplateRef<any>;
  @ViewChild('LinkToTenantModal') LinkToTenantModal: TemplateRef<any>;
  @ViewChild('ComfimToLinkModal') ComfimToLinkModal: TemplateRef<any>;
  @ViewChild('PayContractModal') PayContractModal: TemplateRef<any>;

  public ContractDetailId: Number;

  datatableElement: any = DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  public displayCreate: boolean = false;
  public styleTable: string = "block";

  public currentCTDetail : ContractModel | any = {};
 
  public searchTenantValue :any = {};
  
  public frInvoice : FormGroup ;
  public isValidInvoiceFormSubmitted :boolean | null = null;

  ngOnInit(): void {

    this.dtOptions = {
      serverSide: true,     // Set the flag 
      ajax: (dataTablesParameters: any, callback) => {
        this._data.postForDataTable(
          '/api/contract/contractfordatatable',
          dataTablesParameters
        ).subscribe(
          {
            next: resp => {
              console.log("Respone datatable=> ", resp)
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: resp.data
              });
            },
            error: err => { this._data.handleError(err) },

          });
      },
      language: DataTableLanguage.vietnam_datatables,
      columns: [{
        title: 'STT',
        data: 'index'
      },
      {
        title: 'Tên người thuê',
        data: 'b_Lessee'
      },
      {
        title: 'Cccd',
        data: 'b_Cccd'
      },
      {
        title: 'Số phòng',
        data: 'roomNumber'
      },

      {
        title: 'Số dãy-tầng',
        data: 'areaName'
      },
      {
        title: 'Tên nhà trọ',
        data: 'branchName'
      },
      {
        title: 'Ngày bắt đầu HD',
        data: 'commencingOn'
      },
      {
        title: 'Ngày kết thúc HD',
        data: 'endingOn'
      },
      {
        title: 'Trạng thái',
        data: null,
        defaultContent: '',
        render: function (data: any, type: any, row: any, full: any) {
          if (row.status == 'Active') return '<span class="badge badge-pill badge-success">Còn hiệu lực</span>';
          if (row.status == 'Expirat') return '<span class="badge badge-pill badge-secondary">Kết thúc</span>';
          return '';
        }
      }
        ,
      {
        title: 'Tác vụ',
        data: null,
        defaultContent: '',
        render: function (data: any, type: any, row: any, full: any) {
          return '<button type="button" detailbtn contractid="' + row.id + '" class="btn btn-sm btn-primary mr-2" >Chi tiết </button>'
            + '<button type="button" exportpdfbtn contractid="' + row.id + '" class="btn btn-sm btn-success">Xuất PDF</button>';
        }
      }
      ]
    };

    this.frInvoice = new FormGroup({
      roomid: new FormControl(0,Validators.required),
      contractid: new FormControl(0,Validators.required),
      newelectricnumber: new FormControl('',Validators.required),
      newwaternumber: new FormControl('',Validators.required),
      oldelectricnumber: new FormControl('',Validators.required),
      oldwaternumber: new FormControl('',Validators.required),
      services: new FormArray([])
    });

  }

  get serviceItems() {
    return this.frInvoice.get('services') as FormArray;
  }

  listenerFn = () => {};
  ngAfterViewInit(): void {

    this.dtTrigger.next('');

    this.listenerFn = this._render.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("contractid") && event.target.hasAttribute("detailbtn")) {
          let ctId = event.target.getAttribute("contractid") as number;
          this.loadContractDetail(ctId);
          this.openModal();
      }else{
        if(event.target.hasAttribute("contractid") && event.target.hasAttribute("exportpdfbtn")){
          let ctId = event.target.getAttribute("contractid") as number;
          this.exportToPdf(ctId);
        }
      }
    });
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.listenerFn();
  }

  openModal() {
    this._modalService.dismissAll(this.detailModal);
    this._modalService.open(this.detailModal);
  }

  openEndContractModal() {
    this._modalService.open(this.EndContractModal);
  }
  closeEndContractModal() {
    this._modalService.dismissAll(this.EndContractModal);
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

  public exportToPdf(contractid:number){
    this._notify.printSuccessMessage("Vui lòng chờ file đang gửi đến bạn !");
    console.log(contractid);

    const anchorElement = document.createElement('a');
    document.body.appendChild(anchorElement);
    
    this._data.DownloadFile("/api/contract/pdf?contractid="+contractid).subscribe(
      {
        next: (res:any) => { 
          console.log(res);
          const blob = new Blob([res], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          anchorElement.href = url;
          anchorElement.download =  "hop_dong_thue_tro_so_" + contractid;
          //anchorElement.click();
        
          //window.URL.revokeObjectURL(url);
          window.open(url);
        },
        error: err => {console.log(err); this._data.handleError(err); },

        complete: () => {  }, 
      });
  }

  public loadContractDetail(contractid : number){

    this._data.get("/api/contract/detail?contractid="+contractid).subscribe(
      {
        next: res => { 
          console.log("respone contract", res);
          this.currentCTDetail = res;
          this.currentContractId = this.currentCTDetail.id as number;
        },
        error: err => {console.log(err); this._data.handleError(err); },
        complete: () => { }, 
      });
  }

  public currentContractId :number ;
  public endContract(){
    console.log(this.currentContractId);
    if(this.currentContractId >0){
      this._data.post("/api/contract/end?contractid="+this.currentContractId).subscribe(
      {
        next: (res:any) => { 
          console.log(res);
        },
        error: err => {console.log(err); this._data.handleError(err); },

        complete: () => {  
          this._notify.printSuccessMessage("Kết thúc hợp đồng thành công !");
          this.closeEndContractModal(); 
          this.rerender();
        }, 
      });
    }else{
      this.closeEndContractModal();
      this._notify.printErrorMessage("Có lỗi xây ra vui lòng thử lại !");
    }

    
  }

  openLinkToTenantModal() {
    this._modalService.open(this.LinkToTenantModal);
  }
  closeLinkToTenantModal() {
    this._modalService.dismissAll(this.LinkToTenantModal);
  }
  openConfimToLinkModal() {
    this._modalService.open(this.ComfimToLinkModal);
  }
  closeConfimToLinkModal() {
    this._modalService.dismissAll(this.ComfimToLinkModal);
  }

  public tenant: any ={};
  public tenantSearch(){

    this._data.get("/api/contract/searchtenant?phone="+ this.searchTenantValue.phoneinput).subscribe(
      {
        next: res => { 
          console.log("respone tenant", res);
          this.tenant = res;
        },
        error: err => {console.log(err); this._data.handleError(err); },
        complete: () => {
            if(this.tenant.success == false){
                this._notify.printErrorMessage('Không tìm thấy khách trọ nào !');
            }

         }, 
      });
  }


  public LinkToTenant(){
    console.log(this.currentContractId);
    if(this.currentContractId >0){
      this._data.post("/api/contract/linktotenant?contractid="+this.currentContractId+"&tenantid="+this.tenant.id ).subscribe(
      {
        next: (res:any) => { 
          console.log(res);
        },
        error: err => {console.log(err); this._data.handleError(err); },

        complete: () => {  
          this.closeConfimToLinkModal() 
          this._notify.printSuccessMessage("Liên kết với tài khoản thành công !");
        }, 
      });
    }else{
     
      this._notify.printErrorMessage("Có lỗi xảy ra vui lòng thử lại !");
    }

  }

  
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
    this._modalService.open(this.PayContractModal, { size: 'lg', backdrop: 'static' });
  }

  public offCreateInvoiceModal(){
    this.totalPrice =0;
    this.elecPrice=0;
    this.elecNumber=0;
    this.wanterPrice=0;
    this.wanterNumber=0;
    let s = this.frInvoice.get('services') as FormArray;
    s.clear()
    this._modalService.dismissAll(this.PayContractModal);
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
            newwaternumber: this.invoice.newWaterNumber,
            oldelectricnumber: this.invoice.oldElectricNumber,
            oldwaternumber: this.invoice.oldWaterNumber,

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
    let olden = this.frInvoice.get('oldelectricnumber')?.value as number;
    if(en!=null){
      this.elecNumber = en - olden;
      this.elecPrice=this.elecNumber *  this.invoice.electricityCosts;
    }else {
      this.elecPrice=0;
      this.elecNumber=0;
    }
    this.setTotalPrice()
  }

  public setWUse(){
    let wn = this.frInvoice.get('newwaternumber')?.value as number;
    let oldWn = this.frInvoice.get('oldwaternumber')?.value as number;
    if(wn!=null){
      this.wanterNumber = wn - oldWn;
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



}

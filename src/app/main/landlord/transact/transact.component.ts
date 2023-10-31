import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataTableLanguage } from '../../../core/domain/datatable/datatable.language';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ContractModel } from 'src/app/core/domain/contract/contract.model'


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

  @ViewChild('DetailModal') detailModal: TemplateRef<any>; // Note: TemplateRef
  @ViewChild('EndContractModal') EndContractModal: TemplateRef<any>
  public ContractDetailId: Number;

  datatableElement: any = DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  public displayCreate: boolean = false;
  public styleTable: string = "block";

  public currentCTDetail : ContractModel | any = {};


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

  }



  ngAfterViewInit(): void {

    this.dtTrigger.next('');

    this._render.listen('document', 'click', (event) => {
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


}

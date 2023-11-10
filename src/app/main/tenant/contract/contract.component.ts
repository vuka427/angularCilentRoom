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
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit, OnDestroy, AfterViewInit {


  constructor(
    private _data: DataService,
    private _notify: NotificationService,
    private _render: Renderer2,
    private _modalService: NgbModal){}

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @ViewChild('DetailModal') detailModal: TemplateRef<any>;

  datatableElement: any = DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  public ContractDetailId: Number;
  public currentContractId :number ;
  public currentCTDetail : ContractModel | any = {};


  ngOnInit(): void {

    this.dtOptions = {
      serverSide: true,     // Set the flag 
      ajax: (dataTablesParameters: any, callback) => {
        this._data.postForDataTable(
          '/api/contract/tenant/contractfordatatable',
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
        title: 'Tên chủ trọ',
        data: 'a_Lessor'
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
      },
      {
        title: 'Tác vụ',
        data: null,
        defaultContent: '',
        render: function (data: any, type: any, row: any, full: any) {
          return '<button type="button" detailbtn contractid="' + row.id + '" class="btn btn-sm btn-primary mr-2" >Chi tiết </button>'
            ;
        }
      }
      ]
    };
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

  public loadContractDetail(contractid : number){

    this._data.get("/api/contract/tenant/detail?contractid="+contractid).subscribe(
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


}

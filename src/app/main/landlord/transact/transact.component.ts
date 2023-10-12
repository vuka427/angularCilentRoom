import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import {DataTableLanguage} from '../../../core/domain/datatable/datatable.language';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-transact',
  templateUrl: './transact.component.html',
  styleUrls: ['./transact.component.css']
})
export class TransactComponent implements OnInit, OnDestroy, AfterViewInit  {
 

  constructor(
    private _http : HttpClient,
    private _data : DataService,
    private _notify : NotificationService,
    private _render: Renderer2,
    private _modalService: NgbModal
  ){
  }
   


  datatableElement: any = DataTableDirective ;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  public displayCreate :boolean = false;
  public styleTable: string = "block";


  ngOnInit(): void {

    this.dtOptions = {
      serverSide: true,     // Set the flag 
      ajax: (dataTablesParameters: any, callback) => {
        this._data.postForDataTable(
            '/api/contract/contractfordatatable',
            dataTablesParameters
          ).subscribe(
            {
              next: resp  => {
                console.log("Respone datatable=> ", resp)
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
            return '<button type="button" deletebtn branchid="'+row.id+'" class="btn btn-sm btn-danger" >Xóa </button>';
          }
        }
      ]
    };

  }



  ngAfterViewInit(): void {

    this.dtTrigger.next('');

    this._render.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("branchid") || event.target.hasAttribute("deletebtn")) {
        //this.deleteBranch(event.target.getAttribute("branchid"))
        
        //this.deleteBranchId = event.target.getAttribute("branchid");
        //this.openModal();
       
      }
    });
  }

 
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }





}

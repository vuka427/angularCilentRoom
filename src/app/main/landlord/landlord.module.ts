import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandlordRoutingModule } from './landlord-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ValidationModule } from 'src/app/shared/validation/validation.module';
import { RoomComponent } from './room/room.component';
import { CustomerComponent } from './customer/customer.component';
import { TransactComponent } from './transact/transact.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { EmailhistoryComponent } from './emailhistory/emailhistory.component';

import { UtilitesComponent } from './utilites/utilites.component';
import { BranchComponent } from './room/branch/branch.component';

import { DataTablesModule } from 'angular-datatables';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { RoomstatusPipe } from 'src/app/shared/pipe/roomstatus.pipe';
import { HousetypePipe } from 'src/app/shared/pipe/housetype.pipe';
import { CreateTransactComponent } from './transact/create.transact/create.transact.component';
import { BrowserModule } from '@angular/platform-browser';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { InvoiceTransactComponent } from './transact/invoice.transact/invoice.transact.component';
import { FormatVndPipe } from 'src/app/shared/pipe/format.vnd.pipe';
import {NgxPrintModule} from 'ngx-print';
import { Imports_pipeModule } from 'src/app/shared/pipe/imports_pipe.module';
import { StatisticComponent } from './statistic/statistic.component';



@NgModule({
  declarations: [
    ProfileComponent,
    RoomComponent,
    CustomerComponent,
    TransactComponent,
    FeedbackComponent,
    EmailhistoryComponent,
    UtilitesComponent,
    BranchComponent,
    StatisticComponent,
    CreateTransactComponent,
    InvoiceTransactComponent
    
  ],
  providers: [
    HousetypePipe
  ],
  imports: [
    CommonModule,
    LandlordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationModule,
    DataTablesModule,
    NgbTooltipModule,
    CKEditorModule,
    NgxPrintModule,
    NgbDropdownModule,
    Imports_pipeModule
  ]
  
})
export class LandlordModule { }

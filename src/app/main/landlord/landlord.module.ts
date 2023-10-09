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
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { RoomstatusPipe } from 'src/app/shared/pipe/roomstatus.pipe';
import { HousetypePipe } from 'src/app/shared/pipe/housetype.pipe';
import { CreateTransactComponent } from './transact/create.transact/create.transact.component';





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
    RoomstatusPipe,
    HousetypePipe,
    CreateTransactComponent
    
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
    NgbTooltipModule
  ]
  
})
export class LandlordModule { }

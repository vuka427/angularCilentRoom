import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { AreaComponent } from './room/area/area.component';
import { DataTablesModule } from 'angular-datatables';





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
    AreaComponent,
    
  ],
  imports: [
    CommonModule,
    LandlordRoutingModule,
    FormsModule,
    ValidationModule,
    DataTablesModule
  ]
  
})
export class LandlordModule { }

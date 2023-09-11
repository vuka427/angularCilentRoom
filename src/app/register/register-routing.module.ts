import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantComponent } from './tenant/tenant.component';
import { LandlordComponent } from './landlord/landlord.component';


const routes: Routes = [
  {path: '', redirectTo: 'tenant', pathMatch: 'full' },
  {path: 'tenant', component: TenantComponent },
  {path: 'landlord', component: LandlordComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
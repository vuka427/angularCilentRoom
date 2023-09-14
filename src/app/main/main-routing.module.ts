import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';
import { MainComponent } from './main.component';


const routes: Routes = [ 
  { path: '', 
  component: MainComponent , 
  children :[
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
      { path: 'landlord', loadChildren: () => import('./landlord/landlord.module').then(m => m.LandlordModule)},
      { path: 'tenant', loadChildren: () => import('./tenant/tenant.module').then(m => m.TenantModule)},
      { path: '**', component: PageNotFoundComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';

const routes: Routes = [
  {
    path: '', component: AboutComponent,
    children: [
      {
        path: '',
        outlet: 'contactus',
        loadChildren: () => import('./contactus/contactus.module').then(m => m.ContactusModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddprojectComponent } from './addproject/addproject.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';


const routes: Routes = [
  {
    path: 'addproject',
    component: AddprojectComponent,
    data: { title: "add project" }
  },

  {
    path: 'addtask',
    component: AddtaskComponent,
    data: { title: "add task" }
  },

  {
    path: 'adduser',
    component: AdduserComponent,
    data: { title: "add user" }
  },

  {
    path: 'viewtask',
    component: ViewtaskComponent,
    data: { title: "view task" }
  },

  {
    path: '',
    redirectTo: 'adduser',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';
import { InvokeFunctionExpr } from '@angular/compiler';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {

  projects: any = [];
  users: any = [];

  public startDate = new Date(new Date());
  public endDate = new Date(new Date().getTime() + 86400000);

  // projStartDate = new FormControl(this.startDate);
  // projEndDate = new FormControl(this.endDate);

  @Input() projectData = { projName: '', projStartDate: '', projEndDate: '', projPriority: '0' };
  @Input() userData = { userId: '', firstName: '', lastName: '', empId: '', projId: '', taskId: '' };

  constructor(public rest: RestService, private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getProjects();
    this.getUsers();
    console.log("Project Data : ", this.projectData)
  }

  addProject() {
    if (this.projectData.projStartDate.length == 0) {
      this.projectData.projStartDate = dateFormatter(this.startDate);
      this.projectData.projEndDate = dateFormatter(this.endDate);
    }

    this.rest.addPrjoect(this.projectData).subscribe(() => {
      console.log("addProject - projectData : ", this.projectData)
      console.log("this.projectData.projName : ", this.projectData.projName);
      this.rest.getProject(this.projectData.projName).subscribe((data: {}) => {
        console.log("getProject - data : ", data);
        console.log("users - data : ", this.users);
        console.log("data [] : ", data[0]);
        console.log("data[0].projId : ", data[0].projId);
        // this.projects = data;
        this.users[0].projId = data[0].projId;
        this.rest.putUser(this.users[0]).subscribe(() => {
          console.log("putUser - this.users : ", this.users);
        })
      })
      // this.projectData = { projName: '', projStartDate: '', projEndDate: '', projPriority: '', projManager: '' };
    })
  }

  getUsers() {
    this.users = [];
    this.rest.getUsers().subscribe((data: {}) => {
      console.log("getUsers - data : ", data);
      this.users = data;
    })
  }

  getProjects() {
    this.projects = [];
    this.rest.getProjects().subscribe((data) => {
      console.log("getProjects - data : ", data);
      this.projects = data;
    })
  }

  passBack(users) {
    console.log(" passBack User Id: ", users.userId);
    // this.projectData.projManager = users.Id;
  }

  reset() {
    this.projectData = { projName: '', projStartDate: '', projEndDate: '', projPriority: '0' };
    this.userData = { userId: '', firstName: '', lastName: '', empId: '', projId: '', taskId: '' };
  }
}

function dateFormatter(date) {
  return `${date.getFullYear()}-${("0" + date.getMonth()).slice(-2)}-${("0"+date.getDate()).slice(-2)}`;
}

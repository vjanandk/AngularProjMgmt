import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';

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
    this.getUsers();
  }

  addProject() {
    if (this.projectData.projStartDate.length == 0) {
      this.projectData.projStartDate = dateFormatter(this.startDate);
      this.projectData.projEndDate = dateFormatter(this.endDate);
    }

    this.rest.addPrjoect(this.projectData).subscribe(() => {
      console.log(`TS - addProject : ${this.projectData}`)
      this.rest.getProject(this.projectData.projName).subscribe((proj) => {
        console.log(`TS - getProject : ${proj}`)
        let userId = 1;  //Need to update this
        this.rest.getUser(userId).subscribe((user) => {
          console.log(`TS - getUser : ${user}`)
          user.projId = proj.projId;
          this.rest.putUser(user).subscribe(() => {
            console.log(`TS - putUser : ${user}`);
            this.projectData = { projName: '', projStartDate: '', projEndDate: '', projPriority: '0' };
            this.userData.firstName = '';
          })
        })
      })
    })
  }

  getUsers() {
    this.users = [];
    this.rest.getUsers().subscribe((data) => {
      console.log("TS - getUsers - data : ", data);
      this.users = data;
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
  return `${date.getFullYear()}-${("0" + date.getMonth()).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
}

import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {

  projects: any = [];
  users: any = [];
  display: boolean = false;
  setDate: boolean = false;
  checkUpd: boolean = false;
  sortSwitch = 0;

  public startDate = new Date(new Date());
  public endDate = new Date(new Date().getTime() + 86400000);

  @Input() projectData = { projName: '', projStartDate: '', projEndDate: '', projPriority: '0' };
  @Input() userData = { userId: '', firstName: '', lastName: '', empId: '', projId: '', taskId: '' };

  constructor(public rest: RestService) { }

  ngOnInit() {
    this.getProjects();
  }

  listUsers() {
    this.getUsers();
    this.display = true;
  }

  addProject() {
    if (this.projectData.projStartDate.length == 0) {
      this.projectData.projStartDate = dateFormatter(this.startDate);
      this.projectData.projEndDate = dateFormatter(this.endDate);
    }

    this.rest.addPrjoect(this.projectData).subscribe(() => {
      console.log("TS - addProject : ", this.projectData)
      this.rest.getProject(this.projectData.projName).subscribe((proj) => {
        console.log("TS - getProject : ", proj)
        // let userId = 1;  //Need to update this
        this.rest.getUser(this.userData.userId).subscribe((user) => {
          console.log("TS - getUser :", user)
          user.projId = proj.projId;
          this.rest.putUser(user).subscribe(() => {
            console.log("TS - putUser :", user);
            this.reset();
            this.getProjects();
          })
        })
      })
    })
  }

  updateProj(project) {
    console.log("TS - updateProj : ", project);
    this.setDate = true;
    this.checkUpd = true;
    this.projectData = project;
    this.getManager(project.projId);
  }

  suspendProj(project) {
    console.log("TS - suspendProj : ", project);
    this.deleteProject(project.projId);
    this.reset();
  }

  getUsers() {
    this.users = [];
    this.rest.getUsers().subscribe((data) => {
      console.log("TS - getUsers - data : ", data);
      this.users = data;
    })
  }

  getManager(projId) {
    this.rest.getManager(projId).subscribe((data) => {
      console.log("TS - getManager - data : ", data);
      this.userData = data;
    })
  }

  getProjects() {
    this.projects = [];
    this.rest.getProjects().subscribe((projs) => {
      console.log("TS - getProjects : ", projs);
      for (let proj of projs) {
        this.rest.getTaskByProjId(proj.projId, 0).subscribe((tasks) => {
          proj["projNoOfTasks"] = tasks.length;
          let tempCount = 0;
          for (let task of tasks) {
            if (task.taskStatus == "Completed") {
              tempCount = tempCount + 1;
            }
          }
          proj["noOfCompleted"] = tempCount;
          console.log("Proj - : ", proj)
        })
        this.projects.push(proj);
      }
    })
  }

  deleteProject(projId) {
    this.rest.deleteProject(projId).subscribe(() => {
      console.log("TS - deleteProject - projId : ", projId);
      this.getProjects();
    })
  }

  passBack(user) {
    console.log("TS - passBack user: ", user);
    this.userData = user;
  }

  sortByKey(array, key) {
    let type = -1;
    if (this.sortSwitch % 2 == 0) {
      console.log("sortSwitch : ", this.sortSwitch);
      type = type * -1;
    }
    this.sortSwitch = this.sortSwitch + 1;
    console.log("before sort key : ", key);
    this.projects = array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? (-1 * type) : (x > y) ? (1 * type) : 0);
    });
    console.log("after sort projects : ", this.projects);
  }

  reset() {
    this.projectData = { projName: '', projStartDate: '', projEndDate: '', projPriority: '0' };
    this.userData = { userId: '', firstName: '', lastName: '', empId: '', projId: '', taskId: '' };
    this.setDate = false;
    this.checkUpd = false;
  }
}

function dateFormatter(date) {
  let fullYear = date.fullYear();
  let getMonth = date.getMonth() + 1;
  let getDate = date.getDate();

  return `${fullYear}-${("0" + getMonth).slice(-2)}-${("0" + getDate).slice(-2)}`;
}

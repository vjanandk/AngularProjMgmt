import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})

export class AddtaskComponent implements OnInit {

  projects: any = [];
  users: any = [];
  ptasks: any = [];
  tasks: any = [];
  listProject: boolean = false;
  listParentTask: boolean = false;
  listUser: boolean = false;
  parentId: any = null;

  @Input() taskData = { parentId: null, projId: null, taskName: '', taskStartDate: '', taskEndDate: '', taskPriority: '0', taskStatus: 'ready' };
  @Input() ptaskData = { taskNameParent: '' };
  @Input() userData = { userId: null, firstName: '', lastName: '', empId: '', projId: null, taskId: null };
  @Input() projectData = { projId: null, projName: '', projStartDate: '', projEndDate: '', projPriority: '0' };

  constructor(public rest: RestService, private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.getParentTasks();
    // this.getUsers();
    // this.getProjects();
  }

  listProjects() {
    this.listProject = true;
    this.getProjects();
  }

  listParentTasks() {
    this.listParentTask = true;
    this.getParentTasks();
  }

  listUsers() {
    this.getUsers();
    this.listUser = true;
  }

  addParentTask() {
    this.rest.addParentTask(this.ptaskData).subscribe(() => {
      console.log("TS - addParentTask : ", this.ptaskData)
      this.cancel();
    })
  }

  addTask() {
    this.taskData.parentId = this.parentId;
    this.taskData.projId = this.projectData.projId;

    this.rest.addTask(this.taskData).subscribe(() => {
      console.log("TS - addTask : ", this.taskData)
      this.rest.getTask(this.taskData.taskName).subscribe((task) => {
        console.log("TS - getTask : ", task)
        // let userId = 1;  //Need to update this
        this.rest.getUser(this.userData.userId).subscribe((user) => {
          console.log("TS - getUser : ", user)
          user.taskId = task.taskId;
          user.projId = task.projId;
          this.rest.putUser(user).subscribe(() => {
            console.log("TS - putUser : ", user);
            this.cancel();
          })
        })

      })
    })
  }

  getProjects() {
    this.projects = [];
    this.rest.getProjects().subscribe((data) => {
      console.log("TS - getProjects : ", data);
      this.projects = data;
    })
  }

  getParentTasks() {
    this.ptasks = [];
    this.rest.getParentTasks().subscribe((data) => {
      console.log("TS - getParentTasks : ", data);
      this.ptasks = data;
    })
  }

  getUsers() {
    this.users = [];
    this.rest.getUsers().subscribe((data) => {
      console.log("TS - getUsers - data : ", data);
      this.users = data;
    })
  }

  passBackProj(project) {
    console.log("TS - passBack project : ", project);
    this.projectData = project;
  }

  passBackPtask(ptask) {
    console.log("TS - passBack ptask : ", ptask);
    this.ptaskData.taskNameParent = ptask.taskNameParent;
    this.parentId = ptask.parentId;
  }

  passBackUser(user) {
    console.log("TS - passBack user : ", user);
    this.userData = user;
  }

  cancel() {
 
    this.taskData = { parentId: null, projId: null, taskName: '', taskStartDate: '', taskEndDate: '', taskPriority: '0', taskStatus: 'ready' };
    this.ptaskData = { taskNameParent: '' };
    this.userData = { userId: null, firstName: '', lastName: '', empId: '', projId: null, taskId: null };
    this.projectData = { projId: null, projName: '', projStartDate: '', projEndDate: '', projPriority: '0' };
    this.parentId = '';
  }

}

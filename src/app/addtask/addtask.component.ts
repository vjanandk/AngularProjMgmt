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

  @Input() taskData = { parentId: 0, projId: 0, taskName: '', taskStartDate: '', taskEndDate: '', taskPriority: '0', taskStatus: '' };
  @Input() ptaskData = { taskNameParent: '' };
  @Input() userData = { firstName: '', lastName: '', empId: '', projId: 0 , taskId: 0 };
  @Input() projectData = { projName: '', projStartDate: '', projEndDate: '', projPriority: '0' };

  constructor(public rest: RestService, private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getUsers();
    this.getParentTasks();
  }

  addParentTask() {
    this.ptaskData.taskNameParent = this.taskData.taskName;
    this.rest.addParentTask(this.ptaskData).subscribe(() => {
      console.log(`TS - addParentTask : ${this.ptaskData}`)
    })
  }

  addTask() {
    this.taskData.parentId = 3;
    this.taskData.projId = 2;

    this.rest.addTask(this.taskData).subscribe(() => {
      console.log(`TS - addTask : ${this.taskData}`)
      this.rest.getTask(this.taskData.taskName).subscribe((task) => {
        console.log(`TS - getTask : ${task}`)
        let userId = 1;  //Need to update this
        this.rest.getUser(userId).subscribe((user) => {
          console.log(`TS - getUser : ${user}`)
          user.taskId = task.taskId;
          this.rest.putUser(user).subscribe(() => {
            console.log(`TS - putUser : ${user}`);
            this.taskData = { parentId: 0, projId: 0, taskName: '', taskStartDate: '', taskEndDate: '', taskPriority: '0', taskStatus: '' };
            this.userData = { firstName: '', lastName: '', empId: '', projId: 0 , taskId: 0 };
            this.ptaskData = { taskNameParent: '' };
          })
        })

      })
    })
  }

  getProjects() {
    this.projects = [];
    this.rest.getProjects().subscribe((data) => {
      console.log(`TS - getProjects :  ${data}`);
      this.projects = data;
    })
  }

  getParentTasks() {
    this.ptasks = [];
    this.rest.getParentTasks().subscribe((data) => {
      console.log(`TS - getParentTasks :  ${data}`);
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

}

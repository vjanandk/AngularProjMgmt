import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';


@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  projects: any = [];
  ptasks: any = [];
  tasks: any = [];
  selectProj: boolean = false;
  viewtasks: any = [];
  viewtask = {};

  listProject: boolean = false;

  taskData = { taskId: 0, parentId: 0, projId: 0, taskName: '', taskStartDate: '', taskEndDate: '', taskPriority: '0', taskStatus: '' };
  ptaskData = { parentId: 0, taskNameParent: '' };
  projectData = { projId: 0, projName: '', projStartDate: '', projEndDate: '', projPriority: '0' };

  constructor(public rest: RestService) { }

  ngOnInit() {
    // this.getProjects();
  }

  listProjects() {
    this.listProject = true;
    this.getProjects();
  }

  passBackProj(project) {
    console.log("TS - passBack project : ", project);
    this.projectData = project;
    this.selectProj = true;
    this.viewTask();
  }

  viewTask() {
    this.rest.getTaskByProjId(this.projectData.projId, 0).subscribe((tasks) => {
      console.log("TS - getTask : ", tasks);
      for (let task of tasks) {
        this.taskData = task;
        if (this.taskData.parentId != 0) {
          console.log("this.taskData.parentId : ", this.taskData.parentId)
          this.rest.getPtaskById(this.taskData.parentId).subscribe((ptask) => {
            console.log("TS - getParentTask : ", ptask);
            this.ptaskData = ptask;
            task["taskNameParent"] = this.ptaskData.taskNameParent;
          })
        }
        this.tasks.push(task);
      }
      console.log("this.tasks  : ", this.tasks)
    })
  }

  getProjects() {
    this.projects = [];
    this.rest.getProjects().subscribe((data) => {
      console.log("TS - getProjects : ", data);
      this.projects = data;
    })
  }
}

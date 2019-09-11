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

  @Input() taskData = { parentId: '', projId: '', taskName: '', taskStartDate: '', taskEndDate: '', taskPriority: '0', taskStatus: '' };

  constructor(public rest: RestService, private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

}

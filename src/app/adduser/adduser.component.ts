import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  users: any = [];
  checkUpd: boolean = false;

  @Input() userData = { firstName: '', lastName: '', empId: '', projId: null, taskId: null };

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  reset() {
    this.userData = { firstName: '', lastName: '', empId: '', projId: null, taskId: null };
    this.checkUpd = false;
    this.getUsers();
  }

  addUser() {
    this.rest.addUser(this.userData).subscribe(() => {
      this.reset();
    })
  }

  getUsers() {
    this.users = [];
    this.rest.getUsers().subscribe((data) => {
      console.log("TS - getUsers - data : ", data);
      this.users = data;
    })
  }

  editUser(user) {
    console.log("TS - editUser - user : ", user);
    this.userData = user;
    this.checkUpd = true;
  }

  deleteUser(empId) {
    this.rest.deleteUser(empId).subscribe(() => {
      console.log("TS - deleteUser - empId : ", empId);
      this.getUsers();
      this.reset();
    })
  }
}

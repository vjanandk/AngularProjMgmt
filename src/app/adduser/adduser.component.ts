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
  sortSwitch = 0;

  @Input() userData = { firstName: '', lastName: '', empId: '', projId: null, taskId: null };

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
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

  sortByKey(array, key) {
    let type = -1;
    if (this.sortSwitch % 2 == 0) {
      console.log("sortSwitch : ", this.sortSwitch);
      type = type * -1;
    }
    this.sortSwitch = this.sortSwitch + 1;
    console.log("before sort key : ", key);
    this.users = array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? (-1 * type) : (x > y) ? (1 * type) : 0);
    });
    console.log("after sort users : ", this.users);
  }

  reset() {
    this.userData = { firstName: '', lastName: '', empId: '', projId: null, taskId: null };
    this.checkUpd = false;
    this.getUsers();
  }

}

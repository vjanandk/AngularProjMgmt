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

  @Input() userData = { firstName: '', lastName: '', empId: '', projId: '0', taskId: '0' };

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log("User Data : ", this.userData)
  }

  reset() {
    this.userData = { firstName: '', lastName: '', empId: '', projId: '', taskId: '' };
  }

  addUser() {
    this.rest.addUser(this.userData).subscribe(() => {
      this.userData = { firstName: '', lastName: '', empId: '', projId: '', taskId: '' };
    })
  }


}

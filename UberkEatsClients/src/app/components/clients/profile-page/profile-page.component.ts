import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Clients } from '../../../model/clients';
import { Roles } from '../../../model/roles';
import { ClientsApiService } from '../../../services/clients-api.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  @Input() modifyUserInfo = { mail: '', password: '', phone: '', name: '', surname: '', affiliateMail: '', role: '' };
  public roles = Roles;
  public userModificationForm: FormGroup; // variable of type FormGroup is created
  userInfo: Clients = {
    id: '',
    phone: localStorage.getItem('phone'),
    name: localStorage.getItem('name'),
    surname: localStorage.getItem('surname'),
    mail: '',
    password: '',
    role: this.roles.client
  };
  public roles = Roles;
  public userModificationForm: FormGroup; // variable of type FormGroup is created

  constructor(public clientsApi: ClientsApiService, public router: Router, private fb: FormBuilder) {
    // Form element defined below

    this.userModificationForm = this.fb.group({
      name: '',
      surname: '',
      phone: '',
      password: '',
      mail: '',
      affiliateMail: '',
      role: ''
    });

  }

  ngOnInit(): void {
  }

  modify(dataclient: any) {
    this.userInfo.name = this.userModificationForm.get('name')?.value;
    this.userInfo.surname = this.userModificationForm.get('surname')?.value;
    this.userInfo.phone = this.userModificationForm.get('phone')?.value;
    this.clientsApi.modify(this.modifyUserInfo)
      .subscribe((data: Clients) => {
        // Send the login request
        this.router.navigate(['/']);
      });
  }
}

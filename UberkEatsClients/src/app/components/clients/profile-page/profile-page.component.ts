import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { AuthToken } from '../../../model/authToken';
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

  constructor(public clientsApi: ClientsApiService, public router: Router, private fb: FormBuilder) {
    // Form element defined below
    this.userModificationForm = this.fb.group({
      name: '',
      surname: '',
      phone: '',
      mail:'',
      password: ''
    });

  }

  ngOnInit(): void {
    var user = JSON.parse('' + localStorage.getItem('User'));
    console.log(user);
    this.userModificationForm.setValue({
      name: user.Name,
      phone: user.Phone,
      surname: user.Surname,
      mail: user.Mail,
      password: ''
    });
  }

  modify(dataclient: any) {
    this.modifyUserInfo.name = this.userModificationForm.get('name')?.value;
    this.modifyUserInfo.surname = this.userModificationForm.get('surname')?.value;
    this.modifyUserInfo.phone = this.userModificationForm.get('phone')?.value;
    this.modifyUserInfo.mail = this.userModificationForm.get('mail')?.value;
    this.modifyUserInfo.password = Md5.hashStr(this.userModificationForm.get('password')?.value);
    this.clientsApi.modify(this.modifyUserInfo)
      .subscribe((data: Clients) => {
        // Send the login request
        this.router.navigate(['/']);
      });
  }
}

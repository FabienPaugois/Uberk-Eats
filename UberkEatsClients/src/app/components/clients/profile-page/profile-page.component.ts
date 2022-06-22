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

}

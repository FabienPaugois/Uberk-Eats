import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsApiService } from '../../services/clients-api.service';
import { Roles } from '../../model/roles';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit {
  @Input() registerInfo = { Mail: '', Password: '', Phone: '', Name: '', Surname: '', Role: '' };
  roles: any[] = Object.values(Roles).filter(role => role.toString().length > 2);

  public registerForm: FormGroup; // variable of type FormGroup is created
  constructor(public clientsApi: ClientsApiService, public router: Router, private fb: FormBuilder) {
    // Form element defined below
    this.registerForm = this.fb.group({
      Name: '',
      Surname: '',
      Phone: '',
      Password: '',
      Mail: '',
      Role: ''
    });
  }

  ngOnInit(): void {
  }

  register(dataclient: any) {
    this.registerInfo.Name = this.registerForm.get('Name')?.value;
    this.registerInfo.Surname = this.registerForm.get('Surname')?.value;
    this.registerInfo.Phone = this.registerForm.get('Phone')?.value;
    this.registerInfo.Password = this.registerForm.get('Password')?.value;
    this.registerInfo.Mail = this.registerForm.get('Mail')?.value;
    this.registerInfo.Role = this.registerForm.get('Role')?.value;
  	this.clientsApi.register(this.registerInfo).subscribe((data: unknown) => {
  		this.router.navigate(['/']);
  	});
  }
}

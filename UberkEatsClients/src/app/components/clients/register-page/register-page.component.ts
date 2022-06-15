import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsApiService } from '../../../services/clients-api.service';
import { Roles } from '../../../model/roles';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit {
  @Input() registerInfo = { mail: '', password: '', phone: '', name: '', surname: '', role: '' };
  roles: any[] = Object.values(Roles).filter(role => role.toString().length > 2);

  public registerForm: FormGroup; // variable of type FormGroup is created
  constructor(public clientsApi: ClientsApiService, public router: Router, private fb: FormBuilder) {
  	// Form element defined below
  	this.registerForm = this.fb.group({
  		name: '',
  		surname: '',
  		phone: '',
  		password: '',
  		mail: '',
  		role: ''
  	});
  }

  ngOnInit(): void {
  }

  register(dataclient: any) {
  	this.registerInfo.name = this.registerForm.get('Name')?.value;
  	this.registerInfo.surname = this.registerForm.get('Surname')?.value;
  	this.registerInfo.phone = this.registerForm.get('Phone')?.value;
  	this.registerInfo.password = this.registerForm.get('Password')?.value;
  	this.registerInfo.mail = this.registerForm.get('Mail')?.value;
  	this.registerInfo.role = this.registerForm.get('Role')?.value;
  	this.clientsApi.register(this.registerInfo).subscribe((data: unknown) => {
  		this.router.navigate(['/']);
  	});
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { Clients } from '../../../model/clients';
import { Roles } from '../../../model/roles';
import { ClientsApiService } from '../../../services/clients-api.service';

@Component({
	selector: 'app-users-management-page',
	templateUrl: './users-management-page.component.html',
	styleUrls: ['./users-management-page.component.scss']
})
export class UsersManagementPageComponent implements OnInit {
  @Input() modifyUserInfo = { mail: '', password: '', phone: '', name: '', surname: '', affiliateMail: '', role: '' };
  public roles = Roles;
  public userModificationForm: FormGroup; // variable of type FormGroup is created
  public allUsers: Clients[] = [];
  public selectedUser: Clients;
  showProfile = false;

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
  	this.userModificationForm.controls.mail.disable();
  	this.getAllUsers();
  }

  modifyUser() {
  	this.modifyUserInfo.name = this.userModificationForm.get('name')?.value;
  	this.modifyUserInfo.surname = this.userModificationForm.get('surname')?.value;
  	this.modifyUserInfo.phone = this.userModificationForm.get('phone')?.value;
  	this.modifyUserInfo.mail = this.userModificationForm.get('mail')?.value;
  	this.clientsApi.modify(this.modifyUserInfo).subscribe((data: Clients) => {
  		if (data !== null) {
  			window.alert('Compte utilisateur modifié avec succès !');
  		}
  	});
  }

  deleteUser() {
  	this.modifyUserInfo.name = this.userModificationForm.get('name')?.value;
  	this.modifyUserInfo.surname = this.userModificationForm.get('surname')?.value;
  	this.modifyUserInfo.phone = this.userModificationForm.get('phone')?.value;
  	this.modifyUserInfo.mail = this.userModificationForm.get('mail')?.value;
  	this.clientsApi.delete(this.modifyUserInfo).subscribe((data: Clients) => {
  		if (data !== null) {
  			window.alert('Compte utilisateur supprimé avec succès !');
  			this.getAllUsers();
  		}
  	});
  }
  suspendUser() {
  	this.clientsApi.suspend({
  		mail: this.userModificationForm.get('mail')?.value,
  		isSuspended:true
  	}).subscribe((data: Clients) => {
  		if (data !== null) {
  			window.alert('Compte utilisateur supprimé avec succès !');
  			this.getAllUsers();
  		}
  	});
  }

  selectUser(user: any) {
  	this.selectedUser = user.value;
  	this.userModificationForm.setValue({
  		name: this.selectedUser.name,
  		phone: this.selectedUser.phone,
  		surname: this.selectedUser.surname,
  		mail: this.selectedUser.mail,
  		password: null
  	});
  	this.showProfile = true;
  }

  getAllUsers() {
  	this.clientsApi.getAllUsers().subscribe((data: any) => {
  		this.allUsers = [];
  		this.showProfile = false;
  		data.forEach((user: any) => {
  			const newUser: Clients = {
  				name: user.Name,
  				surname: user.Surname,
  				phone: user.Phone,
  				password: '',
  				mail: user.Mail,
  				id: user.Id,
  				role: Roles.client
  			};
  			this.allUsers.push(newUser);
  		});
  	});
  }
}

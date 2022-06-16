import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles } from '../../../model/roles';
import { Articles } from '../../..//model/articles';
import { ClientsApiService } from '../../../services/clients-api.service';

@Component({
	selector: 'app-create-article',
	templateUrl: './create-article.component.html',
	styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  @Input() articleInfo: Articles = { id: NaN, name:'', description: '', price: 0, imageUrl:''};
  roles: any[] = Object.values(Roles).filter(role => role.toString().length > 2);

  public registerForm: FormGroup; // variable of type FormGroup is created
  constructor(public clientsApi: ClientsApiService, public router: Router, private fb: FormBuilder) {
  	// Form element defined below
  	this.registerForm = this.fb.group({
  		name: '',
  		description: '',
  		price: '',
  		imageUrl: '',
  	});
  }
  ngOnInit(): void {
  }

  addArticle() {
  	this.articleInfo.name = this.registerForm.get('name')?.value;
  	this.articleInfo.description = this.registerForm.get('description')?.value;
  	this.articleInfo.price = this.registerForm.get('price')?.value;
  	this.articleInfo.imageUrl = this.registerForm.get('imageUrl')?.value;
  	this.clientsApi.register(this.articleInfo).subscribe((data: unknown) => {
  		this.router.navigate(['/']);
  	});
  }

}

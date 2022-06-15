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
  @Input() articleInfo: Articles = { id: NaN, name:'', description: '', price: 0, image_url:''};
  roles: any[] = Object.values(Roles).filter(role => role.toString().length > 2);

  public registerForm: FormGroup; // variable of type FormGroup is created
  constructor(public clientsApi: ClientsApiService, public router: Router, private fb: FormBuilder) {
    // Form element defined below
    this.registerForm = this.fb.group({
      Name: '',
      Description: '',
      Price: '',
      Image_url: '',
    });
  }
  ngOnInit(): void {
  }

  addArticle() {
    this.articleInfo.name = this.registerForm.get('Name')?.value;
    this.articleInfo.description = this.registerForm.get('Description')?.value;
    this.articleInfo.price = this.registerForm.get('Price')?.value;
    this.articleInfo.image_url = this.registerForm.get('Image_url')?.value;
    this.clientsApi.register(this.articleInfo).subscribe((data: unknown) => {
      this.router.navigate(['/']);
    });
  }

}

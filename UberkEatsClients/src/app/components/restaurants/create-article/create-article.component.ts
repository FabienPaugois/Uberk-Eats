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
  @Input() registerInfo: Articles;
  roles: any[] = Object.values(Roles).filter(role => role.toString().length > 2);

  public registerForm: FormGroup; // variable of type FormGroup is created
  constructor(public clientsApi: ClientsApiService, public router: Router, private fb: FormBuilder) {
    // Form element defined below
    this.registerForm = this.fb.group({
      name: '',
      description: '',
      phone: '',
      password: '',
      mail: '',
      role: ''
    });
  }
  ngOnInit(): void {
  }

  addArticle(dataclient: any) {
    this.registerInfo.name = this.registerForm.get('Name')?.value;
    this.registerInfo.description = this.registerForm.get('Description')?.value;
    this.registerInfo.price = this.registerForm.get('Price')?.value;
    this.registerInfo.image_url = this.registerForm.get('Image_URL')?.value;
    this.clientsApi.register(this.registerInfo).subscribe((data: unknown) => {
      this.router.navigate(['/']);
    });
  }

}

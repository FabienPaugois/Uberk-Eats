import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles } from '../../../model/roles';
import { Articles } from '../../..//model/articles';
import { ClientsApiService } from '../../../services/clients-api.service';
import { Menus } from '../../../model/menus';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.scss']
})
export class CreateMenuComponent implements OnInit {
  @Input() menuInfo: Menus = {id: NaN, name:'', description:'', price:0, image_url: '', articles: []};
  public menuForm: FormGroup; // variable of type FormGroup is created

  articles: Articles[] = [
    {
      id: 1,
      name: 'Whooper',
      description: 'Lorem ipsum',
      price: 4,
      image_url: '',
    },
    {
      id: 2,
      name: 'Triple Cheese',
      description: 'Lorem ipsum',
      price: 5,
      image_url: '',
    },
    {
      id: 3,
      name: 'Double Steakhouse',
      description: 'Lorem ipsum',
      price: 4,
      image_url: '',
    },
    {
      id: 4,
      name: 'Chicken Alabama',
      description: 'Lorem ipsum',
      price: 6,
      image_url: '',
    },
    {
      id: 5,
      name: 'Double Cheese Bacon Vegan',
      description: 'Lorem ipsum',
      price: 10,
      image_url: '',
    },
    {
      id: 6,
      name: 'Potatoes',
      description: 'Lorem ipsum',
      price: 2,
      image_url: '',
    },
    {
      id: 7,
      name: 'Fries',
      description: 'Lorem ipsum',
      price: 2,
      image_url: '',
    },
    {
      id: 8,
      name: 'Coke',
      description: 'Lorem ipsum',
      price: 2.5,
      image_url: '',
    },
    {
      id: 9,
      name: 'Pepsi',
      description: 'Lorem ipsum',
      price: 2.5,
      image_url: '',
    },
  ];

  constructor(public clientsApi: ClientsApiService, public router: Router, private fb: FormBuilder) {
    // Form element defined below
    this.menuForm = this.fb.group({
      Name: '', 
      Description: '',
      Price: '',
      Image_url: '',
      Articles: []
    });
  }
  ngOnInit(): void {
  }

  addMenu() {
    this.menuInfo.name = this.menuForm.get('Name')?.value;
    this.menuInfo.description = this.menuForm.get('Description')?.value;
    this.menuInfo.price = this.menuForm.get('Price')?.value;
    this.menuInfo.image_url = this.menuForm.get('Image_url')?.value;
    this.menuInfo.articles = this.menuForm.get('Articles')?.value;
    this.clientsApi.register(this.menuInfo).subscribe((data: unknown) => {
      this.router.navigate(['/']);
    });
  }

}

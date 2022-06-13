import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Articles } from '../../model/articles';
import { Menus } from '../../model/menus';
import { ClientsApiService } from '../../services/clients-api.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  count: number = 1;
  articleId: string;
  menuId: string;
  article: Articles;
  menu: Menus;
  routeSub: Subscription;
  articleSub: Subscription;
  menuSub: Subscription;

  constructor(public clientsApi: ClientsApiService, public router: Router, private ActivatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.routeSub = this.ActivatedRoute.params.subscribe((params: Params) => {
      if (params["articles"] != null) {
        this.menu = {
          id: params['id'],
          description: params['description'],
          name: params['name'],
          price: params['price'],
          articles: params['articles']
        };
      }
      else {
        this.article = {
          id: params['id'],
          description: params['description'],
          name: params['name'],
          price: params['price'],
        };
      };
    });
  }

  updateCount(increment: boolean): void {
    if (this.count == 1 && increment) {
      this.count++;
    } else if (this.count != 1) {
      increment ? this.count++ : this.count--;
    }
  }
}

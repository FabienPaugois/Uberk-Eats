import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Articles } from '../../../model/articles';
import { Menus } from '../../../model/menus';
import { ClientsApiService } from '../../../services/clients-api.service';

@Component({
	selector: 'app-menu-pick-page',
	templateUrl: './menu-pick-page.component.html',
	styleUrls: ['./menu-pick-page.component.scss']
})
export class MenuPickPageComponent implements OnInit {
	@Input() id: string;
	routeSub: Subscription;
	restaurantId: string;
	articles: Articles[];
	articlesIdArr: string;
	menus: Menus[];
	menusIdArr: string;

	constructor(
		public clientsApi: ClientsApiService,
		public router: Router,
		private activatedRoute: ActivatedRoute,
	) { }

	ngOnInit(): void {
		this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
			this.restaurantId = params.restaurantId.split(',');
			this.articlesIdArr = params.articlesArr;
			this.menusIdArr = params.menusArr;
		});
		this.clientsApi.FetchArticleData(this.articlesIdArr).subscribe((articles: Articles[]) => {
			this.articles = articles;
			console.log(this.articles);
		});
		this.clientsApi.FetchMenusData(this.menusIdArr).subscribe((menus: Menus[]) => {
			this.menus = menus;
			console.log(this.menus);
		});
	}

	btnClickMenu(menu: Menus) {
		this.router.navigate(['/product-page', menu]);
	}

	btnClickArticle(article: Articles) {
		this.router.navigate(['/product-page', article]);
	}
}

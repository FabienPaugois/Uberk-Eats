import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Order, OrdersObject } from '../../model/order';
import { ClientsApiService } from '../../services/clients-api.service';
import { OrderStore } from '../../store/restaurantStore/order-store';

@Component({
	selector: 'app-order-history',
	templateUrl: './order-history.component.html',
	styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
	orderHistory: OrdersObject;
  ngUnsubscribe = new Subject();

	constructor(
    private clientApi: ClientsApiService,
    public router: Router,
    private store: OrderStore
  ) { }

  // for cleaning up subscriptions
  OnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

	ngOnInit(): void {
    // subscription to the store
    this.store.state$
      .pipe(
        takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.orderHistory = data;
      });
    this.store.getOrdersFromDb();
    console.log(this.orderHistory)
  }

  btnClickOrder(orderId: number) {
    this.router.navigate(['/order-preview', {orderId}]);
  }
}

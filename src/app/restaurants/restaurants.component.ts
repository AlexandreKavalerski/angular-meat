import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './restaurant/restaurant.model';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  viewProviders: [Title]
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[]

  constructor(title: Title, private restaurantsService: RestaurantsService) {
    title.setTitle('Restaurants')
  }

  ngOnInit() {
    this.restaurantsService.restaurants()
      .subscribe(restaurants => this.restaurants = restaurants)
  }

}

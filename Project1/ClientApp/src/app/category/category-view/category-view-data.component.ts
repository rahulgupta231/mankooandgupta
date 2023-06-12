import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './category-view-data.component.html'
})
export class CategoryViewComponent {
  public categories: Categories[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Categories[]>(baseUrl + 'weatherforecast/categories').subscribe(result => {
      this.categories = result;
      console.log("Rahul Testing");
      console.log(this.categories);
    }, error => console.error(error));
  }
}

interface Categories {
  name: string;
  categoryId: string;
}

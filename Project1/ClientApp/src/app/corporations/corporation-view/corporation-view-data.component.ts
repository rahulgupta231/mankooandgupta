import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './corporation-view-data.component.html'
})
export class CorporationViewComponent {
  public corporations: Corporations[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Corporations[]>(baseUrl + 'weatherforecast/corporations').subscribe(result => {
      this.corporations = result;
      console.log("Rahul Testing");
      console.log(this.corporations);
    }, error => console.error(error));
  }
}

interface Corporations {
  name: string;
  corporationId: string;
}

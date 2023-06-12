import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './client-detail-data.component.html'
})
export class ClientDetailDataComponent {
  public clients!: Clients;
  id!: string;
  baseUrl!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

      this.http.get<Clients>(this.baseUrl + `weatherforecast/clients/${this.id}`)
        .subscribe(result => {
          this.clients = result;
          console.log(this.id)
          console.log(result)
        }, error => console.error(error));
    }
}

interface Clients {
  clientName: string;
  clientId: string;
  corporationType: string;
  categoryName: string;
  yearEnd: string;
  incorporationDate: string;
  incorporationMonth: string;
  companyName: string;
  address: string;
  phoneNumber: string;
  business: string;
  corporationKey: string;
  companyKey: string;
  hstPeriod: string;
  email: string;
  status: string;
  serialNumber: string;
  ontarioOneKeyUser: string;
  ontarioOneKeyPassword: string;
  craUserId: string;
  craPassword: string;
  notes: string;
  additionalNotes: string;

}

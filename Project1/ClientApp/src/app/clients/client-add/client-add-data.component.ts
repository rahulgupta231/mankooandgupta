import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './client-add-data.component.html'
})
export class ClientAddDataComponent {

  studentForm!: FormGroup;
  isEdit: Boolean = false;
  msg: String = '';
  id!: string;
  isAddMode!: boolean;
  baseUrl!: string;
  public categories: Categories[] = [];
  public corporations: Corporations[] = [];
  client!: Clients;

  catDropDown: string[] = [];
  corporationDropDown: string[] = [];
  hstPeriodDrownDown: string[] = [];

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
    this.isAddMode = !this.id;

    this.http.get<Categories[]>(this.baseUrl + 'weatherforecast/categories').subscribe(result => {
      this.categories = result;
      this.catDropDown = result.map(function (el) {
        return el.name
      });
    }, error => console.error(error));

    this.http.get<Corporations[]>(this.baseUrl + 'weatherforecast/corporations').subscribe(result => {
      this.corporations = result;
      this.corporationDropDown = result.map(function (el) {
        return el.name
      });
    }, error => console.error(error));

    this.http.get<string[]>(this.baseUrl + 'weatherforecast/hst-period').subscribe(result => {
      this.hstPeriodDrownDown = result;
      
    }, error => console.error(error));


    this.studentForm = new FormGroup({
      clientName: new FormControl('', [Validators.required]),
      companyName: new FormControl(''),
      corporationKey: new FormControl(''),
      address: new FormControl(''),
      business: new FormControl(''),
      categoryName: new FormControl('default'),
      companyKey: new FormControl(''),
      corporationType: new FormControl('default'),
      email: new FormControl(''),
      hstPeriod: new FormControl('default'),
      incorporationDate: new FormControl(''),
      incorporationMonth: new FormControl(''),
      phoneNumber: new FormControl(''),
      yearEnd: new FormControl(''),
      serialNumber: new FormControl(''),
      ontarioOneKeyUser: new FormControl(''),
      ontarioOneKeyPassword: new FormControl(''),
      craUserId: new FormControl(''),
      craPassword: new FormControl(''),
      notes: new FormControl(''),
      additionalNotes: new FormControl(''),
      status: new FormControl('active')
    }, {})

    if (!this.isAddMode) {
      this.http.get<Clients>(this.baseUrl + `weatherforecast/clients/${this.id}`)
        .subscribe(result => {
          this.client = result;
          this.studentForm.controls['corporationType'].setValue(this.client.corporationType, { onlySelf: true });
          console.log(this.id)
          console.log(result)
          this.studentForm.patchValue(result);
      }, error => console.error(error));
    }
  }

  resetForm(){
    console.log('reset',this.studentForm)
    this.studentForm.reset();
  }


  onSubmit() {
    if (this.isAddMode) {

      this.http.post(this.baseUrl + `weatherforecast/create-clients`, this.studentForm.value)
        .subscribe(result => {
          this.router.navigate(['../client-view'], { relativeTo: this.route });
        }, error => console.error(error));
    } else {
      


      this.http.put(this.baseUrl + `weatherforecast/edit-clients/${this.id}`, this.studentForm.value)
        .subscribe(result => {
          this.router.navigate(['../../client-view'], { relativeTo: this.route });
        }, error => console.error(error));
    }

    
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


interface Categories {
  name: string;
  categoryId: string;
}

interface Corporations {
  name: string;
  corporationId: string;
}

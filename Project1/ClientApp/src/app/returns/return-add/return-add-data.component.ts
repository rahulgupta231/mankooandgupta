import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './return-add-data.component.html'
})
export class ReturnAddDataComponent {

  returnManagementForm!: FormGroup;
  isEdit: Boolean = false;
  msg: String = '';
  id!: string;
  isAddMode!: boolean;
  baseUrl!: string;

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

    this.http.get<string[]>(this.baseUrl + 'weatherforecast/hst-period').subscribe(result => {
      this.hstPeriodDrownDown = result;
      
    }, error => console.error(error));

    if (this.isAddMode) {
      this.id = ""
    }

    this.returnManagementForm = new FormGroup({
      returnManagementName: new FormControl(''),
      hstPeriod: new FormControl('default'),
      returnManagementId: new FormControl(this.id)
    }, {})

    if (!this.isAddMode) {
      this.http.get<returnManagementVM>(this.baseUrl + `weatherforecast/return/${this.id}`)
        .subscribe(result => {
          this.returnManagementForm.patchValue(result);
      }, error => console.error(error));
    }
  }

  resetForm(){
    console.log('reset', this.returnManagementForm)
    this.returnManagementForm.reset();
  }


  onSubmit() {
    if (this.isAddMode) {

      this.http.post(this.baseUrl + `weatherforecast/create-return`, this.returnManagementForm.value)
        .subscribe(result => {
          this.router.navigate(['../return-view'], { relativeTo: this.route });
        }, error => console.error(error));
    } else {
      


      this.http.put(this.baseUrl + `weatherforecast/edit-return/${this.id}`, this.returnManagementForm.value)
        .subscribe(result => {
          this.router.navigate(['../../return-view'], { relativeTo: this.route });
        }, error => console.error(error));
    }

    
  }
}
interface returnManagementVM {
  returnManagementId: string;
  returnManagementName: string;
  hstPeriod: string;
}



import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './category-add-data.component.html'
})
export class CategoryAddDataComponent {

  studentForm!: FormGroup;
  isEdit: Boolean = false;
  msg: String = '';
  id!: string;
  isAddMode!: boolean;
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
    this.isAddMode = !this.id;

    this.studentForm = new FormGroup({
      name: new FormControl('')
    })

    if (!this.isAddMode) {
      this.http.get<Categories>(this.baseUrl + `weatherforecast/categories/${this.id}`)
        .subscribe(result => {
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
    if (this.studentForm.invalid) {
      return;
    }

    if (this.isAddMode) {

      this.http.post(this.baseUrl + `weatherforecast/create-categories`, this.studentForm.value)
        .subscribe(result => {
          this.router.navigate(['../category-view'], { relativeTo: this.route });
        }, error => alert("Category Already Exists !"));
    } else {
      this.http.put(this.baseUrl + `weatherforecast/edit-categories/${this.id}`, this.studentForm.value)
        .subscribe(result => {
          this.router.navigate(['../../category-view'], { relativeTo: this.route });
        }, error => {
          alert("Category Already Exists !")
        });
    }
  }
}

interface Categories {
  name: string;
  categoryId: string;
}

import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './email-form.component.html',
  styleUrls: ['email-form.component.css'],
})
export class EmailFormComponent {
  form!: FormGroup;
  description!: string;
  body: string = "Thanks & Regards, \nMankoo & Gupta CPA Professional Corp.";

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<EmailFormComponent>) { }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []],
      body: [this.body, []],
        });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}


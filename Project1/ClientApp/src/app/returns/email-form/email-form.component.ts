import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './email-form.component.html',
  styleUrls: ['email-form.component.css'],
})
export class EmailFormComponent {
  form!: FormGroup;
  description!: string;
  body: string = "Thanks & Regards, \nMankoo & Gupta CPA Professional Corp.";

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<EmailFormComponent>) { }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []],
      body: [this.body, []],
        });
  }

  save() {
    this.form.value.body = this.body;
    console.log(this.form.value);
    console.log(this.body)
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}


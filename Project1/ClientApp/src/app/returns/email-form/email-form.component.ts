import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './email-form.component.html',
  styleUrls: ['email-form.component.css'],
})
export class EmailFormComponent {
 
  constructor(
    public dialogRef: MatDialogRef<EmailFormComponent>) { }
}


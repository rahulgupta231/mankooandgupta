import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './audit-view-data.component.html',
  styleUrls: ['audit-view-data.component.css'],
})
export class AuditLogsViewComponent {
  public auditLogs: AuditLogs[] = [];
  searchText!: string;
  displayedColumns = ['changedBy', 'action', 'updated', 'previous', 'changedDate'];
  dataSource!: MatTableDataSource<AuditLogs>;
  id!: string;
  baseUrl!: string;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort = new MatSort();

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

    if (!this.id) {
      this.http.get<AuditLogs[]>(this.baseUrl + 'weatherforecast/audit-logs').subscribe(result => {
        this.auditLogs = result;
        this.dataSource = new MatTableDataSource(result);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log("Rahul Testing");
        console.log(this.auditLogs);
      }, error => console.error(error));
    }
    else {
      this.http.get<AuditLogs[]>(this.baseUrl + 'weatherforecast/audit-logs/' + this.id).subscribe(result => {
        this.auditLogs = result;
        this.dataSource = new MatTableDataSource(result);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log("Rahul Testing");
        console.log(this.auditLogs);
      }, error => console.error(error));
    }
    
  }

  ngAfterViewInit() {
   
  }

  applyFilter(filterValue: any) {
    console.log(filterValue)

    let filterValue1 = filterValue.target.value.trim(); // Remove whitespace
    filterValue1 = filterValue.target.value.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue1;
  }
}

interface AuditLogs {
  auditLogId: string;
  changedDate: string;
  previous: string;
  updated: string;
  changedBy: string;
  action: string;
}

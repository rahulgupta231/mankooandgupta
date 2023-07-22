import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialog } from '../../confirmation-dialog/confirmation-dialog.component';
import { ReturnFilterService } from '../../services/return-filter.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './return-view-data.component.html',
  styleUrls: ['return-view-data.component.css'],
})
export class ReturnViewComponent {
  public returnManagementVMList: returnManagementVM[] = [];
  searchText!: string;
  displayedColumns = ['returnManagementName', 'actions'];
  dataSource!: MatTableDataSource<returnManagementVM>;


  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  baseUrl!: string;
  selectedCategoryId: string = "all";
  selectedCorporationId: string = "all";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private dialog: MatDialog,
    private returnFilterService: ReturnFilterService) {
    this.baseUrl = baseUrl;
  }
  ngOnInit() {
    this.getReturns();
    this.returnFilterService.resetFilter();

    
  }
  getReturns() {
    this.http.get<returnManagementVM[]>(this.baseUrl + 'weatherforecast/return').subscribe(result => {
      this.returnManagementVMList = result;
        this.dataSource = new MatTableDataSource(result);
      console.log(this.returnManagementVMList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => console.error(error));
    }

     deleteConfirmed(evt: any) {
    alert("Deleted!");
  }

  openDialog(returnManagementId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      console.log("Rahul calling confirm dialog box")
      console.log(confirmed)
      console.log(returnManagementId)
      if (confirmed) {

        this.http.get<returnManagementVM[]>(this.baseUrl + 'weatherforecast/delete-return/' + returnManagementId).subscribe(result => {
          this.returnManagementVMList = result;
          this.dataSource = new MatTableDataSource(result);
          console.log(this.returnManagementVMList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, error => console.error(error));

        const a = document.createElement('a');
        a.click();
        a.remove();
       
      }
    });
  }

}



interface returnManagementVM {
  returnManagementId: string;
  returnManagementName: string;
  hstPeriod: string;
}


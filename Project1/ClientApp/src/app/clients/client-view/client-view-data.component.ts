import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientFilterService } from '../../services/client-filter.service';
import { EmailFormComponent } from '../../returns/email-form/email-form.component';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: 'app-fetch-data',
  templateUrl: './client-view-data.component.html',
  styleUrls: ['client-view-data.component.css'],
})
export class ClientViewComponent {
  public clients: Clients[] = [];
  searchText!: string;
  displayedColumns = ['select', 'serialNumber', 'clientName', 'categoryName', 'companyName', 'email', 'address', 'phoneNumber', 'business', 'actions'];
  dataSource!: MatTableDataSource<Clients>;
  public categories: Categories[] = [];
  public corporations: Corporations[] = [];
  public incorporationMonths: any[] = [];
  showSpinner = false;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  baseUrl!: string;
  categoryId: any;
  corporationId: any;
  selectedClientStatus: any;
  selectedIncorporationMonth: any;
  inputFilter: any;

  selection = new SelectionModel<Clients>(true, []);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private clientFilterService: ClientFilterService,
    private dialog: MatDialog
  ) {
    this.baseUrl = baseUrl;
  }
  ngOnInit() {
    this.getClients()
    this.categoryId = this.clientFilterService.getSelectedCategoryId();
    this.corporationId = this.clientFilterService.getSelectedCorporationId();
    this.selectedClientStatus = this.clientFilterService.getSelectedClientStatus();
    this.selectedIncorporationMonth = this.clientFilterService.getSelectedIncorporationMonth();
    this.inputFilter = this.clientFilterService.getSelectedInputFilterh(); 

    
    this.http.get<Categories[]>(this.baseUrl + 'weatherforecast/categories').subscribe(result => {
      this.categories = result;
    }, error => console.error(error));

    this.http.get<Corporations[]>(this.baseUrl + 'weatherforecast/corporations').subscribe(result => {
      this.corporations = result;
    }, error => console.error(error));

    this.http.get<Corporations[]>(this.baseUrl + 'weatherforecast/incorporation-month').subscribe(result => {
      this.incorporationMonths = result;
    }, error => console.error(error));
  }
    getClients() {
      this.http.get<Clients[]>(this.baseUrl + 'weatherforecast/clients').subscribe(result => {
        this.clients = result;
        this.dataSource = new MatTableDataSource(result);

        console.log(this.clients);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log("called")
       
        console.log(this.dataSource)

        this.filter();

        

      }, error => console.error(error));
  }

  sendEmail() {
    this.showSpinner = true;

    const dialogRef = this.dialog.open(EmailFormComponent,
      {
        width: "50%",
        height: "50%",

      },


    );

    var emails = this.selection.selected.map(function (el) {
      return el.email
    });
    //var emails = this.clients.map(function (el) {
    //  return el.email
    //});

    dialogRef.afterClosed().subscribe(data => {

      let payload = {
        subject: data.description,
        body: data.body,
        emails: emails
      }

      this.http.post(this.baseUrl + `weatherforecast/send-email`, payload)
        .subscribe(result => {
          this.showSpinner = false;
        }, error => { this.showSpinner = false; });
    });
  }

  resetFilter() {
    this.clientFilterService.resetFilter();
    this.categoryId = this.clientFilterService.getSelectedCategoryId();
    this.corporationId = this.clientFilterService.getSelectedCorporationId();
    this.selectedClientStatus = this.clientFilterService.getSelectedClientStatus();
    this.selectedIncorporationMonth = this.clientFilterService.getSelectedIncorporationMonth(); 
    this.filter();
  }

  deleteClient(clientId: any) {
    console.log(clientId);

    if (confirm("Are you sure to delete")) {
      this.http.get<Clients[]>(this.baseUrl + 'weatherforecast/delete-client/' + clientId).subscribe(result => {
        this.getClients();
      }, error => console.error(error));
    }
    
  }

  ngAfterViewInit() {
   
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    // if there is a selection then clear that selection
    if (this.isSomeSelected()) {
      this.selection.clear();
    } else {
      this.isAllSelected()
        ? this.selection.clear()
        : this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  isSomeSelected() {
    return this.selection.selected.length > 0;
  }

  generateExcel() {
    this.http.get<boolean>(this.baseUrl + 'weatherforecast/generate-excel-client').subscribe(result => {
      alert('Excel Exported to folder !')
      console.log(result)
    }, error => console.error(error));
  }

  applyFilter(filterValue: any) {
    let filterValue1 = filterValue.target.value.trim(); // Remove whitespace
    filterValue1 = filterValue.target.value.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue1;
    this.clientFilterService.setSelectedInputFilterh(filterValue1);
  }

  filterCategoryChange(event: any) {
    this.clientFilterService.setSelectedCategoryId(event.target.value);
    this.filter();
    
  }
  filter() {
    this.http.get<Clients[]>(this.baseUrl + 'weatherforecast/clients-by-category?categoryId=' + this.clientFilterService.getSelectedCategoryId() + '&corporationId=' + this.clientFilterService.getSelectedCorporationId() + '&incorporationMonth=' + this.clientFilterService.getSelectedIncorporationMonth() + '&clientStatus=' + this.clientFilterService.getSelectedClientStatus()).subscribe(result => {
        this.clients = result;
        this.dataSource = new MatTableDataSource(result);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log("Rahul Testing");
      console.log(this.clients);
      this.dataSource.filter = this.clientFilterService.getSelectedInputFilterh();
      }, error => console.error(error));
    }

  filterCorporationChange(event: any) {
    this.clientFilterService.setSelectedCorporateId(event.target.value);
    this.filter();
  }

  filterInCorporationMonthChange(event: any) {
    this.clientFilterService.setSelectedIncorporationMonth(event.target.value);
    this.filter();
  }

  filterClientStatus(event: any) {
    console.log(event.target.value)

    this.clientFilterService.setSelectedClientStatus(event.target.value);
    this.filter();

    //if (event.target.value == "all") {
    //  this.dataSource = new MatTableDataSource(this.clients);
    //  this.dataSource.paginator = this.paginator;
    //  this.dataSource.sort = this.sort;
    //}
    //else if (event.target.value == "true") {
    //  let newClient = this.clients.filter(function (el) {
    //    return el.status == "active";
    //  })

    //  this.dataSource = new MatTableDataSource(newClient);
    //  this.dataSource.paginator = this.paginator;
    //  this.dataSource.sort = this.sort;
    //}
    //else {
    //  let newClient = this.clients.filter(function (el) {
    //    return el.status == "inactive";
    //  })

    //  this.dataSource = new MatTableDataSource(newClient);
    //  this.dataSource.paginator = this.paginator;
    //  this.dataSource.sort = this.sort;
    //}
    

    

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

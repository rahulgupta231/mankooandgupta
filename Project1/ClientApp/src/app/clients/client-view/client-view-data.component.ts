import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientFilterService } from '../../services/client-filter.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './client-view-data.component.html',
  styleUrls: ['client-view-data.component.css'],
})
export class ClientViewComponent {
  public clients: Clients[] = [];
  searchText!: string;
  displayedColumns = ['serialNumber', 'clientName', 'categoryName', 'companyName', 'email', 'address', 'phoneNumber', 'business', 'actions'];
  dataSource!: MatTableDataSource<Clients>;
  public categories: Categories[] = [];
  public corporations: Corporations[] = [];
  public incorporationMonths: any[] = [];


  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  baseUrl!: string;
  categoryId: any;
  corporationId: any;
  selectedClientStatus: any;
  selectedIncorporationMonth: any;
  inputFilter: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private clientFilterService: ClientFilterService
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

  resetFilter() {
    this.clientFilterService.resetFilter();
    this.categoryId = this.clientFilterService.getSelectedCategoryId();
    this.corporationId = this.clientFilterService.getSelectedCorporationId();
    this.selectedClientStatus = this.clientFilterService.getSelectedClientStatus();
    this.selectedIncorporationMonth = this.clientFilterService.getSelectedIncorporationMonth(); 
    this.filter();
  }

  ngAfterViewInit() {
   
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

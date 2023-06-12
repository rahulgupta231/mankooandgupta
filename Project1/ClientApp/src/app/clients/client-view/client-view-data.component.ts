import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';

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


  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  baseUrl!: string;
  selectedCategoryId: string = "all";
  selectedCorporationId: string = "all";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }
  ngOnInit() {
    this.getClients()

   

    this.http.get<Categories[]>(this.baseUrl + 'weatherforecast/categories').subscribe(result => {
      this.categories = result;
    }, error => console.error(error));

    this.http.get<Corporations[]>(this.baseUrl + 'weatherforecast/corporations').subscribe(result => {
      this.corporations = result;
    }, error => console.error(error));
  }
    getClients() {
      this.http.get<Clients[]>(this.baseUrl + 'weatherforecast/clients').subscribe(result => {
        this.clients = result;
        this.dataSource = new MatTableDataSource(result);
        console.log(this.clients);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => console.error(error));
    }

  ngAfterViewInit() {
   
  }

  applyFilter(filterValue: any) {
    console.log(filterValue)

    let filterValue1 = filterValue.target.value.trim(); // Remove whitespace
    filterValue1 = filterValue.target.value.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue1;
  }

  filterCategoryChange(event: any) {
    this.selectedCategoryId = event.target.value;
    this.filter();
    
  }
    filter() {
      this.http.get<Clients[]>(this.baseUrl + 'weatherforecast/clients-by-category?categoryId=' + this.selectedCategoryId + '&corporationId=' + this.selectedCorporationId).subscribe(result => {
        this.clients = result;
        this.dataSource = new MatTableDataSource(result);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log("Rahul Testing");
        console.log(this.clients);
      }, error => console.error(error));
    }

  filterCorporationChange(event: any) {
    this.selectedCorporationId = event.target.value;
    this.filter();
  }

  filterClientStatus(event: any) {
    console.log(event.target.value)

    if (event.target.value == "all") {
      this.dataSource = new MatTableDataSource(this.clients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    else if (event.target.value == "true") {
      let newClient = this.clients.filter(function (el) {
        return el.status == "active";
      })

      this.dataSource = new MatTableDataSource(newClient);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    else {
      let newClient = this.clients.filter(function (el) {
        return el.status == "inactive";
      })

      this.dataSource = new MatTableDataSource(newClient);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

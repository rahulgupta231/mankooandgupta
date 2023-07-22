import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from "@angular/cdk/collections";
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { EmailFormComponent } from '../email-form/email-form.component';
import { ReturnFilterService } from '../../services/return-filter.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './return-detail-data.component.html',
  styleUrls: ['return-view-data.component.css']
})
export class ReturnDetailDataComponent {
  public returnManagement!: ReturnManagement;
  id!: string;
  baseUrl!: string;
  public categories: Categories[] = [];
  hstPeriodDrownDown: string[] = [];

  dataSource: MatTableDataSource<ClientReturns> = new MatTableDataSource<ClientReturns>();

  displayedColumns = ['select','serialNumber', 'clientName', 'categoryName', 'companyName', 'email', 'address', 'phoneNumber', 'business', 'filed', 'actions'];


  selectedCategoryId: any;
  selectedHstPeriod: any;
  selectedFiledStatus: any;

  selection = new SelectionModel<ClientReturns>(true, []);
  inputFilter: any;



  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private returnFilterService: ReturnFilterService
  ) {
    this.baseUrl = baseUrl;
    
   
  }

  ngOnInit() {

    this.selectedCategoryId = this.returnFilterService.getSelectedCategoryId();
    this.selectedHstPeriod = this.returnFilterService.getSelectedHstPeriod();
    this.selectedFiledStatus = this.returnFilterService.getSelectedFiledStatus();
    this.inputFilter = this.returnFilterService.getSelectedInputFilterh();

    this.id = this.route.snapshot.params['id'];
    this.http.get<Categories[]>(this.baseUrl + 'weatherforecast/categories').subscribe(result => {
      this.categories = result;
    }, error => console.error(error));
    this.getReleaseManagement();

    this.http.get<string[]>(this.baseUrl + 'weatherforecast/hst-period').subscribe(result => {
      this.hstPeriodDrownDown = result;

    }, error => console.error(error));
    
  }
  getReleaseManagement() {

    this.filter();
      //this.http.get<ReturnManagement>(this.baseUrl + `weatherforecast/return-detail/${this.id}`)
      //  .subscribe(result => {
      //    this.returnManagement = result;

          


      //    this.returnManagement.clientReturns = this.returnManagement.clientReturns.filter(function (el) {
      //      return el.filed == "false"
      //    })

      //    this.dataSource = new MatTableDataSource(this.returnManagement.clientReturns);
      //    console.log(this.id)
      //    console.log(result)
      //    this.filter();
      //  }, error => console.error(error));
    }

  onFiledChange(clientId: string, event: any) {
    this.http.get<ReturnManagement>(this.baseUrl + `weatherforecast/return-detail-filed-edit/${this.id}/client/${clientId}/filed/${event.target.value}`)
      .subscribe(result => {
        //this.getReleaseManagement();
        this.filter();
        
      }, error => console.error(error));
  }

  filterFiledStatus(event: any) {
    this.selectedFiledStatus = event.target.value;
    this.returnFilterService.setSelectedFiledStatus(this.selectedFiledStatus);

    this.filter();


    //if (event.target.value == "all") {
    //  this.http.get<ReturnManagement>(this.baseUrl + `weatherforecast/return-detail/${this.id}`)
    //    .subscribe(result => {
    //      this.returnManagement = result;
    //    }, error => console.error(error));
    //}
    //else if (event.target.value == "false") {
    //  this.getReleaseManagement();
    //}
    //else {
    //  this.http.get<ReturnManagement>(this.baseUrl + `weatherforecast/return-detail/${this.id}`)
    //    .subscribe(result => {
    //      this.returnManagement = result;

    //      this.returnManagement.clientReturns = this.returnManagement.clientReturns.filter(function (el) {
    //        return el.filed == "true"
    //      })

    //      console.log(this.id)
    //      console.log(result)
    //    }, error => console.error(error));

    //}

  }

  filterCategoryChange(event: any) {
    this.selectedCategoryId = event.target.value;
    this.returnFilterService.setSelectedCategoryId(this.selectedCategoryId);

    this.filter();
    console.log(this.selectedCategoryId)
  }

  filterHstPeriod(event: any) {
    this.selectedHstPeriod = event.target.value;
    this.returnFilterService.setSelectedHstPeriod(this.selectedHstPeriod);

    this.filter();
    console.log(this.selectedHstPeriod)
  }

  filter() {
    this.http.get<ReturnManagement>(this.baseUrl + 'weatherforecast/return-fitler/' + this.id + '?categoryName=' + this.returnFilterService.getSelectedCategoryId() + '&hstPeriod=' + this.returnFilterService.getSelectedHstPeriod() + '&filedStatus=' + this.returnFilterService.getSelectedFiledStatus()).subscribe(result => {
      this.returnManagement = result;

      
      console.log(this.selectedFiledStatus)

      if (this.selectedFiledStatus == "false") {
        this.returnManagement.clientReturns = this.returnManagement.clientReturns.filter(function (el) {
          return el.filed == "false"
        })
      }
      else if (this.selectedFiledStatus == "true") {
        this.returnManagement.clientReturns = this.returnManagement.clientReturns.filter(function (el) {
          return el.filed == "true"
        })
      }
      else if (this.selectedFiledStatus == "rtf") {
        this.returnManagement.clientReturns = this.returnManagement.clientReturns.filter(function (el) {
          return el.filed == "rtf"
        })
      }
      else if (this.selectedFiledStatus == "drop") {
        this.returnManagement.clientReturns = this.returnManagement.clientReturns.filter(function (el) {
          return el.filed == "drop"
        })
      }


      this.dataSource = new MatTableDataSource(this.returnManagement.clientReturns);
      this.dataSource.filterPredicate = (data: ClientReturns, filter: string) => {
        return data.client.clientName.trim().toLowerCase().includes(filter);
      }

      this.dataSource.filter = this.returnFilterService.getSelectedInputFilterh();
      console.log(this.returnManagement)
    }, error => console.error(error));
  }

  generateExcel() {
    this.http.get<ReturnManagement>(this.baseUrl + 'weatherforecast/generate-excel/' + this.id).subscribe(result => {
      console.log(result)
    }, error => console.error(error));
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

  sendEmail() {

    const dialogRef = this.dialog.open(EmailFormComponent,
      {
      width: "50%",
      height: "50%",

      },


    );

    dialogRef.afterClosed().subscribe(data => {

      var emails = this.selection.selected.map(function (el) {
        return el.client.email
      });

      console.log(this.selection.selected.map(function (el) {
        return el.client.email
      }))
      console.log("Dialog output:", data)

      let payload = {
        subject: data.description,
        body: data.body,
        emails: emails
      }

      this.http.post(this.baseUrl + `weatherforecast/send-email`, payload)
        .subscribe(result => {
          
        }, error => { });
    });    
  }

  applyFilter(filterValue: any) {
    let filterValue1 = filterValue.target.value.trim(); // Remove whitespace
    filterValue1 = filterValue.target.value.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue1;
    this.returnFilterService.setSelectedInputFilterh(filterValue1)
    console.log(this.dataSource)

  }

  resetFilter() {
    this.returnFilterService.resetFilter();
    this.filter();

    this.selectedCategoryId = this.returnFilterService.getSelectedCategoryId();
    this.selectedHstPeriod = this.returnFilterService.getSelectedHstPeriod();
    this.selectedFiledStatus = this.returnFilterService.getSelectedFiledStatus();
    this.inputFilter = this.returnFilterService.getSelectedInputFilterh();
  }
}

interface ReturnManagement {
  returnManagementId: string;
  returnManagementName: string;
  hstPeriod: string[];
  clientReturns: ClientReturns[]
}

interface ClientReturns {
  client: Clients;
  filed: string;
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

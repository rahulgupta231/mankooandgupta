import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CategoryAddDataComponent } from "./category/category-add/category-add-data.component";
import { CategoryViewComponent } from "./category/category-view/category-view-data.component";
import { CorporationViewComponent } from './corporations/corporation-view/corporation-view-data.component';
import { CorporationAddDataComponent } from './corporations/corporation-add/corporation-add-data.component';
import { ClientAddDataComponent } from './clients/client-add/client-add-data.component';
import { ClientViewComponent } from './clients/client-view/client-view-data.component';
import { ClientDetailDataComponent } from './clients/client-detail/client-detail-data.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { AuditLogsViewComponent } from './audits/audit-view/audit-view-data.component';
import { ReturnViewComponent } from './returns/return-view/return-view-data.component';
import { ReturnAddDataComponent } from './returns/return-add/return-add-data.component';
import { ReturnDetailDataComponent } from './returns/return-detail/return-detail-data.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EmailFormComponent } from './returns/email-form/email-form.component';
import { ConfirmationDialog } from './confirmation-dialog/confirmation-dialog.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

const modules = [
  MatFormFieldModule,
  MatButtonModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule,
  MatInputModule,
  MatCheckboxModule,
  MatDialogModule,
  MatSnackBarModule,
  AngularEditorModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    CategoryAddDataComponent,
    CategoryViewComponent,
    CorporationViewComponent,
    CorporationAddDataComponent,
    ClientAddDataComponent,
    ClientViewComponent,
    ClientDetailDataComponent,
    AuditLogsViewComponent,
    ReturnViewComponent,
    ReturnAddDataComponent,
    ReturnDetailDataComponent,
    EmailFormComponent,
    ConfirmationDialog
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot([
      { path: '', component: ReturnViewComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'category-view', component: CategoryViewComponent },
      { path: 'category-add', component: CategoryAddDataComponent },
      { path: 'category-edit/:id', component: CategoryAddDataComponent },
      { path: 'corporation-view', component: CorporationViewComponent },
      { path: 'corporation-add', component: CorporationAddDataComponent },
      { path: 'corporation-edit/:id', component: CorporationAddDataComponent },
      { path: 'client-view', component: ClientViewComponent },
      { path: 'client-add', component: ClientAddDataComponent },
      { path: 'client-edit/:id', component: ClientAddDataComponent },
      { path: 'client-detail/:id', component: ClientDetailDataComponent },
      { path: 'audit-view', component: AuditLogsViewComponent },
      { path: 'audit-view/:id', component: AuditLogsViewComponent },
      { path: 'return-view', component: ReturnViewComponent },
      { path: 'return-add', component: ReturnAddDataComponent },
      { path: 'return-edit/:id', component: ReturnAddDataComponent },
      { path: 'return-detail/:id', component: ReturnDetailDataComponent },
    ]),
    ReactiveFormsModule,
    modules,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [...modules]
})
export class AppModule { }

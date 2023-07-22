import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientFilterService {

  selectedCategoryId: string = "all";
  selectedCorporationId: string = "all";
  selectedClientStatus: string = "all";
  selectedIncorporationMonth: string = "all";
  selectedInputFilter: string = '';

  constructor() { }

  setSelectedCategoryId(categoryId: string) {
    this.selectedCategoryId = categoryId;
  }

  setSelectedCorporateId(corporationId: string) {
    this.selectedCorporationId = corporationId;
  }

  setSelectedClientStatus(clientStatus: string) {
    this.selectedClientStatus = clientStatus;
  }

  setSelectedIncorporationMonth(incorporationMonth: string) {
    this.selectedIncorporationMonth = incorporationMonth;
  }

  setSelectedInputFilterh(inputFilter: string) {
    this.selectedInputFilter = inputFilter;
  }

  getSelectedInputFilterh() {
    return this.selectedInputFilter;
  }

  getSelectedCategoryId() {
    return this.selectedCategoryId;
  }

  getSelectedCorporationId() {
    return this.selectedCorporationId;
  }


  getSelectedClientStatus() {
    return this.selectedClientStatus;
  }

  getSelectedIncorporationMonth() {
    return this.selectedIncorporationMonth;
  }

  resetFilter() {
    this.selectedCategoryId = "all";
    this.selectedCorporationId = "all";
    this.selectedIncorporationMonth = "all";
    this.selectedClientStatus = "all";
  }
}

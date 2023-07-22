import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReturnFilterService {
  selectedCategoryId: any = "all";
  selectedHstPeriod: string = "all";
  selectedFiledStatus: string = "false";
  selectedInputFilter: string = '';

  constructor() { }

  setSelectedCategoryId(categoryId: string) {
    this.selectedCategoryId = categoryId;
  }

  setSelectedHstPeriod(hstPeriod: string) {
    this.selectedHstPeriod = hstPeriod;
  }

  setSelectedFiledStatus(filedStatus: string) {
    this.selectedFiledStatus = filedStatus;
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

  getSelectedHstPeriod() {
    return this.selectedHstPeriod;
  }


  getSelectedFiledStatus() {
    return this.selectedFiledStatus;
  }

  resetFilter() {
    this.selectedCategoryId = "all";
    this.selectedHstPeriod = "all";
    this.selectedFiledStatus = "false";
    this.selectedInputFilter = '';
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // saveVendor(body: any) {
  //   return this.http.post<any>(this.baseUrl + '/vendor', body);
  // }


  submitVendor(body: any) {
    return this.http.post<any>(this.baseUrl + '/vendorSubmit', body);
  }
  UpdateVendor(id, body: any) {
    return this.http.put<any>(this.baseUrl + '/vendorSubmit/' + id, body);
  }
  GetVendorValues() {
    return this.http.get<any>(this.baseUrl + '/vendorSubmit');
  }

  deleteVendor(id) {
    return this.http.delete<any>(this.baseUrl + '/vendorSubmit/' + id);
  }





  public exportAsExcelFile(json: any[], excelFileName: string): void {
    console.log(json);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data1': worksheet }, SheetNames: ['data1'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}

import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../service/trainings.service';
import { ReportService } from '../../service/report.service';
import { DataDictionaryReport } from '../../models/DataDictionaryReport';
import { BasicInformationDictionary } from '../../models/BasicInformationDictionary';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-vmmc-list',
  templateUrl: './vmmc-list.component.html',
  styleUrl: './vmmc-list.component.css'
})
export class VmmcListComponent implements OnInit {

  trainingTypes = ['Shangring', 'TOT', 'Emergency', 'Basic Training', 'GF Conversion', 'DS Conversion'];
  reportTable = [];
  dataDictionary!: DataDictionaryReport;
  searchValue = '';
  displayReportTable = []; // New display array


  constructor(private trainingService: TrainingsService, private reportService: ReportService) { }

  ngOnInit(): void {
    this.getVmmcReport();
  }

  filterReportTable(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchValue = target.value.toLowerCase();

    // Update displayReportTable based on searchValue
    if (this.searchValue.trim()) {
      this.reportTable = this.reportTable.filter((row: BasicInformationDictionary) => {
        const rowString = JSON.stringify(row).toLowerCase();
        return rowString.includes(this.searchValue);
      });
    } else {
      // If search box is cleared, display the original list
      this.reportTable = [...this.displayReportTable]; // Spread operator to create a shallow copy
    }
  }

  typeExists(type: string): boolean {
    return this.reportTable.some(row => row[type]);
  }
  getVmmcReport(): void {
    this.trainingService.getDataDictionary().subscribe(
      (data: DataDictionaryReport) => {
        this.dataDictionary = data;

        this.reportTable = this.reportService.transformData(this.dataDictionary, this.trainingTypes);

        //creating a copy
        this.displayReportTable = this.reportTable;
      }
    );
  }

  exportToExcel(): void {
    // Flatten the data structure
    const flattenedData = this.reportTable.map((row: any) => {
      const flatRow: any = { ...row };
      this.trainingTypes.forEach(type => {
        if (row[type]) {
          flatRow[`${type}_start_date`] = row[type]['start_date'];
          flatRow[`${type}_end_date`] = row[type]['end_date'];
          flatRow[`${type}_number_of_days`] = row[type]['number_of_days'];
          flatRow[`${type}_certified_date`] = row[type]['certified_date'];
          flatRow[`${type}_method_name`] = row[type]['method_name'];
          flatRow[`${type}_facilitator_name`] = row[type]['facilitator_name'];
          flatRow[`${type}_funderName`] = row[type]['funderName'];
        } else {
          flatRow[`${type}_start_date`] = '';
          flatRow[`${type}_end_date`] = '';
          flatRow[`${type}_number_of_days`] = '';
          flatRow[`${type}_certified_date`] = '';
          flatRow[`${type}_method_name`] = '';
          flatRow[`${type}_facilitator_name`] = '';
          flatRow[`${type}_funderName`] = '';
        }
      });
      return flatRow;
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(flattenedData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'vmmc_data.xlsx');
  }

}

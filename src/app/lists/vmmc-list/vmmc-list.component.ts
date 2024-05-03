import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../service/trainings.service';
import { DataDictionaryReport } from '../../models/DataDictionaryReport';
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

  constructor(private trainingService: TrainingsService) { }

  ngOnInit(): void {
    this.getVmmcReport();
  }

  transformData(data: DataDictionaryReport): any {
    const tableData = [];

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const entry = data[key];
        const basicInfo = entry['Basic Information']; // Retrieve Basic Information object
        const trainingTypes = basicInfo['Training Type'] || {}; // Retrieve Training Type object (if exists)

        const row: any = {
          id: basicInfo.basic_information_id,
          name: basicInfo.name,
          surname: basicInfo.surname,
          sex: basicInfo.sex,
          phone_number: basicInfo.phone_number,
          title: basicInfo.title,
          designation: basicInfo.designation,
          facility: basicInfo.facility,
          district: basicInfo.district,
          province: basicInfo.province
        };

        // Iterate over each training type
        Object.keys(trainingTypes).forEach((type) => {
          const training = trainingTypes[type];
          row[type] = {
            end_date: training.end_date,
            certified_date: training.certified_date,
            funderName: training.funderName,
            number_of_days: training.number_of_days,
            method_name: training.method_name.join(','),
            start_date: training.start_date,
            facilitator_name: training.facilitator_name.join(',')
          };
        });
        tableData.push(row);
      }
    }

    return tableData;
  }

  typeExists(type: string): boolean {
    return this.reportTable.some(row => row[type]);
  }
  getVmmcReport(): void {
    this.trainingService.getDataDictionary().subscribe(
      (data: DataDictionaryReport) => {
        this.dataDictionary = data;

        this.reportTable = this.transformData(this.dataDictionary);
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

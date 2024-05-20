import { Injectable } from '@angular/core';
import { DataDictionaryReport } from '../models/DataDictionaryReport';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }

  transformData(data: DataDictionaryReport, trainingTypes: string[]): any {
    const tableData = [];

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const entry = data[key];
        const basicInfo = entry['Basic Information'];
        const trainingTypesData = basicInfo['Training Type'] || {};

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

        trainingTypes.forEach(type => {
          if (trainingTypesData[type]) {
            const training = trainingTypesData[type];
            row[type] = {
              end_date: training.end_date,
              certified_date: training.certified_date,
              funderName: training.funderName,
              number_of_days: training.number_of_days,
              method_name: training.method_name.join(','),
              start_date: training.start_date,
              facilitator_name: training.facilitator_name.join(',')
            };
          } else {
            row[type] = {
              end_date: '',
              certified_date: '',
              funderName: '',
              number_of_days: '',
              method_name: '',
              start_date: '',
              facilitator_name: ''
            };
          }
        });
        tableData.push(row);
      }
    }

    return tableData;
  }
}

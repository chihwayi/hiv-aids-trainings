import { VmmcReportTrainingType } from "./VmmcReportTrainingType";

export interface VmmcReportBasicInformation {
    basic_information_id: string;
    province: string;
    surname: string;
    sex: string;
    district: string;
    name: string;
    phone_number: string;
    designation: string;
    title: string;
    facility: string;
    'Training Type': { [key: string]: VmmcReportTrainingType };
}
import { VmmcReportBasicInformation } from "./VmmcReportBasicInformation";

export interface VmmcReport{
    //basic_information_id: string;
    'Basic Information': { [key: string]: VmmcReportBasicInformation }
}
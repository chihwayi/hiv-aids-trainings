import { BasicInformationDictionary } from "./BasicInformationDictionary";

export interface DataDictionaryReport {
    [key: string]: {
        'Basic Information': BasicInformationDictionary;
    };
}
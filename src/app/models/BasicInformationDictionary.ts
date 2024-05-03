import { TrainingTypeDictionary } from "./TrainingTypeDictionary";

export interface BasicInformationDictionary {
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

    'Training Type': {  // Adjusted key name with space
        [type: string]: TrainingTypeDictionary;
      };
}
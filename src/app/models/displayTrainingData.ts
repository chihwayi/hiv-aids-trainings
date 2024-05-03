export interface DisplayTrainingData {
    basic_information_id: string;
    name: string;
    surname: string;
    sex: string;
    program_area_training_data: {
        [key: string]: {
            facilitator_id: string[];
            number_of_days: number;
            start_date: Date;
            end_date: Date;
            certified_date: Date;
        } | null;
    };
    training_id: string;
    program_id: string;
    funder_id: string;
    type_id: string;
    method_id: string[];
    comments: string;
    remarks: string;
    current_status_id: string;
    facility: string;
    district: string;
    province: string;
}
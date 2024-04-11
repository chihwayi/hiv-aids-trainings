export class Demographic {
    basic_information_id: string = '';
    name: string = '';
    surname: string = '';
    sex: string = '';
    phone_number: string = '';
    designation: string = '';
    title: string = '';
    facility: string = '';
    district: string = '';
    province: string = '';
    group!: 'Facilitator' | 'Trainee'; 
}
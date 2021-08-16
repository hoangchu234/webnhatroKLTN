import { City } from '../model/City';

export class Province {
    id: string;
    name: string;
    cityid: string;
    city: City;
}

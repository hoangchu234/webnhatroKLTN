import { Province } from '../model/Province';

export class Street {
    id: string;
    name: string;
    provinceId: string;
    province: Province;
}
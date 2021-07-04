import { Province } from './Province';

export class District {
    id: string;
    name: string;
    provinceId: string;
    province: Province;
}

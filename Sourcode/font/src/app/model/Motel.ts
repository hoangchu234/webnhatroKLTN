import { Detail } from '../model/Detail';
import { LiveType } from '../model/LiveType';
import { User } from '../model/User';
import { City } from '../model/City';
import { Image } from '../model/Image';
import { Province } from '../model/Province';
import { Bill } from '../model/Bill';
import { District } from './District';
import { Street } from './Street';

export class Motel {
    id: Int32Array;
    title: string;
    price: Float32Array;
    priceType:string;
    dateUpdate:Date;
    dateDue:Date;
    status:string;
    verify:boolean;
    address:string;
    addressNumber:string;
    description:string;
    phone:string;
    time:string;
    typemotel:string;
    areaZone:string;
    areaZoneType:string;
    cityId: string;
    city: City;
    district:District;
    districtId:string;
    street:Street;
    streetId:string;
    liveTypeId: string;
    liveType: LiveType;
    userId: Number;
    user: User;
    typeservice: string;
    images: Image[];
    bill: Bill;
    detail:Detail;
    provinceId: string;
    province: Province;
    latitude: string;
    longitude: string;
}



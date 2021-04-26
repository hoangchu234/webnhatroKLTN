import { Motel } from '../model/Motel';
import { NewType } from './NewType';
import { LiveType } from '../model/LiveType';

export class Detail {
    id: Int32Array;
    numberBath: Number;
    numberLiving: Number;
    director: string;
    liveTypeId: string;
    liveType: LiveType;
    typeofnewId: Number;
    typeofnew: NewType;
    motelid:Int32Array;
    motel:Motel;
}
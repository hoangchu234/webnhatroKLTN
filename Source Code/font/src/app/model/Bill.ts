import { Motel } from '../model/Motel';

export class Bill {
    id: string;
    timeChoice: string;
    numberDatePublish: number;
    payMoney:number;
    motelId:Int32Array;
    motel:Motel;
    sevicepriceId:Int32Array;
}
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class StorageService  
{
    public static accountStorage: string = 'currentAccount';
    public static motelStorage: string = 'saveMotel';
    public static totalMoneyStorage: string = 'totalMoneny';

    constructor() { }
    
}
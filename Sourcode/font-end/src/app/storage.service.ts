import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class StorageService  
{
    public static accountStorage: string = 'currentAccount';
    public static motelStorage: string = 'saveMotel'; 
    public static TypeMotelStorage: string = 'typeMotel';
    public static ImageStorage: string = 'saveImageMotel';
    public static loadImageStorage: string = 'loadImageMotel';
    public static totalMoneyStorage: string = 'totalMoneny';
    public static AreaSearchStorage: string = 'area';
    public static DirectSearchStorage: string = 'direct';
    // public static AreaSearchTickStorage: string = 'areaTick';
    // public static DirectSearchTickStorage: string = 'directTick';

    public static searchStorage: string = 'search';

    public static searchOneTimeStorage: string = 'searchOneTime';

    constructor() { }

    public static removeLocalSearch(){
        localStorage.removeItem(StorageService.AreaSearchStorage); 
        localStorage.removeItem(StorageService.DirectSearchStorage); 
    }
    public static removeLocalPubish(){
        localStorage.removeItem(StorageService.totalMoneyStorage); 
        localStorage.removeItem(StorageService.ImageStorage); 
        localStorage.removeItem(StorageService.loadImageStorage)
        localStorage.removeItem(StorageService.motelStorage)
        localStorage.removeItem(StorageService.TypeMotelStorage)
    }
    
}
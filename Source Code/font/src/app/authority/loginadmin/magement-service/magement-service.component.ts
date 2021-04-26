import { Component, OnInit } from '@angular/core';
import { ServicePriceService } from '../../../services/service-price.service'
import { Router } from '@angular/router';
import { Serviceprice } from '../../../model/Serviceprice';
import { HttpClient } from '@angular/common/http';
import { Bill } from '../../../model/Bill';

@Component({
  selector: 'app-magement-service',
  templateUrl: './magement-service.component.html',
  styleUrls: ['./magement-service.component.css']
})
export class MagementServiceComponent implements OnInit {

  nametophead = "Quản lý dịch vụ"
  servicePrice: Serviceprice[];
  // Xét click lấy value
  editRowID: any = "";

  date = "";
  priceDate = "";
  priceMonth = "";
  priceUpTop = "";
  priceWeek = "";
  
  constructor(private http: HttpClient,private router: Router,private priceSearchService: ServicePriceService) { }

  ngOnInit(): void {

    this.getServiceprices();
  }

  public async getServiceprices(){
    //this.priceSearchService.getServiceprices().subscribe(getserviceprice => this.servicePrice = getserviceprice)
    this.servicePrice = await this.priceSearchService.getServiceprices() as Serviceprice[];
  }

  public edit(value){
    this.editRowID = value;
  }

  public saveData(ID){
    var id = Number(ID) - Number(1);
    var bill = new Serviceprice();
    bill.id = this.servicePrice[id].id;
    bill.typeofnew = this.servicePrice[id].typeofnew; 
    
    if(this.date == ""){
      bill.date = this.servicePrice[id].date;
    }
    else{
      bill.date = this.date;
    }

    if(this.priceDate == ""){
      bill.priceDate = this.servicePrice[id].priceDate; 
    }
    else{
      bill.priceDate = this.priceDate;  
    }

    if(this.priceMonth == ""){
       bill.priceMonth = this.servicePrice[id].priceMonth; 
    }
    else{
      bill.priceMonth = this.priceMonth;  
    }

    if(this.priceUpTop == ""){
      bill.priceUpTop = this.servicePrice[id].priceUpTop;
    }
    else{
      bill.priceUpTop = this.priceUpTop;
    }

    if(this.priceWeek == ""){
      bill.priceWeek = this.servicePrice[id].priceWeek;
    }
    else{
      bill.priceWeek = this.priceWeek;
    }
 
    console.log(bill);
    this.priceSearchService.updateServiceprice(bill).subscribe(update => {
      //console.log(update);
      alert("Sửa thành công")
      window.location.reload();
    })
  }

  public updatePriceDate(event: any, priceDate: string)
  {
    this.priceDate = priceDate;
  }
  public updatePriceWeek(event: any, priceWeek: string)
  {
    this.priceWeek = priceWeek;
  }
  public updatePriceMonth(event: any, priceMonth: string)
  {
    this.priceMonth = priceMonth;
  }
  public updatePriceUpTop(event: any, priceUpTop: string)
  {
    this.priceUpTop = priceUpTop;
  }
  public updateDate(event: any, date: string)
  {
    this.date = date;
  }
}

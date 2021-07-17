import { Component, OnInit } from '@angular/core';
import { ServicePriceService } from '../../../services/service-price.service'
import { Router } from '@angular/router';
import { Serviceprice } from '../../../model/Serviceprice';
import { HttpClient } from '@angular/common/http';
import { Bill } from '../../../model/Bill';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-magement-service',
  templateUrl: './magement-service.component.html',
  styleUrls: ['./magement-service.component.css']
})
export class MagementServiceComponent implements OnInit {

  nametophead = "Quản lý dịch vụ"
  servicePrice: Serviceprice[];

  date = "";
  priceDate = "";
  priceMonth = "";
  priceWeek = "";
  
  id = "";
  change = true;
  constructor(private toast: ToastService,private http: HttpClient,private router: Router,private priceSearchService: ServicePriceService) { }

  ngOnInit(): void {

    this.getServiceprices();
  }

  public async getServiceprices(){
    //this.priceSearchService.getServiceprices().subscribe(getserviceprice => this.servicePrice = getserviceprice)
    this.servicePrice = await this.priceSearchService.getServiceprices() as Serviceprice[];
  }

  async ChangeButton(ID){
    if(this.change == true){
      this.change = false;
    }
    var result = await this.priceSearchService.geterviceById(ID) as Serviceprice;
    this.id = result.id.toString();
    this.date = result.date.split(" ")[0];
    this.priceDate = result.priceDate.split(" ")[0];
    this.priceMonth = result.priceMonth.split(" ")[0];
    this.priceWeek = result.priceWeek.split(" ")[0];
  }


  public saveData(){
    var bill = new Serviceprice();
    bill.id = this.servicePrice.find(a => Number(a.id) === Number(this.id)).id;
    bill.typeofnew = this.servicePrice.find(a => Number(a.id) === Number(this.id)).typeofnew; 
    
    if(this.date == ""){
      bill.date = this.servicePrice.find(a => Number(a.id) === Number(this.id)).date;
    }
    else{
      bill.date = this.date + "ngày";
    }

    if(this.priceDate == ""){
      bill.priceDate = this.servicePrice.find(a => Number(a.id) === Number(this.id)).priceDate; 
    }
    else{
      bill.priceDate = this.priceDate + "đồng";  
    }

    if(this.priceMonth == ""){
       bill.priceMonth = this.servicePrice.find(a => Number(a.id) === Number(this.id)).priceMonth; 
    }
    else{
      bill.priceMonth = this.priceMonth + "đồng";   
    }

    if(this.priceWeek == ""){
      bill.priceWeek = this.servicePrice.find(a => Number(a.id) === Number(this.id)).priceWeek;
    }
    else{
      bill.priceWeek = this.priceWeek + "đồng";  
    }
 
    this.priceSearchService.updateServiceprice(bill).subscribe(update => {
      //console.log(update);
      // alert("Sửa thành công")
      this.toast.toastSuccess('Sửa thành công');
      window.location.reload();
    })
  }


}

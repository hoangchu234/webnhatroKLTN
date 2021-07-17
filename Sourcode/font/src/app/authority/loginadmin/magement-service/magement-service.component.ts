import { Component, OnInit } from '@angular/core';
import { ServicePriceService } from '../../../services/service-price.service'
import { Router } from '@angular/router';
import { Serviceprice } from '../../../model/Serviceprice';
import { HttpClient } from '@angular/common/http';
import { Bill } from '../../../model/Bill';
import { ToastService } from 'src/app/services/toast.service';

export interface Data{
  id:number;
  text:string;
}

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

  typePriceMotels:Array<Data> = [
    {id: 0, text:'đồng'},
    {id: 1, text:'triệu'},
  ];
  typePriceMotel1: string;
  typePriceMotel2: string;
  typePriceMotel3: string;

  constructor(private toast: ToastService,private http: HttpClient,private router: Router,private priceSearchService: ServicePriceService) { }

  ngOnInit(): void {

    this.getServiceprices();
  }

  public async getServiceprices(){
    //this.priceSearchService.getServiceprices().subscribe(getserviceprice => this.servicePrice = getserviceprice)
    this.servicePrice = await this.priceSearchService.getServiceprices() as Serviceprice[];
  }

  onChangeTypePriceMote1(event){
    let value = event.target.value;
    var name = this.typePriceMotels[value].text.toString();
    this.typePriceMotel1 = name;
  }

  onChangeTypePriceMote2(event){
    let value = event.target.value;
    var name = this.typePriceMotels[value].text.toString();
    this.typePriceMotel2 = name;
  }

  onChangeTypePriceMote3(event){
    let value = event.target.value;
    var name = this.typePriceMotels[value].text.toString();
    this.typePriceMotel3 = name;
  }

  async ChangeButton(ID){
    if(this.change == true){
      this.change = false;
    }
    var result = await this.priceSearchService.geterviceById(ID) as Serviceprice;
    this.id = result.id.toString();
    this.date = result.date.split(" ")[0];

    if((Number(result.priceDate.split(" ")[0]) / 1000000) < 1){
      this.priceDate = (Number(result.priceDate.split(" ")[0]) / 1000).toString();
      this.typePriceMotel1 = this.typePriceMotels[0].text;
    }
    else{
      this.priceDate = (Number(result.priceDate.split(" ")[0]) / 1000000).toString();
      this.typePriceMotel1 = this.typePriceMotels[1].text;

    }

    if((Number(result.priceMonth.split(" ")[0]) / 1000000) < 1){
      this.priceMonth = (Number(result.priceMonth.split(" ")[0]) / 1000).toString();
      this.typePriceMotel3 = this.typePriceMotels[0].text;
    }
    else{
      this.priceMonth = (Number(result.priceMonth.split(" ")[0]) / 1000000).toString();
      this.typePriceMotel3 = this.typePriceMotels[1].text;

    }

    if((Number(result.priceWeek.split(" ")[0]) / 1000000) < 1){
      this.priceWeek = (Number(result.priceWeek.split(" ")[0]) / 1000).toString();
      this.typePriceMotel2 = this.typePriceMotels[0].text;
    }
    else{
      this.priceWeek = (Number(result.priceWeek.split(" ")[0]) / 1000000).toString();
      this.typePriceMotel2 = this.typePriceMotels[1].text;

    }
  }


  public saveData(){
    var bill = new Serviceprice();
    bill.id = this.servicePrice.find(a => Number(a.id) === Number(this.id)).id;
    bill.typeofnew = this.servicePrice.find(a => Number(a.id) === Number(this.id)).typeofnew; 
    
    if(this.date == ""){
      bill.date = this.servicePrice.find(a => Number(a.id) === Number(this.id)).date;
    }
    else{
      bill.date = this.date + " ngày";
    }

    if(this.priceDate == ""){
      bill.priceDate = this.servicePrice.find(a => Number(a.id) === Number(this.id)).priceDate; 
    }
    else{
      if(this.typePriceMotel1 == "đồng"){
        bill.priceDate = (Number(this.priceDate) * 1000).toString() + " đồng";   
      }
      else{
        bill.priceDate = (Number(this.priceDate) * 1000000).toString() + " đồng";    
      }
    }

    if(this.priceMonth == ""){
       bill.priceMonth = this.servicePrice.find(a => Number(a.id) === Number(this.id)).priceMonth; 
    }
    else{
      if(this.typePriceMotel3 == "đồng"){
        bill.priceMonth = (Number(this.priceMonth) * 1000).toString() + " đồng";    
      }
      else{
        bill.priceMonth = (Number(this.priceMonth) * 1000000).toString() + " đồng";    
      } 
    }

    if(this.priceWeek == ""){
      bill.priceWeek = this.servicePrice.find(a => Number(a.id) === Number(this.id)).priceWeek;
    }
    else{
      if(this.typePriceMotel2 == "đồng"){
        bill.priceWeek = (Number(this.priceWeek) * 1000).toString() + " đồng";  
      }
      else{
        bill.priceWeek = (Number(this.priceWeek) * 1000000).toString() + " đồng";   
      } 
    }
 
    this.priceSearchService.updateServiceprice(bill).subscribe(update => {
      //console.log(update);
      // alert("Sửa thành công")
      this.toast.toastSuccess('Sửa thành công');
      window.location.reload();
    })
  }


}

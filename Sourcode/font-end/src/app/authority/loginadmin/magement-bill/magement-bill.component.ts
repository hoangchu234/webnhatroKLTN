import { Component, OnInit } from '@angular/core';
import { Bill } from '../../../model/Bill';
import { Account } from '../../../model/Account';
import { BillService } from '../../../services/bill.service';

@Component({
  selector: 'app-magement-bill',
  templateUrl: './magement-bill.component.html',
  styleUrls: ['./magement-bill.component.css']
})
export class MagementBillComponent implements OnInit {

  nametophead = "Quản lý bill"
  bills: Bill[];
  billSearch: Bill[];
  billJustPublish:Bill[];
  totalPrice: Number = 0;
  searchName = "";

  //page
  totalRecord: Number;
  page:Number = 1;

  constructor(private billservice : BillService) { 
  
  }

  ngOnInit(): void {
    this.getBills();
    this.getNowbills();  
  }

  public handlePageChange(event) {
    this.page = event;
  }

  public async getBills(){
    this.bills = await this.billservice.getAdminBills() as Bill[];
    this.billSearch = this.bills;
    this.tongTien();
    /*this.billservice.getAdminBills().subscribe(data => {
      this.bills = data;
      this.billSearch = data;
      this.tongTien();
    })*/
  }

  public async getNowbills(){ 
    this.billJustPublish = await this.billservice.getNowsBills() as Bill[];
    /*this.billservice.getNowsBills().subscribe(data => {
      this.billJustPublish = data;
    })*/
  }

  public onSearch(){
    if(this.searchName == "")
    {
      this.bills = this.bills;
    }
    else{
     
      this.bills = this.billSearch.filter(a => a.motel.user.hovaTen.toLowerCase().includes(this.searchName.toLowerCase()));
    }

   
   
  }

  public tongTien(){
    for(let i=0; i< this.bills.length;i++){
      this.totalPrice = Number(this.totalPrice) + Number(this.bills[i].payMoney);
    }
    this.totalPrice=Number(this.totalPrice);
  }

}

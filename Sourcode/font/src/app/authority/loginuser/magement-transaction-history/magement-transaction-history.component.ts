import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Bill } from '../../../model/Bill';
import { Account } from '../../../model/Account';
import { BillService } from '../../../services/bill.service';
import { AuthenticationService } from '../../../services/authentication.service';

export interface Type{
  id:number;
  text:string;
}

@Component({
  selector: 'app-magement-transaction-history',
  templateUrl: './magement-transaction-history.component.html',
  styleUrls: ['./magement-transaction-history.component.css']
})
export class MagementTransactionHistoryComponent implements OnInit {

  nametophead = "Quản lý thanh toán"

  //currentAccount: Account;
  
  bills: Bill[];
  billSearch: Bill[] = [];
  //pagination
  totalRecord: Number;
  page:Number = 1;

  public times:Array<Type> = [
    {id: 0, text:'Đăng theo ngày'}, 
    {id: 1, text:'Đăng theo tuần'}, 
    {id: 2, text:'Đăng theo tháng'},
  ];

  time: string;

  constructor(private authenticationService: AuthenticationService,private chRef : ChangeDetectorRef,private billsrvice : BillService) {
    //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
   }

  ngOnDestroy(): void {
   
  }

  ngOnInit(): void {
    this.getBills();
    
  }

  public onChangetime(event){

    let value = event.target.value;
    var name = this.times[value].text.toString();
    // console.log(this.times[value].text)
    this.time = name;
    this.bills = this.billSearch.filter(a => a.timeChoice == name);
  }

  public handlePageChange(event) {
    this.page = event;
  }

 
  public async getBills(){
    var id = this.authenticationService.currentAccountValue.user.id
    /*this.billsrvice.getBills(id.toString()).subscribe(data => {
      this.billSearch = data;
      this.bills = this.billSearch;
      this.totalRecord = this.bills.length;
      console.log(this.bills)
    })*/
    this.billSearch = await this.billsrvice.getBills(id.toString()) as Bill[];
    this.bills = this.billSearch;
    this.totalRecord = this.bills.length;
  }


}

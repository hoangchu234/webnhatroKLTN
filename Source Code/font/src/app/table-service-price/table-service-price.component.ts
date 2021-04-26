import { Component, OnInit } from '@angular/core';
import { ServicePriceService } from '../services/service-price.service'
import { Router } from '@angular/router';
import { Serviceprice } from '../model/Serviceprice';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-table-service-price',
  templateUrl: './table-service-price.component.html',
  styleUrls: ['./table-service-price.component.css']
})
export class TableServicePriceComponent implements OnInit {

 
  servicePrices: Serviceprice[];
  constructor(private http: HttpClient,private router: Router,private priceSearchService: ServicePriceService) { }

  ngOnInit(): void {
    this.getServicePrices();
  }

  public async getServicePrices(){
    this.servicePrices = await this.priceSearchService.getServiceprices() as Serviceprice[];
    //this.priceSearchService.getServiceprices().subscribe(getserviceprice => this.servicePrices = getserviceprice)
  }

}

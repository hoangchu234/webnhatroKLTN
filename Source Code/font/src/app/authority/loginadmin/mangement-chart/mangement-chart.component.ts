import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import { Motel } from '../../../model/Motel';
import { MotelService } from '../../../services/motel.service';

export interface Type{
  id:number;
  text:string;
}


@Component({
  selector: 'app-mangement-chart',
  templateUrl: './mangement-chart.component.html',
  styleUrls: ['./mangement-chart.component.css']
})
export class MangementChartComponent implements OnInit {

  nametophead = "Trang thống kê"
  public news:Array<Type> = [
    {id: 0, text:'Tin Hot'}, // 4 tuần, 2 tuần
    {id: 1, text:'Tin VIP 30'}, // 
    {id: 2, text:'Tin VIP 20'},
    {id: 3, text:'Tin VIP 10'},
    {id: 4, text:'Tin thường'},
  ];

  //PieChart
  countHot: Number = 0;
  countVIP30: Number = 0;
  countVIP20: Number = 0;
  countVIP10: Number = 0;
  countThuong: Number = 0;
  motelURL = "https://localhost:44324/api/Motels";
  public dataset: Motel[]
  public pieChartLabels:string[];
  public pieChartData:number[];
  public pieChartType:string = 'pie'; 
  chartReady = false;

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }


  //Bar Chart
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[];
  BarchartReady = false;



  //Line Chart
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  LinechartReady = false;

  constructor(private httpClient: HttpClient,private motelService: MotelService) {

  }

  async ngOnInit() {
    
    this.getPieChartData();
    this.getbarChartData();

    this.getlineChartData();
  }

  public async getPieChartData()
  {
    let counthot = await this.httpClient.get<any>(this.motelURL + "/TopHot").toPromise();
    let count30 = await this.httpClient.get<any>(this.motelURL + "/TopHot30").toPromise();
    let count20 = await this.httpClient.get<any>(this.motelURL + "/TopHot20").toPromise();
    let count10 = await this.httpClient.get<any>(this.motelURL + "/TopHot10").toPromise();
    let countthuong = await this.httpClient.get<any>(this.motelURL + "/TopThuong").toPromise();

    if(counthot && count30 && count20 && count10 && countthuong){
      this.chartReady = true;
      this.pieChartLabels = [this.news[0].text, this.news[1].text, this.news[2].text,this.news[3].text,this.news[4].text];
      this.pieChartData = [Number(counthot), Number(count30), Number(count20), Number(count10),Number(countthuong)];
    }
   
  }

  public async getbarChartData()
  {
    let countCountPriceDuoi1Trieu = await this.httpClient.get<any>(this.motelURL + "/CountPriceDuoi1Trieu").toPromise();
    let countCountPrice1To2Trieu = await this.httpClient.get<any>(this.motelURL + "/CountPrice1To2Trieu").toPromise();
    let countCountPrice2To3Trieu = await this.httpClient.get<any>(this.motelURL + "/CountPrice2To3Trieu").toPromise();
    let countCountPrice3To5Trieu = await this.httpClient.get<any>(this.motelURL + "/CountPrice3To5Trieu").toPromise();
    let countCountPrice5To7Trieu = await this.httpClient.get<any>(this.motelURL + "/CountPrice5To7Trieu").toPromise();
    let countCountPrice7To10Trieu = await this.httpClient.get<any>(this.motelURL + "/CountPrice7To10Trieu").toPromise();
    let countCountPrice10To15Trieu = await this.httpClient.get<any>(this.motelURL + "/CountPrice10To15Trieu").toPromise();
    let countCountPriceTren15Trieu = await this.httpClient.get<any>(this.motelURL + "/CountPriceTren15Trieu").toPromise();


    if(countCountPriceDuoi1Trieu && countCountPrice1To2Trieu && countCountPrice2To3Trieu && countCountPrice3To5Trieu && countCountPrice5To7Trieu && countCountPrice7To10Trieu && countCountPrice10To15Trieu && countCountPriceTren15Trieu){
      this.BarchartReady = true;
      this.barChartLabels = ['Dưới 1 triệu', '1 triệu - 2 triệu', '2 triệu - 3 triệu', '3 triệu - 5 triệu', '5 triệu - 7 triệu', '7 triệu - 10 triệu', '10 triệu - 15 triệu', 'Trên 15 triệu'];
      this.barChartData = [ { data: [Number(countCountPriceDuoi1Trieu), Number(countCountPrice1To2Trieu), Number(countCountPrice2To3Trieu), Number(countCountPrice3To5Trieu),Number(countCountPrice5To7Trieu),Number(countCountPrice7To10Trieu),Number(countCountPrice10To15Trieu),Number(countCountPriceTren15Trieu)], label: 'Theo giá'  }];

    
    }
   
  }


  public async getlineChartData()
  {
    this.motelService.getmoteluserpublish().subscribe(getdata => {
      console.log(getdata)

      let dataone = getdata[0].hovaTen;
      let datatow = getdata[1].hovaTen;
      let datathree = getdata[2].hovaTen;
      let datafour = getdata[3].hovaTen;
      let datafive = getdata[4].hovaTen;

      let dataonetotal = getdata[0].total;
      let datatowtotal = getdata[1].total;
      let datathreetotal = getdata[2].total;
      let datafourtotal = getdata[3].total;
      let datafivetotal = getdata[4].total;

      if(dataone && datatow && datathree && datafour && datafive){
        this.LinechartReady = true;

        this.lineChartLabels = [dataone,datatow,datathree,datafour,datafive];
        this.lineChartData = [
          { data: [Number(dataonetotal), Number(datatowtotal), Number(datathreetotal), Number(datafourtotal), Number(datafivetotal)], label: 'Theo số tin đã đăng' },
        ];
        console.log("aaa")
      }  
    })
     
  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitiesService } from '../services/cities.service';
import { City } from '../model/City';
import { ProvincesService } from '../services/provinces.service';
import { Province } from '../model/Province';

export interface Data{
  id:number;
  text:string;
}

@Component({
  selector: 'app-area-city-home',
  templateUrl: './area-city-home.component.html',
  styleUrls: ['./area-city-home.component.css']
})
export class AreaCityHomeComponent implements OnInit {

  // Danh sách city và tên city
  cities = new Array<City>();
  city;
  // Danh sách province và tên province
  provinces = new Array<Province>();
  province;
  nameURL:string;

  imageHCMs:Array<Data> = [
    {id: 0, text:'../../assets/images/image/quan1.jpg'},
    {id: 1, text:'../../assets/images/image/quan2.jpg'},
    {id: 2, text:'../../assets/images/image/quan3.jpg'},
    {id: 3, text:'../../assets/images/image/quan4.jpg'},
    {id: 4, text:'../../assets/images/image/quan5.jpg'},
    {id: 5, text:'../../assets/images/image/quan6.jpg'},
    {id: 6, text:'../../assets/images/image/quan7.jpg'},
    {id: 7, text:'../../assets/images/image/quan8.jpg'},
    {id: 8, text:'../../assets/images/image/quan9.jpg'},
    {id: 9, text:'../../assets/images/image/quan10.jpg'},
    {id: 10, text:'../../assets/images/image/quan11.jpg'},
    {id: 11, text:'../../assets/images/image/quan12.jpg'},
    {id: 12, text:'../../assets/images/image/quan13.jpg'},
    {id: 13, text:'../../assets/images/image/quan14.jpg'},
    {id: 14, text:'../../assets/images/image/quan15.jpg'},
    {id: 15, text:'../../assets/images/image/quan16.jpg'},
    {id: 16, text:'../../assets/images/image/quan17.jpg'},
    {id: 17, text:'../../assets/images/image/quan18.jpg'},
    {id: 18, text:'../../assets/images/image/quan19.jpg'},
  ];

  imageHNs:Array<Data> = [
    {id: 0, text:'../../assets/images/image/q1.jpg'},
    {id: 1, text:'../../assets/images/image/q2.jpg'},
    {id: 2, text:'../../assets/images/image/q3.jpg'},
    {id: 3, text:'../../assets/images/image/q4.jpg'},
    {id: 4, text:'../../assets/images/image/q5.jpg'},
    {id: 5, text:'../../assets/images/image/q6.jpg'},
    {id: 6, text:'../../assets/images/image/q7.jpg'},
    {id: 7, text:'../../assets/images/image/q8.jpg'},
    {id: 8, text:'../../assets/images/image/q9.jpg'},
    {id: 9, text:'../../assets/images/image/q10.jpg'},
    {id: 10, text:'../../assets/images/image/q11.jpg'},
  ];


  checkHCM = false;
  checkHN = false;


  constructor(private provinceService: ProvincesService,private citiesService:CitiesService,private route: Router,private router: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.nameURL = this.router.snapshot.paramMap.get("name");
    console.log(this.nameURL)
    if(this.nameURL == "TP HCM"){
      this.checkHCM = true;
      this.getProvinces("TP HCM")
    }
    if(this.nameURL == "Hà Nội"){
      this.checkHN = true;
      this.getProvinces("Hà Nội")
    }
  }

  public async getProvinces(name){
    console.log(name)
    /*this.provinceService.getProvincesByCityName(name).subscribe(data => {
      this.provinces = data
    })*/
    this.provinces = await this.provinceService.getProvincesByCityName(name) as Province[];
  }

  public onClickProvince (name)  {
    this.province = name;
    localStorage.setItem('province', name);
    localStorage.setItem('searchtext', "NULL");
    if(this.checkHCM){
      localStorage.setItem('city', "TP HCM");
    }
    if(this.checkHN){
      localStorage.setItem('city', "Hà Nội");
    }
    this.route.navigateByUrl('/home/cho-thue-nha-tro');
  }
}

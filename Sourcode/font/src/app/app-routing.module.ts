import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';

import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { ThongTinCoBanComponent } from './authority/loginuser/publish/thong-tin-co-ban/thong-tin-co-ban.component';
import { ThongTinCoBanNextComponent } from './authority/loginuser/publish/thong-tin-co-ban-next/thong-tin-co-ban-next.component';
import { ThongTinCoBanNextNextComponent } from './authority/loginuser/publish/thong-tin-co-ban-next-next/thong-tin-co-ban-next-next.component';
import { ThongTinHinhAnhComponent } from './authority/loginuser/publish/thong-tin-hinh-anh/thong-tin-hinh-anh.component';
import { ChonGoiTinThanhToanComponent } from './authority/loginuser/publish/chon-goi-tin-thanh-toan/chon-goi-tin-thanh-toan.component';
import { ThanhToanDongComponent } from './authority/loginuser/publish/thanh-toan-dong/thanh-toan-dong.component';
import { HomeComponent } from './home/home.component';

import { LoginadminComponent } from './authority/loginadmin/loginadmin.component';
import { LoginuserComponent } from './authority/loginuser/loginuser.component';
import { NotloginComponent } from './authority/notlogin/notlogin.component';

import { TindadangComponent } from './authority/loginuser/tindadang/tindadang.component';

import { TableServicePriceComponent } from './table-service-price/table-service-price.component';

import { AdminPublishComponent } from './authority/loginadmin/admin-publish/admin-publish.component';

import { DetailMotelComponent } from './detail-motel/detail-motel.component';
import { SearchMotelComponent } from './search-motel/search-motel.component';
import { EmployeePublishComponent } from './authority/loginadmin/employee-publish/employee-publish.component';
import { MagementServiceComponent } from './authority/loginadmin/magement-service/magement-service.component';
import { MagementBillComponent } from './authority/loginadmin/magement-bill/magement-bill.component';
import { MagementEmployeeComponent } from './authority/loginadmin/magement-employee/magement-employee.component';
import { HelpComponent } from './authority/loginuser/help/help.component';
import { MagementTransactionHistoryComponent } from './authority/loginuser/magement-transaction-history/magement-transaction-history.component';

import { MagementPublishMotelComponent } from './authority/loginuser/magement-publish-motel/magement-publish-motel.component';
import { MagementProfileComponent } from './authority/loginuser/magement-profile/magement-profile.component';
import { MangementChartComponent } from './authority/loginadmin/mangement-chart/mangement-chart.component';
import { AreaCityHomeComponent } from './area-city-home/area-city-home.component';
import { MagementSendMessegerComponent } from './authority/loginuser/magement-send-messeger/magement-send-messeger.component';
import { WebForumComponent } from './web-forum/web-forum.component'
import { ChatsComponent} from './chats/chats.component'
import { DetailPostForumComponent } from './web-forum/detail-post-forum/detail-post-forum.component';
import { DetailMotelPublishComponent } from './authority/loginuser/magement-publish-motel/detail-motel-publish/detail-motel-publish.component';
import { DetailMotelExtendComponent } from './authority/loginuser/magement-publish-motel/detail-motel-extend/detail-motel-extend.component';
import { DetailMotelPublishMagementComponent } from './authority/loginadmin/detail-motel-publish-magement/detail-motel-publish-magement.component';
import { ManagementForumComponent } from './authority/loginadmin/management-forum/management-forum.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {
    path: 'admin',          component: LoginadminComponent ,
    children:[
      { path: '',          component: MangementChartComponent },
      { path: 'quan-ly-nhan-vien',          component: MagementEmployeeComponent },
      { path: 'quan-ly-nap-tien',          component: MagementBillComponent },
      { path: 'quan-ly-dich-vu',          component: MagementServiceComponent },
      { path: 'quan-ly-duyet-tin',          component: AdminPublishComponent },
      { path: 'nhan-vien-quan-ly-duyet-tin',          component: EmployeePublishComponent },
      { path: 'dien-dan',          component: ManagementForumComponent },
      { path: 'chi-tiet/:name/:id',          component: DetailMotelPublishMagementComponent },
    ]
  },

  {
    path: 'user',          component: LoginuserComponent ,
    children:[
      { path: 'quan-ly-messeger',          component: MagementSendMessegerComponent },
      { path: 'quan-ly-dang-tin',          component: MagementPublishMotelComponent },
      { path: 'thanh-toan-dong',          component: ThanhToanDongComponent },
      { path: 'goi-thanh-toan',          component: ChonGoiTinThanhToanComponent },
      { path: 'thong-tin-hinh-anh',          component: ThongTinHinhAnhComponent },
      { path: 'thong-tin-chi-tiet-nha-tro',          component: ThongTinCoBanNextNextComponent },
      { path: 'thong-tin-nha-tro',          component: ThongTinCoBanNextComponent },
      { path: 'thong-tin-vi-tri',          component: ThongTinCoBanComponent },
      { path: 'thong-tin-ca-nhan',          component: MagementProfileComponent },
      { path: 'tin-da-dang',          component: TindadangComponent },
      { path: 'lich-su-giao-dich',          component: MagementTransactionHistoryComponent },
      { path: 'chi-tiet/:name/:id',          component: DetailMotelPublishComponent },
      { path: 'gia-han-tin/:name/:id',          component: DetailMotelExtendComponent },
    ]
  },

  {
    path: 'home',          component: NotloginComponent ,
    children:[
      { path: '',          component: HomeComponent },
      { path: 'chi-tiet/:name/:id',          component: DetailMotelComponent },
      { path: ':city/:province/:district/:street/:price/:type/:direct/:area',          component: SearchMotelComponent },
      { path: ':city/:province/:district/:street/:price/:type',          component: SearchMotelComponent },
      { path: ':city/:province/:district/:street/:type',          component: SearchMotelComponent },
      { path: ':city/:province/:district/:type',          component: SearchMotelComponent },
      { path: ':city/:province/:type',          component: SearchMotelComponent},
      { path: ':city/:type',          component: SearchMotelComponent},
      { path: ':type',          component: SearchMotelComponent},    
    ]
  },

  { path: 'bang-gia-dich-vu',          component: TableServicePriceComponent },
  { path: 'tro-giup',          component: HelpComponent } ,
  { path: 'area/:name',          component: AreaCityHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'chat/:id', component:ChatsComponent },
  { path: 'forum', component:WebForumComponent},

  { path: 'map/:city/:province/:district/:street/:price/:type',          component: MapComponent },
  { path: 'map/:city/:province/:district/:street/:type',          component: MapComponent },
  { path: 'map/:city/:province/:district/:type',          component: MapComponent },
  { path: 'map/:city/:province/:type',          component: MapComponent},
  { path: 'map/:city/:type',          component: MapComponent},
  { path: 'map/:type',          component: MapComponent},

  { path: 'forum/:name/:id',          component: DetailPostForumComponent }, 

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }

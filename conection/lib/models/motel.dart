import 'image.dart';
import 'detail.dart';
class Motel{
  int id;
  String typeLive;
  String title;
  int price;
  String priceType;
  DateTime dateUpdate;
  DateTime dateDue;
  String time;
  String status;
  bool verify;
  String address;
  String description;
  String phone;
  String typemotel;
  int areaZone;
  String areaZoneType;
  String typeservice;
  String city;
  int cityId;
  String province;
  int provinceId;
  String district;
  int districtId;
  String street;
  int streetId;
  List<image> images;
  String bills;
  String user;
  int userId;
  detail Detail;


  Motel(int id,String typeLive,String title,
      int price, String priceType, DateTime dateUpdate,
      DateTime dateDue, String time, String status,
      bool verify, String address, String description,
      String phone, String typemotel, int areaZone,
      String areaZoneType, String typeservice, String city,
      int cityId, String province, int provinceId,
      String district, int districtId, String street
      ,int streetId, List<image> images, String bills,String user,
      int userId, detail Detail)
  {
    this.id=id;
    this.typeLive=typeLive;
    this.title=title;
    this.price = price;
    this.priceType = priceType;
    this.dateUpdate= dateUpdate;
    this.dateDue= dateDue;
    this.time= time;
    this.status= status;
    this.verify= verify;
    this.address = address;
    this.description= description;
    this.phone= phone;
    this.typemotel= typemotel;
    this.areaZone = areaZone;
    this.areaZoneType= areaZoneType;
    this.typeservice = typeservice;
    this.city= city;
    this.cityId= cityId;
    this.province= province;
    this.provinceId= provinceId;
    this.district=district;
    this.districtId=districtId;
    this.street= street;
    this.streetId=streetId;
    this.images= images;
    this.bills=bills;
    this.user=user;
    this.userId=userId;
    this.Detail=Detail;

  }
  Motel.fromJson(Map json):id=json['id'],
  typeLive=json['typeLive'],
  title=json['title'],
  price = json['price'],
  priceType = json['priceType'],
  dateUpdate= json['dateUpdate'],
  dateDue= json['dateDue'],
  time= json['time'],
  status= json['status'],
  verify= json['verify'],
  address = json['address'],
  description= json['description'],
  phone= json['phone'],
  typemotel= json['typemotel'],
  areaZone = json['areaZone'],
  areaZoneType= json['areaZoneType'],
  typeservice = json['typeservice'],
  city= json['city'],
  cityId= json['cityId'],
  province= json['province'],
  provinceId= json['provinceId'],
  district=json['district'],
  districtId=json['districtId'],
  street= json['street'],
  streetId=json['streetId'],
  images= json['images'],
  bills=json['bills'],
  user=json['user'],
  userId=json['userId'],
  Detail=json['Detail'];
}
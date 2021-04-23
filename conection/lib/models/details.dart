import 'motel.dart';
class details{
  int id;
  int numberBath;
  int numberLiving;
  String director;
  int typeofnewId;
  String liveType;
  int liveTypeId;
  Motel motel;
  int motelId;
  details(int id,int numberBath,int numberLiving, String director
      ,typeofnewId,String liveType,int liveTypeId, Motel motel, int motelId){
    this.id= id;
    this.numberBath= numberBath;
    this.numberLiving= numberLiving;
    this.director =director;
    this.typeofnewId= typeofnewId;
    this.liveType =liveType;
    this.liveTypeId =liveTypeId;
    this.motel= motel;
    this.motelId= motelId;
  }
  details.fromJson(Map json)
      : id = json['id'],
        numberBath = json['numberBath'],
        numberLiving = json['numberLiving'],
        director = json['director'],
        typeofnewId = json['typeofnewId'],
        liveType = json['liveType'],
        motel = json['motel'],
        motelId = json['motelId'];


}


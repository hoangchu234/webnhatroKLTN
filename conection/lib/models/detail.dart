import 'typeofnew.dart';
class detail{
  int id;
  int numberBath;
  int numberLiving;
  String director;
  typeofnew Typeofnew;
  int typeofnewId;
  String liveType;
  int liveTypeId;
  int motelId;

  detail(int id,int numberBath,int numberLiving,String director
      ,typeofnew Typeofnew,int typeofnewId,String liveType,
      int liveTypeId, int motelId ){
    this.id=id;
    this.numberBath=numberBath;
    this.director=director;
    this.Typeofnew =Typeofnew;
    this.typeofnewId=typeofnewId;
    this.liveType=liveType;
    this.liveTypeId=liveTypeId;
    this.motelId=motelId;
  }
  detail.fromJson(Map json)
      : id = json['id'],
        numberBath = json['numberBath'],
        director = json['director'],
        Typeofnew = json['Typeofnew'],
        typeofnewId = json['typeofnewId'],
        liveType = json['liveType'],
        liveTypeId = json['liveTypeId'],
        motelId = json['motelId'];
}
import 'details.dart';
class typeofnew{
  int id;
  String name;
  details Details;

  typeofnew(int id, String name, details Details){
    this.id = id;
    this.name = name;
    this.Details = Details;
  }

  typeofnew.fromJson(Map json)
      : id = json['id'],
        name = json['name'],
        Details = json['Details'];

}
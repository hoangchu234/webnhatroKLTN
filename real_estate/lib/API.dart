import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

const baseUrl = "http://10.0.2.2:5001/api";
const header = {'Content-Type': 'application/json; charset=UTF-8',};
getHeaderJWT(token) {
  return {'Content-Type': 'application/json','Accept': 'application/json','Authorization': 'Bearer $token',};
}
class API{
  // static Future getMotels() {
  //   String url = baseUrl + get;
  //   return http.get(url);
  // }
  static Future getMotels(int city, int province, int district, int street, int price, int type) {
    const get ="/Motels/GetMotelByOrder";
    var url = baseUrl + get + "/" + city.toString() + "/" + province.toString() + "/" + district.toString() + "/" + street.toString() + "/" + price.toString() + "/" + type.toString();
    return http.get(url);
  }

  static Future getCities() {
    const get ="/Cities/GetCitiesApp";
    var url = baseUrl + get;
    return http.get(url);
  }
}
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

const baseUrl = "http://10.0.2.2:5001/api";
const get ="/Motels/Highlights";
const header = {'Content-Type': 'application/json; charset=UTF-8',};
getHeaderJWT(token) {
  return {'Content-Type': 'application/json','Accept': 'application/json','Authorization': 'Bearer $token',};
}
class API{
  static Future getMotels() {
    String url = baseUrl + get;
    return http.get(url);
  }
}
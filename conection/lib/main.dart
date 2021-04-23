import 'dart:convert';
import 'models/motel.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
    MyHomePage({Key key, this.title}) : super(key: key);
    final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  var motel = new List<Motel>();
  void getTime() async{
    Response response = await get('http://10.0.2.2:5001/api/Motels/Highlights');
    var data= jsonDecode(response.body);
    print(data);
  }
  @override
  void initState() {
    // TODO: implement initState
    getTime();
    super.initState();

  }
   @override
  Widget build(BuildContext context) {
  return Scaffold(
    body: Text("chu"),

  );

  }
}

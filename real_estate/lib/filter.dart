import 'dart:convert';

import 'package:dropdown_search/dropdown_search.dart';
import 'package:dropdownfield/dropdownfield.dart';
import 'package:flutter/material.dart';
import 'package:real_estate/Finding.dart';

import 'API.dart';
import 'data.dart';



class Filter extends StatefulWidget {
  @override
  _FilterState createState() => _FilterState();
}

class _FilterState extends State<Filter> {
  List<bool>isSelectedroom =[true,false,false,false];
  List<bool>isSelectedshower =[true,false,false,false];
  RangeValues _currentRangeValues = const RangeValues(0, 20);
  int idCiti= 1;
  int idProvince= 1;
  int idPType= 2;
  int startprice = 0;
  int endtprice = 20;

  List<City> cities = new List<City>();
  List<Province> provinces = new List<Province>();
  List<Type> types = new List<Type>();
  List<String> city_names = new List<String>();
  List<String> province_names = new List<String>();
  List<String> type_name = new List<String>();
  String textData = "Huyện Bình Chánh";
  _getCity() async{
    API.getCities().then((res) {
      setState(() {
        var jsRes = json.decode(utf8.decode(res.bodyBytes));
        List<dynamic> list = jsRes;
        for(int i=0;i<list.length;i++){
          City p = new City(list.elementAt(i)['id'],list.elementAt(i)['name']);
          cities.add(p);
          city_names.add(p.name.toString());
        }
      });
    });
  }

  _getType() async{
    API.getTypes().then((res) {
      setState(() {
        var jsRes = json.decode(utf8.decode(res.bodyBytes));
        List<dynamic> list = jsRes;
        for(int i=1;i<list.length;i++){
          Type p = new Type(list.elementAt(i)['id'],list.elementAt(i)['name'],list.elementAt(i)['details']);
          type_name.add(p.name.toString());
          types.add(p);
        }
      });
    });
  }

  _getProvince(int id) async{
    API.getProvinces(id).then((res) {
      setState(() {
        var jsRes = json.decode(utf8.decode(res.bodyBytes));

        List<dynamic> list = jsRes;
        if(province_names.length != 0){
          province_names = new List<String>();
        }
        if(provinces.length != 0){
          provinces = new List<Province>();
        }
        for(int i=0;i<list.length;i++){
          Province p = new Province(list.elementAt(i)['id'],list.elementAt(i)['name']);
          province_names.add(p.name.toString());
          provinces.add(p);
        }
      });
      textData = province_names[0];
    });
  }


  @override
  void initState() {
    _getCity();
    _getProvince(1);
    _getType();
    super.initState();
  }

  var selectedRange = RangeValues(500, 1000);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(right: 24, left: 24, top: 32, bottom: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [

          Row(
            children: [
              Text(
                "Lọc",
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(
                width: 8,
              ),
              Text(
                "tìm kiếm của bạn",
                style: TextStyle(
                  fontSize: 18,
                ),
              ),

            ],
          ),

          SizedBox(
            height: 12,
          ),

          Row(
            children: [

              Text(
                "Khoảng giá",
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),

              SizedBox(
                width: 8,
              ),

            ],
          ),

          RangeSlider(
            values: _currentRangeValues,
            min: 0,
            max: 20,
            divisions: 20,
            labels: RangeLabels(
              _currentRangeValues.start.round().toString() + " triệu",
              _currentRangeValues.end.round().toString()+ " triệu",

            ),
            onChanged: (RangeValues values) {
              setState(() {
                _currentRangeValues = values;
                startprice =_currentRangeValues.start.round();
                endtprice =_currentRangeValues.end.round();
              });
            },
          ),

          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [

              Text(
                r"0 triệu",
                style: TextStyle(
                  fontSize: 14,
                ),
              ),

              Text(
                r"20 triệu",
                style: TextStyle(
                  fontSize: 14,
                ),
              ),

            ],
          ),

          SizedBox(
            height: 16,
          ),
          Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                DropdownSearch<String>(
                  items: city_names,
                  label: "Thành phố",
                  onChanged: (text){
                    int data = city_names.indexOf(text);
                    _getProvince(cities[data].id);
                    idCiti=cities[data].id;
                  },
                  selectedItem:"Hồ Chí Minh",
                  showSearchBox: true,
                  searchBoxDecoration: InputDecoration(
                    border: OutlineInputBorder(),
                    contentPadding: EdgeInsets.fromLTRB(12, 12, 8, 0),
                    labelText: "Search a country",
                  ),
                  popupTitle: Container(
                    height: 50,
                    decoration: BoxDecoration(
                      color: Theme.of(context).primaryColorDark,
                      borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(20),
                        topRight: Radius.circular(20),
                      ),
                    ),
                    child: Center(
                      child: Text(
                        'Country',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                  popupShape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(24),
                      topRight: Radius.circular(24),
                    ),
                  ),
                ),
                Divider(),
              ]),
          Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                DropdownSearch<String>(
                  items: province_names,
                  label: "Quận Huyện",
                  onChanged: (text){
                  int data = province_names.indexOf(text);
                  idProvince=provinces[data].id;
                  },
                  selectedItem: textData,
                  showSearchBox: true,
                  searchBoxDecoration: InputDecoration(
                    border: OutlineInputBorder(),
                    contentPadding: EdgeInsets.fromLTRB(12, 12, 8, 0),
                    labelText: "Search a country",
                  ),
                  popupTitle: Container(
                    height: 50,
                    decoration: BoxDecoration(
                      color: Theme.of(context).primaryColorDark,
                      borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(20),
                        topRight: Radius.circular(20),
                      ),
                    ),
                    child: Center(
                      child: Text(
                        'Country',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                  popupShape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(24),
                      topRight: Radius.circular(24),
                    ),
                  ),
                ),
                Divider(),
              ]),
          Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                DropdownSearch<String>(
                  items: type_name,
                  label: "Loại nhà trọ",
                  onChanged: (text){
                    int data = type_name.indexOf(text);
                    idPType = types[data].id;
                  },
                  selectedItem: "Phòng trọ, nhà trọ",
                  showSearchBox: true,
                  searchBoxDecoration: InputDecoration(
                    border: OutlineInputBorder(),
                    contentPadding: EdgeInsets.fromLTRB(12, 12, 8, 0),
                    labelText: "Search a country",
                  ),
                  popupTitle: Container(
                    height: 50,
                    decoration: BoxDecoration(
                      color: Theme.of(context).primaryColorDark,
                      borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(20),
                        topRight: Radius.circular(20),
                      ),
                    ),
                    child: Center(
                      child: Text(
                        'Country',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                  popupShape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(24),
                      topRight: Radius.circular(24),
                    ),
                  ),
                ),
                Divider(),
              ]),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(95, 0, 8, 0),
                child: Center(
                  child: RaisedButton(
                    color: Colors.blue[800],
                    child: Text(
                      'Lọc tìm kiếm ',
                      style: TextStyle(
                          fontSize: 20,
                          color: Colors.white
                      ),
                    ),
                    onPressed: () {
                      _sendDataToSecondScreen(context);
                    },
                  ),
                ),
              )

            ],
          ),

        ],
      ),
    );
  }
  void _sendDataToSecondScreen(BuildContext context) {
    String CitiToSend =idCiti.toString();
    String ProvinceToSend =idProvince.toString();
    Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => Find(citi: CitiToSend,province:ProvinceToSend ,startprice: startprice.toString(),endprice: endtprice.toString(),idtype: idPType.toString(),),
        ));
  }
  Widget buildOption(String text){
    return Container(
      height: 45,
      width: 65,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.all(
          Radius.circular(5),
        ),
        border: Border.all(
          color: Colors.grey,
        )
      ),
      child: Center(
        child: Text(
          text,
          style: TextStyle(
            fontSize: 14,
          ),
        ),

      ),


    );

  }
}

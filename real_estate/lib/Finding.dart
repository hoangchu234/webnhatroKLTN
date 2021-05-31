import 'dart:convert';
import 'dart:ui';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:real_estate/data.dart';
import 'package:real_estate/filter.dart';
import 'package:real_estate/detail.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'API.dart';

String dropdownValue = 'One';
class Find extends StatefulWidget {
  final String province;
  final String citi;
  final String endprice;
  final String startprice;
  final String idtype;
  // receive data from the FirstScreen as a parameter
  Find({Key key, @required this.province,@required this.citi,@required this.startprice,@required this.endprice,@required this.idtype}) : super(key: key);

  @override
  _FindState createState() => _FindState();
}

class _FindState extends State<Find> {

  List<Property> properties = new List<Property>();

  // Call API get dữ liệu và map vào list đối tượng Motel
  List<String> type_name = new List<String>();
  int typeFirst = 2;
  int typeChange = 0;
  _getType() async{
    API.getTypes().then((res) {
      setState(() {
        var jsRes = json.decode(utf8.decode(res.bodyBytes));
        List<dynamic> list = jsRes;
        for(int i=0;i<list.length;i++){
          Type p = new Type(list.elementAt(i)['id'],list.elementAt(i)['name'],list.elementAt(i)['details']);
          type_name.add(p.name.toString());
        }
      });
    });
  }

  _getMotel(int city, int province, int fisrtPirce, int endPrice, int type) async{
    API.getMotels(city,province,fisrtPirce,endPrice,type).then((res) {
      setState(() {
        if(this.typeFirst != this.typeChange){
          this.typeFirst = this.typeChange;
          if(properties.length != 0){
            properties = new List<Property>();
          }
          var jsRes = json.decode(utf8.decode(res.bodyBytes));
          List<dynamic> list = jsRes;
          for(int i=0;i<list.length;i++){
            List<dynamic> list_image =  list.elementAt(i)['images'];
            Property p = new Property(list.elementAt(i)['typemotel'], list.elementAt(i)['title'], list.elementAt(i)['price'],
              list.elementAt(i)['address'],list.elementAt(i)['phone'], list.elementAt(i)['numberBath'] , list.elementAt(i)['numberLiving'] , list.elementAt(i)['time'], list.elementAt(i)['description'],
              list_image.elementAt(0)['imageMotel'], list_image.elementAt(0)['imageMotel'],list.elementAt(i)['typeservice'], list.elementAt(i)['user']['hovaten'],list.elementAt(i)['user']['image'],[
                list_image.elementAt(0)['imageMotel'],
                list_image.elementAt(0)['imageMotel'],
                list_image.elementAt(0)['imageMotel'],
                list_image.elementAt(0)['imageMotel'],
                list_image.elementAt(0)['imageMotel'],
              ],);
            if(p.imageUser == null){
              p.imageUser = "https://i.pinimg.com/236x/16/b2/e2/16b2e2579118bf6fba3b56523583117f.jpg" ;
            }
            p.images = new List<String>();
            for(int j=0;j<list_image.length;j++){
              String temp = list_image.elementAt(j)['imageMotel'];
              p.images.add(temp);
            }
            properties.add(p);
            // print(p.toString());

          }

        }
      });
    });
  }
  @override
  void initState() {
    print(widget.citi + " " + widget.province + " " +  widget.startprice + " " + widget.endprice + " " + this.typeFirst.toString());
    this.typeFirst = int.parse(widget.idtype);
    _getMotel(int.parse(widget.citi), int.parse(widget.province), int.parse(widget.startprice), int.parse(widget.endprice), this.typeFirst);
    _getType();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        centerTitle: true,
        title: Text("Lọc tin",style:TextStyle( color: Colors.black,fontWeight: FontWeight.bold)),
        titleSpacing: 5,
        backgroundColor: Colors.white,


      ),
      body:
      Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.only(top: 10),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Container(
                    height:40,
                    child: Stack(
                      children: [
                        ListView(

                            physics: BouncingScrollPhysics(),
                            scrollDirection: Axis.horizontal,
                            children:buildFilter()
                        ),
                        Align(
                          alignment: Alignment.centerRight,
                          child: Container(
                            width: 28,
                            decoration: BoxDecoration(
                              gradient: LinearGradient(
                                begin: Alignment.centerRight,
                                end: Alignment.centerLeft,
                                colors: [
                                  Theme.of(context).scaffoldBackgroundColor,
                                  Theme.of(context).scaffoldBackgroundColor.withOpacity(0.0),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),


              ],
            ),
          ),

          Padding(
            padding: EdgeInsets.only(right: 12, left: 20, top: 12, bottom: 6),
            child: Row(
              children: [

                Text(
                  properties.length.toString(),
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(
                  width: 8,
                ),
                Text(
                  "Kết quả tìm thấy",
                  style: TextStyle(
                    fontSize: 16,
                  ),
                ),
                // Text(
                //   "citi" + widget.citi +"/province" + widget.province+"/"+ widget.startprice+ "/"+widget.endprice,
                //   style: TextStyle(
                //     fontSize: 16,
                //   ),
                // ),
                SizedBox(
                  width: 60,
                ),
                GestureDetector(
                  onTap: (){
                    _showBottomSheet();
                  },
                  child: Padding(
                    padding: EdgeInsets.only(left: 16, right: 24),
                    child: Text(
                      "Tìm kiếm nâng cao ",
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),

          Expanded(
            child: Container(
              padding: EdgeInsets.only(left:15, ),
              child: ListView(
                physics: BouncingScrollPhysics(),
                scrollDirection: Axis.vertical,
                children: buildProperties(),
              ),
            ),
          ),

        ],
      ),
    );
  }
  // Widget buildFilter(String filterName){
  //   return Container(
  //     padding: EdgeInsets.symmetric(horizontal: 12),
  //     margin: EdgeInsets.only(right: 12),
  //     decoration: BoxDecoration(
  //       borderRadius: BorderRadius.all(
  //         Radius.circular(5),
  //       ),
  //       border: Border.all(
  //         color: Colors.grey[300],
  //         width: 1,
  //       )
  //     ),
  //     child: Center(
  //       child: Text(
  //         filterName,
  //         style: TextStyle(
  //           fontSize: 16,
  //           fontWeight: FontWeight.bold,
  //         ),
  //       ),
  //     ),
  //   );
  // }
  List<Widget> buildFilter() {
    List<Widget> list = [];
    for (var i = 1; i < type_name.length; i++) {
      list.add(
          Container(

              child:  Container(
                padding: EdgeInsets.symmetric(horizontal: 0,),

                margin: EdgeInsets.only(right: 12),
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.all(
                      Radius.circular(5),
                    ),
                    border: Border.all(
                      color: Colors.grey[300],
                      width: 1,
                    )
                ),
                child: Center(
                  child: TextButton(
                    style: ButtonStyle(
                      foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                    ),
                    onPressed: () {
                      this.typeChange = i+1;
                      this._getMotel(0,0,-1,-1,this.typeChange);
                    },
                    child: Text(type_name[i],
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                      ),),
                  ),

                ),
              )
          )
      );
    }

    return list;
  }



  List<Widget> buildProperties(){
    List<Widget> list = [];
    var i=0;
    while(i < properties.length) {
      if(i + 1 > properties.length-1){
        list.add(
            Hero(
                tag: properties[i].frontImage,
                child: Container(
                    child: Row(
                        children:[
                          Container(
                              child:Column(
                                  children:[
                                    buildProperty(properties[i], i)]
                              )
                          ),
                        ]

                    )
                )
            )
        );
      }
      else{
        list.add(
            Hero(
                tag: properties[i].frontImage,
                child: Container(
                    child: Row(
                        children:[
                          Container(
                              child:Column(
                                  children:[
                                    buildProperty(properties[i], i)]
                              )
                          ),
                          Container(
                              child:Column(
                                  children:[
                                    Padding(
                                      padding: EdgeInsets.symmetric(horizontal:12, vertical: 6),
                                      child: buildProperty(properties[i+1], i+1),

                                    )]
                              )
                          ),
                        ]

                    )
                )
            )
        );
      }
      i = i + 2;
    }

    return list;

  }

  Widget buildProperty(Property property, int index){
    return GestureDetector(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => Detail(property: property)),
          );
        },
        child:Container(
          child: Row(
              children:[
                Container(

                  child:Column(
                      children:[
                        Padding(
                          padding: EdgeInsets.symmetric(horizontal: 0, vertical: 6),
                          child: Column(
                              children:[
                                Card(
                                  margin: EdgeInsets.only(bottom: 6),
                                  clipBehavior: Clip.antiAlias,
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.all(
                                      Radius.circular(15),
                                    ),
                                  ),

                                  child: Container(
                                    height: 130,
                                    width: 175,
                                    decoration: BoxDecoration(
                                      image: DecorationImage(
                                        // image: AssetImage(property.frontImage),
                                        image: NetworkImage(property.frontImage),
                                        fit: BoxFit.cover,
                                      ),
                                    ),
                                    child: Container(
                                      padding: EdgeInsets.all(6),
                                      decoration: BoxDecoration(
                                        gradient: LinearGradient(
                                          begin: Alignment.topCenter,
                                          end: Alignment.bottomCenter,
                                          colors: [
                                            Colors.transparent,
                                            Colors.black.withOpacity(0.7),
                                          ],
                                        ),
                                      ),
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Container(
                                            decoration: BoxDecoration(
                                              color: Colors.yellow[700],
                                              borderRadius: BorderRadius.all(
                                                Radius.circular(5),
                                              ),
                                            ),
                                            width: 80,
                                            padding: EdgeInsets.symmetric(vertical: 4,),
                                            child: Center(
                                              child: Text(
                                                property.typeService,
                                                style: TextStyle(
                                                  color: Colors.white,
                                                  fontSize: 14,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                              ),
                                            ),
                                          ),

                                          Expanded(
                                            child: Container(),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                              ]
                          ),
                        ),
                        Container(
                            width: 160,
                            margin: EdgeInsets.only(bottom: 12),
                            child:Column(
                                children:[
                                  Text(
                                    property.name,
                                    overflow: TextOverflow.ellipsis,
                                    maxLines: 2,
                                    style: TextStyle(
                                      color: Colors.black,
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  Container(
                                    height:12 ,
                                  ),
                                  Row(
                                    children: [
                                      Text(
                                        property.price + "Triều đồng",
                                        textAlign: TextAlign.right,
                                        style: TextStyle(
                                          color: Colors.black,
                                          fontSize: 10,
                                        ),
                                      ),
                                      Spacer(flex: 1,),
                                      Text(
                                        property.review ,
                                        textAlign: TextAlign.right,
                                        style: TextStyle(
                                          color: Colors.red,
                                          fontSize: 10,
                                        ),
                                      ),
                                    ],
                                  ),
                                  Container(
                                    height:12 ,
                                  ),
                                  Text(
                                    property.location,
                                    overflow: TextOverflow.ellipsis,
                                    style: TextStyle(
                                      color: Colors.black,
                                      fontSize: 10,
                                    ),
                                  ),

                                  // Row( mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  //   children: [
                                  //     DropdownButton<String>(
                                  //       value: dropdownValue,
                                  //       icon: const Icon(Icons.arrow_downward),
                                  //       iconSize: 24,
                                  //       elevation: 16,
                                  //       style: const TextStyle(color: Colors.deepPurple),
                                  //       underline: Container(
                                  //         height: 2,
                                  //         color: Colors.deepPurpleAccent,
                                  //       ),
                                  //       onChanged: (newValue) {
                                  //         setState(() {
                                  //           dropdownValue = newValue;
                                  //         });
                                  //       },
                                  //       items: <String>['One', 'Two', 'Free', 'Four','five','six','a','a','a','a','a','a','a','a','a','a','a','a','a','a']
                                  //           .map<DropdownMenuItem<String>>((String value) {
                                  //         return DropdownMenuItem<String>(
                                  //           value: value,
                                  //           child: Text(value),
                                  //         );
                                  //
                                  //       }).toList(),
                                  //
                                  //     )
                                  //
                                  //
                                  //
                                  //   ],)
                                ]
                            )

                        )
                      ]
                  ),),



              ]

          ),
        )
      // child: Column(
      //
      //    children: [
      //    Card(
      //     margin: EdgeInsets.only(bottom: 24),
      //     clipBehavior: Clip.antiAlias,
      //     shape: RoundedRectangleBorder(
      //       borderRadius: BorderRadius.all(
      //         Radius.circular(15),
      //       ),
      //     ),
      //
      //     child: Container(
      //       height: 210,
      //       decoration: BoxDecoration(
      //         image: DecorationImage(
      //           // image: AssetImage(property.frontImage),
      //           image: NetworkImage(property.frontImage),
      //           fit: BoxFit.cover,
      //         ),
      //       ),
      //       child: Container(
      //         padding: EdgeInsets.all(20),
      //         decoration: BoxDecoration(
      //           gradient: LinearGradient(
      //             begin: Alignment.topCenter,
      //             end: Alignment.bottomCenter,
      //             colors: [
      //                 Colors.transparent,
      //                 Colors.black.withOpacity(0.7),
      //             ],
      //           ),
      //         ),
      //         child: Column(
      //           crossAxisAlignment: CrossAxisAlignment.start,
      //           children: [
      //
      //
      //             Container(
      //               decoration: BoxDecoration(
      //                 color: Colors.yellow[700],
      //                 borderRadius: BorderRadius.all(
      //                   Radius.circular(5),
      //                 ),
      //               ),
      //               width: 80,
      //               padding: EdgeInsets.symmetric(vertical: 4,),
      //               child: Center(
      //                 child: Text(
      //                   "Cho " + property.label,
      //                   style: TextStyle(
      //                     color: Colors.white,
      //                     fontSize: 14,
      //                     fontWeight: FontWeight.bold,
      //                   ),
      //                 ),
      //               ),
      //             ),
      //
      //             Expanded(
      //               child: Container(),
      //             ),
      //
      //             Column(
      //               children: [
      //
      //                 Row(
      //                   mainAxisAlignment: MainAxisAlignment.spaceBetween,
      //                   children: [
      //
      //                     Text(
      //                       property.name,
      //                       style: TextStyle(
      //                         color: Colors.white,
      //                         fontSize: 18,
      //                         fontWeight: FontWeight.bold,
      //                       ),
      //                     ),
      //
      //                     Text(
      //                       "đ" + property.price,
      //                       style: TextStyle(
      //                         color: Colors.white,
      //                         fontSize: 18,
      //                         fontWeight: FontWeight.bold,
      //                       ),
      //                     ),
      //
      //                   ],
      //                 ),
      //
      //                 SizedBox(
      //                   height: 4,
      //                 ),
      //
      //                 Row(
      //                   mainAxisAlignment: MainAxisAlignment.spaceBetween,
      //                   children: [
      //
      //                     Row(
      //                       children: [
      //
      //                         Icon(
      //                           Icons.location_on,
      //                           color: Colors.white,
      //                           size: 14,
      //                         ),
      //
      //                         SizedBox(
      //                           width: 4,
      //                         ),
      //
      //                         Text(
      //                           property.location,
      //                           style: TextStyle(
      //                             color: Colors.white,
      //                             fontSize: 14,
      //                           ),
      //                         ),
      //
      //                         SizedBox(
      //                           width: 8,
      //                         ),
      //
      //                         Icon(
      //                           Icons.zoom_out_map,
      //                           color: Colors.white,
      //                           size: 16,
      //                         ),
      //
      //                         SizedBox(
      //                           width: 4,
      //                         ),
      //
      //                         Text(
      //                           property.sqm + " m²",
      //                           style: TextStyle(
      //                             color: Colors.white,
      //                             fontSize: 14,
      //                           ),
      //                         ),
      //
      //                       ],
      //                     ),
      //
      //                     Row(
      //                       children: [
      //
      //                         Icon(
      //                           Icons.star,
      //                           color: Colors.yellow[700],
      //                           size: 14,
      //                         ),
      //
      //                         SizedBox(
      //                           width: 4,
      //                         ),
      //
      //                         Text(
      //                           property.review + " ngày đăng",
      //                           style: TextStyle(
      //                             color: Colors.white,
      //                             fontSize: 14,
      //                           ),
      //                         ),
      //
      //                       ],
      //                     ),
      //
      //                   ],
      //                 ),
      //               ],
      //             ),
      //
      //           ],
      //         ),
      //       ),
      //     ),
      //   ),
      //      Container(
      //        margin: EdgeInsets.only(bottom: 44),
      //
      //        child:Text(
      //          property.name,
      //          style: TextStyle(
      //            color: Colors.black,
      //            fontSize: 18,
      //            fontWeight: FontWeight.bold,
      //          ),
      //        ),
      //      ),
      //    ],
      // ),

    );
  }


  void _showBottomSheet(){
    showModalBottomSheet(
        context: context,
        isScrollControlled: true,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(30),
            topRight: Radius.circular(30),
          ),
        ),
        builder: (BuildContext context){
          return Wrap(
            children: [
              Filter(),
            ],
          );
        }
    );
  }

}



import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:real_estate/data.dart';
import 'package:real_estate/filter.dart';
import 'package:real_estate/detail.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'API.dart';

String dropdownValue = 'One';
class Search extends StatefulWidget {
  @override
  _SearchState createState() => _SearchState();
}

class _SearchState extends State<Search> {

  List<Property> properties = new List<Property>();
  // List<Property> properties = getPropertyList();

  // List<Motel> motels = new List<Motel>();
  // List<MyData> myDatas = new List<MyData>();

  // Call API get dữ liệu và map vào list đối tượng Motel
  _getMotel() async{
    API.getMotels(0,0,0,0,0,2).then((res) {
      setState(() {
        var jsRes = json.decode(utf8.decode(res.bodyBytes));
        List<dynamic> list = jsRes;
        for(int i=0;i<list.length;i++){
          List<dynamic> list_image =  list.elementAt(i)['images'];
          Property p = new Property(list.elementAt(i)['typemotel'], list.elementAt(i)['title'], list.elementAt(i)['price'],
                                    list.elementAt(i)['address'],list.elementAt(i)['phone'], list.elementAt(i)['detail']['numberBath'] , list.elementAt(i)['detail']['numberLiving'] , list.elementAt(i)['time'], list.elementAt(i)['description'],
                                    list_image.elementAt(0)['imageMotel'], list_image.elementAt(0)['imageMotel'],[
            list_image.elementAt(0)['imageMotel'],
            list_image.elementAt(0)['imageMotel'],
            list_image.elementAt(0)['imageMotel'],
            list_image.elementAt(0)['imageMotel'],
            list_image.elementAt(0)['imageMotel'],
            ],);
          p.images = new List<String>();
          for(int j=0;j<list_image.length;j++){
            String temp = list_image.elementAt(j)['imageMotel'];
            p.images.add(temp);
          }
          properties.add(p);
          print(p.toString());
        }
      });
    });
  }
  @override
  void initState() {
    _getMotel();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        centerTitle: true,
        title: Text("Tìm kiếm nhà trọ",style:TextStyle( color: Colors.black,fontWeight: FontWeight.bold)),
        titleSpacing: 5,
        backgroundColor: Colors.white,
      ),
      body:
      Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Padding(
          //   padding: EdgeInsets.only(top: 10, left: 16, right: 16, bottom: 10),
          //   child: TextField(
          //     style: TextStyle(
          //       fontSize: 20,
          //       height: 1,
          //       color: Colors.black,
          //       fontWeight: FontWeight.bold,
          //     ),
          //     // decoration: InputDecoration(
          //     //   hintText: 'Tìm kiếm',
          //     //   hintStyle: TextStyle(
          //     //     fontSize: 20,
          //     //     color: Colors.grey[400],
          //     //   ),
          //     //   enabledBorder: UnderlineInputBorder(
          //     //     borderSide: BorderSide(color: Colors.grey[400]),
          //     //   ),
          //     //   focusedBorder: UnderlineInputBorder(
          //     //     borderSide: BorderSide(color: Colors.grey[400]),
          //     //   ),
          //     //   border: UnderlineInputBorder(
          //     //     borderSide: BorderSide(color: Colors.grey[400]),
          //     //   ),
          //     //   suffixIcon: Padding(
          //     //     padding: EdgeInsets.only(left: 16),
          //     //     child: Icon(
          //     //       Icons.search,
          //     //       color: Colors.grey[400],
          //     //       size: 28,
          //     //     ),
          //     //   ),
          //     // ),
          //   ),
          // ),

          Padding(
            padding: EdgeInsets.only(top: 10),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Container(
                    height: 32,
                    child: Stack(
                      children: [
                        ListView(
                          physics: BouncingScrollPhysics(),
                          scrollDirection: Axis.horizontal,
                          children: [
                            SizedBox(
                              width: 24,
                            ),
                            buildFilter("House"),
                            buildFilter("Price"),
                            buildFilter("Security"),
                            buildFilter("Bedrooms"),
                            buildFilter("Garage"),
                            buildFilter("Swimming Pool"),
                            SizedBox(
                              width: 8,
                            ),
                          ],
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

  Widget buildFilter(String filterName){
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 12),
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
        child: Text(
          filterName,
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }

  List<Widget> buildProperties(){
    List<Widget> list = [];
    for (var i = 0; i < properties.length; i++) {
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
      i++;
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
                                          "Cho " + property.label,
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
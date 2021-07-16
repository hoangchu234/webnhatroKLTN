import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/style.dart';
import 'package:real_estate/data.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:url_launcher/url_launcher.dart';
class Detail extends StatelessWidget {

  final Property property;

  Detail({@required this.property});


  void customLaunch(command) async{
    if(await canLaunch(command)){
      await launch(command);
    }else{
      print('could not launch $command');
    }
  }
  @override
  Widget build(BuildContext context) {
    CarouselSlider carouselSlider;
    int _current = 0;
    List<T> map<T>(List list, Function handler) {
      List<T> result = [];
      for (var i = 0; i < list.length; i++) {
        result.add(handler(i, list[i]));
      }
      return result;
    }

    Size size = MediaQuery.of(context).size;
    return Scaffold(
        appBar: AppBar(
            centerTitle: true,
            title: Text("Chi tiết tin",style:TextStyle( color: Colors.black,fontWeight: FontWeight.bold)),
        titleSpacing: 5,
        backgroundColor: Colors.white,
          leading: IconButton(
            icon: Icon(Icons.arrow_back_ios, color: Colors.black),
            onPressed: () => Navigator.of(context).pop()
          ),
        ),



      body: SingleChildScrollView(

        child:
        Column(
          mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[

              Padding(
                padding: const EdgeInsets.only(top: 4, left: 12, right: 12, bottom: 4),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    carouselSlider = CarouselSlider(
                      height: 200.0,
                      initialPage: 0,
                      enlargeCenterPage: true,
                      autoPlay: true,
                      reverse: false,
                      enableInfiniteScroll: true,
                      autoPlayInterval: Duration(seconds: 2),
                      autoPlayAnimationDuration: Duration(milliseconds: 2000),
                      pauseAutoPlayOnTouch: Duration(seconds: 10),
                      scrollDirection: Axis.horizontal,
                      // onPageChanged: (index) {
                      //   setState(() {
                      //     _current = index;
                      //   });
                      // },
                      items: property.images.map((imgUrl) {
                        return Builder(
                          builder: (BuildContext context) {
                            return Container(
                              width: MediaQuery.of(context).size.width,
                              margin: EdgeInsets.symmetric(horizontal: 10.0),
                              decoration: BoxDecoration(
                                color: Colors.green,
                              ),
                              child: Image.network(
                                imgUrl,
                                fit: BoxFit.fill,
                              ),
                            );
                          },
                        );
                      }).toList(),
                    ),
                    SizedBox(
                      height: 10,
                    ),
                    SizedBox(
                      height: 10.0,
                    ),

                  ],
                ),
              ),
              // name
              Padding(
                padding: EdgeInsets.only(left: 12, right: 12, top: 4, bottom: 4,),
                child: Container(

                  child: Column(
                    children:[
                      Text(
                        property.name,
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 20,
                        ),
                      ),
                       Row(
                         children: [
                           Padding(
                             padding: const EdgeInsets.only(left: 0, right: 6, top: 10, bottom: 4,),
                             child: Text(
                              "Giá nhà trọ : ",
                              style: TextStyle(
                                color: Colors.black,
                                fontSize: 16
                                ,
                              ),
                            ),

                           ),
                           Padding(
                             padding: const EdgeInsets.only(left: 0, right: 6, top: 10, bottom: 4,),
                             child: Text(
                               property.price + " triệu VND/phòng",
                               style: TextStyle(
                                 color: Colors.pink,
                                 fontSize: 16
                                 ,
                               ),
                             ),

                           ),
                         ],
                       ),
                    ]
                  ),
                ),
              ),
              //số phòng ngủ
              Padding(
                padding: EdgeInsets.only(right: 12, left: 12, bottom: 20,top:12),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    buildFeature(Icons.hotel, property.livingroom.toString() + " phòng ngủ"),
                    buildFeature(Icons.wc, property.bathroom.toString() + " phòng tắm"),
                    buildFeature(Icons.kitchen, "0 phòng bếp"),
                    buildFeature(Icons.local_parking, "0 đậu xe"),

                  ],
                ),
              ),
              //decription
              Padding(
                padding: EdgeInsets.only(right: 12, left: 20,top:12),
                child:Row(
                  children: [
                    Text(
                      "Mô tả chi tiết",
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 16,
                        fontWeight:FontWeight.bold,
                      ),
                    ),
                  ],
                )
              ),
              Padding(
                  padding: EdgeInsets.only(right: 12, left: 12, bottom: 12,),
                  child:Html(data:property.description,
                          style:{
                            "html": Style(
                              color: Colors.black,
                            ),
                          }),
              ),
              // hình ảnh nền và gọi điện
              Padding(
                padding: EdgeInsets.all(24),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Container(
                          height: 65,
                          width: 65,
                          decoration: BoxDecoration(
                            image: DecorationImage(
                              image: NetworkImage(property.imageUser),
                              fit: BoxFit.cover,
                            ),
                            shape: BoxShape.circle,
                          ),
                        ),
                        SizedBox(
                          width: 16,
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [

                            Text(
                              property.hovaten,
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            SizedBox(
                              height: 4,
                            ),
                            Text(
                              property.sqm,
                              style: TextStyle(
                                fontSize: 18,
                                color: Colors.grey[500],
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        // Column(children: <Widget>[
                        //   RaisedButton(onPressed: (){
                        //     customLaunch('tel:+0988187295');
                        //   },
                        //     child: Text('URL'),)
                        // ]),
                        Container(
                          height: 50,
                          width: 50,
                          decoration: BoxDecoration(
                            color: Colors.yellow[700].withOpacity(0.1),
                            shape: BoxShape.circle,
                          ),
                          child: Center(
                            child: IconButton(
                              icon: Icon(Icons.phone),
                              onPressed: (){
                                customLaunch('tel:+'+ property.sqm);
                              },
                              color: Colors.yellow[700],

                            ),
                          ),

                        ),
                        SizedBox(
                          width: 16,
                        ),
                        Container(
                          height: 50,
                          width: 50,
                          decoration: BoxDecoration(
                            color: Colors.yellow[700].withOpacity(0.1),
                            shape: BoxShape.circle,
                          ),
                          child: Center(
                            child: IconButton(
                              icon: Icon(Icons.message,),
                              onPressed: (){
                                customLaunch('sms:'+ property.sqm);
                              },
                              color: Colors.yellow[700],
                            ),
                          ),
                        ),
                      ],
                    ),

                  ],
                ),
              ),
              ]
        ),

      ),
    );
  }

  Widget buildFeature(IconData iconData, String text){
    return Column(
      children: [

        Icon(
          iconData,
          color: Colors.yellow[700],
          size: 28,
        ),

        SizedBox(
          height: 8,
        ),

        Text(
          text,
          style: TextStyle(
            color: Colors.grey[500],
            fontSize: 14,
          ),
        ),

      ],
    );
  }


}


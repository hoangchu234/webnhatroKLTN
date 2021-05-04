import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/style.dart';
import 'package:real_estate/data.dart';
import 'package:flutter_html/flutter_html.dart';
class Detail extends StatelessWidget {

  final Property property;

  Detail({@required this.property});

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
      // appBar: AppBar(
      //   centerTitle: true,
      //   title: Text("Trang chi tiết",style:TextStyle( color: Colors.black,fontWeight: FontWeight.bold)),
      //   titleSpacing: 5,
      //   backgroundColor: Colors.white,
      // ),


      body:SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
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
                              image: NetworkImage(property.ownerImage),
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
                              "James Milner",
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            SizedBox(
                              height: 4,
                            ),
                            Text(
                              "Property Owner",
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
                        Container(
                          height: 50,
                          width: 50,
                          decoration: BoxDecoration(
                            color: Colors.yellow[700].withOpacity(0.1),
                            shape: BoxShape.circle,
                          ),
                          child: Center(
                            child: Icon(
                              Icons.phone,
                              color: Colors.yellow[700],
                              size: 20,
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
                            child: Icon(
                              Icons.message,
                              color: Colors.yellow[700],
                              size: 20,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              Padding(
                padding: EdgeInsets.only(right: 24, left: 24, bottom: 24,),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    buildFeature(Icons.hotel, "3 Bedroom"),
                    buildFeature(Icons.wc, "2 Bathroom"),
                    buildFeature(Icons.kitchen, "1 Kitchen"),
                    buildFeature(Icons.local_parking, "2 Parking"),

                  ],
                ),
              ),
              //hình ảnh carousel
              Column(
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
                    height: 20,
                  ),
                  // Row(
                  //   mainAxisAlignment: MainAxisAlignment.center,
                  //   children: map<Widget>(property.images, (index, url) {
                  //     return Container(
                  //       width: 10.0,
                  //       height: 10.0,
                  //       margin: EdgeInsets.symmetric(vertical: 10.0, horizontal: 2.0),
                  //       decoration: BoxDecoration(
                  //         shape: BoxShape.circle,
                  //         color: _current == index ? Colors.redAccent : Colors.green,
                  //       ),
                  //     );
                  //   }),
                  // ),
                  SizedBox(
                    height: 20.0,
                  ),

                ],
              ),
              Padding(
                padding: EdgeInsets.only(left: 24, right: 24, top: 8, bottom: 16,),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [

                    Row(
                      children: [

                        Icon(
                          Icons.location_on,
                          color: Colors.black,
                          size: 16,
                        ),

                        SizedBox(
                          width: 4,
                        ),

                        Text(
                          property.location,
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),

                        SizedBox(
                          width: 8,
                        ),

                        Icon(
                          Icons.zoom_out_map,
                          color: Colors.black,
                          size: 16,
                        ),

                        SizedBox(
                          width: 4,
                        ),

                        Text(
                          property.sqm + " sq/m",
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),

                      ],
                    ),

                    Row(
                      children: [

                        Icon(
                          Icons.star,
                          color: Colors.yellow[700],
                          size: 16,
                        ),

                        SizedBox(
                          width: 4,
                        ),

                        Text(
                          property.review + " Reviews",
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),

                      ],
                    ),

                  ],
                ),
              ),
              Padding(
                  padding: EdgeInsets.only(right: 24, left: 24, bottom: 24,),
                  child:Html(data:property.description,
                          style:{
                            "html": Style(
                              backgroundColor: Colors.white,
                              color: Colors.black,
                            ),
                          }),
              ),
              ]
        ),

      ),
    //   bottomNavigationBar: BottomAppBar(
    //     child: Row(
    //
    //       children: [
    //         Row(
    //           children: [
    //             Container(
    //               height: 65,
    //               width: 65,
    //               decoration: BoxDecoration(
    //                 image: DecorationImage(
    //                   image: NetworkImage(property.ownerImage),
    //                   fit: BoxFit.cover,
    //                 ),
    //                 shape: BoxShape.circle,
    //               ),
    //             ),
    //             SizedBox(
    //               width: 16,
    //             ),
    //
    //           ],
    //         ),
    //         Row(
    //           children: [
    //             Container(
    //               height: 50,
    //               width: 50,
    //               decoration: BoxDecoration(
    //                 color: Colors.yellow[700].withOpacity(0.1),
    //                 shape: BoxShape.circle,
    //               ),
    //               child: Center(
    //                 child: Icon(
    //                   Icons.phone,
    //                   color: Colors.yellow[700],
    //                   size: 20,
    //                 ),
    //               ),
    //             ),
    //             SizedBox(
    //               width: 16,
    //             ),
    //             Container(
    //               height: 50,
    //               width: 50,
    //               decoration: BoxDecoration(
    //                 color: Colors.yellow[700].withOpacity(0.1),
    //                 shape: BoxShape.circle,
    //               ),
    //               child: Center(
    //                 child: Icon(
    //                   Icons.message,
    //                   color: Colors.yellow[700],
    //                   size: 20,
    //                 ),
    //               ),
    //             ),
    //           ],
    //         ),
    //       ],
    //     ),
    // )
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

  List<Widget> buildPhotos(List<String> images){
    List<Widget> list = [];
    list.add(SizedBox(width: 12,));
    for (var i = 0; i < images.length; i++) {
      list.add(buildPhoto(images[i]));
    }
    return list;
  }

  Widget buildPhoto(String url){
    return AspectRatio(
      aspectRatio: 3 / 2,
      child: Container(
        margin: EdgeInsets.only(right: 24),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.all(
            Radius.circular(10),
          ),
          image: DecorationImage(
            image: NetworkImage(url),
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }

}
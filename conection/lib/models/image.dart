class image{
  int id;
  String imageMotel;
  int motelId;

  image(int id, String imageMotel, int motelId){
    this.id = id;
    this.imageMotel = imageMotel;
    this.motelId = motelId;
  }

  image.fromJson(Map json)
      : id = json['id'],
        imageMotel = json['imageMotel'],
        motelId = json['motelId'];
}

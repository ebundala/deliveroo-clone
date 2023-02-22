export default `*[_type=='restaurant' && _id==$id]{
    _id,
    name,
    description,
    address,
    location,
    image,
    rating,
    "dishes":*[_type=="dishes"&&references(^._id)]{_id,name,description,image,price}
  }`
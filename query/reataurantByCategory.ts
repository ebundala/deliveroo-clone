export default `*[_type=='category' && _id == $id]{
    _id,
    name,
    description,    
    image,
    restaurants[]->{
      _id,
      image,     
      name,
      description,
      address,
      location,    
      rating,
      "dishes":*[_type=="dishes"&&references(^._id)]{_id,name,description,image,price}
    }
  }`
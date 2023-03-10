export default `*[_type=='promotion' && _id == $id]{
    _id,
    name,
    description,  
    restaurants[]->{
      _id,
      image,     
      name,
      description,
      address,
      location,    
      rating,
      "category":*[_type=="category" && references(^._id)][0].name,
      "dishes":*[_type=="dishes"&&references(^._id)]{_id,name,description,image,price}
    }
  }`
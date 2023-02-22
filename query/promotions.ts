export default `*[_type=='promotion']|order(name){
    _id,
    name, 
    description   
  }`
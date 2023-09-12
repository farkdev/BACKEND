class UserDto{
  constructor(user){
    this.email= user.email
    this.first_name= user.first_name
    this.role= user.role  
    this.last_connection= user.last_connection
  }
}

module.exports ={
  UserDto
}
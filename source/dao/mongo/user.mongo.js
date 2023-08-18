const { userModel } = require("./models/user.model");

class userDaoMongo {
    constructor() {
        this.userModel = userModel
    }


    get = async (limit=10, page=1)=> await this.userModel.paginate({ },{limit, page, lean: true})

    async getUser(email){
        try{
            return await this.userModel.findOne(email)
        }catch(err){
            return new Error(err)
        }
    }  
    async create (newUser){
        try {
            return await this.userModel.create(newUser)
    } catch (error){
        return new Error (error)
    }
    }
    
    async update(uid, userUpdate){
        return await this.userModel.findOneAndUpdate({_id: uid}, userUpdate)
    }

    async delete(uid){
        return await this.userModel.findOneAndDelete({_id: uid})
    }

    async updateUser(uid,currentDate){
        try {
            return await this.userModel.updateOne({ _id: uid }, { $set: { last_connection: currentDate } })
        } catch (error) {
            logger.error(error)
        }
    }
    
}

module.exports = userDaoMongo
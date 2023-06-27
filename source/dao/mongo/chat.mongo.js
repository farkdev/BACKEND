const { Message } = require('./models/message.model');


class ChatMongo {

  async saveMessage (user, message) {
    try{
      const newMessage = new Message({ 
        user,
        message,
      
      });
      await newMessage.save()
      console.log("Mensaje guardado")
      return newMessage
      }catch (err){
        console.log("error al guardar el mensaje en MongoDB",err)
        throw err
      }
    }



    // Para obtener todos los mensajes de la base de datos:
    async allMessages() {
      try{
        const messages = await Message.find({}).sort({ createdAt: 1 })
        console.log("Mensajes cargados desde MONGODB", messages)
        return messages
      } catch (err){
        console.log("error al cargar todos los mensajes desde MONGODB", err)
        throw err
      }
    }
}




module.exports = new ChatMongo()
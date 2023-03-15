    const {connect} = require('mongoose')

    const initConection = async ()=> {
        const url = "mongodb+srv://fdipietro01:Mongo01@cluster0.ik4waeo.mongodb.net/ecommerce?retryWrites=true&w=majority"
        try{
            console.log("Base conectada");
            return await connect(url)
        }
        catch(err){
            console.log(err)
            process.exit()
        }
    }

    module.exports = initConection

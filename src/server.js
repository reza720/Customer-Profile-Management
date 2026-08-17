import app from "./app.js";
import sequelize from "./config/sequelize.js";
import env from "./config/env.js";

( async() => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("DB connected");

    app.listen(env.server.port, ()=>{
        console.log("Server is Running");
    })
        
    }
    catch(err){
        console.error(err);
        process.exit(1);
    }
})();
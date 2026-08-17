import dotenv from "dotenv";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path:path.join(__dirname, "../../.env")
});

const env = {
    server:{
        port: process.env.PORT
    },
    db: {
        db_name:process.env.DB_NAME,
        db_user:process.env.DB_USER,
        db_password:process.env.DB_PASSWORD,
        db_host: process.env.DB_HOST
    },
    jwt:{
        accessToken: process.env.ACCESS_TOKEN
    }
};

export default env;




import { Sequelize } from "sequelize";
import env from "./env.js";

const sequelize = new Sequelize(
    env.db.db_name,
    env.db.db_user,
    env.db.db_password,{
        host: env.db.db_host,
        dialect: "mysql",
        logging: false
    }
);

export default sequelize;
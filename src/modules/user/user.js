import sequelize from "../../config/sequelize.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
    id:{
        type: DataTypes.INTEGER, 
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    lastName: {
        type:DataTypes.STRING,
        allowNull: false
    },
    userName: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    passwordHash: {
        type:DataTypes.STRING,
        allowNull: false
    },
    tokenVersion:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
},{
    timestamps: true,
    indexes:[
        {
            fields:["firstName", "lastName"]
        }
    ]
});

export default User;


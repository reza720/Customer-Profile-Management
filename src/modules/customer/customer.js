import sequelize from "../../config/sequelize.js";
import { DataTypes } from "sequelize";

const Customer = sequelize.define("Customer",{
    id: {
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
    photoURL: {
        type:DataTypes.STRING,
        allowNull:true
    },
    dateOfBirth:{
        type: DataTypes.DATE,
        allowNull: false
    },
    gender:{
        type:DataTypes.ENUM("Male", "Female"),
        allowNull: false
    }
},{
    timestamps: true,
    indexes:[
        {
            fields: ["firstName", "lastName"]
        }
    ]
});

export default Customer;
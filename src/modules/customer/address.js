import sequelize from "../../config/sequelize.js";
import { DataTypes } from "sequelize";
import Customer from "./customer.js";

const Address = sequelize.define("Address", {
    customerId:{
        type:DataTypes.INTEGER,
        primaryKey: true
    },
    province:{
        type:DataTypes.STRING,
        allowNull:false
    },
    district:{
        type: DataTypes.STRING,
        allowNull: false
    },
    area: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    timestamps: true
});

Customer.hasOne(Address, {foreignKey: "customerId", onDelete: "CASCADE"});
Address.belongsTo(Customer, {foreignKey: "customerId"});

export default Address;
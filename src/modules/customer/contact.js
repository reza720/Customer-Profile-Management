import sequelize from "../../config/sequelize.js";
import { DataTypes } from "sequelize";
import Customer from "./customer.js";

const Contact = sequelize.define("Contact", {
    customerId:{
        type:DataTypes.INTEGER,
        primaryKey: true
    },
    email: {
        type:DataTypes.STRING,
        allowNull: true
    },
    phoneNumber:{
        type:DataTypes.STRING,
        allowNull: false
    },
    whatsappNumber:{
        type:DataTypes.STRING,
        allowNull: true
    }
},{
    timestamps: true
});

Customer.hasOne(Contact, {foreignKey: "customerId", onDelete: "CASCADE"});
Contact.belongsTo(Customer, {foreignKey: "customerId"});

export default Contact;


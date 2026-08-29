import sequelize from "../../config/sequelize.js";
import { DataTypes } from "sequelize";
import User from "./User.js";

const Refresh_Token = sequelize.define("Refresh_Token", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    tokenHash:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    expiresAt:{
        type: DataTypes.DATE,
        allowNull: false
    },
    revokedAt:{
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true
});

User.hasMany(Refresh_Token, {foreignKey: "userId"});
Refresh_Token.belongsTo(User, {foreignKey: "userId"});

export default Refresh_Token;

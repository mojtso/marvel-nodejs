export default (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        }
    });

    return User;
};
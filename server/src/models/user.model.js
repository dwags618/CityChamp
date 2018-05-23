export default (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    minimumBet: {
      type: DataTypes.STRING,
      allowNull: false
    },
    maximumBet: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  });

  return User;
}

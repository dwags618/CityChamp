export default (sequelize, DataTypes) => {
  var Maps = sequelize.define('Maps', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    siteNumber: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    value: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surfaceType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zone: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Maps;
}

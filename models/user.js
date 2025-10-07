module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
  }, {
    tableName: 'users'
  });

  User.associate = (models) => {
    User.hasMany(models.Book, { foreignKey: 'userId', as: 'books' });
    User.hasMany(models.BookRequest, { foreignKey: 'requesterId', as: 'requests' });
  };

  return User;
};



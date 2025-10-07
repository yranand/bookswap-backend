module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    condition: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT }
  }, {
    tableName: 'books'
  });

  Book.associate = (models) => {
    Book.belongsTo(models.User, { foreignKey: 'userId', as: 'owner' });
    Book.hasMany(models.BookRequest, { foreignKey: 'bookId', as: 'requests' });
  };

  return Book;
};



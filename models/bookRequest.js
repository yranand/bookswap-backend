module.exports = (sequelize, DataTypes) => {
  const BookRequest = sequelize.define('BookRequest', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    bookId: { type: DataTypes.INTEGER, allowNull: false },
    requesterId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'accepted', 'declined'), defaultValue: 'pending' }
  }, {
    tableName: 'book_requests'
  });

  BookRequest.associate = (models) => {
    BookRequest.belongsTo(models.Book, { foreignKey: 'bookId', as: 'book' });
    BookRequest.belongsTo(models.User, { foreignKey: 'requesterId', as: 'requester' });
  };

  return BookRequest;
};



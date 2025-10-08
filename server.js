const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (e) {
    console.error('Failed to start server:', e.message);
    process.exit(1);
  }
}

start();



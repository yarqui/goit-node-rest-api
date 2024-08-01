import { Sequelize } from "sequelize";

const {
  DATABASE_DIALECT,
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
} = process.env;

const sequelize = new Sequelize({
  dialect: DATABASE_DIALECT,
  database: DATABASE_NAME,
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  dialectOptions: {
    ssl: true,
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful.");
    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database.\n Error:", error.message);
    process.exit(1);
  }
};

export { sequelize, connectDB };

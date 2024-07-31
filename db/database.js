import { Sequelize } from "sequelize";

const { HOST, USER, PASSWORD, DB } = process.env;

const sequelize = new Sequelize(
  `postgresql://${USER}:${PASSWORD}@${HOST}/${DB}`,
  {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

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

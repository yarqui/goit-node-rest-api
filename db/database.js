import { Sequelize } from "sequelize";

const HOST = "dpg-cqjcig8gph6c73956vhg-a.frankfurt-postgres.render.com";
const USER = "yar";
const PASSWORD = "YLSnJQeOiGQkZWQMpLdllu28VOTkYEUm";
const DB = "dbcontacts_v7ln";

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

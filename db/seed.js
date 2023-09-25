const dotenv = require('dotenv')

dotenv.config();
const {runQuery} = require("../src/config/database.config");
const bcrypt = require("bcrypt");

const { admin_firstName: firstName, admin_lastName: lastName, admin_email: email, admin_pwd: password, admin_phone: phone_number } = process.env;
const addAdmin = `
  INSERT INTO users(
    first_name,
    last_name,
    phone_number,
    email,
    password,
    role
  )
  VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, first_name, last_name, email, role, created_at`;

const saltRounds = 12;
const hash = bcrypt.hashSync(password, saltRounds);
  const run = () => {
      console.log("ready to seed in super admin...")
      const response = runQuery(addAdmin, [firstName, lastName, phone_number, email, hash, "super_admin"]).then(() => {
          console.log("seeding completed with no issues.🎉...")
          process.exit(0);
      }).catch((e) => {
          console.log("Error", e.message)
          process.exit(1);

      });
  }
run();
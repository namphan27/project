import mysql from "mysql2/promise";

export async function connectDB() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "fullstack_k16_movie",
    password: "123456",
    port: 3306,
  });

  return connection;
}
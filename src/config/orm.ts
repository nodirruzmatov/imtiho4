import { DataSource } from "typeorm";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

export default new DataSource({
  type: "postgres",
  host: "kandula.db.elephantsql.com",
  port: 5432,
  username: "xxabnoax",
  password: "G6O2TqfCxndF6bjZaYLiVFBfUTF3p3Wg",
  database: "xxabnoax",
  entities: [path.join(__dirname, "..", "entities", "*.{ts,js}")],
  migrations: [path.join(__dirname, "..", "migrations", "*.{ts,js}")],
  logging: true,
  synchronize: false,
});
`postgres://xxabnoax:G6O2TqfCxndF6bjZaYLiVFBfUTF3p3Wg@kandula.db.elephantsql.com/xxabnoax`;

`
postgres://xxabnoax:G6O2TqfCxndF6bjZaYLiVFBfUTF3p3Wg@kandula.db.elephantsql.com/xxabnoax
`;

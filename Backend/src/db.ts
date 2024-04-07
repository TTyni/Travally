import fs, { WriteStream } from "fs";
import pg from "pg";
import https from "https";

const { PG_HOST, PG_PORT, PG_USERNAME, PG_PASSWORD, PG_DATABASE } = process.env;
const url: string = "https://ts2.x1.europe.travian.com/map.sql";
const worldName: string = "EU2";

const pool = new pg.Pool({
  host: PG_HOST,
  port: Number(PG_PORT),
  user: PG_USERNAME,
  password: String(PG_PASSWORD),
  database: PG_DATABASE,
});

const downloadMap = () => {
  https.get(url, (res) => {
    const path: string = `${__dirname}/map.sql`;
    const filePath: WriteStream = fs.createWriteStream(path);
    res.pipe(filePath);
    filePath.on('finish', () => {
      filePath.close();
      console.log('Download Completed');
    })
  })
};

//fills the main x_world table with data from map.sql
const readMap = () => {
  const fullFile = fs.readFileSync("./map.sql", "utf8");
  const convertedFile = fullFile.replaceAll("`", "");
  const allLines = convertedFile.split(/\r\n|\n/);

  allLines.forEach((line) => {
    executeQuery(line);
  });
};

//creates Tables
const createTables = () => {
  const createMapTable = `
  CREATE ${worldName} (
    fieldID integer, 
    X smallint, 
    Y smallint, 
    tid smallint, 
    vid integer,
    villagename varchar(255), 
    PlayerID integer, 
    playername varchar(255), 
    AllianceID integer,
    Alliance varchar(255), 
    Population integer, 
    Region varchar(255), 
    Capital boolean, 
    City boolean, 
    Harbor boolean, 
    VictoryPoints integer
  );`;

  const createUserTable = `
  CREATE users (
    username varchar(255),
    passwordhash varchar(255)
  );`;

  const createTagsTable = `
  CREATE tags (
    fieldID integer,
    off boolean,
    def boolean,
    target boolean
  );`;

  const createSpeedModifiersTable = `
  CREATE speedModifiers (
    fieldID integer,
    artefactMultiplier: integer,
    offhandMultiplier: integer,
    bootsMultiplier: integer,
    tournamentSquareLevel: integer,
  );`;

  executeQuery(createMapTable);
  executeQuery(createUserTable);
  executeQuery(createTagsTable);
  executeQuery(createSpeedModifiersTable);
};

const executeQuery = async (query: string, parameters?: Array<any>) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, parameters);
    return result;
  } catch (error: any) {
    console.error(error.stack);
    error.name = "dbError";
    throw error;
  } finally {
    client.release();
  }
};

export default { readMap, executeQuery, createTables, downloadMap };

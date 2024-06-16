import fs, { WriteStream } from "fs";
import https from "https";
import { PrismaClient } from "@prisma/client";

const url: string = "https://ts2.x1.europe.travian.com/map.sql";

const prisma = new PrismaClient();

export const downloadMap = async () => {
  https.get(url, (res) => {
    const path: string = "./map.sql";
    const filePath: WriteStream = fs.createWriteStream(path);
    res.pipe(filePath);
    filePath.on('finish', () => {
      filePath.close();
      console.log('Download Completed');
    })
  })
};

export const executeSqlFile = async () => {
  try {
    const fullFile = fs.readFileSync("./map.sql", "utf8");
    const convertedFile = fullFile.replaceAll("`", "");
    const allLines = convertedFile.split(/\r\n|\n/);

    allLines.forEach(async (line) => {
      const test = line.replaceAll(";", " ON CONFLICT(fieldid) DO NOTHING;");
      await prisma.$executeRawUnsafe(test);
    });

    console.log('SQL file executed successfully.');
  } catch (error) {
    console.error('Error executing SQL file:', error);
  } finally {
    await prisma.$disconnect();
  }
}




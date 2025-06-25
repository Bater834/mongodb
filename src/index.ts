import express, { Request, Response } from "express";
import { Db, MongoClient } from "mongodb";
import "dotenv/config";
export let db: Db;
const app = express();
const port = 4201;
const connectDb = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI!);
    await client.connect();
    db = client.db("test");
    console.log("Database connected");
    return client;
  } catch (error) {
    return error;
  }
};

app.get("/bbc", async (req: Request, res: Response) => {
  // tuhain db d baigaa collectioniig bichej ogno
  const responses = db.collection("users").find();

  // response array bolgoj huwirgana.
  const users = await responses.toArray();

  res.json(users);
});

app.get("/", (req, res) => {
  res.send("as");
});
app.get("/home", (req, res) => {
  res.send("awm");
});

app.listen(port, async () => {
  await connectDb();
  console.log(`Example app listening on port http://localhost:${port}`);
});

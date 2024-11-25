import { MongoClient } from "mongodb";

export default async (uri: any): Promise<any> => {
  // @ts-ignore
  const client = new MongoClient(uri);
  await client.connect();
  return client;
};
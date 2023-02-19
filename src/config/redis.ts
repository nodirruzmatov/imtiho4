import { createClient } from "redis";

export const redis = async () => {
  try {
    const client = createClient({
      url: "redis://127.0.0.1:6379",
    });

    client.on("error", (err): void => console.log(err));

    await client.connect();

    return client;
  } catch (err: unknown) {
    console.log(err);
  }
};

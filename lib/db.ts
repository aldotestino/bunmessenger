import { Database } from "bun:sqlite";
import { Message } from "../models/message";

class MessagesDB {
  db: Database;

  constructor() {
    this.db = new Database("messages.sqlite");
    this.db.run(
      "CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, author TEXT, body TEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
    );
  }

  find(): Array<Message> {
    return this.db.query("SELECT * FROM messages").all();
  }

  create(newMessage: Partial<Message>) {
    this.db.run("INSERT INTO messages (author, body) VALUES ($author, $body)", {
      $author: newMessage.author,
      $body: newMessage.body
    });
  }
}

export const messageDB = new MessagesDB();



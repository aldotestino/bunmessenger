import * as router from "./router";
import { messageController } from "./controllers/messageController";

const PORT = Number(process.env.PORT || 4000);
console.log(`🍔 Server started at http://localhost:${PORT}`);

messageController();

export default {
  port: PORT,
  fetch: async (req: Request) => await router.handle(req)
}

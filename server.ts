import router from "./router";
import todoController from "./controllers/messageController";

const PORT = Number(process.env.PORT ?? 3000);
console.log(`🍔 Server started at http://localhost:${PORT}`);

todoController();

export default {
  port: PORT,
  fetch: async (req: Request) => await router.handle(req)
}

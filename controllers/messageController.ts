import { Message } from "../models/message";
import router from "../router";
import { messageDB } from "../lib/db";
import * as qs from 'node:querystring';

const messageElement = (message: Message) => `
  <div class="p-4 rounded-lg bg-gray-800 space-y-1">
    <h3 class="text-xl text-indigo-400 font-bold">${message.author}</h3>
    <p>${message.body}</p>
    <div class="flex justify-end">
      <small class="text-gray-400">${message.createdAt}</small>
    </div>
  </div>
`

export default () => {

  router.post("/message", async (req) => {
    const newMessage = qs.parse(await req.text());
    messageDB.create(newMessage);

    return Response.redirect("/");
  })

  router.get("/", (_) => {

    const messages = messageDB.find();

    return new Response(
      `
      <html>
        <head>
          <title>Bun Messenger</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-900 text-white min-h-screen overflow-hidden">
          <header class="flex sticky top-0 w-full bg-gray-900 justify-center p-2 shadow-md">
            <h1 class="text-2xl">Bun Messenger</h1>
          </header>
          <main style="height: calc(100vh - 112px)" class="space-y-2 px-2 overflow-auto">
            ${messages.map(m => messageElement(m)).join().replaceAll(",", "")}
          </main>
            <footer class="fixed bottom-0 w-full">
              <form accept-charset="utf-8" class="p-2 bg-gray-900 flex space-x-2 mb-0" action="/message" method="post">
               <input required type="text" name="author" placeholder="Author" class="w-2/5 transition focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none bg-transparent py-2 px-4 text-lg placeholder-gray-500 shadow-md border-2 border-gray-500 rounded-lg"">
               <input required type="text" name="body" placeholder="Message" class="w-3/5 transition focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none bg-transparent py-2 px-4 text-lg placeholder-gray-500 shadow-md border-2 border-gray-500 rounded-lg">
               <button type="submit" class="w-full md:space-x-2 flex items-center justify-center text-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition whitespace-nowrap py-2 px-4 text-lg bg-indigo-500 rounded-lg w-auto hover:bg-indigo-600 focus:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-gray-900 shadow-md focus:ring-offset-2 focus:ring-indigo-400">
                 <span class="hidden md:block">Send</span>
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
                 </svg>
               </button>
             </form>
           </footer>
        </body>
      </html>
      `,
      {
        headers: {
          "Content-Type": "text/html"
        }
      }
    );
  });
}

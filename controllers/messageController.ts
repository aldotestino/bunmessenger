import { Message } from "../models/message";
import * as router from "../router";
import { messageDB } from "../lib/db";
import * as qs from 'node:querystring';

const messageElement = (message: Message) => `
  <div class="p-4 rounded-lg bg-gray-800 space-y-1">
    <div class="flex space-x-2">
      <img class="w-12 h-12" src="https://avatars.dicebear.com/api/personas/${message.author}.svg" alt="profile-pic">
      <div class="w-full space-y-1">
        <h3 class="text-xl text-indigo-400 font-bold">${message.author}</h3>
        <p>${message.body}</p>
      </div>
    </div>
    <div class="flex justify-end">
      <small class="text-gray-400">${message.createdAt}</small>
    </div>
  </div>
`

export function messageController() {

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
          <header class="sticky top-0 w-full bg-gray-900 shadow-md">
            <div class="w-full max-w-2xl p-2 flex justify-between mx-auto">
              <div></div>  
              <h1 class="text-2xl text-center">Bun Messenger</h1>
              <a href="https://github.com/aldotestino/bunmessenger" target="_blank">
                <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true">
                  <path fill="white" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
              </a>
            </div>
          </header>
          <div class="w-full max-w-2xl mx-auto">
            <main style="height: calc(100vh - 112px)" class="space-y-2 p-2 overflow-auto">
              ${messages.map(m => messageElement(m)).join().replaceAll(",", "")}
            </main>
            <footer class="sticky bg-gray-900 p-2 bottom-0 w-full">
              <form accept-charset="utf-8" class="flex space-x-2 mb-0" action="/message" method="post">
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
          </div>
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

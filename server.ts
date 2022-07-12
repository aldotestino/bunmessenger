const PORT = Number(process.env.PORT ?? 3000);

console.log(`🍔 Server started at http://localhost:${PORT}`);

export default {
  port: PORT,
  fetch(req: Request) {
    return new Response(
      `
      <html>
        <head>
            <title>
                TRYBUN
            </title>
        </head>
        <body>
            <h1>This is BUN</h1>
            <p>
                Server time: ${new Date()}
            </p>
        </body>
      </html>
      `,
      {
        headers: {
          "Content-Type": "text/html"
        }
      }
    )
  }
}

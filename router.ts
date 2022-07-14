const routes = {
  'GET': {},
  'POST': {}
};

function handle(req: Request): Response | Promise<Response> {
  const endpoint = req.url.substring(21);
  try {
    if(routes[req.method][endpoint]) {
      return routes[req.method][endpoint](req);
    }else {
      return new Response("", { status: 404 });
    }
  }catch (e: any) {
    console.log(e);
  }
}

export default {
  handle,
  get: (url: string, action: (Request) => Response | Promise<Response>) => {
    routes['GET'][url] = action
  },
  post: (url: string, action: (Request) => Response | Promise<Response>) => {
    routes['POST'][url] = action
  }
}


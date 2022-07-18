const routes = {
  'GET': {},
  'POST': {}
};

export function handle(req: Request): Response | Promise<Response> {
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

export function get(url: string, action: (Request) => Response | Promise<Response>) {
  routes['GET'][url] = action
}

export function post(url: string, action: (Request) => Response | Promise<Response>) {
  routes['POST'][url] = action
}

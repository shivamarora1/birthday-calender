export const config = {
    matcher: '/api/(.*)'
}
function isAuthenticated(req: Request) {
  return req.headers.get("Api-Key") == process.env.API_KEY;
}

export function middleware(request: Request) {
  if (!isAuthenticated(request)) {
    return Response.json({ message: "Not OK" }, { status: 401 });
  }
}

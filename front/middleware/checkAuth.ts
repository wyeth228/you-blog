export default function (context: any) {
  const isServer = process.server;

  if (!process.server) return;

  const { cookie } = context.req.headers;

  if (!cookie || !cookie.includes("auth_type"))
    context.redirect("/auth/signin");
}

import { withAuth } from "next-auth/middleware";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type PipelineMiddlewaresProps = (
  request: NextRequest | any,
  ...rest: any
) => Promise<NextResponse | void | undefined | any> | any;

const originsList = ["http://localhost:3000"];

export async function coresMiddleware(request: NextRequest) {
  const response = NextResponse.next();

  const origin = headers().get("origin");

  console.log("origin: ", origin);

  if (!originsList.includes(origin!)) {
    return NextResponse.redirect("/");
  }
  // response.headers.append("Access-Control-Allow-Origin", origin!);
  // response.headers.append("Access-Control-Allow-Credentials", "true");
  // response.headers.append(
  //   "Access-Control-Allow-Methods",
  //   "GET,DELETE,PATCH,POST,PUT"
  // );
  // response.headers.append(
  //   "Access-Control-Allow-Headers",
  //   "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  // );

  return response;
}

export function pipelineMiddlewares(middlewares: PipelineMiddlewaresProps[]) {
  return async function middlewareHandler(request: NextRequest) {
    for (const middleware of middlewares) {
      const response = await middleware(request);

      if (response) {
        return response;
      }
    }
  };
}

export default pipelineMiddlewares([
  withAuth({
    pages: {
      signIn: "/register",
    },
  }),
]);

export const config = {
  matcher: ["/create-topic", "/edit-topic/:path*", "/dashboard/:path*"],
};

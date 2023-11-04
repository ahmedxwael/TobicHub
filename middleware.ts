import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

type PipelineMiddlewaresProps = (
  request: NextRequest | any,
  ...rest: any
) => Promise<NextResponse | void | undefined | any> | any;

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

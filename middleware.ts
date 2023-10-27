import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/register",
  },
});

export const config = {
  matcher: ["/create-topic", "/edit-topic/:path*"],
};

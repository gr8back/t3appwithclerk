import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";


// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware


export default authMiddleware({

  // if the user is not signed in redirect them to the sign in page.
  afterAuth(auth, req, evt) {
    console.log("req url is " + JSON.stringify(req.url))
    console.log("ispublicroute " + JSON.stringify(auth.isPublicRoute))
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      console.log("not logged in back to main page")
      return redirectToSignIn({ returnBackUrl: 'http://127.0.0.1:3000' });
    }
  },
  debug: true,
    publicRoutes: ["/", "/sign-in", "/sign-up", "/api/trpc/example.hello(.*)"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};


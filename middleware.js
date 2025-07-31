// import { clerkMiddleware, auth } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };


import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};


// eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18yenhjMUk0dzZTT2xNbFoxc0dqblIxaGxXZ0siLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJleHAiOjE3NTM2ODU3NTIsImZlYSI6InU6YXJ0aWNsZV9nZW5lcmF0aW9uLHU6YmFja2dyb3VuZF9yZW1vdmVyLHU6aW1hZ2VfZ2VuZXJhdGlvbix1Om9iamVjdF9yZW1vdmVyLHU6cmVzdW1lX2FuYWx5emVyLHU6dGl0bGVfZ2VuZXJhdGlvbiIsImZ2YSI6WzI1OTcsLTFdLCJpYXQiOjE3NTM2ODU2OTIsImlzcyI6Imh0dHBzOi8vdW5pdGVkLWFsYmFjb3JlLTgzLmNsZXJrLmFjY291bnRzLmRldiIsIm5iZiI6MTc1MzY4NTY4MiwicGxhIjoidTpwcmVtaXVtIiwic2lkIjoic2Vzc18zMFBXbmpDalV2THlsTHJWSzA4WGNramk2RXgiLCJzdWIiOiJ1c2VyXzMwUFduajA0RUpqaDJIdURXQzR4QmJLT0xWbiIsInYiOjJ9.DvrfxLuT2qaUgX1lMNl7V1TIlrN1eiGIP4PhMQRzwx5S_DpKm_WKXt7w2VWV8U8dTHW-JVFiOjWrQOXkxGz66HeQNPZpOQ4JdwEyJItz5CUzbbHlcNaBgoLk2XsYmzLy5yUQZiuKGmRp8gTxEEuHmF0O-7T-apWluAkXVCSms5krjFmhOe6pSOIV1XJsJMwByd-EmNze1-mYovmL2VWHN03TqRGlGMNlEAkODXm3LgAJv9BWYZvHrBC8J_R36DBxTFMJFzFI0y1IV3VsfrGo7TSH3zFxf0jsiqQTVP-T8qrtyQhdKyP4gtHPBuWupgdlxA1ND0YAqtKJJliFlG8cyA

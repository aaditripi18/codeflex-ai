import type { AuthConfig } from "convex/server";

const authConfig: AuthConfig = {
  providers: [
    {
      domain: process.env.CLERK_ISSUER_URL!,
      applicationID: "convex",
    },
  ],
};

export default authConfig;

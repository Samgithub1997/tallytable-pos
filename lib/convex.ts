import { ConvexHttpClient } from "convex/browser";

// Create a singleton instance of the Convex HTTP client
export const getConvexClient = () => {
  return new ConvexHttpClient(process.env.EXPO_PUBLIC_CONVEX_URL!);
};

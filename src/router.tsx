import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import RootLayout from "@/components/layout/RootLayout";
import PlayingPage from "@/pages/Playing";
import ShopPage from "@/pages/Shop";
import GameOverPage from "@/pages/GameOver";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: PlayingPage,
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  component: ShopPage,
});

const gameOverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/game-over",
  component: GameOverPage,
});

const routeTree = rootRoute.addChildren([indexRoute, shopRoute, gameOverRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

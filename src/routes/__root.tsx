import { Outlet, createRootRoute } from "@tanstack/react-router";
import { CartProvider } from "../hooks/useCart";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <CartProvider>
      <Outlet />
    </CartProvider>
  );
}

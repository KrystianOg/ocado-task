import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

/**
 *  - [ ] - display items with quantity selector, item total
 *  - [ ] - edit quantity, remove item
 *  - [ ] - shows subtotal and total
 *  - [ ] - links to product list and order summary
 */
function CartPage() {
  return <div>Hello "/cart"!</div>;
}

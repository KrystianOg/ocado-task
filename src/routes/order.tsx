import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/order")({
  component: OrderSummaryPage,
});

/**
 *  - [ ] - read-only view of cart
 *  - [ ] - final total + itemized list
 *  - [ ] - "Place Order" button
 *  - [ ] - Link back to cart
 */
function OrderSummaryPage() {
  return <div>Hello "/order"!</div>;
}

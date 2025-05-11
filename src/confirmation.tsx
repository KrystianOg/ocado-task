import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { findOrder } from "./utils/order";
import { formatPrice } from "./utils/formatting";

// TODO: extract to constants dir
function Component() {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("orderId");

  if (!orderId) {
    throw new Error("No such order");
  }

  const order = findOrder(orderId);

  if (!order) {
    throw new Error("No such order");
  }

  return (
    <div>
      <h1>Page goes here</h1>
      <hr />
      <h2>Zamowienie zostalo zone pomyślnie</h2>
      <p>{order.id}</p>
      <ul>
        {order.items.map((item) => (
          <li key={item.id}>
            <p>{formatPrice(item.price)}</p>
            <p>{item.quantity}</p>
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Component />
  </StrictMode>,
);

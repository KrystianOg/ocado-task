import { formatPrice } from "../utils/formatting";
import { findOrder } from "../utils/order";
import "../assets/confirmation.css";

export function ConfirmationPage() {
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
    <div className="order-container">
      <h1>Zamówienie zostało złożone pomyślnie</h1>

      <hr />

      <h2>Szczegóły zamówienia:</h2>

      <span>
        ID: <strong>{order.id}</strong>
      </span>
      <ul className="order-items">
        {/* TODO: change to table*/}
        <li>
          <p>Nawa</p>
          <p>Cena</p>
          <p>Ilość</p>
        </li>
        {order.items.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
            <p>{formatPrice(item.price)}</p>
            <p>{item.quantity}</p>
          </li>
        ))}
      </ul>

      <a href="/products" className="back-to-products">
        Wróć do produktów
      </a>
    </div>
  );
}

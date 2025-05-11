import { createFileRoute } from "@tanstack/react-router";
import { LocalStorageKeys } from "../constants";
import { Order } from "../utils/order";
import { useStorage } from "../hooks/useStorage";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const links = [
    {
      href: "/products",
      name: "Produkty",
    },
    {
      href: "/cart",
      name: "Koszyk",
    },
  ];

  const [orders] = useStorage<Order[]>(
    window.localStorage,
    LocalStorageKeys.ORDERS,
    [],
  );

  return (
    <div>
      <header>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.name}</a>
            </li>
          ))}
        </ul>
      </header>
      <main>
        <hr />
        <h1>Orders</h1>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <a href={`/confirmation?orderId=${order.id}`}>
                Order: {order.id}
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

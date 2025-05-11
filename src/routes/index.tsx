import { createFileRoute, Link } from "@tanstack/react-router";
import { LocalStorageKeys } from "../utils/storageUtil";
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
              <Link to={link.href}>{link.name}</Link>
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
              <a href={`/confirmation?orderId=${order.id}`}>{order.id}</a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Product } from "../types";

export const Route = createFileRoute("/products")({
  component: ProductsList,
});

/**
 *  - [ ] load static products
 *  - [ ] Each product has name, price, “Add to Cart” button
 *  - [ ] Navigation link to /cart
 */
function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/products.json").then(async (res) => {
      const json = (await res.json()) as Product[];
      setProducts(json);
    });
  }, []);

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <article>
            <p>{product.id}</p>
            <p>{product.name}</p>
            <p>
              {product.price.main} {product.price.fractional}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}

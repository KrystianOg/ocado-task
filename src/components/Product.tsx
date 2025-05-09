import type { Product as ProductType } from "../types";
import { formatPrice } from "../utils/formatting";

// FIXME:
// eslint-disable-next-line
interface ProductProps extends ProductType { }

export function Product({ id, name, price }: ProductProps) {
  return (
    <div data-id={id}>
      {name}
      {formatPrice(price)}
    </div>
  );
}

import { Option } from "@config/types";

const options: Option[] = [
  { key: "USD", value: "USD" },
  { key: "RUB", value: "RUB" },
  { key: "EUR", value: "EUR" },
  { key: "AED", value: "AED" },
];
export default options;

type currencyIconTypes = {
  usd: string,
  eur: string,
  jpy: string,
  rub: string,
}

export const currencyIcon: currencyIconTypes = {
  usd: "$",
  eur: "€",
  jpy: "¥",
  rub: "₽",
};

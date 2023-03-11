import { Option } from "@config/types";

const options: Option[] = [
  { key: "USD", value: "USD" },
  { key: "RUB", value: "RUB" },
  { key: "EUR", value: "EUR" },
  { key: "AED", value: "AED" },
];
export default options;

export const currencyIcon: any = {
  usd: "$",
  eur: "€",
  jpy: "¥",
  rub: "₽",
};

type currencyIconList = {
  usd: string;
  eur: string;
  jpy: string;
  rub: string;
};

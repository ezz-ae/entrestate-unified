export type RoutedModel = "flash" | "pro" | "vision";

export function routeModel(input: { text: string; hasImage?: boolean }): RoutedModel {
  if (input.hasImage) return "vision";
  const t = input.text.toLowerCase();
  if (/\b(compare|pdf|report|analy[sz]e|valuation|plan)\b/.test(t)) return "pro";
  return "flash";
}

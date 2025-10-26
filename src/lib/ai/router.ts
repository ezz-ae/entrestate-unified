export type RoutedModel = "flash" | "pro" | "vision";
export function routeModel(input: { text: string; hasImage?: boolean }): RoutedModel {
  if (input.hasImage) return "vision";
  const t = (input.text || "").toLowerCase();
  if (/(compare|pdf|report|analy[sz]e|valuation|plan)/.test(t)) return "pro";
  return "flash";
}

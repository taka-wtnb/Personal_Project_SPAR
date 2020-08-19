export const OTD_Line_CHART_MONTHS = 'OTD_Line_CHART_MONTHS';

export function selectMonths(months) {
  return {
    type: OTD_Line_CHART_MONTHS,
    payload: months,
  };
}
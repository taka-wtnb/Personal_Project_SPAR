export const OTD_LINE_CHART_MONTHS = 'OTD_LINE_CHART_MONTHS';

export function selectMonths(months) {
  return {
    type: OTD_LINE_CHART_MONTHS,
    payload: months,
  };
}
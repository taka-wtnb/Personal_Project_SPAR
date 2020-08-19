export const OTD_PIE_CHART_MONTHS = 'OTD_PIE_CHART_MONTHS';

export function selectMonths(months) {
  return {
    type: OTD_PIE_CHART_MONTHS,
    payload: months,
  };
}
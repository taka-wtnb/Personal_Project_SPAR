export const DASHBOARD_OTD_CHART_MONTHS = 'DASHBOARD_OTD_CHART_MONTHS';

export function selectMonths(months) {
  return {
    type: DASHBOARD_OTD_CHART_MONTHS,
    payload: months,
  };
}
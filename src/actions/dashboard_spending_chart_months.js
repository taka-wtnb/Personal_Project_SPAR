export const DASHBOARD_SPENDING_CHART_MONTHS = 'DASHBOARD_SPENDING_CHART_MONTHS';

export function selectMonths(months) {
  return {
    type: DASHBOARD_SPENDING_CHART_MONTHS,
    payload: months,
  };
}
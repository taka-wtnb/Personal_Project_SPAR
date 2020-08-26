export const DASHBOARD_SPENDING_TABLE_MONTHS = 'DASHBOARD_SPENDING_TABLE_MONTHS';

export function selectMonths(months) {
  return {
    type: DASHBOARD_SPENDING_TABLE_MONTHS,
    payload: months,
  };
}
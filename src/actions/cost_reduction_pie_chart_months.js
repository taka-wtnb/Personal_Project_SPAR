export const COST_REDUCTION_PIE_CHART_MONTHS = 'COST_REDUCTION_PIE_CHART_MONTHS';

export function selectMonths(months) {
  return {
    type: COST_REDUCTION_PIE_CHART_MONTHS,
    payload: months,
  };
}
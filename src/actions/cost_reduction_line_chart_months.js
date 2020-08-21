export const COST_REDUCTION_LINE_CHART_MONTHS = 'COST_REDUCTION_LINE_CHART_MONTHS';

export function selectMonths(months) {
  return {
    type: COST_REDUCTION_LINE_CHART_MONTHS,
    payload: months,
  };
}
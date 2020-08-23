export const QUALITY_MANAGEMENT_LINE_CHART_MONTHS = 'QUALITY_MANAGEMENT_LINE_CHART_MONTHS';

export function selectMonths(months) {
  return {
    type: QUALITY_MANAGEMENT_LINE_CHART_MONTHS,
    payload: months,
  };
}
export const QUALITY_BEST_TABLE_MONTHS = 'QUALITY_BEST_TABLE_MONTHS';

export function selectMonths(months) {
  return {
    type: QUALITY_BEST_TABLE_MONTHS,
    payload: months,
  };
}
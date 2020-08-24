export const QUALITY_WORST_TABLE_MONTHS = 'QUALITY_WORST_TABLE_MONTHS';

export function selectMonths(months) {
  return {
    type: QUALITY_WORST_TABLE_MONTHS,
    payload: months,
  };
}
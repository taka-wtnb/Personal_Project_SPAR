export const DISPLAY_COST_REDUCTION_PIE_CHART_ITEM = 'DISPLAY_COST_REDUCTION_PIE_CHART_ITEM';

export function displayItem(itemName) {
  return {
    type: DISPLAY_COST_REDUCTION_PIE_CHART_ITEM,
    payload: itemName,
  };
}
export const DISPLAY_COST_REDUCTION_LINE_CHART_ITEM = 'DISPLAY_COST_REDUCTION_LINE_CHART_ITEM';

export function displayItem(itemName) {
  return {
    type: DISPLAY_COST_REDUCTION_LINE_CHART_ITEM,
    payload: itemName,
  };
}
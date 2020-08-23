export const DISPLAY_QUALITY_MANAGEMENT_PIE_CHART_ITEM = 'DISPLAY_QUALITY_MANAGEMENT_PIE_CHART_ITEM';

export function displayItem(itemName) {
  return {
    type: DISPLAY_QUALITY_MANAGEMENT_PIE_CHART_ITEM,
    payload: itemName,
  };
}
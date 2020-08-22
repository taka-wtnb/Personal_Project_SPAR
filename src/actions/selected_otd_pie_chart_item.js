export const DISPLAY_OTD_PIE_CHART_ITEM = 'DISPLAY_OTD_PIE_CHART_ITEM';

export function displayItem(itemName) {
  return {
    type: DISPLAY_OTD_PIE_CHART_ITEM,
    payload: itemName,
  };
}
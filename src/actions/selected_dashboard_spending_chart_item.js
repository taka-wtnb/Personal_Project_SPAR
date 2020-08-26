export const DISPLAY_DASHBOARD_SPENDING_CHART_ITEM = 'DISPLAY_DASHBOARD_SPENDING_CHART_ITEM';

export function displayItem(itemName) {
  return {
    type: DISPLAY_DASHBOARD_SPENDING_CHART_ITEM,
    payload: itemName,
  };
}
export const DISPLAY_COST_REDUCTION_ITEM = 'DISPLAY_COST_REDUCTION_ITEM';

export function displayItem(itemName) {
  return {
    type: DISPLAY_COST_REDUCTION_ITEM,
    payload: itemName,
  };
}
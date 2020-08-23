export const DISPLAY_COST_REDUCTION_TABLE_ITEM = 'DISPLAY_COST_REDUCTION_TABLE_ITEM';

export function displayItem(itemName) {
  return {
    type: DISPLAY_COST_REDUCTION_TABLE_ITEM,
    payload: itemName,
  };
}
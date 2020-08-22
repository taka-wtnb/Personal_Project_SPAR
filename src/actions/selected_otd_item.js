export const DISPLAY_OTD_ITEM = 'DISPLAY_OTD_ITEM';

export function displayItem(itemName) {
  return {
    type: DISPLAY_OTD_ITEM,
    payload: itemName,
  };
}
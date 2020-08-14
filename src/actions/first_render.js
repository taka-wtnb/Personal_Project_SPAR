export const RENDER_APP = 'RENDER_APP';

export function detectFirstRender() {
  return {
    type: RENDER_APP,
  };
}
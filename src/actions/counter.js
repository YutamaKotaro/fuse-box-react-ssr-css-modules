export const UP_COUNTER = Symbol('UP_COUNTER');
export const DOWN_COUNTER = Symbol('DOWN_COUNTER');

export const upCounter = () => ({
  type: UP_COUNTER,
});
export const downCounter = () => ({
  type: DOWN_COUNTER,
});

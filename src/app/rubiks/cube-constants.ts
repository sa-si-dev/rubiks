export const halfPi = Math.PI / 2;
export const defaultSpeed = 10;
export const fastSpeed = 4;
export const upSideDownLevels: any = [4, 5, 6];

export const notationData: any = {
  F: {axis: 'z', index: 1},
  FI: {axis: 'z', index: 1, inverse: true},
  S: {axis: 'z', index: 0},
  SI: {axis: 'z', index: 0, inverse: true},
  B: {axis: 'z', index: -1, inverse: true},
  BI: {axis: 'z', index: -1},
  U: {axis: 'y', index: 1},
  UI: {axis: 'y', index: 1, inverse: true},
  E: {axis: 'y', index: 0, inverse: true},
  EI: {axis: 'y', index: 0},
  D: {axis: 'y', index: -1, inverse: true},
  DI: {axis: 'y', index: -1},
  R: {axis: 'x', index: 1},
  RI: {axis: 'x', index: 1, inverse: true},
  M: {axis: 'x', index: 0, inverse: true},
  MI: {axis: 'x', index: 0},
  L: {axis: 'x', index: -1, inverse: true},
  LI: {axis: 'x', index: -1}
};

export const gestureNotationData: any = {
  F: {
    x: { notations: ['D', 'E', 'UI'], fixedAxis: 'y' },
    y: { notations: ['LI', 'MI', 'R'], fixedAxis: 'x' }
  },
  B: {
    x: { notations: ['D', 'E', 'UI'], fixedAxis: 'y', inverse: true },
    y: { notations: ['LI', 'MI', 'R'], fixedAxis: 'x', inverse: true }
  },
  R: {
    y: { notations: ['BI', 'S', 'F'], fixedAxis: 'z', inverse: true },
    z: { notations: ['D', 'E', 'UI'], fixedAxis: 'y', inverse: true }
  },
  L: {
    y: { notations: ['BI', 'S', 'F'], fixedAxis: 'z' },
    z: { notations: ['D', 'E', 'UI'], fixedAxis: 'y' }
  },
  U: {
    x: { notations: ['BI', 'S', 'F'], fixedAxis: 'z' },
    z: { notations: ['L', 'M', 'RI'], fixedAxis: 'x' }
  },
  D: {
    x: { notations: ['BI', 'S', 'F'], fixedAxis: 'z', inverse: true },
    z: { notations: ['L', 'M', 'RI'], fixedAxis: 'x', inverse: true }
  }
};

export const visibleCubePiecesData: any = {
  1: [],
  2: ['U-edge'],
  3: ['U-edge', 'U-corner'],
  4: ['D-edge', 'D-corner', 'E-edge'],
  5: ['D-edge', 'D-corner', 'E-edge', 'U-edge'],
};

export const hiddenCubePiecesData: any = {
  2: ['D-center'],
  3: ['D-center'],
  4: ['U-center'],
};
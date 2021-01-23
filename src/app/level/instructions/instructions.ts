export const instructionsData = [
  /* level 1 */
  [
    {
      title: 'Introduction',
      instructions: [
        'In this level, you will learn the basic notations and terminologies',
        'A cube has 6 faces with 6 different colors',
        '<b>P.S.</b> Scroll right/left to navigate between instructions'
      ]
    },
    {
      title: 'Cube Pieces',
      instructions: [
        'A cube has 3 types of pieces',
        '<b>Center piece</b> - It would be in the center of each faces with 1 color',
        'A cube has 6 center pieces',
        '<b>Corner piece</b> - It would be in the corner of the cube with 3 colors',
        'A cube has 8 corner pieces',
        '<b>Edge piece</b> - It would be between corners with 2 colors',
        'A cube has 12 edge pieces'
      ]
    },
    {
      title: 'Clockwise',
      displayNotations: ['F', 'R', 'L', 'U', 'D', 'M'],
      instructions: [
        'Below are the basic notations you have to remember to solve a cube',
        'If you see a notation in the algorithms as below, you have to rotate the respective layer <b>90°</b> clockwise',
        '<b>F</b> - Front layer',
        '<b>R</b> - Right layer',
        '<b>L</b> - Left layer',
        '<b>U</b> - Upper layer',
        '<b>D</b> - Down layer',
        '<b>M</b> - Middle layer (between left and right layers, its direction is same as the left layer)'
      ]
    },
    {
      title: 'Counterclockwise',
      displayNotations: ['Fi', 'Ri', 'Li', 'Ui', 'Di', 'Mi'],
      instructions: [
        'If you see a notation ends with <b>i</b> (inverse), you should rotate the respective layer counterclockwise',
        '<b>Fi</b> - Front layer <b>90°</b> counterclockwise',
        '<b>P.S.</b> If you see a notation ends with number <b>2</b>, it means, do the notation two times'
      ]
    }
  ],

  /* level 2 */
  [
    {
      title: 'Introduction',
      instructions: [
        'When you solve a cube, you should solve it layer by layer (upper layer then center layer and finally down layer)',
        'In this level, you will learn to solve the <b>edge pieces</b> of the <b>upper layer</b> as shown in the above cube',
        'When you solve a piece you should move the piece to its proper position and apply the respective algorithm to solve the piece',
        'Here algorithm means, a combination of notations'
      ]
    },
    {
      title: 'State 1',
      notations: ['F2'],
      rotation: [-0.4, -0.3, 0],
      instructions: [
        'Search for a white edge piece',
        'If you see an edge piece at the down layer and white color facing down, rotate the down layer, to move it to the proper position',
        'Here proper position means, the second color of the edge piece should match with the center piece of the front layer',
        'As you can see in the above cube, the second color of the edge piece is blue and it is matching with the blue layer',
        'Apply the above algorithm to solve the piece',
      ]
    },
    {
      title: 'State 2',
      notations: ['D', 'M', 'Di', 'Mi'],
      rotation: [-0.4, -0.3, 0],
      instructions: [
        'If the piece is at the down layer and the white color is not facing down, apply the above algorithm to solve the piece',
        'Remember to move the piece to its proper position before applying the algorithm',
      ]
    },
    {
      title: 'State 3',
      notations: ['F', 'D', 'M', 'Di', 'Mi'],
      displayNotations: ['F'],
      instructions: [
        'If the piece is at the center layer and right side, do <b>F</b> notation.',
        'It would move the piece to down layer',
        'Then follow <b>State 2</b> instructions',
      ]
    },
    {
      title: 'State 4',
      notations: ['Fi', 'D', 'M', 'Di', 'Mi'],
      displayNotations: ['Fi'],
      instructions: [
        'If the piece is at the center layer and left side, do <b>Fi</b> notation.',
        'It would move the piece to down layer',
        'Then follow <b>State 2</b> instructions',
      ]
    },
    {
      title: 'State 5',
      notations: ['F2', 'D', 'M', 'Di', 'Mi'],
      displayNotations: ['F2'],
      instructions: [
        'If the piece is at the upper layer and the white color not facing up, do <b>F2</b> notation.',
        'It would move the piece to down layer',
        'Then follow <b>State 2</b> instructions',
      ]
    },
    {
      title: 'Algorithms',
      instructions: [
        'Down  - <b>F2</b>',
        'Front - <b>D M Di Mi</b>',
      ]
    }
  ],

  /* level 3 */
  [
    {
      title: 'Introduction',
      instructions: [
        'In this level, you will learn to solve the <b>corner pieces</b> of the <b>upper layer</b> as shown in the above cube',
      ]
    },
    {
      title: 'State 1',
      notations: ['Di', 'Ri', 'D', 'R'],
      rotation: [-0.3, -0.4, 0],
      instructions: [
        'Search for a white corner piece',
        'If you see a corner piece at the Down-Right layer and white color facing front, rotate the down layer to move to the proper position',
        'Here proper position means, the piece should be between the other two colors of the white corner piece',
        'As you can see in the above cube, a white corner piece has placed between blue and orange faces',
        'Apply the above algorithm to solve the piece',
      ]
    },
    {
      title: 'State 2',
      notations: ['D', 'L', 'Di', 'Li'],
      rotation: [-0.3, 0.4, 0],
      instructions: [
        'If the piece is in the Down-Left layer, apply the above algorithm to solve the piece',
      ]
    },
    {
      title: 'State 3',
      notations: ['Di', 'Ri', 'D', 'R', 'Di', 'Ri', 'D', 'R'],
      displayNotations: ['Ri', 'D', 'R'],
      instructions: [
        'If the piece is in the Upper-Right layer, apply the above algorithm (<b>State 1</b> algorithm without first notation). ',
        'It would move the piece to down layer',
        'Then follow <b>State 1</b> instructions',
      ]
    },
    {
      title: 'State 4',
      notations: ['D', 'L', 'Di', 'Li', 'D', 'L', 'Di', 'Li'],
      displayNotations: ['L', 'Di', 'Li'],
      rotation: [0.3, 0.4, 0],
      instructions: [
        'If the piece is in the Upper-Left layer, apply the above algorithm (<b>State 2</b> algorithm without first notation). ',
        'It would move the piece to down layer',
        'Then follow <b>State 1</b> instructions',
      ]
    },
    {
      title: 'State 5',
      notations: ['F', 'Di', 'Fi', 'D2', 'Di', 'Ri', 'D', 'R'],
      displayNotations: ['Ri', 'D', 'R'],
      rotation: [-0.3, -0.4, 0],
      instructions: [
        'If the piece is in the down layer and white color facing down, apply the above algorithm (<b>State 1</b> algorithm without first notation). ',
        'It would move the piece to down layer',
        'Then follow <b>State 2</b> instructions',
      ]
    },
    {
      title: 'Algorithms',
      instructions: [
        'Right - <b>Di Ri D R</b>',
        'Left - <b>D L Di Li</b>',
      ]
    },
  ],

  /* level 4 */
  [
    {
      title: 'Introduction',
      rotation: [0.3, -0.5, 0],
      instructions: [
        'Once you solve the upper layer, rotate the whole cube upside-down as shown in the above cube',
        'In this level, you will learn to solve the <b>edge pieces</b> of the <b>center layer</b>',
      ]
    },
    {
      title: 'State 1',
      notations: ['U', 'R', 'Ui', 'Ri', 'Ui', 'Fi', 'U', 'F'],
      rotation: [0.3, -0.5, 0],
      instructions: [
        'Search for an edge piece without yellow color',
        'Move the piece to the proper position',
        'Here proper position means, edge piece\'s front color should match with the center piece of the front layer',
        'As you can see in the above cube, the front color of the edge piece is blue and it is matching with the blue layer',
        'If the second color of the edge piece is on the right side, apply the above algorithm',
      ]
    },
    {
      title: 'State 2',
      notations: ['Ui', 'Li', 'U', 'L', 'U', 'F', 'Ui', 'Fi'],
      rotation: [0.3, 0.5, 0],
      instructions: [
        'If the second color of the edge piece is on the left side, apply the above algorithm',
      ]
    },
    {
      title: 'State 3',
      notations: ['U', 'R', 'Ui', 'Ri', 'Ui', 'Fi', 'U', 'F', 'U2', 'U', 'R', 'Ui', 'Ri', 'Ui', 'Fi', 'U', 'F'],
      displayNotations: ['U', 'R', 'Ui', 'Ri', 'Ui', 'Fi', 'U', 'F'],
      rotation: [0.3, -0.5, 0],
      instructions: [
        'If an edge piece is in the center layer but in the wrong place/orientation, apply the <b>State 1</b> algorithm to move the piece to the upper layer',
        'Then follow <b>State 1</b> or <b>State 2</b> instructions based on its second color',
      ]
    },
    {
      title: 'Algorithms',
      rotation: [0.3, -0.5, 0],
      instructions: [
        'Right - <b>U R Ui Ri Ui Fi U F</b>',
        'Left - <b>Ui Li U L U F Ui Fi</b>',
      ]
    }
  ],

  /* level 5 */
  [
    {
      title: 'Introduction',
      rotation: [0.4, -0.3, 0],
      instructions: [
        'In this level, you will learn to solve the <b>edge pieces</b> of the <b>last layer</b>',
        'You will solve this level in two phases',
        'In the first phase, you have to make a cross (+) pattern with yellow color',
        'Then move the yellow pieces to their proper position',
      ]
    },
    {
      title: 'Pattern 1',
      notations: ['F', 'R', 'U', 'Ri', 'Ui', 'Fi', 'R', 'U', 'Ri', 'U', 'R', 'U2', 'Ri', 'U'],
      displayNotations: ['F', 'R', 'U', 'Ri', 'Ui', 'Fi'],
      rotation: [0.4, -0.3, 0],
      instructions: [
        'If the upper layer has the above yellow pattern, apply the above algorithm',
        'Then go to <b>Phase 2</b> instructions',
      ]
    },
    {
      title: ' Pattern 2',
      notations: ['U2', 'F', 'R', 'U', 'Ri', 'Ui', 'Fi', 'Ui', 'F', 'R', 'U', 'Ri', 'Ui', 'Fi'],
      displayNotations: ['F', 'R', 'U', 'Ri', 'Ui', 'Fi'],
      rotation: [0.4, -0.3, 0],
      instructions: [
        'If the upper layer has the above yellow pattern, apply the same algorithm',
        'Then follow <b>Pattern 1</b> instructions',
      ]
    },
    {
      title: 'Pattern 3',
      notations: ['F', 'R', 'U', 'Ri', 'Ui', 'Fi', 'F', 'R', 'U', 'Ri', 'Ui', 'Fi', 'Ui', 'F', 'R', 'U', 'Ri', 'Ui', 'Fi'],
      displayNotations: ['F', 'R', 'U', 'Ri', 'Ui', 'Fi'],
      rotation: [0.4, -0.3, 0],
      instructions: [
        'If the upper layer has the above yellow pattern, apply the same algorithm',
        'Then follow <b>Pattern 2</b> instructions',
      ]
    },
    {
      title: 'Phase 2',
      rotation: [0.4, -0.3, 0],
      instructions: [
        'Once you got the required pattern, need to move the pieces to their proper position',
        'Here proper position means the second color of all yellow edge pieces should match with the center piece of all sides',
      ]
    },
    {
      title: 'State 1',
      notations: ['R', 'U', 'Ri', 'U', 'R', 'U2', 'Ri', 'U'],
      rotation: [0.4, 0.4, 0],
      instructions: [
        'Rotate the upper layer and check if any two edge pieces are in its position',
        'If two sides are in their position, apply the above algorithm',
        'This algorithm would swap the front and left yellow edge pieces.',
        'So you have to rotate the whole cube vertically (Y-axis), in a way the two solved pieces are in the right and back sides, before applying the algorithm',
      ]
    },
    {
      title: 'State 2',
      notations: ['U2', 'R', 'U', 'Ri', 'U', 'R', 'U2', 'Ri', 'U', 'U2', 'R', 'U', 'Ri', 'U', 'R', 'U2', 'Ri', 'U'],
      displayNotations: ['R', 'U', 'Ri', 'U', 'R', 'U2', 'Ri', 'U'],
      rotation: [0.4, 0.4, 0],
      instructions: [
        'If no sides are in its position, apply the same algorithm',
        'It would solve two edge pieces',
        'Then follow <b>State 1</b> instructions',
      ]
    },
    {
      title: 'Solved Pieces',
      notations: ['R', 'U', 'Ri', 'U', 'R', 'U2', 'Ri', 'U'],
      hideNotations: true,
      rotation: [0.4, -0.4, 0],
      instructions: [
        'To find solved two edge pieces, check the second color of two adjacent edge pieces.',
        'If their colors in any one of the below order, that means those two pieces or in its position (Front piece - Right piece)',
        '(Blue-Red) or (Red-Green) or (Green-Orange) or (Orange-Blue)',
        'As you can see in the above cube Red-Green edge pieces are in order, so they are solved pieces',
      ]
    },
    {
      title: 'Algorithms',
      rotation: [0.4, -0.4, 0],
      instructions: [
        'Pattern - <b>F R U Ri Ui Fi</b>',
        'Position - <b>R U Ri U R U2 Ri U</b>',
      ]
    },
  ],

  /* level 6 */
  [
    {
      title: 'Introduction',
      rotation: [0.4, -0.4, 0],
      instructions: [
        'In this level, you will learn to solve the <b>corner pieces</b> of the <b>last layer</b>',
        'You will solve it in two phases',
        'In the first phase, you will move all corner pieces to its position',
        'Then change the orientation of each piece',
      ]
    },
    {
      title: 'Position - State 1',
      notations: ['U', 'R', 'Ui', 'Li', 'U', 'Ri', 'Ui', 'L', 'Ri', 'Di', 'R', 'D', 'Ri', 'Di', 'R', 'D', 'Ui',
        'Ri', 'Di', 'R', 'D', 'Ri', 'Di', 'R', 'D', 'Ri', 'Di', 'R', 'D', 'Ri', 'Di', 'R', 'D', 'U'],
      displayNotations: ['U', 'R', 'Ui', 'Li', 'U', 'Ri', 'Ui', 'L'],
      rotation: [0.4, -0.4, 0],
      instructions: [
        'Rotate the whole cube vertically (Y-axis) to move the proper corner piece to the Front-Right-Upper corner',
        'Here proper corner piece means, it should be between sides of the other two colors of the cube',
        'As you can see in the above cube, Yellow-Blue-Red corner is between the Blue-Red sides',
        'Apply the above algorithm to move all corner pieces to their position',
      ]
    },
    {
      title: 'Position - State 2',
      notations: ['Ui', 'U', 'R', 'Ui', 'Li', 'U', 'Ri', 'Ui', 'L', 'U', 'U', 'R', 'Ui', 'Li', 'U', 'Ri', 'Ui', 'L', 'Ri', 'Di', 'R', 'D', 'Ri', 'Di', 'R', 'D', 'Ui',
        'Ri', 'Di', 'R', 'D', 'Ri', 'Di', 'R', 'D', 'Ri', 'Di', 'R', 'D', 'Ri', 'Di', 'R', 'D', 'U'],
      displayNotations: ['U', 'R', 'Ui', 'Li', 'U', 'Ri', 'Ui', 'L'],
      rotation: [0.4, -0.4, 0],
      instructions: [
        'If no corner is in its position apply the same algorithm',
        'It would move any one of the corner piece to its position',
        'As you can see in the above cube, Yellow-Red-Green corner piece has moved to its position',
        'Then follow <b>State 1</b> instructions',
        'Once you moved all corner pieces to their position, go to <b>Phase 2 (Orientation)</b> instructions',
      ]
    },
    {
      title: 'Orientation',
      notations: ['Ri', 'Di', 'R', 'D', 'Ri', 'Di', 'R', 'D', 'Ui', 'Ri', 'Di', 'R', 'D', 'Ri', 'Di', 'R', 'D',
        'Ri', 'Di', 'R', 'D', 'Ri', 'Di', 'R', 'D', 'U'],
      displayNotations: ['Ri', 'Di', 'R', 'D', 'Ri', 'Di', 'R', 'D'],
      rotation: [0.4, -0.4, 0],
      instructions: [
        'Rotate the upper layer to move an unsolved piece to the Upper-Front-Right corner',
        'Then apply the algorithm <b>Ri Di R D</b> for <b>2</b> or <b>4</b> times until the current corner is solved',
        'As you can see in the above cube, the Yellow-Blue-Red corner has solved after applying the algorithms',
      ]
    },
    {
      title: 'Orientation Cont.',
      notations: ['Ui', 'Ri', 'Di', 'R', 'D', 'Ri', 'Di', 'R', 'D'],
      displayNotations: ['Ui', 'Ri', 'Di', 'R', 'D', 'Ri', 'Di', 'R', 'D'],
      rotation: [0.4, -0.4, 0],
      instructions: [
        'Once you solved one piece, it would look like you got messed up with other layers. Don\'t worry, they would go to their position once you solved all corners',
        'Once solved one corner, rotate the upper layer to move another unsolved piece to the Upper-Front-Right corner and solve that piece',
        'Repeat this for all unsolved corners',
      ]
    },
    {
      title: 'Algorithms',
      rotation: [0.4, -0.4, 0],
      instructions: [
        'Position - <b>U R Ui Li U Ri Ui L</b>',
        'Orientation - <b>Ri Di R D</b>',
      ]
    }
  ],
];
  /*
  * This functions defines [boxPosition, celPosition, orderOfAnimation];
  */
export function parsePartialConclusionCordinates(partialConclusionCords: (number|string)[][], boxPos: number, celPos: number) {
  let parsedCordinates: number[][] = [];    
  partialConclusionCords.forEach(cord => {
    const [type, boxCord, celCord] = cord;
    if (type === 'horizontal-line') 
      parsedCordinates = parsedCordinates.concat(mountHorizontalAnimationCords(boxPos-1, celPos-1, boxCord as number, celCord as number));
    else if (type === 'vertical-line') 
      parsedCordinates = parsedCordinates.concat(mountVerticalAnimationCords(boxPos-1, celPos-1, boxCord as number, celCord as number));
    else if (type === 'whole-box') 
      parsedCordinates = parsedCordinates.concat(mountBoxAnimationCords(boxPos-1, celPos-1));
  })

  return parsedCordinates;
}

function mountHorizontalAnimationCords(boxPos: number, celPos: number, boxCord: number, celCord: number): number[][] {
  const horizontalAnimationCords: number[][] = [];

  for (let xx = 0; xx < 3; xx++) {
    for (let yy = 0; yy < 3; yy++) {
      horizontalAnimationCords.push([boxCord+xx, celCord+yy])
    }
  }
    
  const mainCordIndex = horizontalAnimationCords.findIndex( cord => JSON.stringify(cord) === JSON.stringify([boxPos, celPos]));
  pushingOrderOfAnimationToCords(horizontalAnimationCords, mainCordIndex);

  return horizontalAnimationCords;
}

function mountVerticalAnimationCords(boxPos: number, celPos: number, boxCord: number, celCord: number): number[][] {
  const verticalAnimationCords: number[][] = [];

  for (let xx = 0; xx < 9; xx+=3) {
    for (let yy = 0; yy < 9; yy+=3) {
      verticalAnimationCords.push([boxCord+xx, celCord+yy])
    }
  }

  const mainCordIndex = verticalAnimationCords.findIndex( cord => JSON.stringify(cord) === JSON.stringify([boxPos, celPos]));
  pushingOrderOfAnimationToCords(verticalAnimationCords, mainCordIndex);

  return verticalAnimationCords;
}

function pushingOrderOfAnimationToCords(lineAnimationCords: number[][], mainCordIndex: number): void {
  [1,2,3,4,5,6,7,8,9].forEach((order, index) => {
    if (lineAnimationCords[mainCordIndex + index]) 
      lineAnimationCords[mainCordIndex + index].push(order)

    if (index === 0)
      return

    if (lineAnimationCords[mainCordIndex - index]) 
      lineAnimationCords[mainCordIndex - index].push(order)
  })
}

function mountBoxAnimationCords(box: number, cel: number): number[][] {
  const mainCordIndex = cel;

  const animationOrder = [
    [1,2,3,2,3,4,3,4,5],
    [2,1,2,3,2,3,4,3,4],
    [3,2,1,4,3,2,5,4,3],
    [2,3,4,1,2,3,2,3,4],
    [3,2,3,2,1,2,3,2,3],
    [4,3,2,3,2,1,4,3,2],
    [3,4,5,2,3,4,1,2,3],
    [4,3,4,3,2,3,2,1,2],
    [5,4,3,4,3,2,3,2,1]
  ];
 
  return animationOrder[mainCordIndex].map((order, index) => [box, index, order]);
}
const letterCount = {
  X: { count: 11578, edge: true },
  S: { count: 7722, edge: true },
  FF: { count: 3001, edge: true },
  VV: { count: 3911, edge: true },
  R: { count: 2161, edge: true },
  OO: { count: 2304, edge: false },
  P: { count: 2064, edge: false },
  J: { count: 2773, edge: true },
  L: { count: 2497, edge: false },
  I: { count: 1146, edge: false },
  K: { count: 3949, edge: true },
  KK: { count: 871, edge: false },
  U: { count: 1877, edge: false },
  GG: { count: 1854, edge: false },
  Z: { count: 1881, edge: false },
  E: { count: 2459, edge: false },
  WW: { count: 1246, edge: false },
  A: { count: 1010, edge: true },
  M: { count: 6296, edge: true },
  LL: { count: 688, edge: false },
  UU: { count: 1443, edge: false },
  II: { count: 983, edge: false },
  NN: { count: 685, edge: false },
  Y: { count: 2674, edge: false },
  T: { count: 1583, edge: false },
  AA: { count: 238, edge: false },
  W: { count: 1437, edge: false },
  H: { count: 295, edge: false },
  BB: { count: 2689, edge: false },
  PP: { count: 816, edge: false },
  O: { count: 791, edge: false },
  EE: { count: 285, edge: true },
  G: { count: 5094, edge: true },
  DD: { count: 1707, edge: false },
  XX: { count: 2113, edge: false },
  JJ: { count: 4829, edge: false },
  MM: { count: 396, edge: false },
  C: { count: 1598, edge: false },
  D: { count: 1028, edge: true },
  RR: { count: 2031, edge: false },
  CC: { count: 4713, edge: true },
  QQ: { count: 1226, edge: false },
  N: { count: 6763, edge: true },
  F: { count: 3342, edge: false },
  V: { count: 4367, edge: true },
  B: { count: 2647, edge: false },
  TT: { count: 3741, edge: true },
  SS: { count: 2228, edge: true },
  HH: { count: 1057, edge: false },
  Q: { count: 758, edge: true },
}
let max = {
  letter: ".",
  count: 0,
}
for (currentLetter in letterCount) {
  //console.log(currentLetter)
  if (
    letterCount[currentLetter].edge === false &&
    letterCount[currentLetter].count > max.count
  ) {
    max.count = letterCount[currentLetter].count
    max.letter = currentLetter
  }
}

console.log({ max })

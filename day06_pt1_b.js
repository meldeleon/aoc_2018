//alphabet to delineate marked coordinates,since we have 50 coords, we use double letters to wrap around alphabet
const alphabet =
  "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA,BB,CC,DD,EE,FF,GG,HH,II,JJ,KK,LL,MM,NN,OO,PP,QQ,RR,SS,TT,UU,VV,WW,XX,YY,ZZ".split(
    ","
  )

//parse input into array of coords
const input = require("fs")
  .readFileSync("day06_input.txt")
  .toString()
  .split("\r\n")

const coords = input.map((coord) => {
  return ([x, y] = coord.split(", "))
})

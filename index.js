const log = require('./lib/log')

const assign = require('crocks/helpers/assign')
const B = require('crocks/combinators/composeB')
const K = require('crocks/combinators/constant')

const Pair = require('crocks/Pair')
const State = require('crocks/State')
const prop = require('crocks/Maybe/prop')
const option = require('crocks/pointfree/option')

const { modify, get } = State
// state takes function and returns a pair of your state and the calculated value of that
// research store
// can both read and set 

/* 
  State a s 
  left side is what we are mappign over 
  right side is the actual state

  ** we dont care alot of time about the current calculated state we only care about the state 
  ** it allows us to adjust it and do things to it because it is on the left side
  ** it allows us to work on that state until we want to 
*/

// pluckSeed : Integer -> Object -> Integer
const pluckSeed = 
  def => B(option(def), prop('seed'))

// rando : Integer -> State Object Float 
const rando = s => {
  const seed = (1103515245 * s + 12345) & 0x7fffffff
  const value = (seed >>> 16) / 0x7fff

  return modify(assign({ seed }))
}

// pullRandom : Integer -> () -> State Object Float
const pullRandom = defSeed => 
  get(pluckSeed(defSeed)).chain(rando)

// limitIndx : Integer -> Float -> Integer
const limitIndx =
  len => x => (x * len)  | 0  

const seed = 76

const stateTest =
  State(s => {
    return Pair(toUpper(s), s)
  })

const toUpper =
  x => x.toUpperCase()  

log( 
  // State.of(seed)
    // .chain(pullRandom)    
    // .map(limitIndx(52))
    // .runWith({ seed: 23 }).snd()
      modify(prop('seed'))
      .runWith({seed: 23})
)

//rando() - generates a Pair(val, s(val))
// .chain(rando) :: (a -> mb) -> ma -> mb  - right value of the Pair is threaded in for the function
// .runWith({ seed: 23 })
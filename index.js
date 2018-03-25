const log = require('./lib/log')

const { modify } = require('crocks/State')

const compose = require('crocks/helpers/compose')
const concat = require('crocks/pointfree/concat')

// toUpper :: String -> String
const toUpper =
  x => x.toUpperCase()

// exclaim :: String -> String
const exclaim =
  concat('!!!')

// yell :: State String ()
const yell = modify(
  compose(exclaim, toUpper)
)

//=> 'NICE!!!'

log( 
  yell
    .runWith('nice')
)
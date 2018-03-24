# ADT-2

https://www.youtube.com/watch?v=TwFta_ES0pY

## Key takeaways from this lesson 

### State Monad

```
State s a 
```

It is parameterized by two types, a state s and a resultant a.

It returns a `Pair a s` whereby the state s is on the right and the resultant a is on the left.

```
const rando = s => {
  const seed = (1103515245 * s.seed + 12345) & 0x7fffffff
  const value = (seed >>> 16) / 0x7fff

  return Pair(value, assign({ seed }, s))
}
```

Furtheremore, we explored the `modify` and `get` method. `put` was explored in the crocks js documentation

***get***

```
State.get :: () -> State s s 
State.get :: (s -> a) -> State s a 
```

```
get(prop('seed'))
  .runWith({seed: 23})

 > Pair(Just 23, {seed: 23})
```

***modify*** - takes a function and whatever state it is runWith, it will return a new State instance with the result of the function in the state portion

```
get(prop('seed'))
  .runWith({seed: 23})

 > Pair((), Just 23)
```

***put***
> Used to replace the state portion of a given State instance,, put can be employed anytime that the state can change without having to know about it's previous value. If the previous value is required for a given stateful computation, modify can be used to lift a function that represents the change.
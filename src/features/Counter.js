// TODO это в проекте не нужно, сделанно для темта Redux_toolkit;

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount} from '../main_state/states/counterSlice';

export function Counter() {
  const count = useSelector((state) => state.counter_test.value);
  let name_state = useSelector((state) => state.counter_test.name);
  
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(Number);

  return (
    <div>
      <h1>{name_state}</h1>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>

        <div >
          <input
            aria-label="Set increment amount"
            value={incrementAmount}
            onChange={e => setIncrementAmount(e.target.value)}
          />
          <button
            onClick={() =>
              dispatch( incrementByAmount(Number(incrementAmount) || 0) )
            }
          >
            Add Amount
          </button>
          
        </div>
      </div>
    </div>
  )
}

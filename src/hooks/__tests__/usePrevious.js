import { usePrevious } from './../usePrevious';
import { renderHook, act } from '@testing-library/react-hooks';
import React from 'react';

test('usePrevious hook test', () => {
  const { result } = renderHook(() => {
    const [count, setCount] = React.useState(0);
    return {
      count,
      setCount,
      prevCount: usePrevious(count)
    };
  });

  expect(result.current.prevCount).toBeUndefined();

  act(() => {
    result.current.setCount(10);
  });

  expect(result.current.prevCount).toBe(0);

  act(() => {
    result.current.setCount(5);
  });

  expect(result.current.prevCount).toBe(10);
});

import debounce from './../debounce';

const mockExpensiveFunc = jest.fn(() => true);

test('dobounce utility function test', () => {
  jest.useFakeTimers();
  const debounceExpenciveFunc = debounce(mockExpensiveFunc, 2000);

  for (let index = 0; index < 5; index++) {
    debounceExpenciveFunc();
  }
  jest.runAllTimers();
  expect(mockExpensiveFunc.mock.calls.length).toBe(1);
});

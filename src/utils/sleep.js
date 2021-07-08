/**
 * Dummy delay for mock api
 * This methods will be delete
 */

function sleep(ms = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
}
export default sleep;

import { validatePayment } from './../validatePayment';

/* -------------------------------------------------------------------------- */
/*                                  TEST DATA                                 */
/* -------------------------------------------------------------------------- */

const TestDataForValidatePayment = [
  [
    'test case 1',
    {
      ownerName: 'Ferhat Özçöllü',
      cardNo: '4242424242424241',
      cvv: '903',
      expiryYear: 2026,
      expiryMonth: 5
    },
    true
  ],
  [
    'test case 2',
    {
      ownerName: 'Ferhat',
      cardNo: '1234123412341234',
      cvv: '123',
      expiryYear: 20
    },
    false
  ],
  [
    'test case 3',
    {
      ownerName: 'Ferhat',
      cardNo: '123412341234123',
      cvv: '123',
      expiryYear: 2021,
      expiryMonth: 333
    },
    false
  ],
  [
    'test case 4',
    {
      ownerName: 'Ferhat',
      cardNo: '123412341234123',
      cvv: '',
      expiryYear: 2021,
      expiryMonth: 333
    },
    false
  ]
];
/* -----------------
--------------------------------------------------------- */
/*                                    TEST                                    */
/* -------------------------------------------------------------------------- */
test.each(TestDataForValidatePayment)(
  'validate paymentInfo -- %s',
  (testCase, testModel, expected) => {
    TestDataForValidatePayment.forEach((data) => {
      expect(validatePayment(testModel)).toEqual(expected);
    });
  }
);

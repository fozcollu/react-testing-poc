/**
 * PaymentInfo'daki alanlar dolu olmalı
 * CVV 3 haneli olmalı
 * Card No 12 haneli olmalı
 *
 */
export function validatePayment(paymentInfo) {
  if (
    !paymentInfo ||
    !paymentInfo.cardNo ||
    !paymentInfo.cvv ||
    !paymentInfo.ownerName ||
    !paymentInfo.expiryMonth ||
    !paymentInfo.expiryYear
  ) {
    return false;
  }

  if (paymentInfo.cvv.length !== 3) {
    return false;
  }

  if (paymentInfo.cardNo.length !== 16) {
    return false;
  }

  return true;
}

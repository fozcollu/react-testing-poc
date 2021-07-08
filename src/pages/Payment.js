import React from 'react';
import { AppContext } from '../App';
import { useForm } from 'react-hook-form';
import { usePrevious } from '../hooks/usePrevious';
import { getInstallmentOptions } from '../utils/mockApi';
import { useHistory, useParams } from 'react-router';

const defaultInstallmentOptions = [{ id: 1, text: 'Peşin' }];

/**
 * Context'de user yoksa step1 yönlendir
 * OwnerName,cardNo,cvv,expiryYear,expiryMonth zorunlu
 * Default olarak peşin opsiyonu gösterilir.
 * CardNo ilk 5 hane girince taksit seçenekleri serverden çekilir.
 * CardNo silinince opsiyonlar eski default haline dönüp, installmentOption değeri de default olarak güncellenir.
 * Form Submitten sonra thankyou page'e yönlendirilir. Hata oluşursa alert basılır.
 */

const Step2 = () => {
  const { user } = React.useContext(AppContext);
  const history = useHistory();
  const { bookId } = useParams();
  const [installmentOptions, setInstallmentOptions] = React.useState(
    defaultInstallmentOptions
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  React.useEffect(() => {
    if (!user) {
      history.push('/step1/' + bookId);
    }
  }, [bookId, history, user]);

  const cardNoPrefix = watch('cardNo')?.substring(0, 5);
  const prevCardNoPrefix = usePrevious(cardNoPrefix);

  React.useEffect(() => {
    async function fillInstallmentOptions() {
      const options = await getInstallmentOptions(cardNoPrefix);
      setInstallmentOptions(options);
    }
    if (cardNoPrefix === prevCardNoPrefix) {
      return;
    }
    // Kart numarasının ilk 5 hanesi girildiyse
    if (cardNoPrefix?.length >= 5) {
      fillInstallmentOptions();
    }
    // Kart Numarası 4 hane olacak şekilde silinirse
    else if (cardNoPrefix?.length < 5 && prevCardNoPrefix?.length >= 5) {
      setInstallmentOptions(defaultInstallmentOptions);
    }
  }, [cardNoPrefix, prevCardNoPrefix]);

  const onSubmit = async (data) => {
    history.push('/thankyou/' + bookId);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Ödeme Bilgileri</h2>
        <div>
          <label
            style={{
              minWidth: 175,
              display: 'inline-block'
            }}
            htmlFor="name"
          >
            Kart Sahibi Ad-Soyad
          </label>
          <input
            id="ownerName"
            {...register('ownerName', {
              required: {
                value: true,
                message: 'Lütfen ad-soyad giriniz'
              }
            })}
          />
        </div>
        <div>
          <label
            style={{
              minWidth: 175,
              display: 'inline-block'
            }}
            htmlFor="cardNo"
          >
            Kredi Kartı Numarası
          </label>
          <input
            id="cardNo"
            {...register('cardNo', {
              required: {
                value: true,
                message: 'Lütfen kart numarasi giriniz'
              }
            })}
          />
        </div>
        <div>
          <label
            style={{
              minWidth: 175,
              display: 'inline-block'
            }}
            htmlFor="cardCvv"
          >
            CVV
          </label>
          <input
            id="cardCvv"
            {...register('cardCvv', {
              required: {
                value: true,
                message: 'Lütfen cardCvv giriniz'
              },
              minLength: {
                value: 3,
                message: 'CVV 3 hanelidir'
              },
              maxLength: {
                value: 3,
                message: 'CVV 3 hanelidir'
              }
            })}
          />
        </div>
        <div style={{ border: '1px solid #eee', padding: 5, marginTop: 10 }}>
          <div>Son Kullanma Tarihi</div>
          <span>
            <label
              style={{
                minWidth: 50,
                display: 'inline-block'
              }}
              htmlFor="cardExpiryMonth"
            >
              Ay
            </label>
            <input
              id="cardExpiryMonth"
              style={{ width: 110 }}
              {...register('cardExpiryMonth', {
                required: {
                  value: true,
                  message: 'Lütfen ay giriniz'
                }
              })}
            />
          </span>
          &nbsp;&nbsp;
          <span>
            <label
              style={{
                minWidth: 50,
                display: 'inline-block'
              }}
              htmlFor="cardExpiryYear"
            >
              Yıl
            </label>
            <input
              id="cardExpiryYear"
              style={{ width: 100 }}
              {...register('cardExpiryYear', {
                required: {
                  value: true,
                  message: 'Lütfen yil giriniz'
                }
              })}
            />
          </span>
        </div>
        <div style={{ border: '1px solid #eee', padding: 5, marginTop: 10 }}>
          <div>Taksit Sayısı</div>
          {installmentOptions.map((item) => (
            <>
              <input
                type="radio"
                id={item.id}
                name="installment_options"
                value={item.id}
              />
                <label for={item.id}>{item.text}</label>
              <br />
            </>
          ))}
        </div>

        <br />
        <button type="submit">Devam</button>
      </form>
      <div>
        {errors.name && (
          <div style={{ color: `#ff0033`, fontSize: 12 }}>
            * {errors.name.message}
          </div>
        )}
        {errors.tckn && (
          <div style={{ color: `#ff0033`, fontSize: 12 }}>
            * {errors.tckn.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2;

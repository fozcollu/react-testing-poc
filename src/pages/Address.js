import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router';
import CitySelect from '../components/CitySelect';
import DistrictSelect from '../components/DistrictSelect';
import { AppContext } from '../App';
import { tcknRegex } from '../utils/regex';
import { validatePayment } from '../utils/validatePayment';

/**
 * Name, tckn, adress, il zorunlu
 * Tckn belli pattern'e sahip
 * açık adres en az 10 harf olmalı
 * Şehir Seçilmeden İlçe select'i non-visible olmalı
 * Sehir seçildikten sonra ilçe selecti visible olmalı
 * Context'de olan user'ın payment bilgileri varsa ve validse dogrudan thankyou page yönlendirilir yok ise step2
 *
 */
export default function Step1() {
  const { bookId } = useParams();
  const { push } = useHistory();

  const { user, setUser } = React.useContext(AppContext);
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues: { name: user?.name, tckn: user?.tckn } });

  React.useEffect(() => {
    setValue('name', user?.name);
    setValue('tckn', user?.tckn);
  }, [setValue, user]);

  const cityId = watch('cityId');

  const onSubmit = async (data) => {
    setUser(data);
    if (validatePayment(user?.paymentInfo)) {
      push('/thankyou/' + bookId);
    } else {
      push('/step2/' + bookId);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Kişisel Bilgiler</h2>
        <div style={{ marginBottom: 10 }}>
          <label
            style={{
              minWidth: 100,
              display: 'inline-block'
            }}
            htmlFor="name"
          >
            Ad-Soyad
          </label>
          <input
            style={{ width: 200 }}
            id="name"
            disabled={!!user}
            {...register('name', {
              required: {
                value: true,
                message: 'Lütfen ad-soyad giriniz'
              }
            })}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label
            style={{
              minWidth: 100,
              display: 'inline-block'
            }}
            htmlFor="tckn"
          >
            TCKN
          </label>
          <input
            style={{ width: 200 }}
            id="tckn"
            disabled={!!user}
            {...register('tckn', {
              required: {
                value: true,
                message: 'Lütfen TCKN giriniz'
              },
              pattern: {
                value: tcknRegex,
                message: 'Lütfen geçerli bir tckn giriniz'
              }
            })}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label
            style={{
              minWidth: 100,
              display: 'inline-block'
            }}
            htmlFor="address"
          >
            Adres
          </label>
          <input
            style={{ width: 200 }}
            id="address"
            {...register('address', {
              required: {
                value: true,
                message: 'Lütfen Adres giriniz.'
              },
              minLength: {
                value: 10,
                message: 'Adres en az 10 harf olmalıdır.'
              }
            })}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label
            style={{
              minWidth: 100,
              display: 'inline-block'
            }}
            htmlFor="cityId"
          >
            Şehir
          </label>
          <CitySelect
            id="cityId"
            {...register('cityId', {
              required: {
                value: true,
                message: 'Lütfen şehir seçiniz'
              }
            })}
          />
        </div>
        {cityId && (
          <div style={{ marginBottom: 10 }}>
            <label
              style={{
                minWidth: 100,
                display: 'inline-block'
              }}
              htmlFor="districtId"
            >
              İlçe
            </label>
            <Controller
              render={({ field }) => (
                <DistrictSelect id="districtId" cityId={cityId} {...field} />
              )}
              control={control}
              name="districtId"
              defaultValue={10}
            />
          </div>
        )}
        <br />
        <button
          style={{
            backgroundColor: 'white',
            padding: 5,
            border: '1px solid #888',
            width: 100,
            fontSize: 14
          }}
          type="submit"
        >
          Devam
        </button>
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
}

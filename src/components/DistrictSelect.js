import React from 'react';
import { getDistricts } from '../utils/mockApi';

/**
 * CityId doluysa districtleri serverdan çeker.
 * CityId değişince districtleri serverdan tekrar çeker ve value sıfırlar.
 * CityId boş gelirse district optionları sıfırlar ve value sıfırlar.
 *
 *
 */
const DistrictSelect = ({ cityId, ...rest }) => {
  const [data, setData] = React.useState([]);
  const { onChange } = rest;

  function reset() {
    onChange(undefined);
  }

  React.useEffect(() => {
    async function fillDistricts() {
      const _districts = await getDistricts(cityId);
      setData(_districts);
    }
    if (cityId) {
      fillDistricts();
      reset();

      return;
    }

    setData([]);
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityId]);

  return (
    <select style={{ width: 200 }} {...rest} value={rest.value || ''}>
      <option value="" disabled selected>
        Seçiniz
      </option>
      {data.map((item) => (
        <option key={item.id} value={item.id}>
          {item.text}
        </option>
      ))}
    </select>
  );
};

export default DistrictSelect;

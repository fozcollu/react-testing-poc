import React from 'react';
import { getCities } from '../utils/mockApi';

/**
 * Komponent ilk render oldugunda şehirleri serverdan çeker
 * Serverdan çekene kadar loading gösterilir.
 * Serverdan datalar gelince options olarak render eder.
 */
const CitySelect = ({ ...rest }) => {
  const [data] = React.useState(() => getCities());
  return (
    <select style={{ width: 200 }} {...rest}>
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

export default CitySelect;

import React from 'react';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';

const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  favourites,
  handleFavourite,
  title,
  setConvertedAmount,
}) => {
  const isFavourite = (curr) => favourites.includes(currency);
  return (
    <div>
      <label
        htmlFor={title}
        className='block text-sm font-medium text-gray-700'
      >
        {title}
      </label>
      <div className='mt-1 relative'>
        <select
          value={currency}
          onChange={(e) => {
            setCurrency(e.target.value);
            setConvertedAmount(null);
          }}
          className='w-full p-2 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
        >
          {/* render favourites*/}
          {favourites.map((fav) => {
            return (
              <option
                className='bg-indigo-500 text-white'
                value={fav}
                key={fav}
              >
                {fav}
              </option>
            );
          })}
          <option value disabled>
            &#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;
          </option>
          {currencies
            .filter((c) => !favourites.includes(c))
            .map((currency) => {
              return (
                <option value={currency} key={currency}>
                  {currency}
                </option>
              );
            })}
        </select>
        <button
          onClick={() => handleFavourite(currency)}
          className='absolute inset-y-0 right-0 mr-5 flex items-center text-lg leading-5'
        >
          {isFavourite(currency) ? (
            <HiHeart className='text-indigo-600' />
          ) : (
            <HiOutlineHeart />
          )}
        </button>
      </div>
    </div>
  );
};

export default CurrencyDropdown;

import React, { useState, useEffect } from 'react';
import CurrencyDropdown from './dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';

const CurrencyConvertor = () => {
	// 'api.frankfurter.app/currencies'
	// 'api.frankfurter.app/latest?amount=1&from=USD&to=INR'
	const [currencies, setCurrencies] = useState([]);
	const [amount, setAmount] = useState(1);
	const [fromCurrency, setFromCurrency] = useState('USD');
	const [toCurrency, setToCurrency] = useState('INR');

	// Function to fetch all currencies and set them  in the state variable "currencies"
	const fetchCurrencies = async () => {
		try {
			const res = await fetch('https://api.frankfurter.app/currencies');
			const data = await res.json();
			// convert object  into array of values only and set  it as currencies list
			setCurrencies(Object.keys(data));
		} catch (error) {
			console.log('Error Fetching', error);
		}
	};

	//  Call the function on component mount
	useEffect(() => {
		fetchCurrencies();
	}, []);

	//  Function to convert amount based on selected currency pair
	const convertCurrency = () => {};

	const handleFavourite = (currency) => {
		// add to favourite
	};

	console.log(currencies);
	return (
		<div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
			<h2 className='mb-5 text-2xl font-semibold text-gray-700'>
				Currency Convertor
			</h2>
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
				<CurrencyDropdown
					currencies={currencies}
					title='From:'
					handleFavourite={handleFavourite}
					currency={fromCurrency}
					setCurrency={setFromCurrency}
				/>
				{/*Swap Currency Btn*/}
				<div className='flex justify-center -mb-5 sm:mb-0'>
					<button className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'>
						<HiSwitchHorizontal className='text-xl text-gray-700' />
					</button>
				</div>
				<CurrencyDropdown
					currencies={currencies}
					title='To:'
					handleFavourite={handleFavourite}
					currency={toCurrency}
					setCurrency={setToCurrency}
				/>
			</div>
			<div className='mt-4'>
				<label
					htmlFor='amount'
					className='block text-sm font-medium text-gray-700'
				>
					Amount:
				</label>
				<input
					type='number'
					className='w-full p-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 my-1'
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
				/>
			</div>
			<div className='flex justify-end mt-6'>
				<button
					className='px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
					onClick={convertCurrency}
				>
					Convert
				</button>
			</div>
			<div className='mt-4 text-lg font-medium text-right text-green-600'>
				Converted Amount:69 USD
			</div>
		</div>
	);
};

export default CurrencyConvertor;
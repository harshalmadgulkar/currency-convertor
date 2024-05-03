import React, { useState, useEffect } from 'react';
import CurrencyDropdown from './dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';

const CurrencyConvertor = () => {
	const [currencies, setCurrencies] = useState([]);
	const [amount, setAmount] = useState(1);
	const [fromCurrency, setFromCurrency] = useState('USD');
	const [toCurrency, setToCurrency] = useState('INR');
	const [favourites, setFavourites] = useState([]);
	const [convertedAmount, setConvertedAmount] = useState(null);
	const [converting, setConverting] = useState(false);

	// Function to fetch all currencies and set them  in the state variable "currencies"
	// 'api.frankfurter.app/currencies'
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
	// 'https://api.frankfurter.app/latest?amount=1&from=USD&to=INR'
	const convertCurrency = async () => {
		if (!amount) return;
		setConverting(true);

		try {
			const url = `https://api.frankfurter.app/latest?amount=
				${amount}&from=${fromCurrency}&to=${toCurrency}`;
			const res = await fetch(url);
			const data = await res.json();
			setConvertedAmount(data.rates[toCurrency] + ' ' + toCurrency);
			// console.log(data.rates[toCurrency]);
			console.log(data);
			console.log(url);
		} catch (error) {
			console.log('ERROR', error);
		} finally {
			setConverting(false);
		}
	};

	// add to favourite or remove
	const handleFavourite = (currency) => {
		if (!favourites.includes(currency)) {
			setFavourites([...favourites, currency]);
		} else {
			setFavourites(favourites.filter((c) => c !== currency));
		}
	};

	const swapCurrencies = () => {
		setFromCurrency(toCurrency);
		setToCurrency(fromCurrency);
	};

	console.log('currencies', currencies);
	console.log('favourites', favourites);
	return (
		<div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
			<div>
				<h2 className='mb-5 text-2xl font-semibold text-gray-700 '>
					Currency Convertor
					{/*Github Icon will open the source code of this
	app in a new tab*/}
					<FaGithub
						className='inline-block ml-4 hover:cursor-pointer'
						onClick={() =>
							window.open(
								'https://github.com/harshalmadgulkar/currency-convertor'
							)
						}
					/>
				</h2>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
				<CurrencyDropdown
					favourites={favourites}
					currencies={currencies}
					title='From:'
					handleFavourite={handleFavourite}
					currency={fromCurrency}
					setCurrency={setFromCurrency}
				/>
				{/*Swap Currency Btn*/}
				<div className='flex justify-center -mb-5 sm:mb-0'>
					<button
						onClick={swapCurrencies}
						className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'
					>
						<HiSwitchHorizontal className='text-xl text-indigo-700' />
					</button>
				</div>
				<CurrencyDropdown
					favourites={favourites}
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
					className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
									converting ? 'animate-pulse' : ''
								}`}
					onClick={convertCurrency}
				>
					Convert
				</button>
			</div>
			{convertedAmount && (
				<div className='mt-4 text-lg font-medium text-right text-green-600'>
					Converted Amount: {convertedAmount}
				</div>
			)}
		</div>
	);
};

export default CurrencyConvertor;

import React from 'react';
import { HiOutlineHeart } from 'react-icons/hi';

const CurrencyDropdown = ({
	currencies,
	currency,
	setCurrency,
	favourite,
	handleFavourite,
	title,
}) => {
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
					}}
					className='w-full p-2 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
				>
					{/* render favourites*/}
					<option value disabled>
						_____________________
					</option>
					{currencies.map((currency) => {
						return (
							<option value={currency} key={currency}>
								{currency}
							</option>
						);
					})}
				</select>
				<button
					onClick={() => handleFavourite(currency)}
					className='absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5'
				>
					<HiOutlineHeart />
				</button>
			</div>
		</div>
	);
};

export default CurrencyDropdown;

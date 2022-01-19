import axios from 'axios';
import { Dispatch } from 'react';
import { User, S } from './interfaces';
import { ActionTypes } from './types';

// url de ejemplo, cambiar a la correspondiente y actualizar la interface
const url = 'https://localhost:3001/user';

export const fetchUsers = () => {
	return async (dispatch: Dispatch<S>) => {
		const response = await axios.get<User[]>(url);
		dispatch({
			type: ActionTypes.fetchUsers,
			payload: response.data,
		});
	};
};

// export const fetchUsers = () => async(dispatch:Dispatch<S>) => {
// 	try{
// 		const response = (await axios.get<User[]>(url)).data;
// 		dispatch({
// 			type: ActionTypes.fetchUsers,
// 			payload: response
// 		})
// 	}catch(error){
// 		console.log(error, "function fetchUsers");
// 	}
// }
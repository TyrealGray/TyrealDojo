import { CLOSE_MODAL, OPEN_MODAL } from './actionTypes';

export const openModal = () => {
	return { type: OPEN_MODAL };
};

export const closeModal = () => {
	return { type: CLOSE_MODAL };
};

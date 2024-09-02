import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Displays a success toast notification with the provided message.
 * @param {string} message - The message to be displayed in the success toast.
 */
export const successToast = (message) => toast.success(message);

/**
 * Displays an error toast notification with the provided message.
 * @param {string} message - The message to be displayed in the error toast.
 */
export const errorToast = (message) => toast.error(message);

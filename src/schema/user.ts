import { z } from 'zod';
import { validateEmail } from '~/utils/helper';

// login schema for client api
export const transferTokenSchema = z.object({
  toAddress: z.string({
    required_error: 'To address is required',
    invalid_type_error: 'Please enter the address to transfer token',
  }),
  amount: z.number({
    required_error: 'Amount is required',
    invalid_type_error: 'Please enter the amount to transfer',
  }),
});

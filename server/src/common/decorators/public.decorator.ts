import { SetMetadata } from '@nestjs/common';

export const IS_PRIVATE_KEY = 'public';

export const Public = () => SetMetadata(IS_PRIVATE_KEY, true);

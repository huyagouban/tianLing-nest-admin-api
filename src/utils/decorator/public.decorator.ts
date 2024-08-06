import { SetMetadata } from '@nestjs/common';
import { PUBLIC_METADATA } from "src/common/constants/security.constant";



export const Public = () => SetMetadata(PUBLIC_METADATA, true);



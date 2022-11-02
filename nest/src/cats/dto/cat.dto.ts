import { OmitType, PickType } from '@nestjs/swagger';

import { Cat } from '../cats.entity';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name', 'id'] as const) {}

export class GetCurrentCatDto extends OmitType(Cat, ['password'] as const) {}

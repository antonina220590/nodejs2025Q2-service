import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @ValidateIf((_object, value) => value !== null)
  @IsUUID()
  artistId: string | null;

  @IsOptional()
  @ValidateIf((_object, value) => value !== null)
  @IsUUID()
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}

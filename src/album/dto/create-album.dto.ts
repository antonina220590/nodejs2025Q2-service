import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsOptional()
  @ValidateIf((_object, value) => value !== null)
  @IsUUID()
  artistId: string | null;
}

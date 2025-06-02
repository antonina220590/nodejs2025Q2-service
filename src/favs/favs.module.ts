import { Module } from '@nestjs/common';
import { FavoritesService } from './favs.service';
import { FavoritesController } from './favs.controller';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}

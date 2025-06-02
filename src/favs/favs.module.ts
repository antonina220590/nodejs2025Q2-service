import { Module } from '@nestjs/common';
import { FavoritesService } from './favs.service';
import { FavoritesController } from './favs.controller';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}

import { Module } from '@nestjs/common';
import { FavoritesService } from './favs.service';
import { FavoritesController } from './favs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { AlbumEntity } from '../album/entities/album.entity';
import { FavoritesEntity } from './entities/favorites.entity';
import { TrackEntity } from '../track/entities/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoritesEntity,
      ArtistEntity,
      AlbumEntity,
      TrackEntity,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}

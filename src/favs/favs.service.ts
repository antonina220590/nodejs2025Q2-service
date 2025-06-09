import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { AlbumEntity } from '../album/entities/album.entity';
import { TrackEntity } from '../track/entities/track.entity';
import { FavoritesEntity } from './entities/favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private readonly favoritesRepository: Repository<FavoritesEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  private async getFavorites(): Promise<FavoritesEntity> {
    let favorites = await this.favoritesRepository.findOne({ where: {} });
    if (!favorites) {
      favorites = this.favoritesRepository.create({
        artists: [],
        albums: [],
        tracks: [],
      });
      await this.favoritesRepository.save(favorites);
    }

    return this.favoritesRepository.findOne({
      where: { id: favorites.id },
      relations: ['artists', 'albums', 'tracks'],
    });
  }

  async findAll() {
    const favs = await this.getFavorites();
    return {
      artists: favs.artists || [],
      albums: favs.albums || [],
      tracks: favs.tracks || [],
    };
  }

  async addTrack(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new UnprocessableEntityException(`Track with id ${id} not found`);
    }
    const favorites = await this.getFavorites();
    favorites.tracks.push(track);
    await this.favoritesRepository.save(favorites);
  }

  async removeTrack(id: string) {
    const favorites = await this.getFavorites();
    const initialLength = favorites.tracks.length;
    favorites.tracks = favorites.tracks.filter((t) => t.id !== id);
    if (favorites.tracks.length === initialLength) {
      throw new NotFoundException('Track not in favorites');
    }
    await this.favoritesRepository.save(favorites);
  }

  async addAlbum(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new UnprocessableEntityException(`Album with id ${id} not found`);
    }
    const favorites = await this.getFavorites();
    favorites.albums.push(album);
    await this.favoritesRepository.save(favorites);
  }

  async removeAlbum(id: string) {
    const favorites = await this.getFavorites();
    const initialLength = favorites.albums.length;
    favorites.albums = favorites.albums.filter((a) => a.id !== id);
    if (favorites.albums.length === initialLength) {
      throw new NotFoundException('Album not in favorites');
    }
    await this.favoritesRepository.save(favorites);
  }

  async addArtist(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new UnprocessableEntityException(`Artist with id ${id} not found`);
    }
    const favorites = await this.getFavorites();
    favorites.artists.push(artist);
    await this.favoritesRepository.save(favorites);
  }

  async removeArtist(id: string) {
    const favorites = await this.getFavorites();
    const initialLength = favorites.artists.length;
    favorites.artists = favorites.artists.filter((a) => a.id !== id);
    if (favorites.artists.length === initialLength) {
      throw new NotFoundException('Artist not in favorites');
    }
    await this.favoritesRepository.save(favorites);
  }
}

import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DbService } from '../db/db.service';

@Injectable()
export class FavoritesService {
  constructor(private db: DbService) {}

  findAll() {
    const artists = this.db.favorites.artists
      .map((artistId) =>
        this.db.artists.find((artist) => artist.id === artistId),
      )
      .filter(Boolean);

    const albums = this.db.favorites.albums
      .map((albumId) => this.db.albums.find((album) => album.id === albumId))
      .filter(Boolean);

    const tracks = this.db.favorites.tracks
      .map((trackId) => this.db.tracks.find((track) => track.id === trackId))
      .filter(Boolean);

    return { artists, albums, tracks };
  }

  addTrack(id: string) {
    const track = this.db.tracks.find((t) => t.id === id);
    if (!track) {
      throw new UnprocessableEntityException(`Track with id ${id} not found`);
    }
    if (!this.db.favorites.tracks.includes(id)) {
      this.db.favorites.tracks.push(id);
    }
    return { message: 'Track added to favorites' };
  }

  removeTrack(id: string) {
    const trackIndex = this.db.favorites.tracks.indexOf(id);
    if (trackIndex === -1) {
      throw new NotFoundException('Track not found in favorites');
    }
    this.db.favorites.tracks.splice(trackIndex, 1);
  }

  addAlbum(id: string) {
    const album = this.db.albums.find((a) => a.id === id);
    if (!album) {
      throw new UnprocessableEntityException(`Album with id ${id} not found`);
    }
    if (!this.db.favorites.albums.includes(id)) {
      this.db.favorites.albums.push(id);
    }
    return { message: 'Album added to favorites' };
  }

  removeAlbum(id: string) {
    const albumIndex = this.db.favorites.albums.indexOf(id);
    if (albumIndex === -1) {
      throw new NotFoundException('Album not found in favorites');
    }
    this.db.favorites.albums.splice(albumIndex, 1);
  }

  addArtist(id: string) {
    const artist = this.db.artists.find((a) => a.id === id);
    if (!artist) {
      throw new UnprocessableEntityException(`Artist with id ${id} not found`);
    }
    if (!this.db.favorites.artists.includes(id)) {
      this.db.favorites.artists.push(id);
    }
    return { message: 'Artist added to favorites' };
  }

  removeArtist(id: string) {
    const artistIndex = this.db.favorites.artists.indexOf(id);
    if (artistIndex !== -1) {
      this.db.favorites.artists.splice(artistIndex, 1);
    }
    this.db.favorites.artists.splice(artistIndex, 1);
  }
}

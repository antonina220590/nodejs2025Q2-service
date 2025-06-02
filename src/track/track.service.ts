import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '../db/db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavoritesService } from '../favs/favs.service';

@Injectable()
export class TrackService {
  constructor(
    private db: DbService,
    private favoritesService: FavoritesService,
  ) {}

  private checkDependencies(dto: CreateTrackDto | UpdateTrackDto) {
    if (dto.artistId) {
      const artist = this.db.artists.find((a) => a.id === dto.artistId);
      if (!artist) {
        throw new BadRequestException(
          `Artist with id ${dto.artistId} not found`,
        );
      }
    }
    if (dto.albumId) {
      const album = this.db.albums.find((a) => a.id === dto.albumId);
      if (!album) {
        throw new BadRequestException(`Album with id ${dto.albumId} not found`);
      }
    }
  }

  create(createTrackDto: CreateTrackDto) {
    this.checkDependencies(createTrackDto);

    const newTrack = {
      id: uuidv4(),
      ...createTrackDto,
    };
    this.db.tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this.db.tracks;
  }

  findOne(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    this.checkDependencies(updateTrackDto);
    const track = this.findOne(id);
    Object.assign(track, updateTrackDto);
    return track;
  }

  remove(id: string) {
    this.findOne(id);
    this.favoritesService.removeTrack(id);
    this.db.tracks = this.db.tracks.filter((track) => track.id !== id);
  }
  removeArtistIdReference(artistId: string) {
    this.db.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }

  removeAlbumIdReference(albumId: string) {
    this.db.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }
}

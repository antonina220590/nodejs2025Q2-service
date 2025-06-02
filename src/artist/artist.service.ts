import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '../db/db.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FavoritesService } from '../favs/favs.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';

@Injectable()
export class ArtistService {
  constructor(
    private db: DbService,
    private favoritesService: FavoritesService,

    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,

    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.db.artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    return this.db.artists;
  }

  findOne(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.findOne(id);
    Object.assign(artist, updateArtistDto);
    return artist;
  }

  remove(id: string) {
    this.findOne(id);
    this.albumService.removeArtistIdReference(id);
    this.trackService.removeArtistIdReference(id);
    this.favoritesService.removeArtist(id);
    this.db.artists = this.db.artists.filter((artist) => artist.id !== id);
  }
}

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '../db/db.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private db: DbService) {}

  private checkArtistExists(artistId: string) {
    if (artistId === null) return;
    const artist = this.db.artists.find((artist) => artist.id === artistId);
    if (!artist) {
      throw new BadRequestException(`Artist with id ${artistId} not found`);
    }
  }

  create(createAlbumDto: CreateAlbumDto) {
    this.checkArtistExists(createAlbumDto.artistId);

    const newAlbum = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.db.albums;
  }

  findOne(id: string) {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    this.checkArtistExists(updateAlbumDto.artistId);

    const album = this.findOne(id);
    Object.assign(album, updateAlbumDto);
    return album;
  }

  remove(id: string) {
    this.findOne(id);
    this.db.albums = this.db.albums.filter((album) => album.id !== id);
  }
}

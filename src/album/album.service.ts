import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const { artistId, ...rest } = createAlbumDto;

    const newAlbum = this.albumRepository.create({
      ...rest,
      artist: artistId ? { id: artistId } : null,
    });

    return this.albumRepository.save(newAlbum);
  }

  async findAll(): Promise<AlbumEntity[]> {
    return this.albumRepository.find();
  }

  async findOne(id: string): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({
      where: { id },
      relations: ['artist'],
    });
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album;
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const { artistId, ...rest } = updateAlbumDto;

    const album = await this.albumRepository.preload({
      id,
      ...rest,

      ...(artistId && { artist: { id: artistId } }),
    });

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return this.albumRepository.save(album);
  }

  async remove(id: string): Promise<void> {
    const result = await this.albumRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
  }
}

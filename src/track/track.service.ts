import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    const { artistId, albumId, ...rest } = createTrackDto;

    const newTrack = this.trackRepository.create({
      ...rest,
      artist: artistId ? { id: artistId } : null,
      album: albumId ? { id: albumId } : null,
    });

    return this.trackRepository.save(newTrack);
  }

  async findAll(): Promise<TrackEntity[]> {
    return this.trackRepository.find();
  }

  async findOne(id: string): Promise<TrackEntity> {
    const track = await this.trackRepository.findOne({
      where: { id },
      relations: ['artist', 'album'],
    });
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return track;
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    const track = await this.trackRepository.preload({
      id,
      ...updateTrackDto,
    });
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return this.trackRepository.save(track);
  }

  async remove(id: string): Promise<void> {
    const result = await this.trackRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
  }
}

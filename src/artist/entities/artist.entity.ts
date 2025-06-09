import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TrackEntity } from '../../track/entities/track.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => TrackEntity, (track) => track.artist)
  tracks: TrackEntity[];

  @OneToMany(() => AlbumEntity, (album) => album.artist)
  albums: AlbumEntity[];
}

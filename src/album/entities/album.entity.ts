import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import { TrackEntity } from '../../track/entities/track.entity';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  artist: ArtistEntity;

  @RelationId((album: AlbumEntity) => album.artist)
  artistId: string | null;

  @OneToMany(() => TrackEntity, (track) => track.album)
  tracks: TrackEntity[];
}

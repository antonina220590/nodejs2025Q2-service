import { Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import { AlbumEntity } from '../../album/entities/album.entity';
import { TrackEntity } from '../../track/entities/track.entity';

@Entity('favorites')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => ArtistEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinTable()
  artists: ArtistEntity[];

  @ManyToMany(() => AlbumEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinTable()
  albums: AlbumEntity[];

  @ManyToMany(() => TrackEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinTable()
  tracks: TrackEntity[];
}

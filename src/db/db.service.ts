// src/db/db.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService {
  users: any[] = [];
  artists: any[] = [];
  tracks: any[] = [];
  albums: any[] = [];

  favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}

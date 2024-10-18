import { Injectable } from '@nestjs/common';
import { FakeStoreService } from 'src/fake-store/fake-store.service';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly fakeStoreService: FakeStoreService) {}
  async create(createUserDto: CreateUserDto) {
    return await this.fakeStoreService.request('POST', '/users', createUserDto);
  }
}

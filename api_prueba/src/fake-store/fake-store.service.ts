import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class FakeStoreService {
  constructor(private readonly httpService: HttpService) {}

  async request(method: string, url: string, data?: any, token?: string) {
    const apiUrl = process.env.FAKE_STORE_API_URL;
    try {
      const response = await lastValueFrom(
        this.httpService.request({
          method,
          url: `${apiUrl}${url}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data,
        }),
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }
}

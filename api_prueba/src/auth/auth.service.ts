import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FakeStoreService } from 'src/fake-store/fake-store.service';

@Injectable()
export class AuthService {
  constructor(private readonly fakeStoreService: FakeStoreService) {}

  // Verifica si el token es válido y tiene permisos para la operación
  async verifyProfile(authHeader: string): Promise<void> {
    const token = authHeader?.substring(7);

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      // Realiza la solicitud para obtener el perfil
      await this.fakeStoreService.request('GET', '/auth/profile', null, token);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

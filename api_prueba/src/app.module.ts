import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { FakeStoreModule } from './fake-store/fake-store.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ProductsModule,
    CategoriesModule,
    AuthModule,
    FakeStoreModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles globalmente en la aplicación
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

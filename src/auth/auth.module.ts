import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from './schemas/user.schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt/jwt';
import { RolesGuard } from './guards/roles/roles.guard';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'outreachhub-secret-key-2025',
      signOptions: {expiresIn: '24h'},
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard],
  exports: [AuthService, RolesGuard],
})
export class AuthModule {}
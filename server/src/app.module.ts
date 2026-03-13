import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeModule } from './resume/resume.module';
import { Resume } from './resume/entities/resume.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbUrl = configService.get<string>('DATABASE_URL');
        // Use DATABASE_URL (for Supabase/Render/Neon)
        if (dbUrl) {
          return {
            type: 'postgres',
            url: dbUrl,
            ssl: { rejectUnauthorized: false },
            entities: [Resume],
            synchronize: true, // dev only
          };
        }

        // Fallback to separate variables (for local dev)
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST') || 'localhost',
          port: configService.get<number>('DB_PORT') || 5432,
          username: configService.get<string>('DB_USERNAME') || 'postgres',
          password: configService.get<string>('DB_PASSWORD') || 'postgres',
          database: configService.get<string>('DB_NAME') || 'postgres',
          entities: [Resume],
          synchronize: true,
          ssl: { rejectUnauthorized: false },
        };
      },
    }),
    ResumeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

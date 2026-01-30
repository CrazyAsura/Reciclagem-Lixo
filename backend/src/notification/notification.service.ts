import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationRepository.create({
        ...createNotificationDto,
        createdAt: new Date(),
        read: false,
        userId: createNotificationDto.userId
    });
    const saved = await this.notificationRepository.save(notification);
    await this.invalidateUserCache(createNotificationDto.userId);
    return saved;
  }

  async findAllByUser(userId: string): Promise<Notification[]> {
    const cacheKey = `notifications:${userId}`;
    const cached = await this.cacheManager.get<Notification[]>(cacheKey);
    
    if (cached) {
        return cached;
    }

    const notifications = await this.notificationRepository.find({ 
      where: { userId: userId }, 
      order: { createdAt: 'DESC' } 
    });

    await this.cacheManager.set(cacheKey, notifications);
    return notifications;
  }

  async markAsRead(id: string): Promise<void> {
    // We need to find the notification first to know which user's cache to invalidate
    // or we could use a pattern deletion if supported, but simple invalidation is safer
    // For optimization, we could pass userId from controller if available, 
    // but here we might need to fetch it.
    // However, since we are using MongoDB/TypeORM, let's just update and maybe
    // we can skip invalidation if we accept eventual consistency, 
    // BUT for UI "read" status, instant feedback is better.
    // Let's fetch to get userId.
    
    // Note: This adds a read operation. If performance is critical, 
    // client should invalidate or we structure keys differently.
    const notification = await this.notificationRepository.findOne({ where: { id: id as any } });
    
    await this.notificationRepository.update(id, { read: true });
    
    if (notification) {
        await this.invalidateUserCache(notification.userId);
    }
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationRepository.update({ userId: userId, read: false }, { read: true });
    await this.invalidateUserCache(userId);
  }
  
  async remove(id: string): Promise<void> {
    const notification = await this.notificationRepository.findOne({ where: { id: id as any } });
    await this.notificationRepository.delete(id);
    if (notification) {
        await this.invalidateUserCache(notification.userId);
    }
  }

  private async invalidateUserCache(userId: string): Promise<void> {
      await this.cacheManager.del(`notifications:${userId}`);
  }
  

}
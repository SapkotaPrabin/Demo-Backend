import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuditLog } from '../../../frameworks/entities/audit-log.entity';

export interface AddAuditLogInput {
  action: string;
  actorUserId?: number | null;
  targetType?: string | null;
  targetId?: string | number | null;
  details?: Record<string, unknown> | null;
}

@Injectable()
export class LoggerService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async addLog(input: AddAuditLogInput): Promise<AuditLog> {
    const repository = this.dataSource.getRepository(AuditLog);
    const log = repository.create({
      action: input.action,
      actorUserId: input.actorUserId ?? null,
      targetType: input.targetType ?? null,
      targetId: input.targetId == null ? null : String(input.targetId),
      details: input.details ?? null,
    });

    return repository.save(log);
  }
}

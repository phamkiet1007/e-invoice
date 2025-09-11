import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { getProcessId } from '@common/utils/string.util';
import { MetedataKeys } from '@common/constants/common.constant';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const { method, originalUrl, body } = req;

    const processId = getProcessId();

    const now = Date.now();

    (req as any)[MetedataKeys.PROCESS_ID] = processId; //gán processId vào req để các middleware khác có thể sử dụng
    (req as any)[MetedataKeys.START_TIME] = startTime; //gán startTime vào req để các middleware khác có thể sử dụng

    Logger.log(
      `HTTP >> Start process '${processId}' >> path: '${originalUrl}' >> method: '${method}' >> at: '${now}' >> input: ${JSON.stringify(
        body,
      )}`,
    );

    const originalUrlSend = res.send.bind(res);

    res.send = (body: any) => {
      const duration = Date.now() - startTime;

      Logger.log(
        `HTTP >> End process '${processId}' >> path: '${originalUrl}' >> method: '${method}' >> at: '${now}' >> duration: ${duration}ms `,
      );

      return originalUrlSend(body);
    };

    next();
  }
}

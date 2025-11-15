import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TcpLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();
    const handler = context.getHandler();
    const handlerName = handler.name;

    const args = context.getArgs();
    const param = args.length > 0 ? args[0] : null;
    const processId = param.processId || 'N/A';

    Logger.log(`TCP >> Start process '${processId}' >> method: ${handlerName} >> params: ${JSON.stringify(param)}`);

    return next
      .handle()
      .pipe(
        tap((response) =>
          Logger.log(`TCP >> End process '${processId}' >> method: '${handlerName}' after: '${Date.now() - now}ms'`),
        ),
      );
  }
}

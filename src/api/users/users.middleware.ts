import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  private readonly secretKey = 'secret-key';

  use(req: Request, res: Response, next: () => void) {
    if (req.headers.authorization !== this.secretKey) {
      return res.status(401).json({ success: false, message: 'INVALID_TOKEN' });
    }

    next();
  }
}

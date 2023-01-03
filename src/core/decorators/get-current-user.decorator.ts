import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    // console.log('request', request);
    // if (!data) return request.user;
    // return request.user[data];
  },
);

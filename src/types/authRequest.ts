//declare -offers type information w/o code, namespace- type extension for thing
// declare namespace Express {
//   export interface Request {
//     userId?: string;
//   }
// }

import { Request } from 'express';

interface authRequest extends Request {
  userId?: string;
}

export default authRequest;

// declare module 'express-serve-static-core' {
//   interface Request {
//     userId?: string;
//   }
// }

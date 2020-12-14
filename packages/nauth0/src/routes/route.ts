import { NextApiRequest, NextApiResponse } from 'next';
import { NAuth0Options } from '../config';

export type NAuth0ApiRoute = (
  req: NextApiRequest,
  res: NextApiResponse,
  cfg: NAuth0Options
) => void | Promise<void>;

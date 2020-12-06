import { NextApiRequest, NextApiResponse } from 'next';
import { NAuth0Config } from '../config';

export type NAuth0ApiRoute = (
  req: NextApiRequest,
  res: NextApiResponse,
  cfg: NAuth0Config
) => void | Promise<void>;

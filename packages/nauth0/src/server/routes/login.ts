import { NAuth0ApiRoute } from './route';
import { createClient, createState } from '../oidc';
import { setCookie } from 'nookies';
import { stateCookie } from '../cookies';
import { redirectKey } from '../config';
import { NextApiRequest } from 'next';

const redirectToFromReq = (req: NextApiRequest): string | null => {
  const param = req.query[redirectKey];
  if (typeof param === 'string') {
    return param;
  } else if (Array.isArray(param) && typeof param[0] === 'string') {
    return param[0];
  }
  return null;
};

export const loginRoute: NAuth0ApiRoute = async (req, res, opts) => {
  const client = await createClient(opts);
  const state = createState({
    [redirectKey]: redirectToFromReq(req),
  });

  const authorizationUrl = client.authorizationUrl({
    redirect_uri: opts.redirectUri,
    scope: opts.scope,
    response_type: 'code',
    audience: opts.audience,
    state,
  });

  setCookie({ res }, stateCookie, state, {
    maxAge: 60 * 60,
    httpOnly: true,
  });

  res
    .writeHead(302, {
      Location: authorizationUrl,
    })
    .end();
};

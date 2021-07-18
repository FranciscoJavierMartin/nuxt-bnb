import { v4 as uuid } from 'uuid';
import { hasBadBody, rejectHitBadRequest, sendJSON } from '../../helpers';

export default (apis) => {
  return async (req, res) => {
    if (req.method === 'DELETE') {
      const homeId = req.url.replace(/\//g, '');
      return await deleteHome(req.identity, homeId, res);
      ﬂ;
    } else if (req.method === 'GET' && req.url === '/user/') {
      return await getHomesByUser(req.identity.id, res);
    } else if (req.method === 'POST') {
      if (hasBadBody(req)) {
        return rejectHitBadRequest(res);
      }
      await createHome(req.identity, req.body, res);
    }
    rejectHitBadRequest(res);
  };

  async function deleteHome(identity, homeId, res) {
    await Promise.all([
      apis.homes.delete(homeId),
      apis.user.removeHome(identity, homeId),
    ]);
    sendJSON({}, res);
  }

  async function getHomesByUser(userId, res) {
    const payload = (await apis.homes.getByUserId(userId)).json.hits;
    sendJSON(payload, res);
  }

  async function createHome(identity, body, res) {
    const homeId = uuid();
    const payload = {
      ...body,
      reviewCount: 0,
      reviewValue: 0,
      userId: identity.id,
    };
    const resp = await apis.homes.create(homeId, payload);
    if (!resp.ok) {
      res.statusCode = 500;
      res.end();
      return;
    }
    await apis.user.assignHome(identity, homeId);
    sendJSON({ homeId }, res);
  }
};

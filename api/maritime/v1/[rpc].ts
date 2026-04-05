export const config = { runtime: 'edge' };

import { createDomainGateway, serverOptions } from '../../../server/gateway';
import { createMaritimeServiceRoutes } from '../../../src/generated/server/xworld/maritime/v1/service_server';
import { maritimeHandler } from '../../../server/xworld/maritime/v1/handler';

export default createDomainGateway(
  createMaritimeServiceRoutes(maritimeHandler, serverOptions),
);

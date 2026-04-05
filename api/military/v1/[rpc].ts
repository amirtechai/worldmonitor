export const config = { runtime: 'edge' };

import { createDomainGateway, serverOptions } from '../../../server/gateway';
import { createMilitaryServiceRoutes } from '../../../src/generated/server/xworld/military/v1/service_server';
import { militaryHandler } from '../../../server/xworld/military/v1/handler';

export default createDomainGateway(
  createMilitaryServiceRoutes(militaryHandler, serverOptions),
);

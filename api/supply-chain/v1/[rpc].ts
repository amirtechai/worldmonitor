export const config = { runtime: 'edge' };

import { createDomainGateway, serverOptions } from '../../../server/gateway';
import { createSupplyChainServiceRoutes } from '../../../src/generated/server/xworld/supply_chain/v1/service_server';
import { supplyChainHandler } from '../../../server/xworld/supply-chain/v1/handler';

export default createDomainGateway(
  createSupplyChainServiceRoutes(supplyChainHandler, serverOptions),
);

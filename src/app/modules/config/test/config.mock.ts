import { ConfigSvc } from '../config.service';
class ConfigSvcMock {
  get(){ return "Pants"; }
};
export const mockConfig = { provide: ConfigSvc, useClass: ConfigSvcMock };

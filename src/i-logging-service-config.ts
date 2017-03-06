import { RecipientConfig } from './recipients/recipient-config';
import { ILogFilterConfig } from './filters/i-log-filter-config';

export interface ILog4ngServiceConfig {
  recipients: RecipientConfig[];
  filters?: ILogFilterConfig[];
}

import { RecipientConfig } from './recipients';
import { LogFilterConfig } from './filters';

export abstract class Log4ngServiceConfig {
  recipients?: RecipientConfig[];
  filters?: LogFilterConfig[];
  unwrapError? = false;
  rethrowError? = false;
}

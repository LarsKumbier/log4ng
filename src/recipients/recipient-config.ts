import { ILogFilterConfig } from '../filters';

export interface RecipientConfig {
  classname: string;
  params?: RecipientConfigParams;
}

export interface RecipientConfigParams {
  name?: string;
  filters?: ILogFilterConfig[];
  consoleFn?: Console;
}

import { Clients } from './clients';

export interface AuthToken {
  jwtoken: string;
  user: Clients;
}

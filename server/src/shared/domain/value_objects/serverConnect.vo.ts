import { ValueObjects } from '../value_objects';

export class ServerConnect extends ValueObjects {
  public readonly port: number;
  public readonly host: string;
  constructor (port: number, host: string) {
    super();
    this.port = port;
    this.host = host;
  }
}
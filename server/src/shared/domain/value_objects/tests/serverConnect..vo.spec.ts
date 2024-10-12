import { ServerConnect } from '../serverConnect.vo';
describe('Server Connection Config Unit Tests', () => {
  describe('type returns', () => {
    const connection = new ServerConnect(3333, 'localhost');
    it('should return right types', () => {
      expect(typeof connection.port).toBe('number');
      expect(typeof connection.host).toBe('string');
    });

    it('should return the same content of a constructor', () => {
      expect(connection.port).toEqual(3333);
      expect(connection.host).toEqual('localhost');
    });
  });

  describe('check if is not wrong instance', () => {
    const connection = new ServerConnect(3333, 'localhost');
    it('should validate instanceof', () => {
      expect(connection).toBeInstanceOf(ServerConnect);
    });
  });
  describe('testing equality of vo', () => {
    const connection = new ServerConnect(3333, 'localhost');
    const connection2 = new ServerConnect(3333, 'localhost');
    it('should validate instanceof', () => {
      expect(connection.equals(connection2)).toBeTruthy();
    });


    it('should return false to change of host property', () => {
      connection2.host.concat('host');
      expect(connection2.host).not.toEqual('localhosthost');
    });
  });
});
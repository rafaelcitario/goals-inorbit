import app from '../app/domain/app';
import { ServerConnect } from '../shared/domain/value_objects/serverConnect.vo';
const connection = new ServerConnect(3333, 'localhost');


app.listen(connection.port, connection.host, (): string => {
  console.log("server is running at " + `http://${ connection.host }:${ connection.port }`);
  return " server is running at " + `${ connection.host }:${ connection.port }`;
});
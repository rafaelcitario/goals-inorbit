import { app } from '../app/domain/app';
import { _env } from '../env';
import { ServerConnect } from '../shared/domain/value_objects/serverConnect.vo';
const connection = new ServerConnect(3333, 'localhost');

app.get('/', (request, response) => {
  response.send('hello world!');
});

app.listen(connection.port, connection.host, (): string => {
  return 'server is running at ' + `${ connection.host }:${ connection.port }`;
});
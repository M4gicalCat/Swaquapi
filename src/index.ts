import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import express from 'express';
import db from './db.config';
import * as fs from 'fs';
import { Route } from './types/Route';
import bodyParser from 'body-parser';
import { BadRequestError, UnauthorizedError } from './utils';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use((req, res, next) => {
  console.log(req.method, req.url, { params: req.params, body: req.body });
  next();
});

app.get('/', (req, res) => {
  db.any("SELECT 'echo toto' as echo")
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(e => {
      res.status(500).send(e);
    });
});

const routes: Route[] = [];

const route = async (path: string) => {
  for (const file of fs.readdirSync(path)) {
    if (file.endsWith('.js')) {
      const { routes: r } = await import(`${path}/${file}`);
      routes.push(...r);
    } else {
      await route(`${path}/${file}`);
    }
  }
};

await route(`${__dirname}/routes`);

for (const route of routes) {
  app[route.method](
    route.url,
    [...(route.middlewares ?? []), route.handler].map(
      h => async (req: any, res: any, next: () => void) => {
        try {
          await h(req, res, next);
        } catch (e: any) {
          switch (true) {
            case e instanceof UnauthorizedError:
              res.status(401).send({ message: e.message });
              break;
            case e instanceof BadRequestError:
              res.status(400).send({ message: e.message });
              break;
            default:
              res.status(500).send({ message: e.message });
          }
        }
      },
    ),
  );
}

app.listen(8000, () => {
  console.log('Server started on port 8000');
});

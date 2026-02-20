import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr';
import express, { Request, Response, NextFunction } from 'express';
import { join } from 'node:path';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { APP_BASE_HREF } from '@angular/common';

const browserDistFolder = join(import.meta.dirname, '../browser');
const app = express();

const angularApp = new AngularNodeAppEngine({
  bootstrap: AppComponent,
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    ...(appConfig.providers ?? [])
  ]
});

app.use(express.static(browserDistFolder, {
  maxAge: '1y',
  index: false,
  redirect: false,
}));

app.use((req: Request, res: Response, next: NextFunction) => {
  angularApp.handle(req)
    .then((Response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error?: Error) => {
    if (error) throw error;
    console.error(error);
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
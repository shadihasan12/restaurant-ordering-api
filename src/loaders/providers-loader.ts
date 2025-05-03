// loaders/providers-loader.js
import { asValue, Lifetime, InjectionMode } from 'awilix';
import path from 'path';
import container from '../containers';
import { EventEmitter2 } from 'eventemitter2';

export default async function providersLoader() {
  // register any asValue, singletons, etc:
  container.register({ eventEmitter: asValue(new EventEmitter2()) });

  // ─── SERVICES (Proxy) ───
  container.loadModules(
    [ 'modules/*/services/*{.js,.ts}' ],
    {
      cwd:    path.resolve(__dirname),
      formatName: 'camelCase',
      resolverOptions: {
        lifetime:      Lifetime.SCOPED,
        injectionMode: InjectionMode.PROXY,
      },
    }
  );

  // ─── CONTROLLERS (Classic) ───
  container.loadModules(
    [ 'modules/*/controllers/*{.js,.ts}' ],
    {
      cwd:    path.resolve(__dirname),
      formatName: 'camelCase',
      resolverOptions: {
        lifetime:      Lifetime.SCOPED,
        injectionMode: InjectionMode.CLASSIC,
      },
    }
  );
}

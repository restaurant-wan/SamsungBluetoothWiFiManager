import polka from 'polka';
import compression from 'compression';
import sapper from 'sapper';
import serve from 'serve-static';
import { Store } from 'svelte/store.js';
import { routes } from './manifest/server.js';
import App from './App.html';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		serve('assets'),
		sapper({
			routes,
			App,
			store: request => {
				return new Store({
					version: 1,
					wifiSSIDs: []
				});
			}
		})
	)
	.listen(process.env.PORT);

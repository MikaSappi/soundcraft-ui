import { createServer } from 'vite';

const vite = await createServer({
  server: {
	host: '0.0.0.0',
	port: 3000,
	proxy: {
	  '^/socket\\.io/(?!.*\\.js$)': {
		target: 'http://192.168.100.199',
		changeOrigin: true,
		ws: true
	  }
	}
  }
});

await vite.listen();
console.log('VCA1 Controller: http://localhost:3000');
import {defineConfig} from "vite"

export default defineConfig({
	plugins: [
		
	],
	build: {
		assetsDir: 'assets',
		rollupOptions: {
			input: {
				main: './index.html'
			}
		}
	}
})
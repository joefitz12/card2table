export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","service-worker.js"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.462c50ed.js","app":"_app/immutable/entry/app.37d087b4.js","imports":["_app/immutable/entry/start.462c50ed.js","_app/immutable/chunks/index.3ce593a5.js","_app/immutable/chunks/singletons.e22b4096.js","_app/immutable/chunks/paths.7faf0f52.js","_app/immutable/chunks/control.c2cf8273.js","_app/immutable/entry/app.37d087b4.js","_app/immutable/chunks/index.3ce593a5.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/collection",
				pattern: /^\/collection\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/collection/new",
				pattern: /^\/collection\/new\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/faq",
				pattern: /^\/faq\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/print",
				pattern: /^\/print\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/template",
				pattern: /^\/template\/?$/,
				params: [],
				page: { layouts: [0,,], errors: [1,2,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/template/[id=integer]",
				pattern: /^\/template\/([^/]+?)\/?$/,
				params: [{"name":"id","matcher":"integer","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2,], leaf: 9 },
				endpoint: null
			}
		],
		matchers: async () => {
			const { match: integer } = await import ('./entries/matchers/integer.js')
			return { integer };
		}
	}
}
})();

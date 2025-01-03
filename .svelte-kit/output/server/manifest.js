export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "GridCannonSvelte/_app",
	assets: new Set([".nojekyll ","favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start._6gyVF9F.js","app":"_app/immutable/entry/app.BmDRNQVN.js","imports":["_app/immutable/entry/start._6gyVF9F.js","_app/immutable/chunks/entry.CfuTPmuO.js","_app/immutable/chunks/runtime.q96lkfRn.js","_app/immutable/chunks/index-client.C9AMHo9F.js","_app/immutable/entry/app.BmDRNQVN.js","_app/immutable/chunks/runtime.q96lkfRn.js","_app/immutable/chunks/render.BFyDhuu6.js","_app/immutable/chunks/disclose-version.yZ1RdqRG.js","_app/immutable/chunks/if.BuwVjZQ7.js","_app/immutable/chunks/index-client.C9AMHo9F.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

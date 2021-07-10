(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[784],{2168:function(e,t,n){"use strict";n.d(t,{ZP:function(){return R}});var r=n(7294),o=n(9756),a=n(2122);function s(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var i=n(3552),c=n(9864),u=n(8679),l=n.n(u);function d(e,t){if(!e){var n=new Error("loadable: "+t);throw n.framesToPop=1,n.name="Invariant Violation",n}}var f=r.createContext();var h={initialChunks:{}},p="PENDING",m="REJECTED";var v=function(e){return e};function y(e){var t=e.defaultResolveComponent,n=void 0===t?v:t,u=e.render,y=e.onLoad;function g(e,t){void 0===t&&(t={});var v=function(e){return"function"==typeof e?{requireAsync:e,resolve:function(){},chunkName:function(){}}:e}(e),g={};function k(e){return t.cacheKey?t.cacheKey(e):v.resolve?v.resolve(e):"static"}function b(e,r,o){var a=t.resolveComponent?t.resolveComponent(e,r):n(e);if(t.resolveComponent&&!(0,c.isValidElementType)(a))throw new Error("resolveComponent returned something that is not a React component!");return l()(o,a,{preload:!0}),a}var C,E,w=function(e){function n(n){var r;return(r=e.call(this,n)||this).state={result:null,error:null,loading:!0,cacheKey:k(n)},d(!n.__chunkExtractor||v.requireSync,"SSR requires `@loadable/babel-plugin`, please install it"),n.__chunkExtractor?(!1===t.ssr||(v.requireAsync(n).catch((function(){return null})),r.loadSync(),n.__chunkExtractor.addChunk(v.chunkName(n))),s(r)):(!1!==t.ssr&&(v.isReady&&v.isReady(n)||v.chunkName&&h.initialChunks[v.chunkName(n)])&&r.loadSync(),r)}(0,i.Z)(n,e),n.getDerivedStateFromProps=function(e,t){var n=k(e);return(0,a.Z)({},t,{cacheKey:n,loading:t.loading||t.cacheKey!==n})};var r=n.prototype;return r.componentDidMount=function(){this.mounted=!0;var e=this.getCache();e&&e.status===m&&this.setCache(),this.state.loading&&this.loadAsync()},r.componentDidUpdate=function(e,t){t.cacheKey!==this.state.cacheKey&&this.loadAsync()},r.componentWillUnmount=function(){this.mounted=!1},r.safeSetState=function(e,t){this.mounted&&this.setState(e,t)},r.getCacheKey=function(){return k(this.props)},r.getCache=function(){return g[this.getCacheKey()]},r.setCache=function(e){void 0===e&&(e=void 0),g[this.getCacheKey()]=e},r.triggerOnLoad=function(){var e=this;y&&setTimeout((function(){y(e.state.result,e.props)}))},r.loadSync=function(){if(this.state.loading)try{var e=b(v.requireSync(this.props),this.props,R);this.state.result=e,this.state.loading=!1}catch(t){console.error("loadable-components: failed to synchronously load component, which expected to be available",{fileName:v.resolve(this.props),chunkName:v.chunkName(this.props),error:t?t.message:t}),this.state.error=t}},r.loadAsync=function(){var e=this,t=this.resolveAsync();return t.then((function(t){var n=b(t,e.props,{Loadable:R});e.safeSetState({result:n,loading:!1},(function(){return e.triggerOnLoad()}))})).catch((function(t){return e.safeSetState({error:t,loading:!1})})),t},r.resolveAsync=function(){var e=this,t=this.props,n=(t.__chunkExtractor,t.forwardedRef,(0,o.Z)(t,["__chunkExtractor","forwardedRef"])),r=this.getCache();return r||((r=v.requireAsync(n)).status=p,this.setCache(r),r.then((function(){r.status="RESOLVED"}),(function(t){console.error("loadable-components: failed to asynchronously load component",{fileName:v.resolve(e.props),chunkName:v.chunkName(e.props),error:t?t.message:t}),r.status=m}))),r},r.render=function(){var e=this.props,n=e.forwardedRef,r=e.fallback,s=(e.__chunkExtractor,(0,o.Z)(e,["forwardedRef","fallback","__chunkExtractor"])),i=this.state,c=i.error,l=i.loading,d=i.result;if(t.suspense&&(this.getCache()||this.loadAsync()).status===p)throw this.loadAsync();if(c)throw c;var f=r||t.fallback||null;return l?f:u({fallback:f,result:d,options:t,props:(0,a.Z)({},s,{ref:n})})},n}(r.Component),N=(E=function(e){return r.createElement(f.Consumer,null,(function(t){return r.createElement(C,Object.assign({__chunkExtractor:t},e))}))},(C=w).displayName&&(E.displayName=C.displayName+"WithChunkExtractor"),E),R=r.forwardRef((function(e,t){return r.createElement(N,Object.assign({forwardedRef:t},e))}));return R.displayName="Loadable",R.preload=function(e){v.requireAsync(e)},R.load=function(e){return v.requireAsync(e)},R}return{loadable:g,lazy:function(e,t){return g(e,(0,a.Z)({},t,{suspense:!0}))}}}var g=y({defaultResolveComponent:function(e){return e.__esModule?e.default:e.default||e},render:function(e){var t=e.result,n=e.props;return r.createElement(t,n)}}),k=g.loadable,b=g.lazy,C=y({onLoad:function(e,t){e&&t.forwardedRef&&("function"==typeof t.forwardedRef?t.forwardedRef(e):t.forwardedRef.current=e)},render:function(e){var t=e.result,n=e.props;return n.children?n.children(t):null}}),E=C.loadable,w=C.lazy;var N=k;N.lib=E,b.lib=w;var R=N},750:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return c}});var r=n(7294),o=n(6016),a=n(2168),s=n(2263),i=(0,a.ZP)((function(){return Promise.all([n.e(592),n.e(376),n.e(147)]).then(n.bind(n,8147))}));function c(){var e=(0,s.Z)().siteConfig;return r.createElement(o.Z,{title:"Image",description:e.tagline},r.createElement(i,{className:"demo-canvas",src:"img/test.jpg",objectFit:"contain"}),r.createElement(i,{className:"demo-canvas",src:"https://i.kym-cdn.com/entries/icons/original/000/034/084/cover6.jpg"}),r.createElement(i,{className:"demo-canvas",src:"img/test2.jpg",objectFit:"cover"}))}}}]);
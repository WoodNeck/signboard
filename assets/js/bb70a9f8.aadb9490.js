(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[199],{9370:function(t,n,e){"use strict";var o=e(3552),i=e(7294),a=e(8546),s=function(t){function n(){return t.apply(this,arguments)||this}return(0,o.Z)(n,t),n.prototype.render=function(){return i.createElement("div",{className:"demo-canvas-wrapper"},i.createElement(a.Z,this.props))},n}(i.Component);n.Z=s},1253:function(t,n,e){"use strict";var o=e(7294);n.Z=function(t){var n=t.children,e=t.is,i=t.className,a=["column"];return e&&a.push("is-"+e),i&&a.push(i),o.createElement("div",{className:a.join(" ")},n)}},6901:function(t,n,e){"use strict";var o=e(7294);n.Z=function(t){var n=t.children;return o.createElement("div",{className:"columns"},n)}},7733:function(t,n,e){"use strict";e.r(n),e.d(n,{frontMatter:function(){return u},contentTitle:function(){return d},metadata:function(){return l},toc:function(){return m},default:function(){return k}});var o=e(2122),i=e(9756),a=(e(7294),e(3905)),s=e(6901),r=e(1253),c=e(9370),p=["components"],u={},d=void 0,l={unversionedId:"options/initOnFontLoad",id:"options/initOnFontLoad",isDocsHomePage:!1,title:"initOnFontLoad",description:"A option that can be used when you're using a custom font that should be loaded before initializing.",source:"@site/docs/options/initOnFontLoad.mdx",sourceDirName:"options",slug:"/options/initOnFontLoad",permalink:"/signboard/docs/options/initOnFontLoad",editUrl:"https://github.com/WoodNeck/signboard/edit/master/demo/docs/options/initOnFontLoad.mdx",version:"current",frontMatter:{},sidebar:"options",previous:{title:"scrollSpeed",permalink:"/signboard/docs/options/scrollSpeed"}},m=[],f={toc:m};function k(t){var n=t.components,e=(0,i.Z)(t,p);return(0,a.kt)("wrapper",(0,o.Z)({},f,e,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"A option that can be used when you're using a custom font that should be loaded before initializing.",(0,a.kt)("br",{parentName:"p"}),"\n","Enabling this option will make SignBoard to call ",(0,a.kt)("inlineCode",{parentName:"p"},"init")," after when the font described in ",(0,a.kt)("inlineCode",{parentName:"p"},"textOptions.font")," is loaded."),(0,a.kt)("p",null,'Test this page with enabling "Disable cache" option in your network tab of your DevTool.'),(0,a.kt)(s.Z,{mdxType:"Columns"},(0,a.kt)(r.Z,{is:6,mdxType:"ColumnItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'// Default\ninitOnFontLoad: false,\ntextOptions: {\n  font: "32pt Bungee"\n}\n'))),(0,a.kt)(r.Z,{is:6,mdxType:"ColumnItem"},(0,a.kt)(c.Z,{className:"options-canvas",contentType:"text",src:"custom",textOptions:{font:"32pt Bungee"},mdxType:"BlackSignBoard"}))),(0,a.kt)(s.Z,{mdxType:"Columns"},(0,a.kt)(r.Z,{is:6,mdxType:"ColumnItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'initOnFontLoad: true,\ntextOptions: {\n  font: "32pt Bungee"\n}\n'))),(0,a.kt)(r.Z,{is:6,mdxType:"ColumnItem"},(0,a.kt)(c.Z,{className:"options-canvas",contentType:"text",src:"custom",textOptions:{font:"32pt Bungee"},initOnFontLoad:!0,mdxType:"BlackSignBoard"}))),(0,a.kt)(s.Z,{mdxType:"Columns"},(0,a.kt)(r.Z,{is:6,mdxType:"ColumnItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'// If you want to check specific character is loaded, by default it will check whether the character "a" is loaded\ninitOnFontLoad: [true, "c"],\ntextOptions: {\n  font: "32pt Bungee"\n}\n'))),(0,a.kt)(r.Z,{is:6,mdxType:"ColumnItem"},(0,a.kt)(c.Z,{className:"options-canvas",contentType:"text",src:"custom",textOptions:{font:"32pt Bungee"},initOnFontLoad:[!0,"c"],mdxType:"BlackSignBoard"}))))}k.isMDXComponent=!0}}]);
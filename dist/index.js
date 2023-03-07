var $w=Object.defineProperty;var Gw=(n,e,t)=>e in n?$w(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var ft=(n,e,t)=>(Gw(n,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gp={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K=function(n,e){if(!n)throw oi(e)},oi=function(n){return new Error("Firebase Database ("+Gp.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kp=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Kw=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],o=n[t++],a=n[t++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Qu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],o=i+1<n.length,a=o?n[i+1]:0,c=i+2<n.length,u=c?n[i+2]:0,l=s>>2,h=(s&3)<<4|a>>4;let d=(a&15)<<2|u>>6,m=u&63;c||(m=64,o||(d=64)),r.push(t[l],t[h],t[d],t[m])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Kp(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Kw(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const u=i<n.length?t[n.charAt(i)]:64;++i;const h=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||a==null||u==null||h==null)throw new zw;const d=s<<2|a>>4;if(r.push(d),u!==64){const m=a<<4&240|u>>2;if(r.push(m),h!==64){const g=u<<6&192|h;r.push(g)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class zw extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const zp=function(n){const e=Kp(n);return Qu.encodeByteArray(e,!0)},bo=function(n){return zp(n).replace(/\./g,"")},Io=function(n){try{return Qu.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hw(n){return Hp(void 0,n)}function Hp(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Ww(t)||(n[t]=Hp(n[t],e[t]));return n}function Ww(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qw(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yw=()=>Qw().__FIREBASE_DEFAULTS__,Xw=()=>{if(typeof process>"u"||typeof process.env>"u")return;const n={}.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Jw=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Io(n[1]);return e&&JSON.parse(e)},ca=()=>{try{return Yw()||Xw()||Jw()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Zw=n=>{var e,t;return(t=(e=ca())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Yu=n=>{const e=Zw(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},eE=()=>{var n;return(n=ca())===null||n===void 0?void 0:n.config},tE=n=>{var e;return(e=ca())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xu{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wp(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n),a="";return[bo(JSON.stringify(t)),bo(JSON.stringify(o)),a].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ut(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ju(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ut())}function Qp(){var n;const e=(n=ca())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function nE(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Yp(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Xp(){return Gp.NODE_ADMIN===!0}function rE(){return!Qp()&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Jp(){try{return typeof indexedDB=="object"}catch{return!1}}function iE(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sE="FirebaseError";class fn extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=sE,Object.setPrototypeOf(this,fn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,fs.prototype.create)}}class fs{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?oE(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new fn(i,a,r)}}function oE(n,e){return n.replace(aE,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const aE=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wi(n){return JSON.parse(n)}function ut(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zp=function(n){let e={},t={},r={},i="";try{const s=n.split(".");e=Wi(Io(s[0])||""),t=Wi(Io(s[1])||""),i=s[2],r=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:r,signature:i}},cE=function(n){const e=Zp(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},uE=function(n){const e=Zp(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wn(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Wr(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function id(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function So(n,e,t){const r={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(r[i]=e.call(t,n[i],i,n));return r}function Co(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],o=e[i];if(sd(s)&&sd(o)){if(!Co(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function sd(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zu(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lE{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const r=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)r[h]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let h=0;h<16;h++)r[h]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let h=16;h<80;h++){const d=r[h-3]^r[h-8]^r[h-14]^r[h-16];r[h]=(d<<1|d>>>31)&4294967295}let i=this.chain_[0],s=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],u,l;for(let h=0;h<80;h++){h<40?h<20?(u=a^s&(o^a),l=1518500249):(u=s^o^a,l=1859775393):h<60?(u=s&o|a&(s|o),l=2400959708):(u=s^o^a,l=3395469782);const d=(i<<5|i>>>27)+u+c+l+r[h]&4294967295;c=a,a=o,o=(s<<30|s>>>2)&4294967295,s=i,i=d}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const r=t-this.blockSize;let i=0;const s=this.buf_;let o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=r;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(s[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}else for(;i<t;)if(s[o]=e[i],++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let r=0;for(let i=0;i<5;i++)for(let s=24;s>=0;s-=8)e[r]=this.chain_[i]>>s&255,++r;return e}}function hE(n,e){const t=new dE(n,e);return t.subscribe.bind(t)}class dE{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");fE(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=fc),i.error===void 0&&(i.error=fc),i.complete===void 0&&(i.complete=fc);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function fE(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function fc(){}function pE(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mE=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);if(i>=55296&&i<=56319){const s=i-55296;r++,K(r<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(r)-56320;i=65536+(s<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},ua=function(n){let e=0;for(let t=0;t<n.length;t++){const r=n.charCodeAt(t);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $e(n){return n&&n._delegate?n._delegate:n}class ln{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gE{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Xu;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(_E(e))try{this.getOrInitializeService({instanceIdentifier:zn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=zn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=zn){return this.instances.has(e)}getOptions(e=zn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:yE(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=zn){return this.component?this.component.multipleInstances?e:zn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function yE(n){return n===zn?void 0:n}function _E(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vE{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new gE(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ye;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ye||(ye={}));const wE={debug:ye.DEBUG,verbose:ye.VERBOSE,info:ye.INFO,warn:ye.WARN,error:ye.ERROR,silent:ye.SILENT},EE=ye.INFO,TE={[ye.DEBUG]:"log",[ye.VERBOSE]:"log",[ye.INFO]:"info",[ye.WARN]:"warn",[ye.ERROR]:"error"},bE=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=TE[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class la{constructor(e){this.name=e,this._logLevel=EE,this._logHandler=bE,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ye))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?wE[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ye.DEBUG,...e),this._logHandler(this,ye.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ye.VERBOSE,...e),this._logHandler(this,ye.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ye.INFO,...e),this._logHandler(this,ye.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ye.WARN,...e),this._logHandler(this,ye.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ye.ERROR,...e),this._logHandler(this,ye.ERROR,...e)}}const IE=(n,e)=>e.some(t=>n instanceof t);let od,ad;function SE(){return od||(od=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function CE(){return ad||(ad=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const em=new WeakMap,Gc=new WeakMap,tm=new WeakMap,pc=new WeakMap,el=new WeakMap;function NE(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(Dn(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&em.set(t,n)}).catch(()=>{}),el.set(e,n),e}function AE(n){if(Gc.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});Gc.set(n,e)}let Kc={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Gc.get(n);if(e==="objectStoreNames")return n.objectStoreNames||tm.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Dn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function DE(n){Kc=n(Kc)}function RE(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(mc(this),e,...t);return tm.set(r,e.sort?e.sort():[e]),Dn(r)}:CE().includes(n)?function(...e){return n.apply(mc(this),e),Dn(em.get(this))}:function(...e){return Dn(n.apply(mc(this),e))}}function xE(n){return typeof n=="function"?RE(n):(n instanceof IDBTransaction&&AE(n),IE(n,SE())?new Proxy(n,Kc):n)}function Dn(n){if(n instanceof IDBRequest)return NE(n);if(pc.has(n))return pc.get(n);const e=xE(n);return e!==n&&(pc.set(n,e),el.set(e,n)),e}const mc=n=>el.get(n);function kE(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(n,e),a=Dn(o);return r&&o.addEventListener("upgradeneeded",c=>{r(Dn(o.result),c.oldVersion,c.newVersion,Dn(o.transaction))}),t&&o.addEventListener("blocked",()=>t()),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",()=>i())}).catch(()=>{}),a}const OE=["get","getKey","getAll","getAllKeys","count"],PE=["put","add","delete","clear"],gc=new Map;function cd(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(gc.get(e))return gc.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=PE.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||OE.includes(t)))return;const s=async function(o,...a){const c=this.transaction(o,i?"readwrite":"readonly");let u=c.store;return r&&(u=u.index(a.shift())),(await Promise.all([u[t](...a),i&&c.done]))[0]};return gc.set(e,s),s}DE(n=>({...n,get:(e,t,r)=>cd(e,t)||n.get(e,t,r),has:(e,t)=>!!cd(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LE{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(ME(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function ME(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const zc="@firebase/app",ud="0.9.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cr=new la("@firebase/app"),FE="@firebase/app-compat",UE="@firebase/analytics-compat",BE="@firebase/analytics",VE="@firebase/app-check-compat",qE="@firebase/app-check",jE="@firebase/auth",$E="@firebase/auth-compat",GE="@firebase/database",KE="@firebase/database-compat",zE="@firebase/functions",HE="@firebase/functions-compat",WE="@firebase/installations",QE="@firebase/installations-compat",YE="@firebase/messaging",XE="@firebase/messaging-compat",JE="@firebase/performance",ZE="@firebase/performance-compat",eT="@firebase/remote-config",tT="@firebase/remote-config-compat",nT="@firebase/storage",rT="@firebase/storage-compat",iT="@firebase/firestore",sT="@firebase/firestore-compat",oT="firebase",aT="9.17.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hc="[DEFAULT]",cT={[zc]:"fire-core",[FE]:"fire-core-compat",[BE]:"fire-analytics",[UE]:"fire-analytics-compat",[qE]:"fire-app-check",[VE]:"fire-app-check-compat",[jE]:"fire-auth",[$E]:"fire-auth-compat",[GE]:"fire-rtdb",[KE]:"fire-rtdb-compat",[zE]:"fire-fn",[HE]:"fire-fn-compat",[WE]:"fire-iid",[QE]:"fire-iid-compat",[YE]:"fire-fcm",[XE]:"fire-fcm-compat",[JE]:"fire-perf",[ZE]:"fire-perf-compat",[eT]:"fire-rc",[tT]:"fire-rc-compat",[nT]:"fire-gcs",[rT]:"fire-gcs-compat",[iT]:"fire-fst",[sT]:"fire-fst-compat","fire-js":"fire-js",[oT]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const No=new Map,Wc=new Map;function uT(n,e){try{n.container.addComponent(e)}catch(t){cr.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function _n(n){const e=n.name;if(Wc.has(e))return cr.debug(`There were multiple attempts to register component ${e}.`),!1;Wc.set(e,n);for(const t of No.values())uT(t,n);return!0}function ha(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lT={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["no-options"]:"Need to provide options, when not being deployed to hosting via source.",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},Rn=new fs("app","Firebase",lT);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hT{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new ln("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Rn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ps=aT;function nm(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Hc,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw Rn.create("bad-app-name",{appName:String(i)});if(t||(t=eE()),!t)throw Rn.create("no-options");const s=No.get(i);if(s){if(Co(t,s.options)&&Co(r,s.config))return s;throw Rn.create("duplicate-app",{appName:i})}const o=new vE(i);for(const c of Wc.values())o.addComponent(c);const a=new hT(t,r,o);return No.set(i,a),a}function tl(n=Hc){const e=No.get(n);if(!e&&n===Hc)return nm();if(!e)throw Rn.create("no-app",{appName:n});return e}function Mt(n,e,t){var r;let i=(r=cT[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),cr.warn(a.join(" "));return}_n(new ln(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dT="firebase-heartbeat-database",fT=1,Qi="firebase-heartbeat-store";let yc=null;function rm(){return yc||(yc=kE(dT,fT,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Qi)}}}).catch(n=>{throw Rn.create("idb-open",{originalErrorMessage:n.message})})),yc}async function pT(n){try{return(await rm()).transaction(Qi).objectStore(Qi).get(im(n))}catch(e){if(e instanceof fn)cr.warn(e.message);else{const t=Rn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});cr.warn(t.message)}}}async function ld(n,e){try{const r=(await rm()).transaction(Qi,"readwrite");return await r.objectStore(Qi).put(e,im(n)),r.done}catch(t){if(t instanceof fn)cr.warn(t.message);else{const r=Rn.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});cr.warn(r.message)}}}function im(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mT=1024,gT=30*24*60*60*1e3;class yT{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new vT(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=hd();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(i=>{const s=new Date(i.date).valueOf();return Date.now()-s<=gT}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=hd(),{heartbeatsToSend:t,unsentEntries:r}=_T(this._heartbeatsCache.heartbeats),i=bo(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}}function hd(){return new Date().toISOString().substring(0,10)}function _T(n,e=mT){const t=[];let r=n.slice();for(const i of n){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),dd(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),dd(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class vT{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Jp()?iE().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await pT(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return ld(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return ld(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function dd(n){return bo(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wT(n){_n(new ln("platform-logger",e=>new LE(e),"PRIVATE")),_n(new ln("heartbeat",e=>new yT(e),"PRIVATE")),Mt(zc,ud,n),Mt(zc,ud,"esm2017"),Mt("fire-js","")}wT("");/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function sm(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function om(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const ET=om,am=new fs("auth","Firebase",om());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fd=new la("@firebase/auth");function co(n,...e){fd.logLevel<=ye.ERROR&&fd.error(`Auth (${ps}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pd(n,...e){throw nl(n,...e)}function cm(n,...e){return nl(n,...e)}function TT(n,e,t){const r=Object.assign(Object.assign({},ET()),{[e]:t});return new fs("auth","Firebase",r).create(e,{appName:n.name})}function nl(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return am.create(n,...e)}function Ee(n,e,...t){if(!n)throw nl(e,...t)}function Fi(n){const e="INTERNAL ASSERTION FAILED: "+n;throw co(e),new Error(e)}function Ao(n,e){n||Fi(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const md=new Map;function Zn(n){Ao(n instanceof Function,"Expected a class definition");let e=md.get(n);return e?(Ao(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,md.set(n,e),e)}function bT(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Zn);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function IT(){return gd()==="http:"||gd()==="https:"}function gd(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ST(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(IT()||nE()||"connection"in navigator)?navigator.onLine:!0}function CT(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ao(t>e,"Short delay should be less than long delay!"),this.isMobile=Ju()||Yp()}get(){return ST()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function NT(n,e){Ao(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class um{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;Fi("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;Fi("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;Fi("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AT={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DT=new ms(3e4,6e4);async function lm(n,e,t,r,i={}){return hm(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const a=Zu(Object.assign({key:n.config.apiKey},o)).slice(1),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode),um.fetch()(dm(n,n.config.apiHost,t,a),Object.assign({method:e,headers:c,referrerPolicy:"no-referrer"},s))})}async function hm(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},AT),e);try{const i=new RT(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw zs(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[c,u]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw zs(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw zs(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw zs(n,"user-disabled",o);const l=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw TT(n,l,u);pd(n,l)}}catch(i){if(i instanceof fn)throw i;pd(n,"internal-error",{message:String(i)})}}function dm(n,e,t,r){const i=`${e}${t}?${r}`;return n.config.emulator?NT(n.config,i):`${n.config.apiScheme}://${i}`}class RT{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(cm(this.auth,"network-request-failed")),DT.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function zs(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=cm(n,e,r);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xT(n,e){return lm(n,"POST","/v1/accounts:delete",e)}async function kT(n,e){return lm(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ui(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function OT(n,e=!1){const t=$e(n),r=await t.getIdToken(e),i=fm(r);Ee(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Ui(_c(i.auth_time)),issuedAtTime:Ui(_c(i.iat)),expirationTime:Ui(_c(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function _c(n){return Number(n)*1e3}function fm(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return co("JWT malformed, contained fewer than 3 sections"),null;try{const i=Io(t);return i?JSON.parse(i):(co("Failed to decode base64 JWT payload"),null)}catch(i){return co("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function PT(n){const e=fm(n);return Ee(e,"internal-error"),Ee(typeof e.exp<"u","internal-error"),Ee(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qc(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof fn&&LT(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function LT({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MT{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pm{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ui(this.lastLoginAt),this.creationTime=Ui(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Do(n){var e;const t=n.auth,r=await n.getIdToken(),i=await Qc(n,kT(t,{idToken:r}));Ee(i==null?void 0:i.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?BT(s.providerUserInfo):[],a=UT(n.providerData,o),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),l=c?u:!1,h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new pm(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,h)}async function FT(n){const e=$e(n);await Do(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function UT(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function BT(n){return n.map(e=>{var{providerId:t}=e,r=sm(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function VT(n,e){const t=await hm(n,{},async()=>{const r=Zu({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=dm(n,i,"/v1/token",`key=${s}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",um.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yi{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Ee(e.idToken,"internal-error"),Ee(typeof e.idToken<"u","internal-error"),Ee(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):PT(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}async getToken(e,t=!1){return Ee(!this.accessToken||this.refreshToken,e,"user-token-expired"),!t&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await VT(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new Yi;return r&&(Ee(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(Ee(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(Ee(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Yi,this.toJSON())}_performRefresh(){return Fi("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bn(n,e){Ee(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class qr{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=sm(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new MT(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new pm(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Qc(this,this.stsTokenManager.getToken(this.auth,e));return Ee(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return OT(this,e)}reload(){return FT(this)}_assign(e){this!==e&&(Ee(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new qr(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){Ee(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Do(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await Qc(this,xT(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,o,a,c,u,l;const h=(r=t.displayName)!==null&&r!==void 0?r:void 0,d=(i=t.email)!==null&&i!==void 0?i:void 0,m=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,g=(o=t.photoURL)!==null&&o!==void 0?o:void 0,b=(a=t.tenantId)!==null&&a!==void 0?a:void 0,C=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,B=(u=t.createdAt)!==null&&u!==void 0?u:void 0,$=(l=t.lastLoginAt)!==null&&l!==void 0?l:void 0,{uid:W,emailVerified:ee,isAnonymous:A,providerData:z,stsTokenManager:H}=t;Ee(W&&H,e,"internal-error");const X=Yi.fromJSON(this.name,H);Ee(typeof W=="string",e,"internal-error"),bn(h,e.name),bn(d,e.name),Ee(typeof ee=="boolean",e,"internal-error"),Ee(typeof A=="boolean",e,"internal-error"),bn(m,e.name),bn(g,e.name),bn(b,e.name),bn(C,e.name),bn(B,e.name),bn($,e.name);const ge=new qr({uid:W,auth:e,email:d,emailVerified:ee,displayName:h,isAnonymous:A,photoURL:g,phoneNumber:m,tenantId:b,stsTokenManager:X,createdAt:B,lastLoginAt:$});return z&&Array.isArray(z)&&(ge.providerData=z.map(Me=>Object.assign({},Me))),C&&(ge._redirectEventId=C),ge}static async _fromIdTokenResponse(e,t,r=!1){const i=new Yi;i.updateFromServerResponse(t);const s=new qr({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Do(s),s}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mm{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}mm.type="NONE";const yd=mm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vc(n,e,t){return`firebase:${n}:${e}:${t}`}class jr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=vc(this.userKey,i.apiKey,s),this.fullPersistenceKey=vc("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?qr._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new jr(Zn(yd),e,r);const i=(await Promise.all(t.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let s=i[0]||Zn(yd);const o=vc(r,e.config.apiKey,e.name);let a=null;for(const u of t)try{const l=await u._get(o);if(l){const h=qr._fromJSON(e,l);u!==s&&(a=h),s=u;break}}catch{}const c=i.filter(u=>u._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new jr(s,e,r):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(t.map(async u=>{if(u!==s)try{await u._remove(o)}catch{}})),new jr(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _d(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(GT(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(qT(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(zT(e))return"Blackberry";if(HT(e))return"Webos";if(jT(e))return"Safari";if((e.includes("chrome/")||$T(e))&&!e.includes("edge/"))return"Chrome";if(KT(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function qT(n=Ut()){return/firefox\//i.test(n)}function jT(n=Ut()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function $T(n=Ut()){return/crios\//i.test(n)}function GT(n=Ut()){return/iemobile/i.test(n)}function KT(n=Ut()){return/android/i.test(n)}function zT(n=Ut()){return/blackberry/i.test(n)}function HT(n=Ut()){return/webos/i.test(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gm(n,e=[]){let t;switch(n){case"Browser":t=_d(Ut());break;case"Worker":t=`${_d(Ut())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ps}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WT{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((o,a)=>{try{const c=e(s);o(c)}catch(c){a(c)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QT{constructor(e,t,r){this.app=e,this.heartbeatServiceProvider=t,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new vd(this),this.idTokenSubscription=new vd(this),this.beforeStateQueue=new WT(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=am,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Zn(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await jr.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var t;const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=i==null?void 0:i._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c!=null&&c.user)&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return Ee(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Do(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=CT()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const t=e?$e(e):null;return t&&Ee(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Ee(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(Zn(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new fs("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Zn(e)||this._popupRedirectResolver;Ee(t,this,"argument-error"),this.redirectPersistenceManager=await jr.create(this,[Zn(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t),o=this._isInitialized?Promise.resolve():this._initializationPromise;return Ee(o,this,"internal-error"),o.then(()=>s(this.currentUser)),typeof t=="function"?e.addObserver(t,r,i):e.addObserver(t)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Ee(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=gm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={["X-Client-Version"]:this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());return r&&(t["X-Firebase-Client"]=r),t}}function YT(n){return $e(n)}class vd{constructor(e){this.auth=e,this.observer=null,this.addObserver=hE(t=>this.observer=t)}get next(){return Ee(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}new ms(3e4,6e4);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new ms(2e3,1e4);/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new ms(3e4,6e4);/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new ms(5e3,15e3);var wd="@firebase/auth",Ed="0.21.4";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XT{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Ee(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JT(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function ZT(n){_n(new ln("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),{apiKey:s,authDomain:o}=r.options;return((a,c)=>{Ee(s&&!s.includes(":"),"invalid-api-key",{appName:a.name}),Ee(!(o!=null&&o.includes(":")),"argument-error",{appName:a.name});const u={apiKey:s,authDomain:o,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:gm(n)},l=new QT(a,c,u);return bT(l,t),l})(r,i)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),_n(new ln("auth-internal",e=>{const t=YT(e.getProvider("auth").getImmediate());return(r=>new XT(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Mt(wd,Ed,JT(n)),Mt(wd,Ed,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eb=5*60;tE("authIdTokenMaxAge");ZT("Browser");const Td="@firebase/database",bd="0.14.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ym="";function tb(n){ym=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nb{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ut(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Wi(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rb{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return wn(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _m=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new nb(e)}}catch{}return new rb},er=_m("localStorage"),Yc=_m("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $r=new la("@firebase/database"),ib=function(){let n=1;return function(){return n++}}(),vm=function(n){const e=mE(n),t=new lE;t.update(e);const r=t.digest();return Qu.encodeByteArray(r)},gs=function(...n){let e="";for(let t=0;t<n.length;t++){const r=n[t];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=gs.apply(null,r):typeof r=="object"?e+=ut(r):e+=r,e+=" "}return e};let rr=null,Id=!0;const sb=function(n,e){K(!e||n===!0||n===!1,"Can't turn on custom loggers persistently."),n===!0?($r.logLevel=ye.VERBOSE,rr=$r.log.bind($r),e&&Yc.set("logging_enabled",!0)):typeof n=="function"?rr=n:(rr=null,Yc.remove("logging_enabled"))},pt=function(...n){if(Id===!0&&(Id=!1,rr===null&&Yc.get("logging_enabled")===!0&&sb(!0)),rr){const e=gs.apply(null,n);rr(e)}},ys=function(n){return function(...e){pt(n,...e)}},Xc=function(...n){const e="FIREBASE INTERNAL ERROR: "+gs(...n);$r.error(e)},ur=function(...n){const e=`FIREBASE FATAL ERROR: ${gs(...n)}`;throw $r.error(e),new Error(e)},Ft=function(...n){const e="FIREBASE WARNING: "+gs(...n);$r.warn(e)},ob=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Ft("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},wm=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},ab=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},Qr="[MIN_NAME]",lr="[MAX_NAME]",ai=function(n,e){if(n===e)return 0;if(n===Qr||e===lr)return-1;if(e===Qr||n===lr)return 1;{const t=Sd(n),r=Sd(e);return t!==null?r!==null?t-r===0?n.length-e.length:t-r:-1:r!==null?1:n<e?-1:1}},cb=function(n,e){return n===e?0:n<e?-1:1},_i=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+ut(e))},rl=function(n){if(typeof n!="object"||n===null)return ut(n);const e=[];for(const r in n)e.push(r);e.sort();let t="{";for(let r=0;r<e.length;r++)r!==0&&(t+=","),t+=ut(e[r]),t+=":",t+=rl(n[e[r]]);return t+="}",t},Em=function(n,e){const t=n.length;if(t<=e)return[n];const r=[];for(let i=0;i<t;i+=e)i+e>t?r.push(n.substring(i,t)):r.push(n.substring(i,i+e));return r};function Gt(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const Tm=function(n){K(!wm(n),"Invalid JSON number");const e=11,t=52,r=(1<<e-1)-1;let i,s,o,a,c;n===0?(s=0,o=0,i=1/n===-1/0?1:0):(i=n<0,n=Math.abs(n),n>=Math.pow(2,1-r)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),r),s=a+r,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(s=0,o=Math.round(n/Math.pow(2,1-r-t))));const u=[];for(c=t;c;c-=1)u.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)u.push(s%2?1:0),s=Math.floor(s/2);u.push(i?1:0),u.reverse();const l=u.join("");let h="";for(c=0;c<64;c+=8){let d=parseInt(l.substr(c,8),2).toString(16);d.length===1&&(d="0"+d),h=h+d}return h.toLowerCase()},ub=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},lb=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"},hb=new RegExp("^-?(0*)\\d{1,10}$"),db=-2147483648,fb=2147483647,Sd=function(n){if(hb.test(n)){const e=Number(n);if(e>=db&&e<=fb)return e}return null},_s=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw Ft("Exception was thrown by user callback.",t),e},Math.floor(0))}},pb=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Bi=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mb{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(r=>this.appCheck=r)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,r):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(r=>r.addTokenListener(e))}notifyForInvalidToken(){Ft(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gb{constructor(e,t,r){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(pt("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,r):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Ft(e)}}class Jc{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Jc.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const il="5",bm="v",Im="s",Sm="r",Cm="f",Nm=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Am="ls",Dm="p",Zc="ac",Rm="websocket",xm="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yb{constructor(e,t,r,i,s=!1,o="",a=!1,c=!1){this.secure=t,this.namespace=r,this.webSocketOnly=i,this.nodeAdmin=s,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=er.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&er.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function _b(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function km(n,e,t){K(typeof e=="string","typeof type must == string"),K(typeof t=="object","typeof params must == object");let r;if(e===Rm)r=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===xm)r=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);_b(n)&&(t.ns=n.namespace);const i=[];return Gt(t,(s,o)=>{i.push(s+"="+o)}),r+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vb{constructor(){this.counters_={}}incrementCounter(e,t=1){wn(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Hw(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wc={},Ec={};function sl(n){const e=n.toString();return wc[e]||(wc[e]=new vb),wc[e]}function wb(n,e){const t=n.toString();return Ec[t]||(Ec[t]=e()),Ec[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eb{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<r.length;++i)r[i]&&_s(()=>{this.onMessage_(r[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cd="start",Tb="close",bb="pLPCommand",Ib="pRTLPCB",Om="id",Pm="pw",Lm="ser",Sb="cb",Cb="seg",Nb="ts",Ab="d",Db="dframe",Mm=1870,Fm=30,Rb=Mm-Fm,xb=25e3,kb=3e4;class Ur{constructor(e,t,r,i,s,o,a){this.connId=e,this.repoInfo=t,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ys(e),this.stats_=sl(t),this.urlFn=c=>(this.appCheckToken&&(c[Zc]=this.appCheckToken),km(t,xm,c))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Eb(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(kb)),ab(()=>{if(this.isClosed_)return;this.scriptTagHolder=new ol((...s)=>{const[o,a,c,u,l]=s;if(this.incrementIncomingBytes_(s),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Cd)this.id=a,this.password=c;else if(o===Tb)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...s)=>{const[o,a]=s;this.incrementIncomingBytes_(s),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const r={};r[Cd]="t",r[Lm]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[Sb]=this.scriptTagHolder.uniqueCallbackIdentifier),r[bm]=il,this.transportSessionId&&(r[Im]=this.transportSessionId),this.lastSessionId&&(r[Am]=this.lastSessionId),this.applicationId&&(r[Dm]=this.applicationId),this.appCheckToken&&(r[Zc]=this.appCheckToken),typeof location<"u"&&location.hostname&&Nm.test(location.hostname)&&(r[Sm]=Cm);const i=this.urlFn(r);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Ur.forceAllow_=!0}static forceDisallow(){Ur.forceDisallow_=!0}static isAvailable(){return Ur.forceAllow_?!0:!Ur.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!ub()&&!lb()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=ut(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const r=zp(t),i=Em(r,Rb);for(let s=0;s<i.length;s++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[s]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const r={};r[Db]="t",r[Om]=e,r[Pm]=t,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=ut(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class ol{constructor(e,t,r,i){this.onDisconnect=r,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=ib(),window[bb+this.uniqueCallbackIdentifier]=e,window[Ib+this.uniqueCallbackIdentifier]=t,this.myIFrame=ol.createIFrame_();let s="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(s='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+s+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){pt("frame writing exception"),a.stack&&pt(a.stack),pt(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||pt("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Om]=this.myID,e[Pm]=this.myPW,e[Lm]=this.currentSerial;let t=this.urlFn(e),r="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Fm+r.length<=Mm;){const o=this.pendingSegs.shift();r=r+"&"+Cb+i+"="+o.seg+"&"+Nb+i+"="+o.ts+"&"+Ab+i+"="+o.d,i++}return t=t+r,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,r){this.pendingSegs.push({seg:e,ts:t,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const r=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(r,Math.floor(xb)),s=()=>{clearTimeout(i),r()};this.addTag(e,s)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const i=r.readyState;(!i||i==="loaded"||i==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),t())},r.onerror=()=>{pt("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ob=16384,Pb=45e3;let Ro=null;typeof MozWebSocket<"u"?Ro=MozWebSocket:typeof WebSocket<"u"&&(Ro=WebSocket);class Yt{constructor(e,t,r,i,s,o,a){this.connId=e,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ys(this.connId),this.stats_=sl(t),this.connURL=Yt.connectionURL_(t,o,a,i,r),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,r,i,s){const o={};return o[bm]=il,typeof location<"u"&&location.hostname&&Nm.test(location.hostname)&&(o[Sm]=Cm),t&&(o[Im]=t),r&&(o[Am]=r),i&&(o[Zc]=i),s&&(o[Dm]=s),km(e,Rm,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,er.set("previous_websocket_failure",!0);try{let r;Xp(),this.mySock=new Ro(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){Yt.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(t);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&Ro!==null&&!Yt.forceDisallow_}static previouslyFailed(){return er.isInMemoryStorage||er.get("previous_websocket_failure")===!0}markConnectionHealthy(){er.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const r=Wi(t);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(K(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const r=this.extractFrameCount_(t);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const t=ut(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const r=Em(t,Ob);r.length>1&&this.sendString_(String(r.length));for(let i=0;i<r.length;i++)this.sendString_(r[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Pb))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Yt.responsesRequiredToBeHealthy=2;Yt.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[Ur,Yt]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const t=Yt&&Yt.isAvailable();let r=t&&!Yt.previouslyFailed();if(e.webSocketOnly&&(t||Ft("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[Yt];else{const i=this.transports_=[];for(const s of Xi.ALL_TRANSPORTS)s&&s.isAvailable()&&i.push(s);Xi.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Xi.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lb=6e4,Mb=5e3,Fb=10*1024,Ub=100*1024,Tc="t",Nd="d",Bb="s",Ad="r",Vb="e",Dd="o",Rd="a",xd="n",kd="p",qb="h";class jb{constructor(e,t,r,i,s,o,a,c,u,l){this.id=e,this.repoInfo_=t,this.applicationId_=r,this.appCheckToken_=i,this.authToken_=s,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=u,this.lastSessionId=l,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ys("c:"+this.id+":"),this.transportManager_=new Xi(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,r)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Bi(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Ub?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Fb?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Tc in e){const t=e[Tc];t===Rd?this.upgradeIfSecondaryHealthy_():t===Ad?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Dd&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=_i("t",e),r=_i("d",e);if(t==="c")this.onSecondaryControl_(r);else if(t==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:kd,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Rd,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:xd,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=_i("t",e),r=_i("d",e);t==="c"?this.onControl_(r):t==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=_i(Tc,e);if(Nd in e){const r=e[Nd];if(t===qb){const i=Object.assign({},r);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===xd){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Bb?this.onConnectionShutdown_(r):t===Ad?this.onReset_(r):t===Vb?Xc("Server Error: "+r):t===Dd?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Xc("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,r=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),il!==r&&Ft("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,r),Bi(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Lb))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Bi(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Mb))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:kd,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(er.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Um{put(e,t,r,i){}merge(e,t,r,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,r){}onDisconnectMerge(e,t,r){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bm{constructor(e){this.allowedEvents_=e,this.listeners_={},K(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let i=0;i<r.length;i++)r[i].callback.apply(r[i].context,t)}}on(e,t,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:r});const i=this.getInitialEvent(e);i&&t.apply(r,i)}off(e,t,r){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let s=0;s<i.length;s++)if(i[s].callback===t&&(!r||r===i[s].context)){i.splice(s,1);return}}validateEventType_(e){K(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo extends Bm{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Ju()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new xo}getInitialEvent(e){return K(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Od=32,Pd=768;class Oe{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let r=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[r]=this.pieces_[i],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function Se(){return new Oe("")}function pe(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Ln(n){return n.pieces_.length-n.pieceNum_}function ke(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new Oe(n.pieces_,e)}function Vm(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function $b(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function qm(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function jm(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new Oe(e,0)}function nt(n,e){const t=[];for(let r=n.pieceNum_;r<n.pieces_.length;r++)t.push(n.pieces_[r]);if(e instanceof Oe)for(let r=e.pieceNum_;r<e.pieces_.length;r++)t.push(e.pieces_[r]);else{const r=e.split("/");for(let i=0;i<r.length;i++)r[i].length>0&&t.push(r[i])}return new Oe(t,0)}function de(n){return n.pieceNum_>=n.pieces_.length}function jt(n,e){const t=pe(n),r=pe(e);if(t===null)return e;if(t===r)return jt(ke(n),ke(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function $m(n,e){if(Ln(n)!==Ln(e))return!1;for(let t=n.pieceNum_,r=e.pieceNum_;t<=n.pieces_.length;t++,r++)if(n.pieces_[t]!==e.pieces_[r])return!1;return!0}function Xt(n,e){let t=n.pieceNum_,r=e.pieceNum_;if(Ln(n)>Ln(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[r])return!1;++t,++r}return!0}class Gb{constructor(e,t){this.errorPrefix_=t,this.parts_=qm(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=ua(this.parts_[r]);Gm(this)}}function Kb(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=ua(e),Gm(n)}function zb(n){const e=n.parts_.pop();n.byteLength_-=ua(e),n.parts_.length>0&&(n.byteLength_-=1)}function Gm(n){if(n.byteLength_>Pd)throw new Error(n.errorPrefix_+"has a key path longer than "+Pd+" bytes ("+n.byteLength_+").");if(n.parts_.length>Od)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Od+") or object contains a cycle "+Hn(n))}function Hn(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class al extends Bm{constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}static getInstance(){return new al}getInitialEvent(e){return K(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vi=1e3,Hb=60*5*1e3,Ld=30*1e3,Wb=1.3,Qb=3e4,Yb="server_kill",Md=3;class yn extends Um{constructor(e,t,r,i,s,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=r,this.onConnectStatus_=i,this.onServerInfoUpdate_=s,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=yn.nextPersistentConnectionId_++,this.log_=ys("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=vi,this.maxReconnectDelay_=Hb,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c&&!Xp())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");al.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&xo.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,r){const i=++this.requestNumber_,s={r:i,a:e,b:t};this.log_(ut(s)),K(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),r&&(this.requestCBHash_[i]=r)}get(e){this.initConnection_();const t=new Xu,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const s=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(s),t.promise}listen(e,t,r,i){this.initConnection_();const s=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+s),this.listens.has(o)||this.listens.set(o,new Map),K(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),K(!this.listens.get(o).has(s),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:t,query:e,tag:r};this.listens.get(o).set(s,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(r)})}sendListen_(e){const t=e.query,r=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+r+" for "+i);const s={p:r},o="q";e.tag&&(s.q=t._queryObject,s.t=e.tag),s.h=e.hashFn(),this.sendRequest(o,s,a=>{const c=a.d,u=a.s;yn.warnOnListenWarnings_(c,t),(this.listens.get(r)&&this.listens.get(r).get(i))===e&&(this.log_("listen response",a),u!=="ok"&&this.removeListen_(r,i),e.onComplete&&e.onComplete(u,c))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&wn(e,"w")){const r=Wr(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',s=t._path.toString();Ft(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${s} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||uE(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Ld)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=cE(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(t,r,i=>{const s=i.s,o=i.d||"error";this.authToken_===e&&(s==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(s,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,r=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,r)})}unlisten(e,t){const r=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+i),K(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,i)&&this.connected_&&this.sendUnlisten_(r,i,e._queryObject,t)}sendUnlisten_(e,t,r,i){this.log_("Unlisten on "+e+" for "+t);const s={p:e},o="n";i&&(s.q=r,s.t=i),this.sendRequest(o,s)}onDisconnectPut(e,t,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:r})}onDisconnectMerge(e,t,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:r})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,r,i){const s={p:t,d:r};this.log_("onDisconnect "+e,s),this.sendRequest(e,s,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,r,i){this.putInternal("p",e,t,r,i)}merge(e,t,r,i){this.putInternal("m",e,t,r,i)}putInternal(e,t,r,i,s){this.initConnection_();const o={p:t,d:r};s!==void 0&&(o.h=s),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,r,s=>{this.log_(t+" response",s),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(s.s,s.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,r=>{if(r.s!=="ok"){const s=r.d;this.log_("reportStats","Error sending stats: "+s)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ut(e));const t=e.r,r=this.requestCBHash_[t];r&&(delete this.requestCBHash_[t],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Xc("Unrecognized action received from server: "+ut(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){K(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=vi,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=vi,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Qb&&(this.reconnectDelay_=vi),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Wb)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+yn.nextConnectionId_++,s=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,r())},u=function(h){K(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(h)};this.realtime_={close:c,sendRequest:u};const l=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,d]=await Promise.all([this.authTokenProvider_.getToken(l),this.appCheckTokenProvider_.getToken(l)]);o?pt("getToken() completed but was canceled"):(pt("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=d&&d.token,a=new jb(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,r,m=>{Ft(m+" ("+this.repoInfo_.toString()+")"),this.interrupt(Yb)},s))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&Ft(h),c())}}}interrupt(e){pt("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){pt("Resuming connection for reason: "+e),delete this.interruptReasons_[e],id(this.interruptReasons_)&&(this.reconnectDelay_=vi,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let r;t?r=t.map(s=>rl(s)).join("$"):r="default";const i=this.removeListen_(e,r);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const r=new Oe(e).toString();let i;if(this.listens.has(r)){const s=this.listens.get(r);i=s.get(t),s.delete(t),s.size===0&&this.listens.delete(r)}else i=void 0;return i}onAuthRevoked_(e,t){pt("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Md&&(this.reconnectDelay_=Ld,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){pt("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Md&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+ym.replace(/\./g,"-")]=1,Ju()?e["framework.cordova"]=1:Yp()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=xo.getInstance().currentlyOnline();return id(this.interruptReasons_)&&e}}yn.nextPersistentConnectionId_=0;yn.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new me(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const r=new me(Qr,e),i=new me(Qr,t);return this.compare(r,i)!==0}minPost(){return me.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hs;class Km extends da{static get __EMPTY_NODE(){return Hs}static set __EMPTY_NODE(e){Hs=e}compare(e,t){return ai(e.name,t.name)}isDefinedOn(e){throw oi("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return me.MIN}maxPost(){return new me(lr,Hs)}makePost(e,t){return K(typeof e=="string","KeyIndex indexValue must always be a string."),new me(e,Hs)}toString(){return".key"}}const Gr=new Km;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ws{constructor(e,t,r,i,s=null){this.isReverse_=i,this.resultGenerator_=s,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?r(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class tt{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??tt.RED,this.left=i??xt.EMPTY_NODE,this.right=s??xt.EMPTY_NODE}copy(e,t,r,i,s){return new tt(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return s<0?i=i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return xt.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let r,i;if(r=this,t(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),t(e,r.key)===0){if(r.right.isEmpty())return xt.EMPTY_NODE;i=r.right.min_(),r=r.copy(i.key,i.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,tt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,tt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}tt.RED=!0;tt.BLACK=!1;class Xb{copy(e,t,r,i,s){return this}insert(e,t,r){return new tt(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class xt{constructor(e,t=xt.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new xt(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,tt.BLACK,null,null))}remove(e){return new xt(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,tt.BLACK,null,null))}get(e){let t,r=this.root_;for(;!r.isEmpty();){if(t=this.comparator_(e,r.key),t===0)return r.value;t<0?r=r.left:t>0&&(r=r.right)}return null}getPredecessorKey(e){let t,r=this.root_,i=null;for(;!r.isEmpty();)if(t=this.comparator_(e,r.key),t===0){if(r.left.isEmpty())return i?i.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else t<0?r=r.left:t>0&&(i=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Ws(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Ws(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Ws(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Ws(this.root_,null,this.comparator_,!0,e)}}xt.EMPTY_NODE=new Xb;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jb(n,e){return ai(n.name,e.name)}function cl(n,e){return ai(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eu;function Zb(n){eu=n}const zm=function(n){return typeof n=="number"?"number:"+Tm(n):"string:"+n},Hm=function(n){if(n.isLeafNode()){const e=n.val();K(typeof e=="string"||typeof e=="number"||typeof e=="object"&&wn(e,".sv"),"Priority must be a string or number.")}else K(n===eu||n.isEmpty(),"priority of unexpected type.");K(n===eu||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fd;class Ze{constructor(e,t=Ze.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,K(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Hm(this.priorityNode_)}static set __childrenNodeConstructor(e){Fd=e}static get __childrenNodeConstructor(){return Fd}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Ze(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Ze.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return de(e)?this:pe(e)===".priority"?this.priorityNode_:Ze.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:Ze.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const r=pe(e);return r===null?t:t.isEmpty()&&r!==".priority"?this:(K(r!==".priority"||Ln(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,Ze.__childrenNodeConstructor.EMPTY_NODE.updateChild(ke(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+zm(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=Tm(this.value_):e+=this.value_,this.lazyHash_=vm(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Ze.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Ze.__childrenNodeConstructor?-1:(K(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,r=typeof this.value_,i=Ze.VALUE_TYPE_ORDER.indexOf(t),s=Ze.VALUE_TYPE_ORDER.indexOf(r);return K(i>=0,"Unknown leaf type: "+t),K(s>=0,"Unknown leaf type: "+r),i===s?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:s-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}Ze.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wm,Qm;function eI(n){Wm=n}function tI(n){Qm=n}class nI extends da{compare(e,t){const r=e.node.getPriority(),i=t.node.getPriority(),s=r.compareTo(i);return s===0?ai(e.name,t.name):s}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return me.MIN}maxPost(){return new me(lr,new Ze("[PRIORITY-POST]",Qm))}makePost(e,t){const r=Wm(e);return new me(t,new Ze("[PRIORITY-POST]",r))}toString(){return".priority"}}const yt=new nI;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rI=Math.log(2);class iI{constructor(e){const t=s=>parseInt(Math.log(s)/rI,10),r=s=>parseInt(Array(s+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=r(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const ko=function(n,e,t,r){n.sort(e);const i=function(c,u){const l=u-c;let h,d;if(l===0)return null;if(l===1)return h=n[c],d=t?t(h):h,new tt(d,h.node,tt.BLACK,null,null);{const m=parseInt(l/2,10)+c,g=i(c,m),b=i(m+1,u);return h=n[m],d=t?t(h):h,new tt(d,h.node,tt.BLACK,g,b)}},s=function(c){let u=null,l=null,h=n.length;const d=function(g,b){const C=h-g,B=h;h-=g;const $=i(C+1,B),W=n[C],ee=t?t(W):W;m(new tt(ee,W.node,b,null,$))},m=function(g){u?(u.left=g,u=g):(l=g,u=g)};for(let g=0;g<c.count;++g){const b=c.nextBitIsOne(),C=Math.pow(2,c.count-(g+1));b?d(C,tt.BLACK):(d(C,tt.BLACK),d(C,tt.RED))}return l},o=new iI(n.length),a=s(o);return new xt(r||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bc;const xr={};class pn{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return K(xr&&yt,"ChildrenNode.ts has not been loaded"),bc=bc||new pn({".priority":xr},{".priority":yt}),bc}get(e){const t=Wr(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof xt?t:null}hasIndex(e){return wn(this.indexSet_,e.toString())}addIndex(e,t){K(e!==Gr,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let i=!1;const s=t.getIterator(me.Wrap);let o=s.getNext();for(;o;)i=i||e.isDefinedOn(o.node),r.push(o),o=s.getNext();let a;i?a=ko(r,e.getCompare()):a=xr;const c=e.toString(),u=Object.assign({},this.indexSet_);u[c]=e;const l=Object.assign({},this.indexes_);return l[c]=a,new pn(l,u)}addToIndexes(e,t){const r=So(this.indexes_,(i,s)=>{const o=Wr(this.indexSet_,s);if(K(o,"Missing index implementation for "+s),i===xr)if(o.isDefinedOn(e.node)){const a=[],c=t.getIterator(me.Wrap);let u=c.getNext();for(;u;)u.name!==e.name&&a.push(u),u=c.getNext();return a.push(e),ko(a,o.getCompare())}else return xr;else{const a=t.get(e.name);let c=i;return a&&(c=c.remove(new me(e.name,a))),c.insert(e,e.node)}});return new pn(r,this.indexSet_)}removeFromIndexes(e,t){const r=So(this.indexes_,i=>{if(i===xr)return i;{const s=t.get(e.name);return s?i.remove(new me(e.name,s)):i}});return new pn(r,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wi;class Te{constructor(e,t,r){this.children_=e,this.priorityNode_=t,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&Hm(this.priorityNode_),this.children_.isEmpty()&&K(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return wi||(wi=new Te(new xt(cl),null,pn.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||wi}updatePriority(e){return this.children_.isEmpty()?this:new Te(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?wi:t}}getChild(e){const t=pe(e);return t===null?this:this.getImmediateChild(t).getChild(ke(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(K(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const r=new me(e,t);let i,s;t.isEmpty()?(i=this.children_.remove(e),s=this.indexMap_.removeFromIndexes(r,this.children_)):(i=this.children_.insert(e,t),s=this.indexMap_.addToIndexes(r,this.children_));const o=i.isEmpty()?wi:this.priorityNode_;return new Te(i,o,s)}}updateChild(e,t){const r=pe(e);if(r===null)return t;{K(pe(e)!==".priority"||Ln(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(r).updateChild(ke(e),t);return this.updateImmediateChild(r,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let r=0,i=0,s=!0;if(this.forEachChild(yt,(o,a)=>{t[o]=a.val(e),r++,s&&Te.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):s=!1}),!e&&s&&i<2*r){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+zm(this.getPriority().val())+":"),this.forEachChild(yt,(t,r)=>{const i=r.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":vm(e)}return this.lazyHash_}getPredecessorChildName(e,t,r){const i=this.resolveIndex_(r);if(i){const s=i.getPredecessorKey(new me(e,t));return s?s.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const r=t.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new me(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const r=t.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new me(t,this.children_.get(t)):null}forEachChild(e,t){const r=this.resolveIndex_(e);return r?r.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const r=this.resolveIndex_(t);if(r)return r.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,me.Wrap);let s=i.peek();for(;s!=null&&t.compare(s,e)<0;)i.getNext(),s=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const r=this.resolveIndex_(t);if(r)return r.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,me.Wrap);let s=i.peek();for(;s!=null&&t.compare(s,e)>0;)i.getNext(),s=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===vs?-1:0}withIndex(e){if(e===Gr||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new Te(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Gr||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const r=this.getIterator(yt),i=t.getIterator(yt);let s=r.getNext(),o=i.getNext();for(;s&&o;){if(s.name!==o.name||!s.node.equals(o.node))return!1;s=r.getNext(),o=i.getNext()}return s===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Gr?null:this.indexMap_.get(e.toString())}}Te.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class sI extends Te{constructor(){super(new xt(cl),Te.EMPTY_NODE,pn.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return Te.EMPTY_NODE}isEmpty(){return!1}}const vs=new sI;Object.defineProperties(me,{MIN:{value:new me(Qr,Te.EMPTY_NODE)},MAX:{value:new me(lr,vs)}});Km.__EMPTY_NODE=Te.EMPTY_NODE;Ze.__childrenNodeConstructor=Te;Zb(vs);tI(vs);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oI=!0;function mt(n,e=null){if(n===null)return Te.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),K(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new Ze(t,mt(e))}if(!(n instanceof Array)&&oI){const t=[];let r=!1;if(Gt(n,(o,a)=>{if(o.substring(0,1)!=="."){const c=mt(a);c.isEmpty()||(r=r||!c.getPriority().isEmpty(),t.push(new me(o,c)))}}),t.length===0)return Te.EMPTY_NODE;const s=ko(t,Jb,o=>o.name,cl);if(r){const o=ko(t,yt.getCompare());return new Te(s,mt(e),new pn({".priority":o},{".priority":yt}))}else return new Te(s,mt(e),pn.Default)}else{let t=Te.EMPTY_NODE;return Gt(n,(r,i)=>{if(wn(n,r)&&r.substring(0,1)!=="."){const s=mt(i);(s.isLeafNode()||!s.isEmpty())&&(t=t.updateImmediateChild(r,s))}}),t.updatePriority(mt(e))}}eI(mt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aI extends da{constructor(e){super(),this.indexPath_=e,K(!de(e)&&pe(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const r=this.extractChild(e.node),i=this.extractChild(t.node),s=r.compareTo(i);return s===0?ai(e.name,t.name):s}makePost(e,t){const r=mt(e),i=Te.EMPTY_NODE.updateChild(this.indexPath_,r);return new me(t,i)}maxPost(){const e=Te.EMPTY_NODE.updateChild(this.indexPath_,vs);return new me(lr,e)}toString(){return qm(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cI extends da{compare(e,t){const r=e.node.compareTo(t.node);return r===0?ai(e.name,t.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return me.MIN}maxPost(){return me.MAX}makePost(e,t){const r=mt(e);return new me(t,r)}toString(){return".value"}}const uI=new cI;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lI(n){return{type:"value",snapshotNode:n}}function hI(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function dI(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Ud(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function fI(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ul{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=yt}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return K(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return K(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Qr}hasEnd(){return this.endSet_}getIndexEndValue(){return K(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return K(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:lr}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return K(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===yt}copy(){const e=new ul;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Bd(n){const e={};if(n.isDefault())return e;let t;if(n.index_===yt?t="$priority":n.index_===uI?t="$value":n.index_===Gr?t="$key":(K(n.index_ instanceof aI,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=ut(t),n.startSet_){const r=n.startAfterSet_?"startAfter":"startAt";e[r]=ut(n.indexStartValue_),n.startNameSet_&&(e[r]+=","+ut(n.indexStartName_))}if(n.endSet_){const r=n.endBeforeSet_?"endBefore":"endAt";e[r]=ut(n.indexEndValue_),n.endNameSet_&&(e[r]+=","+ut(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Vd(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==yt&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo extends Um{constructor(e,t,r,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=r,this.appCheckTokenProvider_=i,this.log_=ys("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(K(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,r,i){const s=e._path.toString();this.log_("Listen called for "+s+" "+e._queryIdentifier);const o=Oo.getListenId_(e,r),a={};this.listens_[o]=a;const c=Bd(e._queryParams);this.restRequest_(s+".json",c,(u,l)=>{let h=l;if(u===404&&(h=null,u=null),u===null&&this.onDataUpdate_(s,h,!1,r),Wr(this.listens_,o)===a){let d;u?u===401?d="permission_denied":d="rest_error:"+u:d="ok",i(d,null)}})}unlisten(e,t){const r=Oo.getListenId_(e,t);delete this.listens_[r]}get(e){const t=Bd(e._queryParams),r=e._path.toString(),i=new Xu;return this.restRequest_(r+".json",t,(s,o)=>{let a=o;s===404&&(a=null,s=null),s===null?(this.onDataUpdate_(r,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},r){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,s])=>{i&&i.accessToken&&(t.auth=i.accessToken),s&&s.token&&(t.ac=s.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Zu(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(r&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=Wi(a.responseText)}catch{Ft("Failed to parse JSON response for "+o+": "+a.responseText)}r(null,c)}else a.status!==401&&a.status!==404&&Ft("Got unsuccessful REST response for "+o+" Status: "+a.status),r(a.status);r=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pI{constructor(){this.rootNode_=Te.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Po(){return{value:null,children:new Map}}function Ym(n,e,t){if(de(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const r=pe(e);n.children.has(r)||n.children.set(r,Po());const i=n.children.get(r);e=ke(e),Ym(i,e,t)}}function tu(n,e,t){n.value!==null?t(e,n.value):mI(n,(r,i)=>{const s=new Oe(e.toString()+"/"+r);tu(i,s,t)})}function mI(n,e){n.children.forEach((t,r)=>{e(r,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gI{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&Gt(this.last_,(r,i)=>{t[r]=t[r]-i}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qd=10*1e3,yI=30*1e3,_I=5*60*1e3;class vI{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new gI(e);const r=qd+(yI-qd)*Math.random();Bi(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),t={};let r=!1;Gt(e,(i,s)=>{s>0&&wn(this.statsToReport_,i)&&(t[i]=s,r=!0)}),r&&this.server_.reportStats(t),Bi(this.reportStats_.bind(this),Math.floor(Math.random()*2*_I))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var on;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(on||(on={}));function Xm(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Jm(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Zm(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lo{constructor(e,t,r){this.path=e,this.affectedTree=t,this.revert=r,this.type=on.ACK_USER_WRITE,this.source=Xm()}operationForChild(e){if(de(this.path)){if(this.affectedTree.value!=null)return K(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new Oe(e));return new Lo(Se(),t,this.revert)}}else return K(pe(this.path)===e,"operationForChild called for unrelated child."),new Lo(ke(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(e,t,r){this.source=e,this.path=t,this.snap=r,this.type=on.OVERWRITE}operationForChild(e){return de(this.path)?new hr(this.source,Se(),this.snap.getImmediateChild(e)):new hr(this.source,ke(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji{constructor(e,t,r){this.source=e,this.path=t,this.children=r,this.type=on.MERGE}operationForChild(e){if(de(this.path)){const t=this.children.subtree(new Oe(e));return t.isEmpty()?null:t.value?new hr(this.source,Se(),t.value):new Ji(this.source,Se(),t)}else return K(pe(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ji(this.source,ke(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ll{constructor(e,t,r){this.node_=e,this.fullyInitialized_=t,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(de(e))return this.isFullyInitialized()&&!this.filtered_;const t=pe(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}function wI(n,e,t,r){const i=[],s=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&s.push(fI(o.childName,o.snapshotNode))}),Ei(n,i,"child_removed",e,r,t),Ei(n,i,"child_added",e,r,t),Ei(n,i,"child_moved",s,r,t),Ei(n,i,"child_changed",e,r,t),Ei(n,i,"value",e,r,t),i}function Ei(n,e,t,r,i,s){const o=r.filter(a=>a.type===t);o.sort((a,c)=>TI(n,a,c)),o.forEach(a=>{const c=EI(n,a,s);i.forEach(u=>{u.respondsTo(a.type)&&e.push(u.createEvent(c,n.query_))})})}function EI(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function TI(n,e,t){if(e.childName==null||t.childName==null)throw oi("Should only compare child_ events.");const r=new me(e.childName,e.snapshotNode),i=new me(t.childName,t.snapshotNode);return n.index_.compare(r,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eg(n,e){return{eventCache:n,serverCache:e}}function Vi(n,e,t,r){return eg(new ll(e,t,r),n.serverCache)}function tg(n,e,t,r){return eg(n.eventCache,new ll(e,t,r))}function nu(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function dr(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ic;const bI=()=>(Ic||(Ic=new xt(cb)),Ic);class xe{constructor(e,t=bI()){this.value=e,this.children=t}static fromObject(e){let t=new xe(null);return Gt(e,(r,i)=>{t=t.set(new Oe(r),i)}),t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:Se(),value:this.value};if(de(e))return null;{const r=pe(e),i=this.children.get(r);if(i!==null){const s=i.findRootMostMatchingPathAndValue(ke(e),t);return s!=null?{path:nt(new Oe(r),s.path),value:s.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(de(e))return this;{const t=pe(e),r=this.children.get(t);return r!==null?r.subtree(ke(e)):new xe(null)}}set(e,t){if(de(e))return new xe(t,this.children);{const r=pe(e),s=(this.children.get(r)||new xe(null)).set(ke(e),t),o=this.children.insert(r,s);return new xe(this.value,o)}}remove(e){if(de(e))return this.children.isEmpty()?new xe(null):new xe(null,this.children);{const t=pe(e),r=this.children.get(t);if(r){const i=r.remove(ke(e));let s;return i.isEmpty()?s=this.children.remove(t):s=this.children.insert(t,i),this.value===null&&s.isEmpty()?new xe(null):new xe(this.value,s)}else return this}}get(e){if(de(e))return this.value;{const t=pe(e),r=this.children.get(t);return r?r.get(ke(e)):null}}setTree(e,t){if(de(e))return t;{const r=pe(e),s=(this.children.get(r)||new xe(null)).setTree(ke(e),t);let o;return s.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,s),new xe(this.value,o)}}fold(e){return this.fold_(Se(),e)}fold_(e,t){const r={};return this.children.inorderTraversal((i,s)=>{r[i]=s.fold_(nt(e,i),t)}),t(e,this.value,r)}findOnPath(e,t){return this.findOnPath_(e,Se(),t)}findOnPath_(e,t,r){const i=this.value?r(t,this.value):!1;if(i)return i;if(de(e))return null;{const s=pe(e),o=this.children.get(s);return o?o.findOnPath_(ke(e),nt(t,s),r):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,Se(),t)}foreachOnPath_(e,t,r){if(de(e))return this;{this.value&&r(t,this.value);const i=pe(e),s=this.children.get(i);return s?s.foreachOnPath_(ke(e),nt(t,i),r):new xe(null)}}foreach(e){this.foreach_(Se(),e)}foreach_(e,t){this.children.inorderTraversal((r,i)=>{i.foreach_(nt(e,r),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,r)=>{r.value&&e(t,r.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(e){this.writeTree_=e}static empty(){return new Jt(new xe(null))}}function qi(n,e,t){if(de(e))return new Jt(new xe(t));{const r=n.writeTree_.findRootMostValueAndPath(e);if(r!=null){const i=r.path;let s=r.value;const o=jt(i,e);return s=s.updateChild(o,t),new Jt(n.writeTree_.set(i,s))}else{const i=new xe(t),s=n.writeTree_.setTree(e,i);return new Jt(s)}}}function jd(n,e,t){let r=n;return Gt(t,(i,s)=>{r=qi(r,nt(e,i),s)}),r}function $d(n,e){if(de(e))return Jt.empty();{const t=n.writeTree_.setTree(e,new xe(null));return new Jt(t)}}function ru(n,e){return Ir(n,e)!=null}function Ir(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(jt(t.path,e)):null}function Gd(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(yt,(r,i)=>{e.push(new me(r,i))}):n.writeTree_.children.inorderTraversal((r,i)=>{i.value!=null&&e.push(new me(r,i.value))}),e}function xn(n,e){if(de(e))return n;{const t=Ir(n,e);return t!=null?new Jt(new xe(t)):new Jt(n.writeTree_.subtree(e))}}function iu(n){return n.writeTree_.isEmpty()}function Yr(n,e){return ng(Se(),n.writeTree_,e)}function ng(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let r=null;return e.children.inorderTraversal((i,s)=>{i===".priority"?(K(s.value!==null,"Priority writes must always be leaf nodes"),r=s.value):t=ng(nt(n,i),s,t)}),!t.getChild(n).isEmpty()&&r!==null&&(t=t.updateChild(nt(n,".priority"),r)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rg(n,e){return cg(e,n)}function II(n,e,t,r,i){K(r>n.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),n.allWrites.push({path:e,snap:t,writeId:r,visible:i}),i&&(n.visibleWrites=qi(n.visibleWrites,e,t)),n.lastWriteId=r}function SI(n,e){for(let t=0;t<n.allWrites.length;t++){const r=n.allWrites[t];if(r.writeId===e)return r}return null}function CI(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);K(t>=0,"removeWrite called with nonexistent writeId.");const r=n.allWrites[t];n.allWrites.splice(t,1);let i=r.visible,s=!1,o=n.allWrites.length-1;for(;i&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&NI(a,r.path)?i=!1:Xt(r.path,a.path)&&(s=!0)),o--}if(i){if(s)return AI(n),!0;if(r.snap)n.visibleWrites=$d(n.visibleWrites,r.path);else{const a=r.children;Gt(a,c=>{n.visibleWrites=$d(n.visibleWrites,nt(r.path,c))})}return!0}else return!1}function NI(n,e){if(n.snap)return Xt(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&Xt(nt(n.path,t),e))return!0;return!1}function AI(n){n.visibleWrites=ig(n.allWrites,DI,Se()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function DI(n){return n.visible}function ig(n,e,t){let r=Jt.empty();for(let i=0;i<n.length;++i){const s=n[i];if(e(s)){const o=s.path;let a;if(s.snap)Xt(t,o)?(a=jt(t,o),r=qi(r,a,s.snap)):Xt(o,t)&&(a=jt(o,t),r=qi(r,Se(),s.snap.getChild(a)));else if(s.children){if(Xt(t,o))a=jt(t,o),r=jd(r,a,s.children);else if(Xt(o,t))if(a=jt(o,t),de(a))r=jd(r,Se(),s.children);else{const c=Wr(s.children,pe(a));if(c){const u=c.getChild(ke(a));r=qi(r,Se(),u)}}}else throw oi("WriteRecord should have .snap or .children")}}return r}function sg(n,e,t,r,i){if(!r&&!i){const s=Ir(n.visibleWrites,e);if(s!=null)return s;{const o=xn(n.visibleWrites,e);if(iu(o))return t;if(t==null&&!ru(o,Se()))return null;{const a=t||Te.EMPTY_NODE;return Yr(o,a)}}}else{const s=xn(n.visibleWrites,e);if(!i&&iu(s))return t;if(!i&&t==null&&!ru(s,Se()))return null;{const o=function(u){return(u.visible||i)&&(!r||!~r.indexOf(u.writeId))&&(Xt(u.path,e)||Xt(e,u.path))},a=ig(n.allWrites,o,e),c=t||Te.EMPTY_NODE;return Yr(a,c)}}}function RI(n,e,t){let r=Te.EMPTY_NODE;const i=Ir(n.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(yt,(s,o)=>{r=r.updateImmediateChild(s,o)}),r;if(t){const s=xn(n.visibleWrites,e);return t.forEachChild(yt,(o,a)=>{const c=Yr(xn(s,new Oe(o)),a);r=r.updateImmediateChild(o,c)}),Gd(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{const s=xn(n.visibleWrites,e);return Gd(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function xI(n,e,t,r,i){K(r||i,"Either existingEventSnap or existingServerSnap must exist");const s=nt(e,t);if(ru(n.visibleWrites,s))return null;{const o=xn(n.visibleWrites,s);return iu(o)?i.getChild(t):Yr(o,i.getChild(t))}}function kI(n,e,t,r){const i=nt(e,t),s=Ir(n.visibleWrites,i);if(s!=null)return s;if(r.isCompleteForChild(t)){const o=xn(n.visibleWrites,i);return Yr(o,r.getNode().getImmediateChild(t))}else return null}function OI(n,e){return Ir(n.visibleWrites,e)}function PI(n,e,t,r,i,s,o){let a;const c=xn(n.visibleWrites,e),u=Ir(c,Se());if(u!=null)a=u;else if(t!=null)a=Yr(c,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const l=[],h=o.getCompare(),d=s?a.getReverseIteratorFrom(r,o):a.getIteratorFrom(r,o);let m=d.getNext();for(;m&&l.length<i;)h(m,r)!==0&&l.push(m),m=d.getNext();return l}else return[]}function LI(){return{visibleWrites:Jt.empty(),allWrites:[],lastWriteId:-1}}function su(n,e,t,r){return sg(n.writeTree,n.treePath,e,t,r)}function og(n,e){return RI(n.writeTree,n.treePath,e)}function Kd(n,e,t,r){return xI(n.writeTree,n.treePath,e,t,r)}function Mo(n,e){return OI(n.writeTree,nt(n.treePath,e))}function MI(n,e,t,r,i,s){return PI(n.writeTree,n.treePath,e,t,r,i,s)}function hl(n,e,t){return kI(n.writeTree,n.treePath,e,t)}function ag(n,e){return cg(nt(n.treePath,e),n.writeTree)}function cg(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FI{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,r=e.childName;K(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),K(r!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(r);if(i){const s=i.type;if(t==="child_added"&&s==="child_removed")this.changeMap.set(r,Ud(r,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&s==="child_added")this.changeMap.delete(r);else if(t==="child_removed"&&s==="child_changed")this.changeMap.set(r,dI(r,i.oldSnap));else if(t==="child_changed"&&s==="child_added")this.changeMap.set(r,hI(r,e.snapshotNode));else if(t==="child_changed"&&s==="child_changed")this.changeMap.set(r,Ud(r,e.snapshotNode,i.oldSnap));else throw oi("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UI{getCompleteChild(e){return null}getChildAfterChild(e,t,r){return null}}const ug=new UI;class dl{constructor(e,t,r=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=r}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new ll(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return hl(this.writes_,e,r)}}getChildAfterChild(e,t,r){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:dr(this.viewCache_),s=MI(this.writes_,i,t,1,r,e);return s.length===0?null:s[0]}}function BI(n,e){K(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),K(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function VI(n,e,t,r,i){const s=new FI;let o,a;if(t.type===on.OVERWRITE){const u=t;u.source.fromUser?o=ou(n,e,u.path,u.snap,r,i,s):(K(u.source.fromServer,"Unknown source."),a=u.source.tagged||e.serverCache.isFiltered()&&!de(u.path),o=Fo(n,e,u.path,u.snap,r,i,a,s))}else if(t.type===on.MERGE){const u=t;u.source.fromUser?o=jI(n,e,u.path,u.children,r,i,s):(K(u.source.fromServer,"Unknown source."),a=u.source.tagged||e.serverCache.isFiltered(),o=au(n,e,u.path,u.children,r,i,a,s))}else if(t.type===on.ACK_USER_WRITE){const u=t;u.revert?o=KI(n,e,u.path,r,i,s):o=$I(n,e,u.path,u.affectedTree,r,i,s)}else if(t.type===on.LISTEN_COMPLETE)o=GI(n,e,t.path,r,s);else throw oi("Unknown operation type: "+t.type);const c=s.getChanges();return qI(e,o,c),{viewCache:o,changes:c}}function qI(n,e,t){const r=e.eventCache;if(r.isFullyInitialized()){const i=r.getNode().isLeafNode()||r.getNode().isEmpty(),s=nu(n);(t.length>0||!n.eventCache.isFullyInitialized()||i&&!r.getNode().equals(s)||!r.getNode().getPriority().equals(s.getPriority()))&&t.push(lI(nu(e)))}}function lg(n,e,t,r,i,s){const o=e.eventCache;if(Mo(r,t)!=null)return e;{let a,c;if(de(t))if(K(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const u=dr(e),l=u instanceof Te?u:Te.EMPTY_NODE,h=og(r,l);a=n.filter.updateFullNode(e.eventCache.getNode(),h,s)}else{const u=su(r,dr(e));a=n.filter.updateFullNode(e.eventCache.getNode(),u,s)}else{const u=pe(t);if(u===".priority"){K(Ln(t)===1,"Can't have a priority with additional path components");const l=o.getNode();c=e.serverCache.getNode();const h=Kd(r,t,l,c);h!=null?a=n.filter.updatePriority(l,h):a=o.getNode()}else{const l=ke(t);let h;if(o.isCompleteForChild(u)){c=e.serverCache.getNode();const d=Kd(r,t,o.getNode(),c);d!=null?h=o.getNode().getImmediateChild(u).updateChild(l,d):h=o.getNode().getImmediateChild(u)}else h=hl(r,u,e.serverCache);h!=null?a=n.filter.updateChild(o.getNode(),u,h,l,i,s):a=o.getNode()}}return Vi(e,a,o.isFullyInitialized()||de(t),n.filter.filtersNodes())}}function Fo(n,e,t,r,i,s,o,a){const c=e.serverCache;let u;const l=o?n.filter:n.filter.getIndexedFilter();if(de(t))u=l.updateFullNode(c.getNode(),r,null);else if(l.filtersNodes()&&!c.isFiltered()){const m=c.getNode().updateChild(t,r);u=l.updateFullNode(c.getNode(),m,null)}else{const m=pe(t);if(!c.isCompleteForPath(t)&&Ln(t)>1)return e;const g=ke(t),C=c.getNode().getImmediateChild(m).updateChild(g,r);m===".priority"?u=l.updatePriority(c.getNode(),C):u=l.updateChild(c.getNode(),m,C,g,ug,null)}const h=tg(e,u,c.isFullyInitialized()||de(t),l.filtersNodes()),d=new dl(i,h,s);return lg(n,h,t,i,d,a)}function ou(n,e,t,r,i,s,o){const a=e.eventCache;let c,u;const l=new dl(i,e,s);if(de(t))u=n.filter.updateFullNode(e.eventCache.getNode(),r,o),c=Vi(e,u,!0,n.filter.filtersNodes());else{const h=pe(t);if(h===".priority")u=n.filter.updatePriority(e.eventCache.getNode(),r),c=Vi(e,u,a.isFullyInitialized(),a.isFiltered());else{const d=ke(t),m=a.getNode().getImmediateChild(h);let g;if(de(d))g=r;else{const b=l.getCompleteChild(h);b!=null?Vm(d)===".priority"&&b.getChild(jm(d)).isEmpty()?g=b:g=b.updateChild(d,r):g=Te.EMPTY_NODE}if(m.equals(g))c=e;else{const b=n.filter.updateChild(a.getNode(),h,g,d,l,o);c=Vi(e,b,a.isFullyInitialized(),n.filter.filtersNodes())}}}return c}function zd(n,e){return n.eventCache.isCompleteForChild(e)}function jI(n,e,t,r,i,s,o){let a=e;return r.foreach((c,u)=>{const l=nt(t,c);zd(e,pe(l))&&(a=ou(n,a,l,u,i,s,o))}),r.foreach((c,u)=>{const l=nt(t,c);zd(e,pe(l))||(a=ou(n,a,l,u,i,s,o))}),a}function Hd(n,e,t){return t.foreach((r,i)=>{e=e.updateChild(r,i)}),e}function au(n,e,t,r,i,s,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,u;de(t)?u=r:u=new xe(null).setTree(t,r);const l=e.serverCache.getNode();return u.children.inorderTraversal((h,d)=>{if(l.hasChild(h)){const m=e.serverCache.getNode().getImmediateChild(h),g=Hd(n,m,d);c=Fo(n,c,new Oe(h),g,i,s,o,a)}}),u.children.inorderTraversal((h,d)=>{const m=!e.serverCache.isCompleteForChild(h)&&d.value===null;if(!l.hasChild(h)&&!m){const g=e.serverCache.getNode().getImmediateChild(h),b=Hd(n,g,d);c=Fo(n,c,new Oe(h),b,i,s,o,a)}}),c}function $I(n,e,t,r,i,s,o){if(Mo(i,t)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(r.value!=null){if(de(t)&&c.isFullyInitialized()||c.isCompleteForPath(t))return Fo(n,e,t,c.getNode().getChild(t),i,s,a,o);if(de(t)){let u=new xe(null);return c.getNode().forEachChild(Gr,(l,h)=>{u=u.set(new Oe(l),h)}),au(n,e,t,u,i,s,a,o)}else return e}else{let u=new xe(null);return r.foreach((l,h)=>{const d=nt(t,l);c.isCompleteForPath(d)&&(u=u.set(l,c.getNode().getChild(d)))}),au(n,e,t,u,i,s,a,o)}}function GI(n,e,t,r,i){const s=e.serverCache,o=tg(e,s.getNode(),s.isFullyInitialized()||de(t),s.isFiltered());return lg(n,o,t,r,ug,i)}function KI(n,e,t,r,i,s){let o;if(Mo(r,t)!=null)return e;{const a=new dl(r,e,i),c=e.eventCache.getNode();let u;if(de(t)||pe(t)===".priority"){let l;if(e.serverCache.isFullyInitialized())l=su(r,dr(e));else{const h=e.serverCache.getNode();K(h instanceof Te,"serverChildren would be complete if leaf node"),l=og(r,h)}l=l,u=n.filter.updateFullNode(c,l,s)}else{const l=pe(t);let h=hl(r,l,e.serverCache);h==null&&e.serverCache.isCompleteForChild(l)&&(h=c.getImmediateChild(l)),h!=null?u=n.filter.updateChild(c,l,h,ke(t),a,s):e.eventCache.getNode().hasChild(l)?u=n.filter.updateChild(c,l,Te.EMPTY_NODE,ke(t),a,s):u=c,u.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=su(r,dr(e)),o.isLeafNode()&&(u=n.filter.updateFullNode(u,o,s)))}return o=e.serverCache.isFullyInitialized()||Mo(r,Se())!=null,Vi(e,u,o,n.filter.filtersNodes())}}function zI(n,e){const t=dr(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!de(e)&&!t.getImmediateChild(pe(e)).isEmpty())?t.getChild(e):null}function Wd(n,e,t,r){e.type===on.MERGE&&e.source.queryId!==null&&(K(dr(n.viewCache_),"We should always have a full cache before handling merges"),K(nu(n.viewCache_),"Missing event cache, even though we have a server cache"));const i=n.viewCache_,s=VI(n.processor_,i,e,t,r);return BI(n.processor_,s.viewCache),K(s.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=s.viewCache,HI(n,s.changes,s.viewCache.eventCache.getNode(),null)}function HI(n,e,t,r){const i=r?[r]:n.eventRegistrations_;return wI(n.eventGenerator_,e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qd;function WI(n){K(!Qd,"__referenceConstructor has already been defined"),Qd=n}function fl(n,e,t,r){const i=e.source.queryId;if(i!==null){const s=n.views.get(i);return K(s!=null,"SyncTree gave us an op for an invalid query."),Wd(s,e,t,r)}else{let s=[];for(const o of n.views.values())s=s.concat(Wd(o,e,t,r));return s}}function pl(n,e){let t=null;for(const r of n.views.values())t=t||zI(r,e);return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Yd;function QI(n){K(!Yd,"__referenceConstructor has already been defined"),Yd=n}class Xd{constructor(e){this.listenProvider_=e,this.syncPointTree_=new xe(null),this.pendingWriteTree_=LI(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function YI(n,e,t,r,i){return II(n.pendingWriteTree_,e,t,r,i),i?pa(n,new hr(Xm(),e,t)):[]}function Br(n,e,t=!1){const r=SI(n.pendingWriteTree_,e);if(CI(n.pendingWriteTree_,e)){let s=new xe(null);return r.snap!=null?s=s.set(Se(),!0):Gt(r.children,o=>{s=s.set(new Oe(o),!0)}),pa(n,new Lo(r.path,s,t))}else return[]}function fa(n,e,t){return pa(n,new hr(Jm(),e,t))}function XI(n,e,t){const r=xe.fromObject(t);return pa(n,new Ji(Jm(),e,r))}function JI(n,e,t,r){const i=pg(n,r);if(i!=null){const s=mg(i),o=s.path,a=s.queryId,c=jt(o,e),u=new hr(Zm(a),c,t);return gg(n,o,u)}else return[]}function ZI(n,e,t,r){const i=pg(n,r);if(i){const s=mg(i),o=s.path,a=s.queryId,c=jt(o,e),u=xe.fromObject(t),l=new Ji(Zm(a),c,u);return gg(n,o,l)}else return[]}function hg(n,e,t){const i=n.pendingWriteTree_,s=n.syncPointTree_.findOnPath(e,(o,a)=>{const c=jt(o,e),u=pl(a,c);if(u)return u});return sg(i,e,s,t,!0)}function pa(n,e){return dg(e,n.syncPointTree_,null,rg(n.pendingWriteTree_,Se()))}function dg(n,e,t,r){if(de(n.path))return fg(n,e,t,r);{const i=e.get(Se());t==null&&i!=null&&(t=pl(i,Se()));let s=[];const o=pe(n.path),a=n.operationForChild(o),c=e.children.get(o);if(c&&a){const u=t?t.getImmediateChild(o):null,l=ag(r,o);s=s.concat(dg(a,c,u,l))}return i&&(s=s.concat(fl(i,n,r,t))),s}}function fg(n,e,t,r){const i=e.get(Se());t==null&&i!=null&&(t=pl(i,Se()));let s=[];return e.children.inorderTraversal((o,a)=>{const c=t?t.getImmediateChild(o):null,u=ag(r,o),l=n.operationForChild(o);l&&(s=s.concat(fg(l,a,c,u)))}),i&&(s=s.concat(fl(i,n,r,t))),s}function pg(n,e){return n.tagToQueryMap.get(e)}function mg(n){const e=n.indexOf("$");return K(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new Oe(n.substr(0,e))}}function gg(n,e,t){const r=n.syncPointTree_.get(e);K(r,"Missing sync point for query tag that we're tracking");const i=rg(n.pendingWriteTree_,e);return fl(r,t,i,null)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ml{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new ml(t)}node(){return this.node_}}class gl{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=nt(this.path_,e);return new gl(this.syncTree_,t)}node(){return hg(this.syncTree_,this.path_)}}const e0=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Jd=function(n,e,t){if(!n||typeof n!="object")return n;if(K(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return t0(n[".sv"],e,t);if(typeof n[".sv"]=="object")return n0(n[".sv"],e);K(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},t0=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:K(!1,"Unexpected server value: "+n)}},n0=function(n,e,t){n.hasOwnProperty("increment")||K(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const r=n.increment;typeof r!="number"&&K(!1,"Unexpected increment value: "+r);const i=e.node();if(K(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;const o=i.getValue();return typeof o!="number"?r:o+r},r0=function(n,e,t,r){return yl(e,new gl(t,n),r)},i0=function(n,e,t){return yl(n,new ml(e),t)};function yl(n,e,t){const r=n.getPriority().val(),i=Jd(r,e.getImmediateChild(".priority"),t);let s;if(n.isLeafNode()){const o=n,a=Jd(o.getValue(),e,t);return a!==o.getValue()||i!==o.getPriority().val()?new Ze(a,mt(i)):n}else{const o=n;return s=o,i!==o.getPriority().val()&&(s=s.updatePriority(new Ze(i))),o.forEachChild(yt,(a,c)=>{const u=yl(c,e.getImmediateChild(a),t);u!==c&&(s=s.updateImmediateChild(a,u))}),s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _l{constructor(e="",t=null,r={children:{},childCount:0}){this.name=e,this.parent=t,this.node=r}}function vl(n,e){let t=e instanceof Oe?e:new Oe(e),r=n,i=pe(t);for(;i!==null;){const s=Wr(r.node.children,i)||{children:{},childCount:0};r=new _l(i,r,s),t=ke(t),i=pe(t)}return r}function ci(n){return n.node.value}function yg(n,e){n.node.value=e,cu(n)}function _g(n){return n.node.childCount>0}function s0(n){return ci(n)===void 0&&!_g(n)}function ma(n,e){Gt(n.node.children,(t,r)=>{e(new _l(t,n,r))})}function vg(n,e,t,r){t&&!r&&e(n),ma(n,i=>{vg(i,e,!0,r)}),t&&r&&e(n)}function o0(n,e,t){let r=t?n:n.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function ws(n){return new Oe(n.parent===null?n.name:ws(n.parent)+"/"+n.name)}function cu(n){n.parent!==null&&a0(n.parent,n.name,n)}function a0(n,e,t){const r=s0(t),i=wn(n.node.children,e);r&&i?(delete n.node.children[e],n.node.childCount--,cu(n)):!r&&!i&&(n.node.children[e]=t.node,n.node.childCount++,cu(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const c0=/[\[\].#$\/\u0000-\u001F\u007F]/,u0=/[\[\].#$\u0000-\u001F\u007F]/,Sc=10*1024*1024,wg=function(n){return typeof n=="string"&&n.length!==0&&!c0.test(n)},l0=function(n){return typeof n=="string"&&n.length!==0&&!u0.test(n)},h0=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),l0(n)},Eg=function(n,e,t){const r=t instanceof Oe?new Gb(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Hn(r));if(typeof e=="function")throw new Error(n+"contains a function "+Hn(r)+" with contents = "+e.toString());if(wm(e))throw new Error(n+"contains "+e.toString()+" "+Hn(r));if(typeof e=="string"&&e.length>Sc/3&&ua(e)>Sc)throw new Error(n+"contains a string greater than "+Sc+" utf8 bytes "+Hn(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,s=!1;if(Gt(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(s=!0,!wg(o)))throw new Error(n+" contains an invalid key ("+o+") "+Hn(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Kb(r,o),Eg(n,a,r),zb(r)}),i&&s)throw new Error(n+' contains ".value" child '+Hn(r)+" in addition to actual children.")}},d0=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!wg(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!h0(t))throw new Error(pE(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f0{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function p0(n,e){let t=null;for(let r=0;r<e.length;r++){const i=e[r],s=i.getPath();t!==null&&!$m(s,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:s}),t.events.push(i)}t&&n.eventLists_.push(t)}function Sr(n,e,t){p0(n,t),m0(n,r=>Xt(r,e)||Xt(e,r))}function m0(n,e){n.recursionDepth_++;let t=!0;for(let r=0;r<n.eventLists_.length;r++){const i=n.eventLists_[r];if(i){const s=i.path;e(s)?(g0(n.eventLists_[r]),n.eventLists_[r]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function g0(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const r=t.getEventRunner();rr&&pt("event: "+t.toString()),_s(r)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y0="repo_interrupt",_0=25;class v0{constructor(e,t,r,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=r,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new f0,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Po(),this.transactionQueueTree_=new _l,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function w0(n,e,t){if(n.stats_=sl(n.repoInfo_),n.forceRestClient_||pb())n.server_=new Oo(n.repoInfo_,(r,i,s,o)=>{Zd(n,r,i,s,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>ef(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ut(t)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}n.persistentConnection_=new yn(n.repoInfo_,e,(r,i,s,o)=>{Zd(n,r,i,s,o)},r=>{ef(n,r)},r=>{T0(n,r)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(r=>{n.server_.refreshAuthToken(r)}),n.appCheckProvider_.addTokenChangeListener(r=>{n.server_.refreshAppCheckToken(r.token)}),n.statsReporter_=wb(n.repoInfo_,()=>new vI(n.stats_,n.server_)),n.infoData_=new pI,n.infoSyncTree_=new Xd({startListening:(r,i,s,o)=>{let a=[];const c=n.infoData_.getNode(r._path);return c.isEmpty()||(a=fa(n.infoSyncTree_,r._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),wl(n,"connected",!1),n.serverSyncTree_=new Xd({startListening:(r,i,s,o)=>(n.server_.listen(r,s,i,(a,c)=>{const u=o(a,c);Sr(n.eventQueue_,r._path,u)}),[]),stopListening:(r,i)=>{n.server_.unlisten(r,i)}})}function E0(n){const t=n.infoData_.getNode(new Oe(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Tg(n){return e0({timestamp:E0(n)})}function Zd(n,e,t,r,i){n.dataUpdateCount++;const s=new Oe(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(r){const c=So(t,u=>mt(u));o=ZI(n.serverSyncTree_,s,c,i)}else{const c=mt(t);o=JI(n.serverSyncTree_,s,c,i)}else if(r){const c=So(t,u=>mt(u));o=XI(n.serverSyncTree_,s,c)}else{const c=mt(t);o=fa(n.serverSyncTree_,s,c)}let a=s;o.length>0&&(a=Tl(n,s)),Sr(n.eventQueue_,a,o)}function ef(n,e){wl(n,"connected",e),e===!1&&I0(n)}function T0(n,e){Gt(e,(t,r)=>{wl(n,t,r)})}function wl(n,e,t){const r=new Oe("/.info/"+e),i=mt(t);n.infoData_.updateSnapshot(r,i);const s=fa(n.infoSyncTree_,r,i);Sr(n.eventQueue_,r,s)}function b0(n){return n.nextWriteId_++}function I0(n){bg(n,"onDisconnectEvents");const e=Tg(n),t=Po();tu(n.onDisconnect_,Se(),(i,s)=>{const o=r0(i,s,n.serverSyncTree_,e);Ym(t,i,o)});let r=[];tu(t,Se(),(i,s)=>{r=r.concat(fa(n.serverSyncTree_,i,s));const o=A0(n,i);Tl(n,o)}),n.onDisconnect_=Po(),Sr(n.eventQueue_,Se(),r)}function S0(n){n.persistentConnection_&&n.persistentConnection_.interrupt(y0)}function bg(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),pt(t,...e)}function Ig(n,e,t){return hg(n.serverSyncTree_,e,t)||Te.EMPTY_NODE}function El(n,e=n.transactionQueueTree_){if(e||ga(n,e),ci(e)){const t=Cg(n,e);K(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&C0(n,ws(e),t)}else _g(e)&&ma(e,t=>{El(n,t)})}function C0(n,e,t){const r=t.map(u=>u.currentWriteId),i=Ig(n,e,r);let s=i;const o=i.hash();for(let u=0;u<t.length;u++){const l=t[u];K(l.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),l.status=1,l.retryCount++;const h=jt(e,l.path);s=s.updateChild(h,l.currentOutputSnapshotRaw)}const a=s.val(!0),c=e;n.server_.put(c.toString(),a,u=>{bg(n,"transaction put response",{path:c.toString(),status:u});let l=[];if(u==="ok"){const h=[];for(let d=0;d<t.length;d++)t[d].status=2,l=l.concat(Br(n.serverSyncTree_,t[d].currentWriteId)),t[d].onComplete&&h.push(()=>t[d].onComplete(null,!0,t[d].currentOutputSnapshotResolved)),t[d].unwatcher();ga(n,vl(n.transactionQueueTree_,e)),El(n,n.transactionQueueTree_),Sr(n.eventQueue_,e,l);for(let d=0;d<h.length;d++)_s(h[d])}else{if(u==="datastale")for(let h=0;h<t.length;h++)t[h].status===3?t[h].status=4:t[h].status=0;else{Ft("transaction at "+c.toString()+" failed: "+u);for(let h=0;h<t.length;h++)t[h].status=4,t[h].abortReason=u}Tl(n,e)}},o)}function Tl(n,e){const t=Sg(n,e),r=ws(t),i=Cg(n,t);return N0(n,i,r),r}function N0(n,e,t){if(e.length===0)return;const r=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],u=jt(t,c.path);let l=!1,h;if(K(u!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)l=!0,h=c.abortReason,i=i.concat(Br(n.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=_0)l=!0,h="maxretry",i=i.concat(Br(n.serverSyncTree_,c.currentWriteId,!0));else{const d=Ig(n,c.path,o);c.currentInputSnapshot=d;const m=e[a].update(d.val());if(m!==void 0){Eg("transaction failed: Data returned ",m,c.path);let g=mt(m);typeof m=="object"&&m!=null&&wn(m,".priority")||(g=g.updatePriority(d.getPriority()));const C=c.currentWriteId,B=Tg(n),$=i0(g,d,B);c.currentOutputSnapshotRaw=g,c.currentOutputSnapshotResolved=$,c.currentWriteId=b0(n),o.splice(o.indexOf(C),1),i=i.concat(YI(n.serverSyncTree_,c.path,$,c.currentWriteId,c.applyLocally)),i=i.concat(Br(n.serverSyncTree_,C,!0))}else l=!0,h="nodata",i=i.concat(Br(n.serverSyncTree_,c.currentWriteId,!0))}Sr(n.eventQueue_,t,i),i=[],l&&(e[a].status=2,function(d){setTimeout(d,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(h==="nodata"?r.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):r.push(()=>e[a].onComplete(new Error(h),!1,null))))}ga(n,n.transactionQueueTree_);for(let a=0;a<r.length;a++)_s(r[a]);El(n,n.transactionQueueTree_)}function Sg(n,e){let t,r=n.transactionQueueTree_;for(t=pe(e);t!==null&&ci(r)===void 0;)r=vl(r,t),e=ke(e),t=pe(e);return r}function Cg(n,e){const t=[];return Ng(n,e,t),t.sort((r,i)=>r.order-i.order),t}function Ng(n,e,t){const r=ci(e);if(r)for(let i=0;i<r.length;i++)t.push(r[i]);ma(e,i=>{Ng(n,i,t)})}function ga(n,e){const t=ci(e);if(t){let r=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[r]=t[i],r++);t.length=r,yg(e,t.length>0?t:void 0)}ma(e,r=>{ga(n,r)})}function A0(n,e){const t=ws(Sg(n,e)),r=vl(n.transactionQueueTree_,e);return o0(r,i=>{Cc(n,i)}),Cc(n,r),vg(r,i=>{Cc(n,i)}),t}function Cc(n,e){const t=ci(e);if(t){const r=[];let i=[],s=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(K(s===o-1,"All SENT items should be at beginning of queue."),s=o,t[o].status=3,t[o].abortReason="set"):(K(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(Br(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&r.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));s===-1?yg(e,void 0):t.length=s+1,Sr(n.eventQueue_,ws(e),i);for(let o=0;o<r.length;o++)_s(r[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D0(n){let e="";const t=n.split("/");for(let r=0;r<t.length;r++)if(t[r].length>0){let i=t[r];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function R0(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const r=t.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):Ft(`Invalid query segment '${t}' in query '${n}'`)}return e}const tf=function(n,e){const t=x0(n),r=t.namespace;t.domain==="firebase.com"&&ur(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&t.domain!=="localhost"&&ur("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||ob();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new yb(t.host,t.secure,r,i,e,"",r!==t.subdomain),path:new Oe(t.pathString)}},x0=function(n){let e="",t="",r="",i="",s="",o=!0,a="https",c=443;if(typeof n=="string"){let u=n.indexOf("//");u>=0&&(a=n.substring(0,u-1),n=n.substring(u+2));let l=n.indexOf("/");l===-1&&(l=n.length);let h=n.indexOf("?");h===-1&&(h=n.length),e=n.substring(0,Math.min(l,h)),l<h&&(i=D0(n.substring(l,h)));const d=R0(n.substring(Math.min(n.length,h)));u=e.indexOf(":"),u>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(u+1),10)):u=e.length;const m=e.slice(0,u);if(m.toLowerCase()==="localhost")t="localhost";else if(m.split(".").length<=2)t=m;else{const g=e.indexOf(".");r=e.substring(0,g).toLowerCase(),t=e.substring(g+1),s=r}"ns"in d&&(s=d.ns)}return{host:e,port:c,domain:t,subdomain:r,secure:o,scheme:a,pathString:i,namespace:s}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bl{constructor(e,t,r,i){this._repo=e,this._path=t,this._queryParams=r,this._orderByCalled=i}get key(){return de(this._path)?null:Vm(this._path)}get ref(){return new ui(this._repo,this._path)}get _queryIdentifier(){const e=Vd(this._queryParams),t=rl(e);return t==="{}"?"default":t}get _queryObject(){return Vd(this._queryParams)}isEqual(e){if(e=$e(e),!(e instanceof bl))return!1;const t=this._repo===e._repo,r=$m(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&r&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+$b(this._path)}}class ui extends bl{constructor(e,t){super(e,t,new ul,!1)}get parent(){const e=jm(this._path);return e===null?null:new ui(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}WI(ui);QI(ui);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k0="FIREBASE_DATABASE_EMULATOR_HOST",uu={};let O0=!1;function P0(n,e,t,r,i){let s=r||n.options.databaseURL;s===void 0&&(n.options.projectId||ur("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),pt("Using default host for project ",n.options.projectId),s=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=tf(s,i),a=o.repoInfo,c,u;typeof process<"u"&&process.env&&(u=process.env[k0]),u?(c=!0,s=`http://${u}?ns=${a.namespace}`,o=tf(s,i),a=o.repoInfo):c=!o.repoInfo.secure;const l=i&&c?new Jc(Jc.OWNER):new gb(n.name,n.options,e);d0("Invalid Firebase Database URL",o),de(o.path)||ur("Database URL must point to the root of a Firebase Database (not including a child path).");const h=M0(a,n,l,new mb(n.name,t));return new F0(h,n)}function L0(n,e){const t=uu[e];(!t||t[n.key]!==n)&&ur(`Database ${e}(${n.repoInfo_}) has already been deleted.`),S0(n),delete t[n.key]}function M0(n,e,t,r){let i=uu[e.name];i||(i={},uu[e.name]=i);let s=i[n.toURLString()];return s&&ur("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),s=new v0(n,O0,t,r),i[n.toURLString()]=s,s}class F0{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(w0(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new ui(this._repo,Se())),this._rootInternal}_delete(){return this._rootInternal!==null&&(L0(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&ur("Cannot call "+e+" on a deleted database.")}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U0(n){tb(ps),_n(new ln("database",(e,{instanceIdentifier:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return P0(r,i,s,t)},"PUBLIC").setMultipleInstances(!0)),Mt(Td,bd,n),Mt(Td,bd,"esm2017")}yn.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};yn.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};U0();var B0=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Z,Il=Il||{},se=B0||self;function Uo(){}function ya(n){var e=typeof n;return e=e!="object"?e:n?Array.isArray(n)?"array":e:"null",e=="array"||e=="object"&&typeof n.length=="number"}function Es(n){var e=typeof n;return e=="object"&&n!=null||e=="function"}function V0(n){return Object.prototype.hasOwnProperty.call(n,Nc)&&n[Nc]||(n[Nc]=++q0)}var Nc="closure_uid_"+(1e9*Math.random()>>>0),q0=0;function j0(n,e,t){return n.call.apply(n.bind,arguments)}function $0(n,e,t){if(!n)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var i=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(i,r),n.apply(e,i)}}return function(){return n.apply(e,arguments)}}function vt(n,e,t){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?vt=j0:vt=$0,vt.apply(null,arguments)}function Qs(n,e){var t=Array.prototype.slice.call(arguments,1);return function(){var r=t.slice();return r.push.apply(r,arguments),n.apply(this,r)}}function dt(n,e){function t(){}t.prototype=e.prototype,n.X=e.prototype,n.prototype=new t,n.prototype.constructor=n,n.Wb=function(r,i,s){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return e.prototype[i].apply(r,o)}}function Vn(){this.s=this.s,this.o=this.o}var G0=0;Vn.prototype.s=!1;Vn.prototype.na=function(){!this.s&&(this.s=!0,this.M(),G0!=0)&&V0(this)};Vn.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const Ag=Array.prototype.indexOf?function(n,e){return Array.prototype.indexOf.call(n,e,void 0)}:function(n,e){if(typeof n=="string")return typeof e!="string"||e.length!=1?-1:n.indexOf(e,0);for(let t=0;t<n.length;t++)if(t in n&&n[t]===e)return t;return-1};function Sl(n){const e=n.length;if(0<e){const t=Array(e);for(let r=0;r<e;r++)t[r]=n[r];return t}return[]}function nf(n,e){for(let t=1;t<arguments.length;t++){const r=arguments[t];if(ya(r)){const i=n.length||0,s=r.length||0;n.length=i+s;for(let o=0;o<s;o++)n[i+o]=r[o]}else n.push(r)}}function wt(n,e){this.type=n,this.g=this.target=e,this.defaultPrevented=!1}wt.prototype.h=function(){this.defaultPrevented=!0};var K0=function(){if(!se.addEventListener||!Object.defineProperty)return!1;var n=!1,e=Object.defineProperty({},"passive",{get:function(){n=!0}});try{se.addEventListener("test",Uo,e),se.removeEventListener("test",Uo,e)}catch{}return n}();function Bo(n){return/^[\s\xa0]*$/.test(n)}var rf=String.prototype.trim?function(n){return n.trim()}:function(n){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(n)[1]};function Ac(n,e){return n<e?-1:n>e?1:0}function _a(){var n=se.navigator;return n&&(n=n.userAgent)?n:""}function sn(n){return _a().indexOf(n)!=-1}function Cl(n){return Cl[" "](n),n}Cl[" "]=Uo;function z0(n){var e=Q0;return Object.prototype.hasOwnProperty.call(e,9)?e[9]:e[9]=n(9)}var H0=sn("Opera"),Xr=sn("Trident")||sn("MSIE"),Dg=sn("Edge"),lu=Dg||Xr,Rg=sn("Gecko")&&!(_a().toLowerCase().indexOf("webkit")!=-1&&!sn("Edge"))&&!(sn("Trident")||sn("MSIE"))&&!sn("Edge"),W0=_a().toLowerCase().indexOf("webkit")!=-1&&!sn("Edge");function xg(){var n=se.document;return n?n.documentMode:void 0}var Vo;e:{var Dc="",Rc=function(){var n=_a();if(Rg)return/rv:([^\);]+)(\)|;)/.exec(n);if(Dg)return/Edge\/([\d\.]+)/.exec(n);if(Xr)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(n);if(W0)return/WebKit\/(\S+)/.exec(n);if(H0)return/(?:Version)[ \/]?(\S+)/.exec(n)}();if(Rc&&(Dc=Rc?Rc[1]:""),Xr){var xc=xg();if(xc!=null&&xc>parseFloat(Dc)){Vo=String(xc);break e}}Vo=Dc}var Q0={};function Y0(){return z0(function(){let n=0;const e=rf(String(Vo)).split("."),t=rf("9").split("."),r=Math.max(e.length,t.length);for(let o=0;n==0&&o<r;o++){var i=e[o]||"",s=t[o]||"";do{if(i=/(\d*)(\D*)(.*)/.exec(i)||["","","",""],s=/(\d*)(\D*)(.*)/.exec(s)||["","","",""],i[0].length==0&&s[0].length==0)break;n=Ac(i[1].length==0?0:parseInt(i[1],10),s[1].length==0?0:parseInt(s[1],10))||Ac(i[2].length==0,s[2].length==0)||Ac(i[2],s[2]),i=i[3],s=s[3]}while(n==0)}return 0<=n})}var hu;if(se.document&&Xr){var sf=xg();hu=sf||parseInt(Vo,10)||void 0}else hu=void 0;var X0=hu;function Zi(n,e){if(wt.call(this,n?n.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,n){var t=this.type=n.type,r=n.changedTouches&&n.changedTouches.length?n.changedTouches[0]:null;if(this.target=n.target||n.srcElement,this.g=e,e=n.relatedTarget){if(Rg){e:{try{Cl(e.nodeName);var i=!0;break e}catch{}i=!1}i||(e=null)}}else t=="mouseover"?e=n.fromElement:t=="mouseout"&&(e=n.toElement);this.relatedTarget=e,r?(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=n.clientX!==void 0?n.clientX:n.pageX,this.clientY=n.clientY!==void 0?n.clientY:n.pageY,this.screenX=n.screenX||0,this.screenY=n.screenY||0),this.button=n.button,this.key=n.key||"",this.ctrlKey=n.ctrlKey,this.altKey=n.altKey,this.shiftKey=n.shiftKey,this.metaKey=n.metaKey,this.pointerId=n.pointerId||0,this.pointerType=typeof n.pointerType=="string"?n.pointerType:J0[n.pointerType]||"",this.state=n.state,this.i=n,n.defaultPrevented&&Zi.X.h.call(this)}}dt(Zi,wt);var J0={2:"touch",3:"pen",4:"mouse"};Zi.prototype.h=function(){Zi.X.h.call(this);var n=this.i;n.preventDefault?n.preventDefault():n.returnValue=!1};var Ts="closure_listenable_"+(1e6*Math.random()|0),Z0=0;function eS(n,e,t,r,i){this.listener=n,this.proxy=null,this.src=e,this.type=t,this.capture=!!r,this.ha=i,this.key=++Z0,this.ba=this.ea=!1}function va(n){n.ba=!0,n.listener=null,n.proxy=null,n.src=null,n.ha=null}function Nl(n,e,t){for(const r in n)e.call(t,n[r],r,n)}function kg(n){const e={};for(const t in n)e[t]=n[t];return e}const of="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Og(n,e){let t,r;for(let i=1;i<arguments.length;i++){r=arguments[i];for(t in r)n[t]=r[t];for(let s=0;s<of.length;s++)t=of[s],Object.prototype.hasOwnProperty.call(r,t)&&(n[t]=r[t])}}function wa(n){this.src=n,this.g={},this.h=0}wa.prototype.add=function(n,e,t,r,i){var s=n.toString();n=this.g[s],n||(n=this.g[s]=[],this.h++);var o=fu(n,e,r,i);return-1<o?(e=n[o],t||(e.ea=!1)):(e=new eS(e,this.src,s,!!r,i),e.ea=t,n.push(e)),e};function du(n,e){var t=e.type;if(t in n.g){var r=n.g[t],i=Ag(r,e),s;(s=0<=i)&&Array.prototype.splice.call(r,i,1),s&&(va(e),n.g[t].length==0&&(delete n.g[t],n.h--))}}function fu(n,e,t,r){for(var i=0;i<n.length;++i){var s=n[i];if(!s.ba&&s.listener==e&&s.capture==!!t&&s.ha==r)return i}return-1}var Al="closure_lm_"+(1e6*Math.random()|0),kc={};function Pg(n,e,t,r,i){if(r&&r.once)return Mg(n,e,t,r,i);if(Array.isArray(e)){for(var s=0;s<e.length;s++)Pg(n,e[s],t,r,i);return null}return t=xl(t),n&&n[Ts]?n.N(e,t,Es(r)?!!r.capture:!!r,i):Lg(n,e,t,!1,r,i)}function Lg(n,e,t,r,i,s){if(!e)throw Error("Invalid event type");var o=Es(i)?!!i.capture:!!i,a=Rl(n);if(a||(n[Al]=a=new wa(n)),t=a.add(e,t,r,o,s),t.proxy)return t;if(r=tS(),t.proxy=r,r.src=n,r.listener=t,n.addEventListener)K0||(i=o),i===void 0&&(i=!1),n.addEventListener(e.toString(),r,i);else if(n.attachEvent)n.attachEvent(Ug(e.toString()),r);else if(n.addListener&&n.removeListener)n.addListener(r);else throw Error("addEventListener and attachEvent are unavailable.");return t}function tS(){function n(t){return e.call(n.src,n.listener,t)}const e=nS;return n}function Mg(n,e,t,r,i){if(Array.isArray(e)){for(var s=0;s<e.length;s++)Mg(n,e[s],t,r,i);return null}return t=xl(t),n&&n[Ts]?n.O(e,t,Es(r)?!!r.capture:!!r,i):Lg(n,e,t,!0,r,i)}function Fg(n,e,t,r,i){if(Array.isArray(e))for(var s=0;s<e.length;s++)Fg(n,e[s],t,r,i);else r=Es(r)?!!r.capture:!!r,t=xl(t),n&&n[Ts]?(n=n.i,e=String(e).toString(),e in n.g&&(s=n.g[e],t=fu(s,t,r,i),-1<t&&(va(s[t]),Array.prototype.splice.call(s,t,1),s.length==0&&(delete n.g[e],n.h--)))):n&&(n=Rl(n))&&(e=n.g[e.toString()],n=-1,e&&(n=fu(e,t,r,i)),(t=-1<n?e[n]:null)&&Dl(t))}function Dl(n){if(typeof n!="number"&&n&&!n.ba){var e=n.src;if(e&&e[Ts])du(e.i,n);else{var t=n.type,r=n.proxy;e.removeEventListener?e.removeEventListener(t,r,n.capture):e.detachEvent?e.detachEvent(Ug(t),r):e.addListener&&e.removeListener&&e.removeListener(r),(t=Rl(e))?(du(t,n),t.h==0&&(t.src=null,e[Al]=null)):va(n)}}}function Ug(n){return n in kc?kc[n]:kc[n]="on"+n}function nS(n,e){if(n.ba)n=!0;else{e=new Zi(e,this);var t=n.listener,r=n.ha||n.src;n.ea&&Dl(n),n=t.call(r,e)}return n}function Rl(n){return n=n[Al],n instanceof wa?n:null}var Oc="__closure_events_fn_"+(1e9*Math.random()>>>0);function xl(n){return typeof n=="function"?n:(n[Oc]||(n[Oc]=function(e){return n.handleEvent(e)}),n[Oc])}function rt(){Vn.call(this),this.i=new wa(this),this.P=this,this.I=null}dt(rt,Vn);rt.prototype[Ts]=!0;rt.prototype.removeEventListener=function(n,e,t,r){Fg(this,n,e,t,r)};function lt(n,e){var t,r=n.I;if(r)for(t=[];r;r=r.I)t.push(r);if(n=n.P,r=e.type||e,typeof e=="string")e=new wt(e,n);else if(e instanceof wt)e.target=e.target||n;else{var i=e;e=new wt(r,n),Og(e,i)}if(i=!0,t)for(var s=t.length-1;0<=s;s--){var o=e.g=t[s];i=Ys(o,r,!0,e)&&i}if(o=e.g=n,i=Ys(o,r,!0,e)&&i,i=Ys(o,r,!1,e)&&i,t)for(s=0;s<t.length;s++)o=e.g=t[s],i=Ys(o,r,!1,e)&&i}rt.prototype.M=function(){if(rt.X.M.call(this),this.i){var n=this.i,e;for(e in n.g){for(var t=n.g[e],r=0;r<t.length;r++)va(t[r]);delete n.g[e],n.h--}}this.I=null};rt.prototype.N=function(n,e,t,r){return this.i.add(String(n),e,!1,t,r)};rt.prototype.O=function(n,e,t,r){return this.i.add(String(n),e,!0,t,r)};function Ys(n,e,t,r){if(e=n.i.g[String(e)],!e)return!0;e=e.concat();for(var i=!0,s=0;s<e.length;++s){var o=e[s];if(o&&!o.ba&&o.capture==t){var a=o.listener,c=o.ha||o.src;o.ea&&du(n.i,o),i=a.call(c,r)!==!1&&i}}return i&&!r.defaultPrevented}var kl=se.JSON.stringify;function rS(){var n=qg;let e=null;return n.g&&(e=n.g,n.g=n.g.next,n.g||(n.h=null),e.next=null),e}class iS{constructor(){this.h=this.g=null}add(e,t){const r=Bg.get();r.set(e,t),this.h?this.h.next=r:this.g=r,this.h=r}}var Bg=new class{constructor(n,e){this.i=n,this.j=e,this.h=0,this.g=null}get(){let n;return 0<this.h?(this.h--,n=this.g,this.g=n.next,n.next=null):n=this.i(),n}}(()=>new sS,n=>n.reset());class sS{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}function oS(n){se.setTimeout(()=>{throw n},0)}function Vg(n,e){pu||aS(),mu||(pu(),mu=!0),qg.add(n,e)}var pu;function aS(){var n=se.Promise.resolve(void 0);pu=function(){n.then(cS)}}var mu=!1,qg=new iS;function cS(){for(var n;n=rS();){try{n.h.call(n.g)}catch(t){oS(t)}var e=Bg;e.j(n),100>e.h&&(e.h++,n.next=e.g,e.g=n)}mu=!1}function Ea(n,e){rt.call(this),this.h=n||1,this.g=e||se,this.j=vt(this.lb,this),this.l=Date.now()}dt(Ea,rt);Z=Ea.prototype;Z.ca=!1;Z.R=null;Z.lb=function(){if(this.ca){var n=Date.now()-this.l;0<n&&n<.8*this.h?this.R=this.g.setTimeout(this.j,this.h-n):(this.R&&(this.g.clearTimeout(this.R),this.R=null),lt(this,"tick"),this.ca&&(Ol(this),this.start()))}};Z.start=function(){this.ca=!0,this.R||(this.R=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function Ol(n){n.ca=!1,n.R&&(n.g.clearTimeout(n.R),n.R=null)}Z.M=function(){Ea.X.M.call(this),Ol(this),delete this.g};function Pl(n,e,t){if(typeof n=="function")t&&(n=vt(n,t));else if(n&&typeof n.handleEvent=="function")n=vt(n.handleEvent,n);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:se.setTimeout(n,e||0)}function jg(n){n.g=Pl(()=>{n.g=null,n.i&&(n.i=!1,jg(n))},n.j);const e=n.h;n.h=null,n.m.apply(null,e)}class uS extends Vn{constructor(e,t){super(),this.m=e,this.j=t,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:jg(this)}M(){super.M(),this.g&&(se.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function es(n){Vn.call(this),this.h=n,this.g={}}dt(es,Vn);var af=[];function $g(n,e,t,r){Array.isArray(t)||(t&&(af[0]=t.toString()),t=af);for(var i=0;i<t.length;i++){var s=Pg(e,t[i],r||n.handleEvent,!1,n.h||n);if(!s)break;n.g[s.key]=s}}function Gg(n){Nl(n.g,function(e,t){this.g.hasOwnProperty(t)&&Dl(e)},n),n.g={}}es.prototype.M=function(){es.X.M.call(this),Gg(this)};es.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function Ta(){this.g=!0}Ta.prototype.Aa=function(){this.g=!1};function lS(n,e,t,r,i,s){n.info(function(){if(n.g)if(s)for(var o="",a=s.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var l=u[0];u=u[1];var h=l.split("_");o=2<=h.length&&h[1]=="type"?o+(l+"="+u+"&"):o+(l+"=redacted&")}}else o=null;else o=s;return"XMLHTTP REQ ("+r+") [attempt "+i+"]: "+e+`
`+t+`
`+o})}function hS(n,e,t,r,i,s,o){n.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+i+"]: "+e+`
`+t+`
`+s+" "+o})}function Vr(n,e,t,r){n.info(function(){return"XMLHTTP TEXT ("+e+"): "+fS(n,t)+(r?" "+r:"")})}function dS(n,e){n.info(function(){return"TIMEOUT: "+e})}Ta.prototype.info=function(){};function fS(n,e){if(!n.g)return e;if(!e)return null;try{var t=JSON.parse(e);if(t){for(n=0;n<t.length;n++)if(Array.isArray(t[n])){var r=t[n];if(!(2>r.length)){var i=r[1];if(Array.isArray(i)&&!(1>i.length)){var s=i[0];if(s!="noop"&&s!="stop"&&s!="close")for(var o=1;o<i.length;o++)i[o]=""}}}}return kl(t)}catch{return e}}var Cr={},cf=null;function ba(){return cf=cf||new rt}Cr.Pa="serverreachability";function Kg(n){wt.call(this,Cr.Pa,n)}dt(Kg,wt);function ts(n){const e=ba();lt(e,new Kg(e))}Cr.STAT_EVENT="statevent";function zg(n,e){wt.call(this,Cr.STAT_EVENT,n),this.stat=e}dt(zg,wt);function It(n){const e=ba();lt(e,new zg(e,n))}Cr.Qa="timingevent";function Hg(n,e){wt.call(this,Cr.Qa,n),this.size=e}dt(Hg,wt);function bs(n,e){if(typeof n!="function")throw Error("Fn must not be null and must be a function");return se.setTimeout(function(){n()},e)}var Ia={NO_ERROR:0,mb:1,zb:2,yb:3,tb:4,xb:5,Ab:6,Ma:7,TIMEOUT:8,Db:9},Wg={rb:"complete",Nb:"success",Na:"error",Ma:"abort",Fb:"ready",Gb:"readystatechange",TIMEOUT:"timeout",Bb:"incrementaldata",Eb:"progress",ub:"downloadprogress",Vb:"uploadprogress"};function Ll(){}Ll.prototype.h=null;function uf(n){return n.h||(n.h=n.i())}function Qg(){}var Is={OPEN:"a",qb:"b",Na:"c",Cb:"d"};function Ml(){wt.call(this,"d")}dt(Ml,wt);function Fl(){wt.call(this,"c")}dt(Fl,wt);var gu;function Sa(){}dt(Sa,Ll);Sa.prototype.g=function(){return new XMLHttpRequest};Sa.prototype.i=function(){return{}};gu=new Sa;function Ss(n,e,t,r){this.l=n,this.j=e,this.m=t,this.U=r||1,this.S=new es(this),this.O=pS,n=lu?125:void 0,this.T=new Ea(n),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.V=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.Y=-1,this.I=!1,this.N=0,this.L=null,this.$=this.J=this.Z=this.P=!1,this.h=new Yg}function Yg(){this.i=null,this.g="",this.h=!1}var pS=45e3,yu={},qo={};Z=Ss.prototype;Z.setTimeout=function(n){this.O=n};function _u(n,e,t){n.K=1,n.v=Na(vn(e)),n.s=t,n.P=!0,Xg(n,null)}function Xg(n,e){n.F=Date.now(),Cs(n),n.A=vn(n.v);var t=n.A,r=n.U;Array.isArray(r)||(r=[String(r)]),sy(t.i,"t",r),n.C=0,t=n.l.H,n.h=new Yg,n.g=Cy(n.l,t?e:null,!n.s),0<n.N&&(n.L=new uS(vt(n.La,n,n.g),n.N)),$g(n.S,n.g,"readystatechange",n.ib),e=n.H?kg(n.H):{},n.s?(n.u||(n.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",n.g.da(n.A,n.u,n.s,e)):(n.u="GET",n.g.da(n.A,n.u,null,e)),ts(),lS(n.j,n.u,n.A,n.m,n.U,n.s)}Z.ib=function(n){n=n.target;const e=this.L;e&&mn(n)==3?e.l():this.La(n)};Z.La=function(n){try{if(n==this.g)e:{const l=mn(this.g);var e=this.g.Ea();const h=this.g.aa();if(!(3>l)&&(l!=3||lu||this.g&&(this.h.h||this.g.fa()||ff(this.g)))){this.I||l!=4||e==7||(e==8||0>=h?ts(3):ts(2)),Ca(this);var t=this.g.aa();this.Y=t;t:if(Jg(this)){var r=ff(this.g);n="";var i=r.length,s=mn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){tr(this),ji(this);var o="";break t}this.h.i=new se.TextDecoder}for(e=0;e<i;e++)this.h.h=!0,n+=this.h.i.decode(r[e],{stream:s&&e==i-1});r.splice(0,i),this.h.g+=n,this.C=0,o=this.h.g}else o=this.g.fa();if(this.i=t==200,hS(this.j,this.u,this.A,this.m,this.U,l,t),this.i){if(this.Z&&!this.J){t:{if(this.g){var a,c=this.g;if((a=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Bo(a)){var u=a;break t}}u=null}if(t=u)Vr(this.j,this.m,t,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,vu(this,t);else{this.i=!1,this.o=3,It(12),tr(this),ji(this);break e}}this.P?(Zg(this,l,o),lu&&this.i&&l==3&&($g(this.S,this.T,"tick",this.hb),this.T.start())):(Vr(this.j,this.m,o,null),vu(this,o)),l==4&&tr(this),this.i&&!this.I&&(l==4?Ty(this.l,this):(this.i=!1,Cs(this)))}else t==400&&0<o.indexOf("Unknown SID")?(this.o=3,It(12)):(this.o=0,It(13)),tr(this),ji(this)}}}catch{}finally{}};function Jg(n){return n.g?n.u=="GET"&&n.K!=2&&n.l.Da:!1}function Zg(n,e,t){let r=!0,i;for(;!n.I&&n.C<t.length;)if(i=mS(n,t),i==qo){e==4&&(n.o=4,It(14),r=!1),Vr(n.j,n.m,null,"[Incomplete Response]");break}else if(i==yu){n.o=4,It(15),Vr(n.j,n.m,t,"[Invalid Chunk]"),r=!1;break}else Vr(n.j,n.m,i,null),vu(n,i);Jg(n)&&i!=qo&&i!=yu&&(n.h.g="",n.C=0),e!=4||t.length!=0||n.h.h||(n.o=1,It(16),r=!1),n.i=n.i&&r,r?0<t.length&&!n.$&&(n.$=!0,e=n.l,e.g==n&&e.$&&!e.K&&(e.j.info("Great, no buffering proxy detected. Bytes received: "+t.length),Gl(e),e.K=!0,It(11))):(Vr(n.j,n.m,t,"[Invalid Chunked Response]"),tr(n),ji(n))}Z.hb=function(){if(this.g){var n=mn(this.g),e=this.g.fa();this.C<e.length&&(Ca(this),Zg(this,n,e),this.i&&n!=4&&Cs(this))}};function mS(n,e){var t=n.C,r=e.indexOf(`
`,t);return r==-1?qo:(t=Number(e.substring(t,r)),isNaN(t)?yu:(r+=1,r+t>e.length?qo:(e=e.substr(r,t),n.C=r+t,e)))}Z.cancel=function(){this.I=!0,tr(this)};function Cs(n){n.V=Date.now()+n.O,ey(n,n.O)}function ey(n,e){if(n.B!=null)throw Error("WatchDog timer not null");n.B=bs(vt(n.gb,n),e)}function Ca(n){n.B&&(se.clearTimeout(n.B),n.B=null)}Z.gb=function(){this.B=null;const n=Date.now();0<=n-this.V?(dS(this.j,this.A),this.K!=2&&(ts(),It(17)),tr(this),this.o=2,ji(this)):ey(this,this.V-n)};function ji(n){n.l.G==0||n.I||Ty(n.l,n)}function tr(n){Ca(n);var e=n.L;e&&typeof e.na=="function"&&e.na(),n.L=null,Ol(n.T),Gg(n.S),n.g&&(e=n.g,n.g=null,e.abort(),e.na())}function vu(n,e){try{var t=n.l;if(t.G!=0&&(t.g==n||wu(t.h,n))){if(!n.J&&wu(t.h,n)&&t.G==3){try{var r=t.Fa.g.parse(e)}catch{r=null}if(Array.isArray(r)&&r.length==3){var i=r;if(i[0]==0){e:if(!t.u){if(t.g)if(t.g.F+3e3<n.F)Go(t),Ra(t);else break e;$l(t),It(18)}}else t.Ba=i[1],0<t.Ba-t.T&&37500>i[2]&&t.L&&t.A==0&&!t.v&&(t.v=bs(vt(t.cb,t),6e3));if(1>=cy(t.h)&&t.ja){try{t.ja()}catch{}t.ja=void 0}}else nr(t,11)}else if((n.J||t.g==n)&&Go(t),!Bo(e))for(i=t.Fa.g.parse(e),e=0;e<i.length;e++){let u=i[e];if(t.T=u[0],u=u[1],t.G==2)if(u[0]=="c"){t.I=u[1],t.ka=u[2];const l=u[3];l!=null&&(t.ma=l,t.j.info("VER="+t.ma));const h=u[4];h!=null&&(t.Ca=h,t.j.info("SVER="+t.Ca));const d=u[5];d!=null&&typeof d=="number"&&0<d&&(r=1.5*d,t.J=r,t.j.info("backChannelRequestTimeoutMs_="+r)),r=t;const m=n.g;if(m){const g=m.g?m.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(g){var s=r.h;s.g||g.indexOf("spdy")==-1&&g.indexOf("quic")==-1&&g.indexOf("h2")==-1||(s.j=s.l,s.g=new Set,s.h&&(Ul(s,s.h),s.h=null))}if(r.D){const b=m.g?m.g.getResponseHeader("X-HTTP-Session-Id"):null;b&&(r.za=b,Pe(r.F,r.D,b))}}t.G=3,t.l&&t.l.xa(),t.$&&(t.P=Date.now()-n.F,t.j.info("Handshake RTT: "+t.P+"ms")),r=t;var o=n;if(r.sa=Sy(r,r.H?r.ka:null,r.V),o.J){uy(r.h,o);var a=o,c=r.J;c&&a.setTimeout(c),a.B&&(Ca(a),Cs(a)),r.g=o}else wy(r);0<t.i.length&&xa(t)}else u[0]!="stop"&&u[0]!="close"||nr(t,7);else t.G==3&&(u[0]=="stop"||u[0]=="close"?u[0]=="stop"?nr(t,7):jl(t):u[0]!="noop"&&t.l&&t.l.wa(u),t.A=0)}}ts(4)}catch{}}function gS(n){if(n.W&&typeof n.W=="function")return n.W();if(typeof Map<"u"&&n instanceof Map||typeof Set<"u"&&n instanceof Set)return Array.from(n.values());if(typeof n=="string")return n.split("");if(ya(n)){for(var e=[],t=n.length,r=0;r<t;r++)e.push(n[r]);return e}e=[],t=0;for(r in n)e[t++]=n[r];return e}function yS(n){if(n.oa&&typeof n.oa=="function")return n.oa();if(!n.W||typeof n.W!="function"){if(typeof Map<"u"&&n instanceof Map)return Array.from(n.keys());if(!(typeof Set<"u"&&n instanceof Set)){if(ya(n)||typeof n=="string"){var e=[];n=n.length;for(var t=0;t<n;t++)e.push(t);return e}e=[],t=0;for(const r in n)e[t++]=r;return e}}}function ty(n,e){if(n.forEach&&typeof n.forEach=="function")n.forEach(e,void 0);else if(ya(n)||typeof n=="string")Array.prototype.forEach.call(n,e,void 0);else for(var t=yS(n),r=gS(n),i=r.length,s=0;s<i;s++)e.call(void 0,r[s],t&&t[s],n)}var ny=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function _S(n,e){if(n){n=n.split("&");for(var t=0;t<n.length;t++){var r=n[t].indexOf("="),i=null;if(0<=r){var s=n[t].substring(0,r);i=n[t].substring(r+1)}else s=n[t];e(s,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}function ir(n,e){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,n instanceof ir){this.h=e!==void 0?e:n.h,jo(this,n.j),this.s=n.s,this.g=n.g,$o(this,n.m),this.l=n.l,e=n.i;var t=new ns;t.i=e.i,e.g&&(t.g=new Map(e.g),t.h=e.h),lf(this,t),this.o=n.o}else n&&(t=String(n).match(ny))?(this.h=!!e,jo(this,t[1]||"",!0),this.s=xi(t[2]||""),this.g=xi(t[3]||"",!0),$o(this,t[4]),this.l=xi(t[5]||"",!0),lf(this,t[6]||"",!0),this.o=xi(t[7]||"")):(this.h=!!e,this.i=new ns(null,this.h))}ir.prototype.toString=function(){var n=[],e=this.j;e&&n.push(ki(e,hf,!0),":");var t=this.g;return(t||e=="file")&&(n.push("//"),(e=this.s)&&n.push(ki(e,hf,!0),"@"),n.push(encodeURIComponent(String(t)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t=this.m,t!=null&&n.push(":",String(t))),(t=this.l)&&(this.g&&t.charAt(0)!="/"&&n.push("/"),n.push(ki(t,t.charAt(0)=="/"?ES:wS,!0))),(t=this.i.toString())&&n.push("?",t),(t=this.o)&&n.push("#",ki(t,bS)),n.join("")};function vn(n){return new ir(n)}function jo(n,e,t){n.j=t?xi(e,!0):e,n.j&&(n.j=n.j.replace(/:$/,""))}function $o(n,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);n.m=e}else n.m=null}function lf(n,e,t){e instanceof ns?(n.i=e,IS(n.i,n.h)):(t||(e=ki(e,TS)),n.i=new ns(e,n.h))}function Pe(n,e,t){n.i.set(e,t)}function Na(n){return Pe(n,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),n}function xi(n,e){return n?e?decodeURI(n.replace(/%25/g,"%2525")):decodeURIComponent(n):""}function ki(n,e,t){return typeof n=="string"?(n=encodeURI(n).replace(e,vS),t&&(n=n.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n):null}function vS(n){return n=n.charCodeAt(0),"%"+(n>>4&15).toString(16)+(n&15).toString(16)}var hf=/[#\/\?@]/g,wS=/[#\?:]/g,ES=/[#\?]/g,TS=/[#\?@]/g,bS=/#/g;function ns(n,e){this.h=this.g=null,this.i=n||null,this.j=!!e}function qn(n){n.g||(n.g=new Map,n.h=0,n.i&&_S(n.i,function(e,t){n.add(decodeURIComponent(e.replace(/\+/g," ")),t)}))}Z=ns.prototype;Z.add=function(n,e){qn(this),this.i=null,n=li(this,n);var t=this.g.get(n);return t||this.g.set(n,t=[]),t.push(e),this.h+=1,this};function ry(n,e){qn(n),e=li(n,e),n.g.has(e)&&(n.i=null,n.h-=n.g.get(e).length,n.g.delete(e))}function iy(n,e){return qn(n),e=li(n,e),n.g.has(e)}Z.forEach=function(n,e){qn(this),this.g.forEach(function(t,r){t.forEach(function(i){n.call(e,i,r,this)},this)},this)};Z.oa=function(){qn(this);const n=Array.from(this.g.values()),e=Array.from(this.g.keys()),t=[];for(let r=0;r<e.length;r++){const i=n[r];for(let s=0;s<i.length;s++)t.push(e[r])}return t};Z.W=function(n){qn(this);let e=[];if(typeof n=="string")iy(this,n)&&(e=e.concat(this.g.get(li(this,n))));else{n=Array.from(this.g.values());for(let t=0;t<n.length;t++)e=e.concat(n[t])}return e};Z.set=function(n,e){return qn(this),this.i=null,n=li(this,n),iy(this,n)&&(this.h-=this.g.get(n).length),this.g.set(n,[e]),this.h+=1,this};Z.get=function(n,e){return n?(n=this.W(n),0<n.length?String(n[0]):e):e};function sy(n,e,t){ry(n,e),0<t.length&&(n.i=null,n.g.set(li(n,e),Sl(t)),n.h+=t.length)}Z.toString=function(){if(this.i)return this.i;if(!this.g)return"";const n=[],e=Array.from(this.g.keys());for(var t=0;t<e.length;t++){var r=e[t];const s=encodeURIComponent(String(r)),o=this.W(r);for(r=0;r<o.length;r++){var i=s;o[r]!==""&&(i+="="+encodeURIComponent(String(o[r]))),n.push(i)}}return this.i=n.join("&")};function li(n,e){return e=String(e),n.j&&(e=e.toLowerCase()),e}function IS(n,e){e&&!n.j&&(qn(n),n.i=null,n.g.forEach(function(t,r){var i=r.toLowerCase();r!=i&&(ry(this,r),sy(this,i,t))},n)),n.j=e}var SS=class{constructor(e,t){this.h=e,this.g=t}};function oy(n){this.l=n||CS,se.PerformanceNavigationTiming?(n=se.performance.getEntriesByType("navigation"),n=0<n.length&&(n[0].nextHopProtocol=="hq"||n[0].nextHopProtocol=="h2")):n=!!(se.g&&se.g.Ga&&se.g.Ga()&&se.g.Ga().$b),this.j=n?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var CS=10;function ay(n){return n.h?!0:n.g?n.g.size>=n.j:!1}function cy(n){return n.h?1:n.g?n.g.size:0}function wu(n,e){return n.h?n.h==e:n.g?n.g.has(e):!1}function Ul(n,e){n.g?n.g.add(e):n.h=e}function uy(n,e){n.h&&n.h==e?n.h=null:n.g&&n.g.has(e)&&n.g.delete(e)}oy.prototype.cancel=function(){if(this.i=ly(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const n of this.g.values())n.cancel();this.g.clear()}};function ly(n){if(n.h!=null)return n.i.concat(n.h.D);if(n.g!=null&&n.g.size!==0){let e=n.i;for(const t of n.g.values())e=e.concat(t.D);return e}return Sl(n.i)}function Bl(){}Bl.prototype.stringify=function(n){return se.JSON.stringify(n,void 0)};Bl.prototype.parse=function(n){return se.JSON.parse(n,void 0)};function NS(){this.g=new Bl}function AS(n,e,t){const r=t||"";try{ty(n,function(i,s){let o=i;Es(i)&&(o=kl(i)),e.push(r+s+"="+encodeURIComponent(o))})}catch(i){throw e.push(r+"type="+encodeURIComponent("_badmap")),i}}function DS(n,e){const t=new Ta;if(se.Image){const r=new Image;r.onload=Qs(Xs,t,r,"TestLoadImage: loaded",!0,e),r.onerror=Qs(Xs,t,r,"TestLoadImage: error",!1,e),r.onabort=Qs(Xs,t,r,"TestLoadImage: abort",!1,e),r.ontimeout=Qs(Xs,t,r,"TestLoadImage: timeout",!1,e),se.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=n}else e(!1)}function Xs(n,e,t,r,i){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,i(r)}catch{}}function Ns(n){this.l=n.ac||null,this.j=n.jb||!1}dt(Ns,Ll);Ns.prototype.g=function(){return new Aa(this.l,this.j)};Ns.prototype.i=function(n){return function(){return n}}({});function Aa(n,e){rt.call(this),this.D=n,this.u=e,this.m=void 0,this.readyState=Vl,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}dt(Aa,rt);var Vl=0;Z=Aa.prototype;Z.open=function(n,e){if(this.readyState!=Vl)throw this.abort(),Error("Error reopening a connection");this.C=n,this.B=e,this.readyState=1,rs(this)};Z.send=function(n){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};n&&(e.body=n),(this.D||se).fetch(new Request(this.B,e)).then(this.Wa.bind(this),this.ga.bind(this))};Z.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,As(this)),this.readyState=Vl};Z.Wa=function(n){if(this.g&&(this.l=n,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=n.headers,this.readyState=2,rs(this)),this.g&&(this.readyState=3,rs(this),this.g)))if(this.responseType==="arraybuffer")n.arrayBuffer().then(this.Ua.bind(this),this.ga.bind(this));else if(typeof se.ReadableStream<"u"&&"body"in n){if(this.j=n.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;hy(this)}else n.text().then(this.Va.bind(this),this.ga.bind(this))};function hy(n){n.j.read().then(n.Ta.bind(n)).catch(n.ga.bind(n))}Z.Ta=function(n){if(this.g){if(this.u&&n.value)this.response.push(n.value);else if(!this.u){var e=n.value?n.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!n.done}))&&(this.response=this.responseText+=e)}n.done?As(this):rs(this),this.readyState==3&&hy(this)}};Z.Va=function(n){this.g&&(this.response=this.responseText=n,As(this))};Z.Ua=function(n){this.g&&(this.response=n,As(this))};Z.ga=function(){this.g&&As(this)};function As(n){n.readyState=4,n.l=null,n.j=null,n.A=null,rs(n)}Z.setRequestHeader=function(n,e){this.v.append(n,e)};Z.getResponseHeader=function(n){return this.h&&this.h.get(n.toLowerCase())||""};Z.getAllResponseHeaders=function(){if(!this.h)return"";const n=[],e=this.h.entries();for(var t=e.next();!t.done;)t=t.value,n.push(t[0]+": "+t[1]),t=e.next();return n.join(`\r
`)};function rs(n){n.onreadystatechange&&n.onreadystatechange.call(n)}Object.defineProperty(Aa.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(n){this.m=n?"include":"same-origin"}});var RS=se.JSON.parse;function Ge(n){rt.call(this),this.headers=new Map,this.u=n||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=dy,this.K=this.L=!1}dt(Ge,rt);var dy="",xS=/^https?$/i,kS=["POST","PUT"];Z=Ge.prototype;Z.Ka=function(n){this.L=n};Z.da=function(n,e,t,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+n);e=e?e.toUpperCase():"GET",this.H=n,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():gu.g(),this.C=this.u?uf(this.u):uf(gu),this.g.onreadystatechange=vt(this.Ha,this);try{this.F=!0,this.g.open(e,String(n),!0),this.F=!1}catch(s){df(this,s);return}if(n=t||"",t=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var i in r)t.set(i,r[i]);else if(typeof r.keys=="function"&&typeof r.get=="function")for(const s of r.keys())t.set(s,r.get(s));else throw Error("Unknown input type for opt_headers: "+String(r));r=Array.from(t.keys()).find(s=>s.toLowerCase()=="content-type"),i=se.FormData&&n instanceof se.FormData,!(0<=Ag(kS,e))||r||i||t.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[s,o]of t)this.g.setRequestHeader(s,o);this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{my(this),0<this.B&&((this.K=OS(this.g))?(this.g.timeout=this.B,this.g.ontimeout=vt(this.qa,this)):this.A=Pl(this.qa,this.B,this)),this.v=!0,this.g.send(n),this.v=!1}catch(s){df(this,s)}};function OS(n){return Xr&&Y0()&&typeof n.timeout=="number"&&n.ontimeout!==void 0}Z.qa=function(){typeof Il<"u"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,lt(this,"timeout"),this.abort(8))};function df(n,e){n.h=!1,n.g&&(n.l=!0,n.g.abort(),n.l=!1),n.j=e,n.m=5,fy(n),Da(n)}function fy(n){n.D||(n.D=!0,lt(n,"complete"),lt(n,"error"))}Z.abort=function(n){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=n||7,lt(this,"complete"),lt(this,"abort"),Da(this))};Z.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Da(this,!0)),Ge.X.M.call(this)};Z.Ha=function(){this.s||(this.F||this.v||this.l?py(this):this.fb())};Z.fb=function(){py(this)};function py(n){if(n.h&&typeof Il<"u"&&(!n.C[1]||mn(n)!=4||n.aa()!=2)){if(n.v&&mn(n)==4)Pl(n.Ha,0,n);else if(lt(n,"readystatechange"),mn(n)==4){n.h=!1;try{const a=n.aa();e:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var t;if(!(t=e)){var r;if(r=a===0){var i=String(n.H).match(ny)[1]||null;if(!i&&se.self&&se.self.location){var s=se.self.location.protocol;i=s.substr(0,s.length-1)}r=!xS.test(i?i.toLowerCase():"")}t=r}if(t)lt(n,"complete"),lt(n,"success");else{n.m=6;try{var o=2<mn(n)?n.g.statusText:""}catch{o=""}n.j=o+" ["+n.aa()+"]",fy(n)}}finally{Da(n)}}}}function Da(n,e){if(n.g){my(n);const t=n.g,r=n.C[0]?Uo:null;n.g=null,n.C=null,e||lt(n,"ready");try{t.onreadystatechange=r}catch{}}}function my(n){n.g&&n.K&&(n.g.ontimeout=null),n.A&&(se.clearTimeout(n.A),n.A=null)}function mn(n){return n.g?n.g.readyState:0}Z.aa=function(){try{return 2<mn(this)?this.g.status:-1}catch{return-1}};Z.fa=function(){try{return this.g?this.g.responseText:""}catch{return""}};Z.Sa=function(n){if(this.g){var e=this.g.responseText;return n&&e.indexOf(n)==0&&(e=e.substring(n.length)),RS(e)}};function ff(n){try{if(!n.g)return null;if("response"in n.g)return n.g.response;switch(n.J){case dy:case"text":return n.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in n.g)return n.g.mozResponseArrayBuffer}return null}catch{return null}}Z.Ea=function(){return this.m};Z.Oa=function(){return typeof this.j=="string"?this.j:String(this.j)};function gy(n){let e="";return Nl(n,function(t,r){e+=r,e+=":",e+=t,e+=`\r
`}),e}function ql(n,e,t){e:{for(r in t){var r=!1;break e}r=!0}r||(t=gy(t),typeof n=="string"?t!=null&&encodeURIComponent(String(t)):Pe(n,e,t))}function Ti(n,e,t){return t&&t.internalChannelParams&&t.internalChannelParams[n]||e}function yy(n){this.Ca=0,this.i=[],this.j=new Ta,this.ka=this.sa=this.F=this.V=this.g=this.za=this.D=this.ia=this.o=this.S=this.s=null,this.ab=this.U=0,this.Za=Ti("failFast",!1,n),this.L=this.v=this.u=this.m=this.l=null,this.Y=!0,this.pa=this.Ba=this.T=-1,this.Z=this.A=this.C=0,this.Xa=Ti("baseRetryDelayMs",5e3,n),this.bb=Ti("retryDelaySeedMs",1e4,n),this.$a=Ti("forwardChannelMaxRetries",2,n),this.ta=Ti("forwardChannelRequestTimeoutMs",2e4,n),this.ra=n&&n.xmlHttpFactory||void 0,this.Da=n&&n.Zb||!1,this.J=void 0,this.H=n&&n.supportsCrossDomainXhr||!1,this.I="",this.h=new oy(n&&n.concurrentRequestLimit),this.Fa=new NS,this.O=n&&n.fastHandshake||!1,this.N=n&&n.encodeInitMessageHeaders||!1,this.O&&this.N&&(this.N=!1),this.Ya=n&&n.Xb||!1,n&&n.Aa&&this.j.Aa(),n&&n.forceLongPolling&&(this.Y=!1),this.$=!this.O&&this.Y&&n&&n.detectBufferingProxy||!1,this.ja=void 0,this.P=0,this.K=!1,this.la=this.B=null}Z=yy.prototype;Z.ma=8;Z.G=1;function jl(n){if(_y(n),n.G==3){var e=n.U++,t=vn(n.F);Pe(t,"SID",n.I),Pe(t,"RID",e),Pe(t,"TYPE","terminate"),Ds(n,t),e=new Ss(n,n.j,e,void 0),e.K=2,e.v=Na(vn(t)),t=!1,se.navigator&&se.navigator.sendBeacon&&(t=se.navigator.sendBeacon(e.v.toString(),"")),!t&&se.Image&&(new Image().src=e.v,t=!0),t||(e.g=Cy(e.l,null),e.g.da(e.v)),e.F=Date.now(),Cs(e)}Iy(n)}function Ra(n){n.g&&(Gl(n),n.g.cancel(),n.g=null)}function _y(n){Ra(n),n.u&&(se.clearTimeout(n.u),n.u=null),Go(n),n.h.cancel(),n.m&&(typeof n.m=="number"&&se.clearTimeout(n.m),n.m=null)}function xa(n){ay(n.h)||n.m||(n.m=!0,Vg(n.Ja,n),n.C=0)}function PS(n,e){return cy(n.h)>=n.h.j-(n.m?1:0)?!1:n.m?(n.i=e.D.concat(n.i),!0):n.G==1||n.G==2||n.C>=(n.Za?0:n.$a)?!1:(n.m=bs(vt(n.Ja,n,e),by(n,n.C)),n.C++,!0)}Z.Ja=function(n){if(this.m)if(this.m=null,this.G==1){if(!n){this.U=Math.floor(1e5*Math.random()),n=this.U++;const i=new Ss(this,this.j,n,void 0);let s=this.s;if(this.S&&(s?(s=kg(s),Og(s,this.S)):s=this.S),this.o!==null||this.N||(i.H=s,s=null),this.O)e:{for(var e=0,t=0;t<this.i.length;t++){t:{var r=this.i[t];if("__data__"in r.g&&(r=r.g.__data__,typeof r=="string")){r=r.length;break t}r=void 0}if(r===void 0)break;if(e+=r,4096<e){e=t;break e}if(e===4096||t===this.i.length-1){e=t+1;break e}}e=1e3}else e=1e3;e=vy(this,i,e),t=vn(this.F),Pe(t,"RID",n),Pe(t,"CVER",22),this.D&&Pe(t,"X-HTTP-Session-Id",this.D),Ds(this,t),s&&(this.N?e="headers="+encodeURIComponent(String(gy(s)))+"&"+e:this.o&&ql(t,this.o,s)),Ul(this.h,i),this.Ya&&Pe(t,"TYPE","init"),this.O?(Pe(t,"$req",e),Pe(t,"SID","null"),i.Z=!0,_u(i,t,null)):_u(i,t,e),this.G=2}}else this.G==3&&(n?pf(this,n):this.i.length==0||ay(this.h)||pf(this))};function pf(n,e){var t;e?t=e.m:t=n.U++;const r=vn(n.F);Pe(r,"SID",n.I),Pe(r,"RID",t),Pe(r,"AID",n.T),Ds(n,r),n.o&&n.s&&ql(r,n.o,n.s),t=new Ss(n,n.j,t,n.C+1),n.o===null&&(t.H=n.s),e&&(n.i=e.D.concat(n.i)),e=vy(n,t,1e3),t.setTimeout(Math.round(.5*n.ta)+Math.round(.5*n.ta*Math.random())),Ul(n.h,t),_u(t,r,e)}function Ds(n,e){n.ia&&Nl(n.ia,function(t,r){Pe(e,r,t)}),n.l&&ty({},function(t,r){Pe(e,r,t)})}function vy(n,e,t){t=Math.min(n.i.length,t);var r=n.l?vt(n.l.Ra,n.l,n):null;e:{var i=n.i;let s=-1;for(;;){const o=["count="+t];s==-1?0<t?(s=i[0].h,o.push("ofs="+s)):s=0:o.push("ofs="+s);let a=!0;for(let c=0;c<t;c++){let u=i[c].h;const l=i[c].g;if(u-=s,0>u)s=Math.max(0,i[c].h-100),a=!1;else try{AS(l,o,"req"+u+"_")}catch{r&&r(l)}}if(a){r=o.join("&");break e}}}return n=n.i.splice(0,t),e.D=n,r}function wy(n){n.g||n.u||(n.Z=1,Vg(n.Ia,n),n.A=0)}function $l(n){return n.g||n.u||3<=n.A?!1:(n.Z++,n.u=bs(vt(n.Ia,n),by(n,n.A)),n.A++,!0)}Z.Ia=function(){if(this.u=null,Ey(this),this.$&&!(this.K||this.g==null||0>=this.P)){var n=2*this.P;this.j.info("BP detection timer enabled: "+n),this.B=bs(vt(this.eb,this),n)}};Z.eb=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.L=!1,this.K=!0,It(10),Ra(this),Ey(this))};function Gl(n){n.B!=null&&(se.clearTimeout(n.B),n.B=null)}function Ey(n){n.g=new Ss(n,n.j,"rpc",n.Z),n.o===null&&(n.g.H=n.s),n.g.N=0;var e=vn(n.sa);Pe(e,"RID","rpc"),Pe(e,"SID",n.I),Pe(e,"CI",n.L?"0":"1"),Pe(e,"AID",n.T),Pe(e,"TYPE","xmlhttp"),Ds(n,e),n.o&&n.s&&ql(e,n.o,n.s),n.J&&n.g.setTimeout(n.J);var t=n.g;n=n.ka,t.K=1,t.v=Na(vn(e)),t.s=null,t.P=!0,Xg(t,n)}Z.cb=function(){this.v!=null&&(this.v=null,Ra(this),$l(this),It(19))};function Go(n){n.v!=null&&(se.clearTimeout(n.v),n.v=null)}function Ty(n,e){var t=null;if(n.g==e){Go(n),Gl(n),n.g=null;var r=2}else if(wu(n.h,e))t=e.D,uy(n.h,e),r=1;else return;if(n.G!=0){if(n.pa=e.Y,e.i)if(r==1){t=e.s?e.s.length:0,e=Date.now()-e.F;var i=n.C;r=ba(),lt(r,new Hg(r,t)),xa(n)}else wy(n);else if(i=e.o,i==3||i==0&&0<n.pa||!(r==1&&PS(n,e)||r==2&&$l(n)))switch(t&&0<t.length&&(e=n.h,e.i=e.i.concat(t)),i){case 1:nr(n,5);break;case 4:nr(n,10);break;case 3:nr(n,6);break;default:nr(n,2)}}}function by(n,e){let t=n.Xa+Math.floor(Math.random()*n.bb);return n.l||(t*=2),t*e}function nr(n,e){if(n.j.info("Error code "+e),e==2){var t=null;n.l&&(t=null);var r=vt(n.kb,n);t||(t=new ir("//www.google.com/images/cleardot.gif"),se.location&&se.location.protocol=="http"||jo(t,"https"),Na(t)),DS(t.toString(),r)}else It(2);n.G=0,n.l&&n.l.va(e),Iy(n),_y(n)}Z.kb=function(n){n?(this.j.info("Successfully pinged google.com"),It(2)):(this.j.info("Failed to ping google.com"),It(1))};function Iy(n){if(n.G=0,n.la=[],n.l){const e=ly(n.h);(e.length!=0||n.i.length!=0)&&(nf(n.la,e),nf(n.la,n.i),n.h.i.length=0,Sl(n.i),n.i.length=0),n.l.ua()}}function Sy(n,e,t){var r=t instanceof ir?vn(t):new ir(t,void 0);if(r.g!="")e&&(r.g=e+"."+r.g),$o(r,r.m);else{var i=se.location;r=i.protocol,e=e?e+"."+i.hostname:i.hostname,i=+i.port;var s=new ir(null,void 0);r&&jo(s,r),e&&(s.g=e),i&&$o(s,i),t&&(s.l=t),r=s}return t=n.D,e=n.za,t&&e&&Pe(r,t,e),Pe(r,"VER",n.ma),Ds(n,r),r}function Cy(n,e,t){if(e&&!n.H)throw Error("Can't create secondary domain capable XhrIo object.");return e=t&&n.Da&&!n.ra?new Ge(new Ns({jb:!0})):new Ge(n.ra),e.Ka(n.H),e}function Ny(){}Z=Ny.prototype;Z.xa=function(){};Z.wa=function(){};Z.va=function(){};Z.ua=function(){};Z.Ra=function(){};function Ko(){if(Xr&&!(10<=Number(X0)))throw Error("Environmental error: no available transport.")}Ko.prototype.g=function(n,e){return new Bt(n,e)};function Bt(n,e){rt.call(this),this.g=new yy(e),this.l=n,this.h=e&&e.messageUrlParams||null,n=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(n?n["X-Client-Protocol"]="webchannel":n={"X-Client-Protocol":"webchannel"}),this.g.s=n,n=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(n?n["X-WebChannel-Content-Type"]=e.messageContentType:n={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.ya&&(n?n["X-WebChannel-Client-Profile"]=e.ya:n={"X-WebChannel-Client-Profile":e.ya}),this.g.S=n,(n=e&&e.Yb)&&!Bo(n)&&(this.g.o=n),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!Bo(e)&&(this.g.D=e,n=this.h,n!==null&&e in n&&(n=this.h,e in n&&delete n[e])),this.j=new hi(this)}dt(Bt,rt);Bt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.H=!0);var n=this.g,e=this.l,t=this.h||void 0;It(0),n.V=e,n.ia=t||{},n.L=n.Y,n.F=Sy(n,null,n.V),xa(n)};Bt.prototype.close=function(){jl(this.g)};Bt.prototype.u=function(n){var e=this.g;if(typeof n=="string"){var t={};t.__data__=n,n=t}else this.v&&(t={},t.__data__=kl(n),n=t);e.i.push(new SS(e.ab++,n)),e.G==3&&xa(e)};Bt.prototype.M=function(){this.g.l=null,delete this.j,jl(this.g),delete this.g,Bt.X.M.call(this)};function Ay(n){Ml.call(this);var e=n.__sm__;if(e){e:{for(const t in e){n=t;break e}n=void 0}(this.i=n)&&(n=this.i,e=e!==null&&n in e?e[n]:void 0),this.data=e}else this.data=n}dt(Ay,Ml);function Dy(){Fl.call(this),this.status=1}dt(Dy,Fl);function hi(n){this.g=n}dt(hi,Ny);hi.prototype.xa=function(){lt(this.g,"a")};hi.prototype.wa=function(n){lt(this.g,new Ay(n))};hi.prototype.va=function(n){lt(this.g,new Dy)};hi.prototype.ua=function(){lt(this.g,"b")};Ko.prototype.createWebChannel=Ko.prototype.g;Bt.prototype.send=Bt.prototype.u;Bt.prototype.open=Bt.prototype.m;Bt.prototype.close=Bt.prototype.close;Ia.NO_ERROR=0;Ia.TIMEOUT=8;Ia.HTTP_ERROR=6;Wg.COMPLETE="complete";Qg.EventType=Is;Is.OPEN="a";Is.CLOSE="b";Is.ERROR="c";Is.MESSAGE="d";rt.prototype.listen=rt.prototype.N;Ge.prototype.listenOnce=Ge.prototype.O;Ge.prototype.getLastError=Ge.prototype.Oa;Ge.prototype.getLastErrorCode=Ge.prototype.Ea;Ge.prototype.getStatus=Ge.prototype.aa;Ge.prototype.getResponseJson=Ge.prototype.Sa;Ge.prototype.getResponseText=Ge.prototype.fa;Ge.prototype.send=Ge.prototype.da;Ge.prototype.setWithCredentials=Ge.prototype.Ka;var LS=function(){return new Ko},MS=function(){return ba()},Pc=Ia,FS=Wg,US=Cr,mf={sb:0,vb:1,wb:2,Pb:3,Ub:4,Rb:5,Sb:6,Qb:7,Ob:8,Tb:9,PROXY:10,NOPROXY:11,Mb:12,Ib:13,Jb:14,Hb:15,Kb:16,Lb:17,ob:18,nb:19,pb:20},BS=Ns,Js=Qg,VS=Ge;const gf="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}at.UNAUTHENTICATED=new at(null),at.GOOGLE_CREDENTIALS=new at("google-credentials-uid"),at.FIRST_PARTY=new at("first-party-uid"),at.MOCK_USER=new at("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let di="9.17.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fr=new la("@firebase/firestore");function Eu(){return fr.logLevel}function F(n,...e){if(fr.logLevel<=ye.DEBUG){const t=e.map(Kl);fr.debug(`Firestore (${di}): ${n}`,...t)}}function bt(n,...e){if(fr.logLevel<=ye.ERROR){const t=e.map(Kl);fr.error(`Firestore (${di}): ${n}`,...t)}}function zo(n,...e){if(fr.logLevel<=ye.WARN){const t=e.map(Kl);fr.warn(`Firestore (${di}): ${n}`,...t)}}function Kl(n){if(typeof n=="string")return n;try{return e=n,JSON.stringify(e)}catch{return n}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y(n="Unexpected state"){const e=`FIRESTORE (${di}) INTERNAL ASSERTION FAILED: `+n;throw bt(e),new Error(e)}function ne(n,e){n||Y()}function oe(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class U extends fn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ry{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class qS{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(at.UNAUTHENTICATED))}shutdown(){}}class jS{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class $S{constructor(e){this.t=e,this.currentUser=at.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let r=this.i;const i=c=>this.i!==r?(r=this.i,t(c)):Promise.resolve();let s=new Zt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Zt,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const c=s;e.enqueueRetryable(async()=>{await c.promise,await i(this.currentUser)})},a=c=>{F("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(c=>a(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):(F("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Zt)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(F("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ne(typeof r.accessToken=="string"),new Ry(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return ne(e===null||typeof e=="string"),new at(e)}}class GS{constructor(e,t,r,i){this.h=e,this.l=t,this.m=r,this.g=i,this.type="FirstParty",this.user=at.FIRST_PARTY,this.p=new Map}I(){return this.g?this.g():(ne(!(typeof this.h!="object"||this.h===null||!this.h.auth||!this.h.auth.getAuthHeaderValueForFirstParty)),this.h.auth.getAuthHeaderValueForFirstParty([]))}get headers(){this.p.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.p.set("Authorization",e),this.m&&this.p.set("X-Goog-Iam-Authorization-Token",this.m),this.p}}class KS{constructor(e,t,r,i){this.h=e,this.l=t,this.m=r,this.g=i}getToken(){return Promise.resolve(new GS(this.h,this.l,this.m,this.g))}start(e,t){e.enqueueRetryable(()=>t(at.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class zS{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class HS{constructor(e){this.T=e,this.forceRefresh=!1,this.appCheck=null,this.A=null}start(e,t){const r=s=>{s.error!=null&&F("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.A;return this.A=s.token,F("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{F("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.appCheck.addTokenListener(this.o)};this.T.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.T.getImmediate({optional:!0});s?i(s):F("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ne(typeof t.token=="string"),this.A=t.token,new zS(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WS(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xy{static R(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=WS(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%e.length))}return r}}function ae(n,e){return n<e?-1:n>e?1:0}function Jr(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}function ky(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new U(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new U(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new U(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Ue.fromMillis(Date.now())}static fromDate(e){return Ue.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new Ue(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?ae(this.nanoseconds,e.nanoseconds):ae(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e){this.timestamp=e}static fromTimestamp(e){return new re(e)}static min(){return new re(new Ue(0,0))}static max(){return new re(new Ue(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(e,t,r){t===void 0?t=0:t>e.length&&Y(),r===void 0?r=e.length-t:r>e.length-t&&Y(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return is.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof is?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class ve extends is{construct(e,t,r){return new ve(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new U(S.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new ve(t)}static emptyPath(){return new ve([])}}const QS=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ye extends is{construct(e,t,r){return new Ye(e,t,r)}static isValidIdentifier(e){return QS.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ye.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Ye(["__name__"])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new U(S.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;i<e.length;){const a=e[i];if(a==="\\"){if(i+1===e.length)throw new U(S.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new U(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,i+=2}else a==="`"?(o=!o,i++):a!=="."||o?(r+=a,i++):(s(),i++)}if(s(),o)throw new U(S.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ye(t)}static emptyPath(){return new Ye([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e){this.path=e}static fromPath(e){return new G(ve.fromString(e))}static fromName(e){return new G(ve.fromString(e).popFirst(5))}static empty(){return new G(ve.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ve.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ve.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new G(new ve(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oy{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}}function Tu(n){return n.fields.find(e=>e.kind===2)}function Wn(n){return n.fields.filter(e=>e.kind!==2)}Oy.UNKNOWN_ID=-1;class YS{constructor(e,t){this.fieldPath=e,this.kind=t}}class Ho{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Ho(0,Vt.min())}}function XS(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=re.fromTimestamp(r===1e9?new Ue(t+1,0):new Ue(t,r));return new Vt(i,G.empty(),e)}function Py(n){return new Vt(n.readTime,n.key,-1)}class Vt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Vt(re.min(),G.empty(),-1)}static max(){return new Vt(re.max(),G.empty(),-1)}}function zl(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=G.comparator(n.documentKey,e.documentKey),t!==0?t:ae(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ly="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class My{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nr(n){if(n.code!==S.FAILED_PRECONDITION||n.message!==Ly)throw n;F("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&Y(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new T((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof T?t:T.resolve(t)}catch(t){return T.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):T.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):T.reject(t)}static resolve(e){return new T((t,r)=>{t(e)})}static reject(e){return new T((t,r)=>{r(e)})}static waitFor(e){return new T((t,r)=>{let i=0,s=0,o=!1;e.forEach(a=>{++i,a.next(()=>{++s,o&&s===i&&t()},c=>r(c))}),o=!0,s===i&&t()})}static or(e){let t=T.resolve(!1);for(const r of e)t=t.next(i=>i?T.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new T((r,i)=>{const s=e.length,o=new Array(s);let a=0;for(let c=0;c<s;c++){const u=c;t(e[u]).next(l=>{o[u]=l,++a,a===s&&r(o)},l=>i(l))}})}static doWhile(e,t){return new T((r,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ka{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.v=new Zt,this.transaction.oncomplete=()=>{this.v.resolve()},this.transaction.onabort=()=>{t.error?this.v.reject(new $i(e,t.error)):this.v.resolve()},this.transaction.onerror=r=>{const i=Hl(r.target.error);this.v.reject(new $i(e,i))}}static open(e,t,r,i){try{return new ka(t,e.transaction(i,r))}catch(s){throw new $i(t,s)}}get P(){return this.v.promise}abort(e){e&&this.v.reject(e),this.aborted||(F("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}V(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new ZS(t)}}class gn{constructor(e,t,r){this.name=e,this.version=t,this.S=r,gn.D(Ut())===12.2&&bt("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return F("SimpleDb","Removing database:",e),Qn(window.indexedDB.deleteDatabase(e)).toPromise()}static C(){if(!Jp())return!1;if(gn.N())return!0;const e=Ut(),t=gn.D(e),r=0<t&&t<10,i=gn.k(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static N(){var e;return typeof process<"u"&&((e=process.env)===null||e===void 0?void 0:e.O)==="YES"}static M(e,t){return e.store(t)}static D(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}static k(e){const t=e.match(/Android ([\d.]+)/i),r=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(r)}async F(e){return this.db||(F("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,r)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const o=s.target.result;t(o)},i.onblocked=()=>{r(new $i(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const o=s.target.error;o.name==="VersionError"?r(new U(S.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new U(S.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new $i(e,o))},i.onupgradeneeded=s=>{F("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const o=s.target.result;this.S.$(o,i.transaction,s.oldVersion,this.version).next(()=>{F("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.B&&(this.db.onversionchange=t=>this.B(t)),this.db}L(e){this.B=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,i){const s=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.F(e);const a=ka.open(this.db,e,s?"readonly":"readwrite",r),c=i(a).next(u=>(a.V(),u)).catch(u=>(a.abort(u),T.reject(u))).toPromise();return c.catch(()=>{}),await a.P,c}catch(a){const c=a,u=c.name!=="FirebaseError"&&o<3;if(F("SimpleDb","Transaction failed with error:",c.message,"Retrying:",u),this.close(),!u)return Promise.reject(c)}}}close(){this.db&&this.db.close(),this.db=void 0}}class JS{constructor(e){this.q=e,this.U=!1,this.K=null}get isDone(){return this.U}get G(){return this.K}set cursor(e){this.q=e}done(){this.U=!0}j(e){this.K=e}delete(){return Qn(this.q.delete())}}class $i extends U{constructor(e,t){super(S.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function jn(n){return n.name==="IndexedDbTransactionError"}class ZS{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(F("SimpleDb","PUT",this.store.name,e,t),r=this.store.put(t,e)):(F("SimpleDb","PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),Qn(r)}add(e){return F("SimpleDb","ADD",this.store.name,e,e),Qn(this.store.add(e))}get(e){return Qn(this.store.get(e)).next(t=>(t===void 0&&(t=null),F("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return F("SimpleDb","DELETE",this.store.name,e),Qn(this.store.delete(e))}count(){return F("SimpleDb","COUNT",this.store.name),Qn(this.store.count())}W(e,t){const r=this.options(e,t);if(r.index||typeof this.store.getAll!="function"){const i=this.cursor(r),s=[];return this.H(i,(o,a)=>{s.push(a)}).next(()=>s)}{const i=this.store.getAll(r.range);return new T((s,o)=>{i.onerror=a=>{o(a.target.error)},i.onsuccess=a=>{s(a.target.result)}})}}J(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new T((i,s)=>{r.onerror=o=>{s(o.target.error)},r.onsuccess=o=>{i(o.target.result)}})}Y(e,t){F("SimpleDb","DELETE ALL",this.store.name);const r=this.options(e,t);r.Z=!1;const i=this.cursor(r);return this.H(i,(s,o,a)=>a.delete())}X(e,t){let r;t?r=e:(r={},t=e);const i=this.cursor(r);return this.H(i,t)}tt(e){const t=this.cursor({});return new T((r,i)=>{t.onerror=s=>{const o=Hl(s.target.error);i(o)},t.onsuccess=s=>{const o=s.target.result;o?e(o.primaryKey,o.value).next(a=>{a?o.continue():r()}):r()}})}H(e,t){const r=[];return new T((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{const a=o.target.result;if(!a)return void i();const c=new JS(a),u=t(a.primaryKey,a.value,c);if(u instanceof T){const l=u.catch(h=>(c.done(),T.reject(h)));r.push(l)}c.isDone?i():c.G===null?a.continue():a.continue(c.G)}}).next(()=>T.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Z?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Qn(n){return new T((e,t)=>{n.onsuccess=r=>{const i=r.target.result;e(i)},n.onerror=r=>{const i=Hl(r.target.error);t(i)}})}let yf=!1;function Hl(n){const e=gn.D(Ut());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new U("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return yf||(yf=!0,setTimeout(()=>{throw r},0)),r}}return n}class eC{constructor(e,t){this.asyncQueue=e,this.et=t,this.task=null}start(){this.nt(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}nt(e){F("IndexBackiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{F("IndexBackiller",`Documents written: ${await this.et.st()}`)}catch(t){jn(t)?F("IndexBackiller","Ignoring IndexedDB error during index backfill: ",t):await Nr(t)}await this.nt(6e4)})}}class tC{constructor(e,t){this.localStore=e,this.persistence=t}async st(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.it(t,e))}it(e,t){const r=new Set;let i=t,s=!0;return T.doWhile(()=>s===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return F("IndexBackiller",`Processing collection: ${o}`),this.rt(e,o,i).next(a=>{i-=a,r.add(o)});s=!1})).next(()=>t-i)}rt(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,r).next(s=>{const o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.ot(i,s)).next(a=>(F("IndexBackiller",`Updating offset: ${a}`),this.localStore.indexManager.updateCollectionGroup(e,t,a))).next(()=>o.size)}))}ot(e,t){let r=e;return t.changes.forEach((i,s)=>{const o=Py(s);zl(o,r)>0&&(r=o)}),new Vt(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ut(r),this.ct=r=>t.writeSequenceNumber(r))}ut(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ct&&this.ct(e),e}}$t.at=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nC{constructor(e,t,r,i,s,o,a,c){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.useFetchStreams=c}}class pr{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new pr("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof pr&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _f(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Ar(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Fy(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oa(n){return n==null}function ss(n){return n===0&&1/n==-1/0}function rC(n){return typeof n=="number"&&Number.isInteger(n)&&!ss(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iC extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(r){try{return atob(r)}catch(i){throw i instanceof DOMException?new iC("Invalid base64 string: "+i):i}}(e);return new ht(t)}static fromUint8Array(e){const t=function(r){let i="";for(let s=0;s<r.length;++s)i+=String.fromCharCode(r[s]);return i}(e);return new ht(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ae(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ht.EMPTY_BYTE_STRING=new ht("");const sC=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Mn(n){if(ne(!!n),typeof n=="string"){let e=0;const t=sC.exec(n);if(ne(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:qe(n.seconds),nanos:qe(n.nanos)}}function qe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function mr(n){return typeof n=="string"?ht.fromBase64String(n):ht.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wl(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Uy(n){const e=n.mapValue.fields.__previous_value__;return Wl(e)?Uy(e):e}function os(n){const e=Mn(n.mapValue.fields.__local_write_time__.timestampValue);return new Ue(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const An={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},uo={nullValue:"NULL_VALUE"};function gr(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Wl(n)?4:By(n)?9007199254740991:10:Y()}function hn(n,e){if(n===e)return!0;const t=gr(n);if(t!==gr(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return os(n).isEqual(os(e));case 3:return function(r,i){if(typeof r.timestampValue=="string"&&typeof i.timestampValue=="string"&&r.timestampValue.length===i.timestampValue.length)return r.timestampValue===i.timestampValue;const s=Mn(r.timestampValue),o=Mn(i.timestampValue);return s.seconds===o.seconds&&s.nanos===o.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(r,i){return mr(r.bytesValue).isEqual(mr(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(r,i){return qe(r.geoPointValue.latitude)===qe(i.geoPointValue.latitude)&&qe(r.geoPointValue.longitude)===qe(i.geoPointValue.longitude)}(n,e);case 2:return function(r,i){if("integerValue"in r&&"integerValue"in i)return qe(r.integerValue)===qe(i.integerValue);if("doubleValue"in r&&"doubleValue"in i){const s=qe(r.doubleValue),o=qe(i.doubleValue);return s===o?ss(s)===ss(o):isNaN(s)&&isNaN(o)}return!1}(n,e);case 9:return Jr(n.arrayValue.values||[],e.arrayValue.values||[],hn);case 10:return function(r,i){const s=r.mapValue.fields||{},o=i.mapValue.fields||{};if(_f(s)!==_f(o))return!1;for(const a in s)if(s.hasOwnProperty(a)&&(o[a]===void 0||!hn(s[a],o[a])))return!1;return!0}(n,e);default:return Y()}}function as(n,e){return(n.values||[]).find(t=>hn(t,e))!==void 0}function Fn(n,e){if(n===e)return 0;const t=gr(n),r=gr(e);if(t!==r)return ae(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ae(n.booleanValue,e.booleanValue);case 2:return function(i,s){const o=qe(i.integerValue||i.doubleValue),a=qe(s.integerValue||s.doubleValue);return o<a?-1:o>a?1:o===a?0:isNaN(o)?isNaN(a)?0:-1:1}(n,e);case 3:return vf(n.timestampValue,e.timestampValue);case 4:return vf(os(n),os(e));case 5:return ae(n.stringValue,e.stringValue);case 6:return function(i,s){const o=mr(i),a=mr(s);return o.compareTo(a)}(n.bytesValue,e.bytesValue);case 7:return function(i,s){const o=i.split("/"),a=s.split("/");for(let c=0;c<o.length&&c<a.length;c++){const u=ae(o[c],a[c]);if(u!==0)return u}return ae(o.length,a.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,s){const o=ae(qe(i.latitude),qe(s.latitude));return o!==0?o:ae(qe(i.longitude),qe(s.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return function(i,s){const o=i.values||[],a=s.values||[];for(let c=0;c<o.length&&c<a.length;++c){const u=Fn(o[c],a[c]);if(u)return u}return ae(o.length,a.length)}(n.arrayValue,e.arrayValue);case 10:return function(i,s){if(i===An.mapValue&&s===An.mapValue)return 0;if(i===An.mapValue)return 1;if(s===An.mapValue)return-1;const o=i.fields||{},a=Object.keys(o),c=s.fields||{},u=Object.keys(c);a.sort(),u.sort();for(let l=0;l<a.length&&l<u.length;++l){const h=ae(a[l],u[l]);if(h!==0)return h;const d=Fn(o[a[l]],c[u[l]]);if(d!==0)return d}return ae(a.length,u.length)}(n.mapValue,e.mapValue);default:throw Y()}}function vf(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ae(n,e);const t=Mn(n),r=Mn(e),i=ae(t.seconds,r.seconds);return i!==0?i:ae(t.nanos,r.nanos)}function Zr(n){return bu(n)}function bu(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(r){const i=Mn(r);return`time(${i.seconds},${i.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?mr(n.bytesValue).toBase64():"referenceValue"in n?(t=n.referenceValue,G.fromName(t).toString()):"geoPointValue"in n?`geo(${(e=n.geoPointValue).latitude},${e.longitude})`:"arrayValue"in n?function(r){let i="[",s=!0;for(const o of r.values||[])s?s=!1:i+=",",i+=bu(o);return i+"]"}(n.arrayValue):"mapValue"in n?function(r){const i=Object.keys(r.fields||{}).sort();let s="{",o=!0;for(const a of i)o?o=!1:s+=",",s+=`${a}:${bu(r.fields[a])}`;return s+"}"}(n.mapValue):Y();var e,t}function yr(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Iu(n){return!!n&&"integerValue"in n}function cs(n){return!!n&&"arrayValue"in n}function wf(n){return!!n&&"nullValue"in n}function Ef(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function lo(n){return!!n&&"mapValue"in n}function Gi(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Ar(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Gi(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Gi(n.arrayValue.values[t]);return e}return Object.assign({},n)}function By(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}function oC(n){return"nullValue"in n?uo:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?yr(pr.empty(),G.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?{mapValue:{}}:Y()}function aC(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?yr(pr.empty(),G.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?{mapValue:{}}:"mapValue"in n?An:Y()}function Tf(n,e){const t=Fn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function bf(n,e){const t=Fn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(e,t){this.position=e,this.inclusive=t}}function If(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],o=n.position[i];if(s.field.isKeyField()?r=G.comparator(G.fromName(o.referenceValue),t.key):r=Fn(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Sf(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!hn(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vy{}class he extends Vy{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new cC(e,t,r):t==="array-contains"?new hC(e,r):t==="in"?new zy(e,r):t==="not-in"?new dC(e,r):t==="array-contains-any"?new fC(e,r):new he(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new uC(e,r):new lC(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Fn(t,this.value)):t!==null&&gr(this.value)===gr(t)&&this.matchesComparison(Fn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return Y()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}}class Ie extends Vy{constructor(e,t){super(),this.filters=e,this.op=t,this.ft=null}static create(e,t){return new Ie(e,t)}matches(e){return ei(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ft!==null||(this.ft=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ft}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){const e=this.dt(t=>t.isInequality());return e!==null?e.field:null}dt(e){for(const t of this.getFlattenedFilters())if(e(t))return t;return null}}function ei(n){return n.op==="and"}function Su(n){return n.op==="or"}function Ql(n){return qy(n)&&ei(n)}function qy(n){for(const e of n.filters)if(e instanceof Ie)return!1;return!0}function Cu(n){if(n instanceof he)return n.field.canonicalString()+n.op.toString()+Zr(n.value);if(Ql(n))return n.filters.map(e=>Cu(e)).join(",");{const e=n.filters.map(t=>Cu(t)).join(",");return`${n.op}(${e})`}}function jy(n,e){return n instanceof he?function(t,r){return r instanceof he&&t.op===r.op&&t.field.isEqual(r.field)&&hn(t.value,r.value)}(n,e):n instanceof Ie?function(t,r){return r instanceof Ie&&t.op===r.op&&t.filters.length===r.filters.length?t.filters.reduce((i,s,o)=>i&&jy(s,r.filters[o]),!0):!1}(n,e):void Y()}function $y(n,e){const t=n.filters.concat(e);return Ie.create(t,n.op)}function Gy(n){return n instanceof he?function(e){return`${e.field.canonicalString()} ${e.op} ${Zr(e.value)}`}(n):n instanceof Ie?function(e){return e.op.toString()+" {"+e.getFilters().map(Gy).join(" ,")+"}"}(n):"Filter"}class cC extends he{constructor(e,t,r){super(e,t,r),this.key=G.fromName(r.referenceValue)}matches(e){const t=G.comparator(e.key,this.key);return this.matchesComparison(t)}}class uC extends he{constructor(e,t){super(e,"in",t),this.keys=Ky("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class lC extends he{constructor(e,t){super(e,"not-in",t),this.keys=Ky("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Ky(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>G.fromName(r.referenceValue))}class hC extends he{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return cs(t)&&as(t.arrayValue,this.value)}}class zy extends he{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&as(this.value.arrayValue,t)}}class dC extends he{constructor(e,t){super(e,"not-in",t)}matches(e){if(as(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!as(this.value.arrayValue,t)}}class fC extends he{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!cs(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>as(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kr{constructor(e,t="asc"){this.field=e,this.dir=t}}function pC(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e,t){this.comparator=e,this.root=t||ct.EMPTY}insert(e,t){return new Xe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ct.BLACK,null,null))}remove(e){return new Xe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ct.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Zs(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Zs(this.root,e,this.comparator,!1)}getReverseIterator(){return new Zs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Zs(this.root,e,this.comparator,!0)}}class Zs{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ct{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??ct.RED,this.left=i??ct.EMPTY,this.right=s??ct.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new ct(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return ct.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return ct.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ct.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ct.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw Y();const e=this.left.check();if(e!==this.right.check())throw Y();return e+(this.isRed()?0:1)}}ct.EMPTY=null,ct.RED=!0,ct.BLACK=!1;ct.EMPTY=new class{constructor(){this.size=0}get key(){throw Y()}get value(){throw Y()}get color(){throw Y()}get left(){throw Y()}get right(){throw Y()}copy(n,e,t,r,i){return this}insert(n,e,t){return new ct(n,e)}remove(n,e){return this}isEmpty(){return!0}inorderTraversal(n){return!1}reverseTraversal(n){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(e){this.comparator=e,this.data=new Xe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Cf(this.data.getIterator())}getIteratorFrom(e){return new Cf(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Ce)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ce(this.comparator);return t.data=e,t}}class Cf{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function kr(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(e){this.fields=e,e.sort(Ye.comparator)}static empty(){return new kt([])}unionWith(e){let t=new Ce(Ye.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new kt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Jr(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e){this.value=e}static empty(){return new gt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!lo(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Gi(t)}setAll(e){let t=Ye.emptyPath(),r={},i=[];e.forEach((o,a)=>{if(!t.isImmediateParentOf(a)){const c=this.getFieldsMap(t);this.applyChanges(c,r,i),r={},i=[],t=a.popLast()}o?r[a.lastSegment()]=Gi(o):i.push(a.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());lo(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return hn(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];lo(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Ar(t,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new gt(Gi(this.value))}}function Hy(n){const e=[];return Ar(n.fields,(t,r)=>{const i=new Ye([t]);if(lo(r)){const s=Hy(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new kt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e,t,r,i,s,o,a){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=a}static newInvalidDocument(e){return new je(e,0,re.min(),re.min(),re.min(),gt.empty(),0)}static newFoundDocument(e,t,r,i){return new je(e,1,t,re.min(),r,i,0)}static newNoDocument(e,t){return new je(e,2,t,re.min(),re.min(),gt.empty(),0)}static newUnknownDocument(e,t){return new je(e,3,t,re.min(),re.min(),gt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(re.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=gt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=gt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=re.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof je&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new je(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mC{constructor(e,t=null,r=[],i=[],s=null,o=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=a,this._t=null}}function Nu(n,e=null,t=[],r=[],i=null,s=null,o=null){return new mC(n,e,t,r,i,s,o)}function _r(n){const e=oe(n);if(e._t===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Cu(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Oa(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Zr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Zr(r)).join(",")),e._t=t}return e._t}function Rs(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!pC(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!jy(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Sf(n.startAt,e.startAt)&&Sf(n.endAt,e.endAt)}function Wo(n){return G.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Qo(n,e){return n.filters.filter(t=>t instanceof he&&t.field.isEqual(e))}function Nf(n,e,t){let r=uo,i=!0;for(const s of Qo(n,e)){let o=uo,a=!0;switch(s.op){case"<":case"<=":o=oC(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,a=!1;break;case"!=":case"not-in":o=uo}Tf({value:r,inclusive:i},{value:o,inclusive:a})<0&&(r=o,i=a)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];Tf({value:r,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}function Af(n,e,t){let r=An,i=!0;for(const s of Qo(n,e)){let o=An,a=!0;switch(s.op){case">=":case">":o=aC(s.value),a=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,a=!1;break;case"!=":case"not-in":o=An}bf({value:r,inclusive:i},{value:o,inclusive:a})>0&&(r=o,i=a)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];bf({value:r,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(e,t=null,r=[],i=[],s=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=a,this.endAt=c,this.wt=null,this.gt=null,this.startAt,this.endAt}}function gC(n,e,t,r,i,s,o,a){return new $n(n,e,t,r,i,s,o,a)}function xs(n){return new $n(n)}function Df(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Yl(n){return n.explicitOrderBy.length>0?n.explicitOrderBy[0].field:null}function Pa(n){for(const e of n.filters){const t=e.getFirstInequalityField();if(t!==null)return t}return null}function Xl(n){return n.collectionGroup!==null}function sr(n){const e=oe(n);if(e.wt===null){e.wt=[];const t=Pa(e),r=Yl(e);if(t!==null&&r===null)t.isKeyField()||e.wt.push(new Kr(t)),e.wt.push(new Kr(Ye.keyField(),"asc"));else{let i=!1;for(const s of e.explicitOrderBy)e.wt.push(s),s.field.isKeyField()&&(i=!0);if(!i){const s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.wt.push(new Kr(Ye.keyField(),s))}}}return e.wt}function en(n){const e=oe(n);if(!e.gt)if(e.limitType==="F")e.gt=Nu(e.path,e.collectionGroup,sr(e),e.filters,e.limit,e.startAt,e.endAt);else{const t=[];for(const s of sr(e)){const o=s.dir==="desc"?"asc":"desc";t.push(new Kr(s.field,o))}const r=e.endAt?new Un(e.endAt.position,e.endAt.inclusive):null,i=e.startAt?new Un(e.startAt.position,e.startAt.inclusive):null;e.gt=Nu(e.path,e.collectionGroup,t,e.filters,e.limit,r,i)}return e.gt}function Au(n,e){e.getFirstInequalityField(),Pa(n);const t=n.filters.concat([e]);return new $n(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Yo(n,e,t){return new $n(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function La(n,e){return Rs(en(n),en(e))&&n.limitType===e.limitType}function Wy(n){return`${_r(en(n))}|lt:${n.limitType}`}function Du(n){return`Query(target=${function(e){let t=e.path.canonicalString();return e.collectionGroup!==null&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(r=>Gy(r)).join(", ")}]`),Oa(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(r=>function(i){return`${i.field.canonicalString()} (${i.dir})`}(r)).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Zr(r)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Zr(r)).join(",")),`Target(${t})`}(en(n))}; limitType=${n.limitType})`}function ks(n,e){return e.isFoundDocument()&&function(t,r){const i=r.key.path;return t.collectionGroup!==null?r.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(i):G.isDocumentKey(t.path)?t.path.isEqual(i):t.path.isImmediateParentOf(i)}(n,e)&&function(t,r){for(const i of sr(t))if(!i.field.isKeyField()&&r.data.field(i.field)===null)return!1;return!0}(n,e)&&function(t,r){for(const i of t.filters)if(!i.matches(r))return!1;return!0}(n,e)&&function(t,r){return!(t.startAt&&!function(i,s,o){const a=If(i,s,o);return i.inclusive?a<=0:a<0}(t.startAt,sr(t),r)||t.endAt&&!function(i,s,o){const a=If(i,s,o);return i.inclusive?a>=0:a>0}(t.endAt,sr(t),r))}(n,e)}function yC(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Qy(n){return(e,t)=>{let r=!1;for(const i of sr(n)){const s=_C(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function _C(n,e,t){const r=n.field.isKeyField()?G.comparator(e.key,t.key):function(i,s,o){const a=s.data.field(i),c=o.data.field(i);return a!==null&&c!==null?Fn(a,c):Y()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return Y()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yy(n,e){if(n.yt){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ss(e)?"-0":e}}function Xy(n){return{integerValue:""+n}}function vC(n,e){return rC(e)?Xy(e):Yy(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ma{constructor(){this._=void 0}}function wC(n,e,t){return n instanceof us?function(r,i){const s={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return i&&(s.fields.__previous_value__=i),{mapValue:s}}(t,e):n instanceof ti?Zy(n,e):n instanceof ni?e_(n,e):function(r,i){const s=Jy(r,i),o=Rf(s)+Rf(r.It);return Iu(s)&&Iu(r.It)?Xy(o):Yy(r.Tt,o)}(n,e)}function EC(n,e,t){return n instanceof ti?Zy(n,e):n instanceof ni?e_(n,e):t}function Jy(n,e){return n instanceof ls?Iu(t=e)||function(r){return!!r&&"doubleValue"in r}(t)?e:{integerValue:0}:null;var t}class us extends Ma{}class ti extends Ma{constructor(e){super(),this.elements=e}}function Zy(n,e){const t=t_(e);for(const r of n.elements)t.some(i=>hn(i,r))||t.push(r);return{arrayValue:{values:t}}}class ni extends Ma{constructor(e){super(),this.elements=e}}function e_(n,e){let t=t_(e);for(const r of n.elements)t=t.filter(i=>!hn(i,r));return{arrayValue:{values:t}}}class ls extends Ma{constructor(e,t){super(),this.Tt=e,this.It=t}}function Rf(n){return qe(n.integerValue||n.doubleValue)}function t_(n){return cs(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TC{constructor(e,t){this.field=e,this.transform=t}}function bC(n,e){return n.field.isEqual(e.field)&&function(t,r){return t instanceof ti&&r instanceof ti||t instanceof ni&&r instanceof ni?Jr(t.elements,r.elements,hn):t instanceof ls&&r instanceof ls?hn(t.It,r.It):t instanceof us&&r instanceof us}(n.transform,e.transform)}class IC{constructor(e,t){this.version=e,this.transformResults=t}}class _t{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new _t}static exists(e){return new _t(void 0,e)}static updateTime(e){return new _t(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ho(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Fa{}function n_(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ua(n.key,_t.none()):new fi(n.key,n.data,_t.none());{const t=n.data,r=gt.empty();let i=new Ce(Ye.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new En(n.key,r,new kt(i.toArray()),_t.none())}}function SC(n,e,t){n instanceof fi?function(r,i,s){const o=r.value.clone(),a=kf(r.fieldTransforms,i,s.transformResults);o.setAll(a),i.convertToFoundDocument(s.version,o).setHasCommittedMutations()}(n,e,t):n instanceof En?function(r,i,s){if(!ho(r.precondition,i))return void i.convertToUnknownDocument(s.version);const o=kf(r.fieldTransforms,i,s.transformResults),a=i.data;a.setAll(r_(r)),a.setAll(o),i.convertToFoundDocument(s.version,a).setHasCommittedMutations()}(n,e,t):function(r,i,s){i.convertToNoDocument(s.version).setHasCommittedMutations()}(0,e,t)}function Ki(n,e,t,r){return n instanceof fi?function(i,s,o,a){if(!ho(i.precondition,s))return o;const c=i.value.clone(),u=Of(i.fieldTransforms,a,s);return c.setAll(u),s.convertToFoundDocument(s.version,c).setHasLocalMutations(),null}(n,e,t,r):n instanceof En?function(i,s,o,a){if(!ho(i.precondition,s))return o;const c=Of(i.fieldTransforms,a,s),u=s.data;return u.setAll(r_(i)),u.setAll(c),s.convertToFoundDocument(s.version,u).setHasLocalMutations(),o===null?null:o.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(l=>l.field))}(n,e,t,r):function(i,s,o){return ho(i.precondition,s)?(s.convertToNoDocument(s.version).setHasLocalMutations(),null):o}(n,e,t)}function CC(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=Jy(r.transform,i||null);s!=null&&(t===null&&(t=gt.empty()),t.set(r.field,s))}return t||null}function xf(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(t,r){return t===void 0&&r===void 0||!(!t||!r)&&Jr(t,r,(i,s)=>bC(i,s))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class fi extends Fa{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class En extends Fa{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function r_(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function kf(n,e,t){const r=new Map;ne(n.length===t.length);for(let i=0;i<t.length;i++){const s=n[i],o=s.transform,a=e.data.field(s.field);r.set(s.field,EC(o,a,t[i]))}return r}function Of(n,e,t){const r=new Map;for(const i of n){const s=i.transform,o=t.data.field(i.field);r.set(i.field,wC(s,o,e))}return r}class Ua extends Fa{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class i_ extends Fa{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NC{constructor(e){this.count=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Qe,fe;function AC(n){switch(n){default:return Y();case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0}}function s_(n){if(n===void 0)return bt("GRPC error has no .code"),S.UNKNOWN;switch(n){case Qe.OK:return S.OK;case Qe.CANCELLED:return S.CANCELLED;case Qe.UNKNOWN:return S.UNKNOWN;case Qe.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case Qe.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case Qe.INTERNAL:return S.INTERNAL;case Qe.UNAVAILABLE:return S.UNAVAILABLE;case Qe.UNAUTHENTICATED:return S.UNAUTHENTICATED;case Qe.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case Qe.NOT_FOUND:return S.NOT_FOUND;case Qe.ALREADY_EXISTS:return S.ALREADY_EXISTS;case Qe.PERMISSION_DENIED:return S.PERMISSION_DENIED;case Qe.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case Qe.ABORTED:return S.ABORTED;case Qe.OUT_OF_RANGE:return S.OUT_OF_RANGE;case Qe.UNIMPLEMENTED:return S.UNIMPLEMENTED;case Qe.DATA_LOSS:return S.DATA_LOSS;default:return Y()}}(fe=Qe||(Qe={}))[fe.OK=0]="OK",fe[fe.CANCELLED=1]="CANCELLED",fe[fe.UNKNOWN=2]="UNKNOWN",fe[fe.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",fe[fe.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",fe[fe.NOT_FOUND=5]="NOT_FOUND",fe[fe.ALREADY_EXISTS=6]="ALREADY_EXISTS",fe[fe.PERMISSION_DENIED=7]="PERMISSION_DENIED",fe[fe.UNAUTHENTICATED=16]="UNAUTHENTICATED",fe[fe.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",fe[fe.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",fe[fe.ABORTED=10]="ABORTED",fe[fe.OUT_OF_RANGE=11]="OUT_OF_RANGE",fe[fe.UNIMPLEMENTED=12]="UNIMPLEMENTED",fe[fe.INTERNAL=13]="INTERNAL",fe[fe.UNAVAILABLE=14]="UNAVAILABLE",fe[fe.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Ar(this.inner,(t,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return Fy(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DC=new Xe(G.comparator);function Ot(){return DC}const o_=new Xe(G.comparator);function Oi(...n){let e=o_;for(const t of n)e=e.insert(t.key,t);return e}function a_(n){let e=o_;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function an(){return zi()}function c_(){return zi()}function zi(){return new Gn(n=>n.toString(),(n,e)=>n.isEqual(e))}const RC=new Xe(G.comparator),xC=new Ce(G.comparator);function ce(...n){let e=xC;for(const t of n)e=e.add(t);return e}const kC=new Ce(ae);function u_(){return kC}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ba{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,Os.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Ba(re.min(),i,u_(),Ot(),ce())}}class Os{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Os(r,t,ce(),ce(),ce())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(e,t,r,i){this.Et=e,this.removedTargetIds=t,this.key=r,this.At=i}}class l_{constructor(e,t){this.targetId=e,this.Rt=t}}class h_{constructor(e,t,r=ht.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class Pf{constructor(){this.bt=0,this.vt=Mf(),this.Pt=ht.EMPTY_BYTE_STRING,this.Vt=!1,this.St=!0}get current(){return this.Vt}get resumeToken(){return this.Pt}get Dt(){return this.bt!==0}get Ct(){return this.St}xt(e){e.approximateByteSize()>0&&(this.St=!0,this.Pt=e)}Nt(){let e=ce(),t=ce(),r=ce();return this.vt.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:Y()}}),new Os(this.Pt,this.Vt,e,t,r)}kt(){this.St=!1,this.vt=Mf()}Ot(e,t){this.St=!0,this.vt=this.vt.insert(e,t)}Mt(e){this.St=!0,this.vt=this.vt.remove(e)}Ft(){this.bt+=1}$t(){this.bt-=1}Bt(){this.St=!0,this.Vt=!0}}class OC{constructor(e){this.Lt=e,this.qt=new Map,this.Ut=Ot(),this.Kt=Lf(),this.Gt=new Ce(ae)}Qt(e){for(const t of e.Et)e.At&&e.At.isFoundDocument()?this.jt(t,e.At):this.zt(t,e.key,e.At);for(const t of e.removedTargetIds)this.zt(t,e.key,e.At)}Wt(e){this.forEachTarget(e,t=>{const r=this.Ht(t);switch(e.state){case 0:this.Jt(t)&&r.xt(e.resumeToken);break;case 1:r.$t(),r.Dt||r.kt(),r.xt(e.resumeToken);break;case 2:r.$t(),r.Dt||this.removeTarget(t);break;case 3:this.Jt(t)&&(r.Bt(),r.xt(e.resumeToken));break;case 4:this.Jt(t)&&(this.Yt(t),r.xt(e.resumeToken));break;default:Y()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.qt.forEach((r,i)=>{this.Jt(i)&&t(i)})}Zt(e){const t=e.targetId,r=e.Rt.count,i=this.Xt(t);if(i){const s=i.target;if(Wo(s))if(r===0){const o=new G(s.path);this.zt(t,o,je.newNoDocument(o,re.min()))}else ne(r===1);else this.te(t)!==r&&(this.Yt(t),this.Gt=this.Gt.add(t))}}ee(e){const t=new Map;this.qt.forEach((s,o)=>{const a=this.Xt(o);if(a){if(s.current&&Wo(a.target)){const c=new G(a.target.path);this.Ut.get(c)!==null||this.ne(o,c)||this.zt(o,c,je.newNoDocument(c,e))}s.Ct&&(t.set(o,s.Nt()),s.kt())}});let r=ce();this.Kt.forEach((s,o)=>{let a=!0;o.forEachWhile(c=>{const u=this.Xt(c);return!u||u.purpose===2||(a=!1,!1)}),a&&(r=r.add(s))}),this.Ut.forEach((s,o)=>o.setReadTime(e));const i=new Ba(e,t,this.Gt,this.Ut,r);return this.Ut=Ot(),this.Kt=Lf(),this.Gt=new Ce(ae),i}jt(e,t){if(!this.Jt(e))return;const r=this.ne(e,t.key)?2:0;this.Ht(e).Ot(t.key,r),this.Ut=this.Ut.insert(t.key,t),this.Kt=this.Kt.insert(t.key,this.se(t.key).add(e))}zt(e,t,r){if(!this.Jt(e))return;const i=this.Ht(e);this.ne(e,t)?i.Ot(t,1):i.Mt(t),this.Kt=this.Kt.insert(t,this.se(t).delete(e)),r&&(this.Ut=this.Ut.insert(t,r))}removeTarget(e){this.qt.delete(e)}te(e){const t=this.Ht(e).Nt();return this.Lt.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ft(e){this.Ht(e).Ft()}Ht(e){let t=this.qt.get(e);return t||(t=new Pf,this.qt.set(e,t)),t}se(e){let t=this.Kt.get(e);return t||(t=new Ce(ae),this.Kt=this.Kt.insert(e,t)),t}Jt(e){const t=this.Xt(e)!==null;return t||F("WatchChangeAggregator","Detected inactive target",e),t}Xt(e){const t=this.qt.get(e);return t&&t.Dt?null:this.Lt.ie(e)}Yt(e){this.qt.set(e,new Pf),this.Lt.getRemoteKeysForTarget(e).forEach(t=>{this.zt(e,t,null)})}ne(e,t){return this.Lt.getRemoteKeysForTarget(e).has(t)}}function Lf(){return new Xe(G.comparator)}function Mf(){return new Xe(G.comparator)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PC=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),LC=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),MC=(()=>({and:"AND",or:"OR"}))();class FC{constructor(e,t){this.databaseId=e,this.yt=t}}function ri(n,e){return n.yt?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function d_(n,e){return n.yt?e.toBase64():e.toUint8Array()}function UC(n,e){return ri(n,e.toTimestamp())}function St(n){return ne(!!n),re.fromTimestamp(function(e){const t=Mn(e);return new Ue(t.seconds,t.nanos)}(n))}function Jl(n,e){return function(t){return new ve(["projects",t.projectId,"databases",t.database])}(n).child("documents").child(e).canonicalString()}function f_(n){const e=ve.fromString(n);return ne(E_(e)),e}function Xo(n,e){return Jl(n.databaseId,e.path)}function or(n,e){const t=f_(e);if(t.get(1)!==n.databaseId.projectId)throw new U(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new U(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new G(m_(t))}function Ru(n,e){return Jl(n.databaseId,e)}function p_(n){const e=f_(n);return e.length===4?ve.emptyPath():m_(e)}function xu(n){return new ve(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function m_(n){return ne(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Ff(n,e,t){return{name:Xo(n,e),fields:t.value.mapValue.fields}}function BC(n,e,t){const r=or(n,e.name),i=St(e.updateTime),s=e.createTime?St(e.createTime):re.min(),o=new gt({mapValue:{fields:e.fields}}),a=je.newFoundDocument(r,i,s,o);return t&&a.setHasCommittedMutations(),t?a.setHasCommittedMutations():a}function VC(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:Y()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(c,u){return c.yt?(ne(u===void 0||typeof u=="string"),ht.fromBase64String(u||"")):(ne(u===void 0||u instanceof Uint8Array),ht.fromUint8Array(u||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(c){const u=c.code===void 0?S.UNKNOWN:s_(c.code);return new U(u,c.message||"")}(o);t=new h_(r,i,s,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=or(n,r.document.name),s=St(r.document.updateTime),o=r.document.createTime?St(r.document.createTime):re.min(),a=new gt({mapValue:{fields:r.document.fields}}),c=je.newFoundDocument(i,s,o,a),u=r.targetIds||[],l=r.removedTargetIds||[];t=new fo(u,l,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=or(n,r.document),s=r.readTime?St(r.readTime):re.min(),o=je.newNoDocument(i,s),a=r.removedTargetIds||[];t=new fo([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=or(n,r.document),s=r.removedTargetIds||[];t=new fo([],s,i,null)}else{if(!("filter"in e))return Y();{e.filter;const r=e.filter;r.targetId;const i=r.count||0,s=new NC(i),o=r.targetId;t=new l_(o,s)}}return t}function Jo(n,e){let t;if(e instanceof fi)t={update:Ff(n,e.key,e.value)};else if(e instanceof Ua)t={delete:Xo(n,e.key)};else if(e instanceof En)t={update:Ff(n,e.key,e.data),updateMask:zC(e.fieldMask)};else{if(!(e instanceof i_))return Y();t={verify:Xo(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,s){const o=s.transform;if(o instanceof us)return{fieldPath:s.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(o instanceof ti)return{fieldPath:s.field.canonicalString(),appendMissingElements:{values:o.elements}};if(o instanceof ni)return{fieldPath:s.field.canonicalString(),removeAllFromArray:{values:o.elements}};if(o instanceof ls)return{fieldPath:s.field.canonicalString(),increment:o.It};throw Y()}(0,r))),e.precondition.isNone||(t.currentDocument=function(r,i){return i.updateTime!==void 0?{updateTime:UC(r,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:Y()}(n,e.precondition)),t}function ku(n,e){const t=e.currentDocument?function(i){return i.updateTime!==void 0?_t.updateTime(St(i.updateTime)):i.exists!==void 0?_t.exists(i.exists):_t.none()}(e.currentDocument):_t.none(),r=e.updateTransforms?e.updateTransforms.map(i=>function(s,o){let a=null;if("setToServerValue"in o)ne(o.setToServerValue==="REQUEST_TIME"),a=new us;else if("appendMissingElements"in o){const u=o.appendMissingElements.values||[];a=new ti(u)}else if("removeAllFromArray"in o){const u=o.removeAllFromArray.values||[];a=new ni(u)}else"increment"in o?a=new ls(s,o.increment):Y();const c=Ye.fromServerFormat(o.fieldPath);return new TC(c,a)}(n,i)):[];if(e.update){e.update.name;const i=or(n,e.update.name),s=new gt({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(a){const c=a.fieldPaths||[];return new kt(c.map(u=>Ye.fromServerFormat(u)))}(e.updateMask);return new En(i,s,o,t,r)}return new fi(i,s,t,r)}if(e.delete){const i=or(n,e.delete);return new Ua(i,t)}if(e.verify){const i=or(n,e.verify);return new i_(i,t)}return Y()}function qC(n,e){return n&&n.length>0?(ne(e!==void 0),n.map(t=>function(r,i){let s=r.updateTime?St(r.updateTime):St(i);return s.isEqual(re.min())&&(s=St(i)),new IC(s,r.transformResults||[])}(t,e))):[]}function g_(n,e){return{documents:[Ru(n,e.path)]}}function y_(n,e){const t={structuredQuery:{}},r=e.path;e.collectionGroup!==null?(t.parent=Ru(n,r),t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(t.parent=Ru(n,r.popLast()),t.structuredQuery.from=[{collectionId:r.lastSegment()}]);const i=function(c){if(c.length!==0)return w_(Ie.create(c,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const s=function(c){if(c.length!==0)return c.map(u=>function(l){return{field:Lr(l.field),direction:$C(l.dir)}}(u))}(e.orderBy);s&&(t.structuredQuery.orderBy=s);const o=function(c,u){return c.yt||Oa(u)?u:{value:u}}(n,e.limit);var a;return o!==null&&(t.structuredQuery.limit=o),e.startAt&&(t.structuredQuery.startAt={before:(a=e.startAt).inclusive,values:a.position}),e.endAt&&(t.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),t}function __(n){let e=p_(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){ne(r===1);const l=t.from[0];l.allDescendants?i=l.collectionId:e=e.child(l.collectionId)}let s=[];t.where&&(s=function(l){const h=v_(l);return h instanceof Ie&&Ql(h)?h.getFilters():[h]}(t.where));let o=[];t.orderBy&&(o=t.orderBy.map(l=>function(h){return new Kr(Mr(h.field),function(d){switch(d){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(h.direction))}(l)));let a=null;t.limit&&(a=function(l){let h;return h=typeof l=="object"?l.value:l,Oa(h)?null:h}(t.limit));let c=null;t.startAt&&(c=function(l){const h=!!l.before,d=l.values||[];return new Un(d,h)}(t.startAt));let u=null;return t.endAt&&(u=function(l){const h=!l.before,d=l.values||[];return new Un(d,h)}(t.endAt)),gC(e,i,o,s,a,"F",c,u)}function jC(n,e){const t=function(r,i){switch(i){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return Y()}}(0,e.purpose);return t==null?null:{"goog-listen-tags":t}}function v_(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=Mr(e.unaryFilter.field);return he.create(t,"==",{doubleValue:NaN});case"IS_NULL":const r=Mr(e.unaryFilter.field);return he.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Mr(e.unaryFilter.field);return he.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=Mr(e.unaryFilter.field);return he.create(s,"!=",{nullValue:"NULL_VALUE"});default:return Y()}}(n):n.fieldFilter!==void 0?function(e){return he.create(Mr(e.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return Y()}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return Ie.create(e.compositeFilter.filters.map(t=>v_(t)),function(t){switch(t){case"AND":return"and";case"OR":return"or";default:return Y()}}(e.compositeFilter.op))}(n):Y()}function $C(n){return PC[n]}function GC(n){return LC[n]}function KC(n){return MC[n]}function Lr(n){return{fieldPath:n.canonicalString()}}function Mr(n){return Ye.fromServerFormat(n.fieldPath)}function w_(n){return n instanceof he?function(e){if(e.op==="=="){if(Ef(e.value))return{unaryFilter:{field:Lr(e.field),op:"IS_NAN"}};if(wf(e.value))return{unaryFilter:{field:Lr(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Ef(e.value))return{unaryFilter:{field:Lr(e.field),op:"IS_NOT_NAN"}};if(wf(e.value))return{unaryFilter:{field:Lr(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Lr(e.field),op:GC(e.op),value:e.value}}}(n):n instanceof Ie?function(e){const t=e.getFilters().map(r=>w_(r));return t.length===1?t[0]:{compositeFilter:{op:KC(e.op),filters:t}}}(n):Y()}function zC(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function E_(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ct(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Uf(e)),e=HC(n.get(t),e);return Uf(e)}function HC(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case"":t+="";break;default:t+=s}}return t}function Uf(n){return n+""}function cn(n){const e=n.length;if(ne(e>=2),e===2)return ne(n.charAt(0)===""&&n.charAt(1)===""),ve.emptyPath();const t=e-2,r=[];let i="";for(let s=0;s<e;){const o=n.indexOf("",s);switch((o<0||o>t)&&Y(),n.charAt(o+1)){case"":const a=n.substring(s,o);let c;i.length===0?c=a:(i+=a,c=i,i=""),r.push(c);break;case"":i+=n.substring(s,o),i+="\0";break;case"":i+=n.substring(s,o+1);break;default:Y()}s=o+2}return new ve(r)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bf=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function po(n,e){return[n,Ct(e)]}function T_(n,e,t){return[n,Ct(e),t]}const WC={},QC=["prefixPath","collectionGroup","readTime","documentId"],YC=["prefixPath","collectionGroup","documentId"],XC=["collectionGroup","readTime","prefixPath","documentId"],JC=["canonicalId","targetId"],ZC=["targetId","path"],eN=["path","targetId"],tN=["collectionId","parent"],nN=["indexId","uid"],rN=["uid","sequenceNumber"],iN=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],sN=["indexId","uid","orderedDocumentKey"],oN=["userId","collectionPath","documentId"],aN=["userId","collectionPath","largestBatchId"],cN=["userId","collectionGroup","largestBatchId"],b_=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],uN=[...b_,"documentOverlays"],I_=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],S_=I_,lN=[...S_,"indexConfiguration","indexState","indexEntries"];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ou extends My{constructor(e,t){super(),this.re=e,this.currentSequenceNumber=t}}function it(n,e){const t=oe(n);return gn.M(t.re,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zl{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&SC(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Ki(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Ki(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=c_();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let a=this.applyToLocalView(o,s.mutatedFields);a=t.has(i.key)?null:a;const c=n_(o,a);c!==null&&r.set(i.key,c),o.isValidDocument()||o.convertToNoDocument(re.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),ce())}isEqual(e){return this.batchId===e.batchId&&Jr(this.mutations,e.mutations,(t,r)=>xf(t,r))&&Jr(this.baseMutations,e.baseMutations,(t,r)=>xf(t,r))}}class eh{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){ne(e.mutations.length===r.length);let i=RC;const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new eh(e,t,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class th{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(e,t,r,i,s=re.min(),o=re.min(),a=ht.EMPTY_BYTE_STRING){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a}withSequenceNumber(e){return new kn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(e,t){return new kn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e)}withLastLimboFreeSnapshotVersion(e){return new kn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C_{constructor(e){this.oe=e}}function hN(n,e){let t;if(e.document)t=BC(n.oe,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=G.fromSegments(e.noDocument.path),i=wr(e.noDocument.readTime);t=je.newNoDocument(r,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return Y();{const r=G.fromSegments(e.unknownDocument.path),i=wr(e.unknownDocument.version);t=je.newUnknownDocument(r,i)}}return e.readTime&&t.setReadTime(function(r){const i=new Ue(r[0],r[1]);return re.fromTimestamp(i)}(e.readTime)),t}function Vf(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Zo(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(i,s){return{name:Xo(i,s.key),fields:s.data.value.mapValue.fields,updateTime:ri(i,s.version.toTimestamp()),createTime:ri(i,s.createTime.toTimestamp())}}(n.oe,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:vr(e.version)};else{if(!e.isUnknownDocument())return Y();r.unknownDocument={path:t.path.toArray(),version:vr(e.version)}}return r}function Zo(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function vr(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function wr(n){const e=new Ue(n.seconds,n.nanoseconds);return re.fromTimestamp(e)}function Yn(n,e){const t=(e.baseMutations||[]).map(s=>ku(n.oe,s));for(let s=0;s<e.mutations.length-1;++s){const o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const a=e.mutations[s+1];o.updateTransforms=a.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const r=e.mutations.map(s=>ku(n.oe,s)),i=Ue.fromMillis(e.localWriteTimeMs);return new Zl(e.batchId,i,t,r)}function Pi(n){const e=wr(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?wr(n.lastLimboFreeSnapshotVersion):re.min();let r;var i;return n.query.documents!==void 0?(ne((i=n.query).documents.length===1),r=en(xs(p_(i.documents[0])))):r=function(s){return en(__(s))}(n.query),new kn(r,n.targetId,0,n.lastListenSequenceNumber,e,t,ht.fromBase64String(n.resumeToken))}function N_(n,e){const t=vr(e.snapshotVersion),r=vr(e.lastLimboFreeSnapshotVersion);let i;i=Wo(e.target)?g_(n.oe,e.target):y_(n.oe,e.target);const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:_r(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function A_(n){const e=__({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Yo(e,e.limit,"L"):e}function Lc(n,e){return new th(e.largestBatchId,ku(n.oe,e.overlayMutation))}function qf(n,e){const t=e.path.lastSegment();return[n,Ct(e.path.popLast()),t]}function jf(n,e,t,r){return{indexId:n,uid:e.uid||"",sequenceNumber:t,readTime:vr(r.readTime),documentKey:Ct(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dN{getBundleMetadata(e,t){return $f(e).get(t).next(r=>{if(r)return{id:(i=r).bundleId,createTime:wr(i.createTime),version:i.version};var i})}saveBundleMetadata(e,t){return $f(e).put({bundleId:(r=t).id,createTime:vr(St(r.createTime)),version:r.version});var r}getNamedQuery(e,t){return Gf(e).get(t).next(r=>{if(r)return{name:(i=r).name,query:A_(i.bundledQuery),readTime:wr(i.readTime)};var i})}saveNamedQuery(e,t){return Gf(e).put(function(r){return{name:r.name,readTime:vr(St(r.readTime)),bundledQuery:r.bundledQuery}}(t))}}function $f(n){return it(n,"bundles")}function Gf(n){return it(n,"namedQueries")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Va{constructor(e,t){this.Tt=e,this.userId=t}static ue(e,t){const r=t.uid||"";return new Va(e,r)}getOverlay(e,t){return bi(e).get(qf(this.userId,t)).next(r=>r?Lc(this.Tt,r):null)}getOverlays(e,t){const r=an();return T.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){const i=[];return r.forEach((s,o)=>{const a=new th(t,o);i.push(this.ce(e,a))}),T.waitFor(i)}removeOverlaysForBatchId(e,t,r){const i=new Set;t.forEach(o=>i.add(Ct(o.getCollectionPath())));const s=[];return i.forEach(o=>{const a=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);s.push(bi(e).Y("collectionPathOverlayIndex",a))}),T.waitFor(s)}getOverlaysForCollection(e,t,r){const i=an(),s=Ct(t),o=IDBKeyRange.bound([this.userId,s,r],[this.userId,s,Number.POSITIVE_INFINITY],!0);return bi(e).W("collectionPathOverlayIndex",o).next(a=>{for(const c of a){const u=Lc(this.Tt,c);i.set(u.getKey(),u)}return i})}getOverlaysForCollectionGroup(e,t,r,i){const s=an();let o;const a=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return bi(e).X({index:"collectionGroupOverlayIndex",range:a},(c,u,l)=>{const h=Lc(this.Tt,u);s.size()<i||h.largestBatchId===o?(s.set(h.getKey(),h),o=h.largestBatchId):l.done()}).next(()=>s)}ce(e,t){return bi(e).put(function(r,i,s){const[o,a,c]=qf(i,s.mutation.key);return{userId:i,collectionPath:a,documentId:c,collectionGroup:s.mutation.key.getCollectionGroup(),largestBatchId:s.largestBatchId,overlayMutation:Jo(r.oe,s.mutation)}}(this.Tt,this.userId,t))}}function bi(n){return it(n,"documentOverlays")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(){}ae(e,t){this.he(e,t),t.le()}he(e,t){if("nullValue"in e)this.fe(t,5);else if("booleanValue"in e)this.fe(t,10),t.de(e.booleanValue?1:0);else if("integerValue"in e)this.fe(t,15),t.de(qe(e.integerValue));else if("doubleValue"in e){const r=qe(e.doubleValue);isNaN(r)?this.fe(t,13):(this.fe(t,15),ss(r)?t.de(0):t.de(r))}else if("timestampValue"in e){const r=e.timestampValue;this.fe(t,20),typeof r=="string"?t._e(r):(t._e(`${r.seconds||""}`),t.de(r.nanos||0))}else if("stringValue"in e)this.we(e.stringValue,t),this.me(t);else if("bytesValue"in e)this.fe(t,30),t.ge(mr(e.bytesValue)),this.me(t);else if("referenceValue"in e)this.ye(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.fe(t,45),t.de(r.latitude||0),t.de(r.longitude||0)}else"mapValue"in e?By(e)?this.fe(t,Number.MAX_SAFE_INTEGER):(this.pe(e.mapValue,t),this.me(t)):"arrayValue"in e?(this.Ie(e.arrayValue,t),this.me(t)):Y()}we(e,t){this.fe(t,25),this.Te(e,t)}Te(e,t){t._e(e)}pe(e,t){const r=e.fields||{};this.fe(t,55);for(const i of Object.keys(r))this.we(i,t),this.he(r[i],t)}Ie(e,t){const r=e.values||[];this.fe(t,50);for(const i of r)this.he(i,t)}ye(e,t){this.fe(t,37),G.fromName(e).path.forEach(r=>{this.fe(t,60),this.Te(r,t)})}fe(e,t){e.de(t)}me(e){e.de(2)}}Xn.Ee=new Xn;function fN(n){if(n===0)return 8;let e=0;return!(n>>4)&&(e+=4,n<<=4),!(n>>6)&&(e+=2,n<<=2),!(n>>7)&&(e+=1),e}function Kf(n){const e=64-function(t){let r=0;for(let i=0;i<8;++i){const s=fN(255&t[i]);if(r+=s,s!==8)break}return r}(n);return Math.ceil(e/8)}class pN{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ae(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Re(r.value),r=t.next();this.be()}ve(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Pe(r.value),r=t.next();this.Ve()}Se(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Re(r);else if(r<2048)this.Re(960|r>>>6),this.Re(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Re(480|r>>>12),this.Re(128|63&r>>>6),this.Re(128|63&r);else{const i=t.codePointAt(0);this.Re(240|i>>>18),this.Re(128|63&i>>>12),this.Re(128|63&i>>>6),this.Re(128|63&i)}}this.be()}De(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Pe(r);else if(r<2048)this.Pe(960|r>>>6),this.Pe(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Pe(480|r>>>12),this.Pe(128|63&r>>>6),this.Pe(128|63&r);else{const i=t.codePointAt(0);this.Pe(240|i>>>18),this.Pe(128|63&i>>>12),this.Pe(128|63&i>>>6),this.Pe(128|63&i)}}this.Ve()}Ce(e){const t=this.xe(e),r=Kf(t);this.Ne(1+r),this.buffer[this.position++]=255&r;for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=255&t[i]}ke(e){const t=this.xe(e),r=Kf(t);this.Ne(1+r),this.buffer[this.position++]=~(255&r);for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}Oe(){this.Me(255),this.Me(255)}Fe(){this.$e(255),this.$e(255)}reset(){this.position=0}seed(e){this.Ne(e.length),this.buffer.set(e,this.position),this.position+=e.length}Be(){return this.buffer.slice(0,this.position)}xe(e){const t=function(i){const s=new DataView(new ArrayBuffer(8));return s.setFloat64(0,i,!1),new Uint8Array(s.buffer)}(e),r=(128&t[0])!=0;t[0]^=r?255:128;for(let i=1;i<t.length;++i)t[i]^=r?255:0;return t}Re(e){const t=255&e;t===0?(this.Me(0),this.Me(255)):t===255?(this.Me(255),this.Me(0)):this.Me(t)}Pe(e){const t=255&e;t===0?(this.$e(0),this.$e(255)):t===255?(this.$e(255),this.$e(0)):this.$e(e)}be(){this.Me(0),this.Me(1)}Ve(){this.$e(0),this.$e(1)}Me(e){this.Ne(1),this.buffer[this.position++]=e}$e(e){this.Ne(1),this.buffer[this.position++]=~e}Ne(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const i=new Uint8Array(r);i.set(this.buffer),this.buffer=i}}class mN{constructor(e){this.Le=e}ge(e){this.Le.Ae(e)}_e(e){this.Le.Se(e)}de(e){this.Le.Ce(e)}le(){this.Le.Oe()}}class gN{constructor(e){this.Le=e}ge(e){this.Le.ve(e)}_e(e){this.Le.De(e)}de(e){this.Le.ke(e)}le(){this.Le.Fe()}}class Ii{constructor(){this.Le=new pN,this.qe=new mN(this.Le),this.Ue=new gN(this.Le)}seed(e){this.Le.seed(e)}Ke(e){return e===0?this.qe:this.Ue}Be(){return this.Le.Be()}reset(){this.Le.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(e,t,r,i){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=i}Ge(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new Jn(this.indexId,this.documentKey,this.arrayValue,r)}}function In(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=zf(n.arrayValue,e.arrayValue),t!==0?t:(t=zf(n.directionalValue,e.directionalValue),t!==0?t:G.comparator(n.documentKey,e.documentKey)))}function zf(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yN{constructor(e){this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.Qe=e.orderBy,this.je=[];for(const t of e.filters){const r=t;r.isInequality()?this.ze=r:this.je.push(r)}}We(e){ne(e.collectionGroup===this.collectionId);const t=Tu(e);if(t!==void 0&&!this.He(t))return!1;const r=Wn(e);let i=0,s=0;for(;i<r.length&&this.He(r[i]);++i);if(i===r.length)return!0;if(this.ze!==void 0){const o=r[i];if(!this.Je(this.ze,o)||!this.Ye(this.Qe[s++],o))return!1;++i}for(;i<r.length;++i){const o=r[i];if(s>=this.Qe.length||!this.Ye(this.Qe[s++],o))return!1}return!0}He(e){for(const t of this.je)if(this.Je(t,e))return!0;return!1}Je(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}Ye(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D_(n){var e,t;if(ne(n instanceof he||n instanceof Ie),n instanceof he){if(n instanceof zy){const i=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(s=>he.create(n.field,"==",s)))||[];return Ie.create(i,"or")}return n}const r=n.filters.map(i=>D_(i));return Ie.create(r,n.op)}function _N(n){if(n.getFilters().length===0)return[];const e=Mu(D_(n));return ne(R_(e)),Pu(e)||Lu(e)?[e]:e.getFilters()}function Pu(n){return n instanceof he}function Lu(n){return n instanceof Ie&&Ql(n)}function R_(n){return Pu(n)||Lu(n)||function(e){if(e instanceof Ie&&Su(e)){for(const t of e.getFilters())if(!Pu(t)&&!Lu(t))return!1;return!0}return!1}(n)}function Mu(n){if(ne(n instanceof he||n instanceof Ie),n instanceof he)return n;if(n.filters.length===1)return Mu(n.filters[0]);const e=n.filters.map(r=>Mu(r));let t=Ie.create(e,n.op);return t=ea(t),R_(t)?t:(ne(t instanceof Ie),ne(ei(t)),ne(t.filters.length>1),t.filters.reduce((r,i)=>nh(r,i)))}function nh(n,e){let t;return ne(n instanceof he||n instanceof Ie),ne(e instanceof he||e instanceof Ie),t=n instanceof he?e instanceof he?function(r,i){return Ie.create([r,i],"and")}(n,e):Hf(n,e):e instanceof he?Hf(e,n):function(r,i){if(ne(r.filters.length>0&&i.filters.length>0),ei(r)&&ei(i))return $y(r,i.getFilters());const s=Su(r)?r:i,o=Su(r)?i:r,a=s.filters.map(c=>nh(c,o));return Ie.create(a,"or")}(n,e),ea(t)}function Hf(n,e){if(ei(e))return $y(e,n.getFilters());{const t=e.filters.map(r=>nh(n,r));return Ie.create(t,"or")}}function ea(n){if(ne(n instanceof he||n instanceof Ie),n instanceof he)return n;const e=n.getFilters();if(e.length===1)return ea(e[0]);if(qy(n))return n;const t=e.map(i=>ea(i)),r=[];return t.forEach(i=>{i instanceof he?r.push(i):i instanceof Ie&&(i.op===n.op?r.push(...i.filters):r.push(i))}),r.length===1?r[0]:Ie.create(r,n.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vN{constructor(){this.Ze=new rh}addToCollectionParentIndex(e,t){return this.Ze.add(t),T.resolve()}getCollectionParents(e,t){return T.resolve(this.Ze.getEntries(t))}addFieldIndex(e,t){return T.resolve()}deleteFieldIndex(e,t){return T.resolve()}getDocumentsMatchingTarget(e,t){return T.resolve(null)}getIndexType(e,t){return T.resolve(0)}getFieldIndexes(e,t){return T.resolve([])}getNextCollectionGroupToUpdate(e){return T.resolve(null)}getMinOffset(e,t){return T.resolve(Vt.min())}getMinOffsetFromCollectionGroup(e,t){return T.resolve(Vt.min())}updateCollectionGroup(e,t,r){return T.resolve()}updateIndexEntries(e,t){return T.resolve()}}class rh{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new Ce(ve.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Ce(ve.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eo=new Uint8Array(0);class wN{constructor(e,t){this.user=e,this.databaseId=t,this.Xe=new rh,this.tn=new Gn(r=>_r(r),(r,i)=>Rs(r,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Xe.has(t)){const r=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.Xe.add(t)});const s={collectionId:r,parent:Ct(i)};return Wf(e).put(s)}return T.resolve()}getCollectionParents(e,t){const r=[],i=IDBKeyRange.bound([t,""],[ky(t),""],!1,!0);return Wf(e).W(i).next(s=>{for(const o of s){if(o.collectionId!==t)break;r.push(cn(o.parent))}return r})}addFieldIndex(e,t){const r=to(e),i=function(o){return{indexId:o.indexId,collectionGroup:o.collectionGroup,fields:o.fields.map(a=>[a.fieldPath.canonicalString(),a.kind])}}(t);delete i.indexId;const s=r.add(i);if(t.indexState){const o=Ci(e);return s.next(a=>{o.put(jf(a,this.user,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){const r=to(e),i=Ci(e),s=Si(e);return r.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}getDocumentsMatchingTarget(e,t){const r=Si(e);let i=!0;const s=new Map;return T.forEach(this.en(t),o=>this.nn(e,o).next(a=>{i&&(i=!!a),s.set(o,a)})).next(()=>{if(i){let o=ce();const a=[];return T.forEach(s,(c,u)=>{var l;F("IndexedDbIndexManager",`Using index ${l=c,`id=${l.indexId}|cg=${l.collectionGroup}|f=${l.fields.map(W=>`${W.fieldPath}:${W.kind}`).join(",")}`} to execute ${_r(t)}`);const h=function(W,ee){const A=Tu(ee);if(A===void 0)return null;for(const z of Qo(W,A.fieldPath))switch(z.op){case"array-contains-any":return z.value.arrayValue.values||[];case"array-contains":return[z.value]}return null}(u,c),d=function(W,ee){const A=new Map;for(const z of Wn(ee))for(const H of Qo(W,z.fieldPath))switch(H.op){case"==":case"in":A.set(z.fieldPath.canonicalString(),H.value);break;case"not-in":case"!=":return A.set(z.fieldPath.canonicalString(),H.value),Array.from(A.values())}return null}(u,c),m=function(W,ee){const A=[];let z=!0;for(const H of Wn(ee)){const X=H.kind===0?Nf(W,H.fieldPath,W.startAt):Af(W,H.fieldPath,W.startAt);A.push(X.value),z&&(z=X.inclusive)}return new Un(A,z)}(u,c),g=function(W,ee){const A=[];let z=!0;for(const H of Wn(ee)){const X=H.kind===0?Af(W,H.fieldPath,W.endAt):Nf(W,H.fieldPath,W.endAt);A.push(X.value),z&&(z=X.inclusive)}return new Un(A,z)}(u,c),b=this.sn(c,u,m),C=this.sn(c,u,g),B=this.rn(c,u,d),$=this.on(c.indexId,h,b,m.inclusive,C,g.inclusive,B);return T.forEach($,W=>r.J(W,t.limit).next(ee=>{ee.forEach(A=>{const z=G.fromSegments(A.documentKey);o.has(z)||(o=o.add(z),a.push(z))})}))}).next(()=>a)}return T.resolve(null)})}en(e){let t=this.tn.get(e);return t||(e.filters.length===0?t=[e]:t=_N(Ie.create(e.filters,"and")).map(r=>Nu(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.tn.set(e,t),t)}on(e,t,r,i,s,o,a){const c=(t!=null?t.length:1)*Math.max(r.length,s.length),u=c/(t!=null?t.length:1),l=[];for(let h=0;h<c;++h){const d=t?this.un(t[h/u]):eo,m=this.cn(e,d,r[h%u],i),g=this.an(e,d,s[h%u],o),b=a.map(C=>this.cn(e,d,C,!0));l.push(...this.createRange(m,g,b))}return l}cn(e,t,r,i){const s=new Jn(e,G.empty(),t,r);return i?s:s.Ge()}an(e,t,r,i){const s=new Jn(e,G.empty(),t,r);return i?s.Ge():s}nn(e,t){const r=new yN(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(s=>{let o=null;for(const a of s)r.We(a)&&(!o||a.fields.length>o.fields.length)&&(o=a);return o})}getIndexType(e,t){let r=2;const i=this.en(t);return T.forEach(i,s=>this.nn(e,s).next(o=>{o?r!==0&&o.fields.length<function(a){let c=new Ce(Ye.comparator),u=!1;for(const l of a.filters)for(const h of l.getFlattenedFilters())h.field.isKeyField()||(h.op==="array-contains"||h.op==="array-contains-any"?u=!0:c=c.add(h.field));for(const l of a.orderBy)l.field.isKeyField()||(c=c.add(l.field));return c.size+(u?1:0)}(s)&&(r=1):r=0})).next(()=>function(s){return s.limit!==null}(t)&&i.length>1&&r===2?1:r)}hn(e,t){const r=new Ii;for(const i of Wn(e)){const s=t.data.field(i.fieldPath);if(s==null)return null;const o=r.Ke(i.kind);Xn.Ee.ae(s,o)}return r.Be()}un(e){const t=new Ii;return Xn.Ee.ae(e,t.Ke(0)),t.Be()}ln(e,t){const r=new Ii;return Xn.Ee.ae(yr(this.databaseId,t),r.Ke(function(i){const s=Wn(i);return s.length===0?0:s[s.length-1].kind}(e))),r.Be()}rn(e,t,r){if(r===null)return[];let i=[];i.push(new Ii);let s=0;for(const o of Wn(e)){const a=r[s++];for(const c of i)if(this.fn(t,o.fieldPath)&&cs(a))i=this.dn(i,o,a);else{const u=c.Ke(o.kind);Xn.Ee.ae(a,u)}}return this._n(i)}sn(e,t,r){return this.rn(e,t,r.position)}_n(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].Be();return t}dn(e,t,r){const i=[...e],s=[];for(const o of r.arrayValue.values||[])for(const a of i){const c=new Ii;c.seed(a.Be()),Xn.Ee.ae(o,c.Ke(t.kind)),s.push(c)}return s}fn(e,t){return!!e.filters.find(r=>r instanceof he&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){const r=to(e),i=Ci(e);return(t?r.W("collectionGroupIndex",IDBKeyRange.bound(t,t)):r.W()).next(s=>{const o=[];return T.forEach(s,a=>i.get([a.indexId,this.uid]).next(c=>{o.push(function(u,l){const h=l?new Ho(l.sequenceNumber,new Vt(wr(l.readTime),new G(cn(l.documentKey)),l.largestBatchId)):Ho.empty(),d=u.fields.map(([m,g])=>new YS(Ye.fromServerFormat(m),g));return new Oy(u.indexId,u.collectionGroup,d,h)}(a,c))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,i)=>{const s=r.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:ae(r.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){const i=to(e),s=Ci(e);return this.wn(e).next(o=>i.W("collectionGroupIndex",IDBKeyRange.bound(t,t)).next(a=>T.forEach(a,c=>s.put(jf(c.indexId,this.user,o,r)))))}updateIndexEntries(e,t){const r=new Map;return T.forEach(t,(i,s)=>{const o=r.get(i.collectionGroup);return(o?T.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(a=>(r.set(i.collectionGroup,a),T.forEach(a,c=>this.mn(e,i,c).next(u=>{const l=this.gn(s,c);return u.isEqual(l)?T.resolve():this.yn(e,s,c,u,l)}))))})}pn(e,t,r,i){return Si(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.ln(r,t.key),documentKey:t.key.path.toArray()})}In(e,t,r,i){return Si(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.ln(r,t.key),t.key.path.toArray()])}mn(e,t,r){const i=Si(e);let s=new Ce(In);return i.X({index:"documentKeyIndex",range:IDBKeyRange.only([r.indexId,this.uid,this.ln(r,t)])},(o,a)=>{s=s.add(new Jn(r.indexId,t,a.arrayValue,a.directionalValue))}).next(()=>s)}gn(e,t){let r=new Ce(In);const i=this.hn(t,e);if(i==null)return r;const s=Tu(t);if(s!=null){const o=e.data.field(s.fieldPath);if(cs(o))for(const a of o.arrayValue.values||[])r=r.add(new Jn(t.indexId,e.key,this.un(a),i))}else r=r.add(new Jn(t.indexId,e.key,eo,i));return r}yn(e,t,r,i,s){F("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);const o=[];return function(a,c,u,l,h){const d=a.getIterator(),m=c.getIterator();let g=kr(d),b=kr(m);for(;g||b;){let C=!1,B=!1;if(g&&b){const $=u(g,b);$<0?B=!0:$>0&&(C=!0)}else g!=null?B=!0:C=!0;C?(l(b),b=kr(m)):B?(h(g),g=kr(d)):(g=kr(d),b=kr(m))}}(i,s,In,a=>{o.push(this.pn(e,t,r,a))},a=>{o.push(this.In(e,t,r,a))}),T.waitFor(o)}wn(e){let t=1;return Ci(e).X({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,i,s)=>{s.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,a)=>In(o,a)).filter((o,a,c)=>!a||In(o,c[a-1])!==0);const i=[];i.push(e);for(const o of r){const a=In(o,e),c=In(o,t);if(a===0)i[0]=e.Ge();else if(a>0&&c<0)i.push(o),i.push(o.Ge());else if(c>0)break}i.push(t);const s=[];for(let o=0;o<i.length;o+=2){if(this.Tn(i[o],i[o+1]))return[];const a=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,eo,[]],c=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,eo,[]];s.push(IDBKeyRange.bound(a,c))}return s}Tn(e,t){return In(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Qf)}getMinOffset(e,t){return T.mapArray(this.en(t),r=>this.nn(e,r).next(i=>i||Y())).next(Qf)}}function Wf(n){return it(n,"collectionParents")}function Si(n){return it(n,"indexEntries")}function to(n){return it(n,"indexConfiguration")}function Ci(n){return it(n,"indexState")}function Qf(n){ne(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const i=n[r].indexState.offset;zl(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new Vt(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class At{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new At(e,At.DEFAULT_COLLECTION_PERCENTILE,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x_(n,e,t){const r=n.store("mutations"),i=n.store("documentMutations"),s=[],o=IDBKeyRange.only(t.batchId);let a=0;const c=r.X({range:o},(l,h,d)=>(a++,d.delete()));s.push(c.next(()=>{ne(a===1)}));const u=[];for(const l of t.mutations){const h=T_(e,l.key.path,t.batchId);s.push(i.delete(h)),u.push(l.key)}return T.waitFor(s).next(()=>u)}function ta(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw Y();e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */At.DEFAULT_COLLECTION_PERCENTILE=10,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,At.DEFAULT=new At(41943040,At.DEFAULT_COLLECTION_PERCENTILE,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),At.DISABLED=new At(-1,0,0);class qa{constructor(e,t,r,i){this.userId=e,this.Tt=t,this.indexManager=r,this.referenceDelegate=i,this.En={}}static ue(e,t,r,i){ne(e.uid!=="");const s=e.isAuthenticated()?e.uid:"";return new qa(s,t,r,i)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Sn(e).X({index:"userMutationsIndex",range:r},(i,s,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,i){const s=Fr(e),o=Sn(e);return o.add({}).next(a=>{ne(typeof a=="number");const c=new Zl(a,t,r,i),u=function(d,m,g){const b=g.baseMutations.map(B=>Jo(d.oe,B)),C=g.mutations.map(B=>Jo(d.oe,B));return{userId:m,batchId:g.batchId,localWriteTimeMs:g.localWriteTime.toMillis(),baseMutations:b,mutations:C}}(this.Tt,this.userId,c),l=[];let h=new Ce((d,m)=>ae(d.canonicalString(),m.canonicalString()));for(const d of i){const m=T_(this.userId,d.key.path,a);h=h.add(d.key.path.popLast()),l.push(o.put(u)),l.push(s.put(m,WC))}return h.forEach(d=>{l.push(this.indexManager.addToCollectionParentIndex(e,d))}),e.addOnCommittedListener(()=>{this.En[a]=c.keys()}),T.waitFor(l).next(()=>c)})}lookupMutationBatch(e,t){return Sn(e).get(t).next(r=>r?(ne(r.userId===this.userId),Yn(this.Tt,r)):null)}An(e,t){return this.En[t]?T.resolve(this.En[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){const i=r.keys();return this.En[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=IDBKeyRange.lowerBound([this.userId,r]);let s=null;return Sn(e).X({index:"userMutationsIndex",range:i},(o,a,c)=>{a.userId===this.userId&&(ne(a.batchId>=r),s=Yn(this.Tt,a)),c.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=-1;return Sn(e).X({index:"userMutationsIndex",range:t,reverse:!0},(i,s,o)=>{r=s.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return Sn(e).W("userMutationsIndex",t).next(r=>r.map(i=>Yn(this.Tt,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=po(this.userId,t.path),i=IDBKeyRange.lowerBound(r),s=[];return Fr(e).X({range:i},(o,a,c)=>{const[u,l,h]=o,d=cn(l);if(u===this.userId&&t.path.isEqual(d))return Sn(e).get(h).next(m=>{if(!m)throw Y();ne(m.userId===this.userId),s.push(Yn(this.Tt,m))});c.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ce(ae);const i=[];return t.forEach(s=>{const o=po(this.userId,s.path),a=IDBKeyRange.lowerBound(o),c=Fr(e).X({range:a},(u,l,h)=>{const[d,m,g]=u,b=cn(m);d===this.userId&&s.path.isEqual(b)?r=r.add(g):h.done()});i.push(c)}),T.waitFor(i).next(()=>this.Rn(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1,s=po(this.userId,r),o=IDBKeyRange.lowerBound(s);let a=new Ce(ae);return Fr(e).X({range:o},(c,u,l)=>{const[h,d,m]=c,g=cn(d);h===this.userId&&r.isPrefixOf(g)?g.length===i&&(a=a.add(m)):l.done()}).next(()=>this.Rn(e,a))}Rn(e,t){const r=[],i=[];return t.forEach(s=>{i.push(Sn(e).get(s).next(o=>{if(o===null)throw Y();ne(o.userId===this.userId),r.push(Yn(this.Tt,o))}))}),T.waitFor(i).next(()=>r)}removeMutationBatch(e,t){return x_(e.re,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.bn(t.batchId)}),T.forEach(r,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}bn(e){delete this.En[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return T.resolve();const r=IDBKeyRange.lowerBound([this.userId]),i=[];return Fr(e).X({range:r},(s,o,a)=>{if(s[0]===this.userId){const c=cn(s[1]);i.push(c)}else a.done()}).next(()=>{ne(i.length===0)})})}containsKey(e,t){return k_(e,this.userId,t)}vn(e){return O_(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function k_(n,e,t){const r=po(e,t.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return Fr(n).X({range:s,Z:!0},(a,c,u)=>{const[l,h,d]=a;l===e&&h===i&&(o=!0),u.done()}).next(()=>o)}function Sn(n){return it(n,"mutations")}function Fr(n){return it(n,"documentMutations")}function O_(n){return it(n,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er{constructor(e){this.Pn=e}next(){return this.Pn+=2,this.Pn}static Vn(){return new Er(0)}static Sn(){return new Er(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EN{constructor(e,t){this.referenceDelegate=e,this.Tt=t}allocateTargetId(e){return this.Dn(e).next(t=>{const r=new Er(t.highestTargetId);return t.highestTargetId=r.next(),this.Cn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.Dn(e).next(t=>re.fromTimestamp(new Ue(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.Dn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.Dn(e).next(i=>(i.highestListenSequenceNumber=t,r&&(i.lastRemoteSnapshotVersion=r.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.Cn(e,i)))}addTargetData(e,t){return this.xn(e,t).next(()=>this.Dn(e).next(r=>(r.targetCount+=1,this.Nn(t,r),this.Cn(e,r))))}updateTargetData(e,t){return this.xn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Or(e).delete(t.targetId)).next(()=>this.Dn(e)).next(r=>(ne(r.targetCount>0),r.targetCount-=1,this.Cn(e,r)))}removeTargets(e,t,r){let i=0;const s=[];return Or(e).X((o,a)=>{const c=Pi(a);c.sequenceNumber<=t&&r.get(c.targetId)===null&&(i++,s.push(this.removeTargetData(e,c)))}).next(()=>T.waitFor(s)).next(()=>i)}forEachTarget(e,t){return Or(e).X((r,i)=>{const s=Pi(i);t(s)})}Dn(e){return Xf(e).get("targetGlobalKey").next(t=>(ne(t!==null),t))}Cn(e,t){return Xf(e).put("targetGlobalKey",t)}xn(e,t){return Or(e).put(N_(this.Tt,t))}Nn(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.Dn(e).next(t=>t.targetCount)}getTargetData(e,t){const r=_r(t),i=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let s=null;return Or(e).X({range:i,index:"queryTargetsIndex"},(o,a,c)=>{const u=Pi(a);Rs(t,u.target)&&(s=u,c.done())}).next(()=>s)}addMatchingKeys(e,t,r){const i=[],s=Cn(e);return t.forEach(o=>{const a=Ct(o.path);i.push(s.put({targetId:r,path:a})),i.push(this.referenceDelegate.addReference(e,r,o))}),T.waitFor(i)}removeMatchingKeys(e,t,r){const i=Cn(e);return T.forEach(t,s=>{const o=Ct(s.path);return T.waitFor([i.delete([r,o]),this.referenceDelegate.removeReference(e,r,s)])})}removeMatchingKeysForTargetId(e,t){const r=Cn(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(i)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),i=Cn(e);let s=ce();return i.X({range:r,Z:!0},(o,a,c)=>{const u=cn(o[1]),l=new G(u);s=s.add(l)}).next(()=>s)}containsKey(e,t){const r=Ct(t.path),i=IDBKeyRange.bound([r],[ky(r)],!1,!0);let s=0;return Cn(e).X({index:"documentTargetsIndex",Z:!0,range:i},([o,a],c,u)=>{o!==0&&(s++,u.done())}).next(()=>s>0)}ie(e,t){return Or(e).get(t).next(r=>r?Pi(r):null)}}function Or(n){return it(n,"targets")}function Xf(n){return it(n,"targetGlobal")}function Cn(n){return it(n,"targetDocuments")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jf([n,e],[t,r]){const i=ae(n,t);return i===0?ae(e,r):i}class TN{constructor(e){this.kn=e,this.buffer=new Ce(Jf),this.On=0}Mn(){return++this.On}Fn(e){const t=[e,this.Mn()];if(this.buffer.size<this.kn)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Jf(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class bN{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.$n=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Bn(6e4)}stop(){this.$n&&(this.$n.cancel(),this.$n=null)}get started(){return this.$n!==null}Bn(e){F("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.$n=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.$n=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){jn(t)?F("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await Nr(t)}await this.Bn(3e5)})}}class IN{constructor(e,t){this.Ln=e,this.params=t}calculateTargetCount(e,t){return this.Ln.qn(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return T.resolve($t.at);const r=new TN(t);return this.Ln.forEachTarget(e,i=>r.Fn(i.sequenceNumber)).next(()=>this.Ln.Un(e,i=>r.Fn(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Ln.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Ln.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(F("LruGarbageCollector","Garbage collection skipped; disabled"),T.resolve(Yf)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(F("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Yf):this.Kn(e,t))}getCacheSize(e){return this.Ln.getCacheSize(e)}Kn(e,t){let r,i,s,o,a,c,u;const l=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(h=>(h>this.params.maximumSequenceNumbersToCollect?(F("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${h}`),i=this.params.maximumSequenceNumbersToCollect):i=h,o=Date.now(),this.nthSequenceNumber(e,i))).next(h=>(r=h,a=Date.now(),this.removeTargets(e,r,t))).next(h=>(s=h,c=Date.now(),this.removeOrphanedDocuments(e,r))).next(h=>(u=Date.now(),Eu()<=ye.DEBUG&&F("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-l}ms
	Determined least recently used ${i} in `+(a-o)+`ms
	Removed ${s} targets in `+(c-a)+`ms
	Removed ${h} documents in `+(u-c)+`ms
Total Duration: ${u-l}ms`),T.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:h})))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SN{constructor(e,t){this.db=e,this.garbageCollector=function(r,i){return new IN(r,i)}(this,t)}qn(e){const t=this.Gn(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}Gn(e){let t=0;return this.Un(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Un(e,t){return this.Qn(e,(r,i)=>t(i))}addReference(e,t,r){return no(e,r)}removeReference(e,t,r){return no(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return no(e,t)}jn(e,t){return function(r,i){let s=!1;return O_(r).tt(o=>k_(r,o,i).next(a=>(a&&(s=!0),T.resolve(!a)))).next(()=>s)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this.Qn(e,(o,a)=>{if(a<=t){const c=this.jn(e,o).next(u=>{if(!u)return s++,r.getEntry(e,o).next(()=>(r.removeEntry(o,re.min()),Cn(e).delete([0,Ct(o.path)])))});i.push(c)}}).next(()=>T.waitFor(i)).next(()=>r.apply(e)).next(()=>s)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return no(e,t)}Qn(e,t){const r=Cn(e);let i,s=$t.at;return r.X({index:"documentTargetsIndex"},([o,a],{path:c,sequenceNumber:u})=>{o===0?(s!==$t.at&&t(new G(cn(i)),s),s=u,i=c):s=$t.at}).next(()=>{s!==$t.at&&t(new G(cn(i)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function no(n,e){return Cn(n).put(function(t,r){return{targetId:0,path:Ct(t.path),sequenceNumber:r}}(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P_{constructor(){this.changes=new Gn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,je.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?T.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CN{constructor(e){this.Tt=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Kn(e).put(r)}removeEntry(e,t,r){return Kn(e).delete(function(i,s){const o=i.path.toArray();return[o.slice(0,o.length-2),o[o.length-2],Zo(s),o[o.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.zn(e,r)))}getEntry(e,t){let r=je.newInvalidDocument(t);return Kn(e).X({index:"documentKeyIndex",range:IDBKeyRange.only(Ni(t))},(i,s)=>{r=this.Wn(t,s)}).next(()=>r)}Hn(e,t){let r={size:0,document:je.newInvalidDocument(t)};return Kn(e).X({index:"documentKeyIndex",range:IDBKeyRange.only(Ni(t))},(i,s)=>{r={document:this.Wn(t,s),size:ta(s)}}).next(()=>r)}getEntries(e,t){let r=Ot();return this.Jn(e,t,(i,s)=>{const o=this.Wn(i,s);r=r.insert(i,o)}).next(()=>r)}Yn(e,t){let r=Ot(),i=new Xe(G.comparator);return this.Jn(e,t,(s,o)=>{const a=this.Wn(s,o);r=r.insert(s,a),i=i.insert(s,ta(o))}).next(()=>({documents:r,Zn:i}))}Jn(e,t,r){if(t.isEmpty())return T.resolve();let i=new Ce(tp);t.forEach(c=>i=i.add(c));const s=IDBKeyRange.bound(Ni(i.first()),Ni(i.last())),o=i.getIterator();let a=o.getNext();return Kn(e).X({index:"documentKeyIndex",range:s},(c,u,l)=>{const h=G.fromSegments([...u.prefixPath,u.collectionGroup,u.documentId]);for(;a&&tp(a,h)<0;)r(a,null),a=o.getNext();a&&a.isEqual(h)&&(r(a,u),a=o.hasNext()?o.getNext():null),a?l.j(Ni(a)):l.done()}).next(()=>{for(;a;)r(a,null),a=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,i){const s=t.path,o=[s.popLast().toArray(),s.lastSegment(),Zo(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],a=[s.popLast().toArray(),s.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Kn(e).W(IDBKeyRange.bound(o,a,!0)).next(c=>{let u=Ot();for(const l of c){const h=this.Wn(G.fromSegments(l.prefixPath.concat(l.collectionGroup,l.documentId)),l);h.isFoundDocument()&&(ks(t,h)||i.has(h.key))&&(u=u.insert(h.key,h))}return u})}getAllFromCollectionGroup(e,t,r,i){let s=Ot();const o=ep(t,r),a=ep(t,Vt.max());return Kn(e).X({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,a,!0)},(c,u,l)=>{const h=this.Wn(G.fromSegments(u.prefixPath.concat(u.collectionGroup,u.documentId)),u);s=s.insert(h.key,h),s.size===i&&l.done()}).next(()=>s)}newChangeBuffer(e){return new NN(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return Zf(e).get("remoteDocumentGlobalKey").next(t=>(ne(!!t),t))}zn(e,t){return Zf(e).put("remoteDocumentGlobalKey",t)}Wn(e,t){if(t){const r=hN(this.Tt,t);if(!(r.isNoDocument()&&r.version.isEqual(re.min())))return r}return je.newInvalidDocument(e)}}function L_(n){return new CN(n)}class NN extends P_{constructor(e,t){super(),this.Xn=e,this.trackRemovals=t,this.ts=new Gn(r=>r.toString(),(r,i)=>r.isEqual(i))}applyChanges(e){const t=[];let r=0,i=new Ce((s,o)=>ae(s.canonicalString(),o.canonicalString()));return this.changes.forEach((s,o)=>{const a=this.ts.get(s);if(t.push(this.Xn.removeEntry(e,s,a.readTime)),o.isValidDocument()){const c=Vf(this.Xn.Tt,o);i=i.add(s.path.popLast());const u=ta(c);r+=u-a.size,t.push(this.Xn.addEntry(e,s,c))}else if(r-=a.size,this.trackRemovals){const c=Vf(this.Xn.Tt,o.convertToNoDocument(re.min()));t.push(this.Xn.addEntry(e,s,c))}}),i.forEach(s=>{t.push(this.Xn.indexManager.addToCollectionParentIndex(e,s))}),t.push(this.Xn.updateMetadata(e,r)),T.waitFor(t)}getFromCache(e,t){return this.Xn.Hn(e,t).next(r=>(this.ts.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.Xn.Yn(e,t).next(({documents:r,Zn:i})=>(i.forEach((s,o)=>{this.ts.set(s,{size:o,readTime:r.get(s).readTime})}),r))}}function Zf(n){return it(n,"remoteDocumentGlobal")}function Kn(n){return it(n,"remoteDocumentsV14")}function Ni(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function ep(n,e){const t=e.documentKey.path.toArray();return[n,Zo(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function tp(n,e){const t=n.path.toArray(),r=e.path.toArray();let i=0;for(let s=0;s<t.length-2&&s<r.length-2;++s)if(i=ae(t[s],r[s]),i)return i;return i=ae(t.length,r.length),i||(i=ae(t[t.length-2],r[r.length-2]),i||ae(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AN{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M_{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Ki(r.mutation,i,kt.empty(),Ue.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,ce()).next(()=>r))}getLocalViewOfDocuments(e,t,r=ce()){const i=an();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let o=Oi();return s.forEach((a,c)=>{o=o.insert(a,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=an();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,ce()))}populateOverlays(e,t,r){const i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,a)=>{t.set(o,a)})})}computeViews(e,t,r,i){let s=Ot();const o=zi(),a=zi();return t.forEach((c,u)=>{const l=r.get(u.key);i.has(u.key)&&(l===void 0||l.mutation instanceof En)?s=s.insert(u.key,u):l!==void 0?(o.set(u.key,l.mutation.getFieldMask()),Ki(l.mutation,u,l.mutation.getFieldMask(),Ue.now())):o.set(u.key,kt.empty())}),this.recalculateAndSaveOverlays(e,s).next(c=>(c.forEach((u,l)=>o.set(u,l)),t.forEach((u,l)=>{var h;return a.set(u,new AN(l,(h=o.get(u))!==null&&h!==void 0?h:null))}),a))}recalculateAndSaveOverlays(e,t){const r=zi();let i=new Xe((o,a)=>o-a),s=ce();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const a of o)a.keys().forEach(c=>{const u=t.get(c);if(u===null)return;let l=r.get(c)||kt.empty();l=a.applyToLocalView(u,l),r.set(c,l);const h=(i.get(a.batchId)||ce()).add(c);i=i.insert(a.batchId,h)})}).next(()=>{const o=[],a=i.getReverseIterator();for(;a.hasNext();){const c=a.getNext(),u=c.key,l=c.value,h=c_();l.forEach(d=>{if(!s.has(d)){const m=n_(t.get(d),r.get(d));m!==null&&h.set(d,m),s=s.add(d)}}),o.push(this.documentOverlayCache.saveOverlays(e,u,h))}return T.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r){return function(i){return G.isDocumentKey(i.path)&&i.collectionGroup===null&&i.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Xl(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r):this.getDocumentsMatchingCollectionQuery(e,t,r)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):T.resolve(an());let a=-1,c=s;return o.next(u=>T.forEach(u,(l,h)=>(a<h.largestBatchId&&(a=h.largestBatchId),s.get(l)?T.resolve():this.remoteDocumentCache.getEntry(e,l).next(d=>{c=c.insert(l,d)}))).next(()=>this.populateOverlays(e,u,s)).next(()=>this.computeViews(e,c,u,ce())).next(l=>({batchId:a,changes:a_(l)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new G(t)).next(r=>{let i=Oi();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r){const i=t.collectionGroup;let s=Oi();return this.indexManager.getCollectionParents(e,i).next(o=>T.forEach(o,a=>{const c=function(u,l){return new $n(l,null,u.explicitOrderBy.slice(),u.filters.slice(),u.limit,u.limitType,u.startAt,u.endAt)}(t,a.child(i));return this.getDocumentsMatchingCollectionQuery(e,c,r).next(u=>{u.forEach((l,h)=>{s=s.insert(l,h)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,t,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i))).next(s=>{i.forEach((a,c)=>{const u=c.getKey();s.get(u)===null&&(s=s.insert(u,je.newInvalidDocument(u)))});let o=Oi();return s.forEach((a,c)=>{const u=i.get(a);u!==void 0&&Ki(u.mutation,c,kt.empty(),Ue.now()),ks(t,c)&&(o=o.insert(a,c))}),o})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DN{constructor(e){this.Tt=e,this.es=new Map,this.ns=new Map}getBundleMetadata(e,t){return T.resolve(this.es.get(t))}saveBundleMetadata(e,t){var r;return this.es.set(t.id,{id:(r=t).id,version:r.version,createTime:St(r.createTime)}),T.resolve()}getNamedQuery(e,t){return T.resolve(this.ns.get(t))}saveNamedQuery(e,t){return this.ns.set(t.name,function(r){return{name:r.name,query:A_(r.bundledQuery),readTime:St(r.readTime)}}(t)),T.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RN{constructor(){this.overlays=new Xe(G.comparator),this.ss=new Map}getOverlay(e,t){return T.resolve(this.overlays.get(t))}getOverlays(e,t){const r=an();return T.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.ce(e,t,s)}),T.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.ss.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.ss.delete(r)),T.resolve()}getOverlaysForCollection(e,t,r){const i=an(),s=t.length+1,o=new G(t.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const c=a.getNext().value,u=c.getKey();if(!t.isPrefixOf(u.path))break;u.path.length===s&&c.largestBatchId>r&&i.set(c.getKey(),c)}return T.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new Xe((u,l)=>u-l);const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===t&&u.largestBatchId>r){let l=s.get(u.largestBatchId);l===null&&(l=an(),s=s.insert(u.largestBatchId,l)),l.set(u.getKey(),u)}}const a=an(),c=s.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((u,l)=>a.set(u,l)),!(a.size()>=i)););return T.resolve(a)}ce(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.ss.get(i.largestBatchId).delete(r.key);this.ss.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new th(t,r));let s=this.ss.get(t);s===void 0&&(s=ce(),this.ss.set(t,s)),this.ss.set(t,s.add(r.key))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ih{constructor(){this.rs=new Ce(et.os),this.us=new Ce(et.cs)}isEmpty(){return this.rs.isEmpty()}addReference(e,t){const r=new et(e,t);this.rs=this.rs.add(r),this.us=this.us.add(r)}hs(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.ls(new et(e,t))}fs(e,t){e.forEach(r=>this.removeReference(r,t))}ds(e){const t=new G(new ve([])),r=new et(t,e),i=new et(t,e+1),s=[];return this.us.forEachInRange([r,i],o=>{this.ls(o),s.push(o.key)}),s}_s(){this.rs.forEach(e=>this.ls(e))}ls(e){this.rs=this.rs.delete(e),this.us=this.us.delete(e)}ws(e){const t=new G(new ve([])),r=new et(t,e),i=new et(t,e+1);let s=ce();return this.us.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const t=new et(e,0),r=this.rs.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class et{constructor(e,t){this.key=e,this.gs=t}static os(e,t){return G.comparator(e.key,t.key)||ae(e.gs,t.gs)}static cs(e,t){return ae(e.gs,t.gs)||G.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xN{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.ys=1,this.ps=new Ce(et.os)}checkEmpty(e){return T.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.ys;this.ys++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Zl(s,t,r,i);this.mutationQueue.push(o);for(const a of i)this.ps=this.ps.add(new et(a.key,s)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return T.resolve(o)}lookupMutationBatch(e,t){return T.resolve(this.Is(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.Ts(r),s=i<0?0:i;return T.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return T.resolve(this.mutationQueue.length===0?-1:this.ys-1)}getAllMutationBatches(e){return T.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new et(t,0),i=new et(t,Number.POSITIVE_INFINITY),s=[];return this.ps.forEachInRange([r,i],o=>{const a=this.Is(o.gs);s.push(a)}),T.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ce(ae);return t.forEach(i=>{const s=new et(i,0),o=new et(i,Number.POSITIVE_INFINITY);this.ps.forEachInRange([s,o],a=>{r=r.add(a.gs)})}),T.resolve(this.Es(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;G.isDocumentKey(s)||(s=s.child(""));const o=new et(new G(s),0);let a=new Ce(ae);return this.ps.forEachWhile(c=>{const u=c.key.path;return!!r.isPrefixOf(u)&&(u.length===i&&(a=a.add(c.gs)),!0)},o),T.resolve(this.Es(a))}Es(e){const t=[];return e.forEach(r=>{const i=this.Is(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){ne(this.As(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.ps;return T.forEach(t.mutations,i=>{const s=new et(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.ps=r})}bn(e){}containsKey(e,t){const r=new et(t,0),i=this.ps.firstAfterOrEqual(r);return T.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,T.resolve()}As(e,t){return this.Ts(e)}Ts(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Is(e){const t=this.Ts(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kN{constructor(e){this.Rs=e,this.docs=new Xe(G.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.Rs(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return T.resolve(r?r.document.mutableCopy():je.newInvalidDocument(t))}getEntries(e,t){let r=Ot();return t.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():je.newInvalidDocument(i))}),T.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=Ot();const o=t.path,a=new G(o.child("")),c=this.docs.getIteratorFrom(a);for(;c.hasNext();){const{key:u,value:{document:l}}=c.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||zl(Py(l),r)<=0||(i.has(l.key)||ks(t,l))&&(s=s.insert(l.key,l.mutableCopy()))}return T.resolve(s)}getAllFromCollectionGroup(e,t,r,i){Y()}bs(e,t){return T.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new ON(this)}getSize(e){return T.resolve(this.size)}}class ON extends P_{constructor(e){super(),this.Xn=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.Xn.addEntry(e,i)):this.Xn.removeEntry(r)}),T.waitFor(t)}getFromCache(e,t){return this.Xn.getEntry(e,t)}getAllFromCache(e,t){return this.Xn.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PN{constructor(e){this.persistence=e,this.vs=new Gn(t=>_r(t),Rs),this.lastRemoteSnapshotVersion=re.min(),this.highestTargetId=0,this.Ps=0,this.Vs=new ih,this.targetCount=0,this.Ss=Er.Vn()}forEachTarget(e,t){return this.vs.forEach((r,i)=>t(i)),T.resolve()}getLastRemoteSnapshotVersion(e){return T.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return T.resolve(this.Ps)}allocateTargetId(e){return this.highestTargetId=this.Ss.next(),T.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Ps&&(this.Ps=t),T.resolve()}xn(e){this.vs.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Ss=new Er(t),this.highestTargetId=t),e.sequenceNumber>this.Ps&&(this.Ps=e.sequenceNumber)}addTargetData(e,t){return this.xn(t),this.targetCount+=1,T.resolve()}updateTargetData(e,t){return this.xn(t),T.resolve()}removeTargetData(e,t){return this.vs.delete(t.target),this.Vs.ds(t.targetId),this.targetCount-=1,T.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.vs.forEach((o,a)=>{a.sequenceNumber<=t&&r.get(a.targetId)===null&&(this.vs.delete(o),s.push(this.removeMatchingKeysForTargetId(e,a.targetId)),i++)}),T.waitFor(s).next(()=>i)}getTargetCount(e){return T.resolve(this.targetCount)}getTargetData(e,t){const r=this.vs.get(t)||null;return T.resolve(r)}addMatchingKeys(e,t,r){return this.Vs.hs(t,r),T.resolve()}removeMatchingKeys(e,t,r){this.Vs.fs(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),T.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Vs.ds(t),T.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Vs.ws(t);return T.resolve(r)}containsKey(e,t){return T.resolve(this.Vs.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{constructor(e,t){this.Ds={},this.overlays={},this.Cs=new $t(0),this.xs=!1,this.xs=!0,this.referenceDelegate=e(this),this.Ns=new PN(this),this.indexManager=new vN,this.remoteDocumentCache=function(r){return new kN(r)}(r=>this.referenceDelegate.ks(r)),this.Tt=new C_(t),this.Os=new DN(this.Tt)}start(){return Promise.resolve()}shutdown(){return this.xs=!1,Promise.resolve()}get started(){return this.xs}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new RN,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Ds[e.toKey()];return r||(r=new xN(t,this.referenceDelegate),this.Ds[e.toKey()]=r),r}getTargetCache(){return this.Ns}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Os}runTransaction(e,t,r){F("MemoryPersistence","Starting transaction:",e);const i=new LN(this.Cs.next());return this.referenceDelegate.Ms(),r(i).next(s=>this.referenceDelegate.Fs(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}$s(e,t){return T.or(Object.values(this.Ds).map(r=>()=>r.containsKey(e,t)))}}class LN extends My{constructor(e){super(),this.currentSequenceNumber=e}}class ja{constructor(e){this.persistence=e,this.Bs=new ih,this.Ls=null}static qs(e){return new ja(e)}get Us(){if(this.Ls)return this.Ls;throw Y()}addReference(e,t,r){return this.Bs.addReference(r,t),this.Us.delete(r.toString()),T.resolve()}removeReference(e,t,r){return this.Bs.removeReference(r,t),this.Us.add(r.toString()),T.resolve()}markPotentiallyOrphaned(e,t){return this.Us.add(t.toString()),T.resolve()}removeTarget(e,t){this.Bs.ds(t.targetId).forEach(i=>this.Us.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.Us.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ms(){this.Ls=new Set}Fs(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return T.forEach(this.Us,r=>{const i=G.fromPath(r);return this.Ks(e,i).next(s=>{s||t.removeEntry(i,re.min())})}).next(()=>(this.Ls=null,t.apply(e)))}updateLimboDocument(e,t){return this.Ks(e,t).next(r=>{r?this.Us.delete(t.toString()):this.Us.add(t.toString())})}ks(e){return 0}Ks(e,t){return T.or([()=>T.resolve(this.Bs.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.$s(e,t)])}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MN{constructor(e){this.Tt=e}$(e,t,r,i){const s=new ka("createOrUpgrade",t);r<1&&i>=1&&(function(a){a.createObjectStore("owner")}(e),function(a){a.createObjectStore("mutationQueues",{keyPath:"userId"}),a.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Bf,{unique:!0}),a.createObjectStore("documentMutations")}(e),np(e),function(a){a.createObjectStore("remoteDocuments")}(e));let o=T.resolve();return r<3&&i>=3&&(r!==0&&(function(a){a.deleteObjectStore("targetDocuments"),a.deleteObjectStore("targets"),a.deleteObjectStore("targetGlobal")}(e),np(e)),o=o.next(()=>function(a){const c=a.store("targetGlobal"),u={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:re.min().toTimestamp(),targetCount:0};return c.put("targetGlobalKey",u)}(s))),r<4&&i>=4&&(r!==0&&(o=o.next(()=>function(a,c){return c.store("mutations").W().next(u=>{a.deleteObjectStore("mutations"),a.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Bf,{unique:!0});const l=c.store("mutations"),h=u.map(d=>l.put(d));return T.waitFor(h)})}(e,s))),o=o.next(()=>{(function(a){a.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)})),r<5&&i>=5&&(o=o.next(()=>this.Gs(s))),r<6&&i>=6&&(o=o.next(()=>(function(a){a.createObjectStore("remoteDocumentGlobal")}(e),this.Qs(s)))),r<7&&i>=7&&(o=o.next(()=>this.js(s))),r<8&&i>=8&&(o=o.next(()=>this.zs(e,s))),r<9&&i>=9&&(o=o.next(()=>{(function(a){a.objectStoreNames.contains("remoteDocumentChanges")&&a.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&i>=10&&(o=o.next(()=>this.Ws(s))),r<11&&i>=11&&(o=o.next(()=>{(function(a){a.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(a){a.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),r<12&&i>=12&&(o=o.next(()=>{(function(a){const c=a.createObjectStore("documentOverlays",{keyPath:oN});c.createIndex("collectionPathOverlayIndex",aN,{unique:!1}),c.createIndex("collectionGroupOverlayIndex",cN,{unique:!1})})(e)})),r<13&&i>=13&&(o=o.next(()=>function(a){const c=a.createObjectStore("remoteDocumentsV14",{keyPath:QC});c.createIndex("documentKeyIndex",YC),c.createIndex("collectionGroupIndex",XC)}(e)).next(()=>this.Hs(e,s)).next(()=>e.deleteObjectStore("remoteDocuments"))),r<14&&i>=14&&(o=o.next(()=>this.Js(e,s))),r<15&&i>=15&&(o=o.next(()=>function(a){a.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),a.createObjectStore("indexState",{keyPath:nN}).createIndex("sequenceNumberIndex",rN,{unique:!1}),a.createObjectStore("indexEntries",{keyPath:iN}).createIndex("documentKeyIndex",sN,{unique:!1})}(e))),o}Qs(e){let t=0;return e.store("remoteDocuments").X((r,i)=>{t+=ta(i)}).next(()=>{const r={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",r)})}Gs(e){const t=e.store("mutationQueues"),r=e.store("mutations");return t.W().next(i=>T.forEach(i,s=>{const o=IDBKeyRange.bound([s.userId,-1],[s.userId,s.lastAcknowledgedBatchId]);return r.W("userMutationsIndex",o).next(a=>T.forEach(a,c=>{ne(c.userId===s.userId);const u=Yn(this.Tt,c);return x_(e,s.userId,u).next(()=>{})}))}))}js(e){const t=e.store("targetDocuments"),r=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(i=>{const s=[];return r.X((o,a)=>{const c=new ve(o),u=function(l){return[0,Ct(l)]}(c);s.push(t.get(u).next(l=>l?T.resolve():(h=>t.put({targetId:0,path:Ct(h),sequenceNumber:i.highestListenSequenceNumber}))(c)))}).next(()=>T.waitFor(s))})}zs(e,t){e.createObjectStore("collectionParents",{keyPath:tN});const r=t.store("collectionParents"),i=new rh,s=o=>{if(i.add(o)){const a=o.lastSegment(),c=o.popLast();return r.put({collectionId:a,parent:Ct(c)})}};return t.store("remoteDocuments").X({Z:!0},(o,a)=>{const c=new ve(o);return s(c.popLast())}).next(()=>t.store("documentMutations").X({Z:!0},([o,a,c],u)=>{const l=cn(a);return s(l.popLast())}))}Ws(e){const t=e.store("targets");return t.X((r,i)=>{const s=Pi(i),o=N_(this.Tt,s);return t.put(o)})}Hs(e,t){const r=t.store("remoteDocuments"),i=[];return r.X((s,o)=>{const a=t.store("remoteDocumentsV14"),c=(u=o,u.document?new G(ve.fromString(u.document.name).popFirst(5)):u.noDocument?G.fromSegments(u.noDocument.path):u.unknownDocument?G.fromSegments(u.unknownDocument.path):Y()).path.toArray();var u;/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const l={prefixPath:c.slice(0,c.length-2),collectionGroup:c[c.length-2],documentId:c[c.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(a.put(l))}).next(()=>T.waitFor(i))}Js(e,t){const r=t.store("mutations"),i=L_(this.Tt),s=new F_(ja.qs,this.Tt.oe);return r.W().next(o=>{const a=new Map;return o.forEach(c=>{var u;let l=(u=a.get(c.userId))!==null&&u!==void 0?u:ce();Yn(this.Tt,c).keys().forEach(h=>l=l.add(h)),a.set(c.userId,l)}),T.forEach(a,(c,u)=>{const l=new at(u),h=Va.ue(this.Tt,l),d=s.getIndexManager(l),m=qa.ue(l,this.Tt,d,s.referenceDelegate);return new M_(i,m,h,d).recalculateAndSaveOverlaysForDocumentKeys(new Ou(t,$t.at),c).next()})})}}function np(n){n.createObjectStore("targetDocuments",{keyPath:ZC}).createIndex("documentTargetsIndex",eN,{unique:!0}),n.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",JC,{unique:!0}),n.createObjectStore("targetGlobal")}const Mc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class sh{constructor(e,t,r,i,s,o,a,c,u,l,h=15){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Ys=s,this.window=o,this.document=a,this.Zs=u,this.Xs=l,this.ti=h,this.Cs=null,this.xs=!1,this.isPrimary=!1,this.networkEnabled=!0,this.ei=null,this.inForeground=!1,this.ni=null,this.si=null,this.ii=Number.NEGATIVE_INFINITY,this.ri=d=>Promise.resolve(),!sh.C())throw new U(S.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new SN(this,i),this.oi=t+"main",this.Tt=new C_(c),this.ui=new gn(this.oi,this.ti,new MN(this.Tt)),this.Ns=new EN(this.referenceDelegate,this.Tt),this.remoteDocumentCache=L_(this.Tt),this.Os=new dN,this.window&&this.window.localStorage?this.ci=this.window.localStorage:(this.ci=null,l===!1&&bt("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.ai().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new U(S.FAILED_PRECONDITION,Mc);return this.hi(),this.li(),this.fi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Ns.getHighestSequenceNumber(e))}).then(e=>{this.Cs=new $t(e,this.Zs)}).then(()=>{this.xs=!0}).catch(e=>(this.ui&&this.ui.close(),Promise.reject(e)))}di(e){return this.ri=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.ui.L(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ys.enqueueAndForget(async()=>{this.started&&await this.ai()}))}ai(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>ro(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this._i(e).next(t=>{t||(this.isPrimary=!1,this.Ys.enqueueRetryable(()=>this.ri(!1)))})}).next(()=>this.wi(e)).next(t=>this.isPrimary&&!t?this.mi(e).next(()=>!1):!!t&&this.gi(e).next(()=>!0))).catch(e=>{if(jn(e))return F("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return F("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ys.enqueueRetryable(()=>this.ri(e)),this.isPrimary=e})}_i(e){return Ai(e).get("owner").next(t=>T.resolve(this.yi(t)))}pi(e){return ro(e).delete(this.clientId)}async Ii(){if(this.isPrimary&&!this.Ti(this.ii,18e5)){this.ii=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const r=it(t,"clientMetadata");return r.W().next(i=>{const s=this.Ei(i,18e5),o=i.filter(a=>s.indexOf(a)===-1);return T.forEach(o,a=>r.delete(a.clientId)).next(()=>o)})}).catch(()=>[]);if(this.ci)for(const t of e)this.ci.removeItem(this.Ai(t.clientId))}}fi(){this.si=this.Ys.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.ai().then(()=>this.Ii()).then(()=>this.fi()))}yi(e){return!!e&&e.ownerId===this.clientId}wi(e){return this.Xs?T.resolve(!0):Ai(e).get("owner").next(t=>{if(t!==null&&this.Ti(t.leaseTimestampMs,5e3)&&!this.Ri(t.ownerId)){if(this.yi(t)&&this.networkEnabled)return!0;if(!this.yi(t)){if(!t.allowTabSynchronization)throw new U(S.FAILED_PRECONDITION,Mc);return!1}}return!(!this.networkEnabled||!this.inForeground)||ro(e).W().next(r=>this.Ei(r,5e3).find(i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,a=this.networkEnabled===i.networkEnabled;if(s||o&&a)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&F("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.xs=!1,this.bi(),this.si&&(this.si.cancel(),this.si=null),this.vi(),this.Pi(),await this.ui.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{const t=new Ou(e,$t.at);return this.mi(t).next(()=>this.pi(t))}),this.ui.close(),this.Vi()}Ei(e,t){return e.filter(r=>this.Ti(r.updateTimeMs,t)&&!this.Ri(r.clientId))}Si(){return this.runTransaction("getActiveClients","readonly",e=>ro(e).W().next(t=>this.Ei(t,18e5).map(r=>r.clientId)))}get started(){return this.xs}getMutationQueue(e,t){return qa.ue(e,this.Tt,t,this.referenceDelegate)}getTargetCache(){return this.Ns}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new wN(e,this.Tt.oe.databaseId)}getDocumentOverlayCache(e){return Va.ue(this.Tt,e)}getBundleCache(){return this.Os}runTransaction(e,t,r){F("IndexedDbPersistence","Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",s=(o=this.ti)===15?lN:o===14?S_:o===13?I_:o===12?uN:o===11?b_:void Y();var o;let a;return this.ui.runTransaction(e,i,s,c=>(a=new Ou(c,this.Cs?this.Cs.next():$t.at),t==="readwrite-primary"?this._i(a).next(u=>!!u||this.wi(a)).next(u=>{if(!u)throw bt(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ys.enqueueRetryable(()=>this.ri(!1)),new U(S.FAILED_PRECONDITION,Ly);return r(a)}).next(u=>this.gi(a).next(()=>u)):this.Di(a).next(()=>r(a)))).then(c=>(a.raiseOnCommittedEvent(),c))}Di(e){return Ai(e).get("owner").next(t=>{if(t!==null&&this.Ti(t.leaseTimestampMs,5e3)&&!this.Ri(t.ownerId)&&!this.yi(t)&&!(this.Xs||this.allowTabSynchronization&&t.allowTabSynchronization))throw new U(S.FAILED_PRECONDITION,Mc)})}gi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Ai(e).put("owner",t)}static C(){return gn.C()}mi(e){const t=Ai(e);return t.get("owner").next(r=>this.yi(r)?(F("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):T.resolve())}Ti(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(bt(`Detected an update time that is in the future: ${e} > ${r}`),!1))}hi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.ni=()=>{this.Ys.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.ai()))},this.document.addEventListener("visibilitychange",this.ni),this.inForeground=this.document.visibilityState==="visible")}vi(){this.ni&&(this.document.removeEventListener("visibilitychange",this.ni),this.ni=null)}li(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.ei=()=>{this.bi(),rE()&&navigator.appVersion.match(/Version\/1[45]/)&&this.Ys.enterRestrictedMode(!0),this.Ys.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.ei))}Pi(){this.ei&&(this.window.removeEventListener("pagehide",this.ei),this.ei=null)}Ri(e){var t;try{const r=((t=this.ci)===null||t===void 0?void 0:t.getItem(this.Ai(e)))!==null;return F("IndexedDbPersistence",`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return bt("IndexedDbPersistence","Failed to get zombied client id.",r),!1}}bi(){if(this.ci)try{this.ci.setItem(this.Ai(this.clientId),String(Date.now()))}catch(e){bt("Failed to set zombie client id.",e)}}Vi(){if(this.ci)try{this.ci.removeItem(this.Ai(this.clientId))}catch{}}Ai(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Ai(n){return it(n,"owner")}function ro(n){return it(n,"clientMetadata")}function FN(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Ci=r,this.xi=i}static Ni(e,t){let r=ce(),i=ce();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new oh(e,t.fromCache,r,i)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U_{constructor(){this.ki=!1}initialize(e,t){this.Oi=e,this.indexManager=t,this.ki=!0}getDocumentsMatchingQuery(e,t,r,i){return this.Mi(e,t).next(s=>s||this.Fi(e,t,i,r)).next(s=>s||this.$i(e,t))}Mi(e,t){if(Df(t))return T.resolve(null);let r=en(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Yo(t,null,"F"),r=en(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=ce(...s);return this.Oi.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,r).next(c=>{const u=this.Bi(t,a);return this.Li(t,u,o,c.readTime)?this.Mi(e,Yo(t,null,"F")):this.qi(e,u,t,c)}))})))}Fi(e,t,r,i){return Df(t)||i.isEqual(re.min())?this.$i(e,t):this.Oi.getDocuments(e,r).next(s=>{const o=this.Bi(t,s);return this.Li(t,o,r,i)?this.$i(e,t):(Eu()<=ye.DEBUG&&F("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Du(t)),this.qi(e,o,t,XS(i,-1)))})}Bi(e,t){let r=new Ce(Qy(e));return t.forEach((i,s)=>{ks(e,s)&&(r=r.add(s))}),r}Li(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}$i(e,t){return Eu()<=ye.DEBUG&&F("QueryEngine","Using full collection scan to execute query:",Du(t)),this.Oi.getDocumentsMatchingQuery(e,t,Vt.min())}qi(e,t,r,i){return this.Oi.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UN{constructor(e,t,r,i){this.persistence=e,this.Ui=t,this.Tt=i,this.Ki=new Xe(ae),this.Gi=new Gn(s=>_r(s),Rs),this.Qi=new Map,this.ji=e.getRemoteDocumentCache(),this.Ns=e.getTargetCache(),this.Os=e.getBundleCache(),this.zi(r)}zi(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new M_(this.ji,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ji.setIndexManager(this.indexManager),this.Ui.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ki))}}function B_(n,e,t,r){return new UN(n,e,t,r)}async function V_(n,e){const t=oe(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.zi(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],a=[];let c=ce();for(const u of i){o.push(u.batchId);for(const l of u.mutations)c=c.add(l.key)}for(const u of s){a.push(u.batchId);for(const l of u.mutations)c=c.add(l.key)}return t.localDocuments.getDocuments(r,c).next(u=>({Wi:u,removedBatchIds:o,addedBatchIds:a}))})})}function BN(n,e){const t=oe(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=t.ji.newChangeBuffer({trackRemovals:!0});return function(o,a,c,u){const l=c.batch,h=l.keys();let d=T.resolve();return h.forEach(m=>{d=d.next(()=>u.getEntry(a,m)).next(g=>{const b=c.docVersions.get(m);ne(b!==null),g.version.compareTo(b)<0&&(l.applyToRemoteDocument(g,c),g.isValidDocument()&&(g.setReadTime(c.commitVersion),u.addEntry(g)))})}),d.next(()=>o.mutationQueue.removeMutationBatch(a,l))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(o){let a=ce();for(let c=0;c<o.mutationResults.length;++c)o.mutationResults[c].transformResults.length>0&&(a=a.add(o.batch.mutations[c].key));return a}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function q_(n){const e=oe(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ns.getLastRemoteSnapshotVersion(t))}function VN(n,e){const t=oe(n),r=e.snapshotVersion;let i=t.Ki;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=t.ji.newChangeBuffer({trackRemovals:!0});i=t.Ki;const a=[];e.targetChanges.forEach((l,h)=>{const d=i.get(h);if(!d)return;a.push(t.Ns.removeMatchingKeys(s,l.removedDocuments,h).next(()=>t.Ns.addMatchingKeys(s,l.addedDocuments,h)));let m=d.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.has(h)?m=m.withResumeToken(ht.EMPTY_BYTE_STRING,re.min()).withLastLimboFreeSnapshotVersion(re.min()):l.resumeToken.approximateByteSize()>0&&(m=m.withResumeToken(l.resumeToken,r)),i=i.insert(h,m),function(g,b,C){return g.resumeToken.approximateByteSize()===0||b.snapshotVersion.toMicroseconds()-g.snapshotVersion.toMicroseconds()>=3e8?!0:C.addedDocuments.size+C.modifiedDocuments.size+C.removedDocuments.size>0}(d,m,l)&&a.push(t.Ns.updateTargetData(s,m))});let c=Ot(),u=ce();if(e.documentUpdates.forEach(l=>{e.resolvedLimboDocuments.has(l)&&a.push(t.persistence.referenceDelegate.updateLimboDocument(s,l))}),a.push(qN(s,o,e.documentUpdates).next(l=>{c=l.Hi,u=l.Ji})),!r.isEqual(re.min())){const l=t.Ns.getLastRemoteSnapshotVersion(s).next(h=>t.Ns.setTargetsMetadata(s,s.currentSequenceNumber,r));a.push(l)}return T.waitFor(a).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,c,u)).next(()=>c)}).then(s=>(t.Ki=i,s))}function qN(n,e,t){let r=ce(),i=ce();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let o=Ot();return t.forEach((a,c)=>{const u=s.get(a);c.isFoundDocument()!==u.isFoundDocument()&&(i=i.add(a)),c.isNoDocument()&&c.version.isEqual(re.min())?(e.removeEntry(a,c.readTime),o=o.insert(a,c)):!u.isValidDocument()||c.version.compareTo(u.version)>0||c.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(c),o=o.insert(a,c)):F("LocalStore","Ignoring outdated watch update for ",a,". Current version:",u.version," Watch version:",c.version)}),{Hi:o,Ji:i}})}function jN(n,e){const t=oe(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function $N(n,e){const t=oe(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.Ns.getTargetData(r,e).next(s=>s?(i=s,T.resolve(i)):t.Ns.allocateTargetId(r).next(o=>(i=new kn(e,o,0,r.currentSequenceNumber),t.Ns.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.Ki.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Ki=t.Ki.insert(r.targetId,r),t.Gi.set(e,r.targetId)),r})}async function Fu(n,e,t){const r=oe(n),i=r.Ki.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!jn(o))throw o;F("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ki=r.Ki.remove(e),r.Gi.delete(i.target)}function rp(n,e,t){const r=oe(n);let i=re.min(),s=ce();return r.persistence.runTransaction("Execute query","readonly",o=>function(a,c,u){const l=oe(a),h=l.Gi.get(u);return h!==void 0?T.resolve(l.Ki.get(h)):l.Ns.getTargetData(c,u)}(r,o,en(e)).next(a=>{if(a)return i=a.lastLimboFreeSnapshotVersion,r.Ns.getMatchingKeysForTargetId(o,a.targetId).next(c=>{s=c})}).next(()=>r.Ui.getDocumentsMatchingQuery(o,e,t?i:re.min(),t?s:ce())).next(a=>(GN(r,yC(e),a),{documents:a,Yi:s})))}function GN(n,e,t){let r=n.Qi.get(e)||re.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.Qi.set(e,r)}class ip{constructor(){this.activeTargetIds=u_()}sr(e){this.activeTargetIds=this.activeTargetIds.add(e)}ir(e){this.activeTargetIds=this.activeTargetIds.delete(e)}nr(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class j_{constructor(){this.Ur=new ip,this.Kr={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e){return this.Ur.sr(e),this.Kr[e]||"not-current"}updateQueryState(e,t,r){this.Kr[e]=t}removeLocalQueryTarget(e){this.Ur.ir(e)}isLocalQueryTarget(e){return this.Ur.activeTargetIds.has(e)}clearQueryState(e){delete this.Kr[e]}getAllActiveQueryTargets(){return this.Ur.activeTargetIds}isActiveQueryTarget(e){return this.Ur.activeTargetIds.has(e)}start(){return this.Ur=new ip,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KN{Gr(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp{constructor(){this.Qr=()=>this.jr(),this.zr=()=>this.Wr(),this.Hr=[],this.Jr()}Gr(e){this.Hr.push(e)}shutdown(){window.removeEventListener("online",this.Qr),window.removeEventListener("offline",this.zr)}Jr(){window.addEventListener("online",this.Qr),window.addEventListener("offline",this.zr)}jr(){F("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.Hr)e(0)}Wr(){F("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.Hr)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zN={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HN{constructor(e){this.Yr=e.Yr,this.Zr=e.Zr}Xr(e){this.eo=e}no(e){this.so=e}onMessage(e){this.io=e}close(){this.Zr()}send(e){this.Yr(e)}ro(){this.eo()}oo(e){this.so(e)}uo(e){this.io(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WN extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http";this.co=t+"://"+e.host,this.ao="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get ho(){return!1}lo(e,t,r,i,s){const o=this.fo(e,t);F("RestConnection","Sending: ",o,r);const a={};return this._o(a,i,s),this.wo(e,o,a,r).then(c=>(F("RestConnection","Received: ",c),c),c=>{throw zo("RestConnection",`${e} failed with error: `,c,"url: ",o,"request:",r),c})}mo(e,t,r,i,s,o){return this.lo(e,t,r,i,s)}_o(e,t,r){e["X-Goog-Api-Client"]="gl-js/ fire/"+di,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}fo(e,t){const r=zN[e];return`${this.co}/v1/${t}:${r}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams}wo(e,t,r,i){return new Promise((s,o)=>{const a=new VS;a.setWithCredentials(!0),a.listenOnce(FS.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case Pc.NO_ERROR:const u=a.getResponseJson();F("Connection","XHR received:",JSON.stringify(u)),s(u);break;case Pc.TIMEOUT:F("Connection",'RPC "'+e+'" timed out'),o(new U(S.DEADLINE_EXCEEDED,"Request time out"));break;case Pc.HTTP_ERROR:const l=a.getStatus();if(F("Connection",'RPC "'+e+'" failed with status:',l,"response text:",a.getResponseText()),l>0){let h=a.getResponseJson();Array.isArray(h)&&(h=h[0]);const d=h==null?void 0:h.error;if(d&&d.status&&d.message){const m=function(g){const b=g.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(b)>=0?b:S.UNKNOWN}(d.status);o(new U(m,d.message))}else o(new U(S.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new U(S.UNAVAILABLE,"Connection failed."));break;default:Y()}}finally{F("Connection",'RPC "'+e+'" completed.')}});const c=JSON.stringify(i);a.send(t,"POST",c,r,15)})}yo(e,t,r){const i=[this.co,"/","google.firestore.v1.Firestore","/",e,"/channel"],s=LS(),o=MS(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(a.xmlHttpFactory=new BS({})),this._o(a.initMessageHeaders,t,r),a.encodeInitMessageHeaders=!0;const c=i.join("");F("Connection","Creating WebChannel: "+c,a);const u=s.createWebChannel(c,a);let l=!1,h=!1;const d=new HN({Yr:g=>{h?F("Connection","Not sending because WebChannel is closed:",g):(l||(F("Connection","Opening WebChannel transport."),u.open(),l=!0),F("Connection","WebChannel sending:",g),u.send(g))},Zr:()=>u.close()}),m=(g,b,C)=>{g.listen(b,B=>{try{C(B)}catch($){setTimeout(()=>{throw $},0)}})};return m(u,Js.EventType.OPEN,()=>{h||F("Connection","WebChannel transport opened.")}),m(u,Js.EventType.CLOSE,()=>{h||(h=!0,F("Connection","WebChannel transport closed"),d.oo())}),m(u,Js.EventType.ERROR,g=>{h||(h=!0,zo("Connection","WebChannel transport errored:",g),d.oo(new U(S.UNAVAILABLE,"The operation could not be completed")))}),m(u,Js.EventType.MESSAGE,g=>{var b;if(!h){const C=g.data[0];ne(!!C);const B=C,$=B.error||((b=B[0])===null||b===void 0?void 0:b.error);if($){F("Connection","WebChannel received error:",$);const W=$.status;let ee=function(z){const H=Qe[z];if(H!==void 0)return s_(H)}(W),A=$.message;ee===void 0&&(ee=S.INTERNAL,A="Unknown error status: "+W+" with message "+$.message),h=!0,d.oo(new U(ee,A)),u.close()}else F("Connection","WebChannel received:",C),d.uo(C)}}),m(o,US.STAT_EVENT,g=>{g.stat===mf.PROXY?F("Connection","Detected buffering proxy"):g.stat===mf.NOPROXY&&F("Connection","Detected no buffering proxy")}),setTimeout(()=>{d.ro()},0),d}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QN(){return typeof window<"u"?window:null}function mo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $a(n){return new FC(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $_{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Ys=e,this.timerId=t,this.po=r,this.Io=i,this.To=s,this.Eo=0,this.Ao=null,this.Ro=Date.now(),this.reset()}reset(){this.Eo=0}bo(){this.Eo=this.To}vo(e){this.cancel();const t=Math.floor(this.Eo+this.Po()),r=Math.max(0,Date.now()-this.Ro),i=Math.max(0,t-r);i>0&&F("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Eo} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Ao=this.Ys.enqueueAfterDelay(this.timerId,i,()=>(this.Ro=Date.now(),e())),this.Eo*=this.Io,this.Eo<this.po&&(this.Eo=this.po),this.Eo>this.To&&(this.Eo=this.To)}Vo(){this.Ao!==null&&(this.Ao.skipDelay(),this.Ao=null)}cancel(){this.Ao!==null&&(this.Ao.cancel(),this.Ao=null)}Po(){return(Math.random()-.5)*this.Eo}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G_{constructor(e,t,r,i,s,o,a,c){this.Ys=e,this.So=r,this.Do=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.Co=0,this.xo=null,this.No=null,this.stream=null,this.ko=new $_(e,t)}Oo(){return this.state===1||this.state===5||this.Mo()}Mo(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.Fo()}async stop(){this.Oo()&&await this.close(0)}$o(){this.state=0,this.ko.reset()}Bo(){this.Mo()&&this.xo===null&&(this.xo=this.Ys.enqueueAfterDelay(this.So,6e4,()=>this.Lo()))}qo(e){this.Uo(),this.stream.send(e)}async Lo(){if(this.Mo())return this.close(0)}Uo(){this.xo&&(this.xo.cancel(),this.xo=null)}Ko(){this.No&&(this.No.cancel(),this.No=null)}async close(e,t){this.Uo(),this.Ko(),this.ko.cancel(),this.Co++,e!==4?this.ko.reset():t&&t.code===S.RESOURCE_EXHAUSTED?(bt(t.toString()),bt("Using maximum backoff delay to prevent overloading the backend."),this.ko.bo()):t&&t.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Go(),this.stream.close(),this.stream=null),this.state=e,await this.listener.no(t)}Go(){}auth(){this.state=1;const e=this.Qo(this.Co),t=this.Co;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Co===t&&this.jo(r,i)},r=>{e(()=>{const i=new U(S.UNKNOWN,"Fetching auth token failed: "+r.message);return this.zo(i)})})}jo(e,t){const r=this.Qo(this.Co);this.stream=this.Wo(e,t),this.stream.Xr(()=>{r(()=>(this.state=2,this.No=this.Ys.enqueueAfterDelay(this.Do,1e4,()=>(this.Mo()&&(this.state=3),Promise.resolve())),this.listener.Xr()))}),this.stream.no(i=>{r(()=>this.zo(i))}),this.stream.onMessage(i=>{r(()=>this.onMessage(i))})}Fo(){this.state=5,this.ko.vo(async()=>{this.state=0,this.start()})}zo(e){return F("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Qo(e){return t=>{this.Ys.enqueueAndForget(()=>this.Co===e?t():(F("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class YN extends G_{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.Tt=s}Wo(e,t){return this.connection.yo("Listen",e,t)}onMessage(e){this.ko.reset();const t=VC(this.Tt,e),r=function(i){if(!("targetChange"in i))return re.min();const s=i.targetChange;return s.targetIds&&s.targetIds.length?re.min():s.readTime?St(s.readTime):re.min()}(e);return this.listener.Ho(t,r)}Jo(e){const t={};t.database=xu(this.Tt),t.addTarget=function(i,s){let o;const a=s.target;return o=Wo(a)?{documents:g_(i,a)}:{query:y_(i,a)},o.targetId=s.targetId,s.resumeToken.approximateByteSize()>0?o.resumeToken=d_(i,s.resumeToken):s.snapshotVersion.compareTo(re.min())>0&&(o.readTime=ri(i,s.snapshotVersion.toTimestamp())),o}(this.Tt,e);const r=jC(this.Tt,e);r&&(t.labels=r),this.qo(t)}Yo(e){const t={};t.database=xu(this.Tt),t.removeTarget=e,this.qo(t)}}class XN extends G_{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.Tt=s,this.Zo=!1}get Xo(){return this.Zo}start(){this.Zo=!1,this.lastStreamToken=void 0,super.start()}Go(){this.Zo&&this.tu([])}Wo(e,t){return this.connection.yo("Write",e,t)}onMessage(e){if(ne(!!e.streamToken),this.lastStreamToken=e.streamToken,this.Zo){this.ko.reset();const t=qC(e.writeResults,e.commitTime),r=St(e.commitTime);return this.listener.eu(r,t)}return ne(!e.writeResults||e.writeResults.length===0),this.Zo=!0,this.listener.nu()}su(){const e={};e.database=xu(this.Tt),this.qo(e)}tu(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>Jo(this.Tt,r))};this.qo(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JN extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.Tt=i,this.iu=!1}ru(){if(this.iu)throw new U(S.FAILED_PRECONDITION,"The client has already been terminated.")}lo(e,t,r){return this.ru(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.lo(e,t,r,i,s)).catch(i=>{throw i.name==="FirebaseError"?(i.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new U(S.UNKNOWN,i.toString())})}mo(e,t,r,i){return this.ru(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.mo(e,t,r,s,o,i)).catch(s=>{throw s.name==="FirebaseError"?(s.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new U(S.UNKNOWN,s.toString())})}terminate(){this.iu=!0}}class ZN{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.ou=0,this.uu=null,this.cu=!0}au(){this.ou===0&&(this.hu("Unknown"),this.uu=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.uu=null,this.lu("Backend didn't respond within 10 seconds."),this.hu("Offline"),Promise.resolve())))}fu(e){this.state==="Online"?this.hu("Unknown"):(this.ou++,this.ou>=1&&(this.du(),this.lu(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.hu("Offline")))}set(e){this.du(),this.ou=0,e==="Online"&&(this.cu=!1),this.hu(e)}hu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}lu(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.cu?(bt(t),this.cu=!1):F("OnlineStateTracker",t)}du(){this.uu!==null&&(this.uu.cancel(),this.uu=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eA{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this._u=[],this.wu=new Map,this.mu=new Set,this.gu=[],this.yu=s,this.yu.Gr(o=>{r.enqueueAndForget(async()=>{Dr(this)&&(F("RemoteStore","Restarting streams for network reachability change."),await async function(a){const c=oe(a);c.mu.add(4),await Ps(c),c.pu.set("Unknown"),c.mu.delete(4),await Ga(c)}(this))})}),this.pu=new ZN(r,i)}}async function Ga(n){if(Dr(n))for(const e of n.gu)await e(!0)}async function Ps(n){for(const e of n.gu)await e(!1)}function K_(n,e){const t=oe(n);t.wu.has(e.targetId)||(t.wu.set(e.targetId,e),uh(t)?ch(t):pi(t).Mo()&&ah(t,e))}function z_(n,e){const t=oe(n),r=pi(t);t.wu.delete(e),r.Mo()&&H_(t,e),t.wu.size===0&&(r.Mo()?r.Bo():Dr(t)&&t.pu.set("Unknown"))}function ah(n,e){n.Iu.Ft(e.targetId),pi(n).Jo(e)}function H_(n,e){n.Iu.Ft(e),pi(n).Yo(e)}function ch(n){n.Iu=new OC({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ie:e=>n.wu.get(e)||null}),pi(n).start(),n.pu.au()}function uh(n){return Dr(n)&&!pi(n).Oo()&&n.wu.size>0}function Dr(n){return oe(n).mu.size===0}function W_(n){n.Iu=void 0}async function tA(n){n.wu.forEach((e,t)=>{ah(n,e)})}async function nA(n,e){W_(n),uh(n)?(n.pu.fu(e),ch(n)):n.pu.set("Unknown")}async function rA(n,e,t){if(n.pu.set("Online"),e instanceof h_&&e.state===2&&e.cause)try{await async function(r,i){const s=i.cause;for(const o of i.targetIds)r.wu.has(o)&&(await r.remoteSyncer.rejectListen(o,s),r.wu.delete(o),r.Iu.removeTarget(o))}(n,e)}catch(r){F("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await na(n,r)}else if(e instanceof fo?n.Iu.Qt(e):e instanceof l_?n.Iu.Zt(e):n.Iu.Wt(e),!t.isEqual(re.min()))try{const r=await q_(n.localStore);t.compareTo(r)>=0&&await function(i,s){const o=i.Iu.ee(s);return o.targetChanges.forEach((a,c)=>{if(a.resumeToken.approximateByteSize()>0){const u=i.wu.get(c);u&&i.wu.set(c,u.withResumeToken(a.resumeToken,s))}}),o.targetMismatches.forEach(a=>{const c=i.wu.get(a);if(!c)return;i.wu.set(a,c.withResumeToken(ht.EMPTY_BYTE_STRING,c.snapshotVersion)),H_(i,a);const u=new kn(c.target,a,1,c.sequenceNumber);ah(i,u)}),i.remoteSyncer.applyRemoteEvent(o)}(n,t)}catch(r){F("RemoteStore","Failed to raise snapshot:",r),await na(n,r)}}async function na(n,e,t){if(!jn(e))throw e;n.mu.add(1),await Ps(n),n.pu.set("Offline"),t||(t=()=>q_(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{F("RemoteStore","Retrying IndexedDB access"),await t(),n.mu.delete(1),await Ga(n)})}function Q_(n,e){return e().catch(t=>na(n,t,e))}async function Ls(n){const e=oe(n),t=Bn(e);let r=e._u.length>0?e._u[e._u.length-1].batchId:-1;for(;iA(e);)try{const i=await jN(e.localStore,r);if(i===null){e._u.length===0&&t.Bo();break}r=i.batchId,sA(e,i)}catch(i){await na(e,i)}Y_(e)&&X_(e)}function iA(n){return Dr(n)&&n._u.length<10}function sA(n,e){n._u.push(e);const t=Bn(n);t.Mo()&&t.Xo&&t.tu(e.mutations)}function Y_(n){return Dr(n)&&!Bn(n).Oo()&&n._u.length>0}function X_(n){Bn(n).start()}async function oA(n){Bn(n).su()}async function aA(n){const e=Bn(n);for(const t of n._u)e.tu(t.mutations)}async function cA(n,e,t){const r=n._u.shift(),i=eh.from(r,e,t);await Q_(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await Ls(n)}async function uA(n,e){e&&Bn(n).Xo&&await async function(t,r){if(i=r.code,AC(i)&&i!==S.ABORTED){const s=t._u.shift();Bn(t).$o(),await Q_(t,()=>t.remoteSyncer.rejectFailedWrite(s.batchId,r)),await Ls(t)}var i}(n,e),Y_(n)&&X_(n)}async function op(n,e){const t=oe(n);t.asyncQueue.verifyOperationInProgress(),F("RemoteStore","RemoteStore received new credentials");const r=Dr(t);t.mu.add(3),await Ps(t),r&&t.pu.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.mu.delete(3),await Ga(t)}async function lA(n,e){const t=oe(n);e?(t.mu.delete(2),await Ga(t)):e||(t.mu.add(2),await Ps(t),t.pu.set("Unknown"))}function pi(n){return n.Tu||(n.Tu=function(e,t,r){const i=oe(e);return i.ru(),new YN(t,i.connection,i.authCredentials,i.appCheckCredentials,i.Tt,r)}(n.datastore,n.asyncQueue,{Xr:tA.bind(null,n),no:nA.bind(null,n),Ho:rA.bind(null,n)}),n.gu.push(async e=>{e?(n.Tu.$o(),uh(n)?ch(n):n.pu.set("Unknown")):(await n.Tu.stop(),W_(n))})),n.Tu}function Bn(n){return n.Eu||(n.Eu=function(e,t,r){const i=oe(e);return i.ru(),new XN(t,i.connection,i.authCredentials,i.appCheckCredentials,i.Tt,r)}(n.datastore,n.asyncQueue,{Xr:oA.bind(null,n),no:uA.bind(null,n),nu:aA.bind(null,n),eu:cA.bind(null,n)}),n.gu.push(async e=>{e?(n.Eu.$o(),await Ls(n)):(await n.Eu.stop(),n._u.length>0&&(F("RemoteStore",`Stopping write stream with ${n._u.length} pending writes`),n._u=[]))})),n.Eu}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lh{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Zt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}static createAndSchedule(e,t,r,i,s){const o=Date.now()+r,a=new lh(e,t,o,i,s);return a.start(r),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new U(S.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function hh(n,e){if(bt("AsyncQueue",`${e}: ${n}`),jn(n))return new U(S.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr{constructor(e){this.comparator=e?(t,r)=>e(t,r)||G.comparator(t.key,r.key):(t,r)=>G.comparator(t.key,r.key),this.keyedMap=Oi(),this.sortedSet=new Xe(this.comparator)}static emptySet(e){return new zr(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof zr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new zr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ap{constructor(){this.Au=new Xe(G.comparator)}track(e){const t=e.doc.key,r=this.Au.get(t);r?e.type!==0&&r.type===3?this.Au=this.Au.insert(t,e):e.type===3&&r.type!==1?this.Au=this.Au.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Au=this.Au.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Au=this.Au.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Au=this.Au.remove(t):e.type===1&&r.type===2?this.Au=this.Au.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Au=this.Au.insert(t,{type:2,doc:e.doc}):Y():this.Au=this.Au.insert(t,e)}Ru(){const e=[];return this.Au.inorderTraversal((t,r)=>{e.push(r)}),e}}class ii{constructor(e,t,r,i,s,o,a,c,u){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=u}static fromInitialDocuments(e,t,r,i,s){const o=[];return t.forEach(a=>{o.push({type:0,doc:a})}),new ii(e,t,zr.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&La(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hA{constructor(){this.bu=void 0,this.listeners=[]}}class dA{constructor(){this.queries=new Gn(e=>Wy(e),La),this.onlineState="Unknown",this.vu=new Set}}async function dh(n,e){const t=oe(n),r=e.query;let i=!1,s=t.queries.get(r);if(s||(i=!0,s=new hA),i)try{s.bu=await t.onListen(r)}catch(o){const a=hh(o,`Initialization of query '${Du(e.query)}' failed`);return void e.onError(a)}t.queries.set(r,s),s.listeners.push(e),e.Pu(t.onlineState),s.bu&&e.Vu(s.bu)&&ph(t)}async function fh(n,e){const t=oe(n),r=e.query;let i=!1;const s=t.queries.get(r);if(s){const o=s.listeners.indexOf(e);o>=0&&(s.listeners.splice(o,1),i=s.listeners.length===0)}if(i)return t.queries.delete(r),t.onUnlisten(r)}function fA(n,e){const t=oe(n);let r=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const a of o.listeners)a.Vu(i)&&(r=!0);o.bu=i}}r&&ph(t)}function pA(n,e,t){const r=oe(n),i=r.queries.get(e);if(i)for(const s of i.listeners)s.onError(t);r.queries.delete(e)}function ph(n){n.vu.forEach(e=>{e.next()})}class mh{constructor(e,t,r){this.query=e,this.Su=t,this.Du=!1,this.Cu=null,this.onlineState="Unknown",this.options=r||{}}Vu(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new ii(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Du?this.xu(e)&&(this.Su.next(e),t=!0):this.Nu(e,this.onlineState)&&(this.ku(e),t=!0),this.Cu=e,t}onError(e){this.Su.error(e)}Pu(e){this.onlineState=e;let t=!1;return this.Cu&&!this.Du&&this.Nu(this.Cu,e)&&(this.ku(this.Cu),t=!0),t}Nu(e,t){if(!e.fromCache)return!0;const r=t!=="Offline";return(!this.options.Ou||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}xu(e){if(e.docChanges.length>0)return!0;const t=this.Cu&&this.Cu.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ku(e){e=ii.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Du=!0,this.Su.next(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J_{constructor(e){this.key=e}}class Z_{constructor(e){this.key=e}}class mA{constructor(e,t){this.query=e,this.Ku=t,this.Gu=null,this.hasCachedResults=!1,this.current=!1,this.Qu=ce(),this.mutatedKeys=ce(),this.ju=Qy(e),this.zu=new zr(this.ju)}get Wu(){return this.Ku}Hu(e,t){const r=t?t.Ju:new ap,i=t?t.zu:this.zu;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,a=!1;const c=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,u=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((l,h)=>{const d=i.get(l),m=ks(this.query,h)?h:null,g=!!d&&this.mutatedKeys.has(d.key),b=!!m&&(m.hasLocalMutations||this.mutatedKeys.has(m.key)&&m.hasCommittedMutations);let C=!1;d&&m?d.data.isEqual(m.data)?g!==b&&(r.track({type:3,doc:m}),C=!0):this.Yu(d,m)||(r.track({type:2,doc:m}),C=!0,(c&&this.ju(m,c)>0||u&&this.ju(m,u)<0)&&(a=!0)):!d&&m?(r.track({type:0,doc:m}),C=!0):d&&!m&&(r.track({type:1,doc:d}),C=!0,(c||u)&&(a=!0)),C&&(m?(o=o.add(m),s=b?s.add(l):s.delete(l)):(o=o.delete(l),s=s.delete(l)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const l=this.query.limitType==="F"?o.last():o.first();o=o.delete(l.key),s=s.delete(l.key),r.track({type:1,doc:l})}return{zu:o,Ju:r,Li:a,mutatedKeys:s}}Yu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r){const i=this.zu;this.zu=e.zu,this.mutatedKeys=e.mutatedKeys;const s=e.Ju.Ru();s.sort((u,l)=>function(h,d){const m=g=>{switch(g){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Y()}};return m(h)-m(d)}(u.type,l.type)||this.ju(u.doc,l.doc)),this.Zu(r);const o=t?this.Xu():[],a=this.Qu.size===0&&this.current?1:0,c=a!==this.Gu;return this.Gu=a,s.length!==0||c?{snapshot:new ii(this.query,e.zu,i,s,e.mutatedKeys,a===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),tc:o}:{tc:o}}Pu(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({zu:this.zu,Ju:new ap,mutatedKeys:this.mutatedKeys,Li:!1},!1)):{tc:[]}}ec(e){return!this.Ku.has(e)&&!!this.zu.has(e)&&!this.zu.get(e).hasLocalMutations}Zu(e){e&&(e.addedDocuments.forEach(t=>this.Ku=this.Ku.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ku=this.Ku.delete(t)),this.current=e.current)}Xu(){if(!this.current)return[];const e=this.Qu;this.Qu=ce(),this.zu.forEach(r=>{this.ec(r.key)&&(this.Qu=this.Qu.add(r.key))});const t=[];return e.forEach(r=>{this.Qu.has(r)||t.push(new Z_(r))}),this.Qu.forEach(r=>{e.has(r)||t.push(new J_(r))}),t}nc(e){this.Ku=e.Yi,this.Qu=ce();const t=this.Hu(e.documents);return this.applyChanges(t,!0)}sc(){return ii.fromInitialDocuments(this.query,this.zu,this.mutatedKeys,this.Gu===0,this.hasCachedResults)}}class gA{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class yA{constructor(e){this.key=e,this.ic=!1}}class _A{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.rc={},this.oc=new Gn(a=>Wy(a),La),this.uc=new Map,this.cc=new Set,this.ac=new Xe(G.comparator),this.hc=new Map,this.lc=new ih,this.fc={},this.dc=new Map,this._c=Er.Sn(),this.onlineState="Unknown",this.wc=void 0}get isPrimaryClient(){return this.wc===!0}}async function vA(n,e){const t=DA(n);let r,i;const s=t.oc.get(e);if(s)r=s.targetId,t.sharedClientState.addLocalQueryTarget(r),i=s.view.sc();else{const o=await $N(t.localStore,en(e));t.isPrimaryClient&&K_(t.remoteStore,o);const a=t.sharedClientState.addLocalQueryTarget(o.targetId);r=o.targetId,i=await wA(t,e,r,a==="current",o.resumeToken)}return i}async function wA(n,e,t,r,i){n.mc=(h,d,m)=>async function(g,b,C,B){let $=b.view.Hu(C);$.Li&&($=await rp(g.localStore,b.query,!1).then(({documents:A})=>b.view.Hu(A,$)));const W=B&&B.targetChanges.get(b.targetId),ee=b.view.applyChanges($,g.isPrimaryClient,W);return up(g,b.targetId,ee.tc),ee.snapshot}(n,h,d,m);const s=await rp(n.localStore,e,!0),o=new mA(e,s.Yi),a=o.Hu(s.documents),c=Os.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),u=o.applyChanges(a,n.isPrimaryClient,c);up(n,t,u.tc);const l=new gA(e,t,o);return n.oc.set(e,l),n.uc.has(t)?n.uc.get(t).push(e):n.uc.set(t,[e]),u.snapshot}async function EA(n,e){const t=oe(n),r=t.oc.get(e),i=t.uc.get(r.targetId);if(i.length>1)return t.uc.set(r.targetId,i.filter(s=>!La(s,e))),void t.oc.delete(e);t.isPrimaryClient?(t.sharedClientState.removeLocalQueryTarget(r.targetId),t.sharedClientState.isActiveQueryTarget(r.targetId)||await Fu(t.localStore,r.targetId,!1).then(()=>{t.sharedClientState.clearQueryState(r.targetId),z_(t.remoteStore,r.targetId),Uu(t,r.targetId)}).catch(Nr)):(Uu(t,r.targetId),await Fu(t.localStore,r.targetId,!0))}async function TA(n,e,t){const r=iv(n);try{const i=await function(s,o){const a=oe(s),c=Ue.now(),u=o.reduce((d,m)=>d.add(m.key),ce());let l,h;return a.persistence.runTransaction("Locally write mutations","readwrite",d=>{let m=Ot(),g=ce();return a.ji.getEntries(d,u).next(b=>{m=b,m.forEach((C,B)=>{B.isValidDocument()||(g=g.add(C))})}).next(()=>a.localDocuments.getOverlayedDocuments(d,m)).next(b=>{l=b;const C=[];for(const B of o){const $=CC(B,l.get(B.key).overlayedDocument);$!=null&&C.push(new En(B.key,$,Hy($.value.mapValue),_t.exists(!0)))}return a.mutationQueue.addMutationBatch(d,c,C,o)}).next(b=>{h=b;const C=b.applyToLocalDocumentSet(l,g);return a.documentOverlayCache.saveOverlays(d,b.batchId,C)})}).then(()=>({batchId:h.batchId,changes:a_(l)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(s,o,a){let c=s.fc[s.currentUser.toKey()];c||(c=new Xe(ae)),c=c.insert(o,a),s.fc[s.currentUser.toKey()]=c}(r,i.batchId,t),await Ms(r,i.changes),await Ls(r.remoteStore)}catch(i){const s=hh(i,"Failed to persist write");t.reject(s)}}async function ev(n,e){const t=oe(n);try{const r=await VN(t.localStore,e);e.targetChanges.forEach((i,s)=>{const o=t.hc.get(s);o&&(ne(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.ic=!0:i.modifiedDocuments.size>0?ne(o.ic):i.removedDocuments.size>0&&(ne(o.ic),o.ic=!1))}),await Ms(t,r,e)}catch(r){await Nr(r)}}function cp(n,e,t){const r=oe(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.oc.forEach((s,o)=>{const a=o.view.Pu(e);a.snapshot&&i.push(a.snapshot)}),function(s,o){const a=oe(s);a.onlineState=o;let c=!1;a.queries.forEach((u,l)=>{for(const h of l.listeners)h.Pu(o)&&(c=!0)}),c&&ph(a)}(r.eventManager,e),i.length&&r.rc.Ho(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function bA(n,e,t){const r=oe(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.hc.get(e),s=i&&i.key;if(s){let o=new Xe(G.comparator);o=o.insert(s,je.newNoDocument(s,re.min()));const a=ce().add(s),c=new Ba(re.min(),new Map,new Ce(ae),o,a);await ev(r,c),r.ac=r.ac.remove(s),r.hc.delete(e),gh(r)}else await Fu(r.localStore,e,!1).then(()=>Uu(r,e,t)).catch(Nr)}async function IA(n,e){const t=oe(n),r=e.batch.batchId;try{const i=await BN(t.localStore,e);nv(t,r,null),tv(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Ms(t,i)}catch(i){await Nr(i)}}async function SA(n,e,t){const r=oe(n);try{const i=await function(s,o){const a=oe(s);return a.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let u;return a.mutationQueue.lookupMutationBatch(c,o).next(l=>(ne(l!==null),u=l.keys(),a.mutationQueue.removeMutationBatch(c,l))).next(()=>a.mutationQueue.performConsistencyCheck(c)).next(()=>a.documentOverlayCache.removeOverlaysForBatchId(c,u,o)).next(()=>a.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,u)).next(()=>a.localDocuments.getDocuments(c,u))})}(r.localStore,e);nv(r,e,t),tv(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Ms(r,i)}catch(i){await Nr(i)}}function tv(n,e){(n.dc.get(e)||[]).forEach(t=>{t.resolve()}),n.dc.delete(e)}function nv(n,e,t){const r=oe(n);let i=r.fc[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.fc[r.currentUser.toKey()]=i}}function Uu(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.uc.get(e))n.oc.delete(r),t&&n.rc.gc(r,t);n.uc.delete(e),n.isPrimaryClient&&n.lc.ds(e).forEach(r=>{n.lc.containsKey(r)||rv(n,r)})}function rv(n,e){n.cc.delete(e.path.canonicalString());const t=n.ac.get(e);t!==null&&(z_(n.remoteStore,t),n.ac=n.ac.remove(e),n.hc.delete(t),gh(n))}function up(n,e,t){for(const r of t)r instanceof J_?(n.lc.addReference(r.key,e),CA(n,r)):r instanceof Z_?(F("SyncEngine","Document no longer in limbo: "+r.key),n.lc.removeReference(r.key,e),n.lc.containsKey(r.key)||rv(n,r.key)):Y()}function CA(n,e){const t=e.key,r=t.path.canonicalString();n.ac.get(t)||n.cc.has(r)||(F("SyncEngine","New document in limbo: "+t),n.cc.add(r),gh(n))}function gh(n){for(;n.cc.size>0&&n.ac.size<n.maxConcurrentLimboResolutions;){const e=n.cc.values().next().value;n.cc.delete(e);const t=new G(ve.fromString(e)),r=n._c.next();n.hc.set(r,new yA(t)),n.ac=n.ac.insert(t,r),K_(n.remoteStore,new kn(en(xs(t.path)),r,2,$t.at))}}async function Ms(n,e,t){const r=oe(n),i=[],s=[],o=[];r.oc.isEmpty()||(r.oc.forEach((a,c)=>{o.push(r.mc(c,e,t).then(u=>{if((u||t)&&r.isPrimaryClient&&r.sharedClientState.updateQueryState(c.targetId,u!=null&&u.fromCache?"not-current":"current"),u){i.push(u);const l=oh.Ni(c.targetId,u);s.push(l)}}))}),await Promise.all(o),r.rc.Ho(i),await async function(a,c){const u=oe(a);try{await u.persistence.runTransaction("notifyLocalViewChanges","readwrite",l=>T.forEach(c,h=>T.forEach(h.Ci,d=>u.persistence.referenceDelegate.addReference(l,h.targetId,d)).next(()=>T.forEach(h.xi,d=>u.persistence.referenceDelegate.removeReference(l,h.targetId,d)))))}catch(l){if(!jn(l))throw l;F("LocalStore","Failed to update sequence numbers: "+l)}for(const l of c){const h=l.targetId;if(!l.fromCache){const d=u.Ki.get(h),m=d.snapshotVersion,g=d.withLastLimboFreeSnapshotVersion(m);u.Ki=u.Ki.insert(h,g)}}}(r.localStore,s))}async function NA(n,e){const t=oe(n);if(!t.currentUser.isEqual(e)){F("SyncEngine","User change. New user:",e.toKey());const r=await V_(t.localStore,e);t.currentUser=e,function(i,s){i.dc.forEach(o=>{o.forEach(a=>{a.reject(new U(S.CANCELLED,s))})}),i.dc.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Ms(t,r.Wi)}}function AA(n,e){const t=oe(n),r=t.hc.get(e);if(r&&r.ic)return ce().add(r.key);{let i=ce();const s=t.uc.get(e);if(!s)return i;for(const o of s){const a=t.oc.get(o);i=i.unionWith(a.view.Wu)}return i}}function DA(n){const e=oe(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=ev.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=AA.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=bA.bind(null,e),e.rc.Ho=fA.bind(null,e.eventManager),e.rc.gc=pA.bind(null,e.eventManager),e}function iv(n){const e=oe(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=IA.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=SA.bind(null,e),e}class sv{constructor(){this.synchronizeTabs=!1}async initialize(e){this.Tt=$a(e.databaseInfo.databaseId),this.sharedClientState=this.Ic(e),this.persistence=this.Tc(e),await this.persistence.start(),this.localStore=this.Ec(e),this.gcScheduler=this.Ac(e,this.localStore),this.indexBackfillerScheduler=this.Rc(e,this.localStore)}Ac(e,t){return null}Rc(e,t){return null}Ec(e){return B_(this.persistence,new U_,e.initialUser,this.Tt)}Tc(e){return new F_(ja.qs,this.Tt)}Ic(e){return new j_}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class RA extends sv{constructor(e,t,r){super(),this.bc=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.bc.initialize(this,e),await iv(this.bc.syncEngine),await Ls(this.bc.remoteStore),await this.persistence.di(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}Ec(e){return B_(this.persistence,new U_,e.initialUser,this.Tt)}Ac(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new bN(r,e.asyncQueue,t)}Rc(e,t){const r=new tC(t,this.persistence);return new eC(e.asyncQueue,r)}Tc(e){const t=FN(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?At.withCacheSize(this.cacheSizeBytes):At.DEFAULT;return new sh(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,QN(),mo(),this.Tt,this.sharedClientState,!!this.forceOwnership)}Ic(e){return new j_}}class ov{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>cp(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=NA.bind(null,this.syncEngine),await lA(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new dA}createDatastore(e){const t=$a(e.databaseInfo.databaseId),r=(i=e.databaseInfo,new WN(i));var i;return function(s,o,a,c){return new JN(s,o,a,c)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return t=this.localStore,r=this.datastore,i=e.asyncQueue,s=a=>cp(this.syncEngine,a,0),o=sp.C()?new sp:new KN,new eA(t,r,i,s,o);var t,r,i,s,o}createSyncEngine(e,t){return function(r,i,s,o,a,c,u){const l=new _A(r,i,s,o,a,c);return u&&(l.wc=!0),l}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return async function(e){const t=oe(e);F("RemoteStore","RemoteStore shutting down."),t.mu.add(5),await Ps(t),t.yu.shutdown(),t.pu.set("Unknown")}(this.remoteStore)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yh{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.vc(this.observer.next,e)}error(e){this.observer.error?this.vc(this.observer.error,e):bt("Uncaught Error in snapshot listener:",e.toString())}Pc(){this.muted=!0}vc(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xA{constructor(e,t,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=at.UNAUTHENTICATED,this.clientId=xy.R(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async s=>{F("FirestoreClient","Received user=",s.uid),await this.authCredentialListener(s),this.user=s}),this.appCheckCredentials.start(r,s=>(F("FirestoreClient","Received new app check token=",s),this.appCheckCredentialListener(s,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new U(S.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Zt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=hh(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function av(n,e){n.asyncQueue.verifyOperationInProgress(),F("FirestoreClient","Initializing OfflineComponentProvider");const t=await n.getConfiguration();await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await V_(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n.offlineComponents=e}async function cv(n,e){n.asyncQueue.verifyOperationInProgress();const t=await kA(n);F("FirestoreClient","Initializing OnlineComponentProvider");const r=await n.getConfiguration();await e.initialize(t,r),n.setCredentialChangeListener(i=>op(e.remoteStore,i)),n.setAppCheckTokenChangeListener((i,s)=>op(e.remoteStore,s)),n.onlineComponents=e}async function kA(n){return n.offlineComponents||(F("FirestoreClient","Using default OfflineComponentProvider"),await av(n,new sv)),n.offlineComponents}async function uv(n){return n.onlineComponents||(F("FirestoreClient","Using default OnlineComponentProvider"),await cv(n,new ov)),n.onlineComponents}function OA(n){return uv(n).then(e=>e.syncEngine)}async function ra(n){const e=await uv(n),t=e.eventManager;return t.onListen=vA.bind(null,e.syncEngine),t.onUnlisten=EA.bind(null,e.syncEngine),t}function PA(n,e,t={}){const r=new Zt;return n.asyncQueue.enqueueAndForget(async()=>function(i,s,o,a,c){const u=new yh({next:h=>{s.enqueueAndForget(()=>fh(i,l));const d=h.docs.has(o);!d&&h.fromCache?c.reject(new U(S.UNAVAILABLE,"Failed to get document because the client is offline.")):d&&h.fromCache&&a&&a.source==="server"?c.reject(new U(S.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(h)},error:h=>c.reject(h)}),l=new mh(xs(o.path),u,{includeMetadataChanges:!0,Ou:!0});return dh(i,l)}(await ra(n),n.asyncQueue,e,t,r)),r.promise}function LA(n,e,t={}){const r=new Zt;return n.asyncQueue.enqueueAndForget(async()=>function(i,s,o,a,c){const u=new yh({next:h=>{s.enqueueAndForget(()=>fh(i,l)),h.fromCache&&a.source==="server"?c.reject(new U(S.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(h)},error:h=>c.reject(h)}),l=new mh(o,u,{includeMetadataChanges:!0,Ou:!0});return dh(i,l)}(await ra(n),n.asyncQueue,e,t,r)),r.promise}const lp=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lv(n,e,t){if(!t)throw new U(S.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function MA(n,e,t,r){if(e===!0&&r===!0)throw new U(S.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function hp(n){if(!G.isDocumentKey(n))throw new U(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function dp(n){if(G.isDocumentKey(n))throw new U(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Ka(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(t){return t.constructor?t.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":Y()}function Nt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new U(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Ka(n);throw new U(S.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function FA(n,e){if(e<=0)throw new U(S.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fp{constructor(e){var t;if(e.host===void 0){if(e.ssl!==void 0)throw new U(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new U(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,MA("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class za{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new fp({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new U(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new U(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new fp(e),e.credentials!==void 0&&(this._authCredentials=function(t){if(!t)return new qS;switch(t.type){case"gapi":const r=t.client;return new KS(r,t.sessionIndex||"0",t.iamToken||null,t.authTokenFactory||null);case"provider":return t.client;default:throw new U(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=lp.get(e);t&&(F("ComponentProvider","Removing Datastore"),lp.delete(e),t.terminate())}(this),Promise.resolve()}}function hv(n,e,t,r={}){var i;const s=(n=Nt(n,za))._getSettings();if(s.host!=="firestore.googleapis.com"&&s.host!==e&&zo("Host has been set in both settings() and useEmulator(), emulator host will be used"),n._setSettings(Object.assign(Object.assign({},s),{host:`${e}:${t}`,ssl:!1})),r.mockUserToken){let o,a;if(typeof r.mockUserToken=="string")o=r.mockUserToken,a=at.MOCK_USER;else{o=Wp(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const c=r.mockUserToken.sub||r.mockUserToken.user_id;if(!c)throw new U(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");a=new at(c)}n._authCredentials=new jS(new Ry(o,a))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new On(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Et(this.firestore,e,this._key)}}class tn{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new tn(this.firestore,e,this._query)}}class On extends tn{constructor(e,t,r){super(e,t,xs(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Et(this.firestore,null,new G(e))}withConverter(e){return new On(this.firestore,e,this._path)}}function UA(n,e,...t){if(n=$e(n),lv("collection","path",e),n instanceof za){const r=ve.fromString(e,...t);return dp(r),new On(n,null,r)}{if(!(n instanceof Et||n instanceof On))throw new U(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ve.fromString(e,...t));return dp(r),new On(n.firestore,null,r)}}function Bu(n,e,...t){if(n=$e(n),arguments.length===1&&(e=xy.R()),lv("doc","path",e),n instanceof za){const r=ve.fromString(e,...t);return hp(r),new Et(n,null,new G(r))}{if(!(n instanceof Et||n instanceof On))throw new U(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ve.fromString(e,...t));return hp(r),new Et(n.firestore,n instanceof On?n.converter:null,new G(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BA{constructor(){this.qc=Promise.resolve(),this.Uc=[],this.Kc=!1,this.Gc=[],this.Qc=null,this.jc=!1,this.zc=!1,this.Wc=[],this.ko=new $_(this,"async_queue_retry"),this.Hc=()=>{const t=mo();t&&F("AsyncQueue","Visibility state changed to "+t.visibilityState),this.ko.Vo()};const e=mo();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Hc)}get isShuttingDown(){return this.Kc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Jc(),this.Yc(e)}enterRestrictedMode(e){if(!this.Kc){this.Kc=!0,this.zc=e||!1;const t=mo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Hc)}}enqueue(e){if(this.Jc(),this.Kc)return new Promise(()=>{});const t=new Zt;return this.Yc(()=>this.Kc&&this.zc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Uc.push(e),this.Zc()))}async Zc(){if(this.Uc.length!==0){try{await this.Uc[0](),this.Uc.shift(),this.ko.reset()}catch(e){if(!jn(e))throw e;F("AsyncQueue","Operation failed with retryable error: "+e)}this.Uc.length>0&&this.ko.vo(()=>this.Zc())}}Yc(e){const t=this.qc.then(()=>(this.jc=!0,e().catch(r=>{this.Qc=r,this.jc=!1;const i=function(s){let o=s.message||"";return s.stack&&(o=s.stack.includes(s.message)?s.stack:s.message+`
`+s.stack),o}(r);throw bt("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.jc=!1,r))));return this.qc=t,t}enqueueAfterDelay(e,t,r){this.Jc(),this.Wc.indexOf(e)>-1&&(t=0);const i=lh.createAndSchedule(this,e,t,r,s=>this.Xc(s));return this.Gc.push(i),i}Jc(){this.Qc&&Y()}verifyOperationInProgress(){}async ta(){let e;do e=this.qc,await e;while(e!==this.qc)}ea(e){for(const t of this.Gc)if(t.timerId===e)return!0;return!1}na(e){return this.ta().then(()=>{this.Gc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.Gc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.ta()})}sa(e){this.Wc.push(e)}Xc(e){const t=this.Gc.indexOf(e);this.Gc.splice(t,1)}}function pp(n){return function(e,t){if(typeof e!="object"||e===null)return!1;const r=e;for(const i of t)if(i in r&&typeof r[i]=="function")return!0;return!1}(n,["next","error","complete"])}class dn extends za{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new BA,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||dv(this),this._firestoreClient.terminate()}}function VA(n,e,t){t||(t="(default)");const r=ha(n,"firestore");if(r.isInitialized(t)){const i=r.getImmediate({identifier:t}),s=r.getOptions(t);if(Co(s,e))return i;throw new U(S.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new U(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:t})}function qA(n,e){const t=typeof n=="object"?n:tl(),r=typeof n=="string"?n:e||"(default)",i=ha(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=Yu("firestore");s&&hv(i,...s)}return i}function Fs(n){return n._firestoreClient||dv(n),n._firestoreClient.verifyNotTerminated(),n._firestoreClient}function dv(n){var e;const t=n._freezeSettings(),r=function(i,s,o,a){return new nC(i,s,o,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,a.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,t);n._firestoreClient=new xA(n._authCredentials,n._appCheckCredentials,n._queue,r)}function jA(n,e){GA(n=Nt(n,dn));const t=Fs(n),r=n._freezeSettings(),i=new ov;return $A(t,i,new RA(i,r.cacheSizeBytes,e==null?void 0:e.forceOwnership))}function $A(n,e,t){const r=new Zt;return n.asyncQueue.enqueue(async()=>{try{await av(n,t),await cv(n,e),r.resolve()}catch(i){const s=i;if(!function(o){return o.name==="FirebaseError"?o.code===S.FAILED_PRECONDITION||o.code===S.UNIMPLEMENTED:typeof DOMException<"u"&&o instanceof DOMException?o.code===22||o.code===20||o.code===11:!0}(s))throw s;zo("Error enabling offline persistence. Falling back to persistence disabled: "+s),r.reject(s)}}).then(()=>r.promise)}function GA(n){if(n._initialized||n._terminated)throw new U(S.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(e){this._byteString=e}static fromBase64String(e){try{return new si(ht.fromBase64String(e))}catch(t){throw new U(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new si(ht.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ha{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new U(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ye(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _h{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vh{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new U(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new U(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ae(this._lat,e._lat)||ae(this._long,e._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KA=/^__.*__$/;class zA{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new En(e,this.data,this.fieldMask,t,this.fieldTransforms):new fi(e,this.data,t,this.fieldTransforms)}}class fv{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new En(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function pv(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Y()}}class wh{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.Tt=r,this.ignoreUndefinedProperties=i,s===void 0&&this.ia(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get ra(){return this.settings.ra}oa(e){return new wh(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.Tt,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ua(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.oa({path:r,ca:!1});return i.aa(e),i}ha(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.oa({path:r,ca:!1});return i.ia(),i}la(e){return this.oa({path:void 0,ca:!0})}fa(e){return ia(e,this.settings.methodName,this.settings.da||!1,this.path,this.settings._a)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}ia(){if(this.path)for(let e=0;e<this.path.length;e++)this.aa(this.path.get(e))}aa(e){if(e.length===0)throw this.fa("Document fields must not be empty");if(pv(this.ra)&&KA.test(e))throw this.fa('Document fields cannot begin and end with "__"')}}class HA{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.Tt=r||$a(e)}wa(e,t,r,i=!1){return new wh({ra:e,methodName:t,_a:r,path:Ye.emptyPath(),ca:!1,da:i},this.databaseId,this.Tt,this.ignoreUndefinedProperties)}}function Us(n){const e=n._freezeSettings(),t=$a(n._databaseId);return new HA(n._databaseId,!!e.ignoreUndefinedProperties,t)}function mv(n,e,t,r,i,s={}){const o=n.wa(s.merge||s.mergeFields?2:0,e,t,i);Eh("Data must be an object, but it was:",o,r);const a=yv(r,o);let c,u;if(s.merge)c=new kt(o.fieldMask),u=o.fieldTransforms;else if(s.mergeFields){const l=[];for(const h of s.mergeFields){const d=Vu(e,h,t);if(!o.contains(d))throw new U(S.INVALID_ARGUMENT,`Field '${d}' is specified in your field mask but missing from your input data.`);vv(l,d)||l.push(d)}c=new kt(l),u=o.fieldTransforms.filter(h=>c.covers(h.field))}else c=null,u=o.fieldTransforms;return new zA(new gt(a),c,u)}class Wa extends _h{_toFieldTransform(e){if(e.ra!==2)throw e.ra===1?e.fa(`${this._methodName}() can only appear at the top level of your update data`):e.fa(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Wa}}function WA(n,e,t,r){const i=n.wa(1,e,t);Eh("Data must be an object, but it was:",i,r);const s=[],o=gt.empty();Ar(r,(c,u)=>{const l=Th(e,c,t);u=$e(u);const h=i.ha(l);if(u instanceof Wa)s.push(l);else{const d=Bs(u,h);d!=null&&(s.push(l),o.set(l,d))}});const a=new kt(s);return new fv(o,a,i.fieldTransforms)}function QA(n,e,t,r,i,s){const o=n.wa(1,e,t),a=[Vu(e,r,t)],c=[i];if(s.length%2!=0)throw new U(S.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<s.length;d+=2)a.push(Vu(e,s[d])),c.push(s[d+1]);const u=[],l=gt.empty();for(let d=a.length-1;d>=0;--d)if(!vv(u,a[d])){const m=a[d];let g=c[d];g=$e(g);const b=o.ha(m);if(g instanceof Wa)u.push(m);else{const C=Bs(g,b);C!=null&&(u.push(m),l.set(m,C))}}const h=new kt(u);return new fv(l,h,o.fieldTransforms)}function gv(n,e,t,r=!1){return Bs(t,n.wa(r?4:3,e))}function Bs(n,e){if(_v(n=$e(n)))return Eh("Unsupported field value:",e,n),yv(n,e);if(n instanceof _h)return function(t,r){if(!pv(r.ra))throw r.fa(`${t._methodName}() can only be used with update() and set()`);if(!r.path)throw r.fa(`${t._methodName}() is not currently supported inside arrays`);const i=t._toFieldTransform(r);i&&r.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.ca&&e.ra!==4)throw e.fa("Nested arrays are not supported");return function(t,r){const i=[];let s=0;for(const o of t){let a=Bs(o,r.la(s));a==null&&(a={nullValue:"NULL_VALUE"}),i.push(a),s++}return{arrayValue:{values:i}}}(n,e)}return function(t,r){if((t=$e(t))===null)return{nullValue:"NULL_VALUE"};if(typeof t=="number")return vC(r.Tt,t);if(typeof t=="boolean")return{booleanValue:t};if(typeof t=="string")return{stringValue:t};if(t instanceof Date){const i=Ue.fromDate(t);return{timestampValue:ri(r.Tt,i)}}if(t instanceof Ue){const i=new Ue(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:ri(r.Tt,i)}}if(t instanceof vh)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof si)return{bytesValue:d_(r.Tt,t._byteString)};if(t instanceof Et){const i=r.databaseId,s=t.firestore._databaseId;if(!s.isEqual(i))throw r.fa(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Jl(t.firestore._databaseId||r.databaseId,t._key.path)}}throw r.fa(`Unsupported field value: ${Ka(t)}`)}(n,e)}function yv(n,e){const t={};return Fy(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Ar(n,(r,i)=>{const s=Bs(i,e.ua(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function _v(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Ue||n instanceof vh||n instanceof si||n instanceof Et||n instanceof _h)}function Eh(n,e,t){if(!_v(t)||!function(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}(t)){const r=Ka(t);throw r==="an object"?e.fa(n+" a custom object"):e.fa(n+" "+r)}}function Vu(n,e,t){if((e=$e(e))instanceof Ha)return e._internalPath;if(typeof e=="string")return Th(n,e);throw ia("Field path arguments must be of type string or ",n,!1,void 0,t)}const YA=new RegExp("[~\\*/\\[\\]]");function Th(n,e,t){if(e.search(YA)>=0)throw ia(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Ha(...e.split("."))._internalPath}catch{throw ia(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ia(n,e,t,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let a=`Function ${e}() called with invalid data`;t&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${r}`),o&&(c+=` in document ${i}`),c+=")"),new U(S.INVALID_ARGUMENT,a+n+c)}function vv(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bh{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Et(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new XA(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Qa("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class XA extends bh{data(){return super.data()}}function Qa(n,e){return typeof e=="string"?Th(n,e):e instanceof Ha?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wv(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new U(S.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Ih{}class Vs extends Ih{}function JA(n,e,...t){let r=[];e instanceof Ih&&r.push(e),r=r.concat(t),function(i){const s=i.filter(a=>a instanceof Sh).length,o=i.filter(a=>a instanceof Ya).length;if(s>1||s>0&&o>0)throw new U(S.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)n=i._apply(n);return n}class Ya extends Vs{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Ya(e,t,r)}_apply(e){const t=this._parse(e);return Tv(e._query,t),new tn(e.firestore,e.converter,Au(e._query,t))}_parse(e){const t=Us(e.firestore);return function(i,s,o,a,c,u,l){let h;if(c.isKeyField()){if(u==="array-contains"||u==="array-contains-any")throw new U(S.INVALID_ARGUMENT,`Invalid Query. You can't perform '${u}' queries on documentId().`);if(u==="in"||u==="not-in"){wp(l,u);const d=[];for(const m of l)d.push(vp(a,i,m));h={arrayValue:{values:d}}}else h=vp(a,i,l)}else u!=="in"&&u!=="not-in"&&u!=="array-contains-any"||wp(l,u),h=gv(o,s,l,u==="in"||u==="not-in");return he.create(c,u,h)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function ZA(n,e,t){const r=e,i=Qa("where",n);return Ya._create(i,r,t)}class Sh extends Ih{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Sh(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Ie.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(r,i){let s=r;const o=i.getFlattenedFilters();for(const a of o)Tv(s,a),s=Au(s,a)}(e._query,t),new tn(e.firestore,e.converter,Au(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Ch extends Vs{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Ch(e,t)}_apply(e){const t=function(r,i,s){if(r.startAt!==null)throw new U(S.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(r.endAt!==null)throw new U(S.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");const o=new Kr(i,s);return function(a,c){if(Yl(a)===null){const u=Pa(a);u!==null&&bv(a,u,c.field)}}(r,o),o}(e._query,this._field,this._direction);return new tn(e.firestore,e.converter,function(r,i){const s=r.explicitOrderBy.concat([i]);return new $n(r.path,r.collectionGroup,s,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}(e._query,t))}}function mp(n,e="asc"){const t=e,r=Qa("orderBy",n);return Ch._create(r,t)}class Nh extends Vs{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Nh(e,t,r)}_apply(e){return new tn(e.firestore,e.converter,Yo(e._query,this._limit,this._limitType))}}function eD(n){return FA("limit",n),Nh._create("limit",n,"F")}class Xa extends Vs{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Xa(e,t,r)}_apply(e){const t=Ev(e,this.type,this._docOrFields,this._inclusive);return new tn(e.firestore,e.converter,function(r,i){return new $n(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),r.limit,r.limitType,i,r.endAt)}(e._query,t))}}function gp(...n){return Xa._create("startAt",n,!0)}function yp(...n){return Xa._create("startAfter",n,!1)}class Ah extends Vs{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Ah(e,t,r)}_apply(e){const t=Ev(e,this.type,this._docOrFields,this._inclusive);return new tn(e.firestore,e.converter,function(r,i){return new $n(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),r.limit,r.limitType,r.startAt,i)}(e._query,t))}}function _p(...n){return Ah._create("endAt",n,!0)}function Ev(n,e,t,r){if(t[0]=$e(t[0]),t[0]instanceof bh)return function(i,s,o,a,c){if(!a)throw new U(S.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${o}().`);const u=[];for(const l of sr(i))if(l.field.isKeyField())u.push(yr(s,a.key));else{const h=a.data.field(l.field);if(Wl(h))throw new U(S.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+l.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(h===null){const d=l.field.canonicalString();throw new U(S.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${d}' (used as the orderBy) does not exist.`)}u.push(h)}return new Un(u,c)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const i=Us(n.firestore);return function(s,o,a,c,u,l){const h=s.explicitOrderBy;if(u.length>h.length)throw new U(S.INVALID_ARGUMENT,`Too many arguments provided to ${c}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const d=[];for(let m=0;m<u.length;m++){const g=u[m];if(h[m].field.isKeyField()){if(typeof g!="string")throw new U(S.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${c}(), but got a ${typeof g}`);if(!Xl(s)&&g.indexOf("/")!==-1)throw new U(S.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${c}() must be a plain document ID, but '${g}' contains a slash.`);const b=s.path.child(ve.fromString(g));if(!G.isDocumentKey(b))throw new U(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${c}() must result in a valid document path, but '${b}' is not because it contains an odd number of segments.`);const C=new G(b);d.push(yr(o,C))}else{const b=gv(a,c,g);d.push(b)}}return new Un(d,l)}(n._query,n.firestore._databaseId,i,e,t,r)}}function vp(n,e,t){if(typeof(t=$e(t))=="string"){if(t==="")throw new U(S.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Xl(e)&&t.indexOf("/")!==-1)throw new U(S.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(ve.fromString(t));if(!G.isDocumentKey(r))throw new U(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return yr(n,new G(r))}if(t instanceof Et)return yr(n,t._key);throw new U(S.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ka(t)}.`)}function wp(n,e){if(!Array.isArray(n)||n.length===0)throw new U(S.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Tv(n,e){if(e.isInequality()){const r=Pa(n),i=e.field;if(r!==null&&!r.isEqual(i))throw new U(S.INVALID_ARGUMENT,`Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${r.toString()}' and '${i.toString()}'`);const s=Yl(n);s!==null&&bv(n,i,s)}const t=function(r,i){for(const s of r)for(const o of s.getFlattenedFilters())if(i.indexOf(o.op)>=0)return o.op;return null}(n.filters,function(r){switch(r){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new U(S.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new U(S.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function bv(n,e,t){if(!t.isEqual(e))throw new U(S.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${t.toString()}' instead.`)}class tD{convertValue(e,t="none"){switch(gr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return qe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(mr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw Y()}}convertObject(e,t){const r={};return Ar(e.fields,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertGeoPoint(e){return new vh(qe(e.latitude),qe(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Uy(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(os(e));default:return null}}convertTimestamp(e){const t=Mn(e);return new Ue(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=ve.fromString(e);ne(E_(r));const i=new pr(r.get(1),r.get(3)),s=new G(r.popFirst(5));return i.isEqual(t)||bt(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iv(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Li{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Sv extends bh{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new go(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Qa("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class go extends Sv{data(e={}){return super.data(e)}}class Cv{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Li(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new go(this._firestore,this._userDataWriter,r.key,r,new Li(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new U(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(r,i){if(r._snapshot.oldDocs.isEmpty()){let s=0;return r._snapshot.docChanges.map(o=>{const a=new go(r._firestore,r._userDataWriter,o.doc.key,o.doc,new Li(r._snapshot.mutatedKeys.has(o.doc.key),r._snapshot.fromCache),r.query.converter);return o.doc,{type:"added",doc:a,oldIndex:-1,newIndex:s++}})}{let s=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(o=>i||o.type!==3).map(o=>{const a=new go(r._firestore,r._userDataWriter,o.doc.key,o.doc,new Li(r._snapshot.mutatedKeys.has(o.doc.key),r._snapshot.fromCache),r.query.converter);let c=-1,u=-1;return o.type!==0&&(c=s.indexOf(o.doc.key),s=s.delete(o.doc.key)),o.type!==1&&(s=s.add(o.doc),u=s.indexOf(o.doc.key)),{type:nD(o.type),doc:a,oldIndex:c,newIndex:u}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function nD(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Y()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rD(n){n=Nt(n,Et);const e=Nt(n.firestore,dn);return PA(Fs(e),n._key).then(t=>Nv(e,n,t))}class Dh extends tD{constructor(e){super(),this.firestore=e}convertBytes(e){return new si(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Et(this.firestore,null,t)}}function Ep(n){n=Nt(n,tn);const e=Nt(n.firestore,dn),t=Fs(e),r=new Dh(e);return wv(n._query),LA(t,n._query).then(i=>new Cv(e,r,n,i))}function Tp(n,e,t){n=Nt(n,Et);const r=Nt(n.firestore,dn),i=Iv(n.converter,e,t);return Ja(r,[mv(Us(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,_t.none())])}function iD(n,e,t,...r){n=Nt(n,Et);const i=Nt(n.firestore,dn),s=Us(i);let o;return o=typeof(e=$e(e))=="string"||e instanceof Ha?QA(s,"updateDoc",n._key,e,t,r):WA(s,"updateDoc",n._key,e),Ja(i,[o.toMutation(n._key,_t.exists(!0))])}function sD(n){return Ja(Nt(n.firestore,dn),[new Ua(n._key,_t.none())])}function oD(n,e){const t=Nt(n.firestore,dn),r=Bu(n),i=Iv(n.converter,e);return Ja(t,[mv(Us(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,_t.exists(!1))]).then(()=>r)}function bp(n,...e){var t,r,i;n=$e(n);let s={includeMetadataChanges:!1},o=0;typeof e[o]!="object"||pp(e[o])||(s=e[o],o++);const a={includeMetadataChanges:s.includeMetadataChanges};if(pp(e[o])){const h=e[o];e[o]=(t=h.next)===null||t===void 0?void 0:t.bind(h),e[o+1]=(r=h.error)===null||r===void 0?void 0:r.bind(h),e[o+2]=(i=h.complete)===null||i===void 0?void 0:i.bind(h)}let c,u,l;if(n instanceof Et)u=Nt(n.firestore,dn),l=xs(n._key.path),c={next:h=>{e[o]&&e[o](Nv(u,n,h))},error:e[o+1],complete:e[o+2]};else{const h=Nt(n,tn);u=Nt(h.firestore,dn),l=h._query;const d=new Dh(u);c={next:m=>{e[o]&&e[o](new Cv(u,d,h,m))},error:e[o+1],complete:e[o+2]},wv(n._query)}return function(h,d,m,g){const b=new yh(g),C=new mh(d,b,m);return h.asyncQueue.enqueueAndForget(async()=>dh(await ra(h),C)),()=>{b.Pc(),h.asyncQueue.enqueueAndForget(async()=>fh(await ra(h),C))}}(Fs(u),l,a,c)}function Ja(n,e){return function(t,r){const i=new Zt;return t.asyncQueue.enqueueAndForget(async()=>TA(await OA(t),r,i)),i.promise}(Fs(n),e)}function Nv(n,e,t){const r=t.docs.get(e._key),i=new Dh(n);return new Sv(n,i,e._key,r,new Li(t.hasPendingWrites,t.fromCache),e.converter)}(function(n,e=!0){(function(t){di=t})(ps),_n(new ln("firestore",(t,{instanceIdentifier:r,options:i})=>{const s=t.getProvider("app").getImmediate(),o=new dn(new $S(t.getProvider("auth-internal")),new HS(t.getProvider("app-check-internal")),function(a,c){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new U(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new pr(a.options.projectId,c)}(s,r),s);return i=Object.assign({useFetchStreams:e},i),o._setSettings(i),o},"PUBLIC").setMultipleInstances(!0)),Mt(gf,"3.8.4",n),Mt(gf,"3.8.4","esm2017")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aD="type.googleapis.com/google.protobuf.Int64Value",cD="type.googleapis.com/google.protobuf.UInt64Value";function Av(n,e){const t={};for(const r in n)n.hasOwnProperty(r)&&(t[r]=e(n[r]));return t}function qu(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(e=>qu(e));if(typeof n=="function"||typeof n=="object")return Av(n,e=>qu(e));throw new Error("Data cannot be encoded in JSON: "+n)}function sa(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case aD:case cD:{const e=Number(n.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+n);return e}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(e=>sa(e)):typeof n=="function"||typeof n=="object"?Av(n,e=>sa(e)):n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rh="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ip={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Hr extends fn{constructor(e,t,r){super(`${Rh}/${e}`,t||""),this.details=r}}function uD(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function lD(n,e){let t=uD(n),r=t,i;try{const s=e&&e.error;if(s){const o=s.status;if(typeof o=="string"){if(!Ip[o])return new Hr("internal","internal");t=Ip[o],r=o}const a=s.message;typeof a=="string"&&(r=a),i=s.details,i!==void 0&&(i=sa(i))}}catch{}return t==="ok"?null:new Hr(t,r,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hD{constructor(e,t,r){this.auth=null,this.messaging=null,this.appCheck=null,this.auth=e.getImmediate({optional:!0}),this.messaging=t.getImmediate({optional:!0}),this.auth||e.get().then(i=>this.auth=i,()=>{}),this.messaging||t.get().then(i=>this.messaging=i,()=>{}),this.appCheck||r.get().then(i=>this.appCheck=i,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e==null?void 0:e.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(){if(this.appCheck){const e=await this.appCheck.getToken();return e.error?null:e.token}return null}async getContext(){const e=await this.getAuthToken(),t=await this.getMessagingToken(),r=await this.getAppCheckToken();return{authToken:e,messagingToken:t,appCheckToken:r}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ju="us-central1";function dD(n){let e=null;return{promise:new Promise((t,r)=>{e=setTimeout(()=>{r(new Hr("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{e&&clearTimeout(e)}}}class fD{constructor(e,t,r,i,s=ju,o){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new hD(t,r,i),this.cancelAllRequests=new Promise(a=>{this.deleteService=()=>Promise.resolve(a())});try{const a=new URL(s);this.customDomain=a.origin,this.region=ju}catch{this.customDomain=null,this.region=s}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function pD(n,e,t){n.emulatorOrigin=`http://${e}:${t}`}function mD(n,e,t){return r=>yD(n,e,r,t||{})}async function gD(n,e,t,r){t["Content-Type"]="application/json";let i;try{i=await r(n,{method:"POST",body:JSON.stringify(e),headers:t})}catch{return{status:0,json:null}}let s=null;try{s=await i.json()}catch{}return{status:i.status,json:s}}function yD(n,e,t,r){const i=n._url(e);return _D(n,i,t,r)}async function _D(n,e,t,r){t=qu(t);const i={data:t},s={},o=await n.contextProvider.getContext();o.authToken&&(s.Authorization="Bearer "+o.authToken),o.messagingToken&&(s["Firebase-Instance-ID-Token"]=o.messagingToken),o.appCheckToken!==null&&(s["X-Firebase-AppCheck"]=o.appCheckToken);const a=r.timeout||7e4,c=dD(a),u=await Promise.race([gD(e,i,s,n.fetchImpl),c.promise,n.cancelAllRequests]);if(c.cancel(),!u)throw new Hr("cancelled","Firebase Functions instance was deleted.");const l=lD(u.status,u.json);if(l)throw l;if(!u.json)throw new Hr("internal","Response is not valid JSON object.");let h=u.json.data;if(typeof h>"u"&&(h=u.json.result),typeof h>"u")throw new Hr("internal","Response is missing data field.");return{data:sa(h)}}const Sp="@firebase/functions",Cp="0.9.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vD="auth-internal",wD="app-check-internal",ED="messaging-internal";function TD(n,e){const t=(r,{instanceIdentifier:i})=>{const s=r.getProvider("app").getImmediate(),o=r.getProvider(vD),a=r.getProvider(ED),c=r.getProvider(wD);return new fD(s,o,a,c,i,n)};_n(new ln(Rh,t,"PUBLIC").setMultipleInstances(!0)),Mt(Sp,Cp,e),Mt(Sp,Cp,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bD(n=tl(),e=ju){const r=ha($e(n),Rh).getImmediate({identifier:e}),i=Yu("functions");return i&&Dv(r,...i),r}function Dv(n,e,t){pD($e(n),e,t)}function ID(n,e,t){return mD($e(n),e,t)}TD(fetch.bind(self));class SD{constructor(e){ft(this,"app");ft(this,"service");ft(this,"watchers",{});ft(this,"functions");if(this.app=(e==null?void 0:e.app)||null,!this.app&&window)try{this.app=nm(e==null?void 0:e.config),console.log("Initializing Firebase App...")}catch(t){console.log(t)}VA(this.app,{ignoreUndefinedProperties:!0}),this.service=qA(this.app),this.functions=bD(this.app),e!=null&&e.emulate&&(hv(this.service,"localhost",8080),Dv(this.functions,"localhost",5001));try{jA(this.service)}catch(t){console.log(t.message)}}call(e){return ID(this.functions,e)}async add(e,t,r){const i=await this.collection(e);return r&&await Tp(this.document(e,r),t,{merge:!0}),r?this.document(e,r):oD(i,t)}async delete(e,t){const r=this.document(e,t);return await sD(r),{id:r.id}}async find(e,t){return(await this.getDocument(e,t)).data()}collection(e){return UA(this.service,e)}getCollection(e){return Ep(this.collection(e))}getDocumentId(e=20){const t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ123456789";let r="";for(let i=0;i<e;i++){const s=Math.floor(Math.random()*t.length);r=r+t.charAt(s)}return r}document(e,t){return t?Bu(this.service,e,t):Bu(this.service,e)}getDocument(e,t){return rD(this.document(e,t))}async setDocument(e,t,r,{merge:i,mergeFields:s}={}){const o=this.document(e,r);return await Tp(o,t,{merge:i,mergeFields:s}),o}async update(e,t,r){if(!r)throw new Error("No data passed to update method");const i=this.document(e,t);return await iD(i,r,{merge:!0}),(await this.getDocument(e,t)).data()}async clearWatchers(){for(const e of Object.keys(this.watchers))this.watchers[e]();return!0}subscribe(e,t,r){const i=r||new Date().toISOString();return this.watchers[i]=bp(this.rawQuery(e==null?void 0:e.collectionName,e==null?void 0:e.where,e==null?void 0:e.orderBy,e==null?void 0:e.limit,e==null?void 0:e.advanced),async s=>{t&&typeof t=="function"&&t({docs:(s==null?void 0:s.docs)||[]})}),this.watchers[i]}unsubscribe(e){return this.watchers[e]&&typeof this.watchers[e]=="function"?(this.watchers[e](),!0):(console.log(`There is no watcher running on ${e} query.`),!1)}watchDocument(e,t,r){const i=`${e}:${t}`;this.watchers[i]=bp(this.document(e,t),async s=>{r&&typeof r=="function"&&await r({data:s.data()})})}unwatchDocument(e,t){const r=`${e}:${t}`;return this.watchers[r]&&typeof this.watchers[r]=="function"?(this.watchers[r](),!0):(console.log(`There is no watcher running on ${r} document.`),!1)}rawQuery(e,t,r,i,{startAfter:s,startAt:o,endAt:a}={}){const c=[];for(const u of t||[])!(u!=null&&u.conditional)||!(u!=null&&u.key)||c.push(ZA(u.key,u.conditional,u.value));return r&&r.split(",").map(u=>c.push(u.includes(":")?mp(u.split(":")[0],u.split(":")[1].includes("asc")?"asc":"desc"):mp(u))),o&&c.push(Array.isArray(o)?gp(...o):gp(o)),s&&c.push(Array.isArray(s)?yp(...s):yp(s)),a&&c.push(Array.isArray(a)?_p(...a):_p(a)),i&&c.push(eD(i)),JA(this.collection(e),...c)}async query(e,t,r,i,s){return Ep(this.rawQuery(e,t,r,i,s))}async list(e,t,r,i,s){var a;const o=await this.query(e,t,r,i,s);return((a=o==null?void 0:o.docs)==null?void 0:a.map(c=>({id:c.id,...c!=null&&c.exists()?c.data():{}})))||null}async getApp(){return this.app}async getService(){return this.service}}var Re=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Rv(n){if(n.__esModule)return n;var e=n.default;if(typeof e=="function"){var t=function r(){if(this instanceof r){var i=[null];i.push.apply(i,arguments);var s=Function.bind.apply(e,i);return new s}return e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(n).forEach(function(r){var i=Object.getOwnPropertyDescriptor(n,r);Object.defineProperty(t,r,i.get?i:{enumerable:!0,get:function(){return n[r]}})}),t}function io(n){throw new Error('Could not dynamically require "'+n+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var $u={},CD={get exports(){return $u},set exports(n){$u=n}};/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/(function(n,e){(function(t){n.exports=t()})(function(){return function t(r,i,s){function o(u,l){if(!i[u]){if(!r[u]){var h=typeof io=="function"&&io;if(!l&&h)return h(u,!0);if(a)return a(u,!0);var d=new Error("Cannot find module '"+u+"'");throw d.code="MODULE_NOT_FOUND",d}var m=i[u]={exports:{}};r[u][0].call(m.exports,function(g){var b=r[u][1][g];return o(b||g)},m,m.exports,t,r,i,s)}return i[u].exports}for(var a=typeof io=="function"&&io,c=0;c<s.length;c++)o(s[c]);return o}({1:[function(t,r,i){(function(s){var o=s.MutationObserver||s.WebKitMutationObserver,a;if(o){var c=0,u=new o(g),l=s.document.createTextNode("");u.observe(l,{characterData:!0}),a=function(){l.data=c=++c%2}}else if(!s.setImmediate&&typeof s.MessageChannel<"u"){var h=new s.MessageChannel;h.port1.onmessage=g,a=function(){h.port2.postMessage(0)}}else"document"in s&&"onreadystatechange"in s.document.createElement("script")?a=function(){var C=s.document.createElement("script");C.onreadystatechange=function(){g(),C.onreadystatechange=null,C.parentNode.removeChild(C),C=null},s.document.documentElement.appendChild(C)}:a=function(){setTimeout(g,0)};var d,m=[];function g(){d=!0;for(var C,B,$=m.length;$;){for(B=m,m=[],C=-1;++C<$;)B[C]();$=m.length}d=!1}r.exports=b;function b(C){m.push(C)===1&&!d&&a()}}).call(this,typeof Re<"u"?Re:typeof self<"u"?self:typeof window<"u"?window:{})},{}],2:[function(t,r,i){var s=t(1);function o(){}var a={},c=["REJECTED"],u=["FULFILLED"],l=["PENDING"];r.exports=h;function h(A){if(typeof A!="function")throw new TypeError("resolver must be a function");this.state=l,this.queue=[],this.outcome=void 0,A!==o&&b(this,A)}h.prototype.catch=function(A){return this.then(null,A)},h.prototype.then=function(A,z){if(typeof A!="function"&&this.state===u||typeof z!="function"&&this.state===c)return this;var H=new this.constructor(o);if(this.state!==l){var X=this.state===u?A:z;m(H,X,this.outcome)}else this.queue.push(new d(H,A,z));return H};function d(A,z,H){this.promise=A,typeof z=="function"&&(this.onFulfilled=z,this.callFulfilled=this.otherCallFulfilled),typeof H=="function"&&(this.onRejected=H,this.callRejected=this.otherCallRejected)}d.prototype.callFulfilled=function(A){a.resolve(this.promise,A)},d.prototype.otherCallFulfilled=function(A){m(this.promise,this.onFulfilled,A)},d.prototype.callRejected=function(A){a.reject(this.promise,A)},d.prototype.otherCallRejected=function(A){m(this.promise,this.onRejected,A)};function m(A,z,H){s(function(){var X;try{X=z(H)}catch(ge){return a.reject(A,ge)}X===A?a.reject(A,new TypeError("Cannot resolve promise with itself")):a.resolve(A,X)})}a.resolve=function(A,z){var H=C(g,z);if(H.status==="error")return a.reject(A,H.value);var X=H.value;if(X)b(A,X);else{A.state=u,A.outcome=z;for(var ge=-1,Me=A.queue.length;++ge<Me;)A.queue[ge].callFulfilled(z)}return A},a.reject=function(A,z){A.state=c,A.outcome=z;for(var H=-1,X=A.queue.length;++H<X;)A.queue[H].callRejected(z);return A};function g(A){var z=A&&A.then;if(A&&(typeof A=="object"||typeof A=="function")&&typeof z=="function")return function(){z.apply(A,arguments)}}function b(A,z){var H=!1;function X(st){H||(H=!0,a.reject(A,st))}function ge(st){H||(H=!0,a.resolve(A,st))}function Me(){z(ge,X)}var De=C(Me);De.status==="error"&&X(De.value)}function C(A,z){var H={};try{H.value=A(z),H.status="success"}catch(X){H.status="error",H.value=X}return H}h.resolve=B;function B(A){return A instanceof this?A:a.resolve(new this(o),A)}h.reject=$;function $(A){var z=new this(o);return a.reject(z,A)}h.all=W;function W(A){var z=this;if(Object.prototype.toString.call(A)!=="[object Array]")return this.reject(new TypeError("must be an array"));var H=A.length,X=!1;if(!H)return this.resolve([]);for(var ge=new Array(H),Me=0,De=-1,st=new this(o);++De<H;)ot(A[De],De);return st;function ot(I,q){z.resolve(I).then(E,function(k){X||(X=!0,a.reject(st,k))});function E(k){ge[q]=k,++Me===H&&!X&&(X=!0,a.resolve(st,ge))}}}h.race=ee;function ee(A){var z=this;if(Object.prototype.toString.call(A)!=="[object Array]")return this.reject(new TypeError("must be an array"));var H=A.length,X=!1;if(!H)return this.resolve([]);for(var ge=-1,Me=new this(o);++ge<H;)De(A[ge]);return Me;function De(st){z.resolve(st).then(function(ot){X||(X=!0,a.resolve(Me,ot))},function(ot){X||(X=!0,a.reject(Me,ot))})}}},{1:1}],3:[function(t,r,i){(function(s){typeof s.Promise!="function"&&(s.Promise=t(2))}).call(this,typeof Re<"u"?Re:typeof self<"u"?self:typeof window<"u"?window:{})},{2:2}],4:[function(t,r,i){var s=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(f){return typeof f}:function(f){return f&&typeof Symbol=="function"&&f.constructor===Symbol&&f!==Symbol.prototype?"symbol":typeof f};function o(f,y){if(!(f instanceof y))throw new TypeError("Cannot call a class as a function")}function a(){try{if(typeof indexedDB<"u")return indexedDB;if(typeof webkitIndexedDB<"u")return webkitIndexedDB;if(typeof mozIndexedDB<"u")return mozIndexedDB;if(typeof OIndexedDB<"u")return OIndexedDB;if(typeof msIndexedDB<"u")return msIndexedDB}catch{return}}var c=a();function u(){try{if(!c||!c.open)return!1;var f=typeof openDatabase<"u"&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),y=typeof fetch=="function"&&fetch.toString().indexOf("[native code")!==-1;return(!f||y)&&typeof indexedDB<"u"&&typeof IDBKeyRange<"u"}catch{return!1}}function l(f,y){f=f||[],y=y||{};try{return new Blob(f,y)}catch(_){if(_.name!=="TypeError")throw _;for(var p=typeof BlobBuilder<"u"?BlobBuilder:typeof MSBlobBuilder<"u"?MSBlobBuilder:typeof MozBlobBuilder<"u"?MozBlobBuilder:WebKitBlobBuilder,v=new p,w=0;w<f.length;w+=1)v.append(f[w]);return v.getBlob(y.type)}}typeof Promise>"u"&&t(3);var h=Promise;function d(f,y){y&&f.then(function(p){y(null,p)},function(p){y(p)})}function m(f,y,p){typeof y=="function"&&f.then(y),typeof p=="function"&&f.catch(p)}function g(f){return typeof f!="string"&&(console.warn(f+" used as a key, but it is not a string."),f=String(f)),f}function b(){if(arguments.length&&typeof arguments[arguments.length-1]=="function")return arguments[arguments.length-1]}var C="local-forage-detect-blob-support",B=void 0,$={},W=Object.prototype.toString,ee="readonly",A="readwrite";function z(f){for(var y=f.length,p=new ArrayBuffer(y),v=new Uint8Array(p),w=0;w<y;w++)v[w]=f.charCodeAt(w);return p}function H(f){return new h(function(y){var p=f.transaction(C,A),v=l([""]);p.objectStore(C).put(v,"key"),p.onabort=function(w){w.preventDefault(),w.stopPropagation(),y(!1)},p.oncomplete=function(){var w=navigator.userAgent.match(/Chrome\/(\d+)/),_=navigator.userAgent.match(/Edge\//);y(_||!w||parseInt(w[1],10)>=43)}}).catch(function(){return!1})}function X(f){return typeof B=="boolean"?h.resolve(B):H(f).then(function(y){return B=y,B})}function ge(f){var y=$[f.name],p={};p.promise=new h(function(v,w){p.resolve=v,p.reject=w}),y.deferredOperations.push(p),y.dbReady?y.dbReady=y.dbReady.then(function(){return p.promise}):y.dbReady=p.promise}function Me(f){var y=$[f.name],p=y.deferredOperations.pop();if(p)return p.resolve(),p.promise}function De(f,y){var p=$[f.name],v=p.deferredOperations.pop();if(v)return v.reject(y),v.promise}function st(f,y){return new h(function(p,v){if($[f.name]=$[f.name]||le(),f.db)if(y)ge(f),f.db.close();else return p(f.db);var w=[f.name];y&&w.push(f.version);var _=c.open.apply(c,w);y&&(_.onupgradeneeded=function(D){var O=_.result;try{O.createObjectStore(f.storeName),D.oldVersion<=1&&O.createObjectStore(C)}catch(P){if(P.name==="ConstraintError")console.warn('The database "'+f.name+'" has been upgraded from version '+D.oldVersion+" to version "+D.newVersion+', but the storage "'+f.storeName+'" already exists.');else throw P}}),_.onerror=function(D){D.preventDefault(),v(_.error)},_.onsuccess=function(){var D=_.result;D.onversionchange=function(O){O.target.close()},p(D),Me(f)}})}function ot(f){return st(f,!1)}function I(f){return st(f,!0)}function q(f,y){if(!f.db)return!0;var p=!f.db.objectStoreNames.contains(f.storeName),v=f.version<f.db.version,w=f.version>f.db.version;if(v&&(f.version!==y&&console.warn('The database "'+f.name+`" can't be downgraded from version `+f.db.version+" to version "+f.version+"."),f.version=f.db.version),w||p){if(p){var _=f.db.version+1;_>f.version&&(f.version=_)}return!0}return!1}function E(f){return new h(function(y,p){var v=new FileReader;v.onerror=p,v.onloadend=function(w){var _=btoa(w.target.result||"");y({__local_forage_encoded_blob:!0,data:_,type:f.type})},v.readAsBinaryString(f)})}function k(f){var y=z(atob(f.data));return l([y],{type:f.type})}function R(f){return f&&f.__local_forage_encoded_blob}function x(f){var y=this,p=y._initReady().then(function(){var v=$[y._dbInfo.name];if(v&&v.dbReady)return v.dbReady});return m(p,f,f),p}function V(f){ge(f);for(var y=$[f.name],p=y.forages,v=0;v<p.length;v++){var w=p[v];w._dbInfo.db&&(w._dbInfo.db.close(),w._dbInfo.db=null)}return f.db=null,ot(f).then(function(_){return f.db=_,q(f)?I(f):_}).then(function(_){f.db=y.db=_;for(var D=0;D<p.length;D++)p[D]._dbInfo.db=_}).catch(function(_){throw De(f,_),_})}function M(f,y,p,v){v===void 0&&(v=1);try{var w=f.db.transaction(f.storeName,y);p(null,w)}catch(_){if(v>0&&(!f.db||_.name==="InvalidStateError"||_.name==="NotFoundError"))return h.resolve().then(function(){if(!f.db||_.name==="NotFoundError"&&!f.db.objectStoreNames.contains(f.storeName)&&f.version<=f.db.version)return f.db&&(f.version=f.db.version+1),I(f)}).then(function(){return V(f).then(function(){M(f,y,p,v-1)})}).catch(p);p(_)}}function le(){return{forages:[],db:null,dbReady:null,deferredOperations:[]}}function _e(f){var y=this,p={db:null};if(f)for(var v in f)p[v]=f[v];var w=$[p.name];w||(w=le(),$[p.name]=w),w.forages.push(y),y._initReady||(y._initReady=y.ready,y.ready=x);var _=[];function D(){return h.resolve()}for(var O=0;O<w.forages.length;O++){var P=w.forages[O];P!==y&&_.push(P._initReady().catch(D))}var L=w.forages.slice(0);return h.all(_).then(function(){return p.db=w.db,ot(p)}).then(function(j){return p.db=j,q(p,y._defaultConfig.version)?I(p):j}).then(function(j){p.db=w.db=j,y._dbInfo=p;for(var J=0;J<L.length;J++){var ue=L[J];ue!==y&&(ue._dbInfo.db=p.db,ue._dbInfo.version=p.version)}})}function Ne(f,y){var p=this;f=g(f);var v=new h(function(w,_){p.ready().then(function(){M(p._dbInfo,ee,function(D,O){if(D)return _(D);try{var P=O.objectStore(p._dbInfo.storeName),L=P.get(f);L.onsuccess=function(){var j=L.result;j===void 0&&(j=null),R(j)&&(j=k(j)),w(j)},L.onerror=function(){_(L.error)}}catch(j){_(j)}})}).catch(_)});return d(v,y),v}function te(f,y){var p=this,v=new h(function(w,_){p.ready().then(function(){M(p._dbInfo,ee,function(D,O){if(D)return _(D);try{var P=O.objectStore(p._dbInfo.storeName),L=P.openCursor(),j=1;L.onsuccess=function(){var J=L.result;if(J){var ue=J.value;R(ue)&&(ue=k(ue));var we=f(ue,J.key,j++);we!==void 0?w(we):J.continue()}else w()},L.onerror=function(){_(L.error)}}catch(J){_(J)}})}).catch(_)});return d(v,y),v}function Ae(f,y,p){var v=this;f=g(f);var w=new h(function(_,D){var O;v.ready().then(function(){return O=v._dbInfo,W.call(y)==="[object Blob]"?X(O.db).then(function(P){return P?y:E(y)}):y}).then(function(P){M(v._dbInfo,A,function(L,j){if(L)return D(L);try{var J=j.objectStore(v._dbInfo.storeName);P===null&&(P=void 0);var ue=J.put(P,f);j.oncomplete=function(){P===void 0&&(P=null),_(P)},j.onabort=j.onerror=function(){var we=ue.error?ue.error:ue.transaction.error;D(we)}}catch(we){D(we)}})}).catch(D)});return d(w,p),w}function He(f,y){var p=this;f=g(f);var v=new h(function(w,_){p.ready().then(function(){M(p._dbInfo,A,function(D,O){if(D)return _(D);try{var P=O.objectStore(p._dbInfo.storeName),L=P.delete(f);O.oncomplete=function(){w()},O.onerror=function(){_(L.error)},O.onabort=function(){var j=L.error?L.error:L.transaction.error;_(j)}}catch(j){_(j)}})}).catch(_)});return d(v,y),v}function Je(f){var y=this,p=new h(function(v,w){y.ready().then(function(){M(y._dbInfo,A,function(_,D){if(_)return w(_);try{var O=D.objectStore(y._dbInfo.storeName),P=O.clear();D.oncomplete=function(){v()},D.onabort=D.onerror=function(){var L=P.error?P.error:P.transaction.error;w(L)}}catch(L){w(L)}})}).catch(w)});return d(p,f),p}function Be(f){var y=this,p=new h(function(v,w){y.ready().then(function(){M(y._dbInfo,ee,function(_,D){if(_)return w(_);try{var O=D.objectStore(y._dbInfo.storeName),P=O.count();P.onsuccess=function(){v(P.result)},P.onerror=function(){w(P.error)}}catch(L){w(L)}})}).catch(w)});return d(p,f),p}function Kt(f,y){var p=this,v=new h(function(w,_){if(f<0){w(null);return}p.ready().then(function(){M(p._dbInfo,ee,function(D,O){if(D)return _(D);try{var P=O.objectStore(p._dbInfo.storeName),L=!1,j=P.openKeyCursor();j.onsuccess=function(){var J=j.result;if(!J){w(null);return}f===0||L?w(J.key):(L=!0,J.advance(f))},j.onerror=function(){_(j.error)}}catch(J){_(J)}})}).catch(_)});return d(v,y),v}function nn(f){var y=this,p=new h(function(v,w){y.ready().then(function(){M(y._dbInfo,ee,function(_,D){if(_)return w(_);try{var O=D.objectStore(y._dbInfo.storeName),P=O.openKeyCursor(),L=[];P.onsuccess=function(){var j=P.result;if(!j){v(L);return}L.push(j.key),j.continue()},P.onerror=function(){w(P.error)}}catch(j){w(j)}})}).catch(w)});return d(p,f),p}function zt(f,y){y=b.apply(this,arguments);var p=this.config();f=typeof f!="function"&&f||{},f.name||(f.name=f.name||p.name,f.storeName=f.storeName||p.storeName);var v=this,w;if(!f.name)w=h.reject("Invalid arguments");else{var _=f.name===p.name&&v._dbInfo.db,D=_?h.resolve(v._dbInfo.db):ot(f).then(function(O){var P=$[f.name],L=P.forages;P.db=O;for(var j=0;j<L.length;j++)L[j]._dbInfo.db=O;return O});f.storeName?w=D.then(function(O){if(O.objectStoreNames.contains(f.storeName)){var P=O.version+1;ge(f);var L=$[f.name],j=L.forages;O.close();for(var J=0;J<j.length;J++){var ue=j[J];ue._dbInfo.db=null,ue._dbInfo.version=P}var we=new h(function(be,We){var ze=c.open(f.name,P);ze.onerror=function(qt){var yi=ze.result;yi.close(),We(qt)},ze.onupgradeneeded=function(){var qt=ze.result;qt.deleteObjectStore(f.storeName)},ze.onsuccess=function(){var qt=ze.result;qt.close(),be(qt)}});return we.then(function(be){L.db=be;for(var We=0;We<j.length;We++){var ze=j[We];ze._dbInfo.db=be,Me(ze._dbInfo)}}).catch(function(be){throw(De(f,be)||h.resolve()).catch(function(){}),be})}}):w=D.then(function(O){ge(f);var P=$[f.name],L=P.forages;O.close();for(var j=0;j<L.length;j++){var J=L[j];J._dbInfo.db=null}var ue=new h(function(we,be){var We=c.deleteDatabase(f.name);We.onerror=function(){var ze=We.result;ze&&ze.close(),be(We.error)},We.onblocked=function(){console.warn('dropInstance blocked for database "'+f.name+'" until all open connections are closed')},We.onsuccess=function(){var ze=We.result;ze&&ze.close(),we(ze)}});return ue.then(function(we){P.db=we;for(var be=0;be<L.length;be++){var We=L[be];Me(We._dbInfo)}}).catch(function(we){throw(De(f,we)||h.resolve()).catch(function(){}),we})})}return d(w,y),w}var Ht={_driver:"asyncStorage",_initStorage:_e,_support:u(),iterate:te,getItem:Ne,setItem:Ae,removeItem:He,clear:Je,length:Be,key:Kt,keys:nn,dropInstance:zt};function mi(){return typeof openDatabase=="function"}var rn="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",rc="~~local_forage_type~",Bh=/^~~local_forage_type~([^~]+)~/,Gs="__lfsc__:",ic=Gs.length,sc="arbf",oc="blob",Vh="si08",qh="ui08",jh="uic8",$h="si16",Gh="si32",Kh="ur16",zh="ui32",Hh="fl32",Wh="fl64",Qh=ic+sc.length,Yh=Object.prototype.toString;function Xh(f){var y=f.length*.75,p=f.length,v,w=0,_,D,O,P;f[f.length-1]==="="&&(y--,f[f.length-2]==="="&&y--);var L=new ArrayBuffer(y),j=new Uint8Array(L);for(v=0;v<p;v+=4)_=rn.indexOf(f[v]),D=rn.indexOf(f[v+1]),O=rn.indexOf(f[v+2]),P=rn.indexOf(f[v+3]),j[w++]=_<<2|D>>4,j[w++]=(D&15)<<4|O>>2,j[w++]=(O&3)<<6|P&63;return L}function ac(f){var y=new Uint8Array(f),p="",v;for(v=0;v<y.length;v+=3)p+=rn[y[v]>>2],p+=rn[(y[v]&3)<<4|y[v+1]>>4],p+=rn[(y[v+1]&15)<<2|y[v+2]>>6],p+=rn[y[v+2]&63];return y.length%3===2?p=p.substring(0,p.length-1)+"=":y.length%3===1&&(p=p.substring(0,p.length-2)+"=="),p}function sw(f,y){var p="";if(f&&(p=Yh.call(f)),f&&(p==="[object ArrayBuffer]"||f.buffer&&Yh.call(f.buffer)==="[object ArrayBuffer]")){var v,w=Gs;f instanceof ArrayBuffer?(v=f,w+=sc):(v=f.buffer,p==="[object Int8Array]"?w+=Vh:p==="[object Uint8Array]"?w+=qh:p==="[object Uint8ClampedArray]"?w+=jh:p==="[object Int16Array]"?w+=$h:p==="[object Uint16Array]"?w+=Kh:p==="[object Int32Array]"?w+=Gh:p==="[object Uint32Array]"?w+=zh:p==="[object Float32Array]"?w+=Hh:p==="[object Float64Array]"?w+=Wh:y(new Error("Failed to get type for BinaryArray"))),y(w+ac(v))}else if(p==="[object Blob]"){var _=new FileReader;_.onload=function(){var D=rc+f.type+"~"+ac(this.result);y(Gs+oc+D)},_.readAsArrayBuffer(f)}else try{y(JSON.stringify(f))}catch(D){console.error("Couldn't convert value into a JSON string: ",f),y(null,D)}}function ow(f){if(f.substring(0,ic)!==Gs)return JSON.parse(f);var y=f.substring(Qh),p=f.substring(ic,Qh),v;if(p===oc&&Bh.test(y)){var w=y.match(Bh);v=w[1],y=y.substring(w[0].length)}var _=Xh(y);switch(p){case sc:return _;case oc:return l([_],{type:v});case Vh:return new Int8Array(_);case qh:return new Uint8Array(_);case jh:return new Uint8ClampedArray(_);case $h:return new Int16Array(_);case Kh:return new Uint16Array(_);case Gh:return new Int32Array(_);case zh:return new Uint32Array(_);case Hh:return new Float32Array(_);case Wh:return new Float64Array(_);default:throw new Error("Unkown type: "+p)}}var cc={serialize:sw,deserialize:ow,stringToBuffer:Xh,bufferToString:ac};function Jh(f,y,p,v){f.executeSql("CREATE TABLE IF NOT EXISTS "+y.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],p,v)}function aw(f){var y=this,p={db:null};if(f)for(var v in f)p[v]=typeof f[v]!="string"?f[v].toString():f[v];var w=new h(function(_,D){try{p.db=openDatabase(p.name,String(p.version),p.description,p.size)}catch(O){return D(O)}p.db.transaction(function(O){Jh(O,p,function(){y._dbInfo=p,_()},function(P,L){D(L)})},D)});return p.serializer=cc,w}function Tn(f,y,p,v,w,_){f.executeSql(p,v,w,function(D,O){O.code===O.SYNTAX_ERR?D.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[y.storeName],function(P,L){L.rows.length?_(P,O):Jh(P,y,function(){P.executeSql(p,v,w,_)},_)},_):_(D,O)},_)}function cw(f,y){var p=this;f=g(f);var v=new h(function(w,_){p.ready().then(function(){var D=p._dbInfo;D.db.transaction(function(O){Tn(O,D,"SELECT * FROM "+D.storeName+" WHERE key = ? LIMIT 1",[f],function(P,L){var j=L.rows.length?L.rows.item(0).value:null;j&&(j=D.serializer.deserialize(j)),w(j)},function(P,L){_(L)})})}).catch(_)});return d(v,y),v}function uw(f,y){var p=this,v=new h(function(w,_){p.ready().then(function(){var D=p._dbInfo;D.db.transaction(function(O){Tn(O,D,"SELECT * FROM "+D.storeName,[],function(P,L){for(var j=L.rows,J=j.length,ue=0;ue<J;ue++){var we=j.item(ue),be=we.value;if(be&&(be=D.serializer.deserialize(be)),be=f(be,we.key,ue+1),be!==void 0){w(be);return}}w()},function(P,L){_(L)})})}).catch(_)});return d(v,y),v}function Zh(f,y,p,v){var w=this;f=g(f);var _=new h(function(D,O){w.ready().then(function(){y===void 0&&(y=null);var P=y,L=w._dbInfo;L.serializer.serialize(y,function(j,J){J?O(J):L.db.transaction(function(ue){Tn(ue,L,"INSERT OR REPLACE INTO "+L.storeName+" (key, value) VALUES (?, ?)",[f,j],function(){D(P)},function(we,be){O(be)})},function(ue){if(ue.code===ue.QUOTA_ERR){if(v>0){D(Zh.apply(w,[f,P,p,v-1]));return}O(ue)}})})}).catch(O)});return d(_,p),_}function lw(f,y,p){return Zh.apply(this,[f,y,p,1])}function hw(f,y){var p=this;f=g(f);var v=new h(function(w,_){p.ready().then(function(){var D=p._dbInfo;D.db.transaction(function(O){Tn(O,D,"DELETE FROM "+D.storeName+" WHERE key = ?",[f],function(){w()},function(P,L){_(L)})})}).catch(_)});return d(v,y),v}function dw(f){var y=this,p=new h(function(v,w){y.ready().then(function(){var _=y._dbInfo;_.db.transaction(function(D){Tn(D,_,"DELETE FROM "+_.storeName,[],function(){v()},function(O,P){w(P)})})}).catch(w)});return d(p,f),p}function fw(f){var y=this,p=new h(function(v,w){y.ready().then(function(){var _=y._dbInfo;_.db.transaction(function(D){Tn(D,_,"SELECT COUNT(key) as c FROM "+_.storeName,[],function(O,P){var L=P.rows.item(0).c;v(L)},function(O,P){w(P)})})}).catch(w)});return d(p,f),p}function pw(f,y){var p=this,v=new h(function(w,_){p.ready().then(function(){var D=p._dbInfo;D.db.transaction(function(O){Tn(O,D,"SELECT key FROM "+D.storeName+" WHERE id = ? LIMIT 1",[f+1],function(P,L){var j=L.rows.length?L.rows.item(0).key:null;w(j)},function(P,L){_(L)})})}).catch(_)});return d(v,y),v}function mw(f){var y=this,p=new h(function(v,w){y.ready().then(function(){var _=y._dbInfo;_.db.transaction(function(D){Tn(D,_,"SELECT key FROM "+_.storeName,[],function(O,P){for(var L=[],j=0;j<P.rows.length;j++)L.push(P.rows.item(j).key);v(L)},function(O,P){w(P)})})}).catch(w)});return d(p,f),p}function gw(f){return new h(function(y,p){f.transaction(function(v){v.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],function(w,_){for(var D=[],O=0;O<_.rows.length;O++)D.push(_.rows.item(O).name);y({db:f,storeNames:D})},function(w,_){p(_)})},function(v){p(v)})})}function yw(f,y){y=b.apply(this,arguments);var p=this.config();f=typeof f!="function"&&f||{},f.name||(f.name=f.name||p.name,f.storeName=f.storeName||p.storeName);var v=this,w;return f.name?w=new h(function(_){var D;f.name===p.name?D=v._dbInfo.db:D=openDatabase(f.name,"","",0),f.storeName?_({db:D,storeNames:[f.storeName]}):_(gw(D))}).then(function(_){return new h(function(D,O){_.db.transaction(function(P){function L(we){return new h(function(be,We){P.executeSql("DROP TABLE IF EXISTS "+we,[],function(){be()},function(ze,qt){We(qt)})})}for(var j=[],J=0,ue=_.storeNames.length;J<ue;J++)j.push(L(_.storeNames[J]));h.all(j).then(function(){D()}).catch(function(we){O(we)})},function(P){O(P)})})}):w=h.reject("Invalid arguments"),d(w,y),w}var _w={_driver:"webSQLStorage",_initStorage:aw,_support:mi(),iterate:uw,getItem:cw,setItem:lw,removeItem:hw,clear:dw,length:fw,key:pw,keys:mw,dropInstance:yw};function vw(){try{return typeof localStorage<"u"&&"setItem"in localStorage&&!!localStorage.setItem}catch{return!1}}function ed(f,y){var p=f.name+"/";return f.storeName!==y.storeName&&(p+=f.storeName+"/"),p}function ww(){var f="_localforage_support_test";try{return localStorage.setItem(f,!0),localStorage.removeItem(f),!1}catch{return!0}}function Ew(){return!ww()||localStorage.length>0}function Tw(f){var y=this,p={};if(f)for(var v in f)p[v]=f[v];return p.keyPrefix=ed(f,y._defaultConfig),Ew()?(y._dbInfo=p,p.serializer=cc,h.resolve()):h.reject()}function bw(f){var y=this,p=y.ready().then(function(){for(var v=y._dbInfo.keyPrefix,w=localStorage.length-1;w>=0;w--){var _=localStorage.key(w);_.indexOf(v)===0&&localStorage.removeItem(_)}});return d(p,f),p}function Iw(f,y){var p=this;f=g(f);var v=p.ready().then(function(){var w=p._dbInfo,_=localStorage.getItem(w.keyPrefix+f);return _&&(_=w.serializer.deserialize(_)),_});return d(v,y),v}function Sw(f,y){var p=this,v=p.ready().then(function(){for(var w=p._dbInfo,_=w.keyPrefix,D=_.length,O=localStorage.length,P=1,L=0;L<O;L++){var j=localStorage.key(L);if(j.indexOf(_)===0){var J=localStorage.getItem(j);if(J&&(J=w.serializer.deserialize(J)),J=f(J,j.substring(D),P++),J!==void 0)return J}}});return d(v,y),v}function Cw(f,y){var p=this,v=p.ready().then(function(){var w=p._dbInfo,_;try{_=localStorage.key(f)}catch{_=null}return _&&(_=_.substring(w.keyPrefix.length)),_});return d(v,y),v}function Nw(f){var y=this,p=y.ready().then(function(){for(var v=y._dbInfo,w=localStorage.length,_=[],D=0;D<w;D++){var O=localStorage.key(D);O.indexOf(v.keyPrefix)===0&&_.push(O.substring(v.keyPrefix.length))}return _});return d(p,f),p}function Aw(f){var y=this,p=y.keys().then(function(v){return v.length});return d(p,f),p}function Dw(f,y){var p=this;f=g(f);var v=p.ready().then(function(){var w=p._dbInfo;localStorage.removeItem(w.keyPrefix+f)});return d(v,y),v}function Rw(f,y,p){var v=this;f=g(f);var w=v.ready().then(function(){y===void 0&&(y=null);var _=y;return new h(function(D,O){var P=v._dbInfo;P.serializer.serialize(y,function(L,j){if(j)O(j);else try{localStorage.setItem(P.keyPrefix+f,L),D(_)}catch(J){(J.name==="QuotaExceededError"||J.name==="NS_ERROR_DOM_QUOTA_REACHED")&&O(J),O(J)}})})});return d(w,p),w}function xw(f,y){if(y=b.apply(this,arguments),f=typeof f!="function"&&f||{},!f.name){var p=this.config();f.name=f.name||p.name,f.storeName=f.storeName||p.storeName}var v=this,w;return f.name?w=new h(function(_){f.storeName?_(ed(f,v._defaultConfig)):_(f.name+"/")}).then(function(_){for(var D=localStorage.length-1;D>=0;D--){var O=localStorage.key(D);O.indexOf(_)===0&&localStorage.removeItem(O)}}):w=h.reject("Invalid arguments"),d(w,y),w}var kw={_driver:"localStorageWrapper",_initStorage:Tw,_support:vw(),iterate:Sw,getItem:Iw,setItem:Rw,removeItem:Dw,clear:bw,length:Aw,key:Cw,keys:Nw,dropInstance:xw},Ow=function(y,p){return y===p||typeof y=="number"&&typeof p=="number"&&isNaN(y)&&isNaN(p)},Pw=function(y,p){for(var v=y.length,w=0;w<v;){if(Ow(y[w],p))return!0;w++}return!1},td=Array.isArray||function(f){return Object.prototype.toString.call(f)==="[object Array]"},gi={},nd={},Rr={INDEXEDDB:Ht,WEBSQL:_w,LOCALSTORAGE:kw},Lw=[Rr.INDEXEDDB._driver,Rr.WEBSQL._driver,Rr.LOCALSTORAGE._driver],Ks=["dropInstance"],uc=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(Ks),Mw={description:"",driver:Lw.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1};function Fw(f,y){f[y]=function(){var p=arguments;return f.ready().then(function(){return f[y].apply(f,p)})}}function lc(){for(var f=1;f<arguments.length;f++){var y=arguments[f];if(y)for(var p in y)y.hasOwnProperty(p)&&(td(y[p])?arguments[0][p]=y[p].slice():arguments[0][p]=y[p])}return arguments[0]}var Uw=function(){function f(y){o(this,f);for(var p in Rr)if(Rr.hasOwnProperty(p)){var v=Rr[p],w=v._driver;this[p]=w,gi[w]||this.defineDriver(v)}this._defaultConfig=lc({},Mw),this._config=lc({},this._defaultConfig,y),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(function(){})}return f.prototype.config=function(p){if((typeof p>"u"?"undefined":s(p))==="object"){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var v in p){if(v==="storeName"&&(p[v]=p[v].replace(/\W/g,"_")),v==="version"&&typeof p[v]!="number")return new Error("Database version must be a number.");this._config[v]=p[v]}return"driver"in p&&p.driver?this.setDriver(this._config.driver):!0}else return typeof p=="string"?this._config[p]:this._config},f.prototype.defineDriver=function(p,v,w){var _=new h(function(D,O){try{var P=p._driver,L=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!p._driver){O(L);return}for(var j=uc.concat("_initStorage"),J=0,ue=j.length;J<ue;J++){var we=j[J],be=!Pw(Ks,we);if((be||p[we])&&typeof p[we]!="function"){O(L);return}}var We=function(){for(var yi=function(qw){return function(){var jw=new Error("Method "+qw+" is not implemented by the current driver"),rd=h.reject(jw);return d(rd,arguments[arguments.length-1]),rd}},hc=0,Vw=Ks.length;hc<Vw;hc++){var dc=Ks[hc];p[dc]||(p[dc]=yi(dc))}};We();var ze=function(yi){gi[P]&&console.info("Redefining LocalForage driver: "+P),gi[P]=p,nd[P]=yi,D()};"_support"in p?p._support&&typeof p._support=="function"?p._support().then(ze,O):ze(!!p._support):ze(!0)}catch(qt){O(qt)}});return m(_,v,w),_},f.prototype.driver=function(){return this._driver||null},f.prototype.getDriver=function(p,v,w){var _=gi[p]?h.resolve(gi[p]):h.reject(new Error("Driver not found."));return m(_,v,w),_},f.prototype.getSerializer=function(p){var v=h.resolve(cc);return m(v,p),v},f.prototype.ready=function(p){var v=this,w=v._driverSet.then(function(){return v._ready===null&&(v._ready=v._initDriver()),v._ready});return m(w,p,p),w},f.prototype.setDriver=function(p,v,w){var _=this;td(p)||(p=[p]);var D=this._getSupportedDrivers(p);function O(){_._config.driver=_.driver()}function P(J){return _._extend(J),O(),_._ready=_._initStorage(_._config),_._ready}function L(J){return function(){var ue=0;function we(){for(;ue<J.length;){var be=J[ue];return ue++,_._dbInfo=null,_._ready=null,_.getDriver(be).then(P).catch(we)}O();var We=new Error("No available storage method found.");return _._driverSet=h.reject(We),_._driverSet}return we()}}var j=this._driverSet!==null?this._driverSet.catch(function(){return h.resolve()}):h.resolve();return this._driverSet=j.then(function(){var J=D[0];return _._dbInfo=null,_._ready=null,_.getDriver(J).then(function(ue){_._driver=ue._driver,O(),_._wrapLibraryMethodsWithReady(),_._initDriver=L(D)})}).catch(function(){O();var J=new Error("No available storage method found.");return _._driverSet=h.reject(J),_._driverSet}),m(this._driverSet,v,w),this._driverSet},f.prototype.supports=function(p){return!!nd[p]},f.prototype._extend=function(p){lc(this,p)},f.prototype._getSupportedDrivers=function(p){for(var v=[],w=0,_=p.length;w<_;w++){var D=p[w];this.supports(D)&&v.push(D)}return v},f.prototype._wrapLibraryMethodsWithReady=function(){for(var p=0,v=uc.length;p<v;p++)Fw(this,uc[p])},f.prototype.createInstance=function(p){return new f(p)},f}(),Bw=new Uw;r.exports=Bw},{3:3}]},{},[4])(4)})})(CD);var Gu={},oa={},ND={get exports(){return oa},set exports(n){oa=n}};(function(n,e){var t=typeof self<"u"?self:Re,r=function(){function s(){this.fetch=!1,this.DOMException=t.DOMException}return s.prototype=t,new s}();(function(s){(function(o){var a={searchParams:"URLSearchParams"in s,iterable:"Symbol"in s&&"iterator"in Symbol,blob:"FileReader"in s&&"Blob"in s&&function(){try{return new Blob,!0}catch{return!1}}(),formData:"FormData"in s,arrayBuffer:"ArrayBuffer"in s};function c(I){return I&&DataView.prototype.isPrototypeOf(I)}if(a.arrayBuffer)var u=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],l=ArrayBuffer.isView||function(I){return I&&u.indexOf(Object.prototype.toString.call(I))>-1};function h(I){if(typeof I!="string"&&(I=String(I)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(I))throw new TypeError("Invalid character in header field name");return I.toLowerCase()}function d(I){return typeof I!="string"&&(I=String(I)),I}function m(I){var q={next:function(){var E=I.shift();return{done:E===void 0,value:E}}};return a.iterable&&(q[Symbol.iterator]=function(){return q}),q}function g(I){this.map={},I instanceof g?I.forEach(function(q,E){this.append(E,q)},this):Array.isArray(I)?I.forEach(function(q){this.append(q[0],q[1])},this):I&&Object.getOwnPropertyNames(I).forEach(function(q){this.append(q,I[q])},this)}g.prototype.append=function(I,q){I=h(I),q=d(q);var E=this.map[I];this.map[I]=E?E+", "+q:q},g.prototype.delete=function(I){delete this.map[h(I)]},g.prototype.get=function(I){return I=h(I),this.has(I)?this.map[I]:null},g.prototype.has=function(I){return this.map.hasOwnProperty(h(I))},g.prototype.set=function(I,q){this.map[h(I)]=d(q)},g.prototype.forEach=function(I,q){for(var E in this.map)this.map.hasOwnProperty(E)&&I.call(q,this.map[E],E,this)},g.prototype.keys=function(){var I=[];return this.forEach(function(q,E){I.push(E)}),m(I)},g.prototype.values=function(){var I=[];return this.forEach(function(q){I.push(q)}),m(I)},g.prototype.entries=function(){var I=[];return this.forEach(function(q,E){I.push([E,q])}),m(I)},a.iterable&&(g.prototype[Symbol.iterator]=g.prototype.entries);function b(I){if(I.bodyUsed)return Promise.reject(new TypeError("Already read"));I.bodyUsed=!0}function C(I){return new Promise(function(q,E){I.onload=function(){q(I.result)},I.onerror=function(){E(I.error)}})}function B(I){var q=new FileReader,E=C(q);return q.readAsArrayBuffer(I),E}function $(I){var q=new FileReader,E=C(q);return q.readAsText(I),E}function W(I){for(var q=new Uint8Array(I),E=new Array(q.length),k=0;k<q.length;k++)E[k]=String.fromCharCode(q[k]);return E.join("")}function ee(I){if(I.slice)return I.slice(0);var q=new Uint8Array(I.byteLength);return q.set(new Uint8Array(I)),q.buffer}function A(){return this.bodyUsed=!1,this._initBody=function(I){this._bodyInit=I,I?typeof I=="string"?this._bodyText=I:a.blob&&Blob.prototype.isPrototypeOf(I)?this._bodyBlob=I:a.formData&&FormData.prototype.isPrototypeOf(I)?this._bodyFormData=I:a.searchParams&&URLSearchParams.prototype.isPrototypeOf(I)?this._bodyText=I.toString():a.arrayBuffer&&a.blob&&c(I)?(this._bodyArrayBuffer=ee(I.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):a.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(I)||l(I))?this._bodyArrayBuffer=ee(I):this._bodyText=I=Object.prototype.toString.call(I):this._bodyText="",this.headers.get("content-type")||(typeof I=="string"?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):a.searchParams&&URLSearchParams.prototype.isPrototypeOf(I)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},a.blob&&(this.blob=function(){var I=b(this);if(I)return I;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?b(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(B)}),this.text=function(){var I=b(this);if(I)return I;if(this._bodyBlob)return $(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(W(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},a.formData&&(this.formData=function(){return this.text().then(ge)}),this.json=function(){return this.text().then(JSON.parse)},this}var z=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function H(I){var q=I.toUpperCase();return z.indexOf(q)>-1?q:I}function X(I,q){q=q||{};var E=q.body;if(I instanceof X){if(I.bodyUsed)throw new TypeError("Already read");this.url=I.url,this.credentials=I.credentials,q.headers||(this.headers=new g(I.headers)),this.method=I.method,this.mode=I.mode,this.signal=I.signal,!E&&I._bodyInit!=null&&(E=I._bodyInit,I.bodyUsed=!0)}else this.url=String(I);if(this.credentials=q.credentials||this.credentials||"same-origin",(q.headers||!this.headers)&&(this.headers=new g(q.headers)),this.method=H(q.method||this.method||"GET"),this.mode=q.mode||this.mode||null,this.signal=q.signal||this.signal,this.referrer=null,(this.method==="GET"||this.method==="HEAD")&&E)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(E)}X.prototype.clone=function(){return new X(this,{body:this._bodyInit})};function ge(I){var q=new FormData;return I.trim().split("&").forEach(function(E){if(E){var k=E.split("="),R=k.shift().replace(/\+/g," "),x=k.join("=").replace(/\+/g," ");q.append(decodeURIComponent(R),decodeURIComponent(x))}}),q}function Me(I){var q=new g,E=I.replace(/\r?\n[\t ]+/g," ");return E.split(/\r?\n/).forEach(function(k){var R=k.split(":"),x=R.shift().trim();if(x){var V=R.join(":").trim();q.append(x,V)}}),q}A.call(X.prototype);function De(I,q){q||(q={}),this.type="default",this.status=q.status===void 0?200:q.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in q?q.statusText:"OK",this.headers=new g(q.headers),this.url=q.url||"",this._initBody(I)}A.call(De.prototype),De.prototype.clone=function(){return new De(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new g(this.headers),url:this.url})},De.error=function(){var I=new De(null,{status:0,statusText:""});return I.type="error",I};var st=[301,302,303,307,308];De.redirect=function(I,q){if(st.indexOf(q)===-1)throw new RangeError("Invalid status code");return new De(null,{status:q,headers:{location:I}})},o.DOMException=s.DOMException;try{new o.DOMException}catch{o.DOMException=function(q,E){this.message=q,this.name=E;var k=Error(q);this.stack=k.stack},o.DOMException.prototype=Object.create(Error.prototype),o.DOMException.prototype.constructor=o.DOMException}function ot(I,q){return new Promise(function(E,k){var R=new X(I,q);if(R.signal&&R.signal.aborted)return k(new o.DOMException("Aborted","AbortError"));var x=new XMLHttpRequest;function V(){x.abort()}x.onload=function(){var M={status:x.status,statusText:x.statusText,headers:Me(x.getAllResponseHeaders()||"")};M.url="responseURL"in x?x.responseURL:M.headers.get("X-Request-URL");var le="response"in x?x.response:x.responseText;E(new De(le,M))},x.onerror=function(){k(new TypeError("Network request failed"))},x.ontimeout=function(){k(new TypeError("Network request failed"))},x.onabort=function(){k(new o.DOMException("Aborted","AbortError"))},x.open(R.method,R.url,!0),R.credentials==="include"?x.withCredentials=!0:R.credentials==="omit"&&(x.withCredentials=!1),"responseType"in x&&a.blob&&(x.responseType="blob"),R.headers.forEach(function(M,le){x.setRequestHeader(le,M)}),R.signal&&(R.signal.addEventListener("abort",V),x.onreadystatechange=function(){x.readyState===4&&R.signal.removeEventListener("abort",V)}),x.send(typeof R._bodyInit>"u"?null:R._bodyInit)})}return ot.polyfill=!0,s.fetch||(s.fetch=ot,s.Headers=g,s.Request=X,s.Response=De),o.Headers=g,o.Request=X,o.Response=De,o.fetch=ot,Object.defineProperty(o,"__esModule",{value:!0}),o})({})})(r),r.fetch.ponyfill=!0,delete r.fetch.polyfill;var i=r;e=i.fetch,e.default=i.fetch,e.fetch=i.fetch,e.Headers=i.Headers,e.Request=i.Request,e.Response=i.Response,n.exports=e})(ND,oa);function yo(n){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?yo=function(t){return typeof t}:yo=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},yo(n)}function AD(n){return yo(n)=="object"&&n!==null}var xv=typeof Symbol=="function"&&Symbol.toStringTag!=null?Symbol.toStringTag:"@@toStringTag";function Ku(n,e){for(var t=/\r\n|[\n\r]/g,r=1,i=e+1,s;(s=t.exec(n.body))&&s.index<e;)r+=1,i=e+1-(s.index+s[0].length);return{line:r,column:i}}function DD(n){return kv(n.source,Ku(n.source,n.start))}function kv(n,e){var t=n.locationOffset.column-1,r=_o(t)+n.body,i=e.line-1,s=n.locationOffset.line-1,o=e.line+s,a=e.line===1?t:0,c=e.column+a,u="".concat(n.name,":").concat(o,":").concat(c,`
`),l=r.split(/\r\n|[\n\r]/g),h=l[i];if(h.length>120){for(var d=Math.floor(c/80),m=c%80,g=[],b=0;b<h.length;b+=80)g.push(h.slice(b,b+80));return u+Np([["".concat(o),g[0]]].concat(g.slice(1,d+1).map(function(C){return["",C]}),[[" ",_o(m-1)+"^"],["",g[d+1]]]))}return u+Np([["".concat(o-1),l[i-1]],["".concat(o),h],["",_o(c-1)+"^"],["".concat(o+1),l[i+1]]])}function Np(n){var e=n.filter(function(r){r[0];var i=r[1];return i!==void 0}),t=Math.max.apply(Math,e.map(function(r){var i=r[0];return i.length}));return e.map(function(r){var i=r[0],s=r[1];return RD(t,i)+(s?" | "+s:" |")}).join(`
`)}function _o(n){return Array(n+1).join(" ")}function RD(n,e){return _o(n-e.length)+e}function vo(n){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?vo=function(t){return typeof t}:vo=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},vo(n)}function Ap(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(n,i).enumerable})),t.push.apply(t,r)}return t}function xD(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Ap(Object(t),!0).forEach(function(r){kD(n,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):Ap(Object(t)).forEach(function(r){Object.defineProperty(n,r,Object.getOwnPropertyDescriptor(t,r))})}return n}function kD(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function OD(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function Dp(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function PD(n,e,t){return e&&Dp(n.prototype,e),t&&Dp(n,t),n}function LD(n,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),e&&hs(n,e)}function MD(n){var e=Pv();return function(){var r=ds(n),i;if(e){var s=ds(this).constructor;i=Reflect.construct(r,arguments,s)}else i=r.apply(this,arguments);return Ov(this,i)}}function Ov(n,e){return e&&(vo(e)==="object"||typeof e=="function")?e:Mi(n)}function Mi(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function zu(n){var e=typeof Map=="function"?new Map:void 0;return zu=function(r){if(r===null||!FD(r))return r;if(typeof r!="function")throw new TypeError("Super expression must either be null or a function");if(typeof e<"u"){if(e.has(r))return e.get(r);e.set(r,i)}function i(){return wo(r,arguments,ds(this).constructor)}return i.prototype=Object.create(r.prototype,{constructor:{value:i,enumerable:!1,writable:!0,configurable:!0}}),hs(i,r)},zu(n)}function wo(n,e,t){return Pv()?wo=Reflect.construct:wo=function(i,s,o){var a=[null];a.push.apply(a,s);var c=Function.bind.apply(i,a),u=new c;return o&&hs(u,o.prototype),u},wo.apply(null,arguments)}function Pv(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch{return!1}}function FD(n){return Function.toString.call(n).indexOf("[native code]")!==-1}function hs(n,e){return hs=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},hs(n,e)}function ds(n){return ds=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},ds(n)}var UD=function(n){LD(t,n);var e=MD(t);function t(r,i,s,o,a,c,u){var l,h,d,m;OD(this,t),m=e.call(this,r),m.name="GraphQLError",m.originalError=c??void 0,m.nodes=Rp(Array.isArray(i)?i:i?[i]:void 0);for(var g=[],b=0,C=(B=m.nodes)!==null&&B!==void 0?B:[];b<C.length;b++){var B,$=C[b],W=$.loc;W!=null&&g.push(W)}g=Rp(g),m.source=s??((l=g)===null||l===void 0?void 0:l[0].source),m.positions=o??((h=g)===null||h===void 0?void 0:h.map(function(A){return A.start})),m.locations=o&&s?o.map(function(A){return Ku(s,A)}):(d=g)===null||d===void 0?void 0:d.map(function(A){return Ku(A.source,A.start)}),m.path=a??void 0;var ee=c==null?void 0:c.extensions;return u==null&&AD(ee)?m.extensions=xD({},ee):m.extensions=u??{},Object.defineProperties(Mi(m),{message:{enumerable:!0},locations:{enumerable:m.locations!=null},path:{enumerable:m.path!=null},extensions:{enumerable:m.extensions!=null&&Object.keys(m.extensions).length>0},name:{enumerable:!1},nodes:{enumerable:!1},source:{enumerable:!1},positions:{enumerable:!1},originalError:{enumerable:!1}}),c!=null&&c.stack?(Object.defineProperty(Mi(m),"stack",{value:c.stack,writable:!0,configurable:!0}),Ov(m)):(Error.captureStackTrace?Error.captureStackTrace(Mi(m),t):Object.defineProperty(Mi(m),"stack",{value:Error().stack,writable:!0,configurable:!0}),m)}return PD(t,[{key:"toString",value:function(){return BD(this)}},{key:xv,get:function(){return"Object"}}]),t}(zu(Error));function Rp(n){return n===void 0||n.length===0?void 0:n}function BD(n){var e=n.message;if(n.nodes)for(var t=0,r=n.nodes;t<r.length;t++){var i=r[t];i.loc&&(e+=`

`+DD(i.loc))}else if(n.source&&n.locations)for(var s=0,o=n.locations;s<o.length;s++){var a=o[s];e+=`

`+kv(n.source,a)}return e}function Pt(n,e,t){return new UD("Syntax Error: ".concat(t),void 0,n,[e])}var ie=Object.freeze({NAME:"Name",DOCUMENT:"Document",OPERATION_DEFINITION:"OperationDefinition",VARIABLE_DEFINITION:"VariableDefinition",SELECTION_SET:"SelectionSet",FIELD:"Field",ARGUMENT:"Argument",FRAGMENT_SPREAD:"FragmentSpread",INLINE_FRAGMENT:"InlineFragment",FRAGMENT_DEFINITION:"FragmentDefinition",VARIABLE:"Variable",INT:"IntValue",FLOAT:"FloatValue",STRING:"StringValue",BOOLEAN:"BooleanValue",NULL:"NullValue",ENUM:"EnumValue",LIST:"ListValue",OBJECT:"ObjectValue",OBJECT_FIELD:"ObjectField",DIRECTIVE:"Directive",NAMED_TYPE:"NamedType",LIST_TYPE:"ListType",NON_NULL_TYPE:"NonNullType",SCHEMA_DEFINITION:"SchemaDefinition",OPERATION_TYPE_DEFINITION:"OperationTypeDefinition",SCALAR_TYPE_DEFINITION:"ScalarTypeDefinition",OBJECT_TYPE_DEFINITION:"ObjectTypeDefinition",FIELD_DEFINITION:"FieldDefinition",INPUT_VALUE_DEFINITION:"InputValueDefinition",INTERFACE_TYPE_DEFINITION:"InterfaceTypeDefinition",UNION_TYPE_DEFINITION:"UnionTypeDefinition",ENUM_TYPE_DEFINITION:"EnumTypeDefinition",ENUM_VALUE_DEFINITION:"EnumValueDefinition",INPUT_OBJECT_TYPE_DEFINITION:"InputObjectTypeDefinition",DIRECTIVE_DEFINITION:"DirectiveDefinition",SCHEMA_EXTENSION:"SchemaExtension",SCALAR_TYPE_EXTENSION:"ScalarTypeExtension",OBJECT_TYPE_EXTENSION:"ObjectTypeExtension",INTERFACE_TYPE_EXTENSION:"InterfaceTypeExtension",UNION_TYPE_EXTENSION:"UnionTypeExtension",ENUM_TYPE_EXTENSION:"EnumTypeExtension",INPUT_OBJECT_TYPE_EXTENSION:"InputObjectTypeExtension"});function VD(n,e){var t=Boolean(n);if(!t)throw new Error(e??"Unexpected invariant triggered.")}var qD=typeof Symbol=="function"&&typeof Symbol.for=="function"?Symbol.for("nodejs.util.inspect.custom"):void 0;const Hu=qD;function Lv(n){var e=n.prototype.toJSON;typeof e=="function"||VD(0),n.prototype.inspect=e,Hu&&(n.prototype[Hu]=e)}var Mv=function(){function n(t,r,i){this.start=t.start,this.end=r.end,this.startToken=t,this.endToken=r,this.source=i}var e=n.prototype;return e.toJSON=function(){return{start:this.start,end:this.end}},n}();Lv(Mv);var Ve=function(){function n(t,r,i,s,o,a,c){this.kind=t,this.start=r,this.end=i,this.line=s,this.column=o,this.value=c,this.prev=a,this.next=null}var e=n.prototype;return e.toJSON=function(){return{kind:this.kind,value:this.value,line:this.line,column:this.column}},n}();Lv(Ve);function xp(n){return n!=null&&typeof n.kind=="string"}var N=Object.freeze({SOF:"<SOF>",EOF:"<EOF>",BANG:"!",DOLLAR:"$",AMP:"&",PAREN_L:"(",PAREN_R:")",SPREAD:"...",COLON:":",EQUALS:"=",AT:"@",BRACKET_L:"[",BRACKET_R:"]",BRACE_L:"{",PIPE:"|",BRACE_R:"}",NAME:"Name",INT:"Int",FLOAT:"Float",STRING:"String",BLOCK_STRING:"BlockString",COMMENT:"Comment"});function Eo(n){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Eo=function(t){return typeof t}:Eo=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Eo(n)}var jD=10,Fv=2;function Uv(n){return Za(n,[])}function Za(n,e){switch(Eo(n)){case"string":return JSON.stringify(n);case"function":return n.name?"[function ".concat(n.name,"]"):"[function]";case"object":return n===null?"null":$D(n,e);default:return String(n)}}function $D(n,e){if(e.indexOf(n)!==-1)return"[Circular]";var t=[].concat(e,[n]),r=zD(n);if(r!==void 0){var i=r.call(n);if(i!==n)return typeof i=="string"?i:Za(i,t)}else if(Array.isArray(n))return KD(n,t);return GD(n,t)}function GD(n,e){var t=Object.keys(n);if(t.length===0)return"{}";if(e.length>Fv)return"["+HD(n)+"]";var r=t.map(function(i){var s=Za(n[i],e);return i+": "+s});return"{ "+r.join(", ")+" }"}function KD(n,e){if(n.length===0)return"[]";if(e.length>Fv)return"[Array]";for(var t=Math.min(jD,n.length),r=n.length-t,i=[],s=0;s<t;++s)i.push(Za(n[s],e));return r===1?i.push("... 1 more item"):r>1&&i.push("... ".concat(r," more items")),"["+i.join(", ")+"]"}function zD(n){var e=n[String(Hu)];if(typeof e=="function")return e;if(typeof n.inspect=="function")return n.inspect}function HD(n){var e=Object.prototype.toString.call(n).replace(/^\[object /,"").replace(/]$/,"");if(e==="Object"&&typeof n.constructor=="function"){var t=n.constructor.name;if(typeof t=="string"&&t!=="")return t}return e}function Fc(n,e){var t=Boolean(n);if(!t)throw new Error(e)}const WD=function(e,t){return e instanceof t};function kp(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function QD(n,e,t){return e&&kp(n.prototype,e),t&&kp(n,t),n}var Bv=function(){function n(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"GraphQL request",r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{line:1,column:1};typeof e=="string"||Fc(0,"Body must be a string. Received: ".concat(Uv(e),".")),this.body=e,this.name=t,this.locationOffset=r,this.locationOffset.line>0||Fc(0,"line in locationOffset is 1-indexed and must be positive."),this.locationOffset.column>0||Fc(0,"column in locationOffset is 1-indexed and must be positive.")}return QD(n,[{key:xv,get:function(){return"Source"}}]),n}();function YD(n){return WD(n,Bv)}var XD=Object.freeze({QUERY:"QUERY",MUTATION:"MUTATION",SUBSCRIPTION:"SUBSCRIPTION",FIELD:"FIELD",FRAGMENT_DEFINITION:"FRAGMENT_DEFINITION",FRAGMENT_SPREAD:"FRAGMENT_SPREAD",INLINE_FRAGMENT:"INLINE_FRAGMENT",VARIABLE_DEFINITION:"VARIABLE_DEFINITION",SCHEMA:"SCHEMA",SCALAR:"SCALAR",OBJECT:"OBJECT",FIELD_DEFINITION:"FIELD_DEFINITION",ARGUMENT_DEFINITION:"ARGUMENT_DEFINITION",INTERFACE:"INTERFACE",UNION:"UNION",ENUM:"ENUM",ENUM_VALUE:"ENUM_VALUE",INPUT_OBJECT:"INPUT_OBJECT",INPUT_FIELD_DEFINITION:"INPUT_FIELD_DEFINITION"});function JD(n){var e=n.split(/\r\n|[\n\r]/g),t=ZD(n);if(t!==0)for(var r=1;r<e.length;r++)e[r]=e[r].slice(t);for(var i=0;i<e.length&&Op(e[i]);)++i;for(var s=e.length;s>i&&Op(e[s-1]);)--s;return e.slice(i,s).join(`
`)}function Op(n){for(var e=0;e<n.length;++e)if(n[e]!==" "&&n[e]!=="	")return!1;return!0}function ZD(n){for(var e,t=!0,r=!0,i=0,s=null,o=0;o<n.length;++o)switch(n.charCodeAt(o)){case 13:n.charCodeAt(o+1)===10&&++o;case 10:t=!1,r=!0,i=0;break;case 9:case 32:++i;break;default:r&&!t&&(s===null||i<s)&&(s=i),r=!1}return(e=s)!==null&&e!==void 0?e:0}function eR(n){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,r=n.indexOf(`
`)===-1,i=n[0]===" "||n[0]==="	",s=n[n.length-1]==='"',o=n[n.length-1]==="\\",a=!r||s||o||t,c="";return a&&!(r&&i)&&(c+=`
`+e),c+=e?n.replace(/\n/g,`
`+e):n,a&&(c+=`
`),'"""'+c.replace(/"""/g,'\\"""')+'"""'}var tR=function(){function n(t){var r=new Ve(N.SOF,0,0,0,0,null);this.source=t,this.lastToken=r,this.token=r,this.line=1,this.lineStart=0}var e=n.prototype;return e.advance=function(){this.lastToken=this.token;var r=this.token=this.lookahead();return r},e.lookahead=function(){var r=this.token;if(r.kind!==N.EOF)do{var i;r=(i=r.next)!==null&&i!==void 0?i:r.next=rR(this,r)}while(r.kind===N.COMMENT);return r},n}();function nR(n){return n===N.BANG||n===N.DOLLAR||n===N.AMP||n===N.PAREN_L||n===N.PAREN_R||n===N.SPREAD||n===N.COLON||n===N.EQUALS||n===N.AT||n===N.BRACKET_L||n===N.BRACKET_R||n===N.BRACE_L||n===N.PIPE||n===N.BRACE_R}function Tr(n){return isNaN(n)?N.EOF:n<127?JSON.stringify(String.fromCharCode(n)):'"\\u'.concat(("00"+n.toString(16).toUpperCase()).slice(-4),'"')}function rR(n,e){for(var t=n.source,r=t.body,i=r.length,s=e.end;s<i;){var o=r.charCodeAt(s),a=n.line,c=1+s-n.lineStart;switch(o){case 65279:case 9:case 32:case 44:++s;continue;case 10:++s,++n.line,n.lineStart=s;continue;case 13:r.charCodeAt(s+1)===10?s+=2:++s,++n.line,n.lineStart=s;continue;case 33:return new Ve(N.BANG,s,s+1,a,c,e);case 35:return sR(t,s,a,c,e);case 36:return new Ve(N.DOLLAR,s,s+1,a,c,e);case 38:return new Ve(N.AMP,s,s+1,a,c,e);case 40:return new Ve(N.PAREN_L,s,s+1,a,c,e);case 41:return new Ve(N.PAREN_R,s,s+1,a,c,e);case 46:if(r.charCodeAt(s+1)===46&&r.charCodeAt(s+2)===46)return new Ve(N.SPREAD,s,s+3,a,c,e);break;case 58:return new Ve(N.COLON,s,s+1,a,c,e);case 61:return new Ve(N.EQUALS,s,s+1,a,c,e);case 64:return new Ve(N.AT,s,s+1,a,c,e);case 91:return new Ve(N.BRACKET_L,s,s+1,a,c,e);case 93:return new Ve(N.BRACKET_R,s,s+1,a,c,e);case 123:return new Ve(N.BRACE_L,s,s+1,a,c,e);case 124:return new Ve(N.PIPE,s,s+1,a,c,e);case 125:return new Ve(N.BRACE_R,s,s+1,a,c,e);case 34:return r.charCodeAt(s+1)===34&&r.charCodeAt(s+2)===34?cR(t,s,a,c,e,n):aR(t,s,a,c,e);case 45:case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return oR(t,s,o,a,c,e);case 65:case 66:case 67:case 68:case 69:case 70:case 71:case 72:case 73:case 74:case 75:case 76:case 77:case 78:case 79:case 80:case 81:case 82:case 83:case 84:case 85:case 86:case 87:case 88:case 89:case 90:case 95:case 97:case 98:case 99:case 100:case 101:case 102:case 103:case 104:case 105:case 106:case 107:case 108:case 109:case 110:case 111:case 112:case 113:case 114:case 115:case 116:case 117:case 118:case 119:case 120:case 121:case 122:return lR(t,s,a,c,e)}throw Pt(t,s,iR(o))}var u=n.line,l=1+s-n.lineStart;return new Ve(N.EOF,i,i,u,l,e)}function iR(n){return n<32&&n!==9&&n!==10&&n!==13?"Cannot contain the invalid character ".concat(Tr(n),"."):n===39?`Unexpected single quote character ('), did you mean to use a double quote (")?`:"Cannot parse the unexpected character ".concat(Tr(n),".")}function sR(n,e,t,r,i){var s=n.body,o,a=e;do o=s.charCodeAt(++a);while(!isNaN(o)&&(o>31||o===9));return new Ve(N.COMMENT,e,a,t,r,i,s.slice(e+1,a))}function oR(n,e,t,r,i,s){var o=n.body,a=t,c=e,u=!1;if(a===45&&(a=o.charCodeAt(++c)),a===48){if(a=o.charCodeAt(++c),a>=48&&a<=57)throw Pt(n,c,"Invalid number, unexpected digit after 0: ".concat(Tr(a),"."))}else c=Uc(n,c,a),a=o.charCodeAt(c);if(a===46&&(u=!0,a=o.charCodeAt(++c),c=Uc(n,c,a),a=o.charCodeAt(c)),(a===69||a===101)&&(u=!0,a=o.charCodeAt(++c),(a===43||a===45)&&(a=o.charCodeAt(++c)),c=Uc(n,c,a),a=o.charCodeAt(c)),a===46||hR(a))throw Pt(n,c,"Invalid number, expected digit but got: ".concat(Tr(a),"."));return new Ve(u?N.FLOAT:N.INT,e,c,r,i,s,o.slice(e,c))}function Uc(n,e,t){var r=n.body,i=e,s=t;if(s>=48&&s<=57){do s=r.charCodeAt(++i);while(s>=48&&s<=57);return i}throw Pt(n,i,"Invalid number, expected digit but got: ".concat(Tr(s),"."))}function aR(n,e,t,r,i){for(var s=n.body,o=e+1,a=o,c=0,u="";o<s.length&&!isNaN(c=s.charCodeAt(o))&&c!==10&&c!==13;){if(c===34)return u+=s.slice(a,o),new Ve(N.STRING,e,o+1,t,r,i,u);if(c<32&&c!==9)throw Pt(n,o,"Invalid character within String: ".concat(Tr(c),"."));if(++o,c===92){switch(u+=s.slice(a,o-1),c=s.charCodeAt(o),c){case 34:u+='"';break;case 47:u+="/";break;case 92:u+="\\";break;case 98:u+="\b";break;case 102:u+="\f";break;case 110:u+=`
`;break;case 114:u+="\r";break;case 116:u+="	";break;case 117:{var l=uR(s.charCodeAt(o+1),s.charCodeAt(o+2),s.charCodeAt(o+3),s.charCodeAt(o+4));if(l<0){var h=s.slice(o+1,o+5);throw Pt(n,o,"Invalid character escape sequence: \\u".concat(h,"."))}u+=String.fromCharCode(l),o+=4;break}default:throw Pt(n,o,"Invalid character escape sequence: \\".concat(String.fromCharCode(c),"."))}++o,a=o}}throw Pt(n,o,"Unterminated string.")}function cR(n,e,t,r,i,s){for(var o=n.body,a=e+3,c=a,u=0,l="";a<o.length&&!isNaN(u=o.charCodeAt(a));){if(u===34&&o.charCodeAt(a+1)===34&&o.charCodeAt(a+2)===34)return l+=o.slice(c,a),new Ve(N.BLOCK_STRING,e,a+3,t,r,i,JD(l));if(u<32&&u!==9&&u!==10&&u!==13)throw Pt(n,a,"Invalid character within String: ".concat(Tr(u),"."));u===10?(++a,++s.line,s.lineStart=a):u===13?(o.charCodeAt(a+1)===10?a+=2:++a,++s.line,s.lineStart=a):u===92&&o.charCodeAt(a+1)===34&&o.charCodeAt(a+2)===34&&o.charCodeAt(a+3)===34?(l+=o.slice(c,a)+'"""',a+=4,c=a):++a}throw Pt(n,a,"Unterminated string.")}function uR(n,e,t,r){return so(n)<<12|so(e)<<8|so(t)<<4|so(r)}function so(n){return n>=48&&n<=57?n-48:n>=65&&n<=70?n-55:n>=97&&n<=102?n-87:-1}function lR(n,e,t,r,i){for(var s=n.body,o=s.length,a=e+1,c=0;a!==o&&!isNaN(c=s.charCodeAt(a))&&(c===95||c>=48&&c<=57||c>=65&&c<=90||c>=97&&c<=122);)++a;return new Ve(N.NAME,e,a,t,r,i,s.slice(e,a))}function hR(n){return n===95||n>=65&&n<=90||n>=97&&n<=122}function dR(n,e){var t=new ec(n,e);return t.parseDocument()}function fR(n,e){var t=new ec(n,e);t.expectToken(N.SOF);var r=t.parseValueLiteral(!1);return t.expectToken(N.EOF),r}function pR(n,e){var t=new ec(n,e);t.expectToken(N.SOF);var r=t.parseTypeReference();return t.expectToken(N.EOF),r}var ec=function(){function n(t,r){var i=YD(t)?t:new Bv(t);this._lexer=new tR(i),this._options=r}var e=n.prototype;return e.parseName=function(){var r=this.expectToken(N.NAME);return{kind:ie.NAME,value:r.value,loc:this.loc(r)}},e.parseDocument=function(){var r=this._lexer.token;return{kind:ie.DOCUMENT,definitions:this.many(N.SOF,this.parseDefinition,N.EOF),loc:this.loc(r)}},e.parseDefinition=function(){if(this.peek(N.NAME))switch(this._lexer.token.value){case"query":case"mutation":case"subscription":return this.parseOperationDefinition();case"fragment":return this.parseFragmentDefinition();case"schema":case"scalar":case"type":case"interface":case"union":case"enum":case"input":case"directive":return this.parseTypeSystemDefinition();case"extend":return this.parseTypeSystemExtension()}else{if(this.peek(N.BRACE_L))return this.parseOperationDefinition();if(this.peekDescription())return this.parseTypeSystemDefinition()}throw this.unexpected()},e.parseOperationDefinition=function(){var r=this._lexer.token;if(this.peek(N.BRACE_L))return{kind:ie.OPERATION_DEFINITION,operation:"query",name:void 0,variableDefinitions:[],directives:[],selectionSet:this.parseSelectionSet(),loc:this.loc(r)};var i=this.parseOperationType(),s;return this.peek(N.NAME)&&(s=this.parseName()),{kind:ie.OPERATION_DEFINITION,operation:i,name:s,variableDefinitions:this.parseVariableDefinitions(),directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet(),loc:this.loc(r)}},e.parseOperationType=function(){var r=this.expectToken(N.NAME);switch(r.value){case"query":return"query";case"mutation":return"mutation";case"subscription":return"subscription"}throw this.unexpected(r)},e.parseVariableDefinitions=function(){return this.optionalMany(N.PAREN_L,this.parseVariableDefinition,N.PAREN_R)},e.parseVariableDefinition=function(){var r=this._lexer.token;return{kind:ie.VARIABLE_DEFINITION,variable:this.parseVariable(),type:(this.expectToken(N.COLON),this.parseTypeReference()),defaultValue:this.expectOptionalToken(N.EQUALS)?this.parseValueLiteral(!0):void 0,directives:this.parseDirectives(!0),loc:this.loc(r)}},e.parseVariable=function(){var r=this._lexer.token;return this.expectToken(N.DOLLAR),{kind:ie.VARIABLE,name:this.parseName(),loc:this.loc(r)}},e.parseSelectionSet=function(){var r=this._lexer.token;return{kind:ie.SELECTION_SET,selections:this.many(N.BRACE_L,this.parseSelection,N.BRACE_R),loc:this.loc(r)}},e.parseSelection=function(){return this.peek(N.SPREAD)?this.parseFragment():this.parseField()},e.parseField=function(){var r=this._lexer.token,i=this.parseName(),s,o;return this.expectOptionalToken(N.COLON)?(s=i,o=this.parseName()):o=i,{kind:ie.FIELD,alias:s,name:o,arguments:this.parseArguments(!1),directives:this.parseDirectives(!1),selectionSet:this.peek(N.BRACE_L)?this.parseSelectionSet():void 0,loc:this.loc(r)}},e.parseArguments=function(r){var i=r?this.parseConstArgument:this.parseArgument;return this.optionalMany(N.PAREN_L,i,N.PAREN_R)},e.parseArgument=function(){var r=this._lexer.token,i=this.parseName();return this.expectToken(N.COLON),{kind:ie.ARGUMENT,name:i,value:this.parseValueLiteral(!1),loc:this.loc(r)}},e.parseConstArgument=function(){var r=this._lexer.token;return{kind:ie.ARGUMENT,name:this.parseName(),value:(this.expectToken(N.COLON),this.parseValueLiteral(!0)),loc:this.loc(r)}},e.parseFragment=function(){var r=this._lexer.token;this.expectToken(N.SPREAD);var i=this.expectOptionalKeyword("on");return!i&&this.peek(N.NAME)?{kind:ie.FRAGMENT_SPREAD,name:this.parseFragmentName(),directives:this.parseDirectives(!1),loc:this.loc(r)}:{kind:ie.INLINE_FRAGMENT,typeCondition:i?this.parseNamedType():void 0,directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet(),loc:this.loc(r)}},e.parseFragmentDefinition=function(){var r,i=this._lexer.token;return this.expectKeyword("fragment"),((r=this._options)===null||r===void 0?void 0:r.experimentalFragmentVariables)===!0?{kind:ie.FRAGMENT_DEFINITION,name:this.parseFragmentName(),variableDefinitions:this.parseVariableDefinitions(),typeCondition:(this.expectKeyword("on"),this.parseNamedType()),directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet(),loc:this.loc(i)}:{kind:ie.FRAGMENT_DEFINITION,name:this.parseFragmentName(),typeCondition:(this.expectKeyword("on"),this.parseNamedType()),directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet(),loc:this.loc(i)}},e.parseFragmentName=function(){if(this._lexer.token.value==="on")throw this.unexpected();return this.parseName()},e.parseValueLiteral=function(r){var i=this._lexer.token;switch(i.kind){case N.BRACKET_L:return this.parseList(r);case N.BRACE_L:return this.parseObject(r);case N.INT:return this._lexer.advance(),{kind:ie.INT,value:i.value,loc:this.loc(i)};case N.FLOAT:return this._lexer.advance(),{kind:ie.FLOAT,value:i.value,loc:this.loc(i)};case N.STRING:case N.BLOCK_STRING:return this.parseStringLiteral();case N.NAME:switch(this._lexer.advance(),i.value){case"true":return{kind:ie.BOOLEAN,value:!0,loc:this.loc(i)};case"false":return{kind:ie.BOOLEAN,value:!1,loc:this.loc(i)};case"null":return{kind:ie.NULL,loc:this.loc(i)};default:return{kind:ie.ENUM,value:i.value,loc:this.loc(i)}}case N.DOLLAR:if(!r)return this.parseVariable();break}throw this.unexpected()},e.parseStringLiteral=function(){var r=this._lexer.token;return this._lexer.advance(),{kind:ie.STRING,value:r.value,block:r.kind===N.BLOCK_STRING,loc:this.loc(r)}},e.parseList=function(r){var i=this,s=this._lexer.token,o=function(){return i.parseValueLiteral(r)};return{kind:ie.LIST,values:this.any(N.BRACKET_L,o,N.BRACKET_R),loc:this.loc(s)}},e.parseObject=function(r){var i=this,s=this._lexer.token,o=function(){return i.parseObjectField(r)};return{kind:ie.OBJECT,fields:this.any(N.BRACE_L,o,N.BRACE_R),loc:this.loc(s)}},e.parseObjectField=function(r){var i=this._lexer.token,s=this.parseName();return this.expectToken(N.COLON),{kind:ie.OBJECT_FIELD,name:s,value:this.parseValueLiteral(r),loc:this.loc(i)}},e.parseDirectives=function(r){for(var i=[];this.peek(N.AT);)i.push(this.parseDirective(r));return i},e.parseDirective=function(r){var i=this._lexer.token;return this.expectToken(N.AT),{kind:ie.DIRECTIVE,name:this.parseName(),arguments:this.parseArguments(r),loc:this.loc(i)}},e.parseTypeReference=function(){var r=this._lexer.token,i;return this.expectOptionalToken(N.BRACKET_L)?(i=this.parseTypeReference(),this.expectToken(N.BRACKET_R),i={kind:ie.LIST_TYPE,type:i,loc:this.loc(r)}):i=this.parseNamedType(),this.expectOptionalToken(N.BANG)?{kind:ie.NON_NULL_TYPE,type:i,loc:this.loc(r)}:i},e.parseNamedType=function(){var r=this._lexer.token;return{kind:ie.NAMED_TYPE,name:this.parseName(),loc:this.loc(r)}},e.parseTypeSystemDefinition=function(){var r=this.peekDescription()?this._lexer.lookahead():this._lexer.token;if(r.kind===N.NAME)switch(r.value){case"schema":return this.parseSchemaDefinition();case"scalar":return this.parseScalarTypeDefinition();case"type":return this.parseObjectTypeDefinition();case"interface":return this.parseInterfaceTypeDefinition();case"union":return this.parseUnionTypeDefinition();case"enum":return this.parseEnumTypeDefinition();case"input":return this.parseInputObjectTypeDefinition();case"directive":return this.parseDirectiveDefinition()}throw this.unexpected(r)},e.peekDescription=function(){return this.peek(N.STRING)||this.peek(N.BLOCK_STRING)},e.parseDescription=function(){if(this.peekDescription())return this.parseStringLiteral()},e.parseSchemaDefinition=function(){var r=this._lexer.token,i=this.parseDescription();this.expectKeyword("schema");var s=this.parseDirectives(!0),o=this.many(N.BRACE_L,this.parseOperationTypeDefinition,N.BRACE_R);return{kind:ie.SCHEMA_DEFINITION,description:i,directives:s,operationTypes:o,loc:this.loc(r)}},e.parseOperationTypeDefinition=function(){var r=this._lexer.token,i=this.parseOperationType();this.expectToken(N.COLON);var s=this.parseNamedType();return{kind:ie.OPERATION_TYPE_DEFINITION,operation:i,type:s,loc:this.loc(r)}},e.parseScalarTypeDefinition=function(){var r=this._lexer.token,i=this.parseDescription();this.expectKeyword("scalar");var s=this.parseName(),o=this.parseDirectives(!0);return{kind:ie.SCALAR_TYPE_DEFINITION,description:i,name:s,directives:o,loc:this.loc(r)}},e.parseObjectTypeDefinition=function(){var r=this._lexer.token,i=this.parseDescription();this.expectKeyword("type");var s=this.parseName(),o=this.parseImplementsInterfaces(),a=this.parseDirectives(!0),c=this.parseFieldsDefinition();return{kind:ie.OBJECT_TYPE_DEFINITION,description:i,name:s,interfaces:o,directives:a,fields:c,loc:this.loc(r)}},e.parseImplementsInterfaces=function(){var r;if(!this.expectOptionalKeyword("implements"))return[];if(((r=this._options)===null||r===void 0?void 0:r.allowLegacySDLImplementsInterfaces)===!0){var i=[];this.expectOptionalToken(N.AMP);do i.push(this.parseNamedType());while(this.expectOptionalToken(N.AMP)||this.peek(N.NAME));return i}return this.delimitedMany(N.AMP,this.parseNamedType)},e.parseFieldsDefinition=function(){var r;return((r=this._options)===null||r===void 0?void 0:r.allowLegacySDLEmptyFields)===!0&&this.peek(N.BRACE_L)&&this._lexer.lookahead().kind===N.BRACE_R?(this._lexer.advance(),this._lexer.advance(),[]):this.optionalMany(N.BRACE_L,this.parseFieldDefinition,N.BRACE_R)},e.parseFieldDefinition=function(){var r=this._lexer.token,i=this.parseDescription(),s=this.parseName(),o=this.parseArgumentDefs();this.expectToken(N.COLON);var a=this.parseTypeReference(),c=this.parseDirectives(!0);return{kind:ie.FIELD_DEFINITION,description:i,name:s,arguments:o,type:a,directives:c,loc:this.loc(r)}},e.parseArgumentDefs=function(){return this.optionalMany(N.PAREN_L,this.parseInputValueDef,N.PAREN_R)},e.parseInputValueDef=function(){var r=this._lexer.token,i=this.parseDescription(),s=this.parseName();this.expectToken(N.COLON);var o=this.parseTypeReference(),a;this.expectOptionalToken(N.EQUALS)&&(a=this.parseValueLiteral(!0));var c=this.parseDirectives(!0);return{kind:ie.INPUT_VALUE_DEFINITION,description:i,name:s,type:o,defaultValue:a,directives:c,loc:this.loc(r)}},e.parseInterfaceTypeDefinition=function(){var r=this._lexer.token,i=this.parseDescription();this.expectKeyword("interface");var s=this.parseName(),o=this.parseImplementsInterfaces(),a=this.parseDirectives(!0),c=this.parseFieldsDefinition();return{kind:ie.INTERFACE_TYPE_DEFINITION,description:i,name:s,interfaces:o,directives:a,fields:c,loc:this.loc(r)}},e.parseUnionTypeDefinition=function(){var r=this._lexer.token,i=this.parseDescription();this.expectKeyword("union");var s=this.parseName(),o=this.parseDirectives(!0),a=this.parseUnionMemberTypes();return{kind:ie.UNION_TYPE_DEFINITION,description:i,name:s,directives:o,types:a,loc:this.loc(r)}},e.parseUnionMemberTypes=function(){return this.expectOptionalToken(N.EQUALS)?this.delimitedMany(N.PIPE,this.parseNamedType):[]},e.parseEnumTypeDefinition=function(){var r=this._lexer.token,i=this.parseDescription();this.expectKeyword("enum");var s=this.parseName(),o=this.parseDirectives(!0),a=this.parseEnumValuesDefinition();return{kind:ie.ENUM_TYPE_DEFINITION,description:i,name:s,directives:o,values:a,loc:this.loc(r)}},e.parseEnumValuesDefinition=function(){return this.optionalMany(N.BRACE_L,this.parseEnumValueDefinition,N.BRACE_R)},e.parseEnumValueDefinition=function(){var r=this._lexer.token,i=this.parseDescription(),s=this.parseName(),o=this.parseDirectives(!0);return{kind:ie.ENUM_VALUE_DEFINITION,description:i,name:s,directives:o,loc:this.loc(r)}},e.parseInputObjectTypeDefinition=function(){var r=this._lexer.token,i=this.parseDescription();this.expectKeyword("input");var s=this.parseName(),o=this.parseDirectives(!0),a=this.parseInputFieldsDefinition();return{kind:ie.INPUT_OBJECT_TYPE_DEFINITION,description:i,name:s,directives:o,fields:a,loc:this.loc(r)}},e.parseInputFieldsDefinition=function(){return this.optionalMany(N.BRACE_L,this.parseInputValueDef,N.BRACE_R)},e.parseTypeSystemExtension=function(){var r=this._lexer.lookahead();if(r.kind===N.NAME)switch(r.value){case"schema":return this.parseSchemaExtension();case"scalar":return this.parseScalarTypeExtension();case"type":return this.parseObjectTypeExtension();case"interface":return this.parseInterfaceTypeExtension();case"union":return this.parseUnionTypeExtension();case"enum":return this.parseEnumTypeExtension();case"input":return this.parseInputObjectTypeExtension()}throw this.unexpected(r)},e.parseSchemaExtension=function(){var r=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("schema");var i=this.parseDirectives(!0),s=this.optionalMany(N.BRACE_L,this.parseOperationTypeDefinition,N.BRACE_R);if(i.length===0&&s.length===0)throw this.unexpected();return{kind:ie.SCHEMA_EXTENSION,directives:i,operationTypes:s,loc:this.loc(r)}},e.parseScalarTypeExtension=function(){var r=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("scalar");var i=this.parseName(),s=this.parseDirectives(!0);if(s.length===0)throw this.unexpected();return{kind:ie.SCALAR_TYPE_EXTENSION,name:i,directives:s,loc:this.loc(r)}},e.parseObjectTypeExtension=function(){var r=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("type");var i=this.parseName(),s=this.parseImplementsInterfaces(),o=this.parseDirectives(!0),a=this.parseFieldsDefinition();if(s.length===0&&o.length===0&&a.length===0)throw this.unexpected();return{kind:ie.OBJECT_TYPE_EXTENSION,name:i,interfaces:s,directives:o,fields:a,loc:this.loc(r)}},e.parseInterfaceTypeExtension=function(){var r=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("interface");var i=this.parseName(),s=this.parseImplementsInterfaces(),o=this.parseDirectives(!0),a=this.parseFieldsDefinition();if(s.length===0&&o.length===0&&a.length===0)throw this.unexpected();return{kind:ie.INTERFACE_TYPE_EXTENSION,name:i,interfaces:s,directives:o,fields:a,loc:this.loc(r)}},e.parseUnionTypeExtension=function(){var r=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("union");var i=this.parseName(),s=this.parseDirectives(!0),o=this.parseUnionMemberTypes();if(s.length===0&&o.length===0)throw this.unexpected();return{kind:ie.UNION_TYPE_EXTENSION,name:i,directives:s,types:o,loc:this.loc(r)}},e.parseEnumTypeExtension=function(){var r=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("enum");var i=this.parseName(),s=this.parseDirectives(!0),o=this.parseEnumValuesDefinition();if(s.length===0&&o.length===0)throw this.unexpected();return{kind:ie.ENUM_TYPE_EXTENSION,name:i,directives:s,values:o,loc:this.loc(r)}},e.parseInputObjectTypeExtension=function(){var r=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("input");var i=this.parseName(),s=this.parseDirectives(!0),o=this.parseInputFieldsDefinition();if(s.length===0&&o.length===0)throw this.unexpected();return{kind:ie.INPUT_OBJECT_TYPE_EXTENSION,name:i,directives:s,fields:o,loc:this.loc(r)}},e.parseDirectiveDefinition=function(){var r=this._lexer.token,i=this.parseDescription();this.expectKeyword("directive"),this.expectToken(N.AT);var s=this.parseName(),o=this.parseArgumentDefs(),a=this.expectOptionalKeyword("repeatable");this.expectKeyword("on");var c=this.parseDirectiveLocations();return{kind:ie.DIRECTIVE_DEFINITION,description:i,name:s,arguments:o,repeatable:a,locations:c,loc:this.loc(r)}},e.parseDirectiveLocations=function(){return this.delimitedMany(N.PIPE,this.parseDirectiveLocation)},e.parseDirectiveLocation=function(){var r=this._lexer.token,i=this.parseName();if(XD[i.value]!==void 0)return i;throw this.unexpected(r)},e.loc=function(r){var i;if(((i=this._options)===null||i===void 0?void 0:i.noLocation)!==!0)return new Mv(r,this._lexer.lastToken,this._lexer.source)},e.peek=function(r){return this._lexer.token.kind===r},e.expectToken=function(r){var i=this._lexer.token;if(i.kind===r)return this._lexer.advance(),i;throw Pt(this._lexer.source,i.start,"Expected ".concat(Vv(r),", found ").concat(Bc(i),"."))},e.expectOptionalToken=function(r){var i=this._lexer.token;if(i.kind===r)return this._lexer.advance(),i},e.expectKeyword=function(r){var i=this._lexer.token;if(i.kind===N.NAME&&i.value===r)this._lexer.advance();else throw Pt(this._lexer.source,i.start,'Expected "'.concat(r,'", found ').concat(Bc(i),"."))},e.expectOptionalKeyword=function(r){var i=this._lexer.token;return i.kind===N.NAME&&i.value===r?(this._lexer.advance(),!0):!1},e.unexpected=function(r){var i=r??this._lexer.token;return Pt(this._lexer.source,i.start,"Unexpected ".concat(Bc(i),"."))},e.any=function(r,i,s){this.expectToken(r);for(var o=[];!this.expectOptionalToken(s);)o.push(i.call(this));return o},e.optionalMany=function(r,i,s){if(this.expectOptionalToken(r)){var o=[];do o.push(i.call(this));while(!this.expectOptionalToken(s));return o}return[]},e.many=function(r,i,s){this.expectToken(r);var o=[];do o.push(i.call(this));while(!this.expectOptionalToken(s));return o},e.delimitedMany=function(r,i){this.expectOptionalToken(r);var s=[];do s.push(i.call(this));while(this.expectOptionalToken(r));return s},n}();function Bc(n){var e=n.value;return Vv(n.kind)+(e!=null?' "'.concat(e,'"'):"")}function Vv(n){return nR(n)?'"'.concat(n,'"'):n}const mR=Object.freeze(Object.defineProperty({__proto__:null,Parser:ec,parse:dR,parseType:pR,parseValue:fR},Symbol.toStringTag,{value:"Module"})),gR=Rv(mR);var yR={Name:[],Document:["definitions"],OperationDefinition:["name","variableDefinitions","directives","selectionSet"],VariableDefinition:["variable","type","defaultValue","directives"],Variable:["name"],SelectionSet:["selections"],Field:["alias","name","arguments","directives","selectionSet"],Argument:["name","value"],FragmentSpread:["name","directives"],InlineFragment:["typeCondition","directives","selectionSet"],FragmentDefinition:["name","variableDefinitions","typeCondition","directives","selectionSet"],IntValue:[],FloatValue:[],StringValue:[],BooleanValue:[],NullValue:[],EnumValue:[],ListValue:["values"],ObjectValue:["fields"],ObjectField:["name","value"],Directive:["name","arguments"],NamedType:["name"],ListType:["type"],NonNullType:["type"],SchemaDefinition:["description","directives","operationTypes"],OperationTypeDefinition:["type"],ScalarTypeDefinition:["description","name","directives"],ObjectTypeDefinition:["description","name","interfaces","directives","fields"],FieldDefinition:["description","name","arguments","type","directives"],InputValueDefinition:["description","name","type","defaultValue","directives"],InterfaceTypeDefinition:["description","name","interfaces","directives","fields"],UnionTypeDefinition:["description","name","directives","types"],EnumTypeDefinition:["description","name","directives","values"],EnumValueDefinition:["description","name","directives"],InputObjectTypeDefinition:["description","name","directives","fields"],DirectiveDefinition:["description","name","arguments","locations"],SchemaExtension:["directives","operationTypes"],ScalarTypeExtension:["name","directives"],ObjectTypeExtension:["name","interfaces","directives","fields"],InterfaceTypeExtension:["name","interfaces","directives","fields"],UnionTypeExtension:["name","directives","types"],EnumTypeExtension:["name","directives","values"],InputObjectTypeExtension:["name","directives","fields"]},_R=Object.freeze({});function vR(n,e){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:yR,r=void 0,i=Array.isArray(n),s=[n],o=-1,a=[],c=void 0,u=void 0,l=void 0,h=[],d=[],m=n;do{o++;var g=o===s.length,b=g&&a.length!==0;if(g){if(u=d.length===0?void 0:h[h.length-1],c=l,l=d.pop(),b){if(i)c=c.slice();else{for(var C={},B=0,$=Object.keys(c);B<$.length;B++){var W=$[B];C[W]=c[W]}c=C}for(var ee=0,A=0;A<a.length;A++){var z=a[A][0],H=a[A][1];i&&(z-=ee),i&&H===null?(c.splice(z,1),ee++):c[z]=H}}o=r.index,s=r.keys,a=r.edits,i=r.inArray,r=r.prev}else{if(u=l?i?o:s[o]:void 0,c=l?l[u]:m,c==null)continue;l&&h.push(u)}var X=void 0;if(!Array.isArray(c)){if(!xp(c))throw new Error("Invalid AST Node: ".concat(Uv(c),"."));var ge=wR(e,c.kind,g);if(ge){if(X=ge.call(e,c,u,l,h,d),X===_R)break;if(X===!1){if(!g){h.pop();continue}}else if(X!==void 0&&(a.push([u,X]),!g))if(xp(X))c=X;else{h.pop();continue}}}if(X===void 0&&b&&a.push([u,c]),g)h.pop();else{var Me;r={inArray:i,index:o,keys:s,edits:a,prev:r},i=Array.isArray(c),s=i?c:(Me=t[c.kind])!==null&&Me!==void 0?Me:[],o=-1,a=[],l&&d.push(l),l=c}}while(r!==void 0);return a.length!==0&&(m=a[a.length-1][1]),m}function wR(n,e,t){var r=n[e];if(r){if(!t&&typeof r=="function")return r;var i=t?r.leave:r.enter;if(typeof i=="function")return i}else{var s=t?n.leave:n.enter;if(s){if(typeof s=="function")return s;var o=s[e];if(typeof o=="function")return o}}}function ER(n){return vR(n,{leave:bR})}var TR=80,bR={Name:function(e){return e.value},Variable:function(e){return"$"+e.name},Document:function(e){return Q(e.definitions,`

`)+`
`},OperationDefinition:function(e){var t=e.operation,r=e.name,i=Fe("(",Q(e.variableDefinitions,", "),")"),s=Q(e.directives," "),o=e.selectionSet;return!r&&!s&&!i&&t==="query"?o:Q([t,Q([r,i]),s,o]," ")},VariableDefinition:function(e){var t=e.variable,r=e.type,i=e.defaultValue,s=e.directives;return t+": "+r+Fe(" = ",i)+Fe(" ",Q(s," "))},SelectionSet:function(e){var t=e.selections;return Qt(t)},Field:function(e){var t=e.alias,r=e.name,i=e.arguments,s=e.directives,o=e.selectionSet,a=Fe("",t,": ")+r,c=a+Fe("(",Q(i,", "),")");return c.length>TR&&(c=a+Fe(`(
`,To(Q(i,`
`)),`
)`)),Q([c,Q(s," "),o]," ")},Argument:function(e){var t=e.name,r=e.value;return t+": "+r},FragmentSpread:function(e){var t=e.name,r=e.directives;return"..."+t+Fe(" ",Q(r," "))},InlineFragment:function(e){var t=e.typeCondition,r=e.directives,i=e.selectionSet;return Q(["...",Fe("on ",t),Q(r," "),i]," ")},FragmentDefinition:function(e){var t=e.name,r=e.typeCondition,i=e.variableDefinitions,s=e.directives,o=e.selectionSet;return"fragment ".concat(t).concat(Fe("(",Q(i,", "),")")," ")+"on ".concat(r," ").concat(Fe("",Q(s," ")," "))+o},IntValue:function(e){var t=e.value;return t},FloatValue:function(e){var t=e.value;return t},StringValue:function(e,t){var r=e.value,i=e.block;return i?eR(r,t==="description"?"":"  "):JSON.stringify(r)},BooleanValue:function(e){var t=e.value;return t?"true":"false"},NullValue:function(){return"null"},EnumValue:function(e){var t=e.value;return t},ListValue:function(e){var t=e.values;return"["+Q(t,", ")+"]"},ObjectValue:function(e){var t=e.fields;return"{"+Q(t,", ")+"}"},ObjectField:function(e){var t=e.name,r=e.value;return t+": "+r},Directive:function(e){var t=e.name,r=e.arguments;return"@"+t+Fe("(",Q(r,", "),")")},NamedType:function(e){var t=e.name;return t},ListType:function(e){var t=e.type;return"["+t+"]"},NonNullType:function(e){var t=e.type;return t+"!"},SchemaDefinition:Wt(function(n){var e=n.directives,t=n.operationTypes;return Q(["schema",Q(e," "),Qt(t)]," ")}),OperationTypeDefinition:function(e){var t=e.operation,r=e.type;return t+": "+r},ScalarTypeDefinition:Wt(function(n){var e=n.name,t=n.directives;return Q(["scalar",e,Q(t," ")]," ")}),ObjectTypeDefinition:Wt(function(n){var e=n.name,t=n.interfaces,r=n.directives,i=n.fields;return Q(["type",e,Fe("implements ",Q(t," & ")),Q(r," "),Qt(i)]," ")}),FieldDefinition:Wt(function(n){var e=n.name,t=n.arguments,r=n.type,i=n.directives;return e+(Pp(t)?Fe(`(
`,To(Q(t,`
`)),`
)`):Fe("(",Q(t,", "),")"))+": "+r+Fe(" ",Q(i," "))}),InputValueDefinition:Wt(function(n){var e=n.name,t=n.type,r=n.defaultValue,i=n.directives;return Q([e+": "+t,Fe("= ",r),Q(i," ")]," ")}),InterfaceTypeDefinition:Wt(function(n){var e=n.name,t=n.interfaces,r=n.directives,i=n.fields;return Q(["interface",e,Fe("implements ",Q(t," & ")),Q(r," "),Qt(i)]," ")}),UnionTypeDefinition:Wt(function(n){var e=n.name,t=n.directives,r=n.types;return Q(["union",e,Q(t," "),r&&r.length!==0?"= "+Q(r," | "):""]," ")}),EnumTypeDefinition:Wt(function(n){var e=n.name,t=n.directives,r=n.values;return Q(["enum",e,Q(t," "),Qt(r)]," ")}),EnumValueDefinition:Wt(function(n){var e=n.name,t=n.directives;return Q([e,Q(t," ")]," ")}),InputObjectTypeDefinition:Wt(function(n){var e=n.name,t=n.directives,r=n.fields;return Q(["input",e,Q(t," "),Qt(r)]," ")}),DirectiveDefinition:Wt(function(n){var e=n.name,t=n.arguments,r=n.repeatable,i=n.locations;return"directive @"+e+(Pp(t)?Fe(`(
`,To(Q(t,`
`)),`
)`):Fe("(",Q(t,", "),")"))+(r?" repeatable":"")+" on "+Q(i," | ")}),SchemaExtension:function(e){var t=e.directives,r=e.operationTypes;return Q(["extend schema",Q(t," "),Qt(r)]," ")},ScalarTypeExtension:function(e){var t=e.name,r=e.directives;return Q(["extend scalar",t,Q(r," ")]," ")},ObjectTypeExtension:function(e){var t=e.name,r=e.interfaces,i=e.directives,s=e.fields;return Q(["extend type",t,Fe("implements ",Q(r," & ")),Q(i," "),Qt(s)]," ")},InterfaceTypeExtension:function(e){var t=e.name,r=e.interfaces,i=e.directives,s=e.fields;return Q(["extend interface",t,Fe("implements ",Q(r," & ")),Q(i," "),Qt(s)]," ")},UnionTypeExtension:function(e){var t=e.name,r=e.directives,i=e.types;return Q(["extend union",t,Q(r," "),i&&i.length!==0?"= "+Q(i," | "):""]," ")},EnumTypeExtension:function(e){var t=e.name,r=e.directives,i=e.values;return Q(["extend enum",t,Q(r," "),Qt(i)]," ")},InputObjectTypeExtension:function(e){var t=e.name,r=e.directives,i=e.fields;return Q(["extend input",t,Q(r," "),Qt(i)]," ")}};function Wt(n){return function(e){return Q([e.description,n(e)],`
`)}}function Q(n){var e,t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return(e=n==null?void 0:n.filter(function(r){return r}).join(t))!==null&&e!==void 0?e:""}function Qt(n){return Fe(`{
`,To(Q(n,`
`)),`
}`)}function Fe(n,e){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"";return e!=null&&e!==""?n+e+t:""}function To(n){return Fe("  ",n.replace(/\n/g,`
  `))}function IR(n){return n.indexOf(`
`)!==-1}function Pp(n){return n!=null&&n.some(IR)}const SR=Object.freeze(Object.defineProperty({__proto__:null,print:ER},Symbol.toStringTag,{value:"Module"})),CR=Rv(SR);var xh={},tc={},qv=function(e){var t=e.uri,r=e.name,i=e.type;this.uri=t,this.name=r,this.type=i},NR=qv,jv=function(e){return typeof File<"u"&&e instanceof File||typeof Blob<"u"&&e instanceof Blob||e instanceof NR},AR=jv,DR=function n(e,t,r){t===void 0&&(t=""),r===void 0&&(r=AR);var i,s=new Map;function o(l,h){var d=s.get(h);d?d.push.apply(d,l):s.set(h,l)}if(r(e))i=null,o([t],e);else{var a=t?t+".":"";if(typeof FileList<"u"&&e instanceof FileList)i=Array.prototype.map.call(e,function(l,h){return o([""+a+h],l),null});else if(Array.isArray(e))i=e.map(function(l,h){var d=n(l,""+a+h,r);return d.files.forEach(o),d.clone});else if(e&&e.constructor===Object){i={};for(var c in e){var u=n(e[c],""+a+c,r);u.files.forEach(o),i[c]=u.clone}}else i=e}return{clone:i,files:s}};tc.ReactNativeFile=qv;tc.extractFiles=DR;tc.isExtractableFile=jv;var RR=typeof self=="object"?self.FormData:window.FormData,qs={};Object.defineProperty(qs,"__esModule",{value:!0});qs.defaultJsonSerializer=void 0;qs.defaultJsonSerializer={parse:JSON.parse,stringify:JSON.stringify};var xR=Re&&Re.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(xh,"__esModule",{value:!0});var $v=tc,kR=xR(RR),OR=qs,PR=function(n){return $v.isExtractableFile(n)||n!==null&&typeof n=="object"&&typeof n.pipe=="function"};function LR(n,e,t,r){r===void 0&&(r=OR.defaultJsonSerializer);var i=$v.extractFiles({query:n,variables:e,operationName:t},"",PR),s=i.clone,o=i.files;if(o.size===0){if(!Array.isArray(n))return r.stringify(s);if(typeof e<"u"&&!Array.isArray(e))throw new Error("Cannot create request body with given variable type, array expected");var a=n.reduce(function(d,m,g){return d.push({query:m,variables:e?e[g]:void 0}),d},[]);return r.stringify(a)}var c=typeof FormData>"u"?kR.default:FormData,u=new c;u.append("operations",r.stringify(s));var l={},h=0;return o.forEach(function(d){l[++h]=d}),u.append("map",r.stringify(l)),h=0,o.forEach(function(d,m){u.append(""+ ++h,m)}),u}xh.default=LR;var Rt={};Object.defineProperty(Rt,"__esModule",{value:!0});Rt.parseBatchRequestsExtendedArgs=Rt.parseRawRequestExtendedArgs=Rt.parseRequestExtendedArgs=Rt.parseBatchRequestArgs=Rt.parseRawRequestArgs=Rt.parseRequestArgs=void 0;function MR(n,e,t){return n.document?n:{document:n,variables:e,requestHeaders:t,signal:void 0}}Rt.parseRequestArgs=MR;function FR(n,e,t){return n.query?n:{query:n,variables:e,requestHeaders:t,signal:void 0}}Rt.parseRawRequestArgs=FR;function UR(n,e){return n.documents?n:{documents:n,requestHeaders:e,signal:void 0}}Rt.parseBatchRequestArgs=UR;function BR(n,e,t,r){return n.document?n:{url:n,document:e,variables:t,requestHeaders:r,signal:void 0}}Rt.parseRequestExtendedArgs=BR;function VR(n,e,t,r){return n.query?n:{url:n,query:e,variables:t,requestHeaders:r,signal:void 0}}Rt.parseRawRequestExtendedArgs=VR;function qR(n,e,t){return n.documents?n:{url:n,documents:e,requestHeaders:t,signal:void 0}}Rt.parseBatchRequestsExtendedArgs=qR;var nc={},jR=Re&&Re.__extends||function(){var n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,i){r.__proto__=i}||function(r,i){for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(r[s]=i[s])},n(e,t)};return function(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");n(e,t);function r(){this.constructor=e}e.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)}}();Object.defineProperty(nc,"__esModule",{value:!0});nc.ClientError=void 0;var $R=function(n){jR(e,n);function e(t,r){var i=this,s=e.extractMessage(t)+": "+JSON.stringify({response:t,request:r});return i=n.call(this,s)||this,Object.setPrototypeOf(i,e.prototype),i.response=t,i.request=r,typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(i,e),i}return e.extractMessage=function(t){try{return t.errors[0].message}catch{return"GraphQL Error (Code: "+t.status+")"}},e}(Error);nc.ClientError=$R;(function(n){var e=Re&&Re.__assign||function(){return e=Object.assign||function(E){for(var k,R=1,x=arguments.length;R<x;R++){k=arguments[R];for(var V in k)Object.prototype.hasOwnProperty.call(k,V)&&(E[V]=k[V])}return E},e.apply(this,arguments)},t=Re&&Re.__createBinding||(Object.create?function(E,k,R,x){x===void 0&&(x=R),Object.defineProperty(E,x,{enumerable:!0,get:function(){return k[R]}})}:function(E,k,R,x){x===void 0&&(x=R),E[x]=k[R]}),r=Re&&Re.__setModuleDefault||(Object.create?function(E,k){Object.defineProperty(E,"default",{enumerable:!0,value:k})}:function(E,k){E.default=k}),i=Re&&Re.__importStar||function(E){if(E&&E.__esModule)return E;var k={};if(E!=null)for(var R in E)R!=="default"&&Object.prototype.hasOwnProperty.call(E,R)&&t(k,E,R);return r(k,E),k},s=Re&&Re.__awaiter||function(E,k,R,x){function V(M){return M instanceof R?M:new R(function(le){le(M)})}return new(R||(R=Promise))(function(M,le){function _e(Ae){try{te(x.next(Ae))}catch(He){le(He)}}function Ne(Ae){try{te(x.throw(Ae))}catch(He){le(He)}}function te(Ae){Ae.done?M(Ae.value):V(Ae.value).then(_e,Ne)}te((x=x.apply(E,k||[])).next())})},o=Re&&Re.__generator||function(E,k){var R={label:0,sent:function(){if(M[0]&1)throw M[1];return M[1]},trys:[],ops:[]},x,V,M,le;return le={next:_e(0),throw:_e(1),return:_e(2)},typeof Symbol=="function"&&(le[Symbol.iterator]=function(){return this}),le;function _e(te){return function(Ae){return Ne([te,Ae])}}function Ne(te){if(x)throw new TypeError("Generator is already executing.");for(;R;)try{if(x=1,V&&(M=te[0]&2?V.return:te[0]?V.throw||((M=V.return)&&M.call(V),0):V.next)&&!(M=M.call(V,te[1])).done)return M;switch(V=0,M&&(te=[te[0]&2,M.value]),te[0]){case 0:case 1:M=te;break;case 4:return R.label++,{value:te[1],done:!1};case 5:R.label++,V=te[1],te=[0];continue;case 7:te=R.ops.pop(),R.trys.pop();continue;default:if(M=R.trys,!(M=M.length>0&&M[M.length-1])&&(te[0]===6||te[0]===2)){R=0;continue}if(te[0]===3&&(!M||te[1]>M[0]&&te[1]<M[3])){R.label=te[1];break}if(te[0]===6&&R.label<M[1]){R.label=M[1],M=te;break}if(M&&R.label<M[2]){R.label=M[2],R.ops.push(te);break}M[2]&&R.ops.pop(),R.trys.pop();continue}te=k.call(E,R)}catch(Ae){te=[6,Ae],V=0}finally{x=M=0}if(te[0]&5)throw te[1];return{value:te[0]?te[1]:void 0,done:!0}}},a=Re&&Re.__rest||function(E,k){var R={};for(var x in E)Object.prototype.hasOwnProperty.call(E,x)&&k.indexOf(x)<0&&(R[x]=E[x]);if(E!=null&&typeof Object.getOwnPropertySymbols=="function")for(var V=0,x=Object.getOwnPropertySymbols(E);V<x.length;V++)k.indexOf(x[V])<0&&Object.prototype.propertyIsEnumerable.call(E,x[V])&&(R[x[V]]=E[x[V]]);return R},c=Re&&Re.__importDefault||function(E){return E&&E.__esModule?E:{default:E}};Object.defineProperty(n,"__esModule",{value:!0}),n.gql=n.batchRequests=n.request=n.rawRequest=n.GraphQLClient=n.ClientError=void 0;var u=i(oa),l=u,h=gR,d=CR,m=c(xh),g=qs,b=Rt,C=nc;Object.defineProperty(n,"ClientError",{enumerable:!0,get:function(){return C.ClientError}});var B=function(E){var k={};return E&&(typeof Headers<"u"&&E instanceof Headers||E instanceof l.Headers?k=q(E):Array.isArray(E)?E.forEach(function(R){var x=R[0],V=R[1];k[x]=V}):k=E),k},$=function(E){return E.replace(/([\s,]|#[^\n\r]+)+/g," ").trim()},W=function(E){var k=E.query,R=E.variables,x=E.operationName,V=E.jsonSerializer;if(!Array.isArray(k)){var M=["query="+encodeURIComponent($(k))];return R&&M.push("variables="+encodeURIComponent(V.stringify(R))),x&&M.push("operationName="+encodeURIComponent(x)),M.join("&")}if(typeof R<"u"&&!Array.isArray(R))throw new Error("Cannot create query with given variable type, array expected");var le=k.reduce(function(_e,Ne,te){return _e.push({query:$(Ne),variables:R?V.stringify(R[te]):void 0}),_e},[]);return"query="+encodeURIComponent(V.stringify(le))},ee=function(E){var k=E.url,R=E.query,x=E.variables,V=E.operationName,M=E.headers,le=E.fetch,_e=E.fetchOptions;return s(void 0,void 0,void 0,function(){var Ne;return o(this,function(te){switch(te.label){case 0:return Ne=m.default(R,x,V,_e.jsonSerializer),[4,le(k,e({method:"POST",headers:e(e({},typeof Ne=="string"?{"Content-Type":"application/json"}:{}),M),body:Ne},_e))];case 1:return[2,te.sent()]}})})},A=function(E){var k=E.url,R=E.query,x=E.variables,V=E.operationName,M=E.headers,le=E.fetch,_e=E.fetchOptions;return s(void 0,void 0,void 0,function(){var Ne;return o(this,function(te){switch(te.label){case 0:return Ne=W({query:R,variables:x,operationName:V,jsonSerializer:_e.jsonSerializer}),[4,le(k+"?"+Ne,e({method:"GET",headers:M},_e))];case 1:return[2,te.sent()]}})})},z=function(){function E(k,R){this.url=k,this.options=R||{}}return E.prototype.rawRequest=function(k,R,x){return s(this,void 0,void 0,function(){var V,M,le,_e,Ne,te,Ae,He,Je,Be;return o(this,function(Kt){return V=b.parseRawRequestArgs(k,R,x),M=this.options,le=M.headers,_e=M.fetch,Ne=_e===void 0?u.default:_e,te=M.method,Ae=te===void 0?"POST":te,He=a(M,["headers","fetch","method"]),Je=this.url,V.signal!==void 0&&(He.signal=V.signal),Be=ot(V.query).operationName,[2,H({url:Je,query:V.query,variables:V.variables,headers:e(e({},B(le)),B(V.requestHeaders)),operationName:Be,fetch:Ne,method:Ae,fetchOptions:He})]})})},E.prototype.request=function(k,R,x){return s(this,void 0,void 0,function(){var V,M,le,_e,Ne,te,Ae,He,Je,Be,Kt,nn,zt;return o(this,function(Ht){switch(Ht.label){case 0:return V=b.parseRequestArgs(k,R,x),M=this.options,le=M.headers,_e=M.fetch,Ne=_e===void 0?u.default:_e,te=M.method,Ae=te===void 0?"POST":te,He=a(M,["headers","fetch","method"]),Je=this.url,V.signal!==void 0&&(He.signal=V.signal),Be=ot(V.document),Kt=Be.query,nn=Be.operationName,[4,H({url:Je,query:Kt,variables:V.variables,headers:e(e({},B(le)),B(V.requestHeaders)),operationName:nn,fetch:Ne,method:Ae,fetchOptions:He})];case 1:return zt=Ht.sent().data,[2,zt]}})})},E.prototype.batchRequests=function(k,R){return s(this,void 0,void 0,function(){var x,V,M,le,_e,Ne,te,Ae,He,Je,Be,Kt;return o(this,function(nn){switch(nn.label){case 0:return x=b.parseBatchRequestArgs(k,R),V=this.options,M=V.headers,le=V.fetch,_e=le===void 0?u.default:le,Ne=V.method,te=Ne===void 0?"POST":Ne,Ae=a(V,["headers","fetch","method"]),He=this.url,x.signal!==void 0&&(Ae.signal=x.signal),Je=x.documents.map(function(zt){var Ht=zt.document;return ot(Ht).query}),Be=x.documents.map(function(zt){var Ht=zt.variables;return Ht}),[4,H({url:He,query:Je,variables:Be,headers:e(e({},B(M)),B(x.requestHeaders)),operationName:void 0,fetch:_e,method:te,fetchOptions:Ae})];case 1:return Kt=nn.sent().data,[2,Kt]}})})},E.prototype.setHeaders=function(k){return this.options.headers=k,this},E.prototype.setHeader=function(k,R){var x,V=this.options.headers;return V?V[k]=R:this.options.headers=(x={},x[k]=R,x),this},E.prototype.setEndpoint=function(k){return this.url=k,this},E}();n.GraphQLClient=z;function H(E){var k=E.url,R=E.query,x=E.variables,V=E.headers,M=E.operationName,le=E.fetch,_e=E.method,Ne=_e===void 0?"POST":_e,te=E.fetchOptions;return s(this,void 0,void 0,function(){var Ae,He,Je,Be,Kt,nn,zt,Ht;return o(this,function(mi){switch(mi.label){case 0:return Ae=Ne.toUpperCase()==="POST"?ee:A,He=Array.isArray(R),[4,Ae({url:k,query:R,variables:x,operationName:M,headers:V,fetch:le,fetchOptions:te})];case 1:return Je=mi.sent(),[4,De(Je,te.jsonSerializer)];case 2:if(Be=mi.sent(),Kt=He&&Array.isArray(Be)?!Be.some(function(rn){var rc=rn.data;return!rc}):!!Be.data,Je.ok&&!Be.errors&&Kt)return nn=Je.headers,zt=Je.status,[2,e(e({},He?{data:Be}:Be),{headers:nn,status:zt})];throw Ht=typeof Be=="string"?{error:Be}:Be,new C.ClientError(e(e({},Ht),{status:Je.status,headers:Je.headers}),{query:R,variables:x})}})})}function X(E,k,R,x){return s(this,void 0,void 0,function(){var V,M;return o(this,function(le){return V=b.parseRawRequestExtendedArgs(E,k,R,x),M=new z(V.url),[2,M.rawRequest(e({},V))]})})}n.rawRequest=X;function ge(E,k,R,x){return s(this,void 0,void 0,function(){var V,M;return o(this,function(le){return V=b.parseRequestExtendedArgs(E,k,R,x),M=new z(V.url),[2,M.request(e({},V))]})})}n.request=ge;function Me(E,k,R){return s(this,void 0,void 0,function(){var x,V;return o(this,function(M){return x=b.parseBatchRequestsExtendedArgs(E,k,R),V=new z(x.url),[2,V.batchRequests(e({},x))]})})}n.batchRequests=Me,n.default=ge;function De(E,k){return k===void 0&&(k=g.defaultJsonSerializer),s(this,void 0,void 0,function(){var R,x,V;return o(this,function(M){switch(M.label){case 0:return E.headers.forEach(function(le,_e){_e.toLowerCase()==="content-type"&&(R=le)}),R&&R.toLowerCase().startsWith("application/json")?(V=(x=k).parse,[4,E.text()]):[3,2];case 1:return[2,V.apply(x,[M.sent()])];case 2:return[2,E.text()]}})})}function st(E){var k,R=void 0,x=E.definitions.filter(function(V){return V.kind==="OperationDefinition"});return x.length===1&&(R=(k=x[0].name)===null||k===void 0?void 0:k.value),R}function ot(E){if(typeof E=="string"){var k=void 0;try{var R=h.parse(E);k=st(R)}catch{}return{query:E,operationName:k}}var x=st(E);return{query:d.print(E),operationName:x}}function I(E){for(var k=[],R=1;R<arguments.length;R++)k[R-1]=arguments[R];return E.reduce(function(x,V,M){return""+x+V+(M in k?k[M]:"")},"")}n.gql=I;function q(E){var k={};return E.forEach(function(R,x){k[x]=R}),k}})(Gu);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gv="firebasestorage.googleapis.com",Kv="storageBucket",GR=2*60*1e3,KR=10*60*1e3,zR=1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke extends fn{constructor(e,t,r=0){super(Vc(e),`Firebase Storage: ${t} (${Vc(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Ke.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Vc(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Le;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Le||(Le={}));function Vc(n){return"storage/"+n}function kh(){const n="An unknown error occurred, please check the error payload for server response.";return new Ke(Le.UNKNOWN,n)}function HR(n){return new Ke(Le.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function WR(n){return new Ke(Le.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function QR(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Ke(Le.UNAUTHENTICATED,n)}function YR(){return new Ke(Le.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function XR(n){return new Ke(Le.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function zv(){return new Ke(Le.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Hv(){return new Ke(Le.CANCELED,"User canceled the upload/download.")}function JR(n){return new Ke(Le.INVALID_URL,"Invalid URL '"+n+"'.")}function ZR(n){return new Ke(Le.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function ex(){return new Ke(Le.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Kv+"' property when initializing the app?")}function Wv(){return new Ke(Le.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function tx(){return new Ke(Le.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.")}function nx(n){return new Ke(Le.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Wu(n){return new Ke(Le.INVALID_ARGUMENT,n)}function Qv(){return new Ke(Le.APP_DELETED,"The Firebase app was deleted.")}function rx(n){return new Ke(Le.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Hi(n,e){return new Ke(Le.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function Di(n){throw new Ke(Le.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=Lt.makeFromUrl(e,t)}catch{return new Lt(e,"")}if(r.path==="")return r;throw ZR(e)}static makeFromUrl(e,t){let r=null;const i="([A-Za-z0-9.\\-_]+)";function s(ee){ee.path.charAt(ee.path.length-1)==="/"&&(ee.path_=ee.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+i+o,"i"),c={bucket:1,path:3};function u(ee){ee.path_=decodeURIComponent(ee.path)}const l="v[A-Za-z0-9_]+",h=t.replace(/[.]/g,"\\."),d="(/([^?#]*).*)?$",m=new RegExp(`^https?://${h}/${l}/b/${i}/o${d}`,"i"),g={bucket:1,path:3},b=t===Gv?"(?:storage.googleapis.com|storage.cloud.google.com)":t,C="([^?#]*)",B=new RegExp(`^https?://${b}/${i}/${C}`,"i"),W=[{regex:a,indices:c,postModify:s},{regex:m,indices:g,postModify:u},{regex:B,indices:{bucket:1,path:2},postModify:u}];for(let ee=0;ee<W.length;ee++){const A=W[ee],z=A.regex.exec(e);if(z){const H=z[A.indices.bucket];let X=z[A.indices.path];X||(X=""),r=new Lt(H,X),A.postModify(r);break}}if(r==null)throw JR(e);return r}}class ix{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sx(n,e,t){let r=1,i=null,s=null,o=!1,a=0;function c(){return a===2}let u=!1;function l(...C){u||(u=!0,e.apply(null,C))}function h(C){i=setTimeout(()=>{i=null,n(m,c())},C)}function d(){s&&clearTimeout(s)}function m(C,...B){if(u){d();return}if(C){d(),l.call(null,C,...B);return}if(c()||o){d(),l.call(null,C,...B);return}r<64&&(r*=2);let W;a===1?(a=2,W=0):W=(r+Math.random())*1e3,h(W)}let g=!1;function b(C){g||(g=!0,d(),!u&&(i!==null?(C||(a=2),clearTimeout(i),h(0)):C||(a=1)))}return h(0),s=setTimeout(()=>{o=!0,b(!0)},t),b}function ox(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ax(n){return n!==void 0}function cx(n){return typeof n=="function"}function ux(n){return typeof n=="object"&&!Array.isArray(n)}function Oh(n){return typeof n=="string"||n instanceof String}function Lp(n){return Ph()&&n instanceof Blob}function Ph(){return typeof Blob<"u"&&!Qp()}function Mp(n,e,t,r){if(r<e)throw Wu(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw Wu(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lh(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function lx(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const i=e(r)+"="+e(n[r]);t=t+i+"&"}return t=t.slice(0,-1),t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ar;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(ar||(ar={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yv(n,e){const t=n>=500&&n<600,i=[408,429].indexOf(n)!==-1,s=e.indexOf(n)!==-1;return t||i||s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hx{constructor(e,t,r,i,s,o,a,c,u,l,h,d=!0){this.url_=e,this.method_=t,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=c,this.timeout_=u,this.progressCallback_=l,this.connectionFactory_=h,this.retry=d,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((m,g)=>{this.resolve_=m,this.reject_=g,this.start_()})}start_(){const e=(r,i)=>{if(i){r(!1,new oo(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=a=>{const c=a.loaded,u=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,u)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const a=s.getErrorCode()===ar.NO_ERROR,c=s.getStatus();if(!a||Yv(c,this.additionalRetryCodes_)&&this.retry){const l=s.getErrorCode()===ar.ABORT;r(!1,new oo(!1,null,l));return}const u=this.successCodes_.indexOf(c)!==-1;r(!0,new oo(u,s))})},t=(r,i)=>{const s=this.resolve_,o=this.reject_,a=i.connection;if(i.wasSuccessCode)try{const c=this.callback_(a,a.getResponse());ax(c)?s(c):s()}catch(c){o(c)}else if(a!==null){const c=kh();c.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,c)):o(c)}else if(i.canceled){const c=this.appDelete_?Qv():Hv();o(c)}else{const c=zv();o(c)}};this.canceled_?t(!1,new oo(!1,null,!0)):this.backoffId_=sx(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&ox(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class oo{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function dx(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function fx(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function px(n,e){e&&(n["X-Firebase-GMPID"]=e)}function mx(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function gx(n,e,t,r,i,s,o=!0){const a=lx(n.urlParams),c=n.url+a,u=Object.assign({},n.headers);return px(u,e),dx(u,t),fx(u,s),mx(u,r),new hx(c,n.method,u,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,i,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yx(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function _x(...n){const e=yx();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(Ph())return new Blob(n);throw new Ke(Le.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function vx(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wx(n){if(typeof atob>"u")throw nx("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const un={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class qc{constructor(e,t){this.data=e,this.contentType=t||null}}function Ex(n,e){switch(n){case un.RAW:return new qc(Xv(e));case un.BASE64:case un.BASE64URL:return new qc(Jv(n,e));case un.DATA_URL:return new qc(bx(e),Ix(e))}throw kh()}function Xv(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const s=r,o=n.charCodeAt(++t);r=65536|(s&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function Tx(n){let e;try{e=decodeURIComponent(n)}catch{throw Hi(un.DATA_URL,"Malformed data URL.")}return Xv(e)}function Jv(n,e){switch(n){case un.BASE64:{const i=e.indexOf("-")!==-1,s=e.indexOf("_")!==-1;if(i||s)throw Hi(n,"Invalid character '"+(i?"-":"_")+"' found: is it base64url encoded?");break}case un.BASE64URL:{const i=e.indexOf("+")!==-1,s=e.indexOf("/")!==-1;if(i||s)throw Hi(n,"Invalid character '"+(i?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=wx(e)}catch(i){throw i.message.includes("polyfill")?i:Hi(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}class Zv{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw Hi(un.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=Sx(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function bx(n){const e=new Zv(n);return e.base64?Jv(un.BASE64,e.rest):Tx(e.rest)}function Ix(n){return new Zv(n).contentType}function Sx(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(e,t){let r=0,i="";Lp(e)?(this.data_=e,r=e.size,i=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=i}size(){return this.size_}type(){return this.type_}slice(e,t){if(Lp(this.data_)){const r=this.data_,i=vx(r,e,t);return i===null?null:new Nn(i)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new Nn(r,!0)}}static getBlob(...e){if(Ph()){const t=e.map(r=>r instanceof Nn?r.data_:r);return new Nn(_x.apply(null,t))}else{const t=e.map(o=>Oh(o)?Ex(un.RAW,o).data:o.data_);let r=0;t.forEach(o=>{r+=o.byteLength});const i=new Uint8Array(r);let s=0;return t.forEach(o=>{for(let a=0;a<o.length;a++)i[s++]=o[a]}),new Nn(i,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cx(n){let e;try{e=JSON.parse(n)}catch{return null}return ux(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nx(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function Ax(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function ew(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dx(n,e){return e}class Tt{constructor(e,t,r,i){this.server=e,this.local=t||e,this.writable=!!r,this.xform=i||Dx}}let ao=null;function Rx(n){return!Oh(n)||n.length<2?n:ew(n)}function xx(){if(ao)return ao;const n=[];n.push(new Tt("bucket")),n.push(new Tt("generation")),n.push(new Tt("metageneration")),n.push(new Tt("name","fullPath",!0));function e(s,o){return Rx(o)}const t=new Tt("name");t.xform=e,n.push(t);function r(s,o){return o!==void 0?Number(o):o}const i=new Tt("size");return i.xform=r,n.push(i),n.push(new Tt("timeCreated")),n.push(new Tt("updated")),n.push(new Tt("md5Hash",null,!0)),n.push(new Tt("cacheControl",null,!0)),n.push(new Tt("contentDisposition",null,!0)),n.push(new Tt("contentEncoding",null,!0)),n.push(new Tt("contentLanguage",null,!0)),n.push(new Tt("contentType",null,!0)),n.push(new Tt("metadata","customMetadata",!0)),ao=n,ao}function kx(n,e){function t(){const r=n.bucket,i=n.fullPath,s=new Lt(r,i);return e._makeStorageReference(s)}Object.defineProperty(n,"ref",{get:t})}function Ox(n,e,t){const r={};r.type="file";const i=t.length;for(let s=0;s<i;s++){const o=t[s];r[o.local]=o.xform(r,e[o.server])}return kx(r,n),r}function Px(n,e,t){const r=Cx(e);return r===null?null:Ox(n,r,t)}function tw(n,e){const t={},r=e.length;for(let i=0;i<r;i++){const s=e[i];s.writable&&(t[s.server]=n[s.local])}return JSON.stringify(t)}class js{constructor(e,t,r,i){this.url=e,this.method=t,this.handler=r,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pn(n){if(!n)throw kh()}function Mh(n,e){function t(r,i){const s=Px(n,i,e);return Pn(s!==null),s}return t}function $s(n){function e(t,r){let i;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?i=YR():i=QR():t.getStatus()===402?i=WR(n.bucket):t.getStatus()===403?i=XR(n.path):i=r,i.status=t.getStatus(),i.serverResponse=r.serverResponse,i}return e}function Lx(n){const e=$s(n);function t(r,i){let s=e(r,i);return r.getStatus()===404&&(s=HR(n.path)),s.serverResponse=i.serverResponse,s}return t}function Mx(n,e,t){const r=e.fullServerUrl(),i=Lh(r,n.host,n._protocol),s="GET",o=n.maxOperationRetryTime,a=new js(i,s,Mh(n,t),o);return a.errorHandler=Lx(e),a}function Fx(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function nw(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=Fx(null,e)),r}function Ux(n,e,t,r,i){const s=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function a(){let W="";for(let ee=0;ee<2;ee++)W=W+Math.random().toString().slice(2);return W}const c=a();o["Content-Type"]="multipart/related; boundary="+c;const u=nw(e,r,i),l=tw(u,t),h="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+l+`\r
--`+c+`\r
Content-Type: `+u.contentType+`\r
\r
`,d=`\r
--`+c+"--",m=Nn.getBlob(h,r,d);if(m===null)throw Wv();const g={name:u.fullPath},b=Lh(s,n.host,n._protocol),C="POST",B=n.maxUploadRetryTime,$=new js(b,C,Mh(n,t),B);return $.urlParams=g,$.headers=o,$.body=m.uploadData(),$.errorHandler=$s(e),$}class aa{constructor(e,t,r,i){this.current=e,this.total=t,this.finalized=!!r,this.metadata=i||null}}function Fh(n,e){let t=null;try{t=n.getResponseHeader("X-Goog-Upload-Status")}catch{Pn(!1)}return Pn(!!t&&(e||["active"]).indexOf(t)!==-1),t}function Bx(n,e,t,r,i){const s=e.bucketOnlyServerUrl(),o=nw(e,r,i),a={name:o.fullPath},c=Lh(s,n.host,n._protocol),u="POST",l={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${r.size()}`,"X-Goog-Upload-Header-Content-Type":o.contentType,"Content-Type":"application/json; charset=utf-8"},h=tw(o,t),d=n.maxUploadRetryTime;function m(b){Fh(b);let C;try{C=b.getResponseHeader("X-Goog-Upload-URL")}catch{Pn(!1)}return Pn(Oh(C)),C}const g=new js(c,u,m,d);return g.urlParams=a,g.headers=l,g.body=h,g.errorHandler=$s(e),g}function Vx(n,e,t,r){const i={"X-Goog-Upload-Command":"query"};function s(u){const l=Fh(u,["active","final"]);let h=null;try{h=u.getResponseHeader("X-Goog-Upload-Size-Received")}catch{Pn(!1)}h||Pn(!1);const d=Number(h);return Pn(!isNaN(d)),new aa(d,r.size(),l==="final")}const o="POST",a=n.maxUploadRetryTime,c=new js(t,o,s,a);return c.headers=i,c.errorHandler=$s(e),c}const Fp=256*1024;function qx(n,e,t,r,i,s,o,a){const c=new aa(0,0);if(o?(c.current=o.current,c.total=o.total):(c.current=0,c.total=r.size()),r.size()!==c.total)throw tx();const u=c.total-c.current;let l=u;i>0&&(l=Math.min(l,i));const h=c.current,d=h+l;let m="";l===0?m="finalize":u===l?m="upload, finalize":m="upload";const g={"X-Goog-Upload-Command":m,"X-Goog-Upload-Offset":`${c.current}`},b=r.slice(h,d);if(b===null)throw Wv();function C(ee,A){const z=Fh(ee,["active","final"]),H=c.current+l,X=r.size();let ge;return z==="final"?ge=Mh(e,s)(ee,A):ge=null,new aa(H,X,z==="final",ge)}const B="POST",$=e.maxUploadRetryTime,W=new js(t,B,C,$);return W.headers=g,W.body=b.uploadData(),W.progressCallback=a||null,W.errorHandler=$s(n),W}const Dt={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function jc(n){switch(n){case"running":case"pausing":case"canceling":return Dt.RUNNING;case"paused":return Dt.PAUSED;case"success":return Dt.SUCCESS;case"canceled":return Dt.CANCELED;case"error":return Dt.ERROR;default:return Dt.ERROR}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jx{constructor(e,t,r){if(cx(e)||t!=null||r!=null)this.next=e,this.error=t??void 0,this.complete=r??void 0;else{const s=e;this.next=s.next,this.error=s.error,this.complete=s.complete}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pr(n){return(...e)=>{Promise.resolve().then(()=>n(...e))}}class $x{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=ar.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=ar.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=ar.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,i){if(this.sent_)throw Di("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),i!==void 0)for(const s in i)i.hasOwnProperty(s)&&this.xhr_.setRequestHeader(s,i[s].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Di("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Di("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw Di("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Di("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class Gx extends $x{initXhr(){this.xhr_.responseType="text"}}function Ri(){return new Gx}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kx{constructor(e,t,r=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=r,this._mappings=xx(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=i=>{if(this._request=void 0,this._chunkMultiplier=1,i._codeEquals(Le.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{const s=this.isExponentialBackoffExpired();if(Yv(i.status,[]))if(s)i=zv();else{this.sleepTime=Math.max(this.sleepTime*2,zR),this._needToFetchStatus=!0,this.completeTransitions_();return}this._error=i,this._transition("error")}},this._metadataErrorHandler=i=>{this._request=void 0,i._codeEquals(Le.CANCELED)?this.completeTransitions_():(this._error=i,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((i,s)=>{this._resolve=i,this._reject=s,this._start()}),this._promise.then(null,()=>{})}isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}_makeProgressCallback(){const e=this._transferred;return t=>this._updateProgress(e+t)}_shouldDoResumable(e){return e.size()>256*1024}_start(){this._state==="running"&&this._request===void 0&&(this._resumable?this._uploadUrl===void 0?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([t,r])=>{switch(this._state){case"running":e(t,r);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused");break}})}_createResumable(){this._resolveToken((e,t)=>{const r=Bx(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),i=this._ref.storage._makeRequest(r,Ri,e,t);this._request=i,i.getPromise().then(s=>{this._request=void 0,this._uploadUrl=s,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){const e=this._uploadUrl;this._resolveToken((t,r)=>{const i=Vx(this._ref.storage,this._ref._location,e,this._blob),s=this._ref.storage._makeRequest(i,Ri,t,r);this._request=s,s.getPromise().then(o=>{o=o,this._request=void 0,this._updateProgress(o.current),this._needToFetchStatus=!1,o.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){const e=Fp*this._chunkMultiplier,t=new aa(this._transferred,this._blob.size()),r=this._uploadUrl;this._resolveToken((i,s)=>{let o;try{o=qx(this._ref._location,this._ref.storage,r,this._blob,e,this._mappings,t,this._makeProgressCallback())}catch(c){this._error=c,this._transition("error");return}const a=this._ref.storage._makeRequest(o,Ri,i,s,!1);this._request=a,a.getPromise().then(c=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(c.current),c.finalized?(this._metadata=c.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){Fp*this._chunkMultiplier*2<32*1024*1024&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((e,t)=>{const r=Mx(this._ref.storage,this._ref._location,this._mappings),i=this._ref.storage._makeRequest(r,Ri,e,t);this._request=i,i.getPromise().then(s=>{this._request=void 0,this._metadata=s,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((e,t)=>{const r=Ux(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),i=this._ref.storage._makeRequest(r,Ri,e,t);this._request=i,i.getPromise().then(s=>{this._request=void 0,this._metadata=s,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(e){const t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,this._request!==void 0?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const t=this._state==="paused";this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":this._state=e,this._notifyObservers();break;case"canceled":this._error=Hv(),this._state=e,this._notifyObservers();break;case"error":this._state=e,this._notifyObservers();break;case"success":this._state=e,this._notifyObservers();break}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start();break}}get snapshot(){const e=jc(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,t,r,i){const s=new jx(t||void 0,r||void 0,i||void 0);return this._addObserver(s),()=>{this._removeObserver(s)}}then(e,t){return this._promise.then(e,t)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){const t=this._observers.indexOf(e);t!==-1&&this._observers.splice(t,1)}_notifyObservers(){this._finishPromise(),this._observers.slice().forEach(t=>{this._notifyObserver(t)})}_finishPromise(){if(this._resolve!==void 0){let e=!0;switch(jc(this._state)){case Dt.SUCCESS:Pr(this._resolve.bind(null,this.snapshot))();break;case Dt.CANCELED:case Dt.ERROR:const t=this._reject;Pr(t.bind(null,this._error))();break;default:e=!1;break}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch(jc(this._state)){case Dt.RUNNING:case Dt.PAUSED:e.next&&Pr(e.next.bind(e,this.snapshot))();break;case Dt.SUCCESS:e.complete&&Pr(e.complete.bind(e))();break;case Dt.CANCELED:case Dt.ERROR:e.error&&Pr(e.error.bind(e,this._error))();break;default:e.error&&Pr(e.error.bind(e,this._error))()}}resume(){const e=this._state==="paused"||this._state==="pausing";return e&&this._transition("running"),e}pause(){const e=this._state==="running";return e&&this._transition("pausing"),e}cancel(){const e=this._state==="running"||this._state==="pausing";return e&&this._transition("canceling"),e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(e,t){this._service=e,t instanceof Lt?this._location=t:this._location=Lt.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new br(e,t)}get root(){const e=new Lt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return ew(this._location.path)}get storage(){return this._service}get parent(){const e=Nx(this._location.path);if(e===null)return null;const t=new Lt(this._location.bucket,e);return new br(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw rx(e)}}function zx(n,e,t){return n._throwIfRoot("uploadBytesResumable"),new Kx(n,new Nn(e),t)}function Hx(n,e){const t=Ax(n._location.path,e),r=new Lt(n._location.bucket,t);return new br(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wx(n){return/^[A-Za-z]+:\/\//.test(n)}function Qx(n,e){return new br(n,e)}function rw(n,e){if(n instanceof Uh){const t=n;if(t._bucket==null)throw ex();const r=new br(t,t._bucket);return e!=null?rw(r,e):r}else return e!==void 0?Hx(n,e):n}function Yx(n,e){if(e&&Wx(e)){if(n instanceof Uh)return Qx(n,e);throw Wu("To use ref(service, url), the first argument must be a Storage instance.")}else return rw(n,e)}function Up(n,e){const t=e==null?void 0:e[Kv];return t==null?null:Lt.makeFromBucketSpec(t,n)}function Xx(n,e,t,r={}){n.host=`${e}:${t}`,n._protocol="http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:Wp(i,n.app.options.projectId))}class Uh{constructor(e,t,r,i,s){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._bucket=null,this._host=Gv,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=GR,this._maxUploadRetryTime=KR,this._requests=new Set,i!=null?this._bucket=Lt.makeFromBucketSpec(i,this._host):this._bucket=Up(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Lt.makeFromBucketSpec(this._url,e):this._bucket=Up(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Mp("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Mp("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new br(this,e)}_makeRequest(e,t,r,i,s=!0){if(this._deleted)return new ix(Qv());{const o=gx(e,this._appId,r,i,t,this._firebaseVersion,s);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,i).getPromise()}}const Bp="@firebase/storage",Vp="0.11.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iw="storage";function Jx(n,e,t){return n=$e(n),zx(n,e,t)}function Zx(n,e){return n=$e(n),Yx(n,e)}function ek(n=tl(),e){n=$e(n);const r=ha(n,iw).getImmediate({identifier:e}),i=Yu("storage");return i&&tk(r,...i),r}function tk(n,e,t,r={}){Xx(n,e,t,r)}function nk(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new Uh(t,r,i,e,ps)}function rk(){_n(new ln(iw,nk,"PUBLIC").setMultipleInstances(!0)),Mt(Bp,Vp,""),Mt(Bp,Vp,"esm2017")}rk();async function ik(n,e){var i;const t={event:n==null?void 0:n.event,target:(n==null?void 0:n.target)||((i=n==null?void 0:n.event)==null?void 0:i.target),error:n==null?void 0:n.error,name:n==null?void 0:n.name,endpoint:n==null?void 0:n.endpoint,bubbles:!!(n!=null&&n.bubbles),cancelable:!!(n!=null&&n.cancelable),composed:!!(n!=null&&n.composed),cached:!!(n!=null&&n.cached)};typeof(e==null?void 0:e.onError)=="function"&&e.onError(t),((t==null?void 0:t.target)||document).dispatchEvent(new CustomEvent("fireenjinError",{detail:t,bubbles:!!(n!=null&&n.bubbles),cancelable:!!(n!=null&&n.cancelable),composed:!!(n!=null&&n.composed)}))}async function sk(n,e){let t=e||{};if(n){const r=Object.keys(n);for(const i of r)try{t[n[i]]=i.split(".").reduce((s,o)=>s[o],e)}catch{continue}}return t}async function ok(n,e){var i;const t={event:n==null?void 0:n.event,target:(n==null?void 0:n.target)||((i=n==null?void 0:n.event)==null?void 0:i.target),data:(n==null?void 0:n.data)||null,name:n==null?void 0:n.name,endpoint:n==null?void 0:n.endpoint,bubbles:!!(n!=null&&n.bubbles),cancelable:!!(n!=null&&n.cancelable),composed:!!(n!=null&&n.composed),cached:!!(n!=null&&n.cached)};if(n!=null&&n.dataPropsMap)try{t.data=await sk(n==null?void 0:n.dataPropsMap,n==null?void 0:n.data)}catch{console.log("Error setting data props"),typeof(e==null?void 0:e.onError)=="function"&&e.onError(t)}typeof(e==null?void 0:e.onSuccess)=="function"&&e.onSuccess(t),((t==null?void 0:t.target)||document).dispatchEvent(new CustomEvent("fireenjinSuccess",{detail:t,bubbles:!!(n!=null&&n.bubbles),cancelable:!!(n!=null&&n.cancelable),composed:!!(n!=null&&n.composed)}))}async function $c(n,e){var r;const t={cached:!!(e!=null&&e.cached),event:e==null?void 0:e.event,name:e==null?void 0:e.name,endpoint:e==null?void 0:e.endpoint,bubbles:(e==null?void 0:e.bubbles)??!0,cancelable:(e==null?void 0:e.cancelable)??!0,composed:!!(e!=null&&e.composed),target:(e==null?void 0:e.target)||((r=e==null?void 0:e.event)==null?void 0:r.target)};try{const i=await n();return await ok({...t,data:i},{onSuccess:e==null?void 0:e.onSuccess,onError:e==null?void 0:e.onError}),i}catch(i){await ik({...t,error:i},{onError:e==null?void 0:e.onError});return}}const ak=(n,e)=>typeof n=="object"?Object.keys(n).map(t=>(e?encodeURIComponent(t):t)+"="+e?encodeURIComponent(n[t]):n[t]).join("&"):"";class qp{constructor(e,t){ft(this,"url");ft(this,"options");this.url=e||"http://localhost:4000",this.options=t||{}}async rawRequest(e,t,r){var c,u,l;const i=(r==null?void 0:r.method)||((c=this.options)==null?void 0:c.method)||"GET",s=(r==null?void 0:r.headers)||((u=this.options)==null?void 0:u.headers)||{},o=`${this.url}/${e}${i==="get"?ak(t):""}`,a=await fetch(`${this.url}/${o}`,{method:i,...this.options||{},...r||{},headers:s,body:i==="get"?null:JSON.stringify(t||{})});return{data:await((l=a==null?void 0:a.json)==null?void 0:l.call(a))||null,headers:a.headers,status:a.status,extensions:{}}}async request(e,t,r){var a,c;const i=(r==null?void 0:r.method)||((a=this.options)==null?void 0:a.method)||"GET",s=(r==null?void 0:r.headers)||((c=this.options)==null?void 0:c.headers)||{};return(await fetch(`${this.url}/${e}`,{method:i,...this.options||{},...r||{},headers:s,body:!["get","post"].includes(i.toLowerCase())&&JSON.stringify(t||{})||null})).json()}async batchRequests(e,t){const r={};for(const{document:i,variables:s}of e)try{r[i]=await this.request(i,s,t)}catch{r[i]=null}return r}setEndpoint(e){return this.url=e,!0}setHeader(e,t){var r;return this.options||(this.options={}),(r=this.options)!=null&&r.headers||(this.options.headers={}),this.options.headers[e]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}}function jp(n){const e=r=>r&&typeof r=="object"&&!Array.isArray(r)&&!t(r)?{...Object.keys(r).reduce((i,s)=>(i[s]=e(r[s]),i),{})}:r;function t(r){return!!(r&&Object.getPrototypeOf(r).toMillis&&Object.getPrototypeOf(r).constructor.name==="Timestamp")}return e(n)}class $p{constructor(e,t){ft(this,"url");ft(this,"db");ft(this,"options");this.url=e||"http://localhost:4000",this.options={...t,headers:(t==null?void 0:t.headers)||{}},this.db=t==null?void 0:t.db}async rawRequest(e,t={},r){var c;const i=(r==null?void 0:r.method)||"GET",s=(r==null?void 0:r.headers)||((c=this.options)==null?void 0:c.headers)||{},o=e,a=await(i.toLowerCase()==="post"?this.db.add(o,jp((t==null?void 0:t.data)||{}),t==null?void 0:t.id):i.toLowerCase()==="put"?this.db.update(o,t.id,jp((t==null?void 0:t.data)||{})):i.toLowerCase()==="delete"?this.db.delete(o,t==null?void 0:t.id):t!=null&&t.id?this.db.find(o,t.id):this.db.list(o,(t==null?void 0:t.where)||[],t==null?void 0:t.orderBy,t==null?void 0:t.limit));return{data:a,headers:s,extensions:{query:a==null?void 0:a.query,metadata:a==null?void 0:a.metadata,size:a==null?void 0:a.size},status:200}}async request(e,t,r){const i=await this.rawRequest(e,t,r);return(i==null?void 0:i.data)||null}async batchRequests(e,t){const r={};for(const{document:i,variables:s}of e)try{r[i]=await this.request(i,s,t)}catch{r[i]=null}return r}setEndpoint(e){return this.url=e,!0}setHeader(e,t){var i;const r=((i=this.options)==null?void 0:i.headers)||{};return r[e]=t,this.options.headers=r,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}}class ck{constructor(e){ft(this,"client");ft(this,"sdk",{});ft(this,"host",{url:"http://localhost:4000"});ft(this,"currentConnection",0);ft(this,"options");ft(this,"storage");var r,i,s,o,a,c,u,l,h,d,m,g,b,C;this.options=e||{};const t={Authorization:e!=null&&e.token?`Bearer ${e.token}`:"",...e.headers?e.headers:{}};this.host=(r=e==null?void 0:e.connections)!=null&&r.length?this.setConnection(0):{url:e.host,type:"rest",headers:t},this.storage=((i=this.options)==null?void 0:i.storage)||((o=(s=this.host)==null?void 0:s.db)==null?void 0:o.app)&&ek((c=(a=this.host)==null?void 0:a.db)==null?void 0:c.app),this.client=this.host.type==="graphql"?new Gu.GraphQLClient(((u=this.host)==null?void 0:u.url)||"http://localhost:4000",{headers:((l=this.host)==null?void 0:l.headers)||{}}):((h=this.host)==null?void 0:h.type)==="firebase"?new $p(this.host.url,{db:(d=this.host)!=null&&d.db?this.host.db:new SD({emulate:!!(e!=null&&e.emulate),config:(m=this.host)==null?void 0:m.auth})}):new qp(this.host.url,{headers:((g=this.host)==null?void 0:g.headers)||{}}),this.sdk=typeof(e==null?void 0:e.getSdk)=="function"?e.getSdk(this.client,(b=this.options)==null?void 0:b.onRequest):null,(C=this.options)!=null&&C.debug&&console.log("fireenjinStart:",{host:this.host,headers:t,storage:this.storage,client:this.client,sdk:this.sdk}),document&&(document.addEventListener("fireenjinUpload",this.onUpload.bind(this)),document.addEventListener("fireenjinSubmit",this.onSubmit.bind(this)),document.addEventListener("fireenjinFetch",this.onFetch.bind(this)),e!=null&&e.debug&&(document.addEventListener("fireenjinSuccess",B=>{console.log("fireenjinSuccess: ",B)}),document.addEventListener("fireenjinError",B=>{console.log("fireenjinError: ",B)}),document.addEventListener("fireenjinTrigger",B=>{console.log("fireenjinTrigger: ",B)}),document.addEventListener("fireenjinReset",B=>{console.log("fireenjinReset: ",B)}),document.addEventListener("fireenjinValidation",B=>{console.log("fireenjinValidation: ",B)}),document.addEventListener("fireenjinProgress",B=>{console.log("fireenjinProgress: ",B)})))}async onUpload(e){var r,i,s,o,a,c,u,l,h,d,m,g,b,C,B,$;if((r=this.options)!=null&&r.debug&&console.log("fireenjinUpload: ",e),typeof((i=this.options)==null?void 0:i.onUpload)=="function")return this.options.onUpload(e),!1;const t=await this.upload({data:{id:(s=e.detail.data)==null?void 0:s.id,path:(o=e.detail.data)==null?void 0:o.path,fileName:(a=e.detail.data)==null?void 0:a.fileName,file:(c=this.options)!=null&&c.uploadFileEncoding?(u=e.detail.data)==null?void 0:u.encodedContent:(l=e.detail.data)==null?void 0:l.file,type:(h=e.detail.data)==null?void 0:h.type}},{event:e,target:((d=e==null?void 0:e.detail)==null?void 0:d.target)||(e==null?void 0:e.target),name:(m=e==null?void 0:e.detail)==null?void 0:m.name,endpoint:(g=e==null?void 0:e.detail)==null?void 0:g.endpoint,bubbles:(b=e==null?void 0:e.detail)==null?void 0:b.bubbles,cancelable:(C=e==null?void 0:e.detail)==null?void 0:C.cancelable,composed:(B=e==null?void 0:e.detail)==null?void 0:B.composed,method:($=e==null?void 0:e.detail)==null?void 0:$.method});return e!=null&&e.target&&(e.target.value=(t==null?void 0:t.url)||null),t}async onSubmit(e){var r,i,s,o,a,c,u,l,h,d,m;if((r=this.options)!=null&&r.debug&&console.log("fireenjinSubmit: ",e),!e||!e.detail||!e.detail.endpoint||e.detail.disableSubmit)return!1;const t=((i=e==null?void 0:e.detail)==null?void 0:i.target)||(e==null?void 0:e.target);return this.submit(e.detail.endpoint,{id:(s=e==null?void 0:e.detail)==null?void 0:s.id,data:(o=e==null?void 0:e.detail)==null?void 0:o.data,params:(a=e==null?void 0:e.detail)==null?void 0:a.params,query:(c=e==null?void 0:e.detail)==null?void 0:c.query},{event:e,target:t,name:(u=e==null?void 0:e.detail)==null?void 0:u.name,bubbles:(l=e==null?void 0:e.detail)==null?void 0:l.bubbles,cancelable:(h=e==null?void 0:e.detail)==null?void 0:h.cancelable,composed:(d=e==null?void 0:e.detail)==null?void 0:d.composed,method:((m=e==null?void 0:e.detail)==null?void 0:m.method)||(t==null?void 0:t.method)})}async onFetch(e){var r,i,s,o,a,c,u,l,h,d,m;if((r=this.options)!=null&&r.debug&&console.log("fireenjinFetch: ",e),!e||!e.detail||!e.detail.endpoint||e.detail.disableFetch)return!1;const t=((i=e==null?void 0:e.detail)==null?void 0:i.target)||(e==null?void 0:e.target);return this.fetch(e.detail.endpoint,((s=e==null?void 0:e.detail)==null?void 0:s.params)||{},{event:e,target:t,dataPropsMap:(o=e==null?void 0:e.detail)==null?void 0:o.dataPropsMap,name:(a=e==null?void 0:e.detail)==null?void 0:a.name,cacheKey:(c=e==null?void 0:e.detail)==null?void 0:c.cacheKey,disableCache:!!((u=e==null?void 0:e.detail)!=null&&u.disableCache),bubbles:(l=e==null?void 0:e.detail)==null?void 0:l.bubbles,cancelable:(h=e==null?void 0:e.detail)==null?void 0:h.cancelable,composed:(d=e==null?void 0:e.detail)==null?void 0:d.composed,method:((m=e==null?void 0:e.detail)==null?void 0:m.method)||(t==null?void 0:t.method)})}hash(e){var t=0,r,i;if(e.length===0)return t;for(r=0;r<e.length;r++)i=e.charCodeAt(r),t=(t<<5)-t+i,t|=0;return t}async upload(e,t){var o,a,c;const r=(t==null?void 0:t.endpoint)||"upload",i=(t==null?void 0:t.method)||"post",s=(t==null?void 0:t.target)||((o=t==null?void 0:t.event)==null?void 0:o.target)||document;return $c(async()=>{var u,l,h,d,m,g;return this.storage?this.uploadFile((u=e==null?void 0:e.data)==null?void 0:u.file,{fileName:(l=e==null?void 0:e.data)==null?void 0:l.fileName,path:(h=e==null?void 0:e.data)==null?void 0:h.path,target:s},t):((d=this.host)==null?void 0:d.type)==="graphql"&&!((m=this.options)!=null&&m.uploadUrl)?e!=null&&e.query?this.client.request(e.query,e.params,{method:i}):this.sdk[r]((e==null?void 0:e.params)||{id:e==null?void 0:e.id,data:e==null?void 0:e.data}):this.client.request(((g=this.options)==null?void 0:g.uploadUrl)||r,e,{method:i})},{event:(t==null?void 0:t.event)||null,target:s,name:(t==null?void 0:t.name)||r,bubbles:t==null?void 0:t.bubbles,cancelable:t==null?void 0:t.cancelable,composed:t==null?void 0:t.composed,endpoint:r,cached:!0,onError:(a=this.options)==null?void 0:a.onError,onSuccess:(c=this.options)==null?void 0:c.onSuccess})}async fetch(e,t,r){var l,h,d,m;let i=null;const s=(r==null?void 0:r.event)||null,o=(r==null?void 0:r.name)||null,a=(r==null?void 0:r.method)||"get",c=r!=null&&r.cacheKey?r.cacheKey:`${e}_${t!=null&&t.id?`${t.id}:`:t!=null&&t.params?this.hash(JSON.stringify(Object.values(t.params))):""}${this.hash(JSON.stringify(t||{}))}`;try{i=await $u.getItem(c)}catch{console.log("No Local data found")}const u=((l=this.host)==null?void 0:l.type)==="graphql"?t!=null&&t.query?this.client.request(t==null?void 0:t.query,t==null?void 0:t.params,{method:a}):this.sdk[e](t,r==null?void 0:r.headers):this.client.request(e,t,{method:a});return i=await $c(async()=>{var g;return typeof((g=this.options)==null?void 0:g.onFetch)=="function"&&this.options.onFetch(e,t,{...r,fn:u})||u},{endpoint:e,event:s,target:(r==null?void 0:r.target)||((h=r==null?void 0:r.event)==null?void 0:h.target),name:o,cached:!1,bubbles:r==null?void 0:r.bubbles,cancelable:r==null?void 0:r.cancelable,composed:r==null?void 0:r.composed,onError:(d=this.options)==null?void 0:d.onError,onSuccess:(m=this.options)==null?void 0:m.onSuccess}),i}async submit(e,t,r){var c,u,l;const i=(r==null?void 0:r.event)||null,s=(r==null?void 0:r.name)||null,o=(r==null?void 0:r.method)||"post",a=((c=this.host)==null?void 0:c.type)==="graphql"?t!=null&&t.query?this.client.request(t.query,t.params,{method:o}):this.sdk[e]((t==null?void 0:t.params)||{id:t==null?void 0:t.id,data:t==null?void 0:t.data}):this.client.request(e,t,{method:t!=null&&t.id?"put":"post"});return $c(async()=>{var h;return typeof((h=this.options)==null?void 0:h.onSubmit)=="function"&&this.options.onSubmit(e,t,{...r,fn:a})||a},{endpoint:e,event:i,target:(r==null?void 0:r.target)||(i==null?void 0:i.target),name:s,cached:!1,bubbles:r==null?void 0:r.bubbles,cancelable:r==null?void 0:r.cancelable,composed:r==null?void 0:r.composed,onError:(u=this.options)==null?void 0:u.onError,onSuccess:(l=this.options)==null?void 0:l.onSuccess})}setHeader(e,t){var r;return this.client?((r=this.host)!=null&&r.headers||(this.host.headers={}),this.host.headers[e]=t,this.client.setHeader(e,t)):!1}setHeaders(e){return this.client?this.client.setHeaders(e):!1}setConnection(e){var t,r,i,s,o,a,c,u,l,h,d,m,g,b,C,B;return this.host=typeof e=="string"?(((t=this.options)==null?void 0:t.connections)||[]).find(($,W)=>{if(($==null?void 0:$.name)===e||($==null?void 0:$.url)===e)return this.currentConnection=W,$}):(i=(r=this.options)==null?void 0:r.connections)==null?void 0:i[e],(s=this.host)!=null&&s.name||(this.host.name="default"),(o=this.host)!=null&&o.type||(this.host.type=typeof((a=this.options)==null?void 0:a.getSdk)=="function"?"graphql":(c=this.host)!=null&&c.db||(l=(u=this.host)==null?void 0:u.auth)!=null&&l.databaseURL?"firebase":"rest"),this.host.headers={...((h=this.host)==null?void 0:h.headers)||{},...((d=this.options)==null?void 0:d.headers)||{}},this.client=this.host.type==="graphql"?new Gu.GraphQLClient(((m=this.host)==null?void 0:m.url)||"http://localhost:4000",{headers:((g=this.host)==null?void 0:g.headers)||{}}):((b=this.host)==null?void 0:b.type)==="firebase"?new $p(this.host.url,{db:this.host.db}):new qp(this.host.url,{headers:((C=this.host)==null?void 0:C.headers)||{}}),this.client.setEndpoint(((B=this.host)==null?void 0:B.url)||"http://localhost:4000"),this.host}async uploadFile(e,t,r){if(!this.storage)return;const i=(t==null?void 0:t.path)||"/",s=(t==null?void 0:t.fileName)||(e==null?void 0:e.name),o=Zx(this.storage,i+s),a=Jx(o,e),c=(t==null?void 0:t.onProgress)||this.options.onProgress,u=(r==null?void 0:r.target)||(t==null?void 0:t.target)||document;return a.on("state_changed",l=>{const h={bubbles:!0,cancelable:!0,detail:{bubbles:!0,cancelable:!0,composed:!1,endpoint:(r==null?void 0:r.endpoint)||"upload",event:(t==null?void 0:t.event)||(r==null?void 0:r.event),method:(r==null?void 0:r.method)||"post",name:(r==null?void 0:r.name)||"upload",fileName:s,path:i,progress:((l==null?void 0:l.bytesTransferred)||0)/((l==null?void 0:l.totalBytes)||0),target:u,snapshot:l}};typeof c=="function"&&c(h),u.dispatchEvent(new CustomEvent("fireenjinProgress",h))}),a}}try{window&&!window.FireEnjin&&(window.FireEnjin=ck)}catch(n){console.log(n)}
//# sourceMappingURL=index.js.map

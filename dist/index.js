"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var facebook=require("@ionic-native/facebook"),googlePlus=require("@ionic-native/google-plus"),twitterConnect=require("@ionic-native/twitter-connect"),app=require("firebase/app"),auth=require("firebase/auth"),messaging=require("firebase/messaging"),database=require("firebase/database"),app$1=require("@firebase/app"),firestore=require("firebase/firestore"),functions=require("firebase/functions"),localforage=require("localforage"),graphqlRequest=require("graphql-request");function _interopNamespace(s){if(s&&s.__esModule)return s;var i=Object.create(null);return s&&Object.keys(s).forEach(function(e){var t;"default"!==e&&(t=Object.getOwnPropertyDescriptor(s,e),Object.defineProperty(i,e,t.get?t:{enumerable:!0,get:function(){return s[e]}}))}),i.default=s,Object.freeze(i)}require("isomorphic-unfetch");var localforage__namespace=_interopNamespace(localforage);class SessionService{ref;metadata;onError;setMetadataPromise;constructor(e,t,s){this.ref=e,this.metadata=t,this.onError=s,database.onDisconnect(this.ref).remove().then(()=>{this.setMetadataPromise=database.set(this.ref,t),this.setMetadataPromise.catch(s)},s)}updateMetadata(e){this.metadata=e,this.setMetadataPromise&&(this.setMetadataPromise=this.setMetadataPromise.then(()=>{var e=database.set(this.ref,this.metadata);return e.catch(this.onError),e}))}end(){return this.setMetadataPromise?this.setMetadataPromise.then(()=>database.remove(this.ref).then(()=>(this.setMetadataPromise=null,this.end()),this.onError),function(){}):database.onDisconnect(this.ref).cancel().catch(this.onError)}}class SessionManager{metadata=!0;session=null;user=null;forceOffline=!0;auth=null;ref;databaseConnected=null;constructor(e,t){this.auth=t,this.user=t?.currentUser,this.ref=database.ref(e,"_firebase_extensions/presence"),database.onValue(database.ref(e,".info/connected"),e=>{this.databaseConnected=e.val(),this.session&&!this.databaseConnected&&(this.session.end(),this.session=null),this.createSessionIfNeeded()}),this.auth.onAuthStateChanged(e=>{!this.session||e&&e.uid===this.user.uid||(this.session=null),this.user=e,this.createSessionIfNeeded()})}randomId(){for(var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t="",s=0;s<20;s++)t+=e.charAt(Math.floor(Math.random()*e.length));return t}setMetadata(e){this.metadata=null==e||e,this.session&&this.session.updateMetadata(this.metadata)}goOffline(){if(this.forceOffline=!0,this.session){var e=this.session.end();return this.session=null,e}return Promise.resolve()}goOnline(){return this.forceOffline=!1,this.createSessionIfNeeded(),Promise.resolve()}createSessionIfNeeded(){var e;!this.session&&!this.forceOffline&&this.databaseConnected&&this.user&&(e=this.randomId(),e=database.child(this.ref,this.user.uid+"/sessions/"+e),this.session=new SessionService(e,this.metadata,this.onSessionError))}onSessionError(e){console.warn("Error updating presence",e),this.session.end(),this.session=null,"PERMISSION_DENIED"!==e.code&&setTimeout(this.createSessionIfNeeded,1e3)}}class AuthService{app;sessionManager;config={authLocalStorageKey:"enjin:session",tokenLocalStorageKey:"enjin:token",facebook:{permissions:["email","public_profile","user_friends"]}};facebook=facebook.Facebook;googlePlus=googlePlus.GooglePlus;twitter=twitterConnect.TwitterConnect;isOnline=!1;service;constructor(e){if(this.config={...this.config,...e?.config||{}},this.app=e?.app||null,!this.app)try{this.app=app.initializeApp(e?.config?.firebase),console.log("Initializing Firebase App...",this.app)}catch(e){console.log(e)}this.service=auth.getAuth(this.app),this.config.googlePlus&&this.config.googlePlus.options&&this.config.googlePlus.options.webClientId||console.log("googlePlus.options.webClientId is required for Google Native Auth See Here: https://github.com/EddyVerbruggen/cordova-plugin-googleplus#6-usage"),this.config?.emulate&&auth.connectAuthEmulator(this.service,"http://localhost:9099"),this.onEmailLink(window.location.href)}async initializePushNotifications(t,s){try{var i=messaging.getMessaging(this.app);t&&"function"==typeof t&&messaging.onMessage(i,t);var n=s?.vapidKey;let e=await messaging.getToken(i,{vapidKey:n,serviceWorkerRegistration:await navigator.serviceWorker.getRegistration()});return e||("granted"===await Notification.requestPermission()?(console.log("Notification permission granted."),e=await messaging.getToken(i,{vapidKey:n,serviceWorkerRegistration:await navigator.serviceWorker.getRegistration()})):console.log("Unable to get permission to notify.")),e}catch(e){console.log("Service worker not enabled, push notifications will not work!",e)}}async getClaims(){try{var e=(await auth.getIdTokenResult(this.service?.currentUser))["claims"];return e}catch(e){return{}}}async getToken(){var e=this.service?.currentUser?await auth.getIdToken(this.service.currentUser):localStorage.getItem(this.config?.tokenLocalStorageKey||"");return await this.setToken(e),e}async setToken(e){return localStorage.setItem(this.config.tokenLocalStorageKey||"",e),e}async onEmailLink(t){if(auth.isSignInWithEmailLink(this.service,t)){let e=window.localStorage.getItem("emailForSignIn");e=e||window.prompt("Please provide your email for confirmation");t=await auth.signInWithEmailLink(this.service,e||"",t);return window.localStorage.removeItem("emailForSignIn"),this.emitLoggedInEvent(t),t}}withGoogleCredential(e){return auth.GoogleAuthProvider.credential(e)}withCredential(e){return auth.signInWithCredential(this.service,e)}withToken(e){return auth.signInWithCustomToken(this.service,e)}withPhoneNumber(e,t){return e="+"+e,window.localStorage.setItem("phoneForSignIn",e),auth.signInWithPhoneNumber(this.service,e,t)}withEmailLink(e,t){return window.localStorage.setItem("emailForSignIn",e),auth.sendSignInLinkToEmail(this.service,e,t)}anonymously(){return auth.signInAnonymously(this.service)}onAuthChanged(t){auth.onAuthStateChanged(this.service,async e=>!(!e||!e.emailVerified&&e.providerData&&"password"===e.providerData[0].providerId)&&(e&&(localStorage.setItem(this.config?.authLocalStorageKey||"",JSON.stringify(e)),localStorage.setItem(this.config?.tokenLocalStorageKey||"",await auth.getIdToken(this.service?.currentUser,!0))),void(t&&"function"==typeof t&&t(e)))),localStorage.getItem(this.config?.authLocalStorageKey||"")||t(null)}getFromStorage(){return localStorage.getItem(this.config?.authLocalStorageKey||"")?JSON.parse(localStorage.getItem(this.config?.authLocalStorageKey||"")):null}isLoggedIn(){var e=this.service;return e||this.getFromStorage()}emitLoggedInEvent(e){document.body.dispatchEvent(new CustomEvent("authLoggedIn",{detail:{data:e}}))}emitLoggedOutEvent(){document.body.dispatchEvent(new CustomEvent("authLoggedOut",{detail:{}}))}createUser(e,t){return auth.createUserWithEmailAndPassword(this.service,e,t)}sendEmailVerification(e){return auth.sendEmailVerification(this.service.currentUser,e||null)}sendPasswordReset(e,t){return auth.sendPasswordResetEmail(this.service,e,t||null)}withEmail(e,i){return new Promise((t,s)=>{try{auth.signInWithEmailAndPassword(this.service,e,i).then(e=>{this.emitLoggedInEvent({user:e}),t({data:{user:e}})}).catch(e=>{s(e)})}catch(e){s(e)}})}updateEmail(e,i){return new Promise((t,s)=>{try{auth.updateEmail(this.service?.currentUser,e).then(e=>{t({data:{user:e}}),this.sendEmailVerification(i)}).catch(e=>{s(e)})}catch(e){s(e)}})}async facebookNative(){var e=await this.facebook.login(this.config?.facebook?.permissions);return this.withCredential(auth.FacebookAuthProvider.credential(e.authResponse.accessToken))}async googleNative(){let e;try{e=await this.googlePlus.login(this.config?.googlePlus?.options)}catch(e){console.log("Error with Google Native Login..."),console.log(e)}return this.withCredential(auth.GoogleAuthProvider.credential(e.idToken))}async twitterNative(){var e=await this.twitter.login();return this.withCredential(auth.TwitterAuthProvider.credential(e.token,e.secret))}async withSocial(e,t=!1){let i,n=t;return window.matchMedia("(display-mode: standalone)").matches&&(console.log("Running in PWA mode..."),n=!0),new Promise(async(t,s)=>{if(window.cordova)"google"===e?this.googleNative().then(e=>{this.emitLoggedInEvent(e),t(e)}).catch(e=>{console.log(e),s(e)}):"facebook"===e?this.facebookNative().then(e=>{this.emitLoggedInEvent(e),t(e)}).catch(e=>{console.log(e),s(e)}):"twitter"===e&&this.twitterNative().then(e=>{this.emitLoggedInEvent(e),t(e)}).catch(e=>{console.log(e),s(e)});else{"facebook"===e?i=new auth.FacebookAuthProvider:"google"===e?i=new auth.GoogleAuthProvider:"twitter"===e?i=new auth.TwitterAuthProvider:s({message:"A social network is required or the one provided is not yet supported."});try{n?await auth.signInWithRedirect(this.service,i):await auth.signInWithPopup(this.service,i),this.emitLoggedInEvent({currentUser:this.service.currentUser})}catch(e){console.log(e)}}})}logout(){return this.emitLoggedOutEvent(),auth.signOut(this.service)}async updatePassword(e,t){return t&&await auth.reauthenticateWithCredential(this.service?.currentUser,t),auth.updatePassword(this.service.currentUser,e)}async storeRoles(e){return localStorage.setItem("roles",JSON.stringify(e)),e}async checkRolePermission(e,t,s){let i=[];var n=await this.getClaims();if(!s&&n?.admin)return!0;try{i=JSON.parse(localStorage.getItem("roles"))}catch(e){console.log("Error getting roles from local storage")}for(const o of i)if(o.id===e&&o.permissions&&o.permissions.includes(t))return!0;return!1}async goOnline(){var e;return this.sessionManager||(e=database.getDatabase(this.app),this.sessionManager=new SessionManager(e,this.service)),this.isOnline=!0,document.body.dispatchEvent(new CustomEvent("fireenjin:online",{detail:{sessionManager:this.sessionManager}})),this.sessionManager.goOnline()}async goOffline(){return this.sessionManager?(this.isOnline=!1,document.body.dispatchEvent(new CustomEvent("fireenjin:offline",{detail:{sessionManager:this.sessionManager}})),this.sessionManager.goOffline()):null}async getSessionManager(){return this.sessionManager}}class DatabaseService{app;service;watchers={};functions;constructor(e){if(this.app=e?.app||null,!this.app)try{this.app=app$1.initializeApp(e?.config),console.log("Initializing Firebase App...",this.app)}catch(e){console.log(e)}this.service=firestore.getFirestore(this.app),this.functions=functions.getFunctions(this.app),e?.emulate&&(firestore.connectFirestoreEmulator(this.service,"localhost",8080),functions.connectFunctionsEmulator(this.functions,"localhost",5001));try{firestore.enableIndexedDbPersistence(this.service)}catch(e){console.log(e.message)}}call(e){return functions.httpsCallable(this.functions,e)}async add(e,t,s){var i=await this.collection(e);return s&&await firestore.setDoc(this.document(e,s),t),s?this.document(e,s):firestore.addDoc(i,t)}collection(e){return firestore.collection(this.service,e)}getCollection(e){return firestore.getDocs(this.collection(e))}document(e,t){return t?firestore.doc(this.collection(e),t):firestore.doc(this.service,e)}getDocument(e,t){return firestore.getDoc(this.document(e,t))}async update(e,t,s){var i=this.document(e,t);await firestore.updateDoc(i,s,{merge:!0});const n=await this.getDocument(e,t);return n.data()}async clearWatchers(){for(const e of Object.keys(this.watchers))this.watchers[e]();return!0}subscribe(e,t,s){s=s||(new Date).toISOString();return this.watchers[s]=firestore.onSnapshot(this.rawQuery(e?.collectionName,e?.where,e?.orderBy,e?.limit),async e=>{t&&"function"==typeof t&&t({docs:e?.docs||[]})}),this.watchers[s]}unsubscribe(e){return this.watchers[e]&&"function"==typeof this.watchers[e]?(this.watchers[e](),!0):(console.log(`There is no watcher running on ${e} query.`),!1)}watchDocument(e,t,s){this.watchers[e+":"+t]=firestore.onSnapshot(this.document(e,t),async e=>{s&&"function"==typeof s&&s({data:e.data()})})}unwatchDocument(e,t){t=e+":"+t;return this.watchers[t]&&"function"==typeof this.watchers[t]?(this.watchers[t](),!0):(console.log(`There is no watcher running on ${t} document.`),!1)}rawQuery(e,t,s,i){const n=[];for(const o of t||[])o?.conditional&&o?.key&&n.push(firestore.where(o.key,o.conditional,o.value));return s&&n.push(firestore.orderBy(s)),i&&n.push(firestore.limit(i)),firestore.query(this.collection(e),...n)}async query(e,t,s,i){return firestore.getDocs(this.rawQuery(e,t,s,i))}}var objectToUrlParams=(t,s)=>"object"==typeof t?Object.keys(t).map(e=>(s?encodeURIComponent(e):e)+"="+s?encodeURIComponent(t[e]):t[e]).join("&"):"";class Client{url;options;constructor(e,t){this.url=e||"http://localhost:4000",this.options=t||{}}async rawRequest(e,t,s){var i=s?.method||this.options?.method||"GET",n=s?.headers||this.options?.headers||{},e=this.url+"/"+e+("get"===i?objectToUrlParams(t):"");const o=await fetch(this.url+"/"+e,{method:i,...this.options||{},...s||{},headers:n,body:"get"===i?null:JSON.stringify(t||{})});return{data:await o?.json?.()||null,headers:o.headers,status:o.status,extensions:{}}}async request(e,t,s){const i=s?.method||this.options?.method||"GET";var n=s?.headers||this.options?.headers||{};const o=await fetch(this.url+"/"+e,{method:i,...this.options||{},...s||{},headers:n,body:!["get","post"].includes(i.toLowerCase())&&JSON.stringify(t||{})||null});return o.json()}async batchRequests(e,t){const s={};for(var{document:i,variables:n}of e)try{s[i]=await this.request(i,n,t)}catch{s[i]=null}return s}setEndpoint(e){return this.url=e,!0}setHeader(e,t){return this.options||(this.options={}),this.options?.headers||(this.options.headers={}),this.options.headers[e]=t,this}setHeaders(e){for(var[t,s]of Object.entries(e))this.setHeader(t,s);return this}}async function fireenjinError(e,t){var s={event:e?.event,error:e?.error,target:e?.event?.target,name:e?.name,endpoint:e?.endpoint};"function"==typeof t?.onError&&t.onError(s);const i=e?.event?.target||document;i.dispatchEvent(new CustomEvent("fireenjinError",{detail:s,bubbles:!!e?.bubbles,cancelable:!!e?.cancelable,composed:!!e?.composed}))}async function setComponentProps(e,t){let s=t||{};if(e)for(const i of Object.keys(e))try{s[e[i]]=i.split(".").reduce((e,t)=>e[t],t)}catch(e){continue}return s}async function fireenjinSuccess(e,t){var s={event:e?.event,data:await setComponentProps(e?.dataPropsMap,e?.data),target:e?.event?.target,name:e?.name,endpoint:e?.endpoint};"function"==typeof t?.onSuccess&&t.onSuccess(s);const i=e?.event?.target||document;i.dispatchEvent(new CustomEvent("fireenjinSuccess",{detail:s,bubbles:!!e?.bubbles,cancelable:!!e?.cancelable,composed:!!e?.composed}))}async function tryOrFail(e,t){var s={cached:!!t?.cached,event:t?.event?.detail?.event,name:t?.name,endpoint:t?.endpoint,bubbles:!!t?.bubbles??!0,cancelable:!!t?.cancelable??!0,composed:!!t?.composed};try{var i=await e();return await fireenjinSuccess({...s,data:i},{onSuccess:t?.onSuccess}),i}catch(e){return void await fireenjinError({...s,error:e},{onError:t?.onError})}}class FirestoreClient{url;db;options;constructor(e,t){this.url=e||"http://localhost:4000",this.options={...t,headers:t?.headers||{}},this.db=t?.db}async rawRequest(e,t,s){const i=s?.method||this.options?.method||"POST";s=s?.headers||this.options?.headers||{},t=await("post"===i.toLowerCase()?this.db.update(e,t?.data||{},t?.id):this.db.query(e,t?.where||[],t?.orderBy||null,t?.limit||null));return{data:"post"===i.toLowerCase()?t:t?.docs,headers:s,extensions:{query:t?.query,metadata:t?.metadata,size:t?.size},status:200}}async request(e,t,s){return{data:(await this.rawRequest(e,t,s)).data}}async batchRequests(e,t){const s={};for(var{document:i,variables:n}of e)try{s[i]=await this.request(i,n,t)}catch{s[i]=null}return s}setEndpoint(e){return this.url=e,!0}setHeader(e,t){const s=this.options?.headers||{};return s[e]=t,this.options.headers=s,this}setHeaders(e){for(var[t,s]of Object.entries(e))this.setHeader(t,s);return this}}class FireEnjin{client;sdk={};host={url:"http://localhost:4000"};options;constructor(e){this.options=e||{};var t={Authorization:e?.token?"Bearer "+e.token:"",...e.headers||{}};this.host=e?.connections?.length?this.setConnection(0):{url:e.host,type:"rest",headers:t},this.client="graphql"===this.host.type?new graphqlRequest.GraphQLClient(this.host?.url||"http://localhost:4000",{headers:this.host?.headers||{}}):"firebase"===this.host?.type?new FirestoreClient(this.host.url,{db:this.host?.db?this.host.db:new DatabaseService({emulate:!!e?.emulate,config:this.host?.auth})}):new Client(this.host.url,{headers:this.host?.headers||{}}),this.sdk="graphql"===this.host.type&&"function"==typeof e?.getSdk?e.getSdk(this.client,this.options?.onRequest):null,document&&(document.addEventListener("fireenjinUpload",e=>{this.onUpload(e)}),document.addEventListener("fireenjinSubmit",e=>{this.onSubmit(e)}),document.addEventListener("fireenjinFetch",e=>{this.onFetch(e)}))}hash(e){var t,s=0;if(0===e.length)return s;for(t=0;t<e.length;t++)s=(s<<5)-s+e.charCodeAt(t),s|=0;return s}async upload(e,t){const s=t?.endpoint||"upload";return tryOrFail(async()=>this.client.request(this.options.uploadUrl||this.host.url+"/"+s,e),{event:t?.event||null,name:t?.name||s,bubbles:!!t?.bubbles,cancelable:!!t?.cancelable,composed:!!t?.composed,endpoint:s,cached:!0,onError:this.options?.onError,onSuccess:this.options?.onSuccess})}async onUpload(e){if("function"==typeof this.options?.onUpload&&this.options.onUpload(e),!e.detail?.data?.encodedContent||"function"==typeof this.options?.onUpload)return!1;var t=await this.upload({id:e.detail.data?.id,path:e.detail.data?.path,fileName:e.detail.data?.fileName,file:e.detail.data?.encodedContent,type:e.detail.data?.type},{event:e.detail?.event,name:e.detail?.name,endpoint:e.detail?.endpoint});return e?.target&&(e.target.value=t?.url||null),t}async fetch(e,t,s){let i=null;var n=s?.event||null,o=s?.name||null;const a=s?.cacheKey?s.cacheKey:e+"_"+(t?.id?t.id+":":t?.params?this.hash(JSON.stringify(Object.values(t.params))):"")+this.hash(JSON.stringify(t||{}));return s?.disableCache||(i=await tryOrFail(async()=>localforage__namespace.getItem(a),{endpoint:e,event:n,name:o,cached:!0,bubbles:!!s?.bubbles,cancelable:!!s?.cancelable,composed:!!s?.composed,onError:this.options?.onError,onSuccess:this.options?.onSuccess})),i=await tryOrFail(async()=>"graphql"===this.host?.type?t?.query?this.client.request(t?.query,t?.params):this.sdk[e](t,s?.headers):this.client.request(e,t),{endpoint:e,event:n,name:o,cached:!1,bubbles:!!s?.bubbles,cancelable:!!s?.cancelable,composed:!!s?.composed,onError:this.options?.onError,onSuccess:this.options?.onSuccess}),i}async onFetch(e){return!(!(e&&e.detail&&e.detail.endpoint)||e.detail.disableFetch)&&this.fetch(e.detail.endpoint,e?.detail?.params||{},{event:e?.detail?.event,dataPropsMap:e?.detail?.dataPropsMap,name:e?.detail?.name,cacheKey:e?.detail?.cacheKey,disableCache:!!e?.detail?.disableCache})}async submit(e,t,s){return tryOrFail(async()=>"graphql"===this.host?.type?t?.query?this.client.request(t.query,t.params):this.sdk[e]({id:t.id,data:t.data}):this.client.request(e,t,{method:"POST"}),{endpoint:e,event:s?.event||null,name:s?.name||null,cached:!1,bubbles:!!s?.bubbles,cancelable:!!s?.cancelable,composed:!!s?.composed,onError:this.options?.onError,onSuccess:this.options?.onSuccess})}async onSubmit(e){return!(!(e&&e.detail&&e.detail.endpoint)||e.detail.disableSubmit)&&this.submit(e.detail.endpoint,{id:e?.detail?.id,data:e?.detail?.data,params:e?.detail?.params,query:e?.detail?.query})}setHeader(e,t){return!!this.client&&(this.host?.headers||(this.host.headers={}),this.host.headers[e]=t,this.client.setHeader(e,t))}setHeaders(e){return!!this.client&&this.client.setHeaders(e)}setConnection(t){return this.host="string"==typeof t?(this.options?.connections||[]).find(e=>e?.name===t||e?.url===t):this.options?.connections?.[t],this.host?.name||(this.host.name="default"),this.host?.type||(this.host.type="function"==typeof this.options?.getSdk?"graphql":this.host?.db||this.host?.auth?.databaseURL?"firebase":"rest"),this.host.headers={...this.host?.headers||{},...this.options?.headers||{}},this.client="graphql"===this.host.type?new graphqlRequest.GraphQLClient(this.host?.url||"http://localhost:4000",{headers:this.host?.headers||{}}):"firebase"===this.host?.type?new FirestoreClient(this.host.url,{db:this.host.db}):new Client(this.host.url,{headers:this.host?.headers||{}}),this.client.setEndpoint(this.host?.url||"http://localhost:4000"),this.host}}window&&!window.FireEnjin&&(window.FireEnjin=FireEnjin),exports.AuthService=AuthService,exports.DatabaseService=DatabaseService,exports.FireEnjin=FireEnjin,exports.SessionService=SessionService;

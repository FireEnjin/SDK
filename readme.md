# FireEnjin SDK

Roll your SDK using a couple simple methods and events.

# METHODS

A list of methods that you can use to interact with your API.

- init(config: FireEnjinOptions) - Initialize the SDK with config options and begin listening for events.

```typescript
import { FireEnjin } from "@fireenjin/sdk";

const enjin = FireEnjin.init({
  host: "http://localhost:4000",
});
```

- fetch(endpoint: string, input?: FireEnjinFetchInput, options?: FireEnjinFetchOptions) - Get some data from your API.

```typescript
const result = await enjin.fetch("findUser", {
  id: "popcorn245",
});
```

- submit(endpoint: string, input?: FireEnjinSubmitInput, options?: FireEnjinSubmitOptions) - Submit some data to your API.

```typescript
const result = await enjin.submit("editUser", {
  id: "popcorn245",
  data: {
    firstName: "Robert Johnson",
  },
});
```

- upload(input: FireEnjinUploadInput, options?: FireEnjinUploadOptions) - Upload a file to your API.

```typescript
const result = await enjin.upload({
    file: ...
});
```

# EVENTS

A list of events that you can emit or listen to.

- fireenjinFetch - Get some data from your API.

```typescript
document.addEventListener("fireenjinFetch", (event) => {
  console.log(event.detail.data);
});
```

- fireenjinSubmit - Submit some data to your API.

```typescript
document.addEventListener("fireenjinSubmit", (event) => {
  console.log(event.detail.data);
});
```

- fireenjinUpload - Upload a file to your API.

```typescript
document.addEventListener("fireenjinUpload", (event) => {
  console.log(event.detail.data);
});
```

- fireenjinSuccess - Fetch, Submit, or Upload has been successful.

```typescript
document.addEventListener("fireenjinSuccess", (event) => {
  console.log(event.detail.data);
});
```

- fireenjinError - Fetch, Submit, or Upload has failed.

```typescript
document.addEventListener("fireenjinError", (event) => {
  console.log(event.detail.error);
});
```

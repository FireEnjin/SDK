export default (params: any, encode?: boolean) =>
  typeof params === "object"
    ? Object.keys(params)
        .map((key) =>
          (encode ? encodeURIComponent(key) : key) + "=" + encode
            ? encodeURIComponent(params[key])
            : params[key]
        )
        .join("&")
    : "";

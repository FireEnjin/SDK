export default async function getExtension(path: string) {
  var basename = path.split(/[\\/]/).pop(), // extract file name from full path ...
    // (supports `\\` and `/` separators)
    pos = basename?.lastIndexOf?.(".") || 0; // get last position of `.`

  if (basename === "" || pos < 1)
    // if file name is empty or ...
    return ""; //  `.` not found (-1) or comes first (0)

  return basename?.slice?.(pos + 1); // extract extension ignoring `.`
}

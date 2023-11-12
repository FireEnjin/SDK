/**
 * Lowercases the first character in the `string`.
 *
 * @param {String} string
 *
 * @returns {String}
 */
export default function firstToLowerCase(string) {
    if (typeof string !== 'string') {
        return string;
    }
    if (string.length === 0) {
        return string;
    }
    return string[0].toLowerCase() + string.slice(1);
}

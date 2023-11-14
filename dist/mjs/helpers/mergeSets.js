export default function mergeSets(...args) {
    return new Set(args.reduce((acc, current) => {
        return [...acc, ...current];
    }, []));
}

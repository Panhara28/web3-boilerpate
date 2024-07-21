export function formatAddress(originText: any, front = 6, back = 6) {
    return originText?.slice(0, front) + "................." + originText?.slice(-back);
}

export function randIRange(start: number, end: number): number {
    let diff: number = end - start;

    return Math.trunc(start + Math.random() * diff);
}
export function randFRange(start: number, end: number): number {
    let diff: number = end - start;

    return start + Math.random() * diff;
}
export function randomRange(start: number, end: number): number {
    let diff: number = end - start;

    return start + Math.random() * diff;
}

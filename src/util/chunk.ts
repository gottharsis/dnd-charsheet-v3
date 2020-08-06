/**
 * Splits an array into chunks
 * @param arr The array to split
 * @param size the size of each chunk
 */
export const chunk = <T>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let start = 0; start < arr.length; start += size) {
        const end = Math.min(start + size, arr.length);
        chunks.push(arr.slice(start, end));
    }
    return chunks;
};

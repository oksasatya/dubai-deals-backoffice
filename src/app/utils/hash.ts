export const generateRandomHash = () => {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array).map(b => b.toString(16).padStart(2,'0')).join('')
}


export const verifyHash = (hash: string) => {
    return hash && hash.length === 32 && /^[0-9a-f]+$/.test(hash);
}
import Crypto from '../src/js/crypto.js';

const message = 'secret';

describe('Crypto', () => {
    it('matches', async () => {
        const encrypted = await Crypto.encryptString(message);
        const decrypted = await Crypto.decryptString(encrypted);
        expect(decrypted).toBe(message);
    });
});

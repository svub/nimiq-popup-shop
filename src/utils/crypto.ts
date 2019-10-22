const crypto: Crypto = window.crypto || window.msCrypto;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

// TODO(sectore): Follow comments copied from deleted `config.js`
//     // repo is used to namespace orders from this shop from all others
//     config.repo = await Crypto.hash(config.key.n);

//     // the key needs to be imported so that it can be used by the WebCrypto API
//     config.key = await Crypto.importKey(config.key);

// TODO(sectore): Another place key data than in code?
const key: JsonWebKey = {
  alg: "RSA-OAEP-256",
  e: "AQAB",
  ext: true,
  key_ops: [
      "encrypt"
  ],
  kty: "RSA",
  n: "5uCgXaQKAzogc133-Y5JCBJHs-1PcuqtHX2cBnZmcoBWR0Pnvzts__SntrcEyQOZIfgt07eB2QmkGzZw3JCVSJOj8vzgCBkuLAPy0sjQQEArbrDdUrjDhP8D6DZB7KZu2RBTys-Cs9DH1XX9Qg1cgM_2-Rccd6LQMUI0o1qf1-kF9lfYXj-5g7v-KWo-WzPHXSMWsFU0UgFCM4q3nIr3ssqvOXkFHUc90Rw_Tgt-Vx-wi0RhFAYCX-0bkJBSuGB7bqRRGjL5Z_mPPZF25GqX1JiHuqLvqaVZu-AlK-L8KYw1a5gwj4opwcKUFNJXcmkI21Q0VVLTE3t9Afvzv8xcfQiYGbN5HIHwQji8TIXgdEN5yUH9-7x9Jh2lVj5Iaie_KcnZ4UQC9AwptSwhAeUNmszc0TQUGX6FxJsKnojNeYR9cUp3jS_jeP-r4BkzD7uvqt2wDP2_m5LIlC2VyKa2yx3rekqy2xPIvpaktPWl1F1U3V9zA5n8UHtamBll1LxmtWvPxQQ3dqg2yf6ogR2vZPbaKndoyL00tbZ8Op3QWmoVuHzgcdAhhiNgdwR2SgIb5taKUIebq43nBRML9DTX-SJBzUXU6218PbJeS1aStu826mwq1JKRjmKXl3JUXG_2ouY4zkebz4wfruHlZPmVtThrkLs7o3Pg5ZwhLjVjmyM"
};

const ALGORITHM = {
  name: "RSA-OAEP",
  modulusLength: 4096,
  publicExponent: new Uint8Array([1, 0, 1]),
  hash: "SHA-256"
};

const FORMAT = 'jwk';

let importedKey = null;

export const getCrypto = () => crypto;

export const loadKey = async () => {
  return importedKey || (importedKey = await importKey(key));
}

let pk = null;

const loadPk = async () => {
  // return this.pk || (this.pk = await Crypto.importKey(localStorage.privateKey));
  // return this.pk ? this.pk : this.pk = await Crypto.importKey(localStorage.privateKey);
  if (!pk) {
      pk = await importKey(localStorage.privateKey);
  }
  return pk;
}

export const hash = async(s: string) => {
  const data = encoder.encode(s);
  return await crypto.subtle.digest(ALGORITHM.hash, data);
}

export const importKey = async (key: JsonWebKey): Promise<CryptoKey> => {
  // return await crypto.importKey(FORMAT, key, ALGORITHM, false, ['encrypt', 'decrypt']);
  return await crypto.subtle.importKey(FORMAT, key, ALGORITHM, false, key.key_ops);
}

export const exportKey = async (key: CryptoKey) => {
  const exported = await crypto.subtle.exportKey(FORMAT, key);
  return JSON.stringify(exported, null, " ");
}

export const generateKey = async (): Promise<CryptoKey|CryptoKeyPair> =>
  crypto.subtle.generateKey(ALGORITHM, 
    true, 
    ['encrypt', 'decrypt']
  )

export const encryptObject = async (o: Object): Promise<string> => {
    const data: string = JSON.stringify(o);
    return await encryptString(data);
}

export const encryptString = async (s: string): Promise<string> => {
    const data: Uint8Array = encoder.encode(s);
    return await encryptRaw(data);
}

export const encryptRaw = async (data: Uint8Array): Promise<string> => {
  const key = await loadKey();
  const encrypted = await crypto.subtle.encrypt(ALGORITHM, key, data);
  return decoder.decode(encrypted);
}

export const decryptRaw = async(data: string): Promise<ArrayBuffer> => {
    const encoded = encoder.encode(data);
    return await crypto.subtle.decrypt(ALGORITHM, await loadPk(), encoded);
}

export const decryptString = async (data: string) => {
    const decrypted = await decryptRaw(data);
    return decoder.decode(decrypted);
}

export const decryptObject = async <T>(data: string): Promise<T> => {
    const decrypted = await decryptString(data);
    return JSON.parse(decrypted) as T;
}

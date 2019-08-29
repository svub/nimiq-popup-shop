// import Crypto from './js/crypto.js';

const config = {
    // address: 'NQ07 0000 0000 0000 0000 0000 0000 0000 0000',
    address: 'NQ37 CH7U 9DXX 6GV0 UK0N SJTV 4Q1A FGN9 M6BE',
    name: 'Nimiq Pop-Up Shop Demo',
    fee: 0,
    shopLogoUrl: null,
    key: {
        "alg": "RSA-OAEP-256",
        "e": "AQAB",
        "ext": true,
        "key_ops": [
            "encrypt"
        ],
        "kty": "RSA",
        "n": "5uCgXaQKAzogc133-Y5JCBJHs-1PcuqtHX2cBnZmcoBWR0Pnvzts__SntrcEyQOZIfgt07eB2QmkGzZw3JCVSJOj8vzgCBkuLAPy0sjQQEArbrDdUrjDhP8D6DZB7KZu2RBTys-Cs9DH1XX9Qg1cgM_2-Rccd6LQMUI0o1qf1-kF9lfYXj-5g7v-KWo-WzPHXSMWsFU0UgFCM4q3nIr3ssqvOXkFHUc90Rw_Tgt-Vx-wi0RhFAYCX-0bkJBSuGB7bqRRGjL5Z_mPPZF25GqX1JiHuqLvqaVZu-AlK-L8KYw1a5gwj4opwcKUFNJXcmkI21Q0VVLTE3t9Afvzv8xcfQiYGbN5HIHwQji8TIXgdEN5yUH9-7x9Jh2lVj5Iaie_KcnZ4UQC9AwptSwhAeUNmszc0TQUGX6FxJsKnojNeYR9cUp3jS_jeP-r4BkzD7uvqt2wDP2_m5LIlC2VyKa2yx3rekqy2xPIvpaktPWl1F1U3V9zA5n8UHtamBll1LxmtWvPxQQ3dqg2yf6ogR2vZPbaKndoyL00tbZ8Op3QWmoVuHzgcdAhhiNgdwR2SgIb5taKUIebq43nBRML9DTX-SJBzUXU6218PbJeS1aStu826mwq1JKRjmKXl3JUXG_2ouY4zkebz4wfruHlZPmVtThrkLs7o3Pg5ZwhLjVjmyM"
    },
    repo: null,
};

// (async function () {
//     // repo is used to namespace orders from this shop from all others
//     config.repo = await Crypto.hash(config.key.n);

//     // the key needs to be imported so that it can be used by the WebCrypto API
//     config.key = await Crypto.importKey(config.key);
// })();

export default config;

window.nimpop = {
    config
}

// TODO(svub) Fix re-export, see /src/index.ts
// import Backend from '../nimiq-shop.js'

const $ = document.getElementById.bind(document)

async function initialize() {
    localStorage.crypto = JSON.stringify(await Backend.generateCrypto())

    show()
}

function show() {
    const $ = document.getElementById.bind(document)

    const { privateKey, publicKey, id } = JSON.parse(localStorage.crypto)
    const config = JSON.stringify(Backend.generateConfiguration(publicKey, id), null, ' ')

    console.log(`Private Key\n${JSON.stringify(privateKey)}`)
    console.log(`Public Key\n- add this to your shop config! -\n${JSON.stringify(publicKey)}`)

    $('private').value = JSON.stringify(privateKey)
    $('config').value = `new Shop(${config})`
}

function load() {
    console.log('localStorage.crypto')
    console.log(localStorage.crypto)
    if (!localStorage.crypto) {
        initialize()
    } else {
        show()
    }
    // TODO 'prettier' code?? The next lines make me question the code formatter...
    $('new').addEventListener('click', e => {
        if (!localStorage.crypto ||
            confirm(
                'This shop seems to be set-up already. Do you want to overwrite your settings? Make sure to not lose your private key!',
            )
        ) {
            initialize()
        }
    });
}

window.addEventListener('load', load)

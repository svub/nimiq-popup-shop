const $ = document.getElementById.bind(document)

let configuration, privateKey, backend

function enterKey(message) {
  const key = prompt(message, '')
  const changed = localStorage.privateKey != key
  localStorage.privateKey = key ? key : ''
  return changed
}

async function loadOpenOrders() {
  await backend.sync()
  const orders = backend.list()
  const list = $('open_orders')
  list.innerHTML = ''
  if (orders.length > 0) {
    orders.forEach((order, index) => {
      const li = document.createElement('li')
      li.textContent = `Order ${index}: ${JSON.stringify(order, null, '  ')}`
      list.appendChild(li)
    })
  } else {
    list.textContent = 'no orders yet'
  }
}

async function initialize() {
  try {
    configuration = await (await fetch(
      location + '../nimiq-pop-up-shop-configuration.js',
    )).json()
  } catch (e) {
    return alert(
      'Something went wrong loading the Nimiq Pop-Up Shop. If you are a customer, contact the owner. If you are the owner: loading the configuration failed. Check the terminal for details',
    )
  }

  if (!localStorage.privateKey) enterKey(`Hi there! Seems like you're here for the first time!

  Do you have a private key already? Then paste it below.
  Otherwise, just leave the field empty or hit cancel to set-up the Nimiq Pop-Up Shop together.`)
  privateKey = localStorage.privateKey

  if (!privateKey || !configuration) {
    return (location.href = 'setup.html')
  }

  backend = new NimiqShop.Backend(configuration, privateKey, location + 'wasm/')
  loadOpenOrders()

  $('update').addEventListener('click', loadOpenOrders)
  $('change-key').addEventListener('click', () => {
    if (enterKey('Please paste your private key below.')) {
      backend.clearCache()
      localStorage.clear()
      location.reload()
    }
  })
}

window.addEventListener('load', initialize)

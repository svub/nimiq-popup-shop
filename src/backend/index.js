const $ = document.getElementById.bind(document)

let configuration, privateKey, backend

async function initialize() {
  try {
    configuration = await (await fetch(
      location + '../nimiq-pop-up-shop-configuration.json',
    )).json()
  } catch (e) {
    return alert(
      'Something went wrong loading the Nimiq Pop-Up Shop. If you are a customer, contact the owner. If you are the owner: loading the configuration failed. Check the terminal for details',
    )
  }

  if (!localStorage.privateKey) {
    const key = prompt(
      `Hi there! Seems like you're here for the first time!

Do you have a private key already? Then paste it below.
Otherwise, just leave the field empty or hit cancel to set-up the Nimiq Pop-Up Shop together.`,
      '',
    )
    localStorage.privateKey = key ? key : ''
  }
  privateKey = localStorage.privateKey

  if (!privateKey || !configuration) {
    return (location.href = 'setup.html')
  }

  backend = new NimiqShop.Backend(configuration, privateKey)
  loadOpenOrders()

  $('update').addEventListener('click', loadOpenOrders)
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

window.addEventListener('load', initialize)

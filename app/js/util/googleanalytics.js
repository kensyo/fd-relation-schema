const GA_ID = 'G-MJN1642ZBW'

let initialized = false

function load() {
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID
  document.head.appendChild(script)
}

function enable() {
  if (!initialized) {
    load()
    initialized = true

    // // add gtag function
    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }
    window.gtag = gtag

    gtag('js', new Date())
    gtag('config', GA_ID)
  }
  window[`ga-disable-${GA_ID}`] = false
}

function disable() {
  window[`ga-disable-${GA_ID}`] = true

  // delete _ga* etc cookies
  const cookies = document.cookie.split(';')
  // const gaCookiePattern = /^_ga/
  const gaCookiePattern = /^_ga|^_gid|^_gat/
  cookies.forEach((cookie) => {
    const cookieName = cookie.trim().split('=')[0]

    if (gaCookiePattern.test(cookieName)) {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${window.location.hostname} ;path=/;` // .${window.location.hostname} means subdomain
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`
    }
  })
}

function event({ eventName, category, label, value }) {
  if (!initialized) {
    return
  }
  window.gtag('event', eventName, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  })
}

export default {
  enable,
  disable,
  event,
}

const clipboard = id => {
  const el = document.createElement('textarea')
  el.value = id
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

export default clipboard

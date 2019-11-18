const newElement = content => {
  const div = document.createElement('div')
  div.className = 'tag-wrapper'
  const spanTitle = document.createElement('span')
  spanTitle.className = 'tagging-title'
  const spanDelete = document.createElement('span')
  spanDelete.className = 'delete'
  spanDelete.innerHTML = 'X'
  spanDelete.setAttribute('onClick', 'this.parentNode.remove()')
  spanTitle.innerHTML = content
  div.append(spanTitle)
  div.append(spanDelete)
  document.getElementById('wrapper').append(div)
}

const rect = document.getElementById('wrapper').getBoundingClientRect()

const movement = img => {
  img.onclick = e => {
    try {
      if (e.target.nextSibling.classList.contains('show')) {
        e.target.nextSibling.classList.remove('show')
        img.onmousedown = () => false
      } else if (!e.target.nextSibling.classList.contains('show')) {
        e.target.nextSibling.classList.add('show')
        e.target.style.cursor = 'grab'
        img.ondragstart = () => false
        img.onmousedown = e => {
          img.style.position = 'absolute'
          const saveX = e.offsetX
          const saveY = e.offsetY
          document.onmousemove = e => {
            img.style.position = 'absolute'
            if (parseInt(img.style.top) < 0) {
              img.style.top = 0
            } else if (parseInt(img.style.top) > 630 - img.offsetHeight) {
              img.style.top = 630 - img.offsetHeight + 'px'
            } else {
              img.style.top = (img.style.top < 0) ? 0 : e.pageY - rect.y - saveY + 'px'
            }
            if (parseInt(img.style.left) < 0) {
              img.style.left = 0
            } else if (parseInt(img.style.left) > 840 - img.offsetWidth) {
              img.style.left = 840 - img.offsetWidth + 'px'
            } else {
              img.style.left = e.pageX - rect.x - saveX + 'px'
            }
          }
        }
        img.onmouseup = e => {
          document.onmousemove = () => false
          e.target.style.cursor = 'pointer'
        }
      }
    }
    catch { }
  }
}

document.querySelectorAll('.tag-wrapper').forEach(node => {
  movement(node)
})
const observer = new MutationObserver(function (mutations) {
  if (mutations[0].addedNodes.length) {
    movement(mutations[0].addedNodes[0])
  }
})

const config = { childList: true }

observer.observe(document.getElementById('wrapper'), config)

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

var img = document.querySelector('.tag-wrapper')
img.ondragstart = () => false
const rect = document.getElementById('wrapper').getBoundingClientRect()

img.onmousedown = e => {
  img.style.position = 'absolute'
  const saveX = e.offsetX
  const saveY = e.offsetY

  document.onmousemove = e => {
    img.style.position = 'absolute'
    img.style.top = e.pageY - rect.y - saveY + 'px'
    img.style.left = e.pageX - rect.x - saveX + 'px'
    console.log(e)
  }
}

img.onmouseup = e => {
  document.onmousemove = () => false
}

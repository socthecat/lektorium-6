// based on https://codepen.io/cconceicao/pen/PBQawy
const slide = (wrapper, items, prev, next) => {
  let pos1 = 0
  let pos2 = 0
  let posInitial
  let posFinal
  const threshold = 100
  const slides = items.getElementsByClassName('slide')
  const slidesLength = slides.length
  const slideSize = items.getElementsByClassName('slide')[0].offsetWidth
  const firstSlide = slides[0]
  const lastSlide = slides[slidesLength - 1]
  const cloneFirst = firstSlide.cloneNode(true)
  const cloneLast = lastSlide.cloneNode(true)
  let index = 0
  let allowShift = true

  const dragStart = e => {
    e = e || window.event
    e.preventDefault()
    posInitial = items.offsetLeft

    if (e.type === 'touchstart') {
      pos1 = e.touches[0].clientX
    } else {
      pos1 = e.clientX
      document.onmouseup = dragEnd
      document.onmousemove = dragAction
    }
  }

  const dragAction = e => {
    e = e || window.event

    if (e.type === 'touchmove') {
      pos2 = pos1 - e.touches[0].clientX
      pos1 = e.touches[0].clientX
    } else {
      pos2 = pos1 - e.clientX
      pos1 = e.clientX
    }
    items.style.left = (items.offsetLeft - pos2) + 'px'
  }

  const dragEnd = e => {
    posFinal = items.offsetLeft
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag')
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag')
    } else {
      items.style.left = (posInitial) + 'px'
    }

    document.onmouseup = null
    document.onmousemove = null
  }

  const shiftSlide = (dir, action) => {
    items.classList.add('shifting')

    if (allowShift) {
      if (!action) { posInitial = items.offsetLeft }

      if (dir === 1) {
        items.style.left = (posInitial - slideSize) + 'px'
        index++
      } else if (dir === -1) {
        items.style.left = (posInitial + slideSize) + 'px'
        index--
      }
    };

    allowShift = false
  }

  const checkIndex = () => {
    items.classList.remove('shifting')

    if (index === -1) {
      items.style.left = -(slidesLength * slideSize) + 'px'
      index = slidesLength - 1
    }

    if (index === slidesLength) {
      items.style.left = -(1 * slideSize) + 'px'
      index = 0
    }

    allowShift = true
  }

  // Clone first and last slide
  items.appendChild(cloneFirst)
  items.insertBefore(cloneLast, firstSlide)
  wrapper.classList.add('loaded')

  // Mouse events
  items.onmousedown = dragStart

  // Touch events
  items.addEventListener('touchstart', dragStart)
  items.addEventListener('touchend', dragEnd)
  items.addEventListener('touchmove', dragAction)

  // Click events
  prev.addEventListener('click', function () { shiftSlide(-1) })
  next.addEventListener('click', function () { shiftSlide(1) })

  // Transition events
  items.addEventListener('transitionend', checkIndex)
}

export default slide

import slide from './carousel'

const { slider, sliderItems, prev, next } = {
  slider: document.getElementById('slider'),
  sliderItems: document.getElementById('slides'),
  prev: document.getElementById('prev'),
  next: document.getElementById('next')
}

slide(slider, sliderItems, prev, next)

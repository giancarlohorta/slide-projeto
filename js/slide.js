export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = {
      finalPosition: 0,
      startX: 0,
      moviment: 0,
    };
  }

  moveSlide(distX) {
    this.dist.movePostion = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  upDatePosition(clientX) {
    this.dist.moviment = (this.dist.startX - clientX) * 1.6;
    return this.dist.finalPosition - this.dist.moviment;
  }

  onStart(event) {
    event.preventDefault();
    this.dist.startX = event.clientX;
    this.wrapper.addEventListener("mousemove", this.onMove);
  }

  onEnd(event) {
    this.dist.finalPosition = this.dist.movePostion;
    this.wrapper.removeEventListener("mousemove", this.onMove);
  }
  onMove(event) {
    const finalPosition = this.upDatePosition(event.clientX);
    this.moveSlide(finalPosition);
  }
  addSlideEvent() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }
  init() {
    this.bindEvents();
    this.addSlideEvent();
    return this;
  }
}

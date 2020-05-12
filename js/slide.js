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
    let movetype;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.dist.startX = event.clientX;
      movetype = "mousemove";
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      movetype = "touchmove";
    }
    this.wrapper.addEventListener(movetype, this.onMove);
  }

  onMove(event) {
    let pointerPosition;
    if (event.type === "mousemove") {
      pointerPosition = event.clientX;
    } else {
      pointerPosition = event.changedTouches[0].clientX;
    }
    const finalPosition = this.upDatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }
  onEnd(event) {
    let moveType;
    if (event.type === "mouseup") {
      moveType = "mousemove";
    } else {
      moveType = "touchmove";
    }
    this.wrapper.removeEventListener(moveType, this.onMove);
    this.dist.finalPosition = this.dist.movePostion;
  }
  addSlideEvent() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("touchstart", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
    this.wrapper.addEventListener("touchend", this.onEnd);
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

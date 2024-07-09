// import { isTouchDevice, qs } from "../helperFunctions.js"
function qs(element) {
  return document.querySelector(element)
}
function qsa(element) {
  return document.querySelectorAll(element)
}
function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
}


export default class Cursor {
    initiated = false
    cursorCoords = {
        x: null,
        y: null
    }

    constructor() {
        this.cursor = qs('#cursor')

        this.init()
    }

    init() {
        if (isTouchDevice()) return

        gsap.set(this.cursor, {xPercent: -50, yPercent: -50});

        let xTo = gsap.quickTo(this.cursor, "x", {duration: 0.5, ease: "power3"}),
            yTo = gsap.quickTo(this.cursor, "y", {duration: 0.5, ease: "power3"})
        

        let timeout

        document.body.addEventListener('pointermove', (e) => {
            xTo(e.clientX)
            yTo(e.clientY)

            if (!this.initiated) {
                document.body.classList.add('cursor-moved')
                this.initiated = true
            }

            if (document.body.classList.contains('mouse-stopped')) {
                document.body.classList.remove('mouse-stopped')
            }
            clearTimeout(timeout);
            timeout = setTimeout(function(){
                if (document.body.classList.contains('player')) {
                    document.body.classList.add('mouse-stopped')
                }
            }, 2500);
        })

       /*  const cursorProjects = qs('#cursor-projects')

        gsap.set(cursorProjects, {xPercent: -50, yPercent: -50});

        let xTo2 = gsap.quickTo(cursorProjects, "x", {duration: 0.7, ease: "power3"}),
            yTo2 = gsap.quickTo(cursorProjects, "y", {duration: 0.7, ease: "power3"})
        
        document.body.addEventListener('pointermove', (e) => {
            xTo2(e.clientX)
            yTo2(e.clientY)

            
        }) */
    }
}


// How to use
// 作为组件引入
// import Cursor from "./components/cursor.js"
// const cursor = new Cursor()
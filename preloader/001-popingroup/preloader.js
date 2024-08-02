import { delay, isSafariDesktop, qs, qsa } from "./libs/helperFunctions.js";
import SiteLoader from './libs/sl.js'
// import {gsap} from './gsap.min.js'
// import SiteLoader from 'https://www.unpkg.com/siteloader/dist/sl.js'

document.addEventListener("DOMContentLoaded", (event) => {
  // gsap code here!
  // Splitting(); 
  const sl = new SiteLoader();
  sl.progressSpeed = 20;
  //设置是否在真实加载完之后计数会提速
//   sl.needSpeedUp = true; 
// beforeStart  开始加载前
// countComplete 整个计数过程结束（进度值到100数字）
// trueLoadFinish 资源真正地加载完之后就触发（很有可能进度值还没到100）
// progress 计数加载过程中触发（进度值变化0-100都会触发 每次变化都会触发）
//   sl.setTargetTextDom('.loading-num');

  sl.addEventListener('progress', (e) => {
    console.log(e.progress);
  })
  sl.addEventListener('countComplete', () => {
    console.log('countComplete')
    // qs(".loading-screen").remove();
    loadingAnimation();
  });
  sl.startLoad();

 });

function initialAnimations(){
  gsap.fromTo('.loading-screen', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
    }, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        display: 'none',
        ease: "power3.inOut",
        duration: .8,
        delay: .3
    })
    gsap.to('.ls__text-wrapper', {
        yPercent: -100,
        ease: "power3.inOut",
        duration: .8,
        delay: .3,
        onComplete: () => {
            qs('.loading-screen').remove()
        }
    })
}

function enterAnimation(){
  const mySplitTextLoading = Splitting({ target: '#pink-loading', by: 'chars' });
  // charsLoading = mySplitTextLoading.chars;
  const charsLoading = document.querySelectorAll('#pink-loading .char');
  const tlLoading = gsap.timeline()
        tlLoading.to(charsLoading, {
            yPercent: -100,
            stagger: 0.1,
            duration: .4,
        }, 0);
        const mySplitText = Splitting({ target: '.loading-screen__enter', by: 'chars' });
        // chars = mySplitText.chars;
       const chars = document.querySelectorAll('.loading-screen__enter .char');
          tlLoading.fromTo(chars, {
              yPercent: 0,
          }, {
              yPercent: -100,
              stagger: 0.1,
              duration: 1.5,
              ease: "elastic.out(1,0.7)",
              onStart: () => {
                  const loadingScreen = qs('.loading-screen')
                  loadingScreen.classList.add('start-hover')
                  loadingScreen.addEventListener('click', initialAnimations.bind(this))
                  const cookieButtons = qsa('.cky-btn')
                  if (cookieButtons) {
                      cookieButtons.forEach(cBtn => {
                          cBtn.innerHTML = "<div>"+cBtn.innerHTML+"</div>"
                      })
                  }
              }
          }, 0)
}

function loadingAnimation(){
const ease = "power1.inOut"
const delay = .8
const per_text = qs('.loading-screen__percent')
gsap.to('.loading-screen__progress', { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: .8, delay: delay, ease: ease })
gsap.to('.loading-screen__text', { backgroundPosition: '0% 100%', duration: .8, delay: delay, ease: ease })
gsap.to('.loading-screen__percent', { backgroundPosition: '0% 100%', duration: .8, delay: delay, ease: ease, 
    onUpdate: function() {
        per_text.innerHTML = Math.floor(this.progress() * 100)+'%'
    },
    onComplete: enterAnimation,
})
}
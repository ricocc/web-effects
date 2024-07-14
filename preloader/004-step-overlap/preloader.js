
// import SiteLoader from 'https://www.unpkg.com/siteloader/dist/sl.js'
import SiteLoader from './libs/sl.js'

document.addEventListener("DOMContentLoaded", (event) => {
    document.querySelector(".preloader-title").setAttribute("style","opacity:1;");
    initialAnimations();
    // beforeStart  开始加载前
    // countComplete 整个计数过程结束（进度值到100数字）
    // trueLoadFinish 资源真正地加载完之后就触发（很有可能进度值还没到100）
    // progress 计数加载过程中触发（进度值变化0-100都会触发 每次变化都会触发）
  const sl = new SiteLoader();
  sl.progressSpeed = 40;
  sl.setTargetTextDom('.loading-num');
  sl.addEventListener('countComplete', () => {
    console.log('countComplete')
    setTimeout(function(){
        enterAnimation();
    },1000);
  });
  sl.addEventListener('progress', (e) => {
    // console.log(e.progress)
  })
  sl.startLoad();
 });

function initialAnimations(){
    gsap.fromTo(".preloader-progress",{
        opacity:0,
        duration: 1,
        filter: "blur(3px)",
        y: -10,
        ease: "power1.out",
      },{
        opacity:1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power1.out",
      });
}
function enterAnimation(){
    const indexTl = gsap.timeline({
      // repeat: -1, repeatDelay: 1, yoyo: true
       // paused: true, // 初始状态暂停动画
    });
    indexTl.to(".preloader-title",{
      opacity:0,
      duration: .65,
      y: -5,
      filter: "blur(3px)",
      ease: "power1.out",
    });
    indexTl.to(".preloader-progress",{
        opacity:0,
        duration: .65,
        y: -5,
        filter: "blur(3px)",
        ease: "power1.out",
    },"<");
    indexTl.to(".upperone",{
      yPercent: -100,
      duration: .6,
      delay:.15,
      ease: "power1.out",
    },0.8);
    indexTl.to(".downone",{
      yPercent: -100,
      duration: .65,
      delay:.25,
      ease: "power1.out",
    },0.8);
    indexTl.to(".downtwo",{
      yPercent: -100,
      duration: .6,
      delay:.4,
      ease: "power1.out",
    },0.8);
}
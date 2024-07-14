
document.addEventListener("DOMContentLoaded", function () {
    /**
     * @tl_intro   图片显示动画
     * @tl_overlay   mask 蒙版
     * @tl_homeNav      Home 首页导航
     * @tl_nav      Home 首页导航
     */
    gsap.registerPlugin(ScrollTrigger);
    if (typeof gsap.ScrollTrigger === 'undefined') {
      // 假设 ScrollTrigger 插件的构造函数是 ScrollTrigger
      gsap.registerPlugin(ScrollTrigger); // 注意：ScrollTrigger 应该是插件的构造函数或对象
    }


    // import gsap from "gsap";

    // =====================================
    // loading step--1
    // Loading Start Logo
    // =====================================
    const tl_preloader = gsap.timeline({ paused: true });
    if(document.querySelector("#preloader")){
      const preloader = document.getElementById('preloader');
      tl_preloader.to('.preloader-wrapper',
        {
          y: -25,
          duration: 0.75,
          opacity: 0,
          delay: 0.5,
          ease: "Power1.out",
          // scrollTrigger: '.nav-menu',
        }
      );
      tl_preloader.to('.preloader',
      {
        duration: 0.01,
        opacity: 0,
        ease: "Power1.out",
        onComplete: function() {
          // 当动画完成时，移除#preloader元素
          preloader.parentNode.removeChild(preloader);
        }
        // scrollTrigger: '.nav-menu',
      }
      );
    }

    // =====================================
    // Loading step--2
    // 模特图loading加载动画，限制首页展示
    // tl_intro.pause();
    // tl_intro.play();
    // =====================================
    const tl_intro = gsap.timeline({ paused: true });
    if(document.getElementById("intro")){
        const introImgList = gsap.utils.toArray(".intro__img");
        let startDelay = 0; // 初始延迟为0，表示第一个元素立即开始
        introImgList.forEach((imgWrapper, index) => {
          const imgElement = imgWrapper.querySelector("img");
          tl_intro
            .fromTo(
              imgWrapper,
              {
                clipPath: "inset(100% 100% 100% 100%)",
              },
              {
                duration: 2,
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "power1.out",
                delay: startDelay, // 使用计算得出的延迟
              },
              "<" // 确保与下一个动画同时开始（如果有的话）
            )
            .fromTo(
              imgElement,
              {
                scale: 1.8,
              },
              {
                duration: 2,
                scale: 1,
                ease: "power1.out",
              },
              "=" // 使用 "=" 表示与上一个动画同时结束
            );
          // 更新下一个元素的起始延迟
          startDelay += 0.35; // 每个元素在上一个元素后1秒开始
        });
    }
        // =====================================
        // Loading step--3
        // Loading Hide 隐藏
        // =====================================
        const tl_overlay = gsap.timeline({ paused: true });
         if(document.querySelector(".intro")){
            const fadeMask = document.getElementsByClassName("intro__fader");
            const introWrapper = document.getElementById("intro");
            tl_overlay.fromTo(
              fadeMask,
              {
                opacity: 0,
              },
              {
                opacity: 1,
                duration: 1,
                ease: "power2.in",
              },
              0.5
            );
            tl_overlay.fromTo(
              introWrapper,
              {
                yPercent: 0,
              },
              {
                yPercent: -125,
                duration: 1.15,
                ease: "power2.in",
                // onComplete: function() {
                //   // 当动画完成时，移除#introWrapper
                //   introWrapper.parentNode.removeChild(introWrapper);
                // }
              },
              "<"
            );
         }


// =====================================
  // Loading step--1
  // 加载进度条及preloader判断
  // =====================================
    var loadingDone = false;
    const sl = new SiteLoader();
    //  const sl = new SiteLoader();
    sl.setTargetTextDom('.loading-num');
    sl.addEventListener('progress', (e) => {
    //  console.log(e.progress)
    })
    //sl.needSpeedUp = true;
    sl.addEventListener('countComplete', () => {
      //页面资源加载完毕时，进行页面
      tl_preloader.play();
      loadingDone = true;
      });
    sl.startLoad();
    /**
    * 设置延迟，10秒后强行进入页面
    **/
    setTimeout(function(){
      if( loadingDone == false ){
        document.querySelector('.loading-num').innerText = '100';
        tl_preloader.play();
        loadingDone = true;
      }
    },10000);



    // =====================================
    // 动画执行顺序
    // Index Loading 执行顺序
    // 1) SiteLoader  加载进度判断
    // 2) tl_preloader
    // 3) tl_overlay.play();
    // 4) tl_nav.play(); /  HeroImgTimeline.play();
    // =====================================

    tl_preloader.eventCallback("onComplete", function () {
        tl_intro.play();
      });
      tl_intro.eventCallback("onComplete", function () {
        //Enter Index
        tl_overlay.play();
        console.log(" tl_overlay");
      });

        tl_overlay.eventCallback("onComplete", function () {
            // 在 tl_overlay 也完成后，可以添加另一个回调函数来启动 tl_nav
            if(document.querySelector(".no-scroll")){
              // setTimeout(function () {
                document.body.classList.remove("no-scroll");
              // }, 0);
            }
            tl_nav.play();
            if(hasClass('index')){
              HeroImgTimeline.play();
            }
            var loadIntroWrapper = document.getElementById('intro');
            if (loadIntroWrapper) {
              loadIntroWrapper.remove();
            }
        });
});
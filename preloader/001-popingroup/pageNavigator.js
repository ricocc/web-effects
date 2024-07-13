import Slider from "./components/slider.js";
import { delay, isSafariDesktop, qs, qsa } from "./helperFunctions.js";
import ContactPage from "./pages/contact.js";
import HomePage from "./pages/home.js";
import ProjectsPage from "./pages/projects.js";
import SolutionsPage from "./pages/solutions.js";


export default class PageNavigator {
    scroller = null
    videos = null
    header = null
    animations = null
    cursor = null
    animController = null
    videoElement = null
    webStarted = false

    constructor({ scroller, videos, animations, cursor, animController }) {
        this.scroller = scroller
        this.videos = videos
        this.animations = animations
        this.cursor = cursor
        this.animController = animController

        this.init()
    }

    callPageScript(e) {
        let nameSpace = ''
        if (!e) {
            nameSpace = qs('main').getAttribute('data-barba-namespace')
        } else {
            nameSpace = e.next.container.getAttribute('data-barba-namespace')
        }
        
        document.body.classList.remove('footer-visible')
        document.body.classList.remove('can-hover-home-blocks')
        document.body.setAttribute('data-page', nameSpace)

        if (nameSpace === 'home') {
            this.homePage = null
            this.homePage = new HomePage({ scroller: this.scroller })
        }
        if (nameSpace === 'solutions') {
            this.solutionsPage = new SolutionsPage()
        }
        if (nameSpace === 'projects') {
            if (this.projectsPage != null ) {
                this.projectsPage.removeEventListeners()
                this.projectsPage = null
            }
            this.projectsPage = new ProjectsPage({ scroller: this.scroller, videos: this.videos, cursor: this.cursor })
        } else {
            document.body.classList.remove('work-grid')
            document.body.classList.remove('work-list')
        }
        if (nameSpace === 'contact') {
            this.contactPage = new ContactPage({ scroller: this.scroller })
        }

        this.videos.loadVideos()
       
    }

    backToTop() {
        this.scroller.goTop()
    }
    initBackToTopListener() {
        const backTopElement = qs('#back-to-top')
        if (!backTopElement) return

        backTopElement.addEventListener('click', this.backToTop.bind(this))
    }
    removeBackToTopListener() {
        const backTopElement = qs('#back-to-top')
        if (!backTopElement) return

        backTopElement.removeEventListener('click', this.backToTop)
    }

    loadAnimation() {
        const initialAnimations = () => {
            if (this.webStarted) return
            this.webStarted = true
            this.animations.play()
            this.callPageScript()
            this.initBackToTopListener()
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
                    this.scroller.start()
                }
            })
        }
        const enterAnimation = () => {
            /* gsap.to('.loading-screen__percent', {yPercent: 200, rotation: 30, ease: "power1.in", delay: .5, duration: .8})
            gsap.to('.loading-smile', {yPercent: 200, rotation: 30, ease: "power1.in", delay: .5, duration: .6}) */
            const mySplitTextLoading = new SplitText('#pink-loading', { type: "chars" }),
            charsLoading = mySplitTextLoading.chars;
            const tlLoading = gsap.timeline()
            tlLoading.to(charsLoading, {
                yPercent: -100,
                stagger: 0.1,
                duration: .4,
            }, 0);

            const mySplitText = new SplitText('.loading-screen__enter', { type: "chars" }),
            chars = mySplitText.chars;

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
        const ease = "power1.inOut"
        const delay = .8
        const per_text = qs('.loading-screen__percent')
        gsap.to('.loading-screen__progress', { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: .8, delay: delay, ease: ease })
        //gsap.to('.loading-screen__text', { backgroundPosition: '0% 100%', duration: .8, delay: delay, ease: ease })
        gsap.to('.loading-screen__percent', { backgroundPosition: '0% 100%', duration: .8, delay: delay, ease: ease, 
            onUpdate: function() {
                per_text.innerHTML = Math.floor(this.progress() * 100)+'%'
            },
            onComplete: enterAnimation,
        })
        const loadingSmiles = qsa('.loading-smile')
        loadingSmiles.forEach((ls) => {
            gsap.to(ls, {
                rotation: -60,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                duration: 1
            })
        })
    }


    init() {
        this.loadAnimation()

        if (isSafariDesktop()) {
            document.body.classList.add('safari-device')
        }

        this.slider = new Slider()

        barba.init({
            sync: true,
            transitions: [{
                async leave(data) {
                    const done = this.async()
                    const tl = gsap.timeline({ default: {ease: "power2.out"} })
                    tl.to(".pt__curtain", {
                        duration: .6,
                        yPercent: -100,
                        stagger: 0.1,
                    })
                    await delay(900)
                    done()
                },
    
                async enter(data) {
                    const tl = gsap.timeline({ default: {ease: "power2.out"} })
                    tl.to(".pt__curtain", {
                        duration: .6,
                        yPercent: -200,
                        stagger: -0.1,
                        delay: .4,
                        onComplete: () => {
                            gsap.set('.pt__curtain', { yPercent: 100 })
                            gsap.to('.menu-section-btn.ms-1', {
                                height: getComputedStyle(document.documentElement).getPropertyValue('--menu-section-height'),
                                ease: "elastic.out(.8,0.55)",
                                duration: 0,
                            })
                            gsap.to('.menu-section-btn.ms-2', {
                                height: getComputedStyle(document.documentElement).getPropertyValue('--menu-section-height'),
                                ease: "elastic.out(.8,0.55)",
                                duration: 0,
                            })
                            gsap.to('.menu-section-btn.ms-3', {
                                height: getComputedStyle(document.documentElement).getPropertyValue('--menu-section-height'),
                                ease: "elastic.out(.8,0.55)",
                                duration: 0,
                            })
                        }
                    }, 0)
                },
            }]
        });
        barba.hooks.afterOnce(() => {
            this.scroller.goTopImmediately()
        });
        barba.hooks.before(() => {
            // Clean Projects Page Listeners and reseting states regarding that page
            if (this.projectsPage) {
                this.projectsPage.cleanListeners()
            }
            this.videos.closeVideo()

            // Close menu if it's open
            if (this.header) {
                this.header.closeMenu()
            }
            this.scroller.goTop(0)
            this.scroller.stop()

            // Remove Videos Event Listeners
            this.videos.cleanVideos()
            this.removeBackToTopListener()
            this.animController.clearAnimations()
            console.log("top");
        });
        barba.hooks.after((e) => {
            // Update Locomotive Scroll to recalculate page height
            this.scroller.update();
            
            // Load all GSAP animations again
            this.animations.play()
            
            this.initBackToTopListener()

            // Add Videos Event Listeners
            this.videos.cleanVideos()

            this.callPageScript(e)


            this.scroller.goTopImmediately()

            this.slider.init()
            this.slider.cleanObserver()
            this.slider.addObserver()

            this.scroller.start()
        });

    }

    go(url) {
        barba.go(url)
    }
}
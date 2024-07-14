function zeroPad(num, size) {
    num = num.toString()
    while (num.length < size) num = "0" + num
    return num
}

function truncateDecimals(number, digits) {
    var multiplier = Math.pow(10, digits),
        adjustedNum = number * multiplier,
        truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum)

    return truncatedNum / multiplier
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
}

function isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
}

function isIOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

function isSafariDesktop() {
    const uA = navigator.userAgent
    const vendor = navigator.vendor
    return (/Safari/i.test(uA) && /Apple Computer/.test(vendor) && !/Mobi|Android/i.test(uA))
}

function isDeviceSafari() {
    return navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
}

function preloadImages(array, callbackFunction) {
    if (!preloadImages.list) {
        preloadImages.list = []
    }
    const list = preloadImages.list
    for (let i = 0; i < array.length; i++) {
        const img = new Image()
        img.onload = function() {
            var index = list.indexOf(this)
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1)
                callbackFunction()
            }
        }
        list.push(img)
        img.src = array[i]
    }
}

function qs(element) {
    return document.querySelector(element)
}

function qsa(element) {
    return document.querySelectorAll(element)
}

function secondsToTimeFormat(duration) {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;
  
    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";
  
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
  
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
  
    return ret;
}

function delay(n) {
    n = n || 2000
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    })
}

export { 
    zeroPad, 
    truncateDecimals,
    hexToRgb, 
    isTouchDevice,
    isIOS, 
    isSafariDesktop, 
    isDeviceSafari, 
    preloadImages,
    qs,
    qsa,
    secondsToTimeFormat,
    delay,
}
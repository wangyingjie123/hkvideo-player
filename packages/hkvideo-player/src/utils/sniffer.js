/* eslint-disable */
import UAParser from 'ua-parser-js';
const parser = new UAParser();
let sniffer = {
    get device() {
        let r = sniffer.os
        return r.isPc ? 'pc' : 'mobile'
        // return r.isPc ? 'pc' : r.isTablet ? 'tablet' : 'mobile'
    },
    get browser() {
        return parser.getBrowser();
    },
    get os() {
        let ua = navigator.userAgent
        let isWindowsPhone = /(?:Windows Phone)/.test(ua)
        let isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
        let isAndroid = /(?:Android)/.test(ua)
        let isFireFox = /(?:Firefox)/.test(ua)
        let isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
        let isPhone = /(?:iPhone)/.test(ua) && !isTablet
        let isPc = !isPhone && !isAndroid && !isSymbian
        return {
            isTablet,
            isPhone,
            isAndroid,
            isPc,
            isSymbian,
            isWindowsPhone,
            isFireFox
        }
    }
}

export default sniffer

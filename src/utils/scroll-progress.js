import {ref} from "vue";
export default function VueScrollProgress() {
    const progressEleRef = ref()
    let windowScrollPixels,
        windowScrollPercents,
        height;

    windowScrollPixels = 0
    windowScrollPercents = 0

    const getHeight = () => {
        height = (document.querySelector('#scroll-content').scrollHeight - document.querySelector('#scroll-content').clientHeight)
    }

    const debounce = (func, wait, immediate) => {
        let timeout;
        return () => {
            const context = this,
                args = arguments
            const later = function () {
                timeout = null
                if (!immediate) func.apply(context, args)
            }
            const callNow = immediate && !timeout
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
            if (callNow) func.apply(context, args)
        }
    }

    const windowRe = () => {
        let h = document.body
        h.addEventListener('resize', debounce(() => {
            getHeight()
        }, 200, false), false)
    }

    const progressMove = () => {
        window.addEventListener('scroll', () => {
            windowScrollPixels = document.querySelector('#scroll-content').scrollTop
            windowScrollPercents = (windowScrollPixels / height) * 100
            progressEleRef.value.style.height = windowScrollPercents + '%'
        },true)
    }

    return {
        windowRe,
        progressMove,
        progressEleRef,
        getHeight
    }
}

class MyPromise {
    //创建执行构造函数
    constructor(executor) {
        this.status = 'pending'
        this.value = null
        this.reason = null
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []
        let resolve = value => {
            //ES6 简写 箭头函数返回一个对象
            if (this.status === 'pending') {
                this.status = 'fulfilled'
                this.value = value
                this.onFulfilledCallbacks.forEach(fn => fn())  //调用成功的回调函数
            }
        }

        let reject = reason => {
            if (this.status === 'pending') {
                this.status = 'rejected'
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => fn()) //调用失败的回调函数
            }
        }
        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    then(onFulfilled, onRejected) {
        return new MyPromise(() => {
            if (this.status === 'fulfilled') {
                setTimeout(() => {
                    const x = onFulfilled(this.value)
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
                })
            }
            if (this.status === 'rejected') {
                setTimeout(() => {
                    const x = onRejected(this.value)
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
                })
            }
            if(this.status === 'pending') {
                this.onFulfilledCallbacks.push(()=>{
                    setTimeout(() => {
                        const x = onFulfilled(this.value)
                        x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
                    })
                })
                this.onRejectedCallbacks.push(()=>{
                    setTimeout(() => {
                        const x = onRejected(this.value)
                        x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
                    })
                })
            }
        })
    }
}

function p1() {
    return new MyPromise((resolve, reject) => {
        setTimeout(resolve, 1000, 1)
    })
}
function p2() {
    return new MyPromise((resolve, reject) => {
        setTimeout(resolve, 1000, 3)
    })
}

p1().then(res=> {
    console.log(res)
    return p2()
}).then(ret=> {
    console.log(ret)
})

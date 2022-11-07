/* 回调函数类型 */
type AnimationCallback = (dt: number) => any

/* 当前时间记录 */
let currentTime = Date.now()

/* 动画类 */
class Animation {
    /* id */
    static id = 0
    /* 动画队列 */
    static animationTask = new Map<number , Animation>()
    /* 是否启动动画 */
    static isStartAnimation = false
    /* 启动动画 */
    static animationLoop() {
        const now = Date.now()
        for (const animationMap of Animation.animationTask) {
            const animation = animationMap[1]
            if (animation.active && animation.callback)
                animation.callback(now - currentTime)
        }
        currentTime = now
        requestAnimationFrame(Animation.animationLoop)
    }
    /* id */
    public id: number = ++Animation.id
    /* 是否活跃 */
    public active: boolean = true
    /* 回调 */
    public callback: AnimationCallback
    /* 构造器 */
    constructor(callback: AnimationCallback) { this.callback = callback }
}

/* 注册动画 */
function register(callback: any): number {
    const animation = new Animation(callback)
    Animation.animationTask.set(animation.id , animation)
    if (!Animation.isStartAnimation) {
        currentTime = Date.now()
        Animation.animationLoop()
        Animation.isStartAnimation = true
    }
    return animation.id
}

/* 销毁动画 */
function destroy(id: number): boolean {
    return Animation.animationTask.delete(id)
}

/* 暂停动画 */
function stop(id: number): void {
    const animation = Animation.animationTask.get(id)
    if (animation) animation.active = false
    else console.warn("this animation instance by id : " + id + " has be destroyed")
}

/* 启动动画 */
function start(id: number): void {
    const animation = Animation.animationTask.get(id)
    if (animation) animation.active = true
    else console.warn("this animation instance by id : " + id + " has be destroyed")
}

export default {
    stop ,
    start,

    destroy ,
    register ,
}

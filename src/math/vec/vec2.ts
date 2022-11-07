/* vec2 2维向量 */
import {Vec} from "./vec";

const type = Symbol()

export default class Vec2 implements Vec{
    public get type() {return type}
    public static isInstance(v: any) { return v.type === type }
    /* 数据域 */
    private readonly data: number[] = [ 0 , 0 ]
    /* 读取与设置 */
    get x() { return this.data[0] }
    set x(v: number) { this.data[0] = v }
    get r() { return this.data[0] }
    set r(v: number) { this.data[0] = v }

    get y() { return this.data[1] }
    set y(v: number) { this.data[1] = v }
    get g() { return this.data[1] }
    set g(v: number) { this.data[1] = v }
    /* 长度 */
    get length () {
        return Math.sqrt( this.x * this.x + this.y * this.y );
    }
    /* 构造器 */
    public constructor(data?: number[]|Vec2|undefined) {
        if (!data) return
        if (data instanceof Vec2) this.data = [...data.data]
        else {
            data.length = 2
            this.data = [...data]
        }
    }
    /* 向量点乘 */
    public dot(v: Vec2): number {
        return v.x * this.x + v.y * this.y
    }
    /* 向量叉乘 */
    public cross(v : Vec2): number {
        return this.x * v.y - this.y * v.x
    }
    /* 向量加向量 */
    public addition(v: Vec2|number[]): this {
        if (Vec2.isInstance(v)) {
            this.x = this.x + (<Vec2>v).x
            this.y = this.y + (<Vec2>v).y
        } else {
            this.x = this.x + (<number[]>v)[0]
            this.y = this.y + (<number[]>v)[1]
        }
        return this
    }
    /* 向量相减 */
    public reduce(v: Vec2): this {
        this.x -= v.x
        this.y -= v.y
        return this
    }
    /* 向量乘数字 */
    public multiplication(num: number): this {
        this.x = this.x * num
        this.y = this.y * num
        return this
    }
    /* 向量取反 */
    public negative (): this {
        this.x = -this.x
        this.y = -this.y
        return this
    }
    /* 随机二维向量 */
    public random(): this {
        this.x = Math.random()
        this.y = Math.random()
        return  this
    }
    /* 复制向量 */
    public copy(): Vec2 { return new Vec2(this) }
    /* 转换为数组 */
    public toArray(): number[] { return [...this.data] }
}

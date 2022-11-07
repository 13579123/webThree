import {Vec} from "./vec";

const type = Symbol()

export default class Vec4  implements Vec{
    public get type() {return type}
    public static isInstance(v: any) { return v.type === type }
    /* 数据域 */
    private readonly data: number[] = [ 0 , 0 , 0 , 0 ]
    /* 读取与设置 */
    get x() { return this.data[0] }
    set x(v: number) { this.data[0] = v }
    get r() { return this.data[0] }
    set r(v: number) { this.data[0] = v }

    get y() { return this.data[1] }
    set y(v: number) { this.data[1] = v }
    get g() { return this.data[1] }
    set g(v: number) { this.data[1] = v }

    get z() { return this.data[2] }
    set z(v: number) { this.data[2] = v }
    get b() { return this.data[2] }
    set b(v: number) { this.data[2] = v }

    get w() { return this.data[3] }
    set w(v: number) { this.data[3] = v }
    get a() { return this.data[3] }
    set a(v: number) { this.data[3] = v }
    /* 长度 */
    get length () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );
    }
    /* 构造器 */
    public constructor(data: number[]|Vec4|undefined) {
        if (!data) return
        if (data instanceof Vec4) this.data = [...data.data]
        else {
            data.length = 4
            this.data = [...data]
        }
    }
    /* 向量点乘 */
    public dot(v: Vec4): number {
        return v.x * this.x + v.y * this.y + v.z * this.z + v.w * this.z
    }
    /* 向量加向量 */
    public addition(v: Vec4|number[]): this {
        if (Array.isArray(v)) {
            this.x = this.x + v[0]
            this.y = this.y + v[1]
            this.z = this.z + v[2]
            this.w = this.w + v[3]
        } else {
            this.x = this.x + v.x
            this.y = this.y + v.y
            this.z = this.z + v.z
            this.w = this.w + v.w
        }
        return this
    }
    /* 向量相减 */
    public reduce(v: Vec4): this {
        this.x -= v.x
        this.y -= v.y
        this.z -= v.z
        this.w -= v.w
        return this
    }
    /* 向量乘数字 */
    public multiplication(num: number): this {
        this.x = this.x * num
        this.y = this.y * num
        this.z = this.z * num
        this.w = this.w * num
        return this
    }
    /* 向量取反 */
    public negative (): this {
        this.x = -this.x
        this.y = -this.y
        this.z = -this.z
        this.w = -this.w
        return this
    }
    /* 随机四维向量 */
    public random(): this {
        this.x = Math.random()
        this.y = Math.random()
        this.z = Math.random()
        this.w = Math.random()
        return  this
    }
    /* 复制向量 */
    public copy(): Vec4 { return new Vec4(this) }
    /* 转换为数组 */
    public toArray(): number[] { return [...this.data] }
}

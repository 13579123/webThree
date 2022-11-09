(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.webThree = factory());
})(this, (function () { 'use strict';

    const type$5 = Symbol();
    class Vec3 {
        get type() { return type$5; }
        static isInstance(v) { return v.type === type$5; }
        /* 数据域 */
        data = [0, 0, 0];
        /* 读取与设置 */
        get x() { return this.data[0]; }
        set x(v) { this.data[0] = v; }
        get r() { return this.data[0]; }
        set r(v) { this.data[0] = v; }
        get y() { return this.data[1]; }
        set y(v) { this.data[1] = v; }
        get g() { return this.data[1]; }
        set g(v) { this.data[1] = v; }
        get z() { return this.data[2]; }
        set z(v) { this.data[2] = v; }
        get b() { return this.data[2]; }
        set b(v) { this.data[2] = v; }
        /* 长度 */
        get length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
        /* 构造器 */
        constructor(data) {
            if (!data)
                return;
            if (data instanceof Vec3)
                this.data = [...data.data];
            else {
                data.length = 3;
                this.data = [...data];
            }
        }
        /* 向量点乘 */
        dot(v) {
            return v.x * this.x + v.y * this.y + v.z * this.z;
        }
        /* 向量叉乘 */
        cross(v) {
            const x = this.y * v.z - v.y * this.z;
            const y = this.z * v.x - v.z * this.x;
            const z = this.x * v.y - v.x * this.y;
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        }
        /* 向量加向量 */
        addition(v) {
            if (Array.isArray(v)) {
                this.x = this.x + v[0];
                this.y = this.y + v[1];
                this.z = this.z + v[2];
            }
            else {
                this.x = this.x + v.x;
                this.y = this.y + v.y;
                this.z = this.z + v.z;
            }
            return this;
        }
        /* 向量相减 */
        reduce(v) {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
            return this;
        }
        /* 向量乘数字 */
        multiplication(num) {
            this.x = this.x * num;
            this.y = this.y * num;
            this.z = this.z * num;
            return this;
        }
        /* 向量取反 */
        negative() {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            return this;
        }
        /* 随机三维向量 */
        random() {
            this.x = Math.random();
            this.y = Math.random();
            this.z = Math.random();
            return this;
        }
        /* 复制向量 */
        copy() { return new Vec3(this); }
        /* 转换为数组 */
        toArray() { return [...this.data]; }
    }

    const type$4 = Symbol();
    class Vec2 {
        get type() { return type$4; }
        static isInstance(v) { return v.type === type$4; }
        /* 数据域 */
        data = [0, 0];
        /* 读取与设置 */
        get x() { return this.data[0]; }
        set x(v) { this.data[0] = v; }
        get r() { return this.data[0]; }
        set r(v) { this.data[0] = v; }
        get y() { return this.data[1]; }
        set y(v) { this.data[1] = v; }
        get g() { return this.data[1]; }
        set g(v) { this.data[1] = v; }
        /* 长度 */
        get length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        /* 构造器 */
        constructor(data) {
            if (!data)
                return;
            if (data instanceof Vec2)
                this.data = [...data.data];
            else {
                data.length = 2;
                this.data = [...data];
            }
        }
        /* 向量点乘 */
        dot(v) {
            return v.x * this.x + v.y * this.y;
        }
        /* 向量叉乘 */
        cross(v) {
            return this.x * v.y - this.y * v.x;
        }
        /* 向量加向量 */
        addition(v) {
            if (Vec2.isInstance(v)) {
                this.x = this.x + v.x;
                this.y = this.y + v.y;
            }
            else {
                this.x = this.x + v[0];
                this.y = this.y + v[1];
            }
            return this;
        }
        /* 向量相减 */
        reduce(v) {
            this.x -= v.x;
            this.y -= v.y;
            return this;
        }
        /* 向量乘数字 */
        multiplication(num) {
            this.x = this.x * num;
            this.y = this.y * num;
            return this;
        }
        /* 向量取反 */
        negative() {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        }
        /* 随机二维向量 */
        random() {
            this.x = Math.random();
            this.y = Math.random();
            return this;
        }
        /* 复制向量 */
        copy() { return new Vec2(this); }
        /* 转换为数组 */
        toArray() { return [...this.data]; }
    }

    const type$3 = Symbol();
    class Vec4 {
        get type() { return type$3; }
        static isInstance(v) { return v.type === type$3; }
        /* 数据域 */
        data = [0, 0, 0, 0];
        /* 读取与设置 */
        get x() { return this.data[0]; }
        set x(v) { this.data[0] = v; }
        get r() { return this.data[0]; }
        set r(v) { this.data[0] = v; }
        get y() { return this.data[1]; }
        set y(v) { this.data[1] = v; }
        get g() { return this.data[1]; }
        set g(v) { this.data[1] = v; }
        get z() { return this.data[2]; }
        set z(v) { this.data[2] = v; }
        get b() { return this.data[2]; }
        set b(v) { this.data[2] = v; }
        get w() { return this.data[3]; }
        set w(v) { this.data[3] = v; }
        get a() { return this.data[3]; }
        set a(v) { this.data[3] = v; }
        /* 长度 */
        get length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        }
        /* 构造器 */
        constructor(data) {
            if (!data)
                return;
            if (data instanceof Vec4)
                this.data = [...data.data];
            else {
                data.length = 4;
                this.data = [...data];
            }
        }
        /* 向量点乘 */
        dot(v) {
            return v.x * this.x + v.y * this.y + v.z * this.z + v.w * this.z;
        }
        /* 向量加向量 */
        addition(v) {
            if (Array.isArray(v)) {
                this.x = this.x + v[0];
                this.y = this.y + v[1];
                this.z = this.z + v[2];
                this.w = this.w + v[3];
            }
            else {
                this.x = this.x + v.x;
                this.y = this.y + v.y;
                this.z = this.z + v.z;
                this.w = this.w + v.w;
            }
            return this;
        }
        /* 向量相减 */
        reduce(v) {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
            this.w -= v.w;
            return this;
        }
        /* 向量乘数字 */
        multiplication(num) {
            this.x = this.x * num;
            this.y = this.y * num;
            this.z = this.z * num;
            this.w = this.w * num;
            return this;
        }
        /* 向量取反 */
        negative() {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            this.w = -this.w;
            return this;
        }
        /* 随机四维向量 */
        random() {
            this.x = Math.random();
            this.y = Math.random();
            this.z = Math.random();
            this.w = Math.random();
            return this;
        }
        /* 复制向量 */
        copy() { return new Vec4(this); }
        /* 转换为数组 */
        toArray() { return [...this.data]; }
    }

    const type$2 = Symbol();
    class Matrix4 {
        get type() { return type$2; }
        static isInstance(m) { return m.type === type$2; }
        data = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        constructor(data) {
            if (!data)
                return;
            if (data instanceof Matrix4)
                this.data = data.toArray();
            else if (data instanceof Array) {
                data.length = 16;
                data.forEach((e, i) => e || (data[i] = 0));
                this.data = [...data];
            }
        }
        empty() {
            this.data = [
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
            ];
            return this;
        }
        get(r, c) {
            return this.data[(r - 1) * 4 + (c - 1)];
        }
        /* 获取某行数据 */
        getRow(row) {
            const result = [];
            for (let i = 0; i < 4; i++)
                result.push(this.data[(row - 1) * 4 + i]);
            return result;
        }
        /* 获取某列数据 */
        getClo(clo) {
            const result = [];
            for (let i = 0; i < 4; i++)
                result.push(this.data[i * 4 + (clo - 1)]);
            return result;
        }
        set(r, c, value) {
            if (r > 4 || c > 4)
                throw "can not read " + r + ',' + c + ' from matrix';
            this.data[(r - 1) * 4 + (c - 1)] = value;
            return this;
        }
        /* 设置某行矩阵 */
        setRow(row, vec) {
            if (!Array.isArray(vec))
                vec = vec.toArray();
            for (let i = 0; i < 4; i++)
                this.data[(row - 1) * 4 + i] = vec[i];
            return this;
        }
        identity() {
            return this
                .set(1, 1, 1).set(1, 2, 0).set(1, 3, 0).set(1, 4, 0)
                .set(2, 1, 0).set(2, 2, 1).set(2, 3, 0).set(2, 4, 0)
                .set(3, 1, 0).set(3, 2, 0).set(3, 3, 1).set(3, 4, 0)
                .set(4, 1, 0).set(4, 2, 0).set(4, 3, 0).set(4, 4, 1);
        }
        inverse() {
            const te = this.data, n11 = te[0], n21 = te[1], n31 = te[2], n41 = te[3], n12 = te[4], n22 = te[5], n32 = te[6], n42 = te[7], n13 = te[8], n23 = te[9], n33 = te[10], n43 = te[11], n14 = te[12], n24 = te[13], n34 = te[14], n44 = te[15], t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44, t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44, t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44, t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
            const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;
            if (det === 0)
                return this.empty();
            const detInv = 1 / det;
            te[0] = t11 * detInv;
            te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
            te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
            te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;
            te[4] = t12 * detInv;
            te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
            te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
            te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;
            te[8] = t13 * detInv;
            te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
            te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
            te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;
            te[12] = t14 * detInv;
            te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
            te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
            te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;
            return this;
        }
        determinant() {
            // TODO
            console.warn(" can not get the determinant from matrix4 ");
            return 0;
        }
        transpose() {
            let tmp;
            tmp = this.data[1];
            this.data[1] = this.data[4];
            this.data[4] = tmp;
            tmp = this.data[2];
            this.data[2] = this.data[8];
            this.data[8] = tmp;
            tmp = this.data[6];
            this.data[6] = this.data[9];
            this.data[9] = tmp;
            tmp = this.data[3];
            this.data[3] = this.data[12];
            this.data[12] = tmp;
            tmp = this.data[7];
            this.data[7] = this.data[13];
            this.data[13] = tmp;
            tmp = this.data[11];
            this.data[11] = this.data[14];
            this.data[14] = tmp;
            return this;
        }
        /* 矩阵乘以数字或矩阵 */
        multiplication(data) {
            if (Vec4.isInstance(data)) {
                data = data;
                return new Vec4([
                    this.get(1, 1) * data.x + this.get(1, 2) * data.y + this.get(1, 3) * data.z + this.get(1, 4) * data.w,
                    this.get(2, 1) * data.x + this.get(2, 2) * data.y + this.get(2, 3) * data.z + this.get(2, 4) * data.w,
                    this.get(3, 1) * data.x + this.get(3, 2) * data.y + this.get(3, 3) * data.z + this.get(3, 4) * data.w,
                    this.get(4, 1) * data.x + this.get(4, 2) * data.y + this.get(4, 3) * data.z + this.get(4, 4) * data.w,
                ]);
            }
            if (typeof data === "number")
                for (let i = 0; i < this.data.length; i++)
                    this.data[i] += data;
            else if (data instanceof Matrix4) {
                let finalData = [];
                for (let i = 1; i <= 4; i++)
                    for (let j = 1; j <= 4; j++) {
                        let result = 0;
                        for (let k = 1; k <= 4; k++)
                            result += this.get(i, k) * data.get(k, j);
                        finalData.push(result);
                    }
                for (let i = 0; i < finalData.length; i++)
                    this.data[i] = finalData[i];
            }
            return this;
        }
        /* 转换为数组 */
        toArray() { return [...this.data]; }
        /* 复制矩阵 */
        copy() { return new Matrix4(this); }
        /* 克隆 */
        clone(data) {
            if (Array.isArray(data))
                this.data = [...data];
            else
                this.data = [...data.data];
            return this;
        }
        /* 返回float32数据 */
        toFloat32Array() {
            return new Float32Array(this.toArray());
        }
    }

    const type$1 = Symbol();
    /* 三维矩阵 */
    class Matrix3 {
        get type() { return type$1; }
        static isInstance(m) { return m.type === type$1; }
        /* 数据区域 */
        data = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ];
        /* 构造器 */
        constructor(data) {
            if (!data)
                return;
            if (data instanceof Matrix3)
                this.data = data.toArray();
            else if (data instanceof Array) {
                data.length = 9;
                data.forEach((e, i) => e || (data[i] = 0));
                this.data = [...data];
            }
        }
        /* 空矩阵 */
        empty() {
            this.data = [
                0, 0, 0,
                0, 0, 0,
                0, 0, 0
            ];
            return this;
        }
        /* 获取矩阵值 */
        get(r, c) {
            return this.data[(r - 1) * 3 + (c - 1)];
        }
        /* 获取某行数据 */
        getRow(row) {
            const result = [];
            for (let i = 0; i < 3; i++)
                result.push(this.data[(row - 1) * 3 + i]);
            return result;
        }
        /* 获取某列数据 */
        getClo(clo) {
            const result = [];
            for (let i = 0; i < 3; i++)
                result.push(this.data[i * 3 + (clo - 1)]);
            return result;
        }
        /* 设置矩阵值 */
        set(r, c, value) {
            if (r > 3 || c > 3)
                throw "can not read " + r + ',' + c + ' from matrix';
            this.data[(r - 1) * 3 + (c - 1)] = value;
            return this;
        }
        /* 设置某行矩阵 */
        setRow(row, vec) {
            if (!Array.isArray(vec))
                vec = vec.toArray();
            for (let i = 0; i < 3; i++)
                this.data[(row - 1) * 3 + i] = vec[i];
            return this;
        }
        /* 标准矩阵 */
        identity() {
            this.set(1, 1, 1).set(1, 2, 0).set(1, 3, 0)
                .set(2, 1, 0).set(2, 2, 1).set(2, 3, 0)
                .set(3, 1, 0).set(3, 2, 0).set(3, 3, 1);
            return this;
        }
        /* 矩阵转置 */
        transpose() {
            let tmp;
            tmp = this.data[1];
            this.data[1] = this.data[3];
            this.data[3] = tmp;
            tmp = this.data[2];
            this.data[2] = this.data[6];
            this.data[6] = tmp;
            tmp = this.data[5];
            this.data[5] = this.data[7];
            this.data[7] = tmp;
            return this;
        }
        /* 矩阵行列式 */
        determinant() {
            const a = this.data[0], b = this.data[1], c = this.data[2], d = this.data[3], e = this.data[4], f = this.data[5], g = this.data[6], h = this.data[7], i = this.data[8];
            return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
        }
        /* 矩阵的逆 */
        inverse() {
            const te = this.data, n11 = te[0], n21 = te[1], n31 = te[2], n12 = te[3], n22 = te[4], n32 = te[5], n13 = te[6], n23 = te[7], n33 = te[8], t11 = n33 * n22 - n32 * n23, t12 = n32 * n13 - n33 * n12, t13 = n23 * n12 - n22 * n13, det = n11 * t11 + n21 * t12 + n31 * t13;
            if (det === 0)
                return this.empty();
            const detInv = 1 / det;
            te[0] = t11 * detInv;
            te[1] = (n31 * n23 - n33 * n21) * detInv;
            te[2] = (n32 * n21 - n31 * n22) * detInv;
            te[3] = t12 * detInv;
            te[4] = (n33 * n11 - n31 * n13) * detInv;
            te[5] = (n31 * n12 - n32 * n11) * detInv;
            te[6] = t13 * detInv;
            te[7] = (n21 * n13 - n23 * n11) * detInv;
            te[8] = (n22 * n11 - n21 * n12) * detInv;
            return this;
        }
        /* 矩阵乘以数字或矩阵 */
        multiplication(data) {
            if (Vec3.isInstance(data)) {
                data = data;
                return new Vec3([
                    this.get(1, 1) * data.x + this.get(1, 2) * data.y + this.get(1, 3) * data.z,
                    this.get(2, 1) * data.x + this.get(2, 2) * data.y + this.get(2, 3) * data.z,
                    this.get(3, 1) * data.x + this.get(3, 2) * data.y + this.get(3, 3) * data.z,
                ]);
            }
            if (typeof data === "number")
                for (let i = 0; i < this.data.length; i++)
                    this.data[i] += data;
            else if (data instanceof Matrix3) {
                let finalData = [];
                for (let i = 1; i <= 3; i++)
                    for (let j = 1; j <= 3; j++) {
                        let result = 0;
                        for (let k = 1; k <= 3; k++)
                            result += this.get(i, k) * data.get(k, j);
                        finalData.push(result);
                    }
                for (let i = 0; i < finalData.length; i++)
                    this.data[i] = finalData[i];
            }
            return this;
        }
        /* 拷贝 */
        copy() { return new Matrix3(this); }
        /* 克隆 */
        clone(data) {
            if (Array.isArray(data))
                this.data = [...data];
            else
                this.data = [...data.data];
            return this;
        }
        /* 转换为数组 */
        toArray() { return [...this.data]; }
        /* 返回float32数据 */
        toFloat32Array() {
            return new Float32Array(this.toArray());
        }
    }

    const type = Symbol();
    class Matrix2 {
        get type() { return type; }
        static isInstance(m) { return m.type === type; }
        /* 数据区域 */
        data = [
            1, 0,
            0, 1
        ];
        /* 构造器 */
        constructor(data) {
            if (!data)
                return;
            if (data instanceof Matrix2)
                this.data = data.toArray();
            else if (data instanceof Array) {
                data.length = 4;
                data.forEach((e, i) => e || (data[i] = 0));
                this.data = [...data];
            }
        }
        /* 空矩阵 */
        empty() {
            this.data = [
                0, 0,
                0, 0
            ];
            return this;
        }
        /* 获取矩阵值 */
        get(r, c) {
            return this.data[(r - 1) * 2 + (c - 1)];
        }
        /* 获取某行数据 */
        getRow(row) {
            const result = [];
            for (let i = 0; i < 2; i++)
                result.push(this.data[(row - 1) * 2 + i]);
            return result;
        }
        /* 获取某列数据 */
        getClo(clo) {
            const result = [];
            for (let i = 0; i < 2; i++)
                result.push(this.data[i * 2 + (clo - 1)]);
            return result;
        }
        /* 设置矩阵值 */
        set(r, c, value) {
            if (r > 2 || c > 2)
                throw "can not read " + r + ',' + c + ' from matrix';
            this.data[(r - 1) * 2 + (c - 1)] = value;
            return this;
        }
        /* 设置某行矩阵 */
        setRow(row, vec) {
            if (!Array.isArray(vec))
                vec = vec.toArray();
            for (let i = 0; i < 2; i++)
                this.data[(row - 1) * 2 + i] = vec[i];
            return this;
        }
        /* 标准矩阵 */
        identity() {
            this.set(1, 1, 1).set(1, 2, 0)
                .set(2, 1, 0).set(2, 2, 1);
            return this;
        }
        /* 转置矩阵 */
        transpose() {
            let temp;
            temp = this.get(1, 2);
            this.set(1, 2, this.get(2, 1));
            this.set(2, 1, temp);
            return this;
        }
        /* 矩阵行列式 */
        determinant() {
            const result = this.get(1, 1) * this.get(2, 2)
                -
                    this.get(1, 2) * this.get(2, 1);
            return result;
        }
        /* 矩阵的逆 */
        inverse() {
            let n11 = this.get(1, 1), n12 = this.get(1, 2), n21 = this.get(2, 1), n22 = this.get(2, 2);
            const k = 1 / (n11 * n22 - n12 * n21);
            this.set(1, 1, n22 * k);
            this.set(2, 2, n11 * k);
            this.set(1, 2, -n12 * k);
            this.set(2, 1, -n21 * k);
            return this;
        }
        /* 矩阵乘以数字或矩阵 */
        multiplication(data) {
            if (Vec2.isInstance(data)) {
                data = data;
                return new Vec2([
                    this.get(1, 1) * data.x + this.get(1, 2) * data.y,
                    this.get(2, 1) * data.x + this.get(2, 2) * data.y,
                ]);
            }
            if (typeof data === "number")
                for (let i = 0; i < this.data.length; i++)
                    this.data[i] += data;
            else if (data instanceof Matrix2) {
                const n11 = this.get(1, 1) * data.get(1, 1) + this.get(1, 2) * data.get(2, 1), n12 = this.get(1, 1) * data.get(1, 2) + this.get(1, 2) * data.get(2, 2), n21 = this.get(2, 1) * data.get(1, 2) + this.get(2, 2) * data.get(2, 2), n22 = this.get(2, 1) * data.get(1, 2) + this.get(2, 2) * data.get(2, 2);
                this.set(1, 1, n11)
                    .set(1, 2, n12)
                    .set(2, 1, n21)
                    .set(2, 2, n22);
            }
            return this;
        }
        /* 拷贝 */
        copy() { return new Matrix2(this); }
        /* 克隆 */
        clone(data) {
            if (Array.isArray(data))
                this.data = [...data];
            else
                this.data = [...data.data];
            return this;
        }
        /* 转换为数组 */
        toArray() { return [...this.data]; }
        /* 返回float32数据 */
        toFloat32Array() { return new Float32Array(this.toArray()); }
    }

    /* 创建程序 */
    function createProgram(context, vs, fs) {
        const program = context.createProgram();
        if (!program)
            throw "create program failure";
        let vertexShader, fragmentShader;
        if (typeof vs === "string")
            vertexShader = createShader(context, context.VERTEX_SHADER, vs);
        else
            vertexShader = vs;
        if (typeof fs === "string")
            fragmentShader = createShader(context, context.FRAGMENT_SHADER, fs);
        else
            fragmentShader = fs;
        context.attachShader(program, vertexShader);
        context.attachShader(program, fragmentShader);
        context.linkProgram(program);
        if (vertexShader !== vs)
            context.deleteShader(vertexShader);
        if (fragmentShader !== fs)
            context.deleteShader(fragmentShader);
        return program;
    }
    /* 创建shader */
    function createShader(context, type, source) {
        const shader = context.createShader(type);
        if (!shader)
            throw "create shader failure";
        context.shaderSource(shader, source);
        context.compileShader(shader);
        if (!context.getShaderParameter(shader, context.COMPILE_STATUS))
            console.error(`${type === context.VERTEX_SHADER ? "vertex" : "fragment"} shader failure :: ` + context.getShaderInfoLog(shader));
        return shader;
    }
    /* 发送数据到uniform中 */
    function sendUniformData(context, program, name, data, type = "float") {
        const uniformLocation = context.getUniformLocation(program, name);
        if (uniformLocation === null) {
            console.warn(`can not find uniform location with '${name}'`);
            return null;
        }
        if (Matrix4.isInstance(data))
            context.uniformMatrix4fv(uniformLocation, false, data.toFloat32Array());
        else if (Matrix3.isInstance(data))
            context.uniformMatrix3fv(uniformLocation, false, data.toFloat32Array());
        else if (Matrix2.isInstance(data))
            context.uniformMatrix2fv(uniformLocation, false, data.toFloat32Array());
        else if (Vec4.isInstance(data))
            context.uniform4f(uniformLocation, data.x, data.y, data.z, data.w);
        else if (Vec3.isInstance(data))
            context.uniform3f(uniformLocation, data.x, data.y, data.z);
        else if (Vec2.isInstance(data))
            context.uniform2f(uniformLocation, data.x, data.y);
        else if (typeof data === "number" && type === "float")
            context.uniform1f(uniformLocation, data);
        else if (typeof data === "number" && type === "int")
            context.uniform1i(uniformLocation, data);
        return uniformLocation;
    }

    /* float 大小 */
    const FLOAT_SIZE = Float32Array.BYTES_PER_ELEMENT;
    /* 创建vao
    * context 为当前上下文
    * program 为绑定程序
    * bufferData 是buffer数据，通常来说一个bufferData元素对应一个vbo
    * bufferObjects 是用来存储vbo信息的
    *  */
    function createVertexArrayBuffer(context, 
    // 对应的程序
    program, 
    // buffer数据们
    bufferData, 
    // 用来存储vbo的数组
    bufferObjects) {
        const vao = context.createVertexArray();
        if (vao === null)
            console.error("create vao failure");
        // 绑定vao
        context.bindVertexArray(vao);
        // 循环生成vbo
        for (const data of bufferData) {
            const vbo = context.createBuffer();
            // 保存vbo
            if (vbo)
                bufferObjects.push(vbo);
            else
                console.error("create vbo failure");
            // 绑定vbo
            context.bindBuffer(context.ARRAY_BUFFER, vbo);
            // 输入数据
            context.bufferData(context.ARRAY_BUFFER, data.bufferData, data.usage || context.STATIC_DRAW);
            // 数据偏移和步长
            let offset = 0, stride = 0;
            for (const attribute of data.attributes)
                stride += attribute.length;
            // 循环绑定数据到变量
            for (const attribute of data.attributes) {
                const location = context.getAttribLocation(program, attribute.name);
                if (location < 0)
                    console.warn(`can not get location with '${attribute.name}'`);
                context.vertexAttribPointer(location, attribute.length, context.FLOAT, false, FLOAT_SIZE * stride, FLOAT_SIZE * offset);
                offset += attribute.length;
                context.enableVertexAttribArray(location);
            }
            context.bindBuffer(context.ARRAY_BUFFER, null);
        }
        // 解绑vao
        context.bindVertexArray(null);
        return vao;
    }

    /*
    * 生成纹理
    * context 为webgl上下文
    * source 为图片的路径或image对象
    * option 为其他配置项
    *  */
    function createTexture(context, source, option = {}) {
        const texture = context.createTexture();
        if (texture === null)
            console.warn("create texture failure");
        /* 类型统一 */
        if (typeof source === "string") {
            const imageSrc = source;
            source = new Image();
            source.src = imageSrc;
        }
        if (option.origin)
            source.crossOrigin = "*";
        /* 格式化配置 */
        option.format = option.format || context.RGBA;
        const initTexture = () => {
            option.level = option.level || 0;
            option.format = option.format || context.RGBA;
            option.flipY = option.flipY === undefined ? true : option.flipY;
            option.mipmap = option.mipmap === undefined ? true : option.mipmap;
            context.activeTexture(context.TEXTURE0 + (option.active || 0));
            context.bindTexture(context.TEXTURE_2D, texture);
            if (option.flipY)
                context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, true);
            context.texImage2D(context.TEXTURE_2D, option.level, option.format, option.format, context.UNSIGNED_BYTE, source);
            context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.LINEAR);
            if (option.mipmap)
                context.generateMipmap(context.TEXTURE_2D);
            if (option.flipY)
                context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, false);
            context.bindTexture(context.TEXTURE_2D, null);
        };
        /* 分别为加载完成和未加载完成的情况 */
        if (source.complete)
            initTexture();
        else
            source.onload = initTexture;
        return texture;
    }
    /*
    * 生成盒子纹理
    * context 为webgl上下文
    * source 为图片的路径或image对象们
    * option 为其他配置项
    *  */
    function createCubTexture(context, source, option = {}) {
        const texture = context.createTexture();
        if (texture === null)
            console.warn("create texture failure");
        context.activeTexture(context.TEXTURE0 + (option.active || 0));
        context.bindTexture(context.TEXTURE_CUBE_MAP, texture);
        const initTexture = (target, image) => {
            return () => {
                context.activeTexture(context.TEXTURE0 + (option.active || 0));
                context.bindTexture(context.TEXTURE_CUBE_MAP, texture);
                if (option.flipY)
                    context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, true);
                context.texImage2D(target, option.level || 0, option.format || context.RGBA, option.format || context.RGBA, context.UNSIGNED_BYTE, image);
                context.texParameteri(context.TEXTURE_CUBE_MAP, context.TEXTURE_MAG_FILTER, context.LINEAR);
                context.texParameteri(context.TEXTURE_CUBE_MAP, context.TEXTURE_MIN_FILTER, context.LINEAR);
                context.texParameteri(context.TEXTURE_CUBE_MAP, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
                context.texParameteri(context.TEXTURE_CUBE_MAP, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
                // @ts-ignore
                context.texParameteri(context.TEXTURE_CUBE_MAP, context.TEXTURE_WRAP_R, context.CLAMP_TO_EDGE);
                if (option.flipY)
                    context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, false);
                context.bindTexture(context.TEXTURE_CUBE_MAP, null);
            };
        };
        /* 绑定纹理 */
        for (let i = 0; i < 6; i++) {
            let image = source[i];
            if (!(image instanceof HTMLImageElement)) {
                image = new Image();
                image.src = source[i];
            }
            if (option.origin)
                image.crossOrigin = "*";
            if (image.complete)
                initTexture(context.TEXTURE_CUBE_MAP_POSITIVE_X + i, image)();
            else
                image.onload = initTexture(context.TEXTURE_CUBE_MAP_POSITIVE_X + i, image);
        }
        context.bindTexture(context.TEXTURE_CUBE_MAP, null);
        return texture;
    }

    var gl = {
        createShader,
        createProgram,
        sendUniformData,
        createTexture,
        createCubTexture,
        createVertexArrayBuffer,
    };

    /* 弧度制 */
    function radians(angle) {
        return angle / 180 * Math.PI;
    }
    /* 标准化输出向量 */
    function normalize(data) {
        return data.multiplication(1 / data.length);
    }
    /* 正交投影矩阵 */
    function orthographicMatrix(left, right, bottom, top, near, far) {
        return new Matrix4([
            2 / (right - left), 0, 0, -(right + left) / (right - left),
            0, 2 / (top - bottom), 0, -(top + bottom) / (top - bottom),
            0, 0, 2 / (far - near), -(near + far) / (far - near),
            0, 0, 0, 1
        ]);
    }
    /* 透视投影矩阵 */
    function perspectiveMatrix(angle, aspect, near, far) {
        const tanHalf = Math.tan(angle / 2);
        return new Matrix4([
            1 / (aspect * tanHalf), 0, 0, 0,
            0, 1 / (tanHalf), 0, 0,
            0, 0, -(far + near) / (far - near), -1,
            0, 0, -(2 * far * near) / (far - near), 1
        ]);
    }
    /* 视角矩阵 */
    function lookAt(eye, target, up) {
        const f = normalize(target.copy().reduce(eye));
        const s = normalize(f.copy().cross(up));
        const u = s.copy().cross(f);
        return new Matrix4([
            s.x, u.x, -f.x, 0,
            s.y, u.y, -f.y, 0,
            s.z, u.z, -f.z, 0,
            -s.dot(eye), -u.dot(eye), f.dot(eye), 1
        ]);
    }
    /* 偏移矩阵 */
    function translate(matrix, translate) {
        if (!Matrix4.isInstance(matrix))
            return matrix;
        if (Vec3.isInstance(translate))
            translate = translate.toArray();
        translate = translate;
        const v = [
            matrix.getRow(1),
            matrix.getRow(2),
            matrix.getRow(3),
            matrix.getRow(4)
        ];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < v[i].length; j++)
                v[i][j] *= translate[i];
        }
        for (let i = 0; i < 4; i++)
            matrix.set(4, i + 1, v[0][i] + v[1][i] + v[2][i] + v[3][i]);
        return matrix;
    }
    /* 旋转矩阵 */
    function rotate(matrix, angle, rotate) {
        if (!Matrix4.isInstance(matrix))
            return matrix;
        if (Array.isArray(rotate))
            rotate = new Vec3(rotate);
        const a = angle;
        const c = Math.cos(a);
        const s = Math.sin(a);
        const axis = normalize(rotate);
        const temp = axis.copy().multiplication(1 - c);
        const rotateMatrix = new Matrix4([
            c + temp.x * axis.x, temp.x * axis.y + s * axis.z, temp.x * axis.z - s * axis.y, 0,
            temp.y * axis.x - s * axis.z, c + temp.y * axis.y, temp.y * axis.z + s * axis.x, 0,
            temp.z * axis.x + s * axis.y, temp.z * axis.y - s * axis.x, c + temp.z * axis.z, 0,
            0, 0, 0, 1
        ]);
        const row1 = new Vec4(matrix.getRow(1)).multiplication(rotateMatrix.get(1, 1))
            .addition(matrix.getRow(2).map(data => data * rotateMatrix.get(1, 2)))
            .addition(matrix.getRow(3).map(data => data * rotateMatrix.get(1, 3)));
        const row2 = new Vec4(matrix.getRow(1)).multiplication(rotateMatrix.get(2, 1))
            .addition(matrix.getRow(2).map(data => data * rotateMatrix.get(2, 2)))
            .addition(matrix.getRow(3).map(data => data * rotateMatrix.get(2, 3)));
        const row3 = new Vec4(matrix.getRow(1)).multiplication(rotateMatrix.get(3, 1))
            .addition(matrix.getRow(2).map(data => data * rotateMatrix.get(3, 2)))
            .addition(matrix.getRow(3).map(data => data * rotateMatrix.get(3, 3)));
        matrix.setRow(1, row1);
        matrix.setRow(2, row2);
        matrix.setRow(3, row3);
        return matrix;
    }
    /* 缩放矩阵 */
    function scale(matrix, scale) {
        if (!Matrix4.isInstance(matrix))
            return matrix;
        if (Vec3.isInstance(scale))
            scale = scale.toArray();
        scale = scale;
        for (let i = 1; i <= 3; i++)
            matrix.setRow(i, [
                matrix.get(i, 1) * scale[i - 1],
                matrix.get(i, 2) * scale[i - 1],
                matrix.get(i, 3) * scale[i - 1],
                matrix.get(i, 4) * scale[i - 1],
            ]);
        return matrix;
    }

    var math = {
        Vec2,
        Vec3,
        Vec4,
        Matrix2,
        Matrix3,
        Matrix4,
        lookAt,
        radians,
        normalize,
        scale,
        rotate,
        translate,
        perspectiveMatrix,
        orthographicMatrix,
        tan: Math.tan,
        cos: Math.cos,
        sin: Math.sin,
        acos: Math.acos,
        asin: Math.asin,
        atan: Math.atan,
        sqrt: Math.sqrt,
        ceil: Math.ceil,
        floor: Math.floor,
    };

    /* 当前时间记录 */
    let currentTime = Date.now();
    /* 动画类 */
    class Animation {
        /* id */
        static id = 0;
        /* 动画队列 */
        static animationTask = new Map();
        /* 是否启动动画 */
        static isStartAnimation = false;
        /* 启动动画 */
        static animationLoop() {
            const now = Date.now();
            for (const animationMap of Animation.animationTask) {
                const animation = animationMap[1];
                if (animation.active && animation.callback)
                    animation.callback(now - currentTime);
            }
            currentTime = now;
            requestAnimationFrame(Animation.animationLoop);
        }
        /* id */
        id = ++Animation.id;
        /* 是否活跃 */
        active = true;
        /* 回调 */
        callback;
        /* 构造器 */
        constructor(callback) { this.callback = callback; }
    }
    /* 注册动画 */
    function register(callback) {
        const animation = new Animation(callback);
        Animation.animationTask.set(animation.id, animation);
        if (!Animation.isStartAnimation) {
            currentTime = Date.now();
            Animation.animationLoop();
            Animation.isStartAnimation = true;
        }
        return animation.id;
    }
    /* 销毁动画 */
    function destroy(id) {
        return Animation.animationTask.delete(id);
    }
    /* 暂停动画 */
    function stop(id) {
        const animation = Animation.animationTask.get(id);
        if (animation)
            animation.active = false;
        else
            console.warn("this animation instance by id : " + id + " has be destroyed");
    }
    /* 启动动画 */
    function start(id) {
        const animation = Animation.animationTask.get(id);
        if (animation)
            animation.active = true;
        else
            console.warn("this animation instance by id : " + id + " has be destroyed");
    }
    var animation = {
        stop,
        start,
        destroy,
        register,
    };

    const CUBE_DATA_ARRAY = [
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, 1.0, -1.0,
        -1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0,
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,
        -1.0, -1.0, 1.0,
        -1.0, 1.0, 1.0,
        -1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0,
        -1.0, -1.0, -1.0,
        -1.0, -1.0, 1.0,
        -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        -1.0, -1.0, 1.0,
        -1.0, -1.0, -1.0,
        -1.0, 1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,
        -1.0, 1.0, -1.0,
    ];
    const SKY_BOX_VERTEX = `
    precision mediump float;
    attribute vec3 in_pos;
    uniform mat4 eyeMatrix;
    uniform mat4 modelMatrix;
    uniform mat4 perspectiveMatrix;
    varying vec3 uv;
    void main() {
        mat4 eye = eyeMatrix;
        mat4 model = modelMatrix;
        mat4 perspective = perspectiveMatrix;
        eye[3][0] = eye[3][1] = eye[3][2] = 0.0;
        gl_Position = perspective * eye * model * vec4(in_pos , 1.0);
        uv = in_pos;
    }
`;
    const SKY_BOX_FRAGMENT = `
    precision mediump float;
    varying vec3 uv;
    uniform samplerCube cubeTexture;
    void main() {
        gl_FragColor = textureCube(cubeTexture , uv);
    }
`;
    /* 天空盒 */
    class SkyBox {
        /* 程序 */
        program;
        /* 纹理 */
        texture;
        /* 数据缓存 */
        vao;
        vbo = [];
        /* 配置 */
        option;
        /* 是否被回收 */
        hasDestroy = false;
        /* 构造器 */
        constructor(context, source, option) {
            this.option = option;
            const texture = gl.createCubTexture(context, source, option);
            if (!texture)
                console.warn("create texture failure");
            this.texture = texture;
            const program = gl.createProgram(context, SKY_BOX_VERTEX, SKY_BOX_FRAGMENT);
            if (!program)
                console.warn("create program failure");
            this.program = program;
            const vao = gl.createVertexArrayBuffer(context, this.program, [{
                    bufferData: new Float32Array(CUBE_DATA_ARRAY),
                    attributes: [{ name: "in_pos", length: 3 }]
                }], this.vbo);
            if (!vao)
                console.warn("create vao failure");
            this.vao = vao;
        }
        /* 绘制 */
        draw(context, camera) {
            if (this.hasDestroy)
                return console.warn("this sky box has been destroyed");
            if (!this.program || !this.vao || !this.texture)
                return console.warn("this sky box init failure");
            context.useProgram(this.program);
            context.bindVertexArray(this.vao);
            gl.sendUniformData(context, this.program, "eyeMatrix", camera.eyeMatrix);
            gl.sendUniformData(context, this.program, "perspectiveMatrix", camera.projectionMatrix);
            gl.sendUniformData(context, this.program, "modelMatrix", new math.Matrix4);
            context.activeTexture(this.option.active || context.TEXTURE0);
            context.bindTexture(context.TEXTURE_CUBE_MAP, this.texture);
            context.bindVertexArray(this.vao);
            context.depthFunc(context.LEQUAL);
            context.depthMask(false);
            context.drawArrays(context.TRIANGLES, 0, 36);
            context.depthMask(true);
            context.depthFunc(context.LESS);
            context.bindTexture(context.TEXTURE_CUBE_MAP, null);
        }
        /* 销毁 */
        destroy(context) {
            if (this.hasDestroy)
                return console.warn("this sky box has been destroyed");
            context.deleteVertexArray(this.vao);
            this.vbo.forEach(vbo => context.deleteBuffer(vbo));
            context.deleteProgram(this.program);
            context.deleteTexture(this.texture);
            this.hasDestroy = true;
        }
    }
    /* 创建天空盒 */
    function createSkybox(context, source, option = {}) {
        return new SkyBox(context, source, option);
    }

    /* 视图矩阵和模型矩阵 */
    const eyeMatrixSymbol = Symbol(), projectionMatrix = Symbol();
    /* 欧拉角相机 */
    class EulerCamera {
        /* 摄像机类型 */
        type;
        /* 右方向 */
        right = new Vec3();
        /* 正方向 */
        forward = new Vec3();
        /* 世界坐标 */
        worldUp = new Vec3([0, 1, 0]);
        /* 坐标 */
        position = new Vec3();
        /* 摄像机角度 */
        yaw = 0;
        roll = 0;
        pitch = 0;
        /* 视角矩阵 */
        [eyeMatrixSymbol] = new Matrix4();
        get eyeMatrix() { return this[eyeMatrixSymbol]; }
        /* 模式矩阵有两种 分别是 透视 , 正交 */
        [projectionMatrix] = new Matrix4();
        get projectionMatrix() { return this[projectionMatrix]; }
        /* 构造器 */
        constructor(type, option = {}) {
            this.type = type;
            if (option.worldUp)
                this.worldUp = option.worldUp;
            if (option.position)
                this.position = option.position.copy();
            this.pitch = option.pitch || 0;
            this.yaw = option.yaw || 0;
            this.roll = option.roll || 0;
            this.updateEyeCamera().updateModelCamera(option);
        }
        /* 相机数据重新计算 */
        updateEyeCamera() {
            /* 视角矩阵 */
            this.forward.x =
                math.cos(radians(this.pitch)) * math.sin(radians(this.yaw));
            this.forward.y = math.sin(radians(this.pitch));
            this.forward.z = math.cos(math.radians(this.pitch)) * math.cos(radians(this.yaw));
            this.right = math.normalize(this.forward.copy().cross(this.worldUp));
            this[eyeMatrixSymbol] = lookAt(this.position, this.position.copy().addition(this.forward), this.worldUp);
            return this;
        }
        updateModelCamera(option) {
            if (this.type === "perspective")
                this[projectionMatrix] = math.perspectiveMatrix(option.angle || 45.0, option.aspect || (10 / 8), option.near || 0.1, option.far || 50);
            else if (this.type === "orthographic")
                this[projectionMatrix] = math.orthographicMatrix(option.left || -1, option.right || 1, option.bottom || -1, option.top || 1, option.near || 0.1, option.far || 50);
            return this;
        }
    }
    /* 创建欧拉角透视相机 */
    function createPerspectiveEulerCamera(option = {}) {
        return new EulerCamera("perspective", option);
    }
    /* 创建欧拉正交相机 */
    function createOrthographicEulerCamera(option = {}) {
        return new EulerCamera("orthographic", option);
    }

    /*
    * 一些测试模块
    * 不太推荐直接使用
    * 该模块中的某些模块会在未来加入webThree核心模块中
    * */
    var TEST = {
        createSkybox,
        createPerspectiveEulerCamera,
        createOrthographicEulerCamera,
    };

    var index = {
        gl,
        math,
        animation,
        TEST,
    };

    return index;

}));

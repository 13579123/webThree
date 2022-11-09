import {Matrix4} from "../matrix/matrix4";
import {Vec} from "../vec/vec";
import Vec3 from "../vec/vec3";
import Vec4 from "../vec/vec4";

/* 弧度制 */
export function radians(angle: number) {
    return angle / 180 * Math.PI
}

/* 标准化输出向量 */
export function normalize<T extends Vec>(data: T): T {
    return data.multiplication(1 / data.length)
}

/* 正交投影矩阵 */
export function orthographicMatrix(
    left: number, right: number, bottom: number, top: number,
    near: number, far: number
): Matrix4 {
    return new Matrix4([
        2 / (right - left) , 0 , 0 , - (right + left) / (right - left) ,
        0 , 2 / (top - bottom) , 0 , - (top + bottom) / (top - bottom) ,
        0 , 0 , 2 / (far - near) , - (near + far) / (far - near) ,
        0 , 0 , 0 , 1
    ])
}

/* 透视投影矩阵 */
export function perspectiveMatrix (
    angle: number , aspect: number ,
    near: number , far: number
): Matrix4 {
    const tanHalf = Math.tan(angle / 2)
    return new Matrix4([
        1 / (aspect * tanHalf) , 0 , 0 , 0 ,
        0 , 1 / (tanHalf) , 0 , 0 ,
        0 , 0 , -(far + near) / (far - near) , -1 ,
        0 , 0 , -(2 * far * near) / (far - near) , 1
    ])
}

/* 视角矩阵 */
export function lookAt(eye: Vec3 , target: Vec3 , up: Vec3): Matrix4 {
    const f = normalize(target.copy().reduce(eye))
    const s = normalize(f.copy().cross(up))
    const u = s.copy().cross(f)
    return new Matrix4([
        s.x , u.x , -f.x , 0,
        s.y , u.y , -f.y , 0,
        s.z , u.z , -f.z , 0,
        -s.dot(eye) , -u.dot(eye) , f.dot(eye) , 1
    ])
}

/* 偏移矩阵 */
export function translate(matrix: Matrix4 , translate: Vec3|number[]): Matrix4 {
    if (!Matrix4.isInstance(matrix)) return matrix
    if (Vec3.isInstance(translate)) translate = (<Vec3>translate).toArray()
    translate = <number[]> translate
    const v: number[][] = [
        matrix.getRow(1),
        matrix.getRow(2),
        matrix.getRow(3),
        matrix.getRow(4)
    ]
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < v[i].length; j++)
            v[i][j] *= translate[i]
    }
    for (let i = 0 ; i < 4 ; i++)
        matrix.set(4 , i + 1 , v[0][i] + v[1][i] + v[2][i] + v[3][i])
    return matrix
}

/* 旋转矩阵 */
export function rotate(matrix: Matrix4 , angle: number , rotate: Vec3|number[]) {
    if (!Matrix4.isInstance(matrix)) return matrix
    if (Array.isArray(rotate)) rotate = new Vec3(rotate)
    const a = angle;
    const c = Math.cos(a);
    const s = Math.sin(a);
    const axis : Vec3 = normalize(rotate);
    const temp : Vec3 = axis.copy().multiplication(1 - c)

    const rotateMatrix = new Matrix4([
        c + temp.x * axis.x , temp.x * axis.y + s * axis.z , temp.x * axis.z - s * axis.y , 0 ,
        temp.y * axis.x - s * axis.z , c + temp.y * axis.y , temp.y * axis.z + s * axis.x , 0 ,
        temp.z * axis.x + s * axis.y , temp.z * axis.y - s * axis.x , c + temp.z * axis.z , 0 ,
        0 , 0 , 0 , 1
    ]);

    const row1 =
        new Vec4(matrix.getRow(1)).multiplication(rotateMatrix.get(1 , 1))
            .addition(matrix.getRow(2).map(data => data * rotateMatrix.get(1 , 2)))
            .addition(matrix.getRow(3).map(data => data * rotateMatrix.get(1 , 3)))
    const row2 =
        new Vec4(matrix.getRow(1)).multiplication(rotateMatrix.get(2 , 1))
            .addition(matrix.getRow(2).map(data => data * rotateMatrix.get(2 , 2)))
            .addition(matrix.getRow(3).map(data => data * rotateMatrix.get(2 , 3)))
    const row3 =
        new Vec4(matrix.getRow(1)).multiplication(rotateMatrix.get(3 , 1))
            .addition(matrix.getRow(2).map(data => data * rotateMatrix.get(3 , 2)))
            .addition(matrix.getRow(3).map(data => data * rotateMatrix.get(3 , 3)))

    matrix.setRow( 1 , row1 )
    matrix.setRow( 2 , row2 )
    matrix.setRow( 3 , row3 )

    return matrix;
}

/* 缩放矩阵 */
export function scale(matrix: Matrix4 , scale: Vec3|number[]) {
    if (!Matrix4.isInstance(matrix)) return matrix
    if (Vec3.isInstance(scale)) scale = (<Vec3>scale).toArray()
    scale = <number[]> scale
    for (let i = 1; i <= 3; i++)
        matrix.setRow(i , [
            matrix.get(i,1) * scale[i - 1] ,
            matrix.get(i,2) * scale[i - 1] ,
            matrix.get(i,3) * scale[i - 1] ,
            matrix.get(i,4) * scale[i - 1] ,
        ])
    return matrix
}

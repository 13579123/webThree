import Vec2 from "./vec/vec2";
import Vec3 from "./vec/vec3";
import Vec4 from "./vec/vec4";
import {Matrix2} from "./matrix/matrix2";
import {Matrix3} from "./matrix/matrix3";
import {Matrix4} from "./matrix/matrix4";
import {
    lookAt,
    normalize,
    orthographicMatrix,
    perspectiveMatrix,
    radians, rotate, scale, translate
} from "./particular";

export default {
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
}

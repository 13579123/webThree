import {createSkybox} from "./skybox";
import {createOrthographicEulerCamera, createPerspectiveEulerCamera} from "./camera/euler";

/*
* 一些测试模块
* 不太推荐直接使用
* 该模块中的某些模块会在未来加入webThree核心模块中
* */
export default {
    createSkybox ,

    createPerspectiveEulerCamera,
    createOrthographicEulerCamera,
}

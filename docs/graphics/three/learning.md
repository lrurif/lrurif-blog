# THREE 学习

## 场景

1. 创建场景

```javascript
const scene = new THREE.Scene();
```

## 相机

```javascript
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 10); // 设置相机位置
```

## 物体

```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

## 渲染器

```javascript
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);
```
## 控制器
```javascript
const controls = new OrbitControls(camera, renderer.domElement);
```
## 加入辅助坐标系
```javascript
// 加入坐标辅助器
const axesHelper = new THREE.AxesHelper(5); // 参数为多长
scene.add(axesHelper);
```

## Clock辅助函数
```javascript
const clock = new THREE.Clock();
let deltaTime = clock.getDelta(); // 获取自 .oldTime 设置后到当前的秒数
let time = clock.getElapsedTime(); // 获取自时钟启动后的秒数
```

## 加载纹理
```javascript
// 导入纹理 -start
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("https://img2.baidu.com/it/u=3414981042,866027055&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500")
// 导入纹理 -end
// 物体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({  map: texture });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

## 纹理透明材质
1. alphaMap属性可以隐藏部分纹理材质，但是要配合`transparent`使用。
## 置换贴图（可以让贴图的某些部分更加突出）
```javascript
// 有一个条件，置换贴图需要物体的点足够多，展示效果才好（重点）
const geometry = new THREE.BoxGeometry(1, 1, 1, 200, 200, 200);
 const material = new THREE.MeshStandardMaterial({
    map: texture, 
    alphaMap: alphaDoorTexture, 
    transparent: true,
    aoMap: envTexture,
    aoMapIntensity: 1,
    displacementMap: heightTexture, // 置换贴图
    displacementScale: .08, // 位移贴图对网格的影响程度
})
```
## 使用第一人称视角控制器注意事项
一定在`requestAnimationFrame`中调用`controls.update(clock.getDelta())`方法，否则不生效
```javascript
// 加入控制器
const controls = new FirstPersonControls(camera, renderer.domElement);
const clock = new THREE.Clock(); // 一定需要
function animate() {
    //更新控制器，并传入上次渲染时间和当前时间的时间差
    controls.update(clock.getDelta());
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
```
## THREE使用光线投射精心鼠标拾取
```javascript
function handleClick({clientX, clientY}) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  // 拿到canvas画布到屏幕的距离
  const domRect = renderer.domElement.getBoundingClientRect()
  // 计算鼠标或触摸点的位置，并归一化
  mouse.x = ((clientX - domRect.left) / renderer.domElement.clientWidth) * 2 - 1
  mouse.y = -((clientY - domRect.top) / renderer.domElement.clientHeight) * 2 + 1
  // 通过摄像机和鼠标位置更新射线
  raycaster.setFromCamera(mouse, camera);
  // 计算与所有对象的交点，返回对象是这条射线触碰到的物体，从近到远排序
  const intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    // 处理点击事件
  }
}
```
## 将三维坐标转换为二维
```javascript
function transPosition(position) {
    let world_vector = new THREE.Vector3(position.x, position.y, position.z);
    let vector = world_vector.project(camera);
    let { width, height} = renderer.domElement.getBoundingClientRect();
    let halfWidth = width / 2,
        halfHeight = height / 2;
    return {
        x: Math.round(vector.x * halfWidth + halfWidth),
        y: Math.round(-vector.y * halfHeight + halfHeight)
    };
}
```
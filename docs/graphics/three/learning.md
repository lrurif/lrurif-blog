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
// ตั้งค่าฉาก Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// เพิ่มแสง
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

// สร้างหุ่นยนต์จำลอง
const material = new THREE.MeshPhongMaterial({ color: 0x00ccff });
const body = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), material);
const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.5), material);
leftLeg.position.set(-0.5, -1, 0);
const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.5), material);
rightLeg.position.set(0.5, -1, 0);
const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.5), material);
arm.position.set(1, 0.5, 0);

body.add(leftLeg);
body.add(rightLeg);
body.add(arm);
scene.add(body);

camera.position.z = 5;

// ฟังก์ชันแอนิเมชัน
function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    renderer.render(scene, camera);
}
animate();

// การควบคุม
function walkForward() {
    new TWEEN.Tween(leftLeg.rotation)
        .to({ x: Math.PI / 4 }, 500)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()
        .onComplete(() => {
            new TWEEN.Tween(leftLeg.rotation)
                .to({ x: 0 }, 500)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .start();
        });
    new TWEEN.Tween(rightLeg.rotation)
        .to({ x: -Math.PI / 4 }, 500)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()
        .onComplete(() => {
            new TWEEN.Tween(rightLeg.rotation)
                .to({ x: 0 }, 500)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .start();
        });
}

function raiseArm() {
    new TWEEN.Tween(arm.rotation)
        .to({ z: -Math.PI / 2 }, 1000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()
        .onComplete(() => {
            new TWEEN.Tween(arm.rotation)
                .to({ z: 0 }, 1000)
                . easing(TWEEN.Easing.Quadratic.InOut)
                .start();
        });
}
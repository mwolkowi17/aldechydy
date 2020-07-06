'use strict';

/* global THREE */
/*var menu = document.getElementById("menu");
var button = document.createElement('button');

menu.appendChild(button);
button.id = "myDiv";
button.innerText = "Testowy button";
button.setAttribute("title", "To jest tekst w dymku");
button.classList.add("module");
button.style.setProperty("background-color", "#FF6633");
var guzik=document.querySelector("myDiv");*/
//guzik.onclick=zmiana();
var objekt = "ketony_772.obj";
var objektM = "ketony_772.mtl";


function zmiana() {
    if(objekt==="ketony_772.obj"){
    objekt = "ketony_772_b.obj"
    objektM = "ketony_772_b.mtl"
    main();
    
    }
     else if(objekt==="ketony_772_b.obj"){
       objekt = "ketony_772.obj";
       objektM = "ketony_772.mtl";
       main();
   }
    else if (objekt ==="keton_alifateczny_772_js.obj"||"keton_aromatyczny_772_js.obj"){
        objekt = "ketony_772_b.obj"
        objektM = "ketony_772_b.mtl"
        main();
    }
}

function alifatyczny() {
    
     objekt = "keton_alifateczny_772_js.obj"
     objektM = "keton_alifateczny_772_js.mtl"
     main();
    
}

function aromatyczny() {
    objekt = "keton_aromatyczny_772_js.obj"
     objektM = "keton_aromatyczny_772_js.mtl"
     main();
}

//button.addEventListener("DOMContentLoaded", zmiana());
function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true
    }, {
        antialias: true
    });


    const fov = 45;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 15);

    const controls = new THREE.OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.enableZoom=false;
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('silver');

    {
        const planeSize = 0.01;

        const loader = new THREE.TextureLoader();
        const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);

        const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = Math.PI * -.5;
        scene.add(mesh);
    }

    {
        const skyColor = 0xB1E1FF; // light blue
        const groundColor = 0x808080; // gray
        const intensity = 3;

        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        scene.add(light);
    }

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(0, 10, 0);
        light.target.position.set(-5, 0, 0);
        scene.add(light);
        scene.add(light.target);
    }

    {
        const objLoader = new THREE.OBJLoader2();

        objLoader.loadMtl(objektM, null, (materials) => {
            materials.depthWrite = false;
            materials.side = THREE.BackSide;
            materials.side = THREE.FrontSide;
            objLoader.setMaterials(materials);
            objLoader.load(objekt, (event) => {
                const root = event.detail.loaderRootNode;
                scene.add(root);
            });
        });
    }

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render() {

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        renderer.sortObjects = false;
        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();

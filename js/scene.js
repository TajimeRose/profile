const initInkScene = () => {
    const canvas = document.querySelector("[data-ink-scene]");
    const background = canvas?.closest(".ink-bg");

    if (!canvas || !background || !window.THREE || !window.WebGLRenderingContext) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050713, 0.042);

    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 100);
    camera.position.set(0, 1.1, 14);

    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !mobile });
    } catch (error) {
        return;
    }

    renderer.setClearColor(0x050713, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.2 : 1.6));

    const world = new THREE.Group();
    const terrain = new THREE.Group();
    const core = new THREE.Group();
    const tunnel = new THREE.Group();
    const signal = new THREE.Group();
    scene.add(world);
    world.add(terrain, core, tunnel, signal);

    const lineMaterial = (color, opacity) => new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const cyan = lineMaterial(0x5ce1e6, 0.34);
    const blue = lineMaterial(0x5577ff, 0.3);
    const violet = lineMaterial(0xa56cff, 0.28);
    const faint = lineMaterial(0x5ce1e6, 0.11);

    // A flowing data terrain keeps the portfolio's landscape motif in a cooler digital form.
    const rows = mobile ? 22 : 38;
    for (let row = 0; row < rows; row += 1) {
        const points = [];
        const segments = mobile ? 50 : 86;
        for (let column = 0; column <= segments; column += 1) {
            const x = -18 + (column / segments) * 36;
            const z = -10 + row * 0.42;
            const wave = Math.sin(x * 0.42 + row * 0.25) * 0.5;
            const pulse = Math.cos(x * 0.95 - row * 0.16) * 0.16;
            const peak = Math.exp(-Math.pow(x + 4, 2) / 30) * 1.8;
            points.push(new THREE.Vector3(x, wave + pulse + peak - 5.2, z));
        }
        terrain.add(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(points),
            row % 6 === 0 ? cyan : faint
        ));
    }

    const edgeObject = (geometry, material) => {
        const object = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), material);
        geometry.dispose();
        return object;
    };

    const coreShell = edgeObject(new THREE.IcosahedronGeometry(1.55, 2), violet);
    const coreInner = edgeObject(new THREE.OctahedronGeometry(0.82, 1), cyan);
    const ringA = edgeObject(new THREE.TorusGeometry(2.4, 0.018, 3, 96), cyan);
    const ringB = edgeObject(new THREE.TorusGeometry(2.05, 0.018, 3, 80), blue);
    ringA.rotation.set(1.05, 0.1, 0.35);
    ringB.rotation.set(0.25, 0.85, -0.25);
    core.add(coreShell, coreInner, ringA, ringB);
    core.position.set(mobile ? 1.65 : 5.5, mobile ? 2.8 : 1.2, -1.2);

    const tunnelRings = [];
    for (let index = 0; index < (mobile ? 8 : 13); index += 1) {
        const ring = edgeObject(new THREE.TorusGeometry(2.2, 0.014, 3, 72), index % 2 ? blue : violet);
        ring.position.z = -index * 1.3;
        ring.rotation.z = index * 0.16;
        tunnel.add(ring);
        tunnelRings.push(ring);
    }
    tunnel.position.set(mobile ? 0 : 4.7, 0, 2.5);
    tunnel.visible = false;

    const signalNodes = [];
    const signalPositions = [
        [-4.8, 2.4, -2], [-2.4, -1.5, 0], [0.2, 2.1, -1],
        [2.8, -1.2, -2], [5.2, 1.8, 0], [0, -2.8, -3]
    ];
    signalPositions.forEach((position, index) => {
        const node = edgeObject(new THREE.OctahedronGeometry(index % 2 ? 0.3 : 0.48, 0), index % 2 ? cyan : violet);
        node.position.set(...position);
        signal.add(node);
        signalNodes.push(node);
    });
    const connectionPoints = [];
    signalPositions.forEach((position, index) => {
        const next = signalPositions[(index + 2) % signalPositions.length];
        connectionPoints.push(new THREE.Vector3(...position), new THREE.Vector3(...next));
    });
    signal.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(connectionPoints), faint));
    signal.visible = false;

    const particleCount = mobile ? 90 : 190;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const palette = [new THREE.Color(0x5ce1e6), new THREE.Color(0x5577ff), new THREE.Color(0xa56cff)];
    for (let index = 0; index < particleCount; index += 1) {
        const stride = index * 3;
        const color = palette[index % palette.length];
        positions[stride] = (Math.random() - 0.5) * 32;
        positions[stride + 1] = (Math.random() - 0.5) * 17;
        positions[stride + 2] = (Math.random() - 0.5) * 18 - 2;
        colors[stride] = color.r;
        colors[stride + 1] = color.g;
        colors[stride + 2] = color.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({
        size: mobile ? 0.035 : 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    }));
    world.add(particles);

    const pointer = new THREE.Vector2();
    const pointerTarget = new THREE.Vector2();
    const sections = Array.from(document.querySelectorAll("main > section"));
    let activeFrame = 0;
    let frameProgress = 0;
    let frameId;
    let visible = true;

    const updateFrame = () => {
        const viewportCenter = window.scrollY + window.innerHeight * 0.5;
        let closestDistance = Infinity;
        sections.forEach((section, index) => {
            const center = section.offsetTop + section.offsetHeight * 0.5;
            const distance = Math.abs(center - viewportCenter);
            if (distance < closestDistance) {
                closestDistance = distance;
                activeFrame = index;
                frameProgress = Math.max(0, Math.min(1, (viewportCenter - section.offsetTop) / section.offsetHeight));
            }
        });
        background.dataset.frame = String(activeFrame);
        document.body.dataset.frame = String(activeFrame);
        if (reduceMotion) {
            core.visible = activeFrame < 2;
            tunnel.visible = activeFrame === 2;
            signal.visible = activeFrame >= 3;
            renderer.render(scene, camera);
        }
    };

    const resize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        renderer.render(scene, camera);
    };

    const updatePointer = (event) => {
        pointerTarget.x = (event.clientX / window.innerWidth - 0.5) * 2;
        pointerTarget.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const clock = new THREE.Clock();
    const render = () => {
        if (!visible) return;

        const elapsed = clock.getElapsedTime();
        pointer.lerp(pointerTarget, 0.035);
        world.rotation.y = pointer.x * 0.04;
        world.rotation.x = pointer.y * 0.025;
        terrain.position.y = frameProgress * 0.7;
        terrain.position.z = activeFrame * 0.45;
        particles.rotation.y = elapsed * 0.012;
        particles.position.y = Math.sin(elapsed * 0.18) * 0.2;

        core.visible = activeFrame < 2;
        tunnel.visible = activeFrame === 2;
        signal.visible = activeFrame >= 3;

        if (core.visible) {
            const targetX = activeFrame === 0 ? (mobile ? 1.65 : 5.5) : (mobile ? -1.4 : -5.2);
            core.position.x += (targetX - core.position.x) * 0.04;
            core.position.y = (mobile ? 2.8 : 1.2) + Math.sin(elapsed * 0.45) * 0.22;
            core.rotation.y = elapsed * 0.1 + pointer.x * 0.18;
            core.rotation.x = Math.sin(elapsed * 0.25) * 0.12 - pointer.y * 0.1;
            coreShell.rotation.y += 0.0018;
            coreInner.rotation.x -= 0.003;
            ringA.rotation.z += 0.0012;
            ringB.rotation.x -= 0.001;
        }

        if (tunnel.visible) {
            tunnel.rotation.z = elapsed * 0.035 + pointer.x * 0.08;
            tunnel.position.z = 2.5 + frameProgress * 2.5;
            tunnelRings.forEach((ring, index) => {
                ring.rotation.z = elapsed * (index % 2 ? -0.04 : 0.04) + index * 0.16;
            });
        }

        if (signal.visible) {
            signal.rotation.y = Math.sin(elapsed * 0.16) * 0.16 + pointer.x * 0.08;
            signalNodes.forEach((node, index) => {
                const pulse = 1 + Math.sin(elapsed * 1.4 + index) * 0.18;
                node.scale.setScalar(pulse);
                node.rotation.y += 0.004 + index * 0.0003;
            });
        }

        camera.position.x += (pointer.x * 0.22 - camera.position.x) * 0.025;
        camera.position.y += (1.1 - pointer.y * 0.12 - camera.position.y) * 0.025;
        renderer.render(scene, camera);
        frameId = window.requestAnimationFrame(render);
    };

    const onVisibilityChange = () => {
        visible = !document.hidden;
        window.cancelAnimationFrame(frameId);
        if (visible && !reduceMotion) {
            clock.getDelta();
            render();
        }
    };

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", updateFrame, { passive: true });
    if (!reduceMotion) window.addEventListener("pointermove", updatePointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    resize();
    updateFrame();
    background.classList.add("has-webgl");
    if (reduceMotion) renderer.render(scene, camera);
    else render();
};

window.initInkScene = initInkScene;

module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/components/layout/entry-gate.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "caption": "entry-gate-module__7Spt0a__caption",
  "dot": "entry-gate-module__7Spt0a__dot",
  "gate": "entry-gate-module__7Spt0a__gate",
  "gate-exit": "entry-gate-module__7Spt0a__gate-exit",
  "inner": "entry-gate-module__7Spt0a__inner",
  "meta": "entry-gate-module__7Spt0a__meta",
  "rail": "entry-gate-module__7Spt0a__rail",
  "signal": "entry-gate-module__7Spt0a__signal",
  "signal-arrive": "entry-gate-module__7Spt0a__signal-arrive",
  "trace": "entry-gate-module__7Spt0a__trace",
  "trace-arrive": "entry-gate-module__7Spt0a__trace-arrive",
  "wordmark": "entry-gate-module__7Spt0a__wordmark",
});
}),
"[project]/src/components/layout/entry-gate.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ENTRY_POSTER_SRC",
    ()=>ENTRY_POSTER_SRC,
    "EntryGate",
    ()=>EntryGate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$entry$2d$gate$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/layout/entry-gate.module.css [app-ssr] (css module)");
"use client";
;
;
;
const ENTRY_POSTER_SRC = "/media/hero/tajimerose-hero.webp";
const MINIMUM_VISIBLE_MS = 650;
const MAXIMUM_WAIT_MS = 1400;
const EXIT_DURATION_MS = 480;
function EntryGate() {
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("waiting");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const root = document.documentElement;
        if (root.dataset.entryGate !== "show") {
            return;
        }
        let minimumElapsed = false;
        let posterReady = false;
        let leaving = false;
        let exitTimer = 0;
        const complete = ()=>{
            if (root.dataset.entryGate !== "show") return;
            if (leaving || !minimumElapsed || !posterReady) return;
            leaving = true;
            root.dataset.entryGate = "leaving";
            setPhase("leaving");
            exitTimer = window.setTimeout(()=>{
                try {
                    window.sessionStorage.setItem("tajimerose-entry-seen", "1");
                } catch  {
                // Storage can be unavailable in privacy-focused browsing modes.
                }
                root.dataset.entryGate = "complete";
                setPhase("gone");
            }, EXIT_DURATION_MS);
        };
        const minimumTimer = window.setTimeout(()=>{
            minimumElapsed = true;
            complete();
        }, MINIMUM_VISIBLE_MS);
        const maximumTimer = window.setTimeout(()=>{
            posterReady = true;
            minimumElapsed = true;
            complete();
        }, MAXIMUM_WAIT_MS);
        const poster = new Image();
        const markPosterReady = ()=>{
            posterReady = true;
            complete();
        };
        poster.decoding = "async";
        poster.onload = markPosterReady;
        poster.onerror = markPosterReady;
        poster.src = ENTRY_POSTER_SRC;
        if (poster.complete) markPosterReady();
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const handleReducedMotion = (event)=>{
            if (!event.matches) return;
            posterReady = true;
            minimumElapsed = true;
            complete();
        };
        reducedMotion.addEventListener("change", handleReducedMotion);
        return ()=>{
            window.clearTimeout(minimumTimer);
            window.clearTimeout(maximumTimer);
            window.clearTimeout(exitTimer);
            reducedMotion.removeEventListener("change", handleReducedMotion);
        };
    }, []);
    if (phase === "gone") return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$entry$2d$gate$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].gate,
        "data-phase": phase,
        role: "status",
        "aria-live": "polite",
        "aria-label": "Opening TajimeRose portfolio",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$entry$2d$gate$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inner,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$entry$2d$gate$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].meta,
                    "aria-hidden": "true",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Full-Stack Builder"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/entry-gate.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Samut Songkhram / TH"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/entry-gate.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/entry-gate.tsx",
                    lineNumber: 100,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$entry$2d$gate$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].wordmark,
                    "aria-hidden": "true",
                    children: [
                        "tajime",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$entry$2d$gate$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dot,
                            children: "."
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/entry-gate.tsx",
                            lineNumber: 105,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/entry-gate.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$entry$2d$gate$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].rail,
                    "aria-hidden": "true",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$entry$2d$gate$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].trace
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/entry-gate.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$entry$2d$gate$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].signal
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/entry-gate.tsx",
                            lineNumber: 109,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/entry-gate.tsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$entry$2d$gate$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].caption,
                    "aria-hidden": "true",
                    children: "Warming up the studio"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/entry-gate.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/entry-gate.tsx",
            lineNumber: 99,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/entry-gate.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/components/ui/container.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Container",
    ()=>Container
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function Container({ as, children, className = "", ...props }) {
    const Component = as ?? "div";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
        className: `mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/container.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/content/site.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "proofLedger",
    ()=>proofLedger,
    "siteContent",
    ()=>siteContent
]);
const siteContent = {
    name: "Wongsathon Witthayakhom",
    shortName: "Rose",
    brand: "TajimeRose",
    role: "Frontend Developer",
    positioning: "Frontend developer and computer science student building responsive, creative web experiences.",
    hero: {
        eyebrow: "TAJIMEROSE / FRONTEND DEVELOPER / CREATIVE WEB",
        title: "I turn ideas into thoughtful web experiences.",
        supportingCopy: "I'm Wongsathon Witthayakhom—Rose to most people. I study computer science and build responsive interfaces with a focus on clear structure, purposeful motion, and a distinct visual character.",
        primaryAction: {
            label: "View My Work",
            href: "#selected-work"
        },
        secondaryAction: {
            label: "GitHub",
            href: "https://github.com/TajimeRose"
        }
    },
    selectedWork: {
        title: "Selected Work",
        intro: "A closer look at how I turn a real brief into a responsive interface, connect it to working systems, and improve it through testing."
    },
    credential: {
        title: "I learn fastest by building something real.",
        copy: "Every project is a chance to move from structure and interaction design to API integration, responsive testing, and the details that make an interface feel complete.",
        details: [
            {
                term: "Role",
                description: "Frontend Developer"
            },
            {
                term: "Focus",
                description: "Responsive UI, Creative Web"
            },
            {
                term: "Based in",
                description: "Samut Songkhram, Thailand"
            }
        ]
    },
    approach: {
        title: "From an idea to a working experience.",
        paragraphs: [
            "I start by understanding the audience and the information they need, then shape a clear sequence around those priorities.",
            "I build the interface, test it across screen sizes, and refine the details until the visual direction and everyday use support each other."
        ],
        steps: [
            "Understand the goal",
            "Shape the interface",
            "Build the experience",
            "Test and improve"
        ]
    },
    principles: [
        {
            title: "Clarity first",
            copy: "Structure information so people can understand what matters without unnecessary friction."
        },
        {
            title: "Responsive by default",
            copy: "Design every experience to work naturally across desktop, tablet, and mobile."
        },
        {
            title: "Purposeful motion",
            copy: "Use motion to clarify change and add character without getting in the way."
        },
        {
            title: "Learn by building",
            copy: "Treat real projects as a place to experiment, learn, and keep improving."
        }
    ],
    about: {
        home: "TajimeRose is the personal portfolio of Wongsathon Witthayakhom, a computer science student at Bangkok University focused on frontend development and creative web experiences.",
        intro: "I'm Wongsathon Witthayakhom, also known as Rose. I study Computer Science in the School of Information Technology and Innovation at Bangkok University.",
        experience: "Before university, I studied Business Computer at Samut Songkhram Technical College, where I began building a practical foundation in code and computing.",
        research: "I'm especially interested in frontend systems, responsive layouts, interactive UI, and tools that make web development more thoughtful and efficient."
    },
    contact: {
        title: "Have an idea worth building?",
        copy: "If you'd like to talk about a website, frontend project, or creative web experience, feel free to reach out directly.",
        email: "wongsathon.witt@gmail.com",
        github: "https://github.com/TajimeRose",
        instagram: "https://www.instagram.com/tajimerose.dev/",
        linkedin: "https://www.linkedin.com/in/wongsathon-witthayahom-9b5426367/",
        discord: "https://discord.com/users/1130846576013738004",
        facebook: "https://www.facebook.com/wongsathon.witthayakhom",
        location: "Samut Songkhram, Thailand"
    },
    seo: {
        title: "TajimeRose — Frontend Developer",
        description: "Portfolio of Wongsathon Witthayakhom (TajimeRose), a frontend developer and computer science student creating responsive, interactive web experiences."
    },
    lastVerifiedAt: "2026-07-23"
};
const proofLedger = [
    {
        label: "NONGPLATOO.AI",
        value: "AI Tourism Assistant",
        context: "React, TypeScript, Python, Flask, Firebase, PostgreSQL",
        href: "https://github.com/TajimeRose/NongPlatoo.Ai"
    }
];
}),
"[project]/src/components/layout/site-header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteHeader",
    ()=>SiteHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/container.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/content/site.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const navigation = [
    {
        label: "Work",
        href: "/#selected-work",
        sectionId: "selected-work",
        route: "/work"
    },
    {
        label: "About",
        href: "/#about",
        sectionId: "about",
        route: "/about"
    },
    {
        label: "Contact",
        href: "/#contact",
        sectionId: "contact",
        route: null
    }
];
const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
function SiteHeader() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [isScrolled, setIsScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeSection, setActiveSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const menuButtonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const menuPanelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hadOpenMenuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const isHome = pathname === "/";
    const isHeroState = isHome && !isScrolled && !isMenuOpen;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const updateScrolledState = ()=>setIsScrolled(window.scrollY > 48);
        updateScrolledState();
        window.addEventListener("scroll", updateScrolledState, {
            passive: true
        });
        return ()=>window.removeEventListener("scroll", updateScrolledState);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isHome) return;
        const sections = navigation.map((item)=>document.getElementById(item.sectionId)).filter((section)=>section !== null);
        if (sections.length === 0) return;
        const observer = new IntersectionObserver((entries)=>{
            const visibleEntry = entries.filter((entry)=>entry.isIntersecting).sort((a, b)=>b.intersectionRatio - a.intersectionRatio)[0];
            if (visibleEntry) setActiveSection(visibleEntry.target.id);
        }, {
            rootMargin: "-28% 0px -58% 0px",
            threshold: [
                0,
                0.2,
                0.5
            ]
        });
        sections.forEach((section)=>observer.observe(section));
        return ()=>observer.disconnect();
    }, [
        isHome
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isMenuOpen) {
            if (hadOpenMenuRef.current) menuButtonRef.current?.focus();
            return;
        }
        hadOpenMenuRef.current = true;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const panel = menuPanelRef.current;
        const firstFocusable = panel?.querySelector(focusableSelector);
        window.requestAnimationFrame(()=>firstFocusable?.focus());
        const handleKeyDown = (event)=>{
            if (event.key === "Escape") {
                event.preventDefault();
                setIsMenuOpen(false);
                return;
            }
            if (event.key !== "Tab" || !panel) return;
            const focusable = Array.from(panel.querySelectorAll(focusableSelector));
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable.at(-1);
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return ()=>{
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [
        isMenuOpen
    ]);
    const isItemActive = (sectionId, route)=>isHome && activeSection === sectionId || route !== null && pathname.startsWith(route);
    const closeMenu = ()=>setIsMenuOpen(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: `fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${isHeroState ? "bg-gradient-to-b from-smoke-900/60 to-transparent text-paper-0" : "bg-paper-0/84 text-ink-900 shadow-[0_14px_40px_rgb(26_23_20/0.07)] backdrop-blur-xl"}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Container"], {
                    className: "flex min-h-20 items-center justify-between gap-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "group inline-flex min-h-11 items-center gap-2.5",
                            "aria-label": "TajimeRose home",
                            onClick: closeMenu,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": "true",
                                    className: `h-2.5 w-2.5 rotate-45 border transition-colors duration-300 ${isHeroState ? "border-ember-500 bg-ember-500" : "border-ember-700 bg-ember-500"}`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/site-header.tsx",
                                    lineNumber: 130,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-display text-[1.38rem] font-semibold tracking-[-0.045em]",
                                    children: [
                                        "tajime",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-ember-500",
                                            children: "."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/site-header.tsx",
                                            lineNumber: 139,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/site-header.tsx",
                                    lineNumber: 138,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/site-header.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden items-center gap-8 md:flex",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    "aria-label": "Primary navigation",
                                    className: "flex items-center gap-7",
                                    children: navigation.map((item)=>{
                                        const active = isItemActive(item.sectionId, item.route);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: item.href,
                                            "aria-current": active ? "page" : undefined,
                                            className: `relative flex min-h-11 items-center text-[0.82rem] font-semibold tracking-[-0.01em] transition-colors after:absolute after:right-0 after:bottom-1.5 after:left-0 after:h-px after:origin-left after:bg-ember-500 after:transition-transform after:duration-200 ${active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"} ${isHeroState ? "text-paper-0/82 hover:text-paper-0" : "text-ink-600 hover:text-ink-900"}`,
                                            children: item.label
                                        }, item.label, false, {
                                            fileName: "[project]/src/components/layout/site-header.tsx",
                                            lineNumber: 149,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/site-header.tsx",
                                    lineNumber: 144,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["siteContent"].contact.email}`,
                                    className: `inline-flex min-h-11 items-center justify-center rounded-full border px-5 text-[0.78rem] font-bold tracking-[-0.01em] transition-colors ${isHeroState ? "border-paper-0/45 bg-paper-0/10 text-paper-0 hover:border-paper-0 hover:bg-paper-0 hover:text-ink-900" : "border-ink-900 bg-ink-900 text-paper-0 hover:border-ember-700 hover:bg-ember-700"}`,
                                    children: "Let's talk"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/site-header.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/site-header.tsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            ref: menuButtonRef,
                            type: "button",
                            className: `relative grid size-11 place-items-center rounded-full border transition-colors focus-visible:rounded-full md:hidden ${isHeroState ? "border-paper-0/40 bg-smoke-900/15 text-paper-0" : "border-line-200 bg-paper-0 text-ink-900"}`,
                            "aria-expanded": isMenuOpen,
                            "aria-controls": "site-mobile-navigation",
                            "aria-label": isMenuOpen ? "Close navigation menu" : "Open navigation menu",
                            onClick: ()=>setIsMenuOpen((open)=>!open),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "sr-only",
                                    children: isMenuOpen ? "Close menu" : "Open menu"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/site-header.tsx",
                                    lineNumber: 188,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": "true",
                                    className: "relative block h-3.5 w-4.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `absolute top-0 left-0 h-px w-full bg-current transition-transform duration-300 ${isMenuOpen ? "translate-y-[6px] rotate-45" : ""}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/site-header.tsx",
                                            lineNumber: 190,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `absolute top-[6px] left-0 h-px w-full bg-current transition-opacity duration-200 ${isMenuOpen ? "opacity-0" : "opacity-100"}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/site-header.tsx",
                                            lineNumber: 195,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300 ${isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/site-header.tsx",
                                            lineNumber: 200,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/site-header.tsx",
                                    lineNumber: 189,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/site-header.tsx",
                            lineNumber: 175,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/site-header.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/site-header.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            !isHome ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": "true",
                className: "h-20"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/site-header.tsx",
                lineNumber: 210,
                columnNumber: 18
            }, this) : null,
            isMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "site-mobile-navigation",
                ref: menuPanelRef,
                className: "fixed inset-0 z-40 grid bg-smoke-900 px-5 pt-28 pb-7 text-paper-0 md:hidden",
                role: "dialog",
                "aria-modal": "true",
                "aria-label": "Mobile navigation",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex w-full max-w-xl flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-mono text-[0.63rem] font-bold tracking-[0.16em] text-ember-500 uppercase",
                            children: "Explore the portfolio"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/site-header.tsx",
                            lineNumber: 222,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            "aria-label": "Mobile navigation",
                            className: "mt-7 grid border-t border-paper-0/15",
                            children: navigation.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    onClick: closeMenu,
                                    className: "group flex min-h-20 items-center justify-between border-b border-paper-0/15 font-display text-[clamp(2.35rem,12vw,4rem)] leading-none tracking-[-0.045em]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/site-header.tsx",
                                            lineNumber: 233,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-xs text-paper-0/38 transition-colors group-hover:text-ember-500",
                                            children: [
                                                "0",
                                                index + 1
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/site-header.tsx",
                                            lineNumber: 234,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, item.label, true, {
                                    fileName: "[project]/src/components/layout/site-header.tsx",
                                    lineNumber: 227,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/site-header.tsx",
                            lineNumber: 225,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-auto grid gap-5 border-t border-paper-0/15 pt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["siteContent"].contact.email}`,
                                    onClick: closeMenu,
                                    className: "inline-flex min-h-12 items-center justify-between rounded-full bg-ember-500 px-5 font-bold text-smoke-900",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Let's talk"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/site-header.tsx",
                                            lineNumber: 247,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "aria-hidden": "true",
                                            children: "↗"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/site-header.tsx",
                                            lineNumber: 248,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/site-header.tsx",
                                    lineNumber: 242,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between font-mono text-[0.62rem] tracking-[0.12em] text-paper-0/48 uppercase",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["siteContent"].contact.location
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/site-header.tsx",
                                            lineNumber: 251,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Full-Stack Builder"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/site-header.tsx",
                                            lineNumber: 252,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/site-header.tsx",
                                    lineNumber: 250,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/site-header.tsx",
                            lineNumber: 241,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/site-header.tsx",
                    lineNumber: 221,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/site-header.tsx",
                lineNumber: 213,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true);
}
}),
"[project]/src/motion/contact-scroll-controller.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContactScrollController",
    ()=>ContactScrollController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const clamp = (value)=>Math.min(1, Math.max(0, value));
function ContactScrollController() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const stage = document.querySelector(".contact-stage");
        const word = stage?.querySelector(".contact-stage__word-frame");
        if (!stage || !word) {
            return;
        }
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        let frame = 0;
        const update = ()=>{
            frame = 0;
            if (reducedMotion.matches) {
                word.style.transform = "none";
                return;
            }
            const bounds = stage.getBoundingClientRect();
            const progress = clamp((window.innerHeight - bounds.top) / (window.innerHeight + bounds.height));
            word.style.transform = `translate3d(0, ${-20 + progress * 50}%, 0)`;
        };
        const requestUpdate = ()=>{
            if (!frame) {
                frame = window.requestAnimationFrame(update);
            }
        };
        update();
        window.addEventListener("scroll", requestUpdate, {
            passive: true
        });
        window.addEventListener("resize", requestUpdate);
        reducedMotion.addEventListener("change", requestUpdate);
        return ()=>{
            window.removeEventListener("scroll", requestUpdate);
            window.removeEventListener("resize", requestUpdate);
            reducedMotion.removeEventListener("change", requestUpdate);
            if (frame) {
                window.cancelAnimationFrame(frame);
            }
            word.style.transform = "";
        };
    }, [
        pathname
    ]);
    return null;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0t1b4i1._.js.map
window.SITE_DATA = {
    brand: {
        name: "tajime.",
        homeLabel: "tajime home",
        icon: "fa-solid fa-code"
    },
    profile: {
        image: "img/รูปตัวเอง.png",
        alt: "TajimeRose profile"
    },
    nav: [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Contact", href: "#contact" }
    ],
    socials: [
        { label: "GitHub", href: "https://github.com/TajimeRose", icon: "fab fa-github", external: true },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/wongsathon-witthayahom-9b5426367/", icon: "fab fa-linkedin-in", external: true },
        { label: "Discord", href: "https://discord.com/users/1130846576013738004", icon: "fab fa-discord", external: true },
        { label: "Email", href: "mailto:wongsathon.witt@gmail.com", icon: "fa-solid fa-envelope" }
    ],
    hero: {
        eyebrow: "Anime Cyber Portfolio",
        eyebrowIcon: "fa-solid fa-circle-dot",
        titlePrefix: "Hi, I'm",
        titleName: "TajimeRose",
        role: "Frontend Developer",
        lead: "ผมชื่อ Wongsathon Witthayakhom หรือ Rose ตอนนี้ศึกษาอยู่ที่มหาวิทยาลัยกรุงเทพ ปีการศึกษา 2569 คณะเทคโนโลยีสารสนเทศและนวัตกรรม สาขา วิทยาการคอมพิวเตอร์ ตอน ปวช. จบจาก วิทยาลัยเทคนิคสมุทรสงคราม สาขาคอมพิวเตอร์ธุรกิจ สอบเขียนโค้ดและเรื่องเกี่ยวกับคอมพิวเตอร์แต่เด็ก มีผลงานตั้งช่วงปวช. และมหาลัยดังนี้.",
        actions: [
            { label: "Hire Me", href: "mailto:wongsathon.witt@gmail.com", icon: "fa-solid fa-paper-plane", primary: true },
            { label: "Contact Me", href: "#contact", icon: "fa-solid fa-message" }
        ]
    },
    skills: [
        { key: "html", label: "HTML", icon: "fab fa-html5", delay: "0s", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
        { key: "css", label: "CSS", icon: "fab fa-css3-alt", delay: "0.35s", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
        { key: "js", label: "JavaScript", icon: "fab fa-js", delay: "0.7s", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { key: "react", label: "React", icon: "fab fa-react", delay: "1.05s", url: "https://react.dev" },
        { key: "github", label: "GitHub", icon: "fab fa-github", delay: "1.4s", url: "https://github.com/TajimeRose" },
        { key: "figma", label: "Figma", icon: "fab fa-figma", delay: "1.75s", url: "https://www.figma.com" },
        { key: "node", label: "Node.js", icon: "fab fa-node-js", delay: "2.1s", url: "https://nodejs.org" },
        { key: "db", label: "Database", icon: "fa-solid fa-database", delay: "2.45s", url: "https://www.mongodb.com" }
    ],
    about: {
        title: "About Me",
        copy: "TajimeRose คือแบรนด์ส่วนตัวของ Wongsathon Witthayakhom สำหรับงาน frontend และ creative web. ผมอาศัยอยู่ที่จังหวัดสมุทรสงคราม ให้ความสำคัญกับ layout ที่อ่านง่าย, responsive ที่ใช้งานได้จริง, animation ที่ไม่หนักเกินไป และรายละเอียดเล็ก ๆ ที่ทำให้เว็บรู้สึกพรีเมียม.",
        cards: [
            { title: "Education", icon: "fa-solid fa-graduation-cap", text: "เรียนรู้และฝึกสร้างเว็บผ่านโปรเจกต์จริง พร้อมพัฒนาพื้นฐาน HTML, CSS และ JavaScript อย่างต่อเนื่อง." },
            { title: "Experience", icon: "fa-solid fa-briefcase", text: "ออกแบบและพัฒนา landing page, portfolio, interactive UI และเว็บ static ที่เน้นภาพลักษณ์เฉพาะตัว." },
            { title: "Software / Tools", icon: "fa-solid fa-screwdriver-wrench", text: "HTML, CSS, JavaScript, React, Git, Figma, VS Code และเครื่องมือช่วยสร้าง workflow สำหรับ frontend." }
        ]
    },
    projects: {
        title: "Projects",
        category: "โปรเจค ปวช.",
        items: [
            {
                title: "NongPlatoo.Ai",
                eyebrow: "AI Tourism Assistant",
                icon: "fa-solid fa-fish-fins",
                description: "เว็บไซต์ผู้ช่วยท่องเที่ยวอัจฉริยะสำหรับจังหวัดสมุทรสงคราม ช่วยแนะนำสถานที่ท่องเที่ยว ร้านอาหาร และข้อมูลที่น่าสนใจผ่านระบบแชต AI ผู้ใช้งานสามารถสอบถามข้อมูลได้ทั้งภาษาไทยและภาษาอังกฤษ พร้อมแสดงรายละเอียดสถานที่ในรูปแบบที่เข้าใจง่าย เว็บไซต์ออกแบบให้ทันสมัย ใช้งานสะดวก และรองรับทุกขนาดหน้าจอ ช่วยลดเวลาในการค้นหาข้อมูลและทำให้การวางแผนท่องเที่ยวเป็นเรื่องง่ายยิ่งขึ้น",
                tags: ["React", "TypeScript", "Python", "Flask", "Firebase", "PostgreSQL", "OpenAI API"],
                actions: [
                    { label: "Demo", href: "https://github.com/TajimeRose/Demo-NongPlatoo.Ai.git", icon: "fa-solid fa-arrow-up-right-from-square", primary: true },
                    { label: "GitHub", href: "https://github.com/TajimeRose/NongPlatoo.Ai", icon: "fab fa-github", external: true }
                ],
                galleries: [
                    {
                        id: "nongplatoo-demo",
                        title: "ภาพตัวเว็บไซต์",
                        icon: "fa-solid fa-display",
                        interval: 4200,
                        fit: "contain",
                        images: [
                            {
                                src: "Project/ปวช./NongPlatoo.Ai/img/หน้าเว็บ/Screenshot From 2026-06-10 22-46-32.png",
                                alt: "หน้าเว็บไซต์ NongPlatoo.Ai ภาพที่ 1"
                            },
                            {
                                src: "Project/ปวช./NongPlatoo.Ai/img/หน้าเว็บ/Screenshot From 2026-06-10 22-46-44.png",
                                alt: "หน้าเว็บไซต์ NongPlatoo.Ai ภาพที่ 2"
                            },
                            {
                                src: "Project/ปวช./NongPlatoo.Ai/img/หน้าเว็บ/Screenshot From 2026-06-10 22-46-51.png",
                                alt: "หน้าเว็บไซต์ NongPlatoo.Ai ภาพที่ 3"
                            }
                        ]
                    },
                    {
                        title: "ภาพการแข่งขัน",
                        icon: "fa-solid fa-trophy",
                        interval: 3600,
                        fit: "cover",
                        images: [
                            { src: "Project/ปวช./NongPlatoo.Ai/img/การแข่งขัน/1781106099353.jpg", alt: "บรรยากาศการแข่งขัน NongPlatoo.Ai ภาพที่ 1" },
                            { src: "Project/ปวช./NongPlatoo.Ai/img/การแข่งขัน/1781106130096.jpg", alt: "บรรยากาศการแข่งขัน NongPlatoo.Ai ภาพที่ 2" },
                            { src: "Project/ปวช./NongPlatoo.Ai/img/การแข่งขัน/1781106133220.jpg", alt: "บรรยากาศการแข่งขัน NongPlatoo.Ai ภาพที่ 3" },
                            { src: "Project/ปวช./NongPlatoo.Ai/img/การแข่งขัน/1781106140116.jpg", alt: "บรรยากาศการแข่งขัน NongPlatoo.Ai ภาพที่ 4" },
                            { src: "Project/ปวช./NongPlatoo.Ai/img/การแข่งขัน/1781106159536.jpg", alt: "บรรยากาศการแข่งขัน NongPlatoo.Ai ภาพที่ 5" },
                            { src: "Project/ปวช./NongPlatoo.Ai/img/การแข่งขัน/1781106252340.jpg", alt: "บรรยากาศการแข่งขัน NongPlatoo.Ai ภาพที่ 6" },
                            { src: "Project/ปวช./NongPlatoo.Ai/img/การแข่งขัน/1781106261337.jpg", alt: "บรรยากาศการแข่งขัน NongPlatoo.Ai ภาพที่ 7" },
                            { src: "Project/ปวช./NongPlatoo.Ai/img/การแข่งขัน/1781106354980.jpg", alt: "บรรยากาศการแข่งขัน NongPlatoo.Ai ภาพที่ 8" }
                        ]
                    }
                ]
            }
        ]
    },
    contact: {
        title: "Contact",
        links: [
            { title: "Email", text: "wongsathon.witt@gmail.com", href: "mailto:wongsathon.witt@gmail.com", icon: "fa-solid fa-envelope" },
            { title: "GitHub", text: "github.com/TajimeRose", href: "https://github.com/TajimeRose", icon: "fab fa-github", external: true },
            { title: "LinkedIn", text: "Wongsathon Witthayakhom", href: "https://www.linkedin.com/in/wongsathon-witthayahom-9b5426367/", icon: "fab fa-linkedin-in", external: true },
            { title: "Discord", text: "tajimerose community contact", href: "https://discord.com/users/1130846576013738004", icon: "fab fa-discord", external: true },
            { title: "Instagram", text: "@tajimerose.dev", href: "https://www.instagram.com/tajimerose.dev/", icon: "fab fa-instagram", external: true },
            { title: "Facebook", text: "Wongsathon Witthayakhom", href: "https://www.facebook.com/wongsathon.witthayakhom", icon: "fab fa-facebook-f", external: true }
        ]
    },
    footer: {
        copyright: "Copyright © 2026 TajimeRose. All rights reserved."
    }
};

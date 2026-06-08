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
        { key: "html", label: "HTML", icon: "fab fa-html5", delay: "0s" },
        { key: "css", label: "CSS", icon: "fab fa-css3-alt", delay: "0.35s" },
        { key: "js", label: "JavaScript", icon: "fab fa-js", delay: "0.7s" },
        { key: "react", label: "React", icon: "fab fa-react", delay: "1.05s" },
        { key: "github", label: "GitHub", icon: "fab fa-github", delay: "1.4s" },
        { key: "figma", label: "Figma", icon: "fab fa-figma", delay: "1.75s" },
        { key: "node", label: "Node.js", icon: "fab fa-node-js", delay: "2.1s" },
        { key: "db", label: "Database", icon: "fa-solid fa-database", delay: "2.45s" }
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
        items: [
            {
                title: "Anime Portfolio",
                icon: "fa-solid fa-user-astronaut",
                description: "เว็บแนะนำตัวธีมมืดแดง พร้อม hero profile, section ผลงาน และ micro interaction.",
                tags: ["HTML", "CSS", "JS"],
                actions: [{ label: "Live Demo", href: "#home", primary: true }, { label: "GitHub", href: "https://github.com/TajimeRose", external: true }]
            },
            {
                title: "Game UI Concept",
                icon: "fa-solid fa-gamepad",
                description: "หน้า UI สำหรับโปรเจกต์เกมหรือ community ที่เน้นบรรยากาศ cyber และ card layout.",
                tags: ["React", "CSS", "Motion"],
                actions: [{ label: "Live Demo", href: "#contact", primary: true }, { label: "GitHub", href: "https://github.com/TajimeRose", external: true }]
            },
            {
                title: "Dashboard Layout",
                icon: "fa-solid fa-database",
                description: "โครงหน้า dashboard สำหรับจัดข้อมูล โปรเจกต์ และสถานะงานแบบอ่านง่ายบนทุกขนาดหน้าจอ.",
                tags: ["JS", "MySQL", "UI"],
                actions: [{ label: "Live Demo", href: "#contact", primary: true }, { label: "GitHub", href: "https://github.com/TajimeRose", external: true }]
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

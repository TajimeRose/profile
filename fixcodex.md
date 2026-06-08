แก้ Hero / Skill Orbit Section ให้เหมือนภาพอ้างอิงที่ 1 ไม่ใช่แบบภาพที่ 2

เป้าหมาย:
ต้องการวงกลมโปรไฟล์อยู่ตรงกลาง เป็นรูปตัวละคร/รูปโปรไฟล์จริง ขอบวงกลมสีแดงเรืองแสง และมีไอคอนเทคโนโลยีเล็ก ๆ โคจรรอบรูปแบบเรียบง่าย

สิ่งที่ต้องแก้:
1. เอาองค์ประกอบทรง 3D / ลูกบอลแดงใหญ่ / เส้นวงโคจรหนา / กล่องสี่เหลี่ยมสีเนื้อ / ตัวอักษร TR แบบภาพที่ 2 ออกทั้งหมด
2. ตรงกลางต้องเป็นรูปโปรไฟล์วงกลม ไม่ใช่กล่องหรือโลโก้
3. รูปโปรไฟล์ต้องมี:
   - border-radius: 50%
   - border สีแดงสด
   - box-shadow สีแดงแบบ glow
   - background สีขาวด้านใน
4. รอบรูปโปรไฟล์ให้วางไอคอน skill เป็นวงกลมเล็ก ๆ หลายตำแหน่ง เช่น HTML, CSS, JS, React, GitHub, Figma, Node, Database
5. ไอคอนแต่ละอันต้องเป็นวงกลมเล็ก ขอบแดงบาง ๆ พื้นหลังดำโปร่งใส มี glow แดงเล็กน้อย
6. ตำแหน่งไอคอนต้องกระจายรอบรูป ไม่ต้องมีเส้นวงโคจรขนาดใหญ่แบบภาพที่ 2
7. พื้นหลังเป็นสีดำหรือดำไล่เฉด พร้อม radial glow สีแดงอ่อน ๆ ตรงกลาง
8. ขนาดรวมต้องดูคล้ายภาพที่ 1:
   - profile circle ประมาณ 220px
   - orbit area ประมาณ 420px
   - icon circle ประมาณ 42px
9. เพิ่ม animation เบา ๆ ได้ เช่น icons ลอยขึ้นลงเล็กน้อย หรือหมุนช้ามาก แต่ห้ามทำให้ดูเป็นโมเดล 3D แบบภาพที่ 2

โครงสร้าง HTML ที่ต้องการ:
<section class="hero">
  <div class="orbit-container">
    <div class="profile-circle">
      <img src="..." alt="Profile" />
    </div>

    <div class="skill-icon html">...</div>
    <div class="skill-icon css">...</div>
    <div class="skill-icon js">...</div>
    <div class="skill-icon react">...</div>
    <div class="skill-icon github">...</div>
    <div class="skill-icon figma">...</div>
    <div class="skill-icon node">...</div>
    <div class="skill-icon db">...</div>
  </div>
</section>

CSS direction:
- ใช้ position: relative กับ .orbit-container
- ใช้ position: absolute กับ .skill-icon
- วางแต่ละ icon ด้วย top/left แบบกำหนดเองรอบวงกลม
- อย่าใช้ perspective, transform-style: preserve-3d, 3D sphere, card box, หรือเส้น orbit หนา
- responsive mobile ให้ profile circle ลดเหลือประมาณ 170px และ orbit area ประมาณ 320px

ผลลัพธ์สุดท้ายต้องใกล้ภาพแรก: 
รูปโปรไฟล์วงกลมตรงกลาง + ไอคอนเล็ก ๆ รอบรูป + glow แดง + layout minimal dark portfolio
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.pdfgen import canvas

class PageNumCanvas(canvas.Canvas):
    total_pages = 0
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.pages = []

    def showPage(self):
        self.pages.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        PageNumCanvas.total_pages = len(self.pages)
        for page in self.pages:
            self.__dict__.update(page)
            super().showPage()
        super().save()

def build_pdf(filename):
    margin_lr = 30
    margin_tb = 24
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=margin_lr,
        rightMargin=margin_lr,
        topMargin=margin_tb,
        bottomMargin=margin_tb
    )

    content_width = letter[0] - 2 * margin_lr
    styles = getSampleStyleSheet()

    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=20,
        leading=22,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#000000'),
        spaceAfter=3
    )

    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=9,
        leading=12,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#222222')
    )

    section_heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=11,
        leading=13,
        textColor=colors.HexColor('#000000'),
        spaceBefore=6,
        spaceAfter=1
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=9,
        leading=11.8,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#111111')
    )

    tech_style = ParagraphStyle(
        'TechStyle',
        parent=styles['Normal'],
        fontName='Times-Italic',
        fontSize=8.8,
        leading=11,
        textColor=colors.HexColor('#222222'),
        spaceAfter=1.5
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.8,
        leading=11.2,
        leftIndent=10,
        firstLineIndent=-7,
        spaceAfter=1.5,
        textColor=colors.HexColor('#111111')
    )

    story = []

    # Header
    story.append(Paragraph("ASHFAH ASHRAF", name_style))
    
    contact_text = (
        "+91 9497511242 &nbsp;|&nbsp; "
        "<a href='mailto:ashfahashraf@gmail.com' color='#003399'><u>ashfahashraf@gmail.com</u></a> &nbsp;|&nbsp; "
        "<a href='https://linkedin.com/in/ashfah-ashraf' color='#003399'><u>linkedin.com/in/ashfah-ashraf</u></a><br/>"
        "<a href='https://github.com/ashfahashraf' color='#003399'><u>github.com/ashfahashraf</u></a> &nbsp;|&nbsp; "
        "Kerala, India"
    )
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 4))

    def add_section_header(title):
        story.append(Paragraph(f"<b>{title}</b>", section_heading_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#444444'), spaceBefore=1, spaceAfter=3))

    # Professional Summary
    add_section_header("Professional Summary")
    summary_text = (
        "Full Stack Developer with experience in Python, Django, FastAPI, React.js, Next.js, TypeScript, MySQL, and "
        "MongoDB. Skilled in developing RESTful APIs, implementing JWT Authentication, building scalable web "
        "applications, and optimizing MySQL database performance. Proficient in Git, GitHub, and Agile development."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 3))

    # Experience
    add_section_header("Experience")
    
    exp_header_left = Paragraph("<b>Full Stack Developer Intern</b><br/><font color='#333333'>MarketBytes, Infopark Cherthala</font>", body_style)
    exp_header_right = Paragraph("<font color='#333333'>April 2026 - September 2026</font>", ParagraphStyle('RightText', parent=body_style, alignment=TA_RIGHT))
    
    exp_table = Table([[exp_header_left, exp_header_right]], colWidths=[content_width * 0.7, content_width * 0.3])
    exp_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(exp_table)

    exp_bullets = [
        "◦ Developed a LegalTech platform serving 5 user roles with secure JWT Authentication and Role-Based Access Control (RBAC).",
        "◦ Improved API response time by 30% through query optimization and efficient database design.",
        "◦ Led feature development for a 4-member development team, managing Git workflows, code reviews, and sprint delivery."
    ]
    for b in exp_bullets:
        story.append(Paragraph(b, bullet_style))
    story.append(Spacer(1, 3))

    # Technical Skills
    add_section_header("Technical Skills")
    skills = [
        ("Languages:", "Python, JavaScript (ES6+), TypeScript"),
        ("Frontend:", "React.js, Next.js, HTML5, CSS3, Tailwind CSS, Bootstrap"),
        ("Backend:", "Django, Django REST Framework (DRF), FastAPI"),
        ("Databases:", "MySQL, MongoDB"),
        ("Tools:", "Git, GitHub, GitHub Copilot, Jira, Linux"),
        ("Concepts:", "RESTful APIs, JWT Authentication, RBAC, CRUD Operations")
    ]
    for label, val in skills:
        p_text = f"• <b>{label}</b> {val}"
        story.append(Paragraph(p_text, bullet_style))
    story.append(Spacer(1, 3))

    # Projects
    add_section_header("Projects")

    # Project 1
    p1_title = Paragraph("<b>LegalTech Platform – Law Firm & Case Management System</b>", body_style)
    story.append(p1_title)
    p1_tech = Paragraph("Technologies: Python, FastAPI, Next.js, MySQL, SQLAlchemy, JWT, Razorpay", tech_style)
    story.append(p1_tech)
    p1_bullets = [
        "• Built a full-stack legal tech platform using <b>FastAPI</b>, <b>Next.js</b>, and <b>MySQL</b>, building an automated <b>e-Courts India API gateway</b> with <b>CNR number tracking</b> to synchronize live hearing dates and court schedules.",
        "• Built an <b>AI-assisted legal document drafting engine</b> paired with a Junior-to-Senior advocate approval pipeline, enforcing secure <b>JWT Authentication</b> and fine-grained <b>Role-Based Access Control (RBAC)</b> across 5 user roles.",
        "• Integrated <b>Razorpay</b> for client fee payments and automated PDF invoice generation, synchronized hearing alerts via <b>Google Calendar API</b>, and managed database migrations using <b>Alembic</b>."
    ]
    for b in p1_bullets:
        story.append(Paragraph(b, bullet_style))
    story.append(Spacer(1, 2.5))

    # Project 2
    p2_title = Paragraph("<b>CraftHover – AI-Powered Handicraft Marketplace</b>", body_style)
    story.append(p2_title)
    p2_tech = Paragraph("Technologies: Python, Django, HTML, CSS, Bootstrap, Hugging Face Transformers, Chart.js, MySQL", tech_style)
    story.append(p2_tech)
    p2_bullets = [
        "• Implemented a full-stack handicraft marketplace using <b>Python</b>, <b>Django</b>, <b>Bootstrap</b>, and <b>MySQL</b> for product, cart, wishlist, and order management.",
        "• Built artisan and customer dashboards with product management, user authentication, profile management, order tracking, and admin features.",
        "• Integrated <b>Hugging Face Transformers</b> for AI-powered product descriptions and developed analytics dashboards using <b>Chart.js</b> to visualize sales and product performance."
    ]
    for b in p2_bullets:
        story.append(Paragraph(b, bullet_style))
    story.append(Spacer(1, 3))

    # Education
    add_section_header("Education")
    
    edu1_left = Paragraph("<b>Python Full Stack Development Training</b><br/><font color='#444444'>BLearn Academy</font>", body_style)
    edu1_right = Paragraph("<font color='#333333'><b>Sep 2025 - Mar 2026</b></font><br/><font color='#444444'>On-site</font>", ParagraphStyle('RightText', parent=body_style, alignment=TA_RIGHT))
    edu1_table = Table([[edu1_left, edu1_right]], colWidths=[content_width * 0.7, content_width * 0.3])
    edu1_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(edu1_table)
    story.append(Spacer(1, 2))

    edu2_left = Paragraph("<b>B.Tech in Computer Science and Engineering</b><br/><font color='#444444'>Vimal Jyothi Engineering College</font>", body_style)
    edu2_right = Paragraph("<font color='#333333'><b>July 2021 - April 2025</b></font>", ParagraphStyle('RightText', parent=body_style, alignment=TA_RIGHT))
    edu2_table = Table([[edu2_left, edu2_right]], colWidths=[content_width * 0.7, content_width * 0.3])
    edu2_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(edu2_table)
    story.append(Spacer(1, 3))

    # Certificates
    add_section_header("Certificates")
    cert_text = "• <b>Python Full Stack Development Course Certificate</b> — BLearn Academy"
    story.append(Paragraph(cert_text, bullet_style))

    doc.build(story, canvasmaker=PageNumCanvas)
    print(f"PDF generated successfully at: {filename} (Total pages: {PageNumCanvas.total_pages})")

if __name__ == "__main__":
    out_path1 = r"c:\portfolios\public\Ashfah_Ashraf.pdf"
    out_path2 = r"c:\portfolios\public\Ashfah Ashraf.pdf"
    build_pdf(out_path1)
    build_pdf(out_path2)

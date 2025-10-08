import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const formData = await req.json();
        const { name, email, social, phone, role, questions } = formData;

        if (!name || !email || !social || !role) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.hostinger.com",
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // 1. Send to admin inbox
        await transporter.sendMail({
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            replyTo: email,
            to: "undergroundrunwayfashionraid@gmail.com",
            bcc: "teamcapsulecorporations@gmail.com",
            subject: `UGRFR Registration: ${name}`,
            text: `
New UGRFR Registration

Name: ${name}
Email: ${email}
Social: ${social}
Phone: ${phone || "Not provided"}
Role: ${role}

Questions:
${questions || "None"}
      `.trim(),
            html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">New UGRFR Registration</h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 8px 0;"><strong>Social:</strong> ${social}</p>
            <p style="margin: 8px 0;"><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p style="margin: 8px 0;"><strong>Role:</strong> ${role}</p>
          </div>

          ${
              questions
                  ? `
          <div style="margin: 20px 0;">
            <p style="margin: 8px 0;"><strong>Questions:</strong></p>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${questions}</p>
          </div>
          `
                  : ""
          }
        </div>
      `.trim(),
        });

        // 2. Send confirmation to user
        await transporter.sendMail({
            from: `"UGRFR Team" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your UGRFR Registration Received ✓",
            text: `
Hi ${name},

Thank you for registering your interest in UGRFR - Underground Runway Fashion Rave!

We've received your registration and our team will review it shortly.

Please follow UGRFR as venue, location and timings will be revealed to everyone through email once everyone shares their looks.

Event Details:
📅 Saturday, 11 October 2025
📍 Saigon, Vietnam
👥 Only 50 spots available

Your Registration:
Role: ${role}
Social: ${social}

---

📢 Thông Báo Dành Cho Người Mẫu – Underground Runway Rave

Chúng tôi đã nhận được hơn 300 đơn đăng ký từ người mẫu, và để đảm bảo tiêu chuẩn sáng tạo của sự kiện, tất cả người mẫu tham gia cần tự chuẩn bị những bộ trang phục/“look” độc đáo, táo bạo và phù hợp với tinh thần Rave.

Nếu muốn, bạn có thể tham khảo hoặc liên hệ để mượn trang phục từ các bộ sưu tập tốt nghiệp trước đây để phối đồ hoặc hợp tác.

Lưu ý:
✅ Hãy đến trong trạng thái sẵn sàng hoàn toàn — Sự kiện không có phòng thay đồ hoặc khu vực chuẩn bị hậu trường.
👗 Nếu bạn muốn tham gia sàn diễn, hãy gửi hình ảnh look/trang phục của bạn qua DM để ban tổ chức xem xét và ưu tiên xác nhận suất diễn.
💸 Đây là sự kiện phi thương mại – chúng tôi không thu bất kỳ khoản phí nào từ người tham gia.

Chúng tôi đang tạo nên một không gian thời trang ngầm, đầy năng lượng — hãy mang đến những bộ trang phục “điên rồ” và thể hiện cá tính thời trang mạnh mẽ nhất của bạn!

Please take a screenshot and tag us in your story to complete the process.
Our team will review your form and connect with you for your role.

If you have any questions in the meantime, feel free to reply to this email.

See you on the runway,
UGRFR Team
`.trim(),
            html: `
<div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #000; color: #fff;">
  <h1 style="font-size: 32px; margin-bottom: 10px; letter-spacing: 2px;">UGRFR</h1>
  <p style="font-size: 14px; color: #999; margin-bottom: 30px; letter-spacing: 1px;">UNDERGROUND RUNWAY FASHION RAVE</p>
  
  <h2 style="color: #fff; margin-bottom: 20px;">Hi ${name},</h2>
  
  <p style="line-height: 1.6; color: #ccc; margin-bottom: 20px;">
    Thank you for registering your interest in UGRFR! We've received your registration and our team will review it shortly. 
    Please follow UGRFR as venue, location and timings will be revealed to everyone through email once everyone shares their looks.
  </p>

  <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin: 30px 0;">
    <p style="margin: 8px 0; color: #fff;"><strong>📅 Date:</strong> Saturday, 11 October 2025</p>
    <p style="margin: 8px 0; color: #fff;"><strong>📍 Location:</strong> Saigon, Vietnam</p>
    <p style="margin: 8px 0; color: #fff;"><strong>👥 Capacity:</strong> Only 50 spots available</p>
  </div>

  <div style="background: rgba(255,255,255,0.03); border-radius: 12px; padding: 20px; margin: 30px 0;">
    <p style="margin: 8px 0; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Your Registration</p>
    <p style="margin: 8px 0; color: #fff;"><strong>Role:</strong> ${role}</p>
    <p style="margin: 8px 0; color: #fff;"><strong>Social:</strong> ${social}</p>
  </div>

  <div style="background: rgba(255,255,255,0.03); border-radius: 12px; padding: 20px; margin: 30px 0;">
    <h3 style="color: #fff; margin-bottom: 10px;">📢 Thông Báo Dành Cho Người Mẫu – Underground Runway Rave</h3>
    <p style="color: #ccc; line-height: 1.6;">
      Chúng tôi đã nhận được hơn 300 đơn đăng ký từ người mẫu, và để đảm bảo tiêu chuẩn sáng tạo của sự kiện, tất cả người mẫu tham gia cần tự chuẩn bị những bộ trang phục/“look” độc đáo, táo bạo và phù hợp với tinh thần Rave.
    </p>
    <p style="color: #ccc; line-height: 1.6;">
      Nếu muốn, bạn có thể tham khảo hoặc liên hệ để mượn trang phục từ các bộ sưu tập tốt nghiệp trước đây để phối đồ hoặc hợp tác.
    </p>
    <ul style="color: #ccc; line-height: 1.6;">
      <li>✅ Hãy đến trong trạng thái sẵn sàng hoàn toàn — Sự kiện không có phòng thay đồ hoặc khu vực chuẩn bị hậu trường.</li>
      <li>👗 Nếu bạn muốn tham gia sàn diễn, hãy gửi hình ảnh look/trang phục của bạn qua DM để ban tổ chức xem xét và ưu tiên xác nhận suất diễn.</li>
      <li>💸 Đây là sự kiện phi thương mại – chúng tôi không thu bất kỳ khoản phí nào từ người tham gia.</li>
    </ul>
    <p style="color: #ccc; line-height: 1.6;">
      Chúng tôi đang tạo nên một không gian thời trang ngầm, đầy năng lượng — hãy mang đến những bộ trang phục “điên rồ” và thể hiện cá tính thời trang mạnh mẽ nhất của bạn!
    </p>
  </div>

  <p style="line-height: 1.6; color: #ccc; margin-top: 30px;">
    Please take a screenshot and tag us in your story to complete the process.
  </p>

  <p style="line-height: 1.6; color: #ccc; margin-top: 30px;">
    Our team will review your form and connect with you for your role.
  </p>

  <p style="line-height: 1.6; color: #ccc; margin-top: 30px;">
    If you have any questions in the meantime, feel free to reply to this email.
  </p>

  <p style="margin-top: 40px; color: #fff;">
    See you on the runway,<br/>
    <strong>UGRFR Team</strong>
  </p>
</div>
`.trim(),
        });

        return NextResponse.json({ success: true, message: "Registration submitted successfully!" });
    } catch (error) {
        console.error("[v0] Email sending failed:", error);
        return NextResponse.json({ success: false, message: "Failed to send registration." }, { status: 500 });
    }
}

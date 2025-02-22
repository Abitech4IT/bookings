import mailService from "@services/mail";

type BookingDetailsParams = {
  firstName?: string;
  lastName?: string;
  title: string;
  email?: string | null;
  bookingDate: Date;
};

const sendBookingEmail = async ({
  firstName,
  lastName,
  title,
  email,
  bookingDate,
}: BookingDetailsParams) => {
  // Send user booking details
  const emailSubject = "Booking Details";
  const emailHtml = `
      <h1>Booking Details</h1>
      <p>Your booking was successful.</p>
      <p><strong>Details:</strong></p>
      <ul>
        <li>Customer Name: ${firstName} ${lastName}</li>
        <li>Customer Email: ${email}</li>
        <li>Booking Title: <strong>${title}</strong></li>
        <li>Booking Date: ${bookingDate}</li>
      </ul>
      <p>Thank you for patronising us.</p>
    `;

  if (email) {
    const [emailResult, emailError] = await mailService.sendMail({
      to: email,
      subject: emailSubject,
      html: emailHtml,
    });

    if (emailError) {
      console.error("Failed to send data transaction email:", emailError);
    }
  } else {
    console.error("User email not defined. Cannot send email notification.");
  }
};

export default sendBookingEmail;

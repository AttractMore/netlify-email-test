import { sendEmail } from "@netlify/emails";

export const handler = async function (event) {
  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify("Payload required"),
    };
  }
  const requestBody = JSON.parse(event.body);

  await sendEmail({
    from: "emailsender.searched@simplelogin.com",
    to: "roger@attractmore.co.uk",
    subject: "You have a new subscriber",
    template: "notification",
    parameters: {
      firstName: requestBody.subscriberFirstName,
      lastName: requestBody.subscriberLastName,
      email: requestBody.subscriberEmail,
      message: requestBody.subscriberMessage,
    },
  });

  return {
    statusCode: 200, // essential for handleSubmit to check response.ok
    body: "Notification email sent",
  };
};

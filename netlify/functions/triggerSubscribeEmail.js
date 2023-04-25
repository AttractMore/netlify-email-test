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
    to: `${requestBody.subscriberEmail}`,
    subject: "You have been subscribed",
    template: "subscribed",
    parameters: {
      firstName: requestBody.subscriberFirstName,
      lastName: requestBody.subscriberLastName,
      message: requestBody.subscriberMessage,
    },
  });
  return {
    statusCode: 200, // essential for handleSubmit to check response.ok
    body: "Thanks, you've been subscribed. Email confirmation is on its way!",
  };
};

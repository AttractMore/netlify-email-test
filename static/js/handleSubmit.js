export const handleSubmit = async (event) => {
  event.preventDefault();
  const subscribeForm = document.getElementById("subscribe-form");
  let logMsg = document.getElementById("log");
  let subscribeFormData = new FormData(subscribeForm);
  let response = await fetch("./.netlify/functions/triggerSubscribeEmail", {
    method: "POST",
    body: JSON.stringify({
      subscriberFirstName: subscribeFormData.get("firstName"),
      subscriberLastName: subscribeFormData.get("lastName"),
      subscriberEmail: subscribeFormData.get("email"),
      subscriberMessage: subscribeFormData.get("message"),
    }),
  });
  if (response.ok) {
    let msg = await response.text();
    logMsg.innerHTML = msg;
    console.log(msg);
    let response2 = await fetch("./.netlify/functions/triggerNotificationEmail", {
      method: "POST",
      body: JSON.stringify({
        subscriberFirstName: subscribeFormData.get("firstName"),
        subscriberLastName: subscribeFormData.get("lastName"),
        subscriberEmail: subscribeFormData.get("email"),
        subscriberMessage: subscribeFormData.get("message"),
      }),
    });
    if (response2.ok) {
      let msg2 = await response2.text();
      console.log(msg2);
    } else {
      console.log("Response 2 NOT OK. HTTP-Error: " + response2.status);
    }
  } else {
    logMsg.innerHTML = `Your subscription was not successful. Please contact us. The error was HTTP-Error: ${response.status}`;
    console.log("Response 1 NOT OK. HTTP-Error: " + response.status);
  }
};

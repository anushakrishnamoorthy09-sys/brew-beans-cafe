const form =
  document.getElementById(
    "contactForm"
  );

const responseMessage =
  document.getElementById(
    "responseMessage"
  );

form.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();

    const messageData = {
      name:
        document.getElementById(
          "name"
        ).value,

      email:
        document.getElementById(
          "email"
        ).value,

      subject:
        document.getElementById(
          "subject"
        ).value,

      message:
        document.getElementById(
          "message"
        ).value
    };

    try {

      const response =
        await fetch(
          "https://brew-beans-api.onrender.com/api/messages",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json"
            },
            body:
              JSON.stringify(
                messageData
              )
          }
        );

      const data =
        await response.json();

      if (response.ok) {

        responseMessage.innerText =
          "✅ Message sent successfully!";

        form.reset();

      } else {

        responseMessage.innerText =
          data.message;
      }

    } catch (error) {

      console.error(error);

      responseMessage.innerText =
        "❌ Server Error";
    }
  }
);
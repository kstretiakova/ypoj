document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const requiredFields = {
      firstName: form.querySelector('input[name="first_name"]'),
      email: form.querySelector('input[name="email"]'),
    };
  
    // для додавання і зняття червоної рамки
    function setErrorBorder(field, showError) {
      if (showError) {
        field.style.transition = "border-color 0.3s ease, box-shadow 0.3s ease";
        field.style.border = "0.4px solid rgba(255, 0, 0, 0.3)"; //  тут червоний колір
        field.style.boxShadow = "0 0 6px rgba(255, 0, 0, 0.3)";
      } else {
        field.style.border = "1px solid #ddd"; // повертаю до стандартного стилю
        field.style.boxShadow = "none";
      }
    }
  
    // Додавання обробника введення тексту (input event)
    Object.values(requiredFields).forEach((field) => {
      field.addEventListener("input", () => {
        setErrorBorder(field, false); // при введенні тексту рамка буде зникати
      });
    });
  
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // зупин стандартну відправку форми
  
      let isValid = true;
  
      // тут перевіряю обов'язкові поля
      Object.entries(requiredFields).forEach(([key, field]) => {
        if (!field.value.trim()) {
          setErrorBorder(field, true); // додаю червону рамку
          isValid = false;
        }
      });
  
      // якщо є якісь помилки, відправка зупиняється
      if (!isValid) return;
  
      // формування повідомлення для відправки
      const formData = new FormData(form);
      const messageBody = `
        First Name: ${formData.get("first_name") || "Not provided"}\n
        Last Name: ${formData.get("last_name") || "Not provided"}\n
        Email: ${formData.get("email") || "Not provided"}\n
        Message: ${formData.get("message") || "Not provided"}
      `;
  
      // на два імейли
      sendEmail("yachtdreamjob@gmail.com", messageBody);
      sendEmail("ktretyakova1927@gmail.com", messageBody);
  
      // нормальна відправка форми
      form.submit();
    });
  
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    function sendEmail(to, body) {
      // Приклад використання Email API (SMTP або сторонні сервіси)
      fetch("https://your-email-api-endpoint.com/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          subject: "New Contact Form Submission",
          text: body,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            console.error(`Failed to send email to ${to}`);
          }
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
    }
  });
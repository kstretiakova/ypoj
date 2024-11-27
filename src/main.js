document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const requiredFields = {
      firstName: form.querySelector('input[name="first_name"]'),
      email: form.querySelector('input[name="email"]'),
    };
  
    // Функція для додавання/зняття червоної рамки
    function setErrorBorder(field, showError) {
      if (showError) {
        field.style.transition = "border-color 0.3s ease, box-shadow 0.3s ease";
        field.style.border = "0.4px solid rgba(255, 0, 0, 0.5)"; // Прозорий червоний колір
        field.style.boxShadow = "0 0 6px rgba(255, 0, 0, 0.3)";
      } else {
        field.style.border = "1px solid #ddd"; // Повернення до стандартного стилю
        field.style.boxShadow = "none";
      }
    }
  
    // Додавання обробника введення тексту (input event)
    Object.values(requiredFields).forEach((field) => {
      field.addEventListener("input", () => {
        setErrorBorder(field, false); // При введенні тексту рамка зникає
      });
    });
  
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Зупиняє стандартну відправку форми
  
      let isValid = true;
  
      // Перевірка обов'язкових полів
      Object.entries(requiredFields).forEach(([key, field]) => {
        if (!field.value.trim()) {
          setErrorBorder(field, true); // Додати червону рамку
          isValid = false;
        }
      });
  
      // Якщо є помилки, зупиняємо відправку
      if (!isValid) return;
  
      // Формування повідомлення для відправки
      const formData = new FormData(form);
      const messageBody = `
        First Name: ${formData.get("first_name") || "Not provided"}\n
        Last Name: ${formData.get("last_name") || "Not provided"}\n
        Email: ${formData.get("email") || "Not provided"}\n
        Message: ${formData.get("message") || "Not provided"}
      `;
  
      // Відправка повідомлення на два email
      sendEmail("yachtdreamjob@gmail.com", messageBody);
      sendEmail("ktretyakova1927@gmail.com", messageBody);
  
      // Нормальна відправка форми
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
const products = [
  {
    id: 1,
    name: "Ice Cream 1",
    price: 100,
    description: "This is Ice Cream 1",
    image: "images/cream.jpg",
  },
  {
    id: 2,
    name: "Ice Cream 2",
    price: 200,
    description: "This is Ice Cream 2",
    image: "images/cream2.jpg",
  },
  {
    id: 3,
    name: "Ice Cream 3",
    price: 300,
    description: "This is Ice Cream 3",
    image: "images/cream7.jpg",
  },
  {
    id: 4,
    name: "Ice Cream 4",
    price: 400,
    description: "This is Ice Cream 4",
    image: "images/cream3.jpg",
  },
  {
    id: 5,
    name: "Ice Cream 5",
    price: 500,
    description: "This is Ice Cream 5",
    image: "images/cream4.jpg",
  },
  {
    id: 6,
    name: "Ice Cream 6",
    price: 600,
    description: "This is Ice Cream 6",
    image: "images/cream5.jpg",
  },
];

const productsElement = document.querySelector("#products");
const cart = [];

// Function to create an element, set attributes, content, and append to parent
function createAndAppend(
  tag,
  parent,
  attributes = {},
  content = "",
  styles = {}
) {
  const element = document.createElement(tag);

  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }

  element.innerHTML = content;

  for (const style in styles) {
    element.style[style] = styles[style];
  }

  parent.appendChild(element);
  return element;
}

// Function to handle adding product to cart
function addToCart(product) {
  cart.push(product);
  console.log(`Added to cart: ${product.name}`);
  console.log("Current Cart:", cart);
}

// Generate the product cards dynamically
products.forEach((product) => {
  // Column div
  const divColumn = createAndAppend("div", productsElement, {
    class: "col-12 col-md-4 mb-4",
  });

  // Card div
  const divCard = createAndAppend("div", divColumn, { class: "card h-100" });

  // Image element
  createAndAppend("img", divCard, {
    class: "card-img-top",
    src: product.image,
    alt: product.name,
  });

  // Card body
  const divCardBody = createAndAppend("div", divCard, { class: "card-body" });

  // Title element
  createAndAppend("h5", divCardBody, { class: "card-title" }, product.name);

  // Description element
  createAndAppend(
    "p",
    divCardBody,
    { class: "card-text" },
    product.description
  );

  // Price element
  createAndAppend(
    "p",
    divCardBody,
    { class: "card-text fw-bold" },
    `Price: $${product.price}`
  );

  // Button group div
  const buttonGroup = createAndAppend("div", divCardBody, {
    class: "d-flex justify-content-end gap-2",
  });

  // View Details button
  createAndAppend(
    "a",
    buttonGroup,
    {
      class: "btn btn-primary",
      href: "#",
    },
    "View Details"
  );

  // Add to Cart button
  const addToCartButton = createAndAppend(
    "button",
    buttonGroup,
    {
      class: "btn btn-info",
    },
    "Add to Cart"
  );

  // Add click event to "Add to Cart" button
  addToCartButton.addEventListener("click", () => addToCart(product));
});



const enquiryForm = document.getElementById("enquiryForm");

enquiryForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent traditional form submission

  // Clear any previous error messages
  document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.textContent = ""));

  // Validate each input
  let isValid = true;

  // Validate first name
  const firstName = document.getElementById("first-name");
  if (firstName.value.trim() === "") {
    displayError(firstName, "First name is required.");
    isValid = false;
  }

  // Validate last name
  const lastName = document.getElementById("last-name");
  if (lastName.value.trim() === "") {
    displayError(lastName, "Last name is required.");
    isValid = false;
  }

  // Validate mobile number (10-digit format)
  const mobile = document.getElementById("mobile");
  const mobilePattern = /^\d{10}$/;
  if (!mobilePattern.test(mobile.value)) {
    displayError(mobile, "Please enter a valid 10-digit mobile number.");
    isValid = false;
  }

  // Validate email
  const email = document.getElementById("email");
  if (!email.checkValidity()) {
    displayError(email, "Please enter a valid email address.");
    isValid = false;
  }

  // Validate ice cream selection
  const iceCream = document.getElementById("ice-cream");
  if (iceCream.value === "") {
    displayError(iceCream, "Please select an ice cream.");
    isValid = false;
  }

  // Validate enquiry message (minimum 10 characters)
  const enquiryMessage = document.getElementById("enquiry-message");
  if (enquiryMessage.value.trim().length < 10) {
    displayError(
      enquiryMessage,
      "Enquiry message must be at least 10 characters."
    );
    isValid = false;
  }

  // If the form is valid, send the data to Pabbly
  if (isValid) {
    // Gather form data
    const formData = {
      firstName: firstName.value,
      lastName: lastName.value,
      mobile: mobile.value,
      email: email.value,
      iceCream: iceCream.value,
      enquiryMessage: enquiryMessage.value,
    };

    // Send data to Pabbly Webhook URL
    fetch(
      "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTZjMDYzMjA0MzM1MjZiNTUzMjUxMzIi_pc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Form data sent successfully:", data);
        alert("Enquiry submitted successfully!");
        enquiryForm.reset();
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
        alert("There was an error submitting the form.");
      });
  }
});

// Helper function to display error messages
function displayError(element, message) {
  const errorElement = element.nextElementSibling;
  errorElement.textContent = message;
  errorElement.style.color = "red";
}
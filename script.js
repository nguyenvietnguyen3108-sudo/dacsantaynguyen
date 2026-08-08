console.log("Đã khởi động dự án Đặc Sản Tây Nguyên thành công!");

const fallbackProducts = [
  {
    name: "Cà phê Tây Nguyên",
    description: "Cà phê rang xay nguyên chất, hương vị đậm đà và thơm ngon.",
    price: 120000,
    unit: "gói"
  },
  {
    name: "Mật ong rừng",
    description: "Mật ong nguyên chất từ rừng Tây Nguyên, thơm ngọt tự nhiên.",
    price: 250000,
    unit: "chai"
  },
  {
    name: "Bơ sáp Tây Nguyên",
    description: "Bơ sáp tươi, béo ngậy, rất phù hợp làm món ăn đặc sản.",
    price: 180000,
    unit: "kg"
  }
];

function renderProducts(products) {
  const container = document.getElementById("product-list");
  if (!container) return;

  container.innerHTML = products.map((product) => `
    <div class="product-card">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="price">${product.price.toLocaleString("vi-VN")} VNĐ / ${product.unit}</div>
    </div>
  `).join("");

  attachClickEffect();
}

function attachClickEffect() {
  const cards = document.querySelectorAll(".product-card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.add("clicked");
      setTimeout(() => card.classList.remove("clicked"), 250);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.protocol === "file:") {
    console.warn("Mở trực tiếp bằng file://, sử dụng dữ liệu dự phòng thay vì fetch JSON.");
    renderProducts(fallbackProducts);
    return;
  }

  fetch("data/products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then((products) => {
      renderProducts(products);
    })
    .catch((error) => {
      console.warn("Không thể tải dữ liệu sản phẩm, sử dụng dữ liệu dự phòng.", error);
      renderProducts(fallbackProducts);
    });
});
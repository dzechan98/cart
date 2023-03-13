const closeCart = document.getElementById("close-cart");
const cart = document.querySelector(".cart");
const cartIcon = document.getElementById("cart-icon");
const productBox = document.querySelectorAll(".product-box");
const cartContent = document.querySelector(".cart-content");
var totolValue = document.querySelector(".totol-price");
const btnBuy = document.querySelector(".btn-buy");
cartIcon.onclick = function () {
  cart.classList.add("active");
};
closeCart.onclick = function () {
  cart.classList.remove("active");
};

function removeCartItem(event) {
  var btnClick = event.target;
  btnClick.parentElement.remove();
  handleTotol();
}

function handleTotol() {
  var totol = 0;
  if (cartContent.querySelectorAll(".cart-box")) {
    cartContent.querySelectorAll(".cart-box").forEach((item) => {
      var cartPrice = item.querySelector(".cart-price").innerText;
      totol +=
        Number(cartPrice.slice(1, cartPrice.length)) *
        item.querySelector(".cart-quantity").value;
    });
  }

  totolValue.innerText = "$" + totol;
}
productBox.forEach((product, index) => {
  product.addEventListener("click", function () {
    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.setAttribute("data-key", index);
    const cartSrc = product.querySelector(".product-img").src;

    const cartTitle = product.querySelector(".product-title").innerText;
    const cartPrice = product.querySelector(".price").innerText;
    cartBox.innerHTML = `
      <img
      src="${cartSrc}"
      alt=""
      class="cart-img"
    />
    <div class="detail-box">
      <div class="cart-product-title">${cartTitle}</div>
      <div class="cart-price">${cartPrice}</div>
      <input type="number" value="1" min="1" class="cart-quantity" />
    </div>
    <i class="bx bxs-trash-alt cart-remove"></i>
      `;
    var isAdded = false;
    var totol = 0;

    //xu li them san pham vao gio hang
    if (cartContent.querySelectorAll(".cart-box")) {
      cartContent.querySelectorAll(".cart-box").forEach((item) => {
        totol += handleTotol(item);
        if (item.dataset.key == product.dataset.key) {
          isAdded = true;
        }
      });
    }
    if (isAdded) {
      alert("Sản phẩm đã được thêm vào giỏ hàng trước đó !!!");
    } else {
      cartContent.appendChild(cartBox);
    }
    handleTotol();
    //Xu li khi thay doi so luong san pham
    const quantityProducts = document.querySelectorAll(".cart-quantity");
    if (quantityProducts) {
      quantityProducts.forEach((quantity) => {
        quantity.addEventListener("input", handleTotol);
      });
    }
    //Xu li xoa san pham khoi gio hang
    const removeCartBtn = document.querySelectorAll(".cart-remove");
    if (removeCartBtn) {
      removeCartBtn.forEach((remove) => {
        remove.addEventListener("click", removeCartItem);
      });
    }
  });
});
//xu li khi submit gio hang
btnBuy.addEventListener("click", function () {
  if (cartContent.querySelector(".cart-box") != null) {
    cartContent.querySelectorAll(".cart-box").forEach((item) => {
      item.remove();
      handleTotol();
    });
    alert("Dặt hàng thành công");
  } else {
    alert("Giỏ hàng hiện đang trống");
  }
});

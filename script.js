let gallery = document.getElementById("gallery");
const recycleBin = document.querySelector(".bin-items");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let images = []; // will hold dynamic images
let currentIndex = 0;

// Function to refresh image list for lightbox
function updateImageList() {
  images = Array.from(document.querySelectorAll(".gallery-item img"));
  images.forEach((img, index) => {
    img.onclick = () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
      currentIndex = index;
    };
  });
}
updateImageList();

// Lightbox controls
closeBtn.onclick = () => lightbox.style.display = "none";

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
};

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.style.display = "none";
});

// Filters
const filterBtns = document.querySelectorAll(".filters button");
filterBtns.forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filters button.active").classList.remove("active");
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");
    document.querySelectorAll(".gallery-item").forEach(item => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Delete to Recycle Bin
gallery.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const item = e.target.parentElement;
    const imgSrc = item.querySelector("img").src;

    const binItem = document.createElement("div");
    binItem.classList.add("bin-item");
    binItem.innerHTML = `
      <img src="${imgSrc}" alt="Deleted Image">
      <div class="bin-actions">
        <button class="restore">Restore</button>
        <button class="permanent-delete">Delete</button>
      </div>
    `;

    recycleBin.appendChild(binItem);
    item.remove();
    updateImageList(); // refresh list
  }
});

// Restore & Permanent Delete
recycleBin.addEventListener("click", (e) => {
  const binItem = e.target.closest(".bin-item");
  if (!binItem) return;

  if (e.target.classList.contains("restore")) {
    const imgSrc = binItem.querySelector("img").src;

    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item");
    galleryItem.innerHTML = `
      <img src="${imgSrc}" alt="Restored Image">
      <button class="delete-btn">🗑️</button>
    `;
    gallery.appendChild(galleryItem);
    binItem.remove();
    updateImageList(); // refresh list
  }

  if (e.target.classList.contains("permanent-delete")) {
    binItem.remove();
  }
});

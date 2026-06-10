// =========================
// 시계
// =========================

function updateClock() {

  const now = new Date();

  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일"
  ];

  const month =
    now.getMonth() + 1;

  const date =
    now.getDate();

  const day =
    days[now.getDay()];

  let hour =
    now.getHours();

  let minute =
    now.getMinutes();

  if (minute < 10) {
    minute = "0" + minute;
  }

  const timeText =
    `${hour}:${minute}`;

  document.getElementById(
    "lockTime"
  ).textContent = timeText;

  document.getElementById(
    "statusTime"
  ).textContent = timeText;

  document.getElementById(
    "lockDate"
  ).textContent =
    `${month}월 ${date}일 ${day}`;

}

updateClock();

setInterval(
  updateClock,
  1000
);

// =========================
// 잠금해제
// =========================

const lockscreen =
  document.getElementById(
    "lockscreen"
  );

let startY = 0;

function unlockScreen() {

  lockscreen.classList.add(
    "unlock"
  );

  setTimeout(() => {

    lockscreen.style.display =
      "none";

  }, 700);

}

// 모바일

lockscreen.addEventListener(
  "touchstart",
  (e) => {

    startY =
      e.touches[0].clientY;

  }
);

lockscreen.addEventListener(
  "touchend",
  (e) => {

    const endY =
      e.changedTouches[0].clientY;

    if (
      startY - endY > 120
    ) {

      unlockScreen();

    }

  }
);

// PC

lockscreen.addEventListener(
  "mousedown",
  (e) => {

    startY = e.clientY;

  }
);

lockscreen.addEventListener(
  "mouseup",
  (e) => {

    const endY =
      e.clientY;

    if (
      startY - endY > 120
    ) {

      unlockScreen();

    }

  }
);

// =========================
// 사진앱
// =========================

const photoApp =
  document.getElementById(
    "photoApp"
  );

const gallery =
  document.getElementById(
    "gallery"
  );

const closeGallery =
  document.getElementById(
    "closeGallery"
  );

photoApp.addEventListener(
  "click",
  () => {

    gallery.classList.add(
      "open"
    );

  }
);

closeGallery.addEventListener(
  "click",
  () => {

    gallery.classList.remove(
      "open"
    );

  }
);

// =========================
// 확대 뷰어
// =========================

const viewer =
  document.getElementById(
    "viewer"
  );

const viewerContent =
  document.getElementById(
    "viewerContent"
  );

const closeViewer =
  document.getElementById(
    "closeViewer"
  );

const images =
  document.querySelectorAll(
    ".gallery-grid img"
  );

let currentIndex = 0;

// 이미지 열기

function openImage(index) {

  currentIndex = index;

  viewer.classList.add(
    "open"
  );

  viewerContent.innerHTML = `
    <img
      src="${images[index].src}"
      class="viewer-media"
    >
  `;

}

// 이미지 클릭

images.forEach(
  (img, index) => {

    img.addEventListener(
      "click",
      () => {

        openImage(index);

      }
    );

  }
);

const videos =
  document.querySelectorAll(
    ".gallery-grid video"
  );

videos.forEach(video => {

  video.addEventListener(
    "click",
    () => {

      const source =
        video.querySelector(
          "source"
        ).src;

      viewer.classList.add(
        "open"
      );

      viewerContent.innerHTML = `
        <video
          src="${source}"
          controls
          autoplay
          class="viewer-media"
        ></video>
      `;

    }
  );

});

// 닫기

closeViewer.addEventListener(
  "click",
  () => {

    viewer.classList.remove(
      "open"
    );

  }
);

// 배경 클릭

viewer.addEventListener(
  "click",
  (e) => {

    if (
      e.target === viewer
    ) {

      viewer.classList.remove(
        "open"
      );

    }

  }
);

// =========================
// 이전 다음
// =========================

const prevButton =
  document.getElementById(
    "prevImage"
  );

const nextButton =
  document.getElementById(
    "nextImage"
  );

function nextImage() {

  currentIndex++;

  if (
    currentIndex >=
    images.length
  ) {

    currentIndex = 0;

  }

  viewerContent.innerHTML = `
    <img
      src="${images[currentIndex].src}"
      class="viewer-media"
    >
  `;

}

function prevImage() {

  currentIndex--;

  if (
    currentIndex < 0
  ) {

    currentIndex =
      images.length - 1;

  }

  viewerContent.innerHTML = `
    <img
      src="${images[currentIndex].src}"
      class="viewer-media"
    >
  `;

}

nextButton.addEventListener(
  "click",
  nextImage
);

prevButton.addEventListener(
  "click",
  prevImage
);

// =========================
// 키보드
// =========================

document.addEventListener(
  "keydown",
  (e) => {

    if (
      !viewer.classList.contains(
        "open"
      )
    ) return;

    if (
      e.key === "Escape"
    ) {

      viewer.classList.remove(
        "open"
      );

    }

    if (
      e.key ===
      "ArrowRight"
    ) {

      nextImage();

    }

    if (
      e.key ===
      "ArrowLeft"
    ) {

      prevImage();

    }

  }
);

// =========================
// 모바일 스와이프
// =========================

let touchStartX = 0;

viewer.addEventListener(
  "touchstart",
  (e) => {

    touchStartX =
      e.touches[0].clientX;

  }
);

viewer.addEventListener(
  "touchend",
  (e) => {

    let touchEndX =
      e.changedTouches[0]
        .clientX;

    let diff =
      touchStartX -
      touchEndX;

    if (
      diff > 50
    ) {

      nextImage();

    }

    if (
      diff < -50
    ) {

      prevImage();

    }

  }
);

// =========================
// 더블클릭 줌
// =========================

let zoomed = false;

viewer.addEventListener(
  "dblclick",
  () => {

    const media =
      document.querySelector(
        ".viewer-media"
      );

    if (!media) return;

    zoomed = !zoomed;

    media.style.transform =
      zoomed
      ? "scale(2)"
      : "scale(1)";

  }
);
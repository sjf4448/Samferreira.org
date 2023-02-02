const text = document.querySelector("#text");

document.addEventListener("mousemove", (event) => {
  const x = event.clientX - window.innerWidth / 2;
  const y = event.clientY - window.innerHeight / 2;
  const angleX = -y / window.innerHeight * 45;
  const angleY = x / window.innerWidth * 45;
  text.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
});

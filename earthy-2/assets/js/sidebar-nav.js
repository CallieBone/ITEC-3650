document.addEventListener("DOMContentLoaded", () => {
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");
  const content = document.getElementById("content");

  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    sidebarToggle.classList.toggle("active");
    content.classList.toggle("sidebar-active");
  });
});

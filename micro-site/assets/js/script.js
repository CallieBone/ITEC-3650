let inactivityTime = function () {
    let time;
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;

    function showPopup() {
        if (confirm("Are you still there?")) {
            resetTimer();
        }
    }

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(showPopup, 60000); // 1 minute of inactivity
    }
};

inactivityTime();

function redirectToPage(event) {
    event.preventDefault();
    const question1 = document.getElementById('question1').value;
    if (question1) {
      window.location.href = question1;
    }
  }

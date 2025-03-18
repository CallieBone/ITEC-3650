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

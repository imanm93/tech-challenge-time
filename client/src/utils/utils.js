
const Utils = {
  formatTime : function(time) {
    // Parse time in ms
    let seconds = Math.floor((time / 1000) % 60)
    let minutes = Math.floor((time / (1000 * 60)) % 60)
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    // Convert to HH:MM:SS
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return hours + ":" + minutes + ":" + seconds;
  }
}

export default Utils;

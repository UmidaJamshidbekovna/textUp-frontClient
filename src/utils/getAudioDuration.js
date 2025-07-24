const getAudioDuration = function (url, next) {
  var _player = new Audio(url);
  _player.addEventListener("durationchange", function (e) {
    if (this.duration != Infinity) {
      var duration = this.duration
      _player.remove();
      next(duration);
    };
  }, false);
  _player.load();
  _player.currentTime = 24 * 60 * 60; //fake big time
  _player.volume = 0;
  _player.play();
  //waiting...
};

export default getAudioDuration;

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(event) {
  localStorage.setItem('videoplayer-current-time', event.seconds);
}

const getTime = (localStorage.getItem('videoplayer-current-time'));

if (getTime !== null) {
  player.setCurrentTime(getTime)
}

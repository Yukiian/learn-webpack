import avatar from './avatar.jpg'
import style from './index.scss'
import createAvatar from './createAvatar'

createAvatar()
const img = new Image();
img.src = avatar;
img.classList.add(style.avatar)
document.querySelector('#root').append(img)
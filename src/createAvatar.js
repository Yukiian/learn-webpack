import avatar from './avatar.jpg'

function createAvatar() {
    const img = new Image();
    img.src = avatar;
    img.classList.add('avatar')
    document.querySelector('#root').append(img)
}

export default createAvatar;
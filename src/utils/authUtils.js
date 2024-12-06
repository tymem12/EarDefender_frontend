export function setToken(token, duration = 24 * 60 * 60 * 1000) {
    const expirationTime = new Date().getTime() + duration;
    localStorage.setItem('authToken', JSON.stringify({ value: token, expiration: expirationTime }));
}
  
export function getToken() {
    const tokenData = JSON.parse(localStorage.getItem('authToken'));
    if (!tokenData) return null;

    const currentTime = new Date().getTime();
    if (currentTime > tokenData.expiration) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('nickname')
        return null;
    }
    return tokenData.value;
}

export function setNickname(nickname) {
    localStorage.setItem('nickname', nickname);
}

export function getNickname() {
    return localStorage.getItem('nickname');
}
  
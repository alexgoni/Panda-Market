export function setCookie({
  name,
  value,
  time,
}: {
  name: string;
  value: string;
  time: number;
}) {
  const now = new Date();
  now.setTime(now.getTime() + time);
  const expires = `expires=${now.toUTCString()}`;

  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

export function getCookie(name: string) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
}

export function deleteCookie(name: string) {
  setCookie({ name, value: "", time: -1 });
}

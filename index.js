// Import stylesheets
import './style.css';

async function hashy(str) {
  //converts to UTF-8 for consistency in output
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  //seems redundant but breaks when removing new Uint8...
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedString = hashArray
    .map((byte) => ('00' + byte.toString(16)).slice(-2))
    .join('');
  return hashedString;
}

async function output() {
  const ul = document.createElement('ul');
  const li = document.createElement('li');
  const blob = await hashy('Austin');
  li.innerText = blob;
  ul.appendChild(li);
  patient_list.appendChild(ul);
}

document.getElementById('go').addEventListener('click', output);

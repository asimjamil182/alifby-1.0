
let password_btn=document.getElementById('password_trigger');
let subscribe_btn=document.getElementById('subscribe_trigger');

let password_form=document.getElementById('password_form');
let subscribe_form=document.getElementById('subscribe_form');

password_btn.addEventListener('click',load_password_form);
subscribe_btn.addEventListener('click',load_subscribe_form);

if (window.location.hash=="#passwordform") {
    load_password_form();
}

function load_password_form(){
    subscribe_form.classList.add('hidden');
    password_form.classList.remove('hidden');
    password_btn.classList.add('hidden');
    subscribe_btn.classList.remove('hidden');
}
function load_subscribe_form(){
    password_form.classList.add('hidden');
    subscribe_form.classList.remove('hidden');
    subscribe_btn.classList.add('hidden');
    password_btn.classList.remove('hidden');
}

console.log(window.location.hash)

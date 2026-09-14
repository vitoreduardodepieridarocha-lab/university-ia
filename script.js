function openWorld(){document.getElementById('world').classList.remove('hidden');document.body.style.overflow='hidden'}
function closeWorld(){document.getElementById('world').classList.add('hidden');document.body.style.overflow='auto'}
function openChat(){document.getElementById('chat').classList.remove('hidden')}
function closeChat(){document.getElementById('chat').classList.add('hidden')}
function sendMessage(e){
  e.preventDefault();
  const input=document.getElementById('input');
  const text=input.value.trim();
  if(!text)return;
  const box=document.getElementById('messages');
  box.innerHTML+=`<div class="msg user">${escapeHtml(text)}</div>`;
  input.value='';
  setTimeout(()=>{
    box.innerHTML+=`<div class="msg ai">🤖 Ainda estou em modo demonstração. Para conversar com uma IA de verdade, precisamos conectar uma API de IA ao site.</div>`;
    box.scrollTop=box.scrollHeight;
  },500);
  box.scrollTop=box.scrollHeight;
}
function escapeHtml(t){return t.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
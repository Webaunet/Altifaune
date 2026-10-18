(function(){
var q=function(s,r){return (r||document).querySelector(s)},qa=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var nav=q("#nav"),bg=q("#burger"),dds=qa(".dd>button");
function closeAll(){dds.forEach(function(b){b.setAttribute("aria-expanded","false");q("#"+b.getAttribute("aria-controls")).hidden=true})}
dds.forEach(function(b){b.addEventListener("click",function(e){e.stopPropagation();var o=b.getAttribute("aria-expanded")==="true";closeAll();if(!o){b.setAttribute("aria-expanded","true");q("#"+b.getAttribute("aria-controls")).hidden=false}})});
document.addEventListener("click",closeAll);
if(bg)bg.addEventListener("click",function(e){e.stopPropagation();var o=nav.classList.toggle("open");bg.setAttribute("aria-expanded",o);bg.textContent=o?"✕":"☰"});
qa("#nav a").forEach(function(a){a.addEventListener("click",function(){nav.classList.remove("open");if(bg){bg.textContent="☰";bg.setAttribute("aria-expanded","false")}})});
/* filtres */
qa(".chip").forEach(function(c){c.addEventListener("click",function(){qa(".chip").forEach(function(x){x.setAttribute("aria-pressed",x===c)});qa("#refs .card").forEach(function(k){k.hidden=!(c.dataset.f==="all"||k.dataset.k===c.dataset.f)})})});
/* visionneuse */
var lb=q("#lb"),ph=qa(".ph"),cur=0,opener=null;
function show(i){cur=(i+ph.length)%ph.length;var im=q("img",ph[cur]);q("#lbi").src=im.src;q("#lbi").alt=im.alt;q("#lbc").textContent=q("span",ph[cur]).textContent+" ("+(cur+1)+"/"+ph.length+")"}
function openLb(i){opener=ph[i];show(i);lb.hidden=false;q("#lbx").focus()}
function closeLb(){lb.hidden=true;if(opener)opener.focus()}
ph.forEach(function(b,i){b.addEventListener("click",function(){openLb(i)})});
if(lb){q("#lbx").addEventListener("click",closeLb);q("#lbp").addEventListener("click",function(){show(cur-1)});q("#lbn").addEventListener("click",function(){show(cur+1)});
lb.addEventListener("click",function(e){if(e.target===lb)closeLb()});
document.addEventListener("keydown",function(e){if(lb.hidden)return;if(e.key==="Escape")closeLb();if(e.key==="ArrowLeft")show(cur-1);if(e.key==="ArrowRight")show(cur+1)})}
/* formulaire (démonstration, aucun envoi) */
var f=q("#f");
if(f){
 try{if(new URLSearchParams(location.search).get("demande")==="recrutement")q("#type").value="Recrutement"}catch(e){}
 var bad=function(id,m){q("#"+id).setAttribute("aria-invalid","true");q("#e-"+id).textContent=m},good=function(id){q("#"+id).removeAttribute("aria-invalid");q("#e-"+id).textContent=""},v=function(id){return q("#"+id).value.trim()};
 f.addEventListener("submit",function(e){e.preventDefault();var ok=true;
  if(!v("nom")){bad("nom","Indiquez votre nom.");ok=false}else good("nom");
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v("mail"))){bad("mail","Saisissez une adresse e-mail valide.");ok=false}else good("mail");
  if(!v("type")){bad("type","Choisissez la nature de la demande.");ok=false}else good("type");
  if(v("msg").length<10){bad("msg","Décrivez votre projet en quelques mots.");ok=false}else good("msg");
  var o=q("#ok");
  if(!ok){o.hidden=true;var fi=q('[aria-invalid="true"]',f);if(fi)fi.focus();return}
  o.hidden=false;o.textContent="Démonstration : le formulaire est valide, mais aucun message n'a été envoyé."})}
/* retour en haut */
var up=q("#up");window.addEventListener("scroll",function(){up.classList.toggle("on",window.scrollY>600)},{passive:true});
up.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});
})();
"use strict";
(() => {
  const slides = [
    {image:"hud.png",category:"HUD / VISÃO GERAL",title:"Tudo no seu campo de visão.",description:"O minimapa e o checklist ficam à esquerda. Na base da tela, acompanhe crescimento, HP, vigor, comida e sede sem perder de vista o que acontece ao redor.",points:["Minimapa com pontos marcados","Checklist Prime no Primord","Atributos do dino em uma faixa compacta"],note:"O HUD acompanha o dino ativo no Primord.",alt:"HUD com minimapa, checklist Prime e atributos do dinossauro"},
    {image:"mapa.png",category:"MAPA / F9",title:"Veja além do minimapa.",description:"Amplie o mapa para reconhecer a região e escolher seus destinos. As marcações azuis numeradas ajudam a guardar os locais que importam na sua rota.",points:["F9 alterna o tamanho do mapa","Botão direito cria ou apaga uma marca","Esc retorna à visão pequena"],note:"Suas marcações ficam salvas para continuar a jornada no Primord.",alt:"Mapa ampliado com três marcações azuis numeradas"},
    {image:"inicio.png",category:"MENU / INÍCIO",title:"Sua próxima vida começa aqui.",description:"A tela inicial dá acesso aos dinos e builds, ao catálogo de mutações e à continuação do dino selecionado. Uma entrada simples para planejar antes de voltar à jornada.",points:["Dinos e builds em um clique","Acesso direto às mutações","Atalho para continuar sua seleção"],note:"F3 abre o menu completo. Esc fecha o guia.",alt:"Tela inicial do painel com acesso a dinos, builds e mutações"},
    {image:"dinos.png",category:"MENU / DINOS",title:"Encontre o seu próximo dino.",description:"Explore o catálogo com imagens das espécies. Use a busca por nome ou os filtros de dieta para chegar ao dino que você quer consultar.",points:["Filtros: carnívoros, herbívoros e onívoros","Busca por nome","Seleção visual de espécies"],note:"Selecionar um dino no guia serve para consultar builds; não troca o dino no jogo.",alt:"Menu de dinos com busca, filtros de dieta e catálogo de espécies"},
    {image:"builds.png",category:"GUIA / BUILDS",title:"Uma build para o seu estilo.",description:"Escolha o dino, o estilo e a vida para consultar a composição sugerida. Veja os efeitos das mutações e compare os valores Base, Entomb 1 e Entomb 2.",points:["Sobrevivência, PvP e PvP + Sobrevivência","Progressão da primeira à quarta vida","Efeitos e bônus de cada mutação"],note:"O slot 4 depende de Prime. As escolhas no guia são para planejamento.",alt:"Build de Omniraptor com estilos, vidas e quatro mutações"},
    {image:"mutacoes.png",category:"CATÁLOGO / MUTAÇÕES",title:"Entenda o que cada escolha faz.",description:"Consulte o catálogo de mutações com busca e filtros. Cada detalhe mostra o efeito, as etapas de bônus e a disponibilidade para ajudar a montar seu plano.",points:["Busca e filtros de mutações","Valores Base, Entomb 1 e Entomb 2","Descrição de efeitos e desbloqueios"],note:"A tela enviada mostra o catálogo com 41 mutações.",alt:"Catálogo de mutações com detalhes de Accelerated Prey Drive e bônus por etapa"},
    {image:"build-compacta.png",category:"CONSULTA RÁPIDA / F4",title:"Sua build, sem abrir tudo.",description:"F4 mostra um resumo compacto do dino, estilo e vida selecionados no guia. Consulte os efeitos e os bônus base e volte para o jogo com uma leitura rápida.",points:["Resumo do dino escolhido no painel","Estilo e vida selecionados","Acesso ao painel completo com F3"],note:"O resumo usa sua seleção no guia; não detecta automaticamente a espécie do jogo.",alt:"Painel compacto F4 com a build PvP de Omniraptor"},
    {image:"referencia-builds.png",category:"REFERÊNCIA / CONCEITO VISUAL",title:"Uma referência para o visual.",description:"Esta imagem foi fornecida como referência de organização para builds e mutações: hierarquia clara, etapas visíveis e detalhes fáceis de consultar.",points:["Organização por etapas","Destaque para efeitos e bônus","Separação visual de informações"],note:"Imagem conceitual de referência. Não representa a interface atual nem uma funcionalidade adicional disponível no aplicativo.",alt:"Referência visual conceitual de uma interface de builds com tema azul e Pteranodon"}
  ];
  const $ = id => document.getElementById(id);
  const choices = [...document.querySelectorAll("[data-slide]")];
  const image = $("screen-image"), play = $("play-slides"), progress = $("slide-progress");
  let current = 0, timer = null, playing = false;
  const stopTimer = () => { clearTimeout(timer); timer = null; progress.classList.remove("is-running"); };
  function schedule() {
    stopTimer();
    if (!playing || document.hidden || $("image-dialog").open) return;
    // A fresh animation starts with each slide, including after returning to the tab.
    void progress.offsetWidth;
    progress.classList.add("is-running");
    timer = setTimeout(() => selectSlide(current + 1, false), 7000);
  }
  function setPlaying(value) {
    playing = value;
    play.setAttribute("aria-pressed", String(value));
    play.innerHTML = value ? '<span aria-hidden="true">Ⅱ</span> Pausar' : '<span aria-hidden="true">▶</span> Apresentar';
    schedule();
  }
  function selectSlide(index, manual = true) {
    current = (index + slides.length) % slides.length;
    const slide = slides[current];
    image.src = `assets/${slide.image}`;
    image.alt = slide.alt;
    $("slide-category").textContent = slide.category;
    $("slide-title").textContent = slide.title;
    $("slide-description").textContent = slide.description;
    $("slide-note").textContent = slide.note;
    $("slide-counter").textContent = `${String(current + 1).padStart(2,"0")} / ${String(slides.length).padStart(2,"0")}`;
    $("screen-preview").setAttribute("aria-label", `Ampliar imagem: ${slide.title}`);
    $("slide-points").replaceChildren(...slide.points.map(point => {const li = document.createElement("li");li.textContent = point;return li;}));
    choices.forEach((button, index) => {button.classList.toggle("is-selected", index === current);button.setAttribute("aria-pressed", String(index === current));});
    if (manual) $("slide-announcement").textContent = `Tela ${current + 1} de ${slides.length}: ${slide.title}`;
    schedule();
  }
  choices.forEach(button => button.addEventListener("click", () => {setPlaying(false);selectSlide(Number(button.dataset.slide));}));
  $("previous-slide").addEventListener("click", () => {setPlaying(false);selectSlide(current - 1);});
  $("next-slide").addEventListener("click", () => {setPlaying(false);selectSlide(current + 1);});
  play.addEventListener("click", () => setPlaying(!playing));
  document.addEventListener("visibilitychange", schedule);
  // Stop the presentation when the visitor leaves the gallery section.
  if ("IntersectionObserver" in window) {
    const galleryObserver = new IntersectionObserver(entries => {if (!entries[0].isIntersecting) setPlaying(false);}, {threshold:0});
    galleryObserver.observe($("telas"));
  }

  const dialog = $("image-dialog");
  function openImage(src, caption, alt) {
    $("dialog-image").src = src;
    $("dialog-image").alt = alt || caption;
    $("dialog-caption").textContent = caption;
    dialog.showModal();
    document.body.classList.add("dialog-open");
    stopTimer();
  }
  $("screen-preview").addEventListener("click", () => openImage(image.getAttribute("src"), slides[current].title, slides[current].alt));
  document.querySelectorAll("[data-image]").forEach(button => button.addEventListener("click", () => openImage(button.dataset.image, button.dataset.caption)));
  $("close-dialog").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {if(event.target === dialog) {const rect = dialog.getBoundingClientRect();if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();}});
  dialog.addEventListener("close", () => {document.body.classList.remove("dialog-open");schedule();});
  $("copy-discord").addEventListener("click", async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText("luccosta");
      else {
        const field = document.createElement("textarea");
        field.value = "luccosta";
        field.setAttribute("aria-label", "Nome de usuário do Discord");
        field.style.cssText = "position:fixed;left:-9999px;top:0";
        document.body.append(field);
        let copied;
        try {field.select();copied = document.execCommand("copy");} finally {field.remove();$("copy-discord").focus({preventScroll:true});}
        if (!copied) throw new Error("Clipboard unavailable");
      }
      $("copy-status").textContent = "Usuário copiado! No Discord, adicione luccosta para conversar.";
    } catch {$("copy-status").textContent = "Adicione no Discord: luccosta. Selecione o nome acima para copiar manualmente.";}
  });
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!reducedMotion.matches && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}}), {threshold:.08});
    document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
    document.body.classList.add("motion-ready");
  }
  reducedMotion.addEventListener("change", event => {if(event.matches){setPlaying(false);document.body.classList.remove("motion-ready");}});
})();

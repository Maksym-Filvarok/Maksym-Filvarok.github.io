(() => {
  'use strict';

const posts = [
    {
      id: 'bali-hidden-beaches',
      title: 'Топ-10 прихованих пляжів Балі, які варто відвідати',
      date: '2025-06-15',
      author: 'Sarah Johnson',
      comments: 12,
      category: 'Путівники',
      tags: ['Пляжі','Азія','Бюджет'],
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1350&q=80',
      excerpt: "Балі славиться своїми захопливими пляжами, але за межами популярних місць ховаються недізнані перлини.",
      content: `<h2>Приховані пляжі Балі — вступ</h2>
      <p>Берегова лінія Балі наповнена таємничими бухтами та тихими мисами, куди рідко досягають натовпи туристів. Ці місця пропонують справжній рай для тих, хто шукає усамітнення та незабутні враження.</p>
      <h3>1. Ньянг Ньянг</h3>
      <p>Довга піша прогулянка, відокремлений пісок — чудово для фото із заходом сонця. Бери із собою воду та міцне взуття. Цей пляж простягається на два кілометри і вважається одним з найбільш незайманих на всьому острові.</p>
      <h3>2. Грін Боул</h3>
      <p>Сходи вниз по скелі; чудово підходить для снорклінгу, коли море спокійне. Пляж отримав свою назву через неймовірний зелений відблиск, який можна побачити на скелях під певним кутом сонячного світла.</p>
      <h3>3. Пляж Бінгін</h3>
      <p>Ідеальне місце для серфінгу для початківців. Навколо розташовано безліч невеликих warung (місцевих кафе), де можна скуштувати свіжу кокосову воду та традиційні індонезійські страви.</p>
      <h3>4. Паданг-Паданг</h3>
      <p>Знаменитий своїми унікальними скельними формаціями та бірюзовою водою. Це місце особливо популярне серед фотографів та мешканців, які шукать спокійне місце для відпочинку.</p>`
    },
    {
      id: 'japan-cherry-blossom',
      title: "Повний путівник по сезону сакури в Японії",
      date: '2025-05-28',
      author: 'Michael Chen',
      comments: 8,
      category: "Путівники",
      tags: ['Азія','Культура','Фотографія'],
      image: 'https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=1350&q=80',
      excerpt: "Відчуйте магію Японії під час сезону цвітіння сакури. Наш детальний путівник охоплює найкращі місця для споглядання.",
      content: `<p>Цвітіння сакури (ханами) - це не просто природне явище, а справжнє культурне свято в Японії. Токіо (кінець березня - початок квітня), Кіото (початок квітня), Хоккайдо (кінець квітня - травень). Найкращі поради з фотографії та етикету поведінки під час ханами.</p>
      <h3>Найкращі місця для споглядання</h3>
      <p>Парк Уено в Токіо пропонує понад 1000 дерев сакури, створюючи неймовірний казковий коридор. У Кіото не пропустіть Філософську стежку, де квітучі гілки створюють природний дах над каналом.</p>
      <h3>Традиції ханами</h3>
      <p>Місцеві жителі влаштовують пікніки під квітучими деревами, часто з раннього ранку, щоб зайняти найкращі місця. Не забудьте спробувати сезонні ласощі - sakura mochi та інші цукерки, присвячені цвітінню.</p>`
    },
    {
      id: 'packing-adventure',
      title: 'Основні поради щодо упаковки для вашої наступної пригодницької подорожі',
      date: '2025-05-12',
      author: 'Emma Rodriguez',
      comments: 15,
      category: 'Поради мандрівникам',
      tags: ['Пригоди','Походи','Бюджет'],
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1350&q=80',
      excerpt: "Пакуючи речі для пригодницької подорожі, потрібно ретельно планувати. Дізнайтеся, як упакувати легкий багаж, маючи всі необхідні речі.",
      content: `<p>Розумне пакування - це навичка. Почніть з контрольного списку спорядження. Зосередьтеся на шаруванні, легких технічних тканинах та багатофункціональних предметах.</p>
      <h3>Обов'язкові предмети</h3>
      <p>Якісний рюкзак, зручне взуття для походів, аптечка, багаторазова плятка для води, powerbank, джерело вогню та навігаційні пристрої - основа будь-якої пригодницької подорожі.</p>
      <h3>Система шарування одягу</h3>
      <p>Базовий шар (відводить вологу), середній шар (зберігає тепло) та зовнішній шар (захищає від вітру та дощу) - ключ до комфорту в будь-яких погодних умовах.</p>`
    },
    {
      id: 'italian-cuisine',
      title: "Гурманський путівник по автентичній італійській кухні",
      date: '2025-04-30',
      author: 'Alessandro Marino',
      comments: 22,
      category: 'Їжа та культура',
      tags: ['Їжа','Європа','Розкіш'],
      image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1350&q=80',
      excerpt: "Відкрийте для себе регіональні спеціальності Італії за межами піци та пасти.",
      content: `<p>Від трюфелів у П'ємонті до морепродуктів на Сицилії — регіональні спеціальності та як замовити їжу, як місцеві.</p>
      <h3>Північна Італія</h3>
      <p>Різотто з шафраном у Мілані, прошутто ді Парма в Емілії-Романьї, полента в Венето. Кухня цього регіону відрізняється використанням вершкового масла та сирів.</p>
      <h3>Центральна Італія</h3>
      <p>Справжній карбонара в Римі, бістекка алла фіорентіна у Флоренції, оливкова олія з Тоскани. Тут народилася культура пасти та соусів.</p>
      <h3>Південна Італія</h3>
      <p>Моцарела з буйволиного молока в Кампанії, морепродукти на Сицилії, гострі ковбаски в Калабрії. Кухня Півдня сонячна, гостра та насичена смаками.</p>`
    },
    {
      id: 'sustainable-travel-practices',
      title: 'Сталий туризм: малі зміни, великий вплив',
      date: '2025-03-22',
      author: 'Lina Petro',
      comments: 5,
      category: 'Поради мандрівникам',
      tags: ['Сталий розвиток','Бюджет','Культура'],
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1350&q=80',
      excerpt: "Прості, практичні способи зменшити свій слід під час подорожей, не втрачаючи радощів дослідження.",
      content: `<p>Беріть із собою багаторазову пляшку для води, обирайте екологічно чисті помешкання, підтримуйте місцеві підприємства.</p>
      <h3>Транспортні рішення</h3>
      <p>Віддавайте перевагу громадському транспорту, велосипедам або пішим прогулянкам замість таксі та орендованих авто. При довших переїздах обирайте поїзди замість внутрішніх авіарейсів.</p>
      <h3>Відповідальне споживання</h3>
      <p>Уникайте одноразового посуду, купуйте продукти на місцевих ринках, відмовтеся від сувенірів з тварин або рослин, що перебувають під загрозою зникнення.</p>
      <h3>Повага до культури</h3>
      <p>Вивчайте місцеві звичаї та традиції перед відвідуванням, одягайтеся відповідно, завжди просіть дозволу перед тим, як робити фото місцевих жителів.</p>`
    },
    {
      id: 'iceland-road-trip',
      title: 'Кільцева дорога Ісландії: 7-денний маршрут',
      date: '2025-02-11',
      author: 'Jonas Miller',
      comments: 7,
      category: 'Путівники',
      tags: ['Автоподорож','Пригоди','Європа'],
      image: 'https://images.unsplash.com/photo-1610123598147-f632aa18b275?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      excerpt: "Оптимізований 7-денний маршрут із обов'язковими для відвідування водоспадами, геотермальними джерелами та краєвидами льодовиків.",
      content: `<p>День 1: Рейк'явік та Блакитна лагуна. День 2: Золотий круг. День 3-7: Південне узбережжя та східні фіорди.</p>
      <h3>День 1-2: Західна частина</h3>
      <p>Рейк'явік - столиця з яскравою мистецькою сценою, Блакитна лагуна - геотермальний спа-комплекс, Гейсір та Гульфосс - знакові пам'ятки Золотого кола.</p>
      <h3>День 3-4: Південне узбережжя</h3>
      <p>Водоспади Скоугафосс та Сельяландсфосс, чорні пляжі Вік, льодовикова лагуна Йокульсарлон з плаваючими айсбергами.</p>
      <h3>День 5-7: Східні фіорди та північ</h3>
      <p>Маленькі рибальські селища східних фіордів, озеро Міватн з унікальними вулканічними формаціями, водоспади півночі та спостереження за китами в Гюсавіку.</p>`
    },
    {
      id: 'city-food-walks',
      title: 'Найкращі гастрономічні тури містами світу',
      date: '2024-12-05',
      author: 'Nadia Silva',
      comments: 3,
      category: 'Їжа та культура',
      tags: ['Їжа','Культура','Піші прогулянки'],
      image: 'https://images.unsplash.com/photo-1730386772603-56d735db3584?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      excerpt: "Від кіосків з вуличною їжею в Мехіко до мезе-барів в Афінах — курований список екскурсій із їжею з гідом та без.",
      content: `<p>Топ-рекомендації, орієнтовні ціни та поради щодо безпечного смакування вуличної їжі.</p>
      <h3>Мехіко, Мексика</h3>
      <p>Маршрут по району Рома: тако аль пастор, настоящий чуррос, агуа-фреска. Рекомендується рання вечеря, щоб уникнути черг.</p>
      <h3>Афіни, Греція</h3>
      <p>Псірі та Монастиракі: сouvlaki, spanakopita, фета з грушею, дегустація оливкової олії. Місцеві гіди розкажуть історію кожної страви.</p>
      <h3>Сінгапур</h3>
      <p>Хаверсцентри: чилі-краб, Hainanese chicken rice, laksa. Система хотор-центрів гарантує високу якість та гігієну.</p>
      <h3>Стамбул, Туреччина</h3>
      <p>Базар Єгіп Капали: кебаби, баклава, турецькі солодощі, мезе. Обов'язково спробуйте традиційний турецький чай у місцевих чайних.</p>`
    },
    {
      id: 'luxury-train-journeys',
      title: 'Розкішні залізничні подорожі, на які варто витратитися',
      date: '2025-01-15',
      author: 'Marcelo Ruiz',
      comments: 9,
      category: 'Розкішні подорожі',
      tags: ['Розкіш','Європа','Азія'],
      image: 'https://images.unsplash.com/photo-1595879171813-a83beb517451?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      excerpt: "Від Венеційського Сімплон-Орієнт-Експреса до японських Семи Зірок — що очікувати та поради з планування.",
      content: `<p>Основні моменти включають гурманські вечері, класи купе та те, як скласти бюджет для незабутньої подорожі.</p>
      <h3>Venice Simplon-Orient-Express</h3>
      <p>Легендарний маршрут Лондон-Венеція з ресторанами, що відзначаються зірками Мішлен, та історичними вагонами 1920-х років. Дрескод - вечірній одяг обов'язковий.</p>
      <h3>Японський Сьом Зірок (Seven Stars)</h3>
      <p>Роскошний круїз по Кюсю з традиційними японськими інтер'єрами, кайсекі-вечерями та екскурсіями в ексклюзивні місця.</p>
      <h3>Royal Scotsman, Шотландія</h3>
      <p>Подорож через Шотландське нагір'я з дегустаціями віскі, екскурсіями до замків та спостереженням за дикою природою. Вагон-салон з каміном створює особливу атмосферу.</p>
      <h3>The Maharajas Express, Індія</h3>
      <p>Маршрути до Тадж-Махалу, Раджастану та Гімалаїв з обслуговуванням персональним дворецьким, ресторанами та екскурсіями до пам'яток всесвітньої спадщини ЮНЕСКО.</p>`
    }
  ];

  const POSTS_PER_PAGE = 4;

  const postsContainer = document.getElementById('postsContainer');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const categoriesList = document.getElementById('categoriesList');
  const tagsList = document.getElementById('tagsList');
  const recentPosts = document.getElementById('recentPosts');
  const paginationContainer = document.getElementById('paginationContainer');
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterStatus = document.getElementById('newsletterStatus');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const blogContainerRoot = document.querySelector('.blog-container');

  let state = {
    query: '',
    category: null,
    tag: null,
    page: 1,
    filtered: posts.slice()
  };

  function debounce(fn, ms = 300) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function uniqueValues(arr, keyFn) {
    const set = new Set();
    arr.forEach(item => keyFn(item).forEach(v => set.add(v)));
    return Array.from(set);
  }

  function highlight(text, query) {
    if(!query) return text;
    const q = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    return text.replace(new RegExp(`(${q})`, 'ig'), '<span class="highlight">$1</span>');
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"'`=\/]/g, function (s) {
      return ({
        '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;'
      })[s];
    });
  }

  function renderPosts() {
    const start = (state.page - 1) * POSTS_PER_PAGE;
    const paged = state.filtered.slice(start, start + POSTS_PER_PAGE);

    if (paged.length === 1) {
      blogContainerRoot && blogContainerRoot.classList.add('single-post');
    } else {
      blogContainerRoot && blogContainerRoot.classList.remove('single-post');
    }

    postsContainer.innerHTML = paged.map(post => {
      const excerpt = highlight(escapeHtml(post.excerpt), state.query);
      return `
        <article id="post-${post.id}" class="blog-card post-anchor" tabindex="0" aria-labelledby="title-${post.id}">
          <div class="blog-image">
            <img loading="lazy" src="${post.image}" alt="${escapeHtml(post.title)}">
          </div>
          <div class="blog-content">
            <div class="blog-meta">
              <span><i class="far fa-calendar"></i> ${formatDate(post.date)}</span>
              <span><i class="far fa-user"></i> By ${escapeHtml(post.author)}</span>
              <span><i class="far fa-comment"></i> ${post.comments} Коментарів</span>
            </div>
            <h2 id="title-${post.id}">${highlight(escapeHtml(post.title), state.query)}</h2>
            <p>${excerpt}</p>
            <div style="display:flex; gap:10px; align-items:center;">
              <a class="read-more" href="blog-detail.html?id=${encodeURIComponent(post.id)}" aria-label="Read full article ${escapeHtml(post.title)}">Читати більше <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    renderPagination();
  }

  function renderCategoriesAndTags() {
    const cats = Array.from(new Set(posts.map(p => p.category))).sort();
    categoriesList.innerHTML = cats.map(cat => {
      const count = posts.filter(p => p.category === cat).length;
      return `<li><a href="#" data-cat="${escapeHtml(cat)}">${escapeHtml(cat)} <span>${count}</span></a></li>`;
    }).join('');

    const tags = uniqueValues(posts, p => p.tags).sort();
    tagsList.innerHTML = tags.map(tag => `<a href="#" class="tag-link" data-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</a>`).join('');
  }

  function renderRecentPosts() {
    const recents = posts.slice().sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0,5);
    recentPosts.innerHTML = recents.map(p => {
      return `<li><a href="blog-detail.html?id=${encodeURIComponent(p.id)}">${escapeHtml(p.title)}</a></li>`;
    }).join('');
  }

  function renderPagination() {
    const total = state.filtered.length;
    const pages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

    if (pages <= 1) {
      paginationContainer.innerHTML = '';
      return;
    }

    let html = '';

    for (let i = 1; i <= pages; i++) {
      const active = i === state.page ? 'active' : '';
      html += `<a href="#" data-page="${i}" class="${active}">${i}</a>`;
    }

    const nextPage = Math.min(pages, state.page + 1);
    html += `<a href="#" data-page="${nextPage}" class="next-page"><i class="fas fa-chevron-right"></i></a>`;

    paginationContainer.innerHTML = html;
  }

  function applyFilters() {
    const q = state.query.trim().toLowerCase();
    state.filtered = posts.filter(p => {
      const inCategory = state.category ? p.category === state.category : true;
      const inTag = state.tag ? p.tags.includes(state.tag) : true;
      const inQuery = !q ? true :
        (p.title + ' ' + p.excerpt + ' ' + (p.content || '') + ' ' + p.tags.join(' ')).toLowerCase().includes(q);
      return inCategory && inTag && inQuery;
    });
    state.page = 1;
    renderPosts();
  }

  const onSearch = debounce(() => {
    state.query = searchInput.value || '';
    applyFilters();
  }, 300);

  function attachEvents() {
    searchInput.addEventListener('input', onSearch);
    searchBtn.addEventListener('click', () => { state.query = searchInput.value || ''; applyFilters(); });

    categoriesList.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if(!a) return;
      e.preventDefault();
      const cat = a.dataset.cat;
      if(state.category === cat) state.category = null; else state.category = cat;
      applyFilters();
    });

    tagsList.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if(!a) return;
      e.preventDefault();
      const tag = a.dataset.tag;
      if(state.tag === tag) state.tag = null; else state.tag = tag;
      applyFilters();
    });

    paginationContainer.addEventListener('click', (e) => {
      const a = e.target.closest('a[data-page]');
      if(!a) return;
      e.preventDefault();
      const p = parseInt(a.dataset.page, 10) || 1;
      state.page = p;
      renderPosts();
      window.scrollTo({top: 200, behavior: 'smooth'});
    });

    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('nl-name').value.trim();
      const email = document.getElementById('nl-email').value.trim();
      if(!name || !email) {
        newsletterStatus.textContent = 'Please provide both name and email.';
        newsletterStatus.classList.remove('sr-only');
        return;
      }
      localStorage.setItem('newsletter', JSON.stringify({name,email,ts: Date.now()}));
      newsletterStatus.textContent = `Thank you ${name}! You've subscribed.`;
      newsletterStatus.classList.remove('sr-only');
      newsletterForm.reset();
    });

    scrollTopBtn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
    window.addEventListener('scroll', () => {
      if(window.scrollY > 300) scrollTopBtn.classList.remove('hidden'); else scrollTopBtn.classList.add('hidden');
    });
  }

  function init() {
    renderCategoriesAndTags();
    renderRecentPosts();
    applyFilters();
    attachEvents();

    setTimeout(() => {
      const hash = location.hash;
      if(hash && hash.startsWith('#post-')) {
        const el = document.querySelector(hash);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }, 300);
  }

  window.TravellianBlog = {
    getPostById: id => posts.find(p => p.id === id),
    init: init,
    posts
  };

  document.addEventListener('DOMContentLoaded', init);  

            const params = new URLSearchParams(location.search);
           const id = params.get('id');
           function populate(){
             const post = window.TravellianBlog && window.TravellianBlog.getPostById(id);
             if(!post){
               document.getElementById('articleTitle').textContent = 'Article not found';
               document.getElementById('articleContent').innerHTML = '<p>No article specified.</p>';
               return;
             }
             document.title = post.title + ' — Travellian';
             document.getElementById('articleTitle').textContent = post.title;
             document.getElementById('articleMeta').innerHTML = `<span><i class="far fa-calendar"></i> ${new Date(post.date).toLocaleDateString('uk-UA')}</span> <span style="margin-left:12px"><i class="far fa-user"></i> ${post.author}</span> <span style="margin-left:12px"><i class="far fa-comment"></i> ${post.comments} Коментарів</span>`;
             document.getElementById('articleTags').innerHTML = post.tags.map(t => `<a href="blog.html" class="tag-link">${t}</a>`).join(' ');
             if(post.image) document.getElementById('articleImage').innerHTML = `<img src="${post.image}" alt="${post.title}" style="width:100%;max-height:450px;object-fit:cover;border-radius:8px;">`;
             document.getElementById('articleContent').innerHTML = post.content;
           }
         
           if(!id){
             document.getElementById('articleTitle').textContent = 'Article not found';
             document.getElementById('articleContent').innerHTML = '<p>No article specified.</p>';
             return;
           }
         
           if(window.TravellianBlog) populate();
           else {
             const t = setInterval(()=> {
               if(window.TravellianBlog){ clearInterval(t); populate(); }
             }, 50);
           }

           const backBtn = document.getElementById('backBtn');
           backBtn.addEventListener('click', function(e){
             if(document.referrer && document.referrer.includes(location.origin) ){
               e.preventDefault();
               history.back();
               setTimeout(() => {
                 if(location.pathname.includes('/blog-detail.html')) window.location = 'blog.html';
               }, 300);
             }
           });

})();

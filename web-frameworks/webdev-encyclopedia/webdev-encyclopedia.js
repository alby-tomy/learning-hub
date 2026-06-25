  // ── EXAMPLE IFRAMES ──
  (function() {

    // ─── EXAMPLE 1: Pure HTML ───
    var el1 = document.getElementById('iframe-html');
    if (el1) el1.srcdoc = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>About Alex</title></head>
<body style="font-family:Georgia,serif;padding:20px 28px;max-width:600px;margin:0 auto;line-height:1.75;color:#1a1a1a;">
  <h1 style="font-size:28px;margin-bottom:8px;border-bottom:2px solid #eee;padding-bottom:10px;">Hello, I'm Alex! 👋</h1>
  <p>Welcome to my first webpage. I'm a web development student learning HTML from the ground up.</p>

  <h2 style="font-size:20px;margin:24px 0 8px;">About Me</h2>
  <p>I live in <strong>San Francisco</strong> and love <em>building things</em> for the web. Currently learning frontend development.</p>

  <h2 style="font-size:20px;margin:24px 0 8px;">My Hobbies</h2>
  <ul style="padding-left:20px;">
    <li>🎸 Playing guitar</li>
    <li>📚 Reading sci-fi books</li>
    <li>🚴 Cycling on weekends</li>
    <li>☕ Making specialty coffee</li>
  </ul>

  <h2 style="font-size:20px;margin:24px 0 8px;">Favourite Quote</h2>
  <blockquote style="border-left:4px solid #ccc;margin:12px 0;padding:8px 16px;color:#555;font-style:italic;">
    "The best way to learn is to build things." — Every developer, ever
  </blockquote>

  <h2 style="font-size:20px;margin:24px 0 8px;">Get in Touch</h2>
  <p>📧 <a href="mailto:alex@example.com" style="color:#0066cc;">alex@example.com</a></p>
  <p>🐙 <a href="#" style="color:#0066cc;">github.com/alex</a></p>
  <hr style="margin:24px 0;border:none;border-top:1px solid #eee;">
  <p><small style="color:#999;">Built with 100% pure HTML — zero CSS or JavaScript!</small></p>
</body>
</html>`;

    // ─── EXAMPLE 2: HTML + CSS ───
    var el2 = document.getElementById('iframe-css');
    if (el2) el2.srcdoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Profile Card</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 20px;
    }
    .card {
      background: white;
      border-radius: 20px;
      padding: 32px;
      max-width: 340px;
      width: 100%;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .avatar {
      width: 80px; height: 80px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 36px;
      margin: 0 auto 16px;
    }
    h1 { font-size: 22px; color: #1a1a2e; margin-bottom: 4px; }
    .role { color: #667eea; font-weight: 600; font-size: 14px; margin-bottom: 16px; }
    .bio { color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 20px; }
    .tags { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-bottom: 24px; }
    .tag {
      background: #f0edff; color: #667eea;
      padding: 4px 12px; border-radius: 20px;
      font-size: 12px; font-weight: 600;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white; text-decoration: none;
      padding: 12px 28px; border-radius: 30px;
      font-weight: 700; font-size: 14px;
      box-shadow: 0 4px 15px rgba(102,126,234,.4);
      transition: transform .15s, box-shadow .15s;
    }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(102,126,234,.5); }
  </style>
</head>
<body>
  <div class="card">
    <div class="avatar">👩‍💻</div>
    <h1>Alex Chen</h1>
    <div class="role">Frontend Developer</div>
    <p class="bio">Building beautiful, accessible web experiences with modern HTML, CSS, and JavaScript.</p>
    <div class="tags">
      <span class="tag">HTML</span>
      <span class="tag">CSS</span>
      <span class="tag">JavaScript</span>
      <span class="tag">React</span>
    </div>
    <a href="#" class="btn">View Portfolio →</a>
  </div>
</body>
</html>`;

    // ─── EXAMPLE 3: HTML + CSS + JS (Todo App) ───
    var el3 = document.getElementById('iframe-js');
    if (el3) el3.srcdoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Todo App</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #f0f2f5; min-height: 100vh; padding: 24px 16px;
    }
    .app {
      background: white; border-radius: 16px; padding: 24px;
      max-width: 400px; margin: 0 auto;
      box-shadow: 0 4px 20px rgba(0,0,0,.08);
    }
    h1 { font-size: 20px; color: #1a1a2e; margin-bottom: 2px; }
    .subtitle { color: #888; font-size: 13px; margin-bottom: 20px; }
    .input-row { display: flex; gap: 8px; margin-bottom: 16px; }
    input {
      flex: 1; padding: 10px 14px;
      border: 2px solid #e5e7eb; border-radius: 8px;
      font-size: 14px; outline: none; transition: border-color .2s;
      font-family: inherit;
    }
    input:focus { border-color: #667eea; }
    .add-btn {
      padding: 10px 18px; background: #667eea; color: white;
      border: none; border-radius: 8px;
      font-weight: 700; font-size: 14px; cursor: pointer;
      font-family: inherit;
    }
    .add-btn:hover { background: #5a6fd6; }
    .list { display: flex; flex-direction: column; gap: 8px; }
    .item {
      display: flex; align-items: center; gap: 12px;
      padding: 11px 12px; background: #f9fafb;
      border-radius: 8px; border: 1px solid #e5e7eb;
      transition: background .15s;
    }
    .item.done { background: #f0fdf4; border-color: #bbf7d0; }
    .item.done .text { text-decoration: line-through; color: #aaa; }
    .check {
      width: 20px; height: 20px;
      border: 2px solid #d1d5db; border-radius: 50%;
      flex-shrink: 0; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: 700; transition: all .2s;
    }
    .item.done .check { background: #22c55e; border-color: #22c55e; color: white; }
    .text { flex: 1; font-size: 14px; color: #374151; }
    .del {
      background: none; color: #ddd; border: none;
      font-size: 16px; cursor: pointer; padding: 0; line-height: 1;
    }
    .del:hover { color: #ef4444; }
    .footer { display: flex; justify-content: space-between; align-items: center; margin-top: 16px; }
    .count { font-size: 12px; color: #888; }
    .clear-btn {
      font-size: 12px; color: #aaa; background: none; border: none;
      cursor: pointer; text-decoration: underline; font-family: inherit;
    }
    .clear-btn:hover { color: #ef4444; }
    .empty { text-align: center; color: #ccc; font-size: 13px; padding: 20px 0; }
  </style>
</head>
<body>
  <div class="app">
    <h1>📋 My Tasks</h1>
    <p class="subtitle">Stay on top of your day</p>
    <div class="input-row">
      <input type="text" id="new-task" placeholder="Add a task and press Enter..." />
      <button class="add-btn" onclick="addTask()">Add</button>
    </div>
    <div class="list" id="task-list"></div>
    <div class="footer">
      <span class="count" id="count"></span>
      <button class="clear-btn" onclick="clearDone()">Clear done</button>
    </div>
  </div>
<script>
    var tasks = [
      { id: 1, text: 'Learn HTML structure', done: true },
      { id: 2, text: 'Style with CSS', done: true },
      { id: 3, text: 'Add interactivity with JS', done: false },
      { id: 4, text: 'Build something awesome!', done: false }
    ];
    var nextId = 5;
    function render() {
      var list = document.getElementById('task-list');
      if (!tasks.length) {
        list.innerHTML = '<div class="empty">No tasks yet — add one above!</div>';
      } else {
        list.innerHTML = tasks.map(function(t) {
          return '<div class="item ' + (t.done ? 'done' : '') + '">'
            + '<div class="check" onclick="toggle(' + t.id + ')">' + (t.done ? '✓' : '') + '</div>'
            + '<span class="text">' + t.text + '</span>'
            + '<button class="del" onclick="remove(' + t.id + ')">✕</button>'
            + '</div>';
        }).join('');
      }
      var r = tasks.filter(function(t) { return !t.done; }).length;
      document.getElementById('count').textContent = r + ' of ' + tasks.length + ' remaining';
    }
    function addTask() {
      var input = document.getElementById('new-task');
      var text = input.value.trim();
      if (!text) return;
      tasks.push({ id: nextId++, text: text, done: false });
      input.value = '';
      render();
    }
    function toggle(id) {
      tasks = tasks.map(function(t) {
        return t.id === id ? { id: t.id, text: t.text, done: !t.done } : t;
      });
      render();
    }
    function remove(id) {
      tasks = tasks.filter(function(t) { return t.id !== id; });
      render();
    }
    function clearDone() {
      tasks = tasks.filter(function(t) { return !t.done; });
      render();
    }
    document.getElementById('new-task').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') addTask();
    });
    render();
  <\/script>
</body>
</html>`;

    // ─── EXAMPLE 4: Full Design Landing Page ───
    var el4 = document.getElementById('iframe-design');
    if (el4) el4.srcdoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>Nexus — Build faster</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --primary:   hsl(240, 80%, 60%);
      --pri-light: hsl(240, 80%, 97%);
      --text:      hsl(240, 14%, 8%);
      --muted:     hsl(240, 8%, 46%);
      --bg:        #fff;
      --border:    hsl(240, 13%, 91%);
    }
    body { font-family: system-ui, -apple-system, sans-serif; color: var(--text); background: var(--bg); }

    /* NAV — sticky glassmorphism */
    nav {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 24px;
      border-bottom: 1px solid var(--border);
      background: rgba(255,255,255,.88);
      backdrop-filter: blur(12px);
      position: sticky; top: 0; z-index: 100;
    }
    .logo { font-weight: 800; font-size: 17px; color: var(--primary); letter-spacing: -0.02em; }
    .nav-links { display: flex; gap: 20px; list-style: none; }
    .nav-links a { text-decoration: none; color: var(--muted); font-size: 13px; font-weight: 500; transition: color .15s; }
    .nav-links a:hover { color: var(--text); }
    .nav-cta {
      background: var(--primary); color: white;
      padding: 8px 16px; border-radius: 8px;
      font-size: 13px; font-weight: 700; text-decoration: none;
    }

    /* HERO */
    .hero { padding: 72px 24px 48px; text-align: center; max-width: 640px; margin: 0 auto; }
    .badge {
      display: inline-flex; align-items: center; gap: 6px;
      background: var(--pri-light); color: var(--primary);
      padding: 5px 14px; border-radius: 20px;
      font-size: 11px; font-weight: 700;
      letter-spacing: .05em; text-transform: uppercase;
      margin-bottom: 24px; border: 1px solid hsl(240,80%,88%);
    }
    h1 {
      font-size: clamp(28px, 5vw, 46px);
      font-weight: 900; letter-spacing: -0.03em; line-height: 1.1;
      margin-bottom: 16px;
    }
    h1 span { color: var(--primary); }
    .lead { font-size: 15px; color: var(--muted); max-width: 460px; margin: 0 auto 28px; line-height: 1.7; }
    .hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
    .btn-primary {
      background: var(--primary); color: white;
      padding: 13px 26px; border-radius: 10px;
      font-size: 14px; font-weight: 700; text-decoration: none;
      box-shadow: 0 4px 16px hsl(240,80%,60%,.35);
    }
    .btn-outline {
      border: 1.5px solid var(--border); color: var(--text);
      padding: 12px 26px; border-radius: 10px;
      font-size: 14px; font-weight: 600; text-decoration: none;
      background: white;
    }

    /* SOCIAL PROOF */
    .stats {
      display: flex; justify-content: center; gap: 28px;
      padding: 18px 24px;
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      background: hsl(240,14%,99%);
    }
    .stat { text-align: center; }
    .stat-num { font-size: 20px; font-weight: 900; color: var(--primary); }
    .stat-label { font-size: 10px; color: var(--muted); margin-top: 2px; letter-spacing: .04em; }

    /* FEATURES */
    .features-section { padding: 44px 24px 52px; }
    .section-label {
      text-align: center; font-size: 10px; font-weight: 700;
      letter-spacing: .1em; text-transform: uppercase;
      color: var(--primary); margin-bottom: 8px;
    }
    h2 { text-align: center; font-size: 24px; font-weight: 800; margin-bottom: 6px; letter-spacing: -0.02em; }
    .section-sub { text-align: center; color: var(--muted); font-size: 13px; margin-bottom: 28px; }
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 14px; max-width: 840px; margin: 0 auto;
    }
    .feat {
      background: var(--pri-light);
      border: 1px solid hsl(240,80%,89%);
      border-radius: 14px; padding: 18px;
    }
    .feat-icon { font-size: 24px; margin-bottom: 8px; }
    .feat-title { font-weight: 700; font-size: 13px; margin-bottom: 4px; }
    .feat-desc { font-size: 12px; color: var(--muted); line-height: 1.5; }

    /* CTA BANNER */
    .cta-banner {
      background: linear-gradient(135deg, hsl(240,80%,56%), hsl(260,80%,62%));
      color: white; text-align: center;
      padding: 40px 24px; margin: 0 24px 32px;
      border-radius: 18px;
    }
    .cta-banner h3 { font-size: 20px; font-weight: 800; margin-bottom: 6px; }
    .cta-banner p { font-size: 13px; opacity: .85; margin-bottom: 20px; }
    .cta-banner a {
      background: white; color: var(--primary);
      padding: 12px 24px; border-radius: 8px;
      font-weight: 700; font-size: 13px; text-decoration: none;
    }

    /* FOOTER */
    footer {
      text-align: center; padding: 20px 24px;
      border-top: 1px solid var(--border);
      font-size: 11px; color: var(--muted);
    }
  </style>
</head>
<body>

  <nav>
    <div class="logo">⚡ Nexus</div>
    <ul class="nav-links">
      <li><a href="#">Features</a></li>
      <li><a href="#">Docs</a></li>
      <li><a href="#">Pricing</a></li>
    </ul>
    <a href="#" class="nav-cta">Get Started →</a>
  </nav>

  <section class="hero">
    <div class="badge">✦ New — v2.0 is live</div>
    <h1>Build <span>faster</span>,<br>ship better products</h1>
    <p class="lead">The modern development toolkit that gets out of your way. Less configuration, more creation.</p>
    <div class="hero-btns">
      <a href="#" class="btn-primary">Start Building Free</a>
      <a href="#" class="btn-outline">View Docs →</a>
    </div>
  </section>

  <div class="stats">
    <div class="stat"><div class="stat-num">50k+</div><div class="stat-label">Developers</div></div>
    <div class="stat"><div class="stat-num">2M+</div><div class="stat-label">Projects</div></div>
    <div class="stat"><div class="stat-num">99.9%</div><div class="stat-label">Uptime</div></div>
    <div class="stat"><div class="stat-num">4.9★</div><div class="stat-label">Rating</div></div>
  </div>

  <section class="features-section">
    <div class="section-label">Why Nexus</div>
    <h2>Everything you need</h2>
    <p class="section-sub">All the tools. None of the complexity.</p>
    <div class="features">
      <div class="feat"><div class="feat-icon">🚀</div><div class="feat-title">Blazing Fast</div><div class="feat-desc">Sub-second builds with intelligent caching.</div></div>
      <div class="feat"><div class="feat-icon">🔒</div><div class="feat-title">Secure by Default</div><div class="feat-desc">Auto dependency auditing, zero config.</div></div>
      <div class="feat"><div class="feat-icon">🎨</div><div class="feat-title">Beautiful DX</div><div class="feat-desc">Developer experience that feels like magic.</div></div>
      <div class="feat"><div class="feat-icon">📦</div><div class="feat-title">Zero Config</div><div class="feat-desc">Works out of the box. Extend when needed.</div></div>
    </div>
  </section>

  <div class="cta-banner">
    <h3>Ready to ship faster?</h3>
    <p>Join 50,000+ developers who already use Nexus every day.</p>
    <a href="#">Start for free — no credit card</a>
  </div>

  <footer>Made with HTML + CSS only · Design tokens · Fluid type · Auto-responsive grid · © 2025 Nexus</footer>
</body>
</html>`;

  })();

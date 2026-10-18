// ============================================================
// UI — entry intro, typewriter, nav, showcase sync, modal, bento
// ============================================================
(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ============================================================
       PROJECT DATA — single source for the hero list, the showcase,
       and the details popup
       ============================================================ */
    const ICON = {
        '.NET': 'dotnet', 'C#': 'csharp', 'ASP.NET Core': 'dotnetcore', 'Angular': 'angular', 'Angular 16+': 'angular',
        'TypeScript': 'typescript', 'JavaScript': 'javascript', 'SQL Server': 'sqlserver', 'Oracle': 'oracle',
        'Azure': 'azure', 'Azure DevOps': 'azuredevops', 'Git': 'git', 'GitHub': 'github', 'Bootstrap': 'bootstrap',
        'HTML/CSS': 'html5', 'HTML': 'html5', 'MySQL': 'mysql', 'Entity Framework': 'entityframework', 'Swagger': 'swagger',
        'React': 'react'
    };

    const projects = [
        {
            key: 'safefinancial',
            name: 'Safe Financial',
            tag: 'current · australian fintech',
            role: 'Software Engineer · Feb 2026 → present',
            hue: '#c81e1e', hue2: '#4a0808', hueText: '#ff8a6a',
            desc: 'Australian online lending platform — personal and small loans from application to funding. I develop features, debug complex loan workflows, and keep production healthy across the lending product ecosystem.',
            points: [
                'Feature development across customer application journeys',
                'Production issue resolution in loan application workflows',
                'Azure DevOps CI/CD based development and deployment'
            ],
            stack: ['.NET', 'C#', 'Azure', 'Azure DevOps', 'CI/CD', 'Git'],
            links: [{ label: 'safefinancial.com.au', url: 'https://safefinancial.com.au/', kind: 'live' }],
            headline: 'loans, end to end.',
            about: 'Online personal and small-loan applications for Australian customers — eligibility checks, bank-statement linking, repayment plans and same-day decisions. I keep the customer journey shipping and the production workflows healthy.'
        },
        {
            key: 'unicore',
            name: 'Unicore Tax',
            tag: 'KSA tax compliance · ZATCA accredited',
            role: 'Full-Stack Developer · Abylle Solutions',
            hue: '#6d28d9', hue2: '#23104f', hueText: '#c4a3ff',
            desc: 'A tax filing and e-invoicing engine that validates data against ZATCA (Saudi tax authority) rules — ingesting via Excel, FTP, API or UI, and producing Phase I & II compliant invoices at the other end.',
            points: [
                'Automated tax reporting with precise backend calculation pipelines',
                'Sales invoices, credit/debit notes and prepayments end-to-end',
                'Designed the screens, built the APIs, authored the stored procedures'
            ],
            stack: ['C#', 'ASP.NET Core', 'Angular 16+', 'SQL Server', 'Azure'],
            links: [{ label: 'abylle.com / unicore', url: 'https://abylle.com/products/unicore/', kind: 'live' }],
            headline: 'every invoice compliant.',
            about: 'Excel, FTP, API or UI in — validated, signed, ZATCA Phase I & II compliant e-invoices out. Sales invoices, credit/debit notes and prepayments flow through calculation pipelines I designed, built and deployed to Azure.'
        },
        {
            key: 'vita',
            name: 'VITA',
            tag: 'virtual intelligent tax advisor',
            role: 'Full-Stack Developer · Abylle Solutions',
            hue: '#0f766e', hue2: '#042f2b', hueText: '#7ee0d2',
            desc: 'An intelligent tax advisory platform guiding businesses through VAT, withholding and corporate income tax workflows. I built the Corporate Income Tax (CIT) module end to end.',
            points: [
                'Designed & developed the CIT module screens',
                'Created tables and stored procedures in SQL Server',
                'Delivered bug fixes and new feature implementations'
            ],
            stack: ['ASP.NET Core', 'Angular', 'Bootstrap', 'SQL Server'],
            links: [
                { label: 'vita-xpro.com', url: 'https://vita-xpro.com/', kind: 'live' },
                { label: 'product page', url: 'https://abylle.com/products/vita/', kind: 'ghost' }
            ],
            headline: 'tax compliance, simplified.',
            about: 'VAT, withholding, corporate tax and Zakat returns automated from accounting data, with dashboards for CFOs and CPAs. I owned the Corporate Income Tax module — screens, tables, stored procedures and the computation flow.'
        },
        {
            key: 'nexus',
            name: 'Kotak · Nexus',
            tag: 'banking product',
            role: 'Full-Stack Developer · Abylle Solutions',
            hue: '#1d4ed8', hue2: '#0b1b57', hueText: '#9cc0ff',
            desc: 'A banking product for Kotak where reliability and speed are non-negotiable — performance tuning, bug fixes and Oracle reporting across the product.',
            points: [
                'Bug fixes and performance optimisations across the product',
                'Developed and modified reports on Oracle Server',
                'Designed and implemented user-friendly interfaces'
            ],
            stack: ['.NET', 'MVC', 'Oracle', 'JavaScript'],
            links: [{ label: 'kotak.com', url: 'https://www.kotak.com/', kind: 'ghost', note: 'client' }],
            headline: 'reports that finish on time.',
            about: 'Day-to-day banking operations backed by Oracle reporting. I tuned the slow queries, fixed the bugs behind production tickets and rebuilt the reports and screens the branch teams rely on.'
        },
        {
            key: 'skaps',
            name: 'SKAPS HR Solutions',
            tag: 'freelance · corporate website',
            role: 'Designer & Developer · freelance',
            hue: '#b45309', hue2: '#3f1c02', hueText: '#ffc27a',
            desc: 'The public website for SKAPS HR Solutions — a payroll, staffing and compliance firm operating across India, the US and Australia. Designed and built end to end as a fast, content-driven React site.',
            points: [
                'Multi-page site: services, solutions, industries, AI and about — all from one content model',
                'Lead-capture and demo-request forms, client logo wall, stats and advantages sections',
                'Vite build with CI/CD to GitHub Pages and a static-host branch for the production domain'
            ],
            stack: ['React', 'JavaScript', 'HTML/CSS', 'GitHub', 'Git'],
            links: [
                { label: 'live site', url: 'https://pundari7.github.io/skaps-hr-solutions/', kind: 'live' },
                { label: 'source on GitHub', url: 'https://github.com/mukkupundari/skaps-hr-solutions', kind: 'ghost' }
            ],
            headline: 'an HR firm, online.',
            about: 'Payroll, staffing and compliance for 50+ clients across three countries — told through a fast multi-page React site with service pages, a client logo wall, lead forms and automated deploys. I designed it, built it and shipped it solo.'
        },
        {
            key: 'farms',
            name: 'Prawns Farm Tracker',
            tag: 'personal project · expense & profit tracker',
            role: 'Solo Developer · personal',
            hue: '#15803d', hue2: '#052e16', hueText: '#86efac',
            desc: 'An ASP.NET Core MVC app that tracks a prawn farm\'s expenses (feed, labour, power, medicine), records harvest sales and shows profit or loss on one dashboard with date-range filters and report exports.',
            points: [
                'Dashboard KPIs, expenses-vs-sales and category charts driven by a date-range filter',
                'All filtering and reporting logic in SQL Server stored procedures, auto-installed on startup',
                'Excel and CSV report export, cookie login with PBKDF2 password hashing, EF Core for writes'
            ],
            stack: ['ASP.NET Core', 'C#', 'Entity Framework', 'SQL Server', 'Bootstrap'],
            links: [{ label: 'source on GitHub', url: 'https://github.com/mukkupundari/prawns-farm', kind: 'ghost' }],
            headline: 'every rupee, accounted for.',
            about: 'Feed, labour, power, medicine in — harvest sales out — and the net profit or loss on one dashboard. Built for a real farm: date-range filters, category charts, Excel/CSV reports, with the heavy lifting done in stored procedures.'
        }
    ];
    const byKey = Object.fromEntries(projects.map(p => [p.key, p]));

    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const chip = name => {
        const ic = ICON[name];
        return `<span>${ic ? `<img src="/img/tech/${ic}.svg" alt="" ${ic === 'github' ? 'class="inv"' : ''}>` : ''}${esc(name)}</span>`;
    };

    /* ============================================================
       ENTRY INTRO — name brightens to a peak, then dissolves;
       hero content follows, headline types itself in
       ============================================================ */
    const introName = document.getElementById('introName');
    const line1 = document.getElementById('typeLine1');
    const line2 = document.getElementById('typeLine2');
    const HEADLINE = ['I build, debug and ship', 'enterprise web applications.'];

    function typeInto(el, text, speed) {
        return new Promise(resolve => {
            const caret = document.createElement('i');
            caret.className = 'caret';
            el.appendChild(caret);
            let i = 0;
            const step = () => {
                if (i < text.length) {
                    caret.insertAdjacentText('beforebegin', text[i++]);
                    const ch = text[i - 1];
                    const pause = ch === ',' ? 180 : ch === ' ' ? 70 : speed + Math.random() * 40;
                    setTimeout(step, pause);
                } else {
                    resolve(caret);
                }
            };
            step();
        });
    }

    async function typeHeadline() {
        if (reduceMotion) {
            line1.textContent = HEADLINE[0];
            line2.textContent = HEADLINE[1];
            return;
        }
        const c1 = await typeInto(line1, HEADLINE[0], 48);
        await new Promise(r => setTimeout(r, 260));
        c1.remove();
        await typeInto(line2, HEADLINE[1], 44); // caret stays blinking on the last line
    }

    function finishIntro() {
        if (document.body.classList.contains('intro-done')) return;
        document.body.classList.remove('pre-intro', 'intro-play');
        document.body.classList.add('intro-done');
        setTimeout(() => {
            typeHeadline();
            setTimeout(startCounters, 900);
        }, 420);
    }

    function startIntro() {
        if (reduceMotion) { finishIntro(); return; }
        document.body.classList.add('intro-play');
        introName.addEventListener('animationend', finishIntro, { once: true });
        setTimeout(finishIntro, 3400); // safety net if the animation event never fires
    }
    // wait briefly for the display font so the name doesn't swap mid-animation
    const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    Promise.race([fontsReady, new Promise(r => setTimeout(r, 700))]).then(startIntro);

    /* ============================================================
       NAV — burger + scrollspy island
       ============================================================ */
    const burger = document.getElementById('navBurger');
    const navLinks = document.getElementById('navLinks');
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
    }));
    const nav = document.getElementById('nav');
    const spyLinks = Array.from(navLinks.querySelectorAll('a')).filter(a => a.getAttribute('href').startsWith('#'));
    const spyTargets = spyLinks.map(a => document.querySelector(a.getAttribute('href')));
    function updateSpy() {
        nav.classList.toggle('scrolled', window.scrollY > window.innerHeight * 0.6);
        const pos = window.scrollY + window.innerHeight * 0.35;
        let idx = 0;
        spyTargets.forEach((s, i) => { if (s && s.offsetTop <= pos) idx = i; });
        spyLinks.forEach((a, i) => a.classList.toggle('active', i === idx));
    }

    /* ============================================================
       HERO — "my projects" dropdown
       ============================================================ */
    const projPill = document.getElementById('projPill');
    const projMenu = document.getElementById('projMenu');
    projMenu.innerHTML = projects.map((p, i) =>
        `<a href="#proj-${p.key}" role="menuitem" style="--hue:${p.hue}"><i></i><span class="pm-txt"><b>${esc(p.name)}</b><small>${esc(p.tag)}</small></span><span class="pm-num">0${i + 1}</span></a>`
    ).join('');
    function setMenu(open) {
        projMenu.classList.toggle('open', open);
        projPill.setAttribute('aria-expanded', String(open));
    }
    projPill.addEventListener('click', (e) => { e.stopPropagation(); setMenu(!projMenu.classList.contains('open')); });
    projMenu.addEventListener('click', (e) => { e.stopPropagation(); if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('click', () => setMenu(false));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

    /* ============================================================
       REVEAL ON SCROLL
       ============================================================ */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${(i % 4) * 90}ms`;
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ============================================================
       STAT COUNTERS
       ============================================================ */
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseFloat(el.dataset.count);
            const start = performance.now();
            const dur = parseInt(el.dataset.dur, 10) || 1400;
            function tick(now) {
                const p = Math.min((now - start) / dur, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(target * eased) + (p === 1 ? '+' : '');
                if (p < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
            statObserver.unobserve(el);
        });
    }, { threshold: 0.6 });
    let countersStarted = false;
    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;
        document.querySelectorAll('[data-count]').forEach(el => statObserver.observe(el));
    }

    /* ============================================================
       BENTO — copy email
       ============================================================ */
    const copyMail = document.getElementById('copyMail');
    const copyHint = document.getElementById('copyHint');
    copyMail.addEventListener('click', async () => {
        const addr = copyMail.querySelector('.bm-addr').textContent.trim();
        try {
            await navigator.clipboard.writeText(addr);
            copyHint.textContent = 'COPIED ✓';
        } catch {
            window.location.href = `mailto:${addr}`;
        }
        setTimeout(() => { copyHint.textContent = 'TAP TO COPY EMAIL'; }, 1800);
    });

    /* ============================================================
       SHOWCASE — render cards, sync sticky info + progress track
       ============================================================ */
    const scRight = document.getElementById('scRight');
    const scInfo = document.getElementById('scInfo');
    const scFill = document.getElementById('scFill');
    const scNode = document.getElementById('scNode');

    scRight.innerHTML = projects.map((p, idx) => `
        <article class="sc-card${idx === 0 ? ' active' : ''}" id="proj-${p.key}" data-project="${p.key}" data-index="${idx}"
                 style="--hue:${p.hue};--hue2:${p.hue2};--hueText:${p.hueText}">
            <div class="sc-inner">
                <span class="sc-num" aria-hidden="true">0${idx + 1}</span>
                <span class="sc-ctag">${esc(p.tag)}</span>
                <h3 class="sc-cname">${esc(p.name)} <em>— ${p.headline}</em></h3>
                <p class="sc-cabout">${esc(p.about)}</p>
                <div class="sc-cfoot">
                    <div class="sc-chips">${p.stack.slice(0, 4).map(chip).join('')}</div>
                    <button class="sc-btn" data-project="${p.key}" type="button">Open project <span>→</span></button>
                </div>
            </div>
        </article>`).join('');

    function infoHTML(p) {
        return `
            <h3 style="--hue:${p.hue}">${esc(p.name)}</h3>
            <span class="sc-tag">${esc(p.tag)}</span>
            <p>${esc(p.desc)}</p>
            <ul style="--hue:${p.hue}">${p.points.map(pt => `<li>${esc(pt)}</li>`).join('')}</ul>
            <div class="sc-chips">${p.stack.map(chip).join('')}</div>
            <button class="sc-btn" data-project="${p.key}" type="button">Project details <span>→</span></button>`;
    }

    const cards = Array.from(scRight.querySelectorAll('.sc-card'));
    let activeIdx = -1;
    let swapTimer = null;
    function setActive(idx, immediate) {
        if (idx === activeIdx) return;
        activeIdx = idx;
        const p = projects[idx];
        cards.forEach((c, i) => c.classList.toggle('active', i === idx));
        scNode.style.background = p.hue;
        if (immediate) { scInfo.innerHTML = infoHTML(p); return; }
        clearTimeout(swapTimer);
        scInfo.classList.add('swapping');
        swapTimer = setTimeout(() => {
            scInfo.innerHTML = infoHTML(p);
            scInfo.classList.remove('swapping');
        }, 230);
    }
    setActive(0, true);

    function syncShowcase() {
        if (!cards.length) return;
        const mid = window.innerHeight * 0.5;
        // nearest card to the viewport centre wins
        let best = 0, bestD = Infinity;
        cards.forEach((c, i) => {
            const r = c.getBoundingClientRect();
            const d = Math.abs(r.top + r.height / 2 - mid);
            if (d < bestD) { bestD = d; best = i; }
        });
        setActive(best);
        // progress through the whole card column drives the track
        const rr = scRight.getBoundingClientRect();
        const first = cards[0].getBoundingClientRect();
        const last = cards[cards.length - 1].getBoundingClientRect();
        const startY = first.top + first.height / 2;
        const endY = last.top + last.height / 2;
        const prog = endY === startY ? 0 : Math.min(1, Math.max(0, (mid - startY) / (endY - startY)));
        scFill.style.transform = `scaleY(${prog.toFixed(4)})`;
        scFill.style.opacity = prog > 0.01 ? '1' : '0';
        scNode.style.top = `${(prog * 100).toFixed(3)}%`;
        void rr;
    }

    /* ============================================================
       DETAILS POPUP
       ============================================================ */
    const backdrop = document.getElementById('modalBackdrop');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');

    function linksHTML(p) {
        if (!p.links.length) return `<span class="m-nolink">internal product · no public link</span>`;
        return p.links.map(l =>
            `<a href="${esc(l.url)}" target="_blank" rel="noopener" class="${l.kind === 'ghost' ? 'ghost' : ''}">${l.kind === 'ghost' ? '' : '🔗 '}${esc(l.label)}${l.note ? ` <small>· ${esc(l.note)}</small>` : ''} ↗</a>`
        ).join('');
    }
    function openModal(key) {
        const p = byKey[key];
        if (!p) return;
        modal.style.setProperty('--hue', p.hue);
        modalContent.innerHTML = `
            <span class="m-badge">${esc(p.tag)}</span>
            <h3>${esc(p.name)}</h3>
            <span class="m-role">${esc(p.role)}</span>
            <p>${esc(p.desc)}</p>
            <div class="m-stack sc-chips">${p.stack.map(chip).join('')}</div>
            <ul>${p.points.map(pt => `<li>${esc(pt)}</li>`).join('')}</ul>
            <div class="m-links">${linksHTML(p)}</div>`;
        backdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
        modalClose.focus();
    }
    function closeModal() {
        backdrop.classList.remove('open');
        document.body.style.overflow = '';
    }
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.sc-btn');
        if (btn) openModal(btn.dataset.project);
    });
    modalClose.addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    /* ============================================================
       SCROLL LOOP
       ============================================================ */
    let ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            updateSpy();
            syncShowcase();
            ticking = false;
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
})();

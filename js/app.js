(() => {
    "use strict";

    const STORAGE_KEY = "rotina.app.v1";

    const DEFAULT_ROUTINES = [
        {
            id: "routine-initial-steps",
            name: "Passos Iniciais",
            category: "Primeiros passos",
            updatedAt: new Date().toISOString(),
            steps: [
                { title: "Ligar Computador", time: "" },
                { title: "Checar Emails", time: "" },
                { title: "Responder Emails", time: "" }
            ],
            accent: "primary",
            icon: "📋",
            enabled: true
        }
    ];

    const QUOTES = [
        { text: "A constância transforma pequenas ações em resultados que parecem grandes.", author: "Mensagem do Rotina" },
        { text: "O segredo de avançar é começar.", author: "Mark Twain" },
        { text: "Um dia organizado não precisa ser um dia perfeito.", author: "Mensagem do Rotina" },
        { text: "Grandes coisas são feitas por uma série de pequenas coisas reunidas.", author: "Vincent van Gogh" },
        { text: "Constância também é saber recomeçar.", author: "Mensagem do Rotina" },
        { text: "Comece fazendo o necessário; depois, o possível; e de repente você estará fazendo o impossível.", author: "Francisco de Assis" },
        { text: "A excelência não é um ato, mas um hábito.", author: "Will Durant, resumindo Aristóteles" },
        { text: "Comece pelo que está ao alcance. O restante ficará mais claro em movimento.", author: "Mensagem do Rotina" },
        { text: "O trabalho bem-feito é uma forma silenciosa de cuidado.", author: "Mensagem do Rotina" },
        { text: "Não é preciso ver toda a escada. Apenas dê o primeiro passo.", author: "Martin Luther King Jr." }
    ];

    const DOM = {
        overlay: document.getElementById("overlay"),
        drawerTitle: document.getElementById("drawerTitle"),
        drawerSubtitle: document.getElementById("drawerSubtitle"),
        routineName: document.getElementById("routineName"),
        routineCategory: document.getElementById("routineCategory"),
        routineUpdated: document.getElementById("routineUpdated"),
        routineEnabled: document.getElementById("routineEnabled"),
        steps: document.getElementById("steps"),
        addStepButton: document.getElementById("addStepButton"),
        closeDrawerButton: document.getElementById("closeDrawerButton"),
        cancelDrawerButton: document.getElementById("cancelDrawerButton"),
        saveRoutineButton: document.getElementById("saveRoutineButton"),
        newRoutineButton: document.getElementById("newRoutineButton"),
        routineGrid: document.getElementById("routineGrid"),
        routineCount: document.getElementById("routineCount"),
        routineEmpty: document.getElementById("routineEmpty"),
        deleteRoutineOverlay: document.getElementById("deleteRoutineOverlay"),
        deleteRoutineName: document.getElementById("deleteRoutineName"),
        confirmDeleteRoutineButton: document.getElementById("confirmDeleteRoutineButton"),
        deleteRoutineFromDrawerButton: document.getElementById("deleteRoutineFromDrawerButton"),
        toast: document.getElementById("toast"),
        mobileMenuButtons: document.querySelectorAll(".mobile-menu-button"),
        sidebarCloseButton: document.getElementById("sidebarCloseButton"),
        sidebarBackdrop: document.getElementById("sidebarBackdrop"),
        routineCarousel: document.getElementById("routineCarousel"),
        carouselPrevButton: document.getElementById("carouselPrevButton"),
        carouselNextButton: document.getElementById("carouselNextButton"),
        carouselPosition: document.getElementById("carouselPosition"),
        viewLinks: document.querySelectorAll("[data-view-link]"),
        views: document.querySelectorAll("[data-view]"),
        todayDate: document.getElementById("todayDate"),
        greetingTitle: document.getElementById("greetingTitle"),
        greetingSubtitle: document.getElementById("greetingSubtitle"),
        dailyQuote: document.getElementById("dailyQuote"),
        dailyQuoteAuthor: document.getElementById("dailyQuoteAuthor"),
        todayList: document.getElementById("todayList"),
        weekList: document.getElementById("weekList"),
        monthList: document.getElementById("monthList"),
        todayEmpty: document.getElementById("todayEmpty"),
        weekEmpty: document.getElementById("weekEmpty"),
        monthEmpty: document.getElementById("monthEmpty"),
        weekCount: document.getElementById("weekCount"),
        monthCount: document.getElementById("monthCount"),
        todayTotal: document.getElementById("todayTotal"),
        todayCompleted: document.getElementById("todayCompleted"),
        todayPercentage: document.getElementById("todayPercentage"),
        todayProgressFill: document.getElementById("todayProgressFill"),
        summaryProgressCard: document.querySelector(".summary-progress-card"),
        addRoutineToDayButton: document.getElementById("addRoutineToDayButton"),
        addSingleTaskButton: document.getElementById("addSingleTaskButton"),
        resetDayButton: document.getElementById("resetDayButton"),
        confirmResetDayButton: document.getElementById("confirmResetDayButton"),
        routinePickerOverlay: document.getElementById("routinePickerOverlay"),
        routinePickerList: document.getElementById("routinePickerList"),
        singleTaskOverlay: document.getElementById("singleTaskOverlay"),
        singleTaskForm: document.getElementById("singleTaskForm"),
        singleTaskTitle: document.getElementById("singleTaskTitle"),
        singleTaskSubtitle: document.getElementById("singleTaskSubtitle"),
        singleTaskSubmitButton: document.getElementById("singleTaskSubmitButton"),
        singleTaskInput: document.getElementById("singleTaskInput"),
        taskDueDate: document.getElementById("taskDueDate"),
        taskDueTime: document.getElementById("taskDueTime"),
        taskReminderEnabled: document.getElementById("taskReminderEnabled"),
        reminderControls: document.getElementById("reminderControls"),
        taskReminderValue: document.getElementById("taskReminderValue"),
        taskReminderUnit: document.getElementById("taskReminderUnit"),
        resetDayOverlay: document.getElementById("resetDayOverlay"),
        welcomeOverlay: document.getElementById("welcomeOverlay"),
        welcomeForm: document.getElementById("welcomeForm"),
        welcomeName: document.getElementById("welcomeName"),
        nextReminderCard: document.getElementById("nextReminderCard"),
        nextReminderTitle: document.getElementById("nextReminderTitle"),
        nextReminderTime: document.getElementById("nextReminderTime"),
        openAgendaButton: document.getElementById("openAgendaButton"),
        agendaList: document.getElementById("agendaList"),
        agendaEmpty: document.getElementById("agendaEmpty"),
        enableNotificationsButton: document.getElementById("enableNotificationsButton"),
        notificationStatus: document.getElementById("notificationStatus"),
        reminderToast: document.getElementById("reminderToast"),
        reminderToastTitle: document.getElementById("reminderToastTitle"),
        reminderToastMessage: document.getElementById("reminderToastMessage"),
        reminderOpenButton: document.getElementById("reminderOpenButton"),
        reminderSnoozeButton: document.getElementById("reminderSnoozeButton"),
        reminderDismissButton: document.getElementById("reminderDismissButton"),
        settingsNameForm: document.getElementById("settingsNameForm"),
        settingsNameInput: document.getElementById("settingsNameInput"),
        resetApplicationButton: document.getElementById("resetApplicationButton"),
        resetApplicationOverlay: document.getElementById("resetApplicationOverlay"),
        resetApplicationAcknowledge: document.getElementById("resetApplicationAcknowledge"),
        confirmResetApplicationButton: document.getElementById("confirmResetApplicationButton")
    };

    const State = {
        activeRoutineId: null,
        draggedStep: null,
        draggedTaskId: null,
        toastTimer: null,
        data: null,
        reminderTimer: null,
        currentReminderTaskId: null,
        audioContext: null,
        editingTaskId: null,
        agendaRefreshTimer: null,
        notificationRefreshTimer: null,
        pendingDeleteRoutineId: null
    };

    const Utils = {
        id(prefix = "item") {
            if (crypto?.randomUUID) return `${prefix}-${crypto.randomUUID()}`;
            return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
        },

        escape(value) {
            return String(value ?? "")
                .replaceAll("&", "&amp;")
                .replaceAll('"', "&quot;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;");
        },

        nowIso() {
            return new Date().toISOString();
        },

        todayKey() {
            const now = new Date();
            return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
        },

        formatDateTime(value) {
            if (!value) return "";
            const date = new Date(value);
            const today = new Date();
            const sameDay = date.toDateString() === today.toDateString();
            const time = date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
            return sameDay
                ? `Hoje às ${time}`
                : `${date.toLocaleDateString("pt-BR")} às ${time}`;
        },

        formatDueDate(value) {
            if (!value) return "";
            const date = new Date(`${value}T12:00:00`);
            return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
        },

        dueClass(value) {
            if (!value) return "";
            const due = new Date(`${value}T23:59:59`);
            const now = new Date();
            if (due < now) return "overdue";
            if (value === this.todayKey()) return "today";
            return "";
        },

        greeting() {
            const now = new Date();
            const minutes = now.getHours() * 60 + now.getMinutes();

            if (minutes >= 360 && minutes <= 720) return "Bom dia";
            if (minutes >= 721 && minutes <= 1080) return "Boa tarde";
            return "Boa noite";
        },

        quoteIndex() {
            const key = this.todayKey().replaceAll("-", "");
            return Number(key) % QUOTES.length;
        },

        routineById(id) {
            return State.data.routines.find((routine) => routine.id === id);
        },

        periodLabel(period) {
            return { today: "Hoje", week: "Esta semana", month: "Este mês" }[period] || "Hoje";
        },

        reminderMinutes(value, unit) {
            const amount = Math.max(Number(value) || 0, 0);
            if (unit === "days") return amount * 1440;
            if (unit === "hours") return amount * 60;
            return amount;
        },

        reminderParts(totalMinutes = 0) {
            const minutes = Math.max(Number(totalMinutes) || 0, 0);
            if (minutes && minutes % 1440 === 0) return { value: minutes / 1440, unit: "days" };
            if (minutes && minutes % 60 === 0) return { value: minutes / 60, unit: "hours" };
            return { value: minutes, unit: "minutes" };
        },

        normalizeStep(step) {
            if (typeof step === "string") return { title: step, time: "" };
            return {
                title: String(step?.title ?? step?.text ?? "").trim(),
                time: /^\d{2}:\d{2}$/.test(String(step?.time || "")) ? String(step.time) : ""
            };
        },

        dateKey(date) {
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        },

        timeKey(date) {
            return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
        },

        taskDateTime(task) {
            if (!task.dueDate || !task.dueTime) return null;
            const date = new Date(`${task.dueDate}T${task.dueTime}:00`);
            return Number.isNaN(date.getTime()) ? null : date;
        },

        reminderDateTime(task) {
            const due = this.taskDateTime(task);
            if (!due || !task.reminder?.enabled) return null;
            return new Date(due.getTime() - (Number(task.reminder.minutes) || 0) * 60000);
        },

        formatAgendaDay(value) {
            const date = new Date(`${value}T12:00:00`);
            const today = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            if (date.toDateString() === today.toDateString()) return "Hoje";
            if (date.toDateString() === tomorrow.toDateString()) return "Amanhã";
            return date.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" });
        },

        relativeReminderText(task) {
            const due = this.taskDateTime(task);
            if (!due) return "";
            const diff = due.getTime() - Date.now();
            const minutes = Math.round(Math.abs(diff) / 60000);
            if (diff < 0) return `Venceu há ${minutes} min`;
            if (minutes === 0) return "Vence agora";
            if (minutes < 60) return `Vence em ${minutes} min`;
            const hours = Math.round(minutes / 60);
            return `Vence em ${hours} ${hours === 1 ? "hora" : "horas"}`;
        }
    };

    const Storage = {
        defaultData() {
            return {
                version: 1.2,
                profile: { name: "" },
                settings: { lastOpenDate: Utils.todayKey(), notificationsEnabled: false },
                routines: structuredClone(DEFAULT_ROUTINES),
                tasks: []
            };
        },

        load() {
            try {
                const raw = localStorage.getItem(STORAGE_KEY);
                if (!raw) return this.defaultData();

                const parsed = JSON.parse(raw);
                const defaults = this.defaultData();
                const routines = (Array.isArray(parsed.routines) ? parsed.routines : structuredClone(DEFAULT_ROUTINES))
                    .map((routine) => ({
                        ...routine,
                        steps: (Array.isArray(routine.steps) ? routine.steps : [])
                            .map((step) => Utils.normalizeStep(step))
                            .filter((step) => step.title)
                    }));
                const tasks = (Array.isArray(parsed.tasks) ? parsed.tasks : []).map((task) => ({
                    ...task,
                    dueDate: task.dueDate || "",
                    dueTime: task.dueTime || "",
                    reminder: {
                        enabled: false,
                        minutes: 0,
                        notifiedAt: null,
                        snoozedUntil: null,
                        ...(task.reminder || {})
                    },
                    completed: Boolean(task.completed),
                    completedAt: task.completedAt || null
                }));

                return {
                    ...defaults,
                    ...parsed,
                    version: 1.2,
                    profile: { ...defaults.profile, ...(parsed.profile || {}) },
                    settings: { ...defaults.settings, ...(parsed.settings || {}) },
                    routines,
                    tasks
                };
            } catch (error) {
                console.error("Falha ao ler os dados salvos:", error);
                return this.defaultData();
            }
        },

        save() {
            State.data.settings.lastOpenDate = Utils.todayKey();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(State.data));
        }
    };

    const Toast = {
        show(message) {
            DOM.toast.textContent = message;
            DOM.toast.classList.add("show");
            clearTimeout(State.toastTimer);
            State.toastTimer = setTimeout(() => DOM.toast.classList.remove("show"), 2100);
        }
    };

    const Modal = {
        open(element) {
            element?.classList.add("open");
            element?.setAttribute("aria-hidden", "false");
            document.body.classList.add("drawer-open");
        },

        close(element) {
            element?.classList.remove("open");
            element?.setAttribute("aria-hidden", "true");

            if (!document.querySelector(".modal-overlay.open") && !DOM.overlay.classList.contains("open")) {
                document.body.classList.remove("drawer-open");
            }
        },

        init() {
            document.querySelectorAll("[data-close-modal]").forEach((button) => {
                button.addEventListener("click", () => this.close(document.getElementById(button.dataset.closeModal)));
            });

            document.querySelectorAll(".modal-overlay").forEach((overlay) => {
                overlay.addEventListener("click", (event) => {
                    if (event.target === overlay && overlay !== DOM.welcomeOverlay) this.close(overlay);
                });
            });
        }
    };

    const Profile = {
        render() {
            const name = State.data.profile.name.trim();
            DOM.greetingTitle.textContent = name ? `${Utils.greeting()}, ${name}` : Utils.greeting();
            if (DOM.settingsNameInput && document.activeElement !== DOM.settingsNameInput) {
                DOM.settingsNameInput.value = name;
            }

            const totalToday = State.data.tasks.filter((task) => task.period === "today").length;
            DOM.greetingSubtitle.textContent = totalToday
                ? `Você possui ${totalToday} ${totalToday === 1 ? "tarefa planejada" : "tarefas planejadas"} para hoje.`
                : "Seu dia ainda não foi planejado. Comece com uma rotina ou tarefa simples.";

            const quote = QUOTES[Utils.quoteIndex()];
            DOM.dailyQuote.textContent = quote.text;
            DOM.dailyQuoteAuthor.textContent = `— ${quote.author}`;

            const formatted = new Intl.DateTimeFormat("pt-BR", {
                weekday: "long",
                day: "2-digit",
                month: "long"
            }).format(new Date());
            DOM.todayDate.textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);
        },

        init() {
            if (!State.data.profile.name.trim()) {
                Modal.open(DOM.welcomeOverlay);
                requestAnimationFrame(() => DOM.welcomeName.focus());
            }

            DOM.welcomeForm.addEventListener("submit", (event) => {
                event.preventDefault();
                const name = DOM.welcomeName.value.trim();
                if (!name) return DOM.welcomeName.focus();

                State.data.profile.name = name;
                Storage.save();
                this.render();
                Modal.close(DOM.welcomeOverlay);
                Toast.show(`Bem-vindo, ${name}.`);
            });

            this.render();
        }
    };

    const Sidebar = {
        open() {
            document.body.classList.add("sidebar-open");
        },

        close() {
            document.body.classList.remove("sidebar-open");
        },

        init() {
            DOM.mobileMenuButtons.forEach((button) => button.addEventListener("click", () => this.open()));
            DOM.sidebarCloseButton?.addEventListener("click", () => this.close());
            DOM.sidebarBackdrop?.addEventListener("click", () => this.close());
        }
    };

    const Navigation = {
        show(name) {
            DOM.views.forEach((view) => {
                const active = view.dataset.view === name;
                view.hidden = !active;
                view.classList.toggle("active", active);
            });

            DOM.viewLinks.forEach((link) => {
                link.classList.toggle("active", link.dataset.viewLink === name);
            });

            Sidebar.close();
            if (name === "routines") Carousel.refresh();
            if (name === "agenda") {
                Agenda.render();
                Reminders.updatePermissionStatus();
            }
        },

        init() {
            DOM.viewLinks.forEach((link) => {
                link.addEventListener("click", (event) => {
                    event.preventDefault();
                    this.show(link.dataset.viewLink);
                });
            });

            document.querySelectorAll("[data-placeholder-link]").forEach((link) => {
                link.addEventListener("click", (event) => {
                    event.preventDefault();
                    Toast.show("Esta área será desenvolvida em uma próxima atualização.");
                    Sidebar.close();
                });
            });

            const requested = location.hash === "#rotinas"
                ? "routines"
                : location.hash === "#agenda"
                    ? "agenda"
                    : location.hash === "#configuracoes"
                        ? "settings"
                        : "today";
            this.show(requested);
        }
    };

    const Carousel = {
        cards() {
            return [...DOM.routineGrid.querySelectorAll("[data-routine-card]")];
        },

        isDesktop() {
            return matchMedia("(min-width: 901px)").matches;
        },

        visible() {
            if (!this.isDesktop()) return this.cards().length || 1;
            return innerWidth <= 1300 ? 2 : 3;
        },

        step() {
            const first = this.cards()[0];
            if (!first) return DOM.routineCarousel.clientWidth;
            const styles = getComputedStyle(DOM.routineGrid);
            const gap = parseFloat(styles.gap || styles.columnGap) || 22;
            return first.getBoundingClientRect().width + gap;
        },

        update() {
            const cards = this.cards();
            const total = cards.length;
            const visible = this.visible();

            if (!this.isDesktop() || total <= visible) {
                DOM.carouselPrevButton.disabled = true;
                DOM.carouselNextButton.disabled = true;
                DOM.carouselPosition.textContent = total ? `1–${total} de ${total}` : "0 de 0";
                return;
            }

            const index = Math.round(DOM.routineCarousel.scrollLeft / this.step());
            const start = Math.min(index, Math.max(total - visible, 0));
            const end = Math.min(start + visible, total);
            const max = DOM.routineCarousel.scrollWidth - DOM.routineCarousel.clientWidth;

            DOM.carouselPrevButton.disabled = DOM.routineCarousel.scrollLeft <= 2;
            DOM.carouselNextButton.disabled = DOM.routineCarousel.scrollLeft >= max - 2;
            DOM.carouselPosition.textContent = `${start + 1}–${end} de ${total}`;
        },

        move(direction) {
            DOM.routineCarousel.scrollBy({ left: direction * this.step(), behavior: "smooth" });
        },

        scrollTo(card) {
            if (!this.isDesktop() || !card) return;
            const max = Math.max(DOM.routineCarousel.scrollWidth - DOM.routineCarousel.clientWidth, 0);
            const left = Math.min(Math.max(card.offsetLeft + card.offsetWidth - DOM.routineCarousel.clientWidth, 0), max);
            DOM.routineCarousel.scrollTo({ left, behavior: "smooth" });
        },

        refresh() {
            requestAnimationFrame(() => this.update());
        },

        init() {
            DOM.carouselPrevButton.addEventListener("click", () => this.move(-1));
            DOM.carouselNextButton.addEventListener("click", () => this.move(1));
            DOM.routineCarousel.addEventListener("scroll", () => this.update(), { passive: true });
            addEventListener("resize", () => this.refresh());
        }
    };

    const Steps = {
        create(value = { title: "", time: "" }) {
            const step = Utils.normalizeStep(value);
            const row = document.createElement("div");
            row.className = "step";
            row.draggable = true;
            row.innerHTML = `
                <span class="drag" aria-hidden="true">⋮⋮</span>
                <input class="step-input" value="${Utils.escape(step.title)}" placeholder="Descreva esta etapa" autocomplete="off" aria-label="Descrição da etapa">
                <input class="step-time-input" type="time" value="${Utils.escape(step.time)}" aria-label="Horário opcional da etapa" title="Horário opcional">
                <button class="step-remove" type="button" aria-label="Excluir etapa">✕</button>
            `;

            const input = row.querySelector(".step-input");
            row.querySelector(".step-remove").addEventListener("click", () => {
                row.remove();
                if (!DOM.steps.children.length) this.add({ title: "", time: "" }, true);
            });

            input.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    this.add({ title: "", time: "" }, true, row);
                } else if (event.key === "Backspace" && !input.value.trim() && DOM.steps.children.length > 1) {
                    event.preventDefault();
                    row.remove();
                }
            });

            row.addEventListener("dragstart", (event) => {
                if (event.target.matches("input,button")) return event.preventDefault();
                State.draggedStep = row;
                row.classList.add("dragging");
            });

            row.addEventListener("dragend", () => {
                row.classList.remove("dragging");
                DOM.steps.querySelectorAll(".step").forEach((item) => item.classList.remove("drop-before", "drop-after"));
                State.draggedStep = null;
            });

            row.addEventListener("dragover", (event) => {
                event.preventDefault();
                if (!State.draggedStep || State.draggedStep === row) return;
                const rect = row.getBoundingClientRect();
                DOM.steps.querySelectorAll(".step").forEach((item) => item.classList.remove("drop-before", "drop-after"));
                row.classList.add(event.clientY > rect.top + rect.height / 2 ? "drop-after" : "drop-before");
            });

            row.addEventListener("drop", (event) => {
                event.preventDefault();
                if (!State.draggedStep || State.draggedStep === row) return;
                const rect = row.getBoundingClientRect();
                event.clientY > rect.top + rect.height / 2 ? row.after(State.draggedStep) : row.before(State.draggedStep);
            });

            return row;
        },

        add(value = { title: "", time: "" }, focus = false, after = null) {
            const row = this.create(value);
            after ? after.after(row) : DOM.steps.appendChild(row);
            if (focus) row.querySelector(".step-input").focus();
        },

        render(values) {
            DOM.steps.innerHTML = "";
            (values.length ? values : [{ title: "", time: "" }]).forEach((value) => this.add(value));
        },

        values() {
            return [...DOM.steps.querySelectorAll(".step")]
                .map((row) => ({
                    title: row.querySelector(".step-input").value.trim(),
                    time: row.querySelector(".step-time-input").value || ""
                }))
                .filter((step) => step.title);
        }
    };

    const Cards = {
        markup(routine) {
            const preview = routine.steps.slice(0, 4)
                .map((step) => `<div class="task pending">○ ${step.time ? `<strong>${Utils.escape(step.time)}</strong> · ` : ""}${Utils.escape(step.title)}</div>`)
                .join("");
            const remaining = Math.max(routine.steps.length - 4, 0);

            return `
                <div class="accent ${routine.accent === "primary" ? "" : Utils.escape(routine.accent)}"></div>
                <div class="card-header">
                    <div class="card-left">
                        <div class="card-icon-circle">${Utils.escape(routine.icon)}</div>
                        <div>
                            <h3>${Utils.escape(routine.name)}</h3>
                            <span class="badge">${Utils.escape(routine.category)}</span>
                        </div>
                    </div>
                    <button class="routine-toggle ${routine.enabled ? "enabled" : ""}" type="button" data-routine-toggle="${Utils.escape(routine.id)}" aria-pressed="${routine.enabled ? "true" : "false"}">
                        <span class="routine-toggle-dot"></span>
                        ${routine.enabled ? "Ativada" : "Desativada"}
                    </button>
                </div>
                <div class="progress"><div class="progress-fill" style="width:0%"></div></div>
                <div class="progress-info">
                    <span>${routine.steps.length} ${routine.steps.length === 1 ? "etapa" : "etapas"}</span>
                    <strong>Pronta</strong>
                </div>
                <div class="task-preview">
                    ${preview || '<div class="task pending">○ Nenhuma etapa cadastrada</div>'}
                    ${remaining ? `<div class="task-more">Ver mais ${remaining} ${remaining === 1 ? "etapa restante" : "etapas restantes"}</div>` : ""}
                </div>
                <div class="card-footer">
                    <span>Última atualização: ${Utils.escape(Utils.formatDateTime(routine.updatedAt))}</span>
                    <button class="card-menu routine-delete-button" type="button" data-routine-delete="${Utils.escape(routine.id)}" aria-label="Excluir rotina ${Utils.escape(routine.name)}" title="Excluir rotina">🗑</button>
                </div>
            `;
        },

        render() {
            DOM.routineGrid.innerHTML = State.data.routines.map((routine) => `
                <article class="card" data-routine-card data-routine-id="${Utils.escape(routine.id)}">
                    ${this.markup(routine)}
                </article>
            `).join("");

            DOM.routineGrid.querySelectorAll("[data-routine-card]").forEach((card) => {
                card.addEventListener("click", (event) => {
                    const deleteButton = event.target.closest("[data-routine-delete]");
                    if (deleteButton) {
                        event.stopPropagation();
                        RoutineDeletion.open(deleteButton.dataset.routineDelete);
                        return;
                    }

                    const toggle = event.target.closest("[data-routine-toggle]");
                    if (toggle) {
                        event.stopPropagation();
                        const routine = Utils.routineById(toggle.dataset.routineToggle);
                        if (routine) {
                            routine.enabled = !routine.enabled;
                            Storage.save();
                            this.render();
                            Toast.show(routine.enabled ? "Rotina ativada." : "Rotina desativada.");
                        }
                        return;
                    }

                    if (!event.target.closest(".card-menu")) Drawer.open(card.dataset.routineId);
                });
            });

            const count = State.data.routines.length;
            DOM.routineCount.textContent = `${count} ${count === 1 ? "rotina cadastrada" : "rotinas cadastradas"}`;
            if (DOM.routineEmpty) DOM.routineEmpty.hidden = count > 0;
            Carousel.refresh();
            RoutinePicker.render();
        }
    };

    const Drawer = {
        open(id = null) {
            State.activeRoutineId = id;
            const routine = id ? Utils.routineById(id) : null;
            DOM.drawerTitle.textContent = routine ? "Editar rotina" : "Nova rotina";
            DOM.drawerSubtitle.textContent = routine ? "Atualize este modelo e suas etapas." : "Crie um modelo reutilizável.";
            DOM.routineName.value = routine?.name || "";
            DOM.routineCategory.textContent = routine?.category || "Sem categoria";
            DOM.routineUpdated.textContent = `Última atualização: ${routine ? Utils.formatDateTime(routine.updatedAt) : "ainda não salva"}`;
            DOM.routineEnabled.checked = Boolean(routine?.enabled);
            if (DOM.deleteRoutineFromDrawerButton) DOM.deleteRoutineFromDrawerButton.hidden = !routine;
            Steps.render(routine?.steps || []);
            DOM.overlay.classList.add("open");
            DOM.overlay.setAttribute("aria-hidden", "false");
            document.body.classList.add("drawer-open");
            requestAnimationFrame(() => DOM.routineName.focus());
        },

        close() {
            DOM.overlay.classList.remove("open");
            DOM.overlay.setAttribute("aria-hidden", "true");
            document.body.classList.remove("drawer-open");
            State.activeRoutineId = null;
        },

        save() {
            const name = DOM.routineName.value.trim();
            const steps = Steps.values();
            if (!name) return DOM.routineName.focus();
            if (!steps.length) return Toast.show("Adicione pelo menos uma etapa.");

            if (State.activeRoutineId) {
                const routine = Utils.routineById(State.activeRoutineId);
                Object.assign(routine, {
                    name,
                    steps,
                    updatedAt: Utils.nowIso(),
                    enabled: DOM.routineEnabled.checked
                });
            } else {
                State.data.routines.push({
                    id: Utils.id("routine"),
                    name,
                    category: "Sem categoria",
                    updatedAt: Utils.nowIso(),
                    steps,
                    accent: "primary",
                    icon: "📋",
                    enabled: DOM.routineEnabled.checked
                });
            }

            Storage.save();
            Cards.render();
            Profile.render();
            this.close();
            Toast.show("Rotina salva com sucesso.");
        },

        init() {
            DOM.newRoutineButton.addEventListener("click", () => this.open());
            DOM.addStepButton.addEventListener("click", () => Steps.add({ title: "", time: "" }, true));
            DOM.closeDrawerButton.addEventListener("click", () => this.close());
            DOM.cancelDrawerButton.addEventListener("click", () => this.close());
            DOM.saveRoutineButton.addEventListener("click", () => this.save());
            DOM.deleteRoutineFromDrawerButton?.addEventListener("click", () => {
                const id = State.activeRoutineId;
                this.close();
                if (id) RoutineDeletion.open(id);
            });
            DOM.overlay.addEventListener("click", (event) => {
                if (event.target === DOM.overlay) this.close();
            });
        }
    };

    const RoutineDeletion = {
        open(id) {
            const routine = Utils.routineById(id);
            if (!routine) return;
            State.pendingDeleteRoutineId = id;
            DOM.deleteRoutineName.textContent = routine.name;
            Modal.open(DOM.deleteRoutineOverlay);
        },

        close() {
            State.pendingDeleteRoutineId = null;
            Modal.close(DOM.deleteRoutineOverlay);
        },

        confirm() {
            const id = State.pendingDeleteRoutineId;
            const routine = id ? Utils.routineById(id) : null;
            if (!routine) return this.close();

            State.data.routines = State.data.routines.filter((item) => item.id !== id);
            Storage.save();
            Cards.render();
            Profile.render();
            this.close();
            Toast.show(`Rotina "${routine.name}" excluída. As tarefas já criadas foram preservadas.`);
        },

        init() {
            DOM.confirmDeleteRoutineButton?.addEventListener("click", () => this.confirm());
        }
    };

    const RoutinePicker = {
        render() {
            DOM.routinePickerList.innerHTML = State.data.routines.map((routine) => `
                <button class="routine-picker-option" type="button" data-routine-id="${Utils.escape(routine.id)}">
                    <span class="picker-icon">${Utils.escape(routine.icon)}</span>
                    <span>
                        <span class="picker-title">${Utils.escape(routine.name)}</span>
                        <span class="picker-meta">${routine.steps.length} ${routine.steps.length === 1 ? "etapa" : "etapas"} · ${Utils.escape(routine.category)}</span>
                    </span>
                    <span class="picker-add">+</span>
                </button>
            `).join("");

            DOM.routinePickerList.querySelectorAll("[data-routine-id]").forEach((button) => {
                button.addEventListener("click", () => {
                    Tasks.addRoutine(button.dataset.routineId);
                    Modal.close(DOM.routinePickerOverlay);
                });
            });
        }
    };

    const Tasks = {
        byPeriod(period) {
            return State.data.tasks
                .map((task, index) => ({ task, index }))
                .filter(({ task }) => task.period === period)
                .sort((a, b) => {
                    const bucket = (item) => item.completed ? 2 : item.dueTime ? 0 : 1;
                    const bucketDiff = bucket(a.task) - bucket(b.task);
                    if (bucketDiff) return bucketDiff;

                    if (!a.task.completed && a.task.dueTime && b.task.dueTime) {
                        if (a.task.dueDate && b.task.dueDate && a.task.dueDate !== b.task.dueDate) {
                            return a.task.dueDate.localeCompare(b.task.dueDate);
                        }
                        if (a.task.dueDate !== b.task.dueDate) return a.task.dueDate ? -1 : 1;
                        const timeDiff = a.task.dueTime.localeCompare(b.task.dueTime);
                        if (timeDiff) return timeDiff;
                    }

                    if (a.task.completed && b.task.completed && a.task.completedAt !== b.task.completedAt) {
                        return String(a.task.completedAt || "").localeCompare(String(b.task.completedAt || ""));
                    }

                    return a.index - b.index;
                })
                .map(({ task }) => task);
        },

        sync({ save = true, toast = "" } = {}) {
            if (save) Storage.save();
            this.render();
            Profile.render();
            Agenda.render();
            Reminders.schedule();
            if (toast) Toast.show(toast);
        },

        createRecord(title, period = "today", source = "Tarefa avulsa", dueDate = "", dueTime = "", reminder = null) {
            return {
                id: Utils.id("task"),
                title,
                source,
                period,
                dueDate,
                dueTime,
                reminder: reminder || { enabled: false, minutes: 0, notifiedAt: null, snoozedUntil: null },
                completed: false,
                createdAt: Utils.nowIso(),
                completedAt: null
            };
        },

        add(title, period = "today", source = "Tarefa avulsa", dueDate = "", dueTime = "", reminder = null, { silent = false } = {}) {
            const task = this.createRecord(title, period, source, dueDate, dueTime, reminder);
            State.data.tasks.push(task);
            if (!silent) this.sync();
            return task;
        },

        addRoutine(routineId) {
            const routine = Utils.routineById(routineId);
            if (!routine) return;

            routine.steps.forEach((rawStep) => {
                const step = Utils.normalizeStep(rawStep);
                const dueDate = step.time ? Utils.todayKey() : "";
                State.data.tasks.push(this.createRecord(step.title, "today", routine.name, dueDate, step.time));
            });
            this.sync({ toast: `Rotina "${routine.name}" adicionada ao dia.` });
        },

        toggle(id) {
            const task = State.data.tasks.find((item) => item.id === id);
            if (!task) return;

            task.completed = !task.completed;
            task.completedAt = task.completed ? Utils.nowIso() : null;
            if (task.completed && task.reminder) {
                task.reminder.notifiedAt = task.reminder.notifiedAt || Utils.nowIso();
                task.reminder.snoozedUntil = null;
            } else if (!task.completed && task.reminder) {
                task.reminder.notifiedAt = null;
            }
            this.sync();
        },

        remove(id) {
            State.data.tasks = State.data.tasks.filter((item) => item.id !== id);
            if (State.editingTaskId === id) State.editingTaskId = null;
            this.sync();
        },

        resetToday() {
            State.data.tasks = State.data.tasks.filter((task) => task.period !== "today");
            Reminders.clearActiveReminder();

            State.data.routines
                .filter((routine) => routine.enabled)
                .forEach((routine) => {
                    routine.steps.forEach((rawStep) => {
                        const step = Utils.normalizeStep(rawStep);
                        State.data.tasks.push(this.createRecord(
                            step.title,
                            "today",
                            routine.name,
                            step.time ? Utils.todayKey() : "",
                            step.time
                        ));
                    });
                });

            Modal.close(DOM.resetDayOverlay);
            const enabledCount = State.data.routines.filter((routine) => routine.enabled).length;
            this.sync({
                toast: enabledCount
                    ? `Minha lista foi reiniciada com ${enabledCount} ${enabledCount === 1 ? "rotina ativada" : "rotinas ativadas"}.`
                    : "Minha lista foi reiniciada. Semana e mês foram preservados."
            });
        },

        itemMarkup(task) {
            const completion = task.completedAt
                ? `<span class="today-item-completed-at">${Utils.formatDateTime(task.completedAt).startsWith("Hoje")
                    ? `Concluída ${Utils.formatDateTime(task.completedAt)}`
                    : `Concluída em ${Utils.formatDateTime(task.completedAt)}`}</span>`
                : "";

            const due = task.dueDate
                ? `<span class="today-due ${Utils.dueClass(task.dueDate)}">Prazo: ${Utils.formatDueDate(task.dueDate)}</span>`
                : "";

            const time = task.dueTime
                ? `<span class="today-time">◷ ${Utils.escape(task.dueTime)}</span>`
                : "";

            const reminder = task.reminder?.enabled && task.dueDate && task.dueTime
                ? `<span class="today-reminder">🔔 ${task.reminder.minutes ? `${task.reminder.minutes} min antes` : "No horário"}</span>`
                : "";

            return `
                <article class="today-item ${task.completed ? "completed" : ""}" draggable="true" data-task-id="${Utils.escape(task.id)}" data-task-period="${Utils.escape(task.period)}">
                    <button class="today-check" type="button" aria-label="${task.completed ? "Marcar como pendente" : "Concluir tarefa"}">✓</button>
                    <div class="today-item-content" role="button" tabindex="0" aria-label="Editar tarefa ${Utils.escape(task.title)}">
                        <span class="today-item-title">${Utils.escape(task.title)}</span>
                        <div class="today-item-meta">
                            <span class="today-source">${Utils.escape(task.source)}</span>
                            ${due}
                            ${time}
                            ${reminder}
                            ${completion}
                        </div>
                    </div>
                    <button class="today-remove" type="button" aria-label="Remover tarefa">✕</button>
                </article>
            `;
        },

        moveTask(id, newPeriod, beforeId = null, afterId = null) {
            const currentIndex = State.data.tasks.findIndex((task) => task.id === id);
            if (currentIndex === -1) return;

            const [task] = State.data.tasks.splice(currentIndex, 1);
            task.period = newPeriod;
            let targetIndex = State.data.tasks.length;

            if (beforeId) {
                const index = State.data.tasks.findIndex((item) => item.id === beforeId);
                if (index !== -1) targetIndex = index;
            } else if (afterId) {
                const index = State.data.tasks.findIndex((item) => item.id === afterId);
                if (index !== -1) targetIndex = index + 1;
            } else {
                const indices = State.data.tasks
                    .map((item, index) => item.period === newPeriod ? index : -1)
                    .filter((index) => index !== -1);
                if (indices.length) targetIndex = indices[indices.length - 1] + 1;
            }

            State.data.tasks.splice(targetIndex, 0, task);
            this.sync();
        },

        bindDragAndDrop(list, period) {
            list.querySelectorAll("[data-task-id]").forEach((item) => {
                item.addEventListener("dragstart", (event) => {
                    if (event.target.closest("button,input")) return event.preventDefault();
                    State.draggedTaskId = item.dataset.taskId;
                    item.classList.add("dragging");
                    event.dataTransfer.effectAllowed = "move";
                });

                item.addEventListener("dragend", () => {
                    item.classList.remove("dragging");
                    document.querySelectorAll(".today-item").forEach((row) => row.classList.remove("drop-before", "drop-after"));
                    document.querySelectorAll("[data-task-list]").forEach((zone) => zone.classList.remove("is-drop-target"));
                    State.draggedTaskId = null;
                });

                item.addEventListener("dragover", (event) => {
                    event.preventDefault();
                    if (!State.draggedTaskId || State.draggedTaskId === item.dataset.taskId) return;
                    const rect = item.getBoundingClientRect();
                    const after = event.clientY > rect.top + rect.height / 2;
                    document.querySelectorAll(".today-item").forEach((row) => row.classList.remove("drop-before", "drop-after"));
                    item.classList.add(after ? "drop-after" : "drop-before");
                });

                item.addEventListener("drop", (event) => {
                    event.preventDefault();
                    if (!State.draggedTaskId || State.draggedTaskId === item.dataset.taskId) return;
                    const rect = item.getBoundingClientRect();
                    const after = event.clientY > rect.top + rect.height / 2;
                    this.moveTask(State.draggedTaskId, period, after ? null : item.dataset.taskId, after ? item.dataset.taskId : null);
                });
            });

            list.addEventListener("dragover", (event) => {
                event.preventDefault();
                list.classList.add("is-drop-target");
            });
            list.addEventListener("dragleave", (event) => {
                if (!list.contains(event.relatedTarget)) list.classList.remove("is-drop-target");
            });
            list.addEventListener("drop", (event) => {
                if (event.target.closest("[data-task-id]")) return;
                event.preventDefault();
                list.classList.remove("is-drop-target");
                if (State.draggedTaskId) this.moveTask(State.draggedTaskId, period);
            });
        },

        openForm(task = null, defaultPeriod = "today") {
            State.editingTaskId = task?.id || null;
            DOM.singleTaskForm.reset();
            DOM.singleTaskTitle.textContent = task ? "Editar tarefa" : "Nova tarefa";
            DOM.singleTaskSubtitle.textContent = task
                ? "Altere os dados da tarefa sem perder seu vínculo com a Agenda e os lembretes."
                : "Crie uma tarefa avulsa e defina quando ela deve ser realizada.";
            DOM.singleTaskSubmitButton.textContent = task ? "Salvar alterações" : "Adicionar";
            DOM.singleTaskInput.value = task?.title || "";
            DOM.taskDueDate.value = task?.dueDate || "";
            DOM.taskDueTime.value = task?.dueTime || "";

            const period = task?.period || defaultPeriod;
            const periodInput = DOM.singleTaskForm.querySelector(`input[name="taskPeriod"][value="${CSS.escape(period)}"]`);
            if (periodInput) periodInput.checked = true;

            const enabled = Boolean(task?.reminder?.enabled);
            DOM.taskReminderEnabled.checked = enabled;
            const parts = Utils.reminderParts(task?.reminder?.minutes || 0);
            DOM.taskReminderValue.value = parts.value || 0;
            DOM.taskReminderUnit.value = parts.unit;
            DOM.reminderControls.hidden = !enabled;

            Modal.open(DOM.singleTaskOverlay);
            requestAnimationFrame(() => DOM.singleTaskInput.focus());
        },

        openEditor(id) {
            const task = State.data.tasks.find((item) => item.id === id);
            if (task) this.openForm(task);
        },

        submitForm() {
            const title = DOM.singleTaskInput.value.trim();
            if (!title) return DOM.singleTaskInput.focus();

            const period = new FormData(DOM.singleTaskForm).get("taskPeriod") || "today";
            const reminderEnabled = DOM.taskReminderEnabled.checked;
            const reminderMinutes = reminderEnabled
                ? Utils.reminderMinutes(DOM.taskReminderValue.value, DOM.taskReminderUnit.value)
                : 0;

            if (reminderEnabled && (!DOM.taskDueDate.value || !DOM.taskDueTime.value)) {
                Toast.show("Defina uma data e um horário para ativar o lembrete.");
                return;
            }

            if (State.editingTaskId) {
                const task = State.data.tasks.find((item) => item.id === State.editingTaskId);
                if (!task) return;
                const scheduleChanged = task.dueDate !== DOM.taskDueDate.value
                    || task.dueTime !== DOM.taskDueTime.value
                    || Boolean(task.reminder?.enabled) !== reminderEnabled
                    || Number(task.reminder?.minutes || 0) !== reminderMinutes;

                Object.assign(task, {
                    title,
                    period,
                    dueDate: DOM.taskDueDate.value,
                    dueTime: DOM.taskDueTime.value,
                    reminder: {
                        ...(task.reminder || {}),
                        enabled: reminderEnabled,
                        minutes: reminderMinutes,
                        notifiedAt: scheduleChanged ? null : task.reminder?.notifiedAt || null,
                        snoozedUntil: null
                    }
                });
                Modal.close(DOM.singleTaskOverlay);
                State.editingTaskId = null;
                this.sync({ toast: "Tarefa atualizada com sucesso." });
                return;
            }

            State.data.tasks.push(this.createRecord(title, period, "Tarefa avulsa", DOM.taskDueDate.value, DOM.taskDueTime.value, {
                enabled: reminderEnabled,
                minutes: reminderMinutes,
                notifiedAt: null,
                snoozedUntil: null
            }));
            Modal.close(DOM.singleTaskOverlay);
            this.sync({ toast: `Tarefa adicionada a: ${Utils.periodLabel(period)}.` });
        },

        renderSection(period, list, empty, count = null) {
            const tasks = this.byPeriod(period);
            list.innerHTML = tasks.map((task) => this.itemMarkup(task)).join("");
            empty.hidden = tasks.length > 0;
            if (count) count.textContent = tasks.length;

            list.querySelectorAll("[data-task-id]").forEach((item) => {
                const id = item.dataset.taskId;
                item.querySelector(".today-check").addEventListener("click", () => this.toggle(id));
                item.querySelector(".today-remove").addEventListener("click", () => this.remove(id));
                const content = item.querySelector(".today-item-content");
                content.addEventListener("click", () => this.openEditor(id));
                content.addEventListener("keydown", (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        this.openEditor(id);
                    }
                });
            });

            this.bindDragAndDrop(list, period);
        },

        render() {
            this.renderSection("today", DOM.todayList, DOM.todayEmpty);
            this.renderSection("week", DOM.weekList, DOM.weekEmpty, DOM.weekCount);
            this.renderSection("month", DOM.monthList, DOM.monthEmpty, DOM.monthCount);

            const today = this.byPeriod("today");
            const completed = today.filter((task) => task.completed).length;
            const percentage = today.length ? Math.round((completed / today.length) * 100) : 0;

            DOM.todayTotal.textContent = today.length;
            DOM.todayCompleted.textContent = completed;
            DOM.todayPercentage.textContent = `${percentage}%`;

            let level = "critical";
            let gradient = "linear-gradient(90deg, #b91c1c, #dc2626)";
            let shadow = "0 4px 12px rgba(220, 38, 38, .26)";
            if (percentage > 10 && percentage <= 30) {
                level = "low";
                gradient = "linear-gradient(90deg, #dc2626, #f87171)";
                shadow = "0 4px 12px rgba(239, 68, 68, .22)";
            } else if (percentage > 30 && percentage <= 55) {
                level = "medium";
                gradient = "linear-gradient(90deg, #f97316, #facc15)";
                shadow = "0 4px 12px rgba(245, 158, 11, .24)";
            } else if (percentage > 55 && percentage < 90) {
                level = "good";
                gradient = "linear-gradient(90deg, #facc15, #84cc16)";
                shadow = "0 4px 12px rgba(132, 204, 22, .22)";
            } else if (percentage >= 90) {
                level = "excellent";
                gradient = "linear-gradient(90deg, #22c55e, #15803d)";
                shadow = "0 4px 12px rgba(34, 197, 94, .26)";
            }

            DOM.summaryProgressCard.dataset.progressLevel = level;
            requestAnimationFrame(() => {
                DOM.todayProgressFill.style.width = `${percentage}%`;
                DOM.todayProgressFill.style.background = gradient;
                DOM.todayProgressFill.style.boxShadow = shadow;
            });
            DOM.summaryProgressCard.classList.toggle("complete", Boolean(today.length && completed === today.length));
        },

        init() {
            DOM.addRoutineToDayButton.addEventListener("click", () => {
                RoutinePicker.render();
                Modal.open(DOM.routinePickerOverlay);
            });
            DOM.addSingleTaskButton.addEventListener("click", () => this.openForm());
            DOM.singleTaskForm.addEventListener("submit", (event) => {
                event.preventDefault();
                this.submitForm();
            });
            DOM.taskReminderEnabled.addEventListener("change", () => {
                DOM.reminderControls.hidden = !DOM.taskReminderEnabled.checked;
            });
            DOM.resetDayButton.addEventListener("click", () => {
                if (!this.byPeriod("today").length) return Toast.show("Minha lista já está vazia.");
                Modal.open(DOM.resetDayOverlay);
            });
            DOM.confirmResetDayButton.addEventListener("click", () => this.resetToday());

            document.querySelectorAll("[data-section-toggle]").forEach((button) => {
                button.addEventListener("click", () => {
                    const period = button.dataset.sectionToggle;
                    const content = document.querySelector(`[data-section-content="${period}"]`);
                    const expanded = button.getAttribute("aria-expanded") === "true";
                    button.setAttribute("aria-expanded", String(!expanded));
                    content.classList.toggle("collapsed", expanded);
                });
            });
            this.render();
        }
    };

    const Agenda = {
        scheduledTasks() {
            const now = Date.now();
            return State.data.tasks
                .filter((task) => {
                    const date = Utils.taskDateTime(task);
                    return !task.completed && date && date.getTime() > now;
                })
                .sort((a, b) => Utils.taskDateTime(a) - Utils.taskDateTime(b));
        },

        render() {
            const tasks = this.scheduledTasks();
            DOM.agendaEmpty.hidden = tasks.length > 0;
            const groups = new Map();
            tasks.forEach((task) => {
                if (!groups.has(task.dueDate)) groups.set(task.dueDate, []);
                groups.get(task.dueDate).push(task);
            });

            DOM.agendaList.innerHTML = [...groups.entries()].map(([date, items]) => `
                <section class="agenda-day">
                    <h3 class="agenda-day-title">${Utils.escape(Utils.formatAgendaDay(date))}</h3>
                    ${items.map((task) => `
                        <article class="agenda-item" role="button" tabindex="0" data-agenda-task-id="${Utils.escape(task.id)}" aria-label="Editar tarefa ${Utils.escape(task.title)}">
                            <time class="agenda-time">${Utils.escape(task.dueTime)}</time>
                            <div class="agenda-copy">
                                <strong>${Utils.escape(task.title)}</strong>
                                <small>${Utils.escape(task.source)}${task.reminder?.enabled ? ` · Lembrete ${task.reminder.minutes ? `${task.reminder.minutes} min antes` : "no horário"}` : " · Sem lembrete"}</small>
                            </div>
                            <span class="agenda-badge">${Utils.escape(Utils.periodLabel(task.period))}</span>
                        </article>
                    `).join("")}
                </section>
            `).join("");

            DOM.agendaList.querySelectorAll("[data-agenda-task-id]").forEach((item) => {
                const open = () => Tasks.openEditor(item.dataset.agendaTaskId);
                item.addEventListener("click", open);
                item.addEventListener("keydown", (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        open();
                    }
                });
            });
        },

        init() {
            clearInterval(State.agendaRefreshTimer);
            State.agendaRefreshTimer = setInterval(() => this.render(), 15000);
            addEventListener("focus", () => this.render());
            document.addEventListener("visibilitychange", () => {
                if (!document.hidden) this.render();
            });
        }
    };

    const Reminders = {
        triggerTime(task) {
            return Utils.reminderDateTime(task);
        },

        candidates() {
            return State.data.tasks
                .filter((task) => {
                    if (task.completed || !task.reminder?.enabled || task.reminder.notifiedAt) return false;
                    return Boolean(this.triggerTime(task));
                })
                .sort((a, b) => this.triggerTime(a) - this.triggerTime(b));
        },

        next() {
            return this.candidates().find((task) => this.triggerTime(task) > new Date()) || null;
        },

        renderNext() {
            const task = this.next();
            DOM.nextReminderCard.hidden = !task;
            if (!task) {
                DOM.nextReminderTitle.textContent = "Nenhum lembrete";
                DOM.nextReminderTime.textContent = "";
                return;
            }
            DOM.nextReminderTitle.textContent = task.title;
            DOM.nextReminderTime.textContent = `${Utils.formatDateTime(Utils.taskDateTime(task).toISOString())} · ${Utils.relativeReminderText(task)}`;
        },

        clearActiveReminder() {
            clearTimeout(State.reminderTimer);
            DOM.reminderToast.hidden = true;
            document.querySelectorAll(".reminder-due").forEach((element) => element.classList.remove("reminder-due"));
            State.currentReminderTaskId = null;
            this.renderNext();
            Agenda.render();
        },

        sound() {
            try {
                State.audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = State.audioContext.createOscillator();
                const gain = State.audioContext.createGain();
                oscillator.frequency.value = 740;
                gain.gain.setValueAtTime(.0001, State.audioContext.currentTime);
                gain.gain.exponentialRampToValueAtTime(.08, State.audioContext.currentTime + .02);
                gain.gain.exponentialRampToValueAtTime(.0001, State.audioContext.currentTime + .42);
                oscillator.connect(gain);
                gain.connect(State.audioContext.destination);
                oscillator.start();
                oscillator.stop(State.audioContext.currentTime + .45);
            } catch (_) {}
        },

        browserNotification(task) {
            if (!State.data.settings.notificationsEnabled) return;
            if (!("Notification" in window) || Notification.permission !== "granted") return;
            try {
                new Notification("Rotina", {
                    body: `${task.title} — ${Utils.relativeReminderText(task)}`,
                    tag: `rotina-${task.id}`
                });
            } catch (_) {}
        },

        fire(task) {
            task.reminder.notifiedAt = Utils.nowIso();
            task.reminder.snoozedUntil = null;
            Storage.save();
            State.currentReminderTaskId = task.id;
            DOM.reminderToastTitle.textContent = task.title;
            DOM.reminderToastMessage.textContent = Utils.relativeReminderText(task);
            DOM.reminderToast.hidden = false;
            document.querySelector(`[data-task-id="${CSS.escape(task.id)}"]`)?.classList.add("reminder-due");
            this.sound();
            this.browserNotification(task);
            Agenda.render();
            this.schedule();
        },

        check() {
            const now = new Date();
            const due = this.candidates().find((task) => this.triggerTime(task) <= now);
            if (due) this.fire(due);
            else this.schedule();
        },

        schedule() {
            clearTimeout(State.reminderTimer);
            if (State.currentReminderTaskId) {
                const current = State.data.tasks.find((task) => task.id === State.currentReminderTaskId);
                if (!current || current.completed || !current.reminder?.enabled) this.dismiss();
            }
            this.renderNext();
            Agenda.render();
            const task = this.next();
            if (!task) return;
            const delay = Math.max(this.triggerTime(task).getTime() - Date.now(), 0);
            State.reminderTimer = setTimeout(() => this.check(), Math.min(delay, 2147483000));
        },

        dismiss() {
            DOM.reminderToast.hidden = true;
            State.currentReminderTaskId = null;
        },

        snooze() {
            const task = State.data.tasks.find((item) => item.id === State.currentReminderTaskId);
            const due = task ? Utils.taskDateTime(task) : null;
            if (!task || !due) return this.dismiss();

            due.setMinutes(due.getMinutes() + 10);
            task.dueDate = Utils.dateKey(due);
            task.dueTime = Utils.timeKey(due);
            task.reminder.notifiedAt = null;
            task.reminder.snoozedUntil = null;
            this.dismiss();
            Tasks.sync({ toast: `Tarefa adiada para ${task.dueTime}.` });
        },

        openTask() {
            const id = State.currentReminderTaskId;
            this.dismiss();
            Navigation.show("today");
            requestAnimationFrame(() => Tasks.openEditor(id));
        },

        updatePermissionStatus() {
            DOM.enableNotificationsButton.disabled = false;
            if (!("Notification" in window)) {
                DOM.notificationStatus.textContent = "Notificações não suportadas neste navegador";
                DOM.notificationStatus.className = "notification-status blocked";
                DOM.enableNotificationsButton.textContent = "Não disponível";
                DOM.enableNotificationsButton.disabled = true;
                DOM.enableNotificationsButton.setAttribute("aria-pressed", "false");
                return;
            }

            if (Notification.permission === "denied") {
                State.data.settings.notificationsEnabled = false;
                DOM.notificationStatus.textContent = "Notificações bloqueadas nas configurações do navegador";
                DOM.notificationStatus.className = "notification-status blocked";
                DOM.enableNotificationsButton.textContent = "Bloqueadas no navegador";
                DOM.enableNotificationsButton.disabled = true;
                DOM.enableNotificationsButton.setAttribute("aria-pressed", "false");
                return;
            }

            const enabled = Notification.permission === "granted" && State.data.settings.notificationsEnabled;
            DOM.notificationStatus.textContent = enabled
                ? "Notificações ativadas — avisos do sistema permitidos"
                : Notification.permission === "granted"
                    ? "Notificações desativadas — avisos apenas dentro do Rotina"
                    : "Notificações desativadas — permissão ainda não concedida";
            DOM.notificationStatus.className = `notification-status ${enabled ? "enabled" : "disabled"}`;
            DOM.enableNotificationsButton.textContent = enabled ? "Desativar notificações" : "Ativar notificações";
            DOM.enableNotificationsButton.classList.toggle("active", enabled);
            DOM.enableNotificationsButton.setAttribute("aria-pressed", String(enabled));
        },

        async togglePermission() {
            if (!("Notification" in window)) return Toast.show("Este navegador não oferece notificações do sistema.");
            if (Notification.permission === "denied") {
                this.updatePermissionStatus();
                return Toast.show("Libere as notificações nas configurações do navegador.");
            }

            if (Notification.permission === "granted") {
                State.data.settings.notificationsEnabled = !State.data.settings.notificationsEnabled;
                Storage.save();
                this.updatePermissionStatus();
                Toast.show(State.data.settings.notificationsEnabled ? "Notificações ativadas." : "Notificações desativadas.");
                return;
            }

            try {
                const permission = await Notification.requestPermission();
                State.data.settings.notificationsEnabled = permission === "granted";
                Storage.save();
                this.updatePermissionStatus();
                Toast.show(permission === "granted" ? "Notificações ativadas." : "Os avisos continuarão aparecendo apenas dentro do Rotina.");
            } catch (_) {
                Toast.show("Não foi possível alterar a permissão de notificações.");
            }
        },

        init() {
            DOM.reminderDismissButton.addEventListener("click", () => this.dismiss());
            DOM.reminderSnoozeButton.addEventListener("click", () => this.snooze());
            DOM.reminderOpenButton.addEventListener("click", () => this.openTask());
            DOM.openAgendaButton.addEventListener("click", () => Navigation.show("agenda"));
            DOM.enableNotificationsButton.addEventListener("click", () => this.togglePermission());
            this.updatePermissionStatus();
            this.schedule();
            document.addEventListener("visibilitychange", () => { if (!document.hidden) this.check(); });
            clearInterval(State.notificationRefreshTimer);
            State.notificationRefreshTimer = setInterval(() => { this.check(); this.updatePermissionStatus(); }, 15000);
        }
    };

    const Settings = {
        saveName() {
            const name = DOM.settingsNameInput.value.trim();
            if (!name) return DOM.settingsNameInput.focus();
            State.data.profile.name = name;
            Storage.save();
            Profile.render();
            Toast.show("Nome atualizado com sucesso.");
        },

        openReset() {
            DOM.resetApplicationAcknowledge.checked = false;
            DOM.confirmResetApplicationButton.disabled = true;
            Modal.open(DOM.resetApplicationOverlay);
        },

        resetApplication() {
            if (!DOM.resetApplicationAcknowledge.checked) return;

            clearTimeout(State.reminderTimer);
            Reminders.clearActiveReminder();
            localStorage.removeItem(STORAGE_KEY);
            State.data = Storage.defaultData();
            State.activeRoutineId = null;
            State.editingTaskId = null;
            State.pendingDeleteRoutineId = null;

            document.querySelectorAll(".modal-overlay.open").forEach((overlay) => Modal.close(overlay));
            Drawer.close();
            Cards.render();
            Tasks.render();
            RoutinePicker.render();
            Profile.render();
            Agenda.render();
            Reminders.updatePermissionStatus();
            Reminders.schedule();
            Navigation.show("today");

            DOM.welcomeName.value = "";
            Modal.open(DOM.welcomeOverlay);
            requestAnimationFrame(() => DOM.welcomeName.focus());
            Toast.show("O aplicativo foi restaurado ao estado inicial.");
        },

        init() {
            DOM.settingsNameForm?.addEventListener("submit", (event) => {
                event.preventDefault();
                this.saveName();
            });
            DOM.resetApplicationButton?.addEventListener("click", () => this.openReset());
            DOM.resetApplicationAcknowledge?.addEventListener("change", () => {
                DOM.confirmResetApplicationButton.disabled = !DOM.resetApplicationAcknowledge.checked;
            });
            DOM.confirmResetApplicationButton?.addEventListener("click", () => this.resetApplication());
        }
    };

    const App = {
        init() {
            State.data = Storage.load();

            Modal.init();
            Sidebar.init();
            Cards.render();
            Carousel.init();
            Drawer.init();
            RoutineDeletion.init();
            Tasks.init();
            RoutinePicker.render();
            Profile.init();
            Agenda.render();
            Agenda.init();
            Reminders.init();
            Settings.init();
            Navigation.init();

            addEventListener("keydown", (event) => {
                if (event.key === "Escape") {
                    const modal = document.querySelector(".modal-overlay.open:not(#welcomeOverlay)");
                    if (modal) Modal.close(modal);
                    else if (DOM.overlay.classList.contains("open")) Drawer.close();
                    else Sidebar.close();
                }

                if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s" && DOM.overlay.classList.contains("open")) {
                    event.preventDefault();
                    Drawer.save();
                }
            });

            addEventListener("resize", () => {
                if (innerWidth > 900) Sidebar.close();
                Carousel.refresh();
            });
        }
    };

    App.init();
})();

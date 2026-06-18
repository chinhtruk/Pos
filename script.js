"use strict";

/*
 * FEATURE TOGGLE — ĐẶT BÀN
 * Bỏ comment dòng `true ||` bên dưới để bật lại toàn bộ phần Đặt bàn.
 */
const RESERVATION_FEATURE_ENABLED =
  // true ||
  false;

document.documentElement.classList.toggle("reservations-disabled", !RESERVATION_FEATURE_ENABLED);

const createPlaceholder = (label, background, accent, symbol) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="${background}"/><circle cx="650" cy="110" r="130" fill="${accent}" opacity=".22"/><path d="M70 530c135-145 250-150 370-44 100 88 198 82 310-25v139H70z" fill="${accent}" opacity=".15"/><text x="400" y="345" text-anchor="middle" font-family="Georgia,serif" font-size="160" fill="${accent}">${symbol}</text><text x="42" y="64" font-family="Arial,sans-serif" font-size="22" font-weight="700" letter-spacing="5" fill="${accent}" opacity=".7">MỘC COFFEE</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const menuItems = [
  { id: 1, name: "Espresso", category: "Cà phê máy", price: 35000, image: createPlaceholder("Espresso", "#e9dfd2", "#68493a", "◉") },
  { id: 2, name: "Cappuccino", category: "Cà phê máy", price: 49000, image: createPlaceholder("Cappuccino", "#e7e5dc", "#756456", "☁") },
  { id: 3, name: "Caramel Macchiato", category: "Cà phê máy", price: 59000, image: createPlaceholder("Caramel Macchiato", "#eadcc8", "#9a6545", "≈") },
  { id: 4, name: "Cà Phê Sữa Đá", category: "Cà phê truyền thống", price: 39000, image: createPlaceholder("Cà Phê Sữa Đá", "#ddd5c8", "#574439", "▥") },
  { id: 5, name: "Bạc Xỉu", category: "Cà phê truyền thống", price: 42000, image: createPlaceholder("Bạc Xỉu", "#ebe3d7", "#93745d", "◒") },
  { id: 6, name: "Cà Phê Muối", category: "Cà phê truyền thống", price: 45000, image: createPlaceholder("Cà Phê Muối", "#dedfd6", "#6a6c5e", "≋") },
  { id: 7, name: "Trà Đào Cam Sả", category: "Trà", price: 52000, image: createPlaceholder("Trà Đào Cam Sả", "#eee0ce", "#b56d43", "✦") },
  { id: 8, name: "Trà Sen Vàng", category: "Trà", price: 55000, image: createPlaceholder("Trà Sen Vàng", "#e6e4cd", "#7b8058", "✿") },
  { id: 9, name: "Trà Oolong Vải", category: "Trà", price: 52000, image: createPlaceholder("Trà Oolong Vải", "#eee1df", "#9b6363", "●") },
  { id: 10, name: "Croissant Bơ", category: "Bánh ngọt", price: 42000, image: createPlaceholder("Croissant Bơ", "#ece0c9", "#a57845", "☾") },
  { id: 11, name: "Tiramisu", category: "Bánh ngọt", price: 58000, image: createPlaceholder("Tiramisu", "#e1d8ce", "#6e5144", "▰") },
  { id: 12, name: "Basque Cheesecake", category: "Bánh ngọt", price: 62000, image: createPlaceholder("Basque Cheesecake", "#ede3d2", "#9a7149", "△") }
];

const tables = [
  { id: "A01", seats: 2, status: "available", detail: "Sẵn sàng" }, { id: "A02", seats: 2, status: "occupied", detail: "42 phút · 168K" },
  { id: "A03", seats: 4, status: "reserved", detail: "Đặt lúc 10:30" }, { id: "A04", seats: 4, status: "available", detail: "Sẵn sàng" },
  { id: "B05", seats: 4, status: "occupied", detail: "18 phút · 104K" }, { id: "B06", seats: 6, status: "available", detail: "Sẵn sàng" },
  { id: "B07", seats: 6, status: "occupied", detail: "25 phút · 252K" }, { id: "B08", seats: 2, status: "reserved", detail: "Đặt lúc 11:00" },
  { id: "C09", seats: 2, status: "available", detail: "Sẵn sàng" }, { id: "C10", seats: 4, status: "occupied", detail: "9 phút · 84K" },
  { id: "C11", seats: 4, status: "available", detail: "Sẵn sàng" }, { id: "C12", seats: 8, status: "occupied", detail: "51 phút · 426K" }
];

let orders = [
  { id: "MC-1048", table: "A02", type: "Tại bàn", time: "14:22", status: "Đang pha", payment: "Tiền mặt", total: 168000, customer: "Khách lẻ", items: [{ name: "Cappuccino", quantity: 2, price: 49000 }, { name: "Croissant Bơ", quantity: 1, price: 42000 }] },
  { id: "MC-1047", table: "B07", type: "Tại bàn", time: "14:10", status: "Sẵn sàng", payment: "Chuyển khoản", total: 252000, customer: "Thu Hà", items: [{ name: "Cà Phê Sữa Đá", quantity: 3, price: 39000 }, { name: "Trà Sen Vàng", quantity: 1, price: 55000 }, { name: "Tiramisu", quantity: 1, price: 58000 }] },
  { id: "MC-1046", table: "—", type: "Mang đi", time: "13:58", status: "Đang pha", payment: "Thẻ", total: 94000, customer: "Minh Khoa", items: [{ name: "Cà Phê Muối", quantity: 1, price: 45000 }, { name: "Cappuccino", quantity: 1, price: 49000 }] },
  { id: "MC-1045", table: "C10", type: "Tại bàn", time: "13:42", status: "Chưa kết thúc", payment: "Tiền mặt", total: 136000, customer: "Khách lẻ", items: [{ name: "Bạc Xỉu", quantity: 2, price: 42000 }, { name: "Trà Đào Cam Sả", quantity: 1, price: 52000 }] },
  { id: "MC-1044", table: "B05", type: "Tại bàn", time: "13:25", status: "Chưa kết thúc", payment: "Chuyển khoản", total: 104000, customer: "Khách lẻ", items: [{ name: "Trà Đào Cam Sả", quantity: 2, price: 52000 }] },
  { id: "MC-1043", table: "—", type: "Mang đi", time: "13:10", status: "Đã hủy", payment: "Tiền mặt", total: 39000, customer: "Quốc Anh", items: [{ name: "Cà Phê Sữa Đá", quantity: 1, price: 39000 }] }
];

const sessionItem = (id, quantity) => ({ ...menuItems.find((item) => item.id === id), quantity });
let tableSessions = {
  A02: { id: "MC-1048", items: [sessionItem(2, 2), sessionItem(10, 1)], paid: false, payment: "Tiền mặt", note: "Cappuccino ít bọt", openedAt: "14:22" },
  B05: { id: "MC-1044", items: [sessionItem(7, 2)], paid: true, payment: "Chuyển khoản", note: "", openedAt: "13:25", paidAt: "14:05" },
  B07: { id: "MC-1047", items: [sessionItem(4, 3), sessionItem(8, 1), sessionItem(11, 1)], paid: false, payment: "Chuyển khoản", note: "Mang bánh ra sau", openedAt: "14:10" },
  C10: { id: "MC-1045", items: [sessionItem(5, 2), sessionItem(7, 1)], paid: true, payment: "Tiền mặt", note: "", openedAt: "13:42", paidAt: "14:18" },
  C12: { id: "MC-1042", items: [sessionItem(3, 2), sessionItem(6, 2), sessionItem(12, 2)], paid: false, payment: "Tiền mặt", note: "Bàn họp nhóm", openedAt: "13:50" }
};
Object.entries(tableSessions).forEach(([tableId, session]) => {
  const table = tables.find((item) => item.id === tableId);
  if (table && session.paid) table.detail = "Đã thanh toán · khách còn ngồi";
});

let reservations = [
  { id: 1, name: "Phương Linh", phone: "0901 882 345", date: "2026-06-18", time: "10:30", guests: 4, table: "A03", status: "Đã xác nhận", note: "Bàn gần cửa sổ" },
  { id: 2, name: "Hoàng Nam", phone: "0938 445 210", date: "2026-06-18", time: "11:00", guests: 2, table: "B08", status: "Đã xác nhận", note: "" },
  { id: 3, name: "Gia đình chị Mai", phone: "0987 220 115", date: "2026-06-18", time: "12:15", guests: 6, table: "B06", status: "Chờ xác nhận", note: "Có 2 trẻ em" },
  { id: 4, name: "Anh Dũng", phone: "0912 773 488", date: "2026-06-18", time: "18:30", guests: 4, table: "C11", status: "Đã xác nhận", note: "Sinh nhật" },
  { id: 5, name: "Thanh Trúc", phone: "0909 125 682", date: "2026-06-19", time: "09:00", guests: 2, table: "A01", status: "Đã xác nhận", note: "" },
  { id: 6, name: "Nhóm thiết kế", phone: "0932 888 710", date: "2026-06-19", time: "14:00", guests: 8, table: "C12", status: "Chờ xác nhận", note: "Cần ổ điện" }
];

let notifications = [
  { id: 1, icon: "fa-mug-hot", title: "Đơn MC-1047 đã sẵn sàng", body: "Bàn B07 · 5 món", time: "2 phút trước", read: false },
  { id: 2, icon: "fa-calendar-check", title: "Lịch đặt bàn sắp tới", body: "Phương Linh · Bàn A03 lúc 10:30", time: "8 phút trước", read: false },
  { id: 3, icon: "fa-box", title: "Sắp hết hạt Arabica", body: "Tồn kho còn dưới mức cảnh báo", time: "24 phút trước", read: false },
  { id: 4, icon: "fa-circle-check", title: "Đã thanh toán MC-1045", body: "136,000 VND · Tiền mặt", time: "45 phút trước", read: true }
];

const categories = ["Tất cả", "Cà phê máy", "Cà phê truyền thống", "Trà", "Bánh ngọt"];
const TAX_RATE = 0.08;
const viewTitles = { dashboard: "Tổng quan", sales: "Bán hàng", orders: "Đơn hàng", tables: "Sơ đồ bàn", reservations: "Đặt bàn", settings: "Cài đặt" };
let activeView = "sales", activeCategory = "Tất cả", searchTerm = "", tableZoneFilter = "all", selectedTableId = "B05", managedTableId = "B05";
let orderType = "Tại bàn", paymentMethod = "Tiền mặt", cart = [], orderNote = "", orderSequence = 1049, selectedOrderId = null;
let orderFilter = "Tất cả", orderSearch = "", tableFilter = "all", reservationFilter = "Tất cả", reservationSearch = "", shiftOpen = true;
let storeSettings = { name: "Mộc Coffee", branch: "Chi nhánh Nguyễn Huệ", address: "42 Nguyễn Huệ, Quận 1, TP.HCM", phone: "028 3822 4688", tax: 8, print: true, sound: true, stock: true };

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const elements = {
  workspace: $(".workspace"), tableGrid: $("#tableGrid"), tableZoneFilters: $("#tableZoneFilters"), categoryFilters: $("#categoryFilters"), menuGrid: $("#menuGrid"), menuCount: $("#menuCount"), menuSearch: $("#menuSearch"),
  selectedTableLabel: $("#selectedTableLabel"), cartItems: $("#cartItems"), subtotal: $("#subtotal"), tax: $("#tax"), grandTotal: $("#grandTotal"), checkoutTotal: $("#checkoutTotal"), checkoutButton: $("#checkoutButton"), endSessionButton: $("#endSessionButton"), sessionStatus: $("#sessionStatus"), mobileCartBadge: $("#mobileCartBadge"), orderAlert: $("#orderAlert"), orderTypeTabs: $("#orderTypeTabs"), paymentMethods: $("#paymentMethods"), orderNumber: $("#orderNumber"), newOrderButton: $("#newOrderButton"),
  bookingForm: $("#bookingForm"), bookingDate: $("#bookingDate"), bookingTime: $("#bookingTime"), bookingTable: $("#bookingTable"), phone: $("#phone"), notes: $("#notes"), notesCount: $("#notesCount"),
  toast: $("#appToast"), toastTitle: $("#toastTitle"), toastMessage: $("#toastMessage"), statusMessage: $("#statusMessage"), reservationCount: $("#reservationCount"),
  dashboard: $("#dashboardContent"), orders: $("#ordersContent"), tables: $("#tablesContent"), reservations: $("#reservationsContent"), settings: $("#settingsContent"),
  tablePickerGrid: $("#tablePickerGrid"), orderNoteInput: $("#orderNoteInput"), orderNoteLabel: $("#orderNoteLabel"), orderDetailBody: $("#orderDetailBody"), advanceOrderButton: $("#advanceOrderButton"),
  notificationList: $("#notificationList"), mobileTicketButton: $(".mobile-ticket-button")
};

const formatVND = (value) => `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value)} VND`;
const escapeHTML = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
const announce = (message) => { elements.statusMessage.textContent = ""; setTimeout(() => { elements.statusMessage.textContent = message; }, 30); };
const showToast = (title, message) => { elements.toastTitle.textContent = title; elements.toastMessage.textContent = message; bootstrap.Toast.getOrCreateInstance(elements.toast, { delay: 3200 }).show(); announce(`${title}. ${message}`); };
const statusClass = (status) => ({ "Đang pha": "preparing", "Sẵn sàng": "ready", "Chưa kết thúc": "seated", "Hoàn tất": "done", "Đã hủy": "cancelled", "Đã xác nhận": "confirmed", "Chờ xác nhận": "pending", "Đã nhận bàn": "seated" })[status] || "pending";
const tableStatusText = (status) => ({ available: "Trống", occupied: "Đang dùng", reserved: "Đã đặt" })[status];
const todayISO = () => { const now = new Date(); return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split("T")[0]; };

function switchView(view) {
  if (!viewTitles[view]) return;
  if (view === "reservations" && !RESERVATION_FEATURE_ENABLED) return;
  activeView = view;
  $$('[data-view-panel]').forEach((panel) => panel.classList.toggle("d-none", panel.dataset.viewPanel !== view));
  $$('[data-view]').forEach((button) => { const active = button.dataset.view === view; button.classList.toggle("active", active); if (active) button.setAttribute("aria-current", "page"); else button.removeAttribute("aria-current"); });
  elements.workspace.classList.toggle("module-mode", view !== "sales");
  elements.mobileTicketButton.classList.toggle("d-none", view !== "sales");
  document.title = `Mộc POS | ${viewTitles[view]}`;
  renderModule(view);
  const mobileNav = bootstrap.Offcanvas.getInstance($("#mobileNav")); mobileNav?.hide();
  announce(`Đã mở ${viewTitles[view]}.`);
}

function renderModule(view) {
  if (view === "dashboard") renderDashboard();
  if (view === "orders") renderOrders();
  if (view === "tables") renderTableManagement();
  if (view === "reservations") renderReservations();
  if (view === "settings") renderSettings();
}

const moduleHeader = (kicker, title, copy, actions = "") => `<div class="module-header"><div><p>${kicker}</p><h1>${title}</h1><span>${copy}</span></div><div class="module-actions">${actions}</div></div>`;

const getSessionTotals = (session) => {
  const subtotal = session.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  return { subtotal, tax, total: subtotal + tax };
};

function setOrderControls() {
  const session = orderType === "Tại bàn" ? tableSessions[selectedTableId] : null;
  const paid = Boolean(session?.paid);
  elements.sessionStatus.hidden = !paid;
  elements.sessionStatus.innerHTML = paid ? `<div><i class="fa-solid fa-check"></i><span><strong>Đã thanh toán · Khách vẫn đang ngồi</strong><small>Đơn chưa kết thúc — bàn ${selectedTableId} vẫn đang sử dụng</small></span></div>` : "";
  elements.checkoutButton.hidden = paid;
  elements.endSessionButton.hidden = !paid;
  elements.paymentMethods.hidden = paid;
  $(".order-note").disabled = paid;
  $$('[data-order-type]').forEach((button) => { button.disabled = Boolean(session); });
}

function syncCurrentSession() {
  if (orderType !== "Tại bàn") return;
  let session = tableSessions[selectedTableId];
  if (!session && !cart.length) return;
  if (!session) {
    session = { id: `MC-${orderSequence}`, items: [], paid: false, payment: paymentMethod, note: orderNote, openedAt: new Intl.DateTimeFormat("vi-VN", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()) };
    tableSessions[selectedTableId] = session;
    orderSequence += 1;
    elements.orderNumber.textContent = `#${session.id}`;
  }
  if (session.paid) return;
  session.items = cart.map((item) => ({ ...item }));
  session.payment = paymentMethod;
  session.note = orderNote;
  const totals = getSessionTotals(session);
  const table = tables.find((item) => item.id === selectedTableId);
  if (table) { table.status = "occupied"; table.detail = `${cart.reduce((sum, item) => sum + item.quantity, 0)} món · ${new Intl.NumberFormat("en-US").format(totals.total)}₫`; }
  let order = orders.find((item) => item.id === session.id);
  if (!order) {
    order = { id: session.id, table: selectedTableId, type: "Tại bàn", time: session.openedAt, status: "Đang pha", payment: paymentMethod, total: totals.total, customer: "Khách lẻ", items: [] };
    orders.unshift(order);
  }
  order.items = session.items.map((item) => ({ name: item.name, quantity: item.quantity, price: item.price }));
  order.total = totals.total;
  order.payment = paymentMethod;
  order.note = orderNote;
  renderTables();
}

function selectTableForOrder(tableId, notify = false) {
  selectedTableId = tableId;
  orderType = "Tại bàn";
  const session = tableSessions[tableId];
  if (session) {
    cart = session.items.map((item) => ({ ...item }));
    orderNote = session.note || "";
    paymentMethod = session.payment || "Tiền mặt";
    elements.orderNumber.textContent = `#${session.id}`;
  } else {
    cart = [];
    orderNote = "";
    paymentMethod = "Tiền mặt";
    elements.orderNumber.textContent = `#MC-${orderSequence}`;
  }
  elements.orderNoteInput.value = orderNote;
  elements.orderNoteLabel.textContent = orderNote ? "Đã thêm ghi chú" : "Thêm ghi chú cho đơn";
  elements.orderAlert.innerHTML = "";
  $$('[data-order-type]').forEach((button) => { const active = button.dataset.orderType === "Tại bàn"; button.classList.toggle("active", active); button.setAttribute("aria-pressed", active); });
  $$('[data-payment]').forEach((button) => { const active = button.dataset.payment === paymentMethod; button.classList.toggle("active", active); button.setAttribute("aria-pressed", active); });
  renderTables();
  renderCart();
  setOrderControls();
  if (notify) showToast(session ? "Đã tải order của bàn" : "Đã chọn bàn", session ? `Bàn ${tableId} · ${cart.reduce((sum, item) => sum + item.quantity, 0)} món${session.paid ? " · Đã thanh toán" : ""}` : `Bắt đầu order mới tại bàn ${tableId}.`);
}

function endTableSession() {
  const session = tableSessions[selectedTableId];
  if (!session?.paid) return;
  const order = orders.find((item) => item.id === session.id);
  if (order) order.status = "Hoàn tất";
  const table = tables.find((item) => item.id === selectedTableId);
  if (table) { table.status = "available"; table.detail = "Sẵn sàng"; }
  const finishedTable = selectedTableId;
  delete tableSessions[selectedTableId];
  cart = [];
  orderNote = "";
  paymentMethod = "Tiền mặt";
  elements.orderNumber.textContent = `#MC-${orderSequence}`;
  elements.orderAlert.innerHTML = `<div class="alert"><i class="fa-solid fa-door-open me-1"></i> Đơn đã kết thúc · Bàn đã trống</div>`;
  renderCart();
  renderTables();
  setOrderControls();
  if (activeView === "orders") renderOrders();
  showToast("Đã kết thúc phiên bàn", `Khách đã rời bàn ${finishedTable}. Bàn hiện sẵn sàng.`);
}

function renderDashboard() {
  const completed = orders.filter((order) => order.status === "Hoàn tất");
  const revenue = 4820000 + completed.reduce((sum, order) => sum + order.total, 0);
  const activeOrders = orders.filter((order) => ["Đang pha", "Sẵn sàng"].includes(order.status)).length;
  const itemCounts = {};
  orders.forEach((order) => order.items.forEach((item) => { itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity; }));
  const popular = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]).slice(0, 4);
  elements.dashboard.innerHTML = `${moduleHeader("Ca làm việc hiện tại", "Tổng quan ca", "Thông tin vận hành cần thiết cho nhân viên tại quầy", `<button class="btn btn-light-action" data-view="orders"><i class="fa-solid fa-receipt"></i> Điều phối đơn</button><button class="btn btn-primary-action" data-view="sales"><i class="fa-solid fa-plus"></i> Tạo đơn</button>`)}
    <div class="module-kpis"><article><span class="stat-icon green"><i class="fa-solid fa-wallet"></i></span><div><small>Doanh thu hôm nay</small><strong>${formatVND(revenue)}</strong><em>+12.50% so với hôm qua</em></div></article><article><span class="stat-icon brown"><i class="fa-solid fa-fire-burner"></i></span><div><small>Đơn đang xử lý</small><strong>${activeOrders} đơn</strong><em>${orders.length} đơn trong ca</em></div></article><article><span class="stat-icon gold"><i class="fa-solid fa-chair"></i></span><div><small>Công suất bàn</small><strong>${tables.filter((t) => t.status === "occupied").length}/12 bàn</strong><em>${tables.filter((t) => t.status === "reserved").length} bàn đã đặt</em></div></article>${RESERVATION_FEATURE_ENABLED ? `<article><span class="stat-icon blue"><i class="fa-solid fa-user-group"></i></span><div><small>Lịch đặt sắp tới</small><strong>${reservations.filter((r) => !["Đã hủy", "Đã nhận bàn"].includes(r.status)).length} lịch</strong><em>Khung giờ cao điểm 18:00</em></div></article>` : ""}</div>
    <div class="dashboard-grid"><section class="module-card revenue-card"><div class="card-heading"><div><h2>Doanh thu theo giờ</h2><p>Cập nhật đến thời điểm hiện tại</p></div><span class="soft-badge">Hôm nay</span></div><div class="bar-chart">${[28,35,48,42,64,78,70,88,62,76,52,38].map((height, index) => `<div><span style="height:${height}%" title="${height * 18000} VND"></span><small>${7 + index}h</small></div>`).join("")}</div></section>
    <section class="module-card"><div class="card-heading"><div><h2>Món bán chạy</h2><p>Theo số lượng trong ca</p></div></div><div class="popular-list">${popular.map(([name, quantity], index) => `<div><b>${index + 1}</b><span><strong>${name}</strong><small>${quantity} món đã bán</small></span><em>${Math.max(18, 100 - index * 17)}%</em></div>`).join("")}</div></section></div>
    <section class="module-card mt-3"><div class="card-heading"><div><h2>Đơn hàng gần đây</h2><p>Hoạt động mới nhất tại quầy</p></div><button class="text-button" data-view="orders">Xem tất cả <i class="fa-solid fa-arrow-right"></i></button></div>${renderOrderTable(orders.slice(0, 5))}</section>`;
}

function renderOrderTable(list) {
  if (!list.length) return `<div class="module-empty"><i class="fa-solid fa-receipt"></i><h3>Không có đơn phù hợp</h3><p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p></div>`;
  return `<div class="responsive-table"><table><thead><tr><th>Mã đơn</th><th>Bàn / Loại</th><th>Khách hàng</th><th>Thời gian</th><th>Trạng thái</th><th>Tổng tiền</th><th></th></tr></thead><tbody>${list.map((order) => `<tr><td><strong>#${order.id}</strong></td><td>${order.table === "—" ? order.type : `Bàn ${order.table}`}</td><td>${escapeHTML(order.customer)}</td><td>${order.time}</td><td><span class="status-pill ${statusClass(order.status)}">${order.status}</span></td><td><strong>${formatVND(order.total)}</strong></td><td><button class="row-action" type="button" data-order-id="${order.id}" aria-label="Xem đơn ${order.id}"><i class="fa-solid fa-chevron-right"></i></button></td></tr>`).join("")}</tbody></table></div>`;
}

function renderOrders() {
  const filtered = orders.filter((order) => (orderFilter === "Tất cả" || order.status === orderFilter) && `${order.id} ${order.customer} ${order.table}`.toLocaleLowerCase("vi").includes(orderSearch.toLocaleLowerCase("vi")));
  const counts = { all: orders.length, preparing: orders.filter((o) => o.status === "Đang pha").length, ready: orders.filter((o) => o.status === "Sẵn sàng").length, open: orders.filter((o) => o.status === "Chưa kết thúc").length, done: orders.filter((o) => o.status === "Hoàn tất").length };
  const lanes = [
    { status: "Đang pha", title: "Đang pha chế", icon: "fa-fire-burner", copy: "Cần thực hiện" },
    { status: "Sẵn sàng", title: "Sẵn sàng", icon: "fa-bell-concierge", copy: "Chờ mang ra" },
    { status: "Chưa kết thúc", title: "Khách còn ngồi", icon: "fa-chair", copy: "Đã thanh toán" },
    { status: "Hoàn tất", title: "Đã hoàn tất", icon: "fa-circle-check", copy: "Trong ca" }
  ].filter((lane) => orderFilter === "Tất cả" || lane.status === orderFilter);
  const renderTicket = (order) => `<article class="pos-ticket ${statusClass(order.status)}" data-order-id="${order.id}" tabindex="0"><div class="pos-ticket-head"><span><small>#${order.id}</small><strong>${order.table === "—" ? order.type : `Bàn ${order.table}`}</strong></span><time>${order.time}</time></div><div class="pos-ticket-items">${order.items.slice(0, 2).map((item) => `<span><b>${item.quantity}×</b> ${escapeHTML(item.name)}</span>`).join("")}${order.items.length > 2 ? `<small>+${order.items.length - 2} món khác</small>` : ""}</div><div class="pos-ticket-foot"><span>${order.items.reduce((sum, item) => sum + item.quantity, 0)} món</span><strong>${formatVND(order.total)}</strong><button type="button" data-order-id="${order.id}" aria-label="Xem đơn ${order.id}"><i class="fa-solid fa-chevron-right"></i></button></div></article>`;
  elements.orders.innerHTML = `${moduleHeader("Màn hình điều phối", "Đơn hàng", "Theo dõi order theo từng bước phục vụ", `<button class="btn btn-primary-action" data-view="sales"><i class="fa-solid fa-plus"></i> Tạo đơn mới</button>`)}
    <div class="order-summary-strip"><button data-order-filter="Tất cả" class="${orderFilter === "Tất cả" ? "active" : ""}"><span>Tất cả</span><strong>${counts.all}</strong></button><button data-order-filter="Đang pha" class="${orderFilter === "Đang pha" ? "active" : ""}"><span>Đang pha</span><strong>${counts.preparing}</strong></button><button data-order-filter="Sẵn sàng" class="${orderFilter === "Sẵn sàng" ? "active" : ""}"><span>Sẵn sàng</span><strong>${counts.ready}</strong></button><button data-order-filter="Chưa kết thúc" class="${orderFilter === "Chưa kết thúc" ? "active" : ""}"><span>Khách còn ngồi</span><strong>${counts.open}</strong></button><button data-order-filter="Hoàn tất" class="${orderFilter === "Hoàn tất" ? "active" : ""}"><span>Hoàn tất</span><strong>${counts.done}</strong></button></div>
    <section class="module-card order-control-bar"><div class="module-toolbar"><div class="module-search"><i class="fa-solid fa-magnifying-glass"></i><input id="ordersSearch" type="search" value="${escapeHTML(orderSearch)}" placeholder="Tìm mã đơn hoặc bàn..."></div><select id="ordersStatusFilter" class="compact-select"><option>Tất cả</option><option>Đang pha</option><option>Sẵn sàng</option><option>Chưa kết thúc</option><option>Hoàn tất</option><option>Đã hủy</option></select><span><i class="fa-solid fa-rotate"></i> Cập nhật tức thời · ${filtered.length} đơn</span></div></section>
    <div class="order-board">${lanes.map((lane) => { const laneOrders = filtered.filter((order) => order.status === lane.status); return `<section class="order-lane ${statusClass(lane.status)}"><header><span class="lane-icon"><i class="fa-solid ${lane.icon}"></i></span><span><strong>${lane.title}</strong><small>${lane.copy}</small></span><b>${laneOrders.length}</b></header><div class="order-lane-list">${laneOrders.length ? laneOrders.map(renderTicket).join("") : `<div class="lane-empty"><i class="fa-regular fa-circle-check"></i><span>Không có đơn</span></div>`}</div></section>`; }).join("")}${orderFilter === "Đã hủy" ? `<section class="order-lane cancelled"><header><span class="lane-icon"><i class="fa-solid fa-ban"></i></span><span><strong>Đã hủy</strong><small>Lịch sử trong ca</small></span><b>${filtered.length}</b></header><div class="order-lane-list">${filtered.length ? filtered.map(renderTicket).join("") : `<div class="lane-empty"><span>Không có đơn</span></div>`}</div></section>` : ""}</div>`;
  $("#ordersStatusFilter").value = orderFilter;
}

function renderTableManagement() {
  const filtered = tables.filter((table) => tableFilter === "all" || table.status === tableFilter);
  const selected = tables.find((table) => table.id === managedTableId) || tables[0];
  const bookingHeaderAction = RESERVATION_FEATURE_ENABLED ? `<button class="btn btn-light-action" data-bs-toggle="modal" data-bs-target="#bookingModal"><i class="fa-regular fa-calendar-plus"></i> Đặt bàn</button>` : "";
  const bookingTableAction = RESERVATION_FEATURE_ENABLED ? `<button class="btn btn-light-action" data-table-action="reserve" data-table-id="${selected.id}">Tạo lịch đặt</button>` : "";
  const zones = [{ id: "A", name: "Khu cửa sổ" }, { id: "B", name: "Khu trung tâm" }, { id: "C", name: "Khu yên tĩnh" }];
  const renderFloorTable = (table) => `<button class="floor-table ${table.status}${table.id === managedTableId ? " selected" : ""}${table.seats >= 6 ? " large" : ""}" data-manage-table="${table.id}" aria-label="Bàn ${table.id}, ${table.seats} chỗ, ${tableStatusText(table.status)}"><span class="floor-table-head"><strong>${table.id}</strong><em>${tableStatusText(table.status)}</em></span><span class="floor-table-seats"><i class="fa-solid fa-user-group"></i> ${table.seats}</span><small>${table.detail}</small></button>`;
  elements.tables.innerHTML = `${moduleHeader("Mặt bằng phục vụ", "Sơ đồ bàn", "Chạm vào bàn để xem hoặc tiếp tục order", `${bookingHeaderAction}<button class="btn btn-primary-action" data-table-action="start" data-table-id="${selected.id}"><i class="fa-solid fa-cash-register"></i> Mở order</button>`)}
    <div class="table-management-layout pos-floor-layout"><section class="module-card floor-plan-shell"><div class="floor-toolbar"><div class="segmented-filter"><button class="${tableFilter === "all" ? "active" : ""}" data-table-filter="all">Tất cả ${tables.length}</button><button class="${tableFilter === "available" ? "active" : ""}" data-table-filter="available">Trống ${tables.filter((t) => t.status === "available").length}</button><button class="${tableFilter === "occupied" ? "active" : ""}" data-table-filter="occupied">Đang dùng ${tables.filter((t) => t.status === "occupied").length}</button><button class="${tableFilter === "reserved" ? "active" : ""}" data-table-filter="reserved">Đã đặt ${tables.filter((t) => t.status === "reserved").length}</button></div><div class="floor-legend"><span><i class="available"></i> Trống</span><span><i class="occupied"></i> Đang dùng</span><span><i class="reserved"></i> Đã đặt</span></div></div><div class="floor-plan">${zones.map((zone) => { const zoneTables = filtered.filter((table) => table.id.startsWith(zone.id)); return `<section class="floor-zone"><header><span><b>KHU ${zone.id}</b><small>${zone.name}</small></span><em>${zoneTables.length} bàn</em></header><div class="floor-zone-grid">${zoneTables.length ? zoneTables.map(renderFloorTable).join("") : `<div class="floor-zone-empty">Không có bàn phù hợp</div>`}</div></section>`; }).join("")}</div></section>
    <aside class="module-card table-detail pos-table-detail"><span class="large-table-icon ${selected.status}"><i class="fa-solid fa-chair"></i></span><p class="eyebrow">Bàn đang chọn</p><h2>Bàn ${selected.id}</h2><span class="status-pill ${selected.status}">${tableStatusText(selected.status)}</span><dl><div><dt>Sức chứa</dt><dd>${selected.seats} khách</dd></div><div><dt>Phiên phục vụ</dt><dd>${selected.detail}</dd></div><div><dt>Khu vực</dt><dd>${selected.id.startsWith("A") ? "Cửa sổ" : selected.id.startsWith("B") ? "Trung tâm" : "Yên tĩnh"}</dd></div></dl><div class="detail-actions"><button class="btn btn-primary-action" data-table-action="start" data-table-id="${selected.id}">${tableSessions[selected.id] ? "Xem order của bàn" : "Mở order tại bàn"}</button>${bookingTableAction}${selected.status === "reserved" && !tableSessions[selected.id] ? `<button class="btn danger-action" data-table-action="available" data-table-id="${selected.id}">Hủy giữ bàn</button>` : ""}</div></aside></div>`;
}

function renderReservations() {
  const filtered = reservations.filter((reservation) => (reservationFilter === "Tất cả" || reservation.status === reservationFilter) && `${reservation.name} ${reservation.phone} ${reservation.table}`.toLocaleLowerCase("vi").includes(reservationSearch.toLocaleLowerCase("vi")));
  elements.reservations.innerHTML = `${moduleHeader("Dịch vụ khách hàng", "Lịch đặt bàn", "Quản lý lịch hẹn và tiếp nhận khách đến cửa hàng", `<button class="btn btn-primary-action" data-bs-toggle="modal" data-bs-target="#bookingModal"><i class="fa-solid fa-plus"></i> Tạo lịch đặt</button>`)}
    <div class="module-kpis reservation-kpis"><article><span class="stat-icon blue"><i class="fa-regular fa-calendar"></i></span><div><small>Tổng lịch</small><strong>${reservations.length} lịch</strong><em>Trong 2 ngày tới</em></div></article><article><span class="stat-icon gold"><i class="fa-regular fa-clock"></i></span><div><small>Chờ xác nhận</small><strong>${reservations.filter((r) => r.status === "Chờ xác nhận").length} lịch</strong><em>Cần xử lý sớm</em></div></article><article><span class="stat-icon green"><i class="fa-solid fa-user-check"></i></span><div><small>Đã nhận bàn</small><strong>${reservations.filter((r) => r.status === "Đã nhận bàn").length} lượt</strong><em>Khách đã đến</em></div></article></div>
    <section class="module-card"><div class="module-toolbar"><div class="module-search"><i class="fa-solid fa-magnifying-glass"></i><input id="reservationSearch" type="search" value="${escapeHTML(reservationSearch)}" placeholder="Tìm khách, số điện thoại, bàn..."></div><select id="reservationStatusFilter" class="compact-select"><option>Tất cả</option><option>Đã xác nhận</option><option>Chờ xác nhận</option><option>Đã nhận bàn</option><option>Đã hủy</option></select><span>${filtered.length} lịch</span></div><div class="reservation-list">${filtered.length ? filtered.map((reservation) => `<article class="reservation-row"><time><strong>${reservation.time}</strong><small>${reservation.date === todayISO() ? "Hôm nay" : new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit" }).format(new Date(`${reservation.date}T00:00:00`))}</small></time><div class="reservation-customer"><span class="initial-avatar">${escapeHTML(reservation.name).charAt(0)}</span><span><strong>${escapeHTML(reservation.name)}</strong><small><i class="fa-solid fa-phone"></i> ${escapeHTML(reservation.phone)}</small></span></div><div><strong>Bàn ${reservation.table}</strong><small>${reservation.guests} khách</small></div><div class="reservation-note"><span class="status-pill ${statusClass(reservation.status)}">${reservation.status}</span><small>${escapeHTML(reservation.note || "Không có ghi chú")}</small></div><div class="reservation-actions">${!["Đã nhận bàn", "Đã hủy"].includes(reservation.status) ? `<button class="mini-action primary" data-reservation-action="checkin" data-reservation-id="${reservation.id}">Nhận bàn</button><button class="mini-action" data-reservation-action="cancel" data-reservation-id="${reservation.id}">Hủy</button>` : `<button class="mini-action" data-reservation-action="restore" data-reservation-id="${reservation.id}">Khôi phục</button>`}</div></article>`).join("") : `<div class="module-empty"><i class="fa-regular fa-calendar-xmark"></i><h3>Không có lịch phù hợp</h3></div>`}</div></section>`;
  $("#reservationStatusFilter").value = reservationFilter;
}

function renderSettings() {
  elements.settings.innerHTML = `${moduleHeader("Thiết bị POS này", "Cài đặt quầy", "Thiết lập hóa đơn và cách vận hành tại máy hiện tại", "")}
    <form id="settingsForm" class="settings-layout"><nav class="settings-nav"><button class="active" type="button"><i class="fa-solid fa-store"></i> Thông tin cửa hàng</button><button type="button" data-settings-shortcut="payment"><i class="fa-solid fa-receipt"></i> Bán hàng & hóa đơn</button><button type="button" data-settings-shortcut="notification"><i class="fa-regular fa-bell"></i> Thông báo</button><button type="button" data-settings-shortcut="staff"><i class="fa-solid fa-users"></i> Nhân viên</button></nav><div class="settings-panels">
      <section class="module-card settings-card"><div class="card-heading"><div><h2>Thông tin cửa hàng</h2><p>Hiển thị trên phiếu thanh toán và báo cáo</p></div></div><div class="form-grid"><label>Tên cửa hàng<input class="form-control" name="name" value="${escapeHTML(storeSettings.name)}" required></label><label>Chi nhánh<input class="form-control" name="branch" value="${escapeHTML(storeSettings.branch)}" required></label><label class="span-2">Địa chỉ<input class="form-control" name="address" value="${escapeHTML(storeSettings.address)}" required></label><label>Số điện thoại<input class="form-control" name="phone" value="${escapeHTML(storeSettings.phone)}" required></label><label>Thuế VAT (%)<input class="form-control" name="tax" type="number" min="0" max="20" value="${storeSettings.tax}" required></label></div></section>
      <section class="module-card settings-card" id="paymentSettings"><div class="card-heading"><div><h2>Bán hàng & hóa đơn</h2><p>Tùy chọn vận hành tại quầy</p></div></div><div class="toggle-list"><label><span><strong>Tự động in hóa đơn</strong><small>In phiếu sau khi thanh toán thành công</small></span><input name="print" type="checkbox" role="switch" ${storeSettings.print ? "checked" : ""}></label><label><span><strong>Âm thanh báo món mới</strong><small>Phát âm báo khi có thay đổi trạng thái</small></span><input name="sound" type="checkbox" role="switch" ${storeSettings.sound ? "checked" : ""}></label><label><span><strong>Cảnh báo tồn kho thấp</strong><small>Hiện thông báo khi nguyên liệu gần hết</small></span><input name="stock" type="checkbox" role="switch" ${storeSettings.stock ? "checked" : ""}></label></div></section>
      <div class="settings-save"><span><i class="fa-solid fa-circle-info"></i> Dữ liệu được lưu tạm trong trình duyệt.</span><button class="btn btn-primary-action" type="submit"><i class="fa-solid fa-floppy-disk"></i> Lưu thay đổi</button></div>
    </div></form>`;
}

function renderTables() {
  const visibleTables = tables.filter((table) => tableZoneFilter === "all" || table.id.startsWith(tableZoneFilter));
  elements.tableGrid.innerHTML = visibleTables.map((table) => `<button class="table-card ${table.status}${table.id === selectedTableId ? " selected" : ""}" type="button" data-table-id="${table.id}" aria-pressed="${table.id === selectedTableId}" aria-label="Bàn ${table.id}, ${table.seats} chỗ, ${tableStatusText(table.status)}"><span class="table-card-top"><strong>${table.id}</strong><em>${tableStatusText(table.status)}</em></span><small><i class="fa-solid fa-user-group"></i> ${table.seats} khách</small><span class="table-card-detail">${table.detail}</span></button>`).join("");
  elements.selectedTableLabel.textContent = `Bàn ${selectedTableId}`;
  elements.tablePickerGrid.innerHTML = tables.map((table) => `<button type="button" class="picker-table ${table.status}${table.id === selectedTableId ? " active" : ""}" data-pick-table="${table.id}"><strong>${table.id}</strong><small>${table.seats} chỗ · ${tableStatusText(table.status)}</small></button>`).join("");
  const busy = tables.filter((table) => table.status === "occupied").length; const busyLabel = $("#busyTableCount"); if (busyLabel) busyLabel.textContent = busy;
}

function renderFilters() { elements.categoryFilters.innerHTML = categories.map((category) => `<button class="filter-pill${category === activeCategory ? " active" : ""}" type="button" data-category="${category}" aria-pressed="${category === activeCategory}">${category}</button>`).join(""); }
function renderMenu() { const items = menuItems.filter((item) => (activeCategory === "Tất cả" || item.category === activeCategory) && item.name.toLocaleLowerCase("vi").includes(searchTerm.toLocaleLowerCase("vi"))); elements.menuCount.textContent = items.length; elements.menuGrid.innerHTML = items.length ? items.map((item) => `<article class="menu-card" data-item-id="${item.id}" role="button" tabindex="0" aria-label="Thêm ${item.name}, ${formatVND(item.price)}"><div class="menu-image"><img src="${item.image}" alt="" width="800" height="600"></div><div class="menu-card-body"><span class="menu-category">${item.category}</span><h3 class="menu-name">${item.name}</h3><div class="d-flex align-items-center justify-content-between"><span class="menu-price">${formatVND(item.price)}</span><span class="add-icon"><i class="fa-solid fa-plus"></i></span></div></div></article>`).join("") : `<div class="empty-menu"><i class="fa-solid fa-magnifying-glass"></i><p>Không tìm thấy món phù hợp.</p></div>`; }
const getTotals = () => { const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); const tax = Math.round(subtotal * TAX_RATE); return { subtotal, tax, total: subtotal + tax }; };

function renderCart() {
  const totals = getTotals(), quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const locked = Boolean(orderType === "Tại bàn" && tableSessions[selectedTableId]?.paid);
  elements.mobileCartBadge.textContent = quantity; elements.subtotal.textContent = formatVND(totals.subtotal); elements.tax.textContent = formatVND(totals.tax); elements.grandTotal.textContent = formatVND(totals.total); elements.checkoutTotal.textContent = formatVND(totals.total); elements.checkoutButton.disabled = !cart.length || locked;
  elements.cartItems.innerHTML = cart.length ? cart.map((item) => `<div class="cart-item${locked ? " locked" : ""}" data-cart-id="${item.id}"><div class="cart-item-row"><span class="cart-thumb"><img src="${item.image}" alt=""></span><span class="cart-copy"><strong>${item.name}</strong><small>${formatVND(item.price)} / món</small></span><button class="remove-item" data-action="remove" aria-label="Xóa ${item.name}" ${locked ? "disabled" : ""}><i class="fa-regular fa-trash-can"></i></button></div><div class="cart-item-bottom"><span class="quantity-control"><button data-action="decrease" aria-label="Giảm ${item.name}" ${locked ? "disabled" : ""}><i class="fa-solid fa-minus"></i></button><span>${item.quantity}</span><button data-action="increase" aria-label="Tăng ${item.name}" ${locked ? "disabled" : ""}><i class="fa-solid fa-plus"></i></button></span><strong class="line-total">${formatVND(item.price * item.quantity)}</strong></div></div>`).join("") : `<div class="empty-cart"><div><i class="fa-solid fa-basket-shopping"></i><h3>Chưa có món nào</h3><p>Chạm vào món trong thực đơn để thêm vào phiếu.</p></div></div>`;
  setOrderControls();
}

function addToCart(id, card) { const product = menuItems.find((item) => item.id === id); if (!product) return; if (tableSessions[selectedTableId]?.paid && orderType === "Tại bàn") { showToast("Đơn đã thanh toán", "Hãy kết thúc phiên bàn trước khi tạo order mới."); return; } const existing = cart.find((item) => item.id === id); if (existing) existing.quantity += 1; else cart.push({ ...product, quantity: 1 }); if (card) { card.classList.remove("added"); void card.offsetWidth; card.classList.add("added"); } syncCurrentSession(); renderCart(); announce(`Đã thêm ${product.name}.`); }
function updateQuantity(id, delta) { if (tableSessions[selectedTableId]?.paid && orderType === "Tại bàn") return; const item = cart.find((entry) => entry.id === id); if (!item) return; item.quantity += delta; if (item.quantity <= 0) cart = cart.filter((entry) => entry.id !== id); syncCurrentSession(); renderCart(); }
function resetOrder(notify = true) { const available = tables.find((table) => table.status === "available"); if (available) selectedTableId = available.id; cart = []; orderNote = ""; orderType = "Tại bàn"; paymentMethod = "Tiền mặt"; elements.orderNumber.textContent = `#MC-${orderSequence}`; elements.orderNoteInput.value = ""; elements.orderNoteLabel.textContent = "Thêm ghi chú cho đơn"; elements.orderAlert.innerHTML = ""; $$('[data-order-type]').forEach((button) => { const active = button.dataset.orderType === orderType; button.classList.toggle("active", active); button.setAttribute("aria-pressed", active); }); $$('[data-payment]').forEach((button) => { const active = button.dataset.payment === paymentMethod; button.classList.toggle("active", active); button.setAttribute("aria-pressed", active); }); renderTables(); renderCart(); if (notify) showToast("Đã tạo đơn mới", `Sẵn sàng nhận món cho bàn ${selectedTableId}.`); }

function handleCheckout() {
  if (!cart.length) return; const totals = getTotals();
  if (orderType === "Tại bàn") {
    syncCurrentSession();
    const session = tableSessions[selectedTableId];
    if (!session || session.paid) return;
    session.paid = true; session.payment = paymentMethod; session.paidAt = new Intl.DateTimeFormat("vi-VN", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
    const order = orders.find((item) => item.id === session.id);
    if (order) { order.status = "Chưa kết thúc"; order.payment = paymentMethod; order.total = totals.total; }
    const table = tables.find((item) => item.id === selectedTableId);
    if (table) { table.status = "occupied"; table.detail = "Đã thanh toán · khách còn ngồi"; }
    notifications.unshift({ id: Date.now(), icon: "fa-circle-check", title: `Đã thanh toán ${session.id}`, body: `Bàn ${selectedTableId} · Khách còn ngồi`, time: "Vừa xong", read: false });
    elements.orderAlert.innerHTML = "";
    showToast("Thanh toán thành công", `#${session.id} · Bàn ${selectedTableId} vẫn đang sử dụng.`);
    renderCart(); renderTables(); renderNotifications();
    return;
  }
  const id = `MC-${orderSequence}`; orderSequence += 1;
  const order = { id, table: "—", type: "Mang đi", time: new Intl.DateTimeFormat("vi-VN", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()), status: "Hoàn tất", payment: paymentMethod, total: totals.total, customer: "Khách lẻ", note: orderNote, items: cart.map((item) => ({ name: item.name, quantity: item.quantity, price: item.price })) };
  orders.unshift(order);
  notifications.unshift({ id: Date.now(), icon: "fa-circle-check", title: `Đã thanh toán ${id}`, body: `${formatVND(totals.total)} · ${paymentMethod}`, time: "Vừa xong", read: false });
  console.info("Mộc POS — order completed", order); elements.orderAlert.innerHTML = `<div class="alert"><i class="fa-solid fa-circle-check me-1"></i> Đã thanh toán ${formatVND(totals.total)}</div>`; showToast("Thanh toán thành công", `#${id} · ${formatVND(totals.total)} · ${paymentMethod}`); cart = []; orderNote = ""; elements.orderNumber.textContent = `#MC-${orderSequence}`; renderCart(); renderNotifications();
}

function showOrderDetail(id) { selectedOrderId = id; const order = orders.find((item) => item.id === id); if (!order) return; elements.orderDetailBody.innerHTML = `<div class="detail-meta"><div><small>Mã đơn</small><strong>#${order.id}</strong></div><div><small>Bàn / Loại</small><strong>${order.table === "—" ? order.type : `Bàn ${order.table}`}</strong></div><div><small>Khách hàng</small><strong>${escapeHTML(order.customer)}</strong></div><div><small>Trạng thái</small><strong>${order.status}</strong></div></div><div class="detail-items"><h3>Món trong đơn</h3>${order.items.map((item) => `<div><span><strong>${item.name}</strong><small>${item.quantity} × ${formatVND(item.price)}</small></span><b>${formatVND(item.quantity * item.price)}</b></div>`).join("")}</div>${order.note ? `<div class="detail-note"><i class="fa-regular fa-note-sticky"></i>${escapeHTML(order.note)}</div>` : ""}<div class="detail-total"><span>Tổng thanh toán</span><strong>${formatVND(order.total)}</strong></div>`; $("#orderDetailTitle").textContent = `Đơn #${order.id}`; const terminal = ["Hoàn tất", "Đã hủy"].includes(order.status); elements.advanceOrderButton.disabled = terminal; elements.advanceOrderButton.textContent = terminal ? order.status : order.status === "Chưa kết thúc" ? "Mở bàn đang phục vụ" : order.status === "Đang pha" ? "Chuyển sang Sẵn sàng" : "Đánh dấu Hoàn tất"; bootstrap.Modal.getOrCreateInstance($("#orderDetailModal")).show(); }
function advanceOrder() { const order = orders.find((item) => item.id === selectedOrderId); if (!order) return; if (order.status === "Chưa kết thúc") { bootstrap.Modal.getInstance($("#orderDetailModal"))?.hide(); selectTableForOrder(order.table, true); switchView("sales"); return; } if (order.status === "Đang pha") order.status = "Sẵn sàng"; else if (order.status === "Sẵn sàng") order.status = "Hoàn tất"; notifications.unshift({ id: Date.now(), icon: "fa-mug-hot", title: `Đơn ${order.id}: ${order.status}`, body: order.table === "—" ? "Mang đi" : `Bàn ${order.table}`, time: "Vừa xong", read: false }); showToast("Đã cập nhật đơn", `#${order.id} · ${order.status}`); showOrderDetail(order.id); renderOrders(); renderNotifications(); }

function renderNotifications() { const visibleNotifications = RESERVATION_FEATURE_ENABLED ? notifications : notifications.filter((notice) => notice.id !== 2); elements.notificationList.innerHTML = visibleNotifications.map((notice) => `<article class="notification-item${notice.read ? "" : " unread"}"><span><i class="fa-solid ${notice.icon}"></i></span><div><strong>${escapeHTML(notice.title)}</strong><p>${escapeHTML(notice.body)}</p><small>${notice.time}</small></div></article>`).join(""); const dot = $(".icon-button span"); if (dot) dot.hidden = !visibleNotifications.some((notice) => !notice.read); }
function refreshBookingTables() { elements.bookingTable.innerHTML = `<option value="" selected disabled>Chọn bàn</option>` + tables.map((table) => `<option value="${table.id}">Bàn ${table.id} · ${table.seats} chỗ · ${tableStatusText(table.status)}</option>`).join(""); }
const validatePhone = () => { const value = elements.phone.value.trim(); elements.phone.setCustomValidity(!value || /^(?:\+84|0)\d{9}$/.test(value.replace(/[\s.-]/g, "")) ? "" : "Số điện thoại không hợp lệ"); };
const validateTime = () => { const value = elements.bookingTime.value; elements.bookingTime.setCustomValidity(!value || (value >= "07:00" && value <= "21:30") ? "" : "Ngoài giờ phục vụ"); };
function handleBooking(event) { event.preventDefault(); validatePhone(); validateTime(); elements.bookingForm.classList.add("was-validated"); if (!elements.bookingForm.checkValidity()) { elements.bookingForm.querySelector(":invalid")?.focus(); return; } const data = new FormData(elements.bookingForm); const reservation = { id: Date.now(), name: data.get("fullName"), phone: data.get("phone"), date: data.get("date"), time: data.get("time"), guests: Number(data.get("guests")), table: data.get("table"), status: "Đã xác nhận", note: data.get("notes") }; reservations.unshift(reservation); const table = tables.find((item) => item.id === reservation.table); if (table && table.status === "available") { table.status = "reserved"; table.detail = `Đặt lúc ${reservation.time}`; } const count = $("#reservationCount"); if (count) count.textContent = reservations.length; bootstrap.Modal.getInstance($("#bookingModal"))?.hide(); showToast("Đã tạo lịch đặt bàn", `${reservation.name} · Bàn ${reservation.table} · ${reservation.time}`); elements.bookingForm.reset(); elements.bookingForm.classList.remove("was-validated"); elements.notesCount.textContent = "0"; renderTables(); if (activeView === "reservations") renderReservations(); }

function handleTableAction(action, id) { const table = tables.find((item) => item.id === id); if (!table) return; if (action === "start") { if (!tableSessions[id]) { table.status = "occupied"; table.detail = "Vừa mở order"; } selectTableForOrder(id); switchView("sales"); showToast(tableSessions[id] ? "Đã tải order của bàn" : "Đã mở order", tableSessions[id] ? `Bàn ${id} · ${cart.reduce((sum, item) => sum + item.quantity, 0)} món` : `Đang phục vụ tại bàn ${id}.`); } if (action === "available") { if (tableSessions[id]) { showToast("Bàn đang có phiên phục vụ", "Hãy mở order và chọn Khách đã đi để kết thúc đúng quy trình."); return; } table.status = "available"; table.detail = "Sẵn sàng"; renderTableManagement(); renderTables(); showToast("Đã cập nhật bàn", `Bàn ${id} hiện đang trống.`); } if (action === "reserve") { refreshBookingTables(); bootstrap.Modal.getOrCreateInstance($("#bookingModal")).show(); elements.bookingTable.value = id; } }
function handleReservationAction(action, id) { const reservation = reservations.find((item) => item.id === Number(id)); if (!reservation) return; const table = tables.find((item) => item.id === reservation.table); if (action === "checkin") { reservation.status = "Đã nhận bàn"; if (table) { table.status = "occupied"; table.detail = `Khách ${reservation.name}`; } selectTableForOrder(reservation.table); switchView("sales"); showToast("Khách đã nhận bàn", `${reservation.name} · Bàn ${reservation.table}`); } if (action === "cancel") { reservation.status = "Đã hủy"; if (table?.status === "reserved") { table.status = "available"; table.detail = "Sẵn sàng"; } renderReservations(); renderTables(); showToast("Đã hủy lịch", `${reservation.name} · ${reservation.time}`); } if (action === "restore") { reservation.status = "Đã xác nhận"; if (table?.status === "available") { table.status = "reserved"; table.detail = `Đặt lúc ${reservation.time}`; } renderReservations(); renderTables(); showToast("Đã khôi phục lịch", `${reservation.name} · Bàn ${reservation.table}`); } }

document.addEventListener("click", (event) => {
  const viewButton = event.target.closest("[data-view]"); if (viewButton) { switchView(viewButton.dataset.view); return; }
  const profileAction = event.target.closest("[data-profile-action]"); if (profileAction) { if (profileAction.dataset.profileAction === "profile") switchView("settings"); else { shiftOpen = !shiftOpen; $(".shift-info strong").textContent = shiftOpen ? "Ca sáng đang mở" : "Ca làm việc đã kết thúc"; $(".status-dot").classList.toggle("closed", !shiftOpen); showToast(shiftOpen ? "Đã mở lại ca" : "Đã kết ca", shiftOpen ? "Tiếp tục ghi nhận giao dịch." : "Báo cáo ca đã được chốt trong bản demo."); } return; }
});

elements.tableGrid.addEventListener("click", (event) => { const card = event.target.closest("[data-table-id]"); if (!card) return; selectTableForOrder(card.dataset.tableId, true); });
elements.tableZoneFilters.addEventListener("click", (event) => { const button = event.target.closest("[data-table-zone]"); if (!button) return; tableZoneFilter = button.dataset.tableZone; $$('[data-table-zone]').forEach((item) => { const active = item === button; item.classList.toggle("active", active); item.setAttribute("aria-pressed", active); }); renderTables(); });
elements.tablePickerGrid.addEventListener("click", (event) => { const button = event.target.closest("[data-pick-table]"); if (!button) return; selectTableForOrder(button.dataset.pickTable, true); bootstrap.Modal.getInstance($("#tablePickerModal"))?.hide(); });
elements.categoryFilters.addEventListener("click", (event) => { const button = event.target.closest("[data-category]"); if (!button) return; activeCategory = button.dataset.category; renderFilters(); renderMenu(); });
elements.menuSearch.addEventListener("input", () => { searchTerm = elements.menuSearch.value.trim(); renderMenu(); });
elements.menuGrid.addEventListener("click", (event) => { const card = event.target.closest("[data-item-id]"); if (card) addToCart(Number(card.dataset.itemId), card); });
elements.menuGrid.addEventListener("keydown", (event) => { if (!["Enter", " "].includes(event.key)) return; const card = event.target.closest("[data-item-id]"); if (!card) return; event.preventDefault(); addToCart(Number(card.dataset.itemId), card); });
elements.cartItems.addEventListener("click", (event) => { const button = event.target.closest("[data-action]"), row = event.target.closest("[data-cart-id]"); if (!button || !row || button.disabled) return; const id = Number(row.dataset.cartId); if (button.dataset.action === "increase") updateQuantity(id, 1); if (button.dataset.action === "decrease") updateQuantity(id, -1); if (button.dataset.action === "remove") { cart = cart.filter((item) => item.id !== id); syncCurrentSession(); renderCart(); } });
elements.orderTypeTabs.addEventListener("click", (event) => { const button = event.target.closest("[data-order-type]"); if (!button) return; orderType = button.dataset.orderType; $$('[data-order-type]').forEach((item) => { const active = item === button; item.classList.toggle("active", active); item.setAttribute("aria-pressed", active); }); });
elements.paymentMethods.addEventListener("click", (event) => { const button = event.target.closest("[data-payment]"); if (!button || button.disabled) return; paymentMethod = button.dataset.payment; $$('[data-payment]').forEach((item) => { const active = item === button; item.classList.toggle("active", active); item.setAttribute("aria-pressed", active); }); syncCurrentSession(); });
elements.checkoutButton.addEventListener("click", handleCheckout); elements.endSessionButton.addEventListener("click", endTableSession); elements.newOrderButton.addEventListener("click", () => resetOrder(true));
$("#saveOrderNote").addEventListener("click", () => { orderNote = elements.orderNoteInput.value.trim(); elements.orderNoteLabel.textContent = orderNote ? "Đã thêm ghi chú" : "Thêm ghi chú cho đơn"; syncCurrentSession(); bootstrap.Modal.getInstance($("#orderNoteModal"))?.hide(); showToast("Đã lưu ghi chú", orderNote || "Ghi chú đã được xóa."); });
elements.advanceOrderButton.addEventListener("click", advanceOrder);
elements.orders.addEventListener("click", (event) => { const filter = event.target.closest("[data-order-filter]"); if (filter) { orderFilter = filter.dataset.orderFilter; renderOrders(); return; } const row = event.target.closest("[data-order-id]"); if (row) showOrderDetail(row.dataset.orderId); });
elements.orders.addEventListener("keydown", (event) => { if (!["Enter", " "].includes(event.key)) return; const ticket = event.target.closest(".pos-ticket[data-order-id]"); if (!ticket) return; event.preventDefault(); showOrderDetail(ticket.dataset.orderId); });
elements.orders.addEventListener("input", (event) => { if (event.target.id === "ordersSearch") { orderSearch = event.target.value; renderOrders(); } });
elements.orders.addEventListener("change", (event) => { if (event.target.id === "ordersStatusFilter") { orderFilter = event.target.value; renderOrders(); } });
elements.dashboard.addEventListener("click", (event) => { const row = event.target.closest("[data-order-id]"); if (row) showOrderDetail(row.dataset.orderId); });
elements.tables.addEventListener("click", (event) => { const filter = event.target.closest("[data-table-filter]"); if (filter) { tableFilter = filter.dataset.tableFilter; renderTableManagement(); return; } const tableCard = event.target.closest("[data-manage-table]"); if (tableCard) { managedTableId = tableCard.dataset.manageTable; renderTableManagement(); return; } const action = event.target.closest("[data-table-action]"); if (action) handleTableAction(action.dataset.tableAction, action.dataset.tableId); });
elements.reservations.addEventListener("click", (event) => { const action = event.target.closest("[data-reservation-action]"); if (action) handleReservationAction(action.dataset.reservationAction, action.dataset.reservationId); });
elements.reservations.addEventListener("input", (event) => { if (event.target.id === "reservationSearch") { reservationSearch = event.target.value; renderReservations(); } });
elements.reservations.addEventListener("change", (event) => { if (event.target.id === "reservationStatusFilter") { reservationFilter = event.target.value; renderReservations(); } });
elements.settings.addEventListener("submit", (event) => { if (event.target.id !== "settingsForm") return; event.preventDefault(); const data = new FormData(event.target); storeSettings = { name: data.get("name"), branch: data.get("branch"), address: data.get("address"), phone: data.get("phone"), tax: Number(data.get("tax")), print: data.get("print") === "on", sound: data.get("sound") === "on", stock: data.get("stock") === "on" }; showToast("Đã lưu cài đặt", "Thông tin cửa hàng đã được cập nhật trong phiên demo."); });
elements.settings.addEventListener("click", (event) => { const shortcut = event.target.closest("[data-settings-shortcut]"); if (!shortcut) return; if (shortcut.dataset.settingsShortcut === "payment") $("#paymentSettings")?.scrollIntoView({ behavior: "smooth" }); else showToast("Tính năng demo", "Khu vực này đã sẵn sàng để kết nối backend."); });
elements.bookingForm.addEventListener("submit", handleBooking); elements.phone.addEventListener("input", validatePhone); elements.bookingTime.addEventListener("input", validateTime); elements.notes.addEventListener("input", () => { elements.notesCount.textContent = elements.notes.value.length; });
$("#bookingModal").addEventListener("show.bs.modal", refreshBookingTables);
$("#markNotificationsRead").addEventListener("click", () => { notifications = notifications.map((notice) => ({ ...notice, read: true })); renderNotifications(); showToast("Đã đọc thông báo", "Tất cả thông báo đã được đánh dấu đã đọc."); });
document.addEventListener("keydown", (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); switchView("sales"); elements.menuSearch.focus(); } });

const updateClock = () => { const now = new Date(); $("#liveClock").textContent = new Intl.DateTimeFormat("vi-VN", { hour: "2-digit", minute: "2-digit", hour12: false }).format(now); $("#liveDate").textContent = new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(now); };
elements.bookingDate.min = todayISO();
$$('[data-bs-toggle="tooltip"]').forEach((element) => new bootstrap.Tooltip(element));
renderTables(); renderFilters(); renderMenu(); renderNotifications(); updateClock(); setInterval(updateClock, 30000); selectTableForOrder(selectedTableId); switchView("sales");

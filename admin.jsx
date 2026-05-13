/* admin.jsx — 7 admin screens */

// ─── Admin layout shell (sidebar + topbar + content) ────────
const AdminShell = ({ active, setActive, title, subtitle, children, actions }) => (
  <div className="mesh-bg" style={{ height: '100%', display: 'flex', position: 'relative' }}>
    <div className="orb orb-violet" style={{ width: 600, height: 600, top: -200, right: -200 }} />
    <div className="orb orb-cyan" style={{ width: 500, height: 500, bottom: -100, left: 100, opacity: 0.4 }} />
    <Sidebar activeKey={active} onNavigate={setActive} role="admin" />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', zIndex: 2 }}>
      <Topbar title={title} subtitle={subtitle} actions={actions} />
      <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px 48px' }}>
        {children}
      </div>
    </div>
  </div>
);

// ────────────────────────────────────────────────────────
// 1. DASHBOARD
// ────────────────────────────────────────────────────────
const AdminDashboard = ({ setActive }) => {
  const recent = [
    { who: 'Nguyễn Mai Ngọc', what: 'thanh toán hóa đơn tháng 5', when: '2 phút', amount: '+8.500.000đ', i: 1, type: 'pay' },
    { who: 'Trần Quốc Anh',  what: 'gửi yêu cầu xem phòng A-1502', when: '12 phút', i: 2, type: 'tour' },
    { who: 'Hoàng Lan',      what: 'gia hạn hợp đồng thêm 12 tháng', when: '1 giờ', i: 3, type: 'renew' },
    { who: 'Phạm Bảo',       what: 'báo trễ hạn 3 ngày', when: '3 giờ', i: 4, type: 'late' },
    { who: 'AI Glass',       what: 'đã gửi 12 nhắc thanh toán tự động', when: '4 giờ', i: 0, type: 'ai' },
    { who: 'Đỗ Hà Linh',     what: 'để lại review 5 sao', when: '6 giờ', i: 5, type: 'review' },
  ];

  return (
    <AdminShell active="dashboard" setActive={setActive} title="Tổng quan" subtitle="Tháng 5, 2026 · cập nhật theo thời gian thực"
      actions={<button className="btn btn-primary btn-sm"><Icon name="plus" size={14} /> Thêm phòng</button>}>

      {/* Greeting + AI insight */}
      <div className="glass-strong glass-shine" style={{ padding: 24, marginBottom: 22, display: 'flex', alignItems: 'center', gap: 22 }}>
        <div className="ico ico-grad ico-lg glow-breathe" style={{ width: 56, height: 56 }}>
          <Icon name="sparkles" size={26} />
        </div>
        <div style={{ flex: 1 }}>
          <div className="eyebrow" style={{ marginBottom: 4 }}>Glass AI · báo cáo sáng nay</div>
          <div style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.5, marginBottom: 4 }}>
            Tỉ lệ lấp đầy <strong style={{ color: '#a5f3fc' }}>92%</strong> — cao nhất 6 tháng. 3 hợp đồng sắp hết hạn trong 14 ngày tới,
            đề xuất gửi đề nghị gia hạn ngay hôm nay để giữ tỉ lệ trên 90%.
          </div>
          <div className="row-gap-2">
            <button className="btn btn-glass btn-sm">Xem 3 hợp đồng</button>
            <button className="btn btn-ghost btn-sm">Tạo nhắc tự động</button>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="muted" style={{ fontSize: 12 }}>Doanh thu hôm nay</div>
          <div className="grad-text tabular" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>
            +24.8M
          </div>
          <Sparkline data={[3,5,4,6,5,7,9,12,10,14]} color="var(--ok)" width={140} height={36} />
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 22 }}>
        <KPI label="Doanh thu T5" value={formatVND(284500000)} delta={12} deltaLabel="So với T4"
          icon="wallet" sparkColor="#10b981" sparkData={[8,9,11,10,12,14,13,16]} />
        <KPI label="Tỉ lệ lấp đầy" value="92%" delta={4} deltaLabel="46/50 phòng"
          icon="building" sparkColor="#4f46e5" sparkData={[80,82,85,84,88,90,91,92]} />
        <KPI label="Khách thuê" value="48" delta={6} deltaLabel="+3 mới tháng này"
          icon="users" sparkColor="#6366f1" sparkData={[40,42,43,44,45,47,48,48]} />
        <KPI label="Trễ hạn" value={formatVND(12400000)} delta={-22} deltaLabel="3 hóa đơn"
          icon="clock" sparkColor="#dc2626" sparkData={[18,16,14,15,12,13,12,12]} />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 22, marginBottom: 22 }}>
        <div className="glass" style={{ padding: 24 }}>
          <div className="between" style={{ marginBottom: 18 }}>
            <div>
              <div className="h3">Doanh thu 12 tháng</div>
              <div className="muted" style={{ fontSize: 13, marginTop: 2 }}>Tiền thuê · phí dịch vụ · phụ phí</div>
            </div>
            <div className="row-gap-2">
              {['1T', '3T', '6T', '12T'].map((t, i) => (
                <button key={t} className={`pill ${i === 3 ? 'active' : ''}`} style={{ padding: '4px 12px' }}>{t}</button>
              ))}
            </div>
          </div>
          <AreaChart
            series={[
              { color: '#a855f7', data: [180, 195, 210, 220, 225, 240, 255, 260, 270, 275, 280, 285].map(x => x * 1000000) },
              { color: '#22d3ee', data: [22, 24, 25, 28, 26, 30, 32, 34, 36, 38, 40, 42].map(x => x * 1000000) },
            ]}
            xLabels={['T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12', 'T1', 'T2', 'T3', 'T4', 'T5']}
            height={240}
          />
        </div>
        <div className="glass" style={{ padding: 24 }}>
          <div className="h3" style={{ marginBottom: 18 }}>Phân bổ phòng</div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
            <Donut size={170} stroke={20} value={92} label="46" sub="đang cho thuê" />
          </div>
          <div className="col-gap-2">
            {[
              { l: 'Đang ở', v: 46, c: '#a855f7' },
              { l: 'Trống', v: 4, c: '#22d3ee' },
              { l: 'Bảo trì', v: 0, c: '#f59e0b' },
            ].map(s => (
              <div key={s.l} className="between" style={{ fontSize: 14 }}>
                <span className="row-gap-2"><span className="dot" style={{ background: s.c, width: 8, height: 8 }} /> {s.l}</span>
                <span style={{ fontWeight: 600 }} className="tabular">{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity + upcoming */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
        <div className="glass" style={{ padding: 24 }}>
          <div className="between" style={{ marginBottom: 18 }}>
            <div className="h3">Hoạt động gần đây</div>
            <button className="btn btn-ghost btn-sm">Tất cả <Icon name="arrowRight" size={12} /></button>
          </div>
          <div className="col-gap-3">
            {recent.map((a, i) => (
              <div key={i} className="row-gap-3">
                {a.type === 'ai' ? (
                  <div className="ico ico-grad"><Icon name="sparkles" size={15} /></div>
                ) : (
                  <Avatar initials={a.who.split(' ').slice(-1)[0][0] + a.who.split(' ')[0][0]} size={36} gradient={a.i || 1} />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14 }}>
                    <strong>{a.who}</strong> <span className="muted">{a.what}</span>
                  </div>
                  <div className="faint" style={{ fontSize: 12 }}>{a.when} trước</div>
                </div>
                {a.amount && <div className="tabular" style={{ color: 'var(--ok)', fontWeight: 600 }}>{a.amount}</div>}
                {a.type === 'late' && <span className="badge badge-rose">Trễ</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="glass" style={{ padding: 24 }}>
          <div className="between" style={{ marginBottom: 18 }}>
            <div className="h3">Hợp đồng sắp hết hạn</div>
            <button className="btn btn-ghost btn-sm">Tất cả <Icon name="arrowRight" size={12} /></button>
          </div>
          <div className="col-gap-3">
            {[
              { who: 'Nguyễn Mai Ngọc', room: 'A-1502 Studio Central', days: 14, g: 2 },
              { who: 'Trần Quốc Anh', room: 'B-204 Loft Bình Thạnh', days: 23, g: 1 },
              { who: 'Hoàng Lan',     room: 'C-601 Sunset Studio', days: 41, g: 3 },
              { who: 'Đỗ Hà Linh',    room: 'D-1203 Aurora', days: 58, g: 4 },
            ].map((c, i) => (
              <div key={i} className="glass-thin glass-i" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar initials={c.who.split(' ').slice(-1)[0][0] + c.who.split(' ')[0][0]} size={40} gradient={c.g} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{c.who}</div>
                  <div className="muted" style={{ fontSize: 12 }}>{c.room}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className={c.days <= 14 ? 'badge badge-amber' : 'badge badge-mute'}>{c.days} ngày</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
};

// ────────────────────────────────────────────────────────
// 2. ROOMS MANAGEMENT
// ────────────────────────────────────────────────────────
const AdminRooms = ({ setActive }) => {
  const [view, setView] = React.useState('grid');

  const allRooms = [
    ...ROOMS.map(r => ({ ...r, building: 'Glass Tower A', floor: 15, code: 'A-' + (1500 + r.id), tenant: 'Nguyễn Mai Ngọc', occupied: r.status !== 'full' && r.id < 5 })),
    ...ROOMS.map(r => ({ ...r, id: r.id + 10, building: 'Glass Tower B', floor: 8, code: 'B-' + (800 + r.id), tenant: 'Trần Quốc Anh', occupied: r.id < 4 })),
  ];

  return (
    <AdminShell active="rooms" setActive={setActive} title="Cơ sở & phòng" subtitle="50 phòng tại 2 tòa · 92% lấp đầy"
      actions={<button className="btn btn-primary btn-sm"><Icon name="plus" size={14} /> Thêm phòng</button>}>

      {/* Building tabs */}
      <div className="row-gap-2" style={{ marginBottom: 20 }}>
        {[
          { l: 'Tất cả', n: 50, active: true },
          { l: 'Glass Tower A', n: 30 },
          { l: 'Glass Tower B', n: 20 },
        ].map((b, i) => (
          <button key={i} className={`pill ${b.active ? 'active' : ''}`}>
            <Icon name="building" size={14} /> {b.l}
            <span style={{ marginLeft: 4, fontWeight: 700, opacity: 0.7 }}>{b.n}</span>
          </button>
        ))}
        <div className="spacer" />
        <div className="row-gap-2">
          <div className="glass-thin" style={{ padding: 4, borderRadius: 12, display: 'flex' }}>
            <button onClick={() => setView('grid')} className={`pill ${view === 'grid' ? 'active' : ''}`}
              style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: view === 'grid' ? undefined : 'transparent' }}>
              <Icon name="grid" size={14} />
            </button>
            <button onClick={() => setView('list')} className={`pill ${view === 'list' ? 'active' : ''}`}
              style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: view === 'list' ? undefined : 'transparent' }}>
              <Icon name="list" size={14} />
            </button>
          </div>
          <button className="btn btn-glass btn-sm"><Icon name="filter" size={14} /> Lọc</button>
        </div>
      </div>

      {view === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 18 }}>
          {allRooms.map(r => (
            <div key={r.code} className="glass glass-shine glass-i" style={{ padding: 12, cursor: 'pointer' }}>
              <div className={`photo ${r.ph}`} style={{ aspectRatio: '5/3', borderRadius: 14, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 10, left: 10 }}>
                  <span className={`badge ${r.occupied ? 'badge-emerald' : 'badge-amber'}`}
                    style={{ backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.18)' }}>
                    <span className="dot pulse" /> {r.occupied ? 'Đang ở' : 'Trống'}
                  </span>
                </div>
                <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(7,9,26,0.6)', backdropFilter: 'blur(10px)',
                  padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600 }}>
                  {r.code}
                </div>
              </div>
              <div style={{ padding: '12px 4px 4px' }}>
                <div className="between" style={{ marginBottom: 4 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }} className="trunc">{r.name}</div>
                </div>
                <div className="muted" style={{ fontSize: 12, marginBottom: 10 }}>{r.building} · Tầng {r.floor}</div>
                <div className="between" style={{ paddingTop: 10, borderTop: '1px solid var(--glass-border)' }}>
                  <div className="tabular" style={{ fontSize: 14, fontWeight: 700 }}>{formatVND(r.price)}</div>
                  <div className="muted" style={{ fontSize: 11 }}>/tháng</div>
                </div>
                {r.occupied && (
                  <div className="row-gap-2" style={{ marginTop: 10 }}>
                    <Avatar initials={r.tenant.split(' ').slice(-1)[0][0]} size={24} gradient={r.id % 5 + 1} />
                    <span className="muted" style={{ fontSize: 12 }} className="trunc">{r.tenant}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <RoomsTable rooms={allRooms} />
      )}

      {/* Floating modal preview */}
      <RoomDetailModal />
    </AdminShell>
  );
};

const RoomsTable = ({ rooms }) => (
  <div className="glass" style={{ padding: 0, overflow: 'hidden' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.2fr 1fr 1fr 1fr 0.8fr 0.4fr',
      padding: '14px 22px', borderBottom: '1px solid var(--glass-border)', fontSize: 12, fontWeight: 600,
      color: 'var(--text-mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
      <div>Phòng</div><div>Tòa / Tầng</div><div>Diện tích</div><div>Giá thuê</div><div>Khách thuê</div><div>Trạng thái</div><div></div>
    </div>
    {rooms.slice(0, 8).map((r, i) => (
      <div key={r.code} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.2fr 1fr 1fr 1fr 0.8fr 0.4fr',
        padding: '14px 22px', borderBottom: i < 7 ? '1px solid var(--glass-border)' : 'none',
        fontSize: 14, alignItems: 'center', transition: 'background .2s' }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
        <div className="row-gap-3">
          <div className={`photo ${r.ph}`} style={{ width: 44, height: 44, borderRadius: 10 }} />
          <div>
            <div style={{ fontWeight: 600 }}>{r.name}</div>
            <div className="muted" style={{ fontSize: 12 }} className="mono">{r.code}</div>
          </div>
        </div>
        <div>{r.building} <span className="muted">· T{r.floor}</span></div>
        <div className="tabular">{r.sqm} m²</div>
        <div className="tabular" style={{ fontWeight: 600 }}>{formatVND(r.price)}</div>
        <div>{r.occupied ? <span className="row-gap-2"><Avatar initials="MN" size={24} gradient={2} />{r.tenant}</span> : <span className="muted">—</span>}</div>
        <div><span className={`badge ${r.occupied ? 'badge-emerald' : 'badge-amber'}`}>{r.occupied ? 'Đang ở' : 'Trống'}</span></div>
        <div><button className="ico" style={{ width: 32, height: 32 }}><Icon name="moreH" size={14} /></button></div>
      </div>
    ))}
  </div>
);

// Floating modal — shows room detail (decorative, anchored to bottom-right)
const RoomDetailModal = () => (
  <div className="glass-strong glass-shine" style={{
    position: 'absolute', right: 32, bottom: 32, width: 360, padding: 18, zIndex: 10,
    transform: 'rotate(-1deg)',
  }}>
    <div className="row-gap-2" style={{ marginBottom: 12 }}>
      <span className="badge badge-violet"><Icon name="eye" size={11} /> Xem trước</span>
      <button className="ico" style={{ width: 26, height: 26, marginLeft: 'auto' }}><Icon name="x" size={12} /></button>
    </div>
    <div className="photo ph-5" style={{ aspectRatio: '16/9', borderRadius: 12, marginBottom: 12 }} />
    <div style={{ fontWeight: 700, fontSize: 16 }}>Glass Tower 1502 · Penthouse</div>
    <div className="muted row-gap-1" style={{ fontSize: 12, marginBottom: 12 }}>
      <Icon name="pin" size={11} /> Quận 2 · 42m² · 2 PN
    </div>
    <div className="row-gap-3" style={{ fontSize: 13 }}>
      <span className="row-gap-1"><Icon name="bed" size={13} /> 2</span>
      <span className="row-gap-1"><Icon name="bath" size={13} /> 2</span>
      <span className="row-gap-1"><Icon name="wifi" size={13} /> 1G</span>
      <span className="spacer" />
      <span className="tabular" style={{ fontWeight: 700 }}>{formatVND(12500000)}</span>
    </div>
  </div>
);

// ────────────────────────────────────────────────────────
// 3. CONTRACTS
// ────────────────────────────────────────────────────────
const AdminContracts = ({ setActive }) => {
  const contracts = [
    { id: 'HD-2026-0142', tenant: 'Nguyễn Mai Ngọc', room: 'A-1502', start: '15/01/26', end: '15/01/27', amount: 8500000, status: 'active', daysLeft: 247, g: 2 },
    { id: 'HD-2026-0098', tenant: 'Trần Quốc Anh', room: 'B-204', start: '01/12/25', end: '01/12/26', amount: 6200000, status: 'expiring', daysLeft: 23, g: 1 },
    { id: 'HD-2025-0876', tenant: 'Hoàng Lan', room: 'C-601', start: '20/06/25', end: '20/06/26', amount: 7200000, status: 'expiring', daysLeft: 41, g: 3 },
    { id: 'HD-2026-0211', tenant: 'Phạm Bảo', room: 'A-808', start: '10/03/26', end: '10/03/27', amount: 5800000, status: 'active', daysLeft: 308, g: 4 },
    { id: 'HD-2026-0245', tenant: 'Đỗ Hà Linh', room: 'D-1203', start: '01/04/26', end: '01/04/27', amount: 9200000, status: 'active', daysLeft: 330, g: 5 },
    { id: 'HD-2025-0700', tenant: 'Lưu Khánh', room: 'B-501', start: '15/05/25', end: '15/05/26', amount: 6800000, status: 'expired', daysLeft: -5, g: 6 },
    { id: 'HD-2026-0301', tenant: 'Vũ Phương', room: 'A-902', start: '01/05/26', end: '01/05/27', amount: 7500000, status: 'pending', daysLeft: null, g: 1 },
  ];

  const statusBadge = {
    active: { c: 'badge-emerald', t: 'Đang hiệu lực' },
    expiring: { c: 'badge-amber', t: 'Sắp hết hạn' },
    expired: { c: 'badge-rose', t: 'Đã hết hạn' },
    pending: { c: 'badge-violet', t: 'Chờ ký' },
  };

  return (
    <AdminShell active="contracts" setActive={setActive} title="Hợp đồng" subtitle="48 hợp đồng đang quản lý · 3 sắp hết hạn"
      actions={<>
        <button className="btn btn-glass btn-sm"><Icon name="download" size={14} /> Xuất Excel</button>
        <button className="btn btn-primary btn-sm"><Icon name="user-plus" size={14} /> Khách thuê</button>
      </>}>

      {/* Stat strip */}
      <div className="glass" style={{ padding: 0, marginBottom: 22, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { l: 'Đang hiệu lực', v: 42, c: '#6ee7b7' },
          { l: 'Sắp hết hạn (60 ngày)', v: 3, c: '#fcd34d' },
          { l: 'Chờ ký', v: 2, c: '#e9d5ff' },
          { l: 'Đã hết hạn', v: 1, c: '#fda4af' },
        ].map((s, i) => (
          <div key={i} style={{ padding: 22, borderRight: i < 3 ? '1px solid var(--glass-border)' : 'none' }}>
            <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>{s.l}</div>
            <div style={{ fontSize: 30, fontWeight: 700, color: s.c }} className="tabular">{s.v}</div>
          </div>
        ))}
      </div>

      {/* Filter row */}
      <div className="row-gap-2" style={{ marginBottom: 16 }}>
        <div className="input" style={{ width: 320, padding: '8px 14px' }}>
          <Icon name="search" size={15} color="var(--text-mute)" />
          <input placeholder="Tìm theo tên, mã HĐ, phòng..." />
        </div>
        <button className="pill active"><Icon name="check" size={12} /> Tất cả</button>
        <button className="pill">Đang hiệu lực</button>
        <button className="pill">Sắp hết hạn</button>
        <button className="pill">Chờ ký</button>
        <div className="spacer" />
        <button className="btn btn-glass btn-sm"><Icon name="sort" size={14} /> Mới nhất</button>
      </div>

      {/* Table */}
      <div className="glass" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.4fr 0.8fr 1.2fr 1fr 1fr 1fr 0.4fr',
          padding: '14px 22px', borderBottom: '1px solid var(--glass-border)', fontSize: 12, fontWeight: 600,
          color: 'var(--text-mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          <div>Mã HĐ</div><div>Khách thuê</div><div>Phòng</div><div>Thời hạn</div>
          <div>Giá trị</div><div>Còn lại</div><div>Trạng thái</div><div></div>
        </div>
        {contracts.map((c, i) => (
          <div key={c.id} className="contract-row" style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.4fr 0.8fr 1.2fr 1fr 1fr 1fr 0.4fr',
            padding: '16px 22px', borderBottom: i < contracts.length - 1 ? '1px solid var(--glass-border)' : 'none',
            fontSize: 14, alignItems: 'center', transition: 'all .2s', cursor: 'pointer' }}>
            <div className="mono" style={{ fontSize: 13, color: '#c7d2fe' }}>{c.id}</div>
            <div className="row-gap-3">
              <Avatar initials={c.tenant.split(' ').slice(-1)[0][0] + c.tenant.split(' ')[0][0]} size={32} gradient={c.g} />
              <div style={{ fontWeight: 600 }}>{c.tenant}</div>
            </div>
            <div className="mono" style={{ fontSize: 13 }}>{c.room}</div>
            <div className="muted" style={{ fontSize: 13 }}>{c.start} → {c.end}</div>
            <div className="tabular" style={{ fontWeight: 600 }}>{formatVND(c.amount)}</div>
            <div className="tabular">
              {c.daysLeft == null ? <span className="muted">—</span> :
                c.daysLeft < 0 ? <span style={{ color: '#fda4af' }}>quá {Math.abs(c.daysLeft)}d</span> :
                <span style={{ color: c.daysLeft < 30 ? '#fcd34d' : 'var(--text)' }}>{c.daysLeft} ngày</span>}
            </div>
            <div><span className={`badge ${statusBadge[c.status].c}`}>{statusBadge[c.status].t}</span></div>
            <div><button className="ico" style={{ width: 32, height: 32 }}><Icon name="moreH" size={14} /></button></div>
          </div>
        ))}
      </div>
      <style>{`.contract-row:hover { background: rgba(255,255,255,0.03);
        box-shadow: 0 0 0 1px rgba(168,85,247,0.25), 0 0 24px rgba(99,102,241,0.15); }`}</style>
    </AdminShell>
  );
};

// ────────────────────────────────────────────────────────
// 4. INVOICES
// ────────────────────────────────────────────────────────
const AdminInvoices = ({ setActive }) => {
  const invoices = [
    { id: 'HĐ-26050001', tenant: 'Nguyễn Mai Ngọc', room: 'A-1502', date: '01/05/26', due: '25/05/26', amount: 8950000, status: 'paid', g: 2 },
    { id: 'HĐ-26050002', tenant: 'Trần Quốc Anh', room: 'B-204', date: '01/05/26', due: '25/05/26', amount: 6580000, status: 'paid', g: 1 },
    { id: 'HĐ-26050003', tenant: 'Hoàng Lan', room: 'C-601', date: '01/05/26', due: '25/05/26', amount: 7480000, status: 'pending', g: 3 },
    { id: 'HĐ-26050004', tenant: 'Phạm Bảo', room: 'A-808', date: '01/05/26', due: '20/05/26', amount: 6120000, status: 'overdue', g: 4 },
    { id: 'HĐ-26050005', tenant: 'Đỗ Hà Linh', room: 'D-1203', date: '01/05/26', due: '25/05/26', amount: 9520000, status: 'paid', g: 5 },
    { id: 'HĐ-26050006', tenant: 'Lưu Khánh', room: 'B-501', date: '01/05/26', due: '25/05/26', amount: 7150000, status: 'pending', g: 6 },
  ];
  const statusBadge = {
    paid: { c: 'badge-emerald', t: 'Đã thanh toán' },
    pending: { c: 'badge-amber', t: 'Chờ thanh toán' },
    overdue: { c: 'badge-rose', t: 'Trễ hạn' },
  };

  return (
    <AdminShell active="invoices" setActive={setActive} title="Hóa đơn" subtitle="Tháng 5, 2026 · 48 hóa đơn"
      actions={<>
        <button className="btn btn-glass btn-sm"><Icon name="sparkles" size={14} /> AI tạo hàng loạt</button>
        <button className="btn btn-primary btn-sm"><Icon name="plus" size={14} /> Tạo hóa đơn</button>
      </>}>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 18, marginBottom: 22 }}>
        <div className="glass glass-shine" style={{ padding: 22 }}>
          <div className="row-gap-2" style={{ marginBottom: 12 }}>
            <div className="ico ico-grad"><Icon name="check" size={16} color="var(--ok)" /></div>
            <div className="eyebrow">Đã thu</div>
          </div>
          <div className="tabular" style={{ fontSize: 26, fontWeight: 700, color: 'var(--ok)' }}>{formatVND(248500000)}</div>
          <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>42/48 hóa đơn</div>
        </div>
        <div className="glass glass-shine" style={{ padding: 22 }}>
          <div className="row-gap-2" style={{ marginBottom: 12 }}>
            <div className="ico ico-grad"><Icon name="clock" size={16} color="#f59e0b" /></div>
            <div className="eyebrow">Chờ thu</div>
          </div>
          <div className="tabular" style={{ fontSize: 26, fontWeight: 700, color: '#f59e0b' }}>{formatVND(23700000)}</div>
          <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>3 hóa đơn</div>
        </div>
        <div className="glass glass-shine" style={{ padding: 22 }}>
          <div className="row-gap-2" style={{ marginBottom: 12 }}>
            <div className="ico ico-grad"><Icon name="info" size={16} color="var(--err)" /></div>
            <div className="eyebrow">Trễ hạn</div>
          </div>
          <div className="tabular" style={{ fontSize: 26, fontWeight: 700, color: '#fda4af' }}>{formatVND(12300000)}</div>
          <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>3 hóa đơn</div>
        </div>
        <div className="glass glass-shine" style={{ padding: 22 }}>
          <div className="row-gap-2" style={{ marginBottom: 12 }}>
            <div className="ico ico-grad"><Icon name="trending" size={16} /></div>
            <div className="eyebrow">Trung bình</div>
          </div>
          <div className="tabular" style={{ fontSize: 26, fontWeight: 700 }} >{formatVND(7180000)}</div>
          <div className="muted row-gap-1" style={{ fontSize: 12, marginTop: 4 }}>
            <Icon name="arrowUp" size={11} color="var(--ok)" /> +4% vs tháng trước
          </div>
        </div>
      </div>

      <div className="glass" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 0.8fr 1fr 1fr 1.2fr 0.4fr',
          padding: '14px 22px', borderBottom: '1px solid var(--glass-border)', fontSize: 12, fontWeight: 600,
          color: 'var(--text-mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          <div>Mã hóa đơn</div><div>Khách thuê</div><div>Phòng</div><div>Hạn thanh toán</div>
          <div>Số tiền</div><div>Trạng thái</div><div></div>
        </div>
        {invoices.map((iv, i) => (
          <div key={iv.id} className="contract-row" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 0.8fr 1fr 1fr 1.2fr 0.4fr',
            padding: '16px 22px', borderBottom: i < invoices.length - 1 ? '1px solid var(--glass-border)' : 'none',
            fontSize: 14, alignItems: 'center' }}>
            <div className="mono" style={{ fontSize: 13, color: '#c7d2fe' }}>{iv.id}</div>
            <div className="row-gap-3">
              <Avatar initials={iv.tenant.split(' ').slice(-1)[0][0] + iv.tenant.split(' ')[0][0]} size={32} gradient={iv.g} />
              <div style={{ fontWeight: 600 }}>{iv.tenant}</div>
            </div>
            <div className="mono" style={{ fontSize: 13 }}>{iv.room}</div>
            <div className="muted" style={{ fontSize: 13 }}>{iv.due}</div>
            <div className="tabular" style={{ fontWeight: 600 }}>{formatVND(iv.amount)}</div>
            <div className="row-gap-2">
              <span className={`badge ${statusBadge[iv.status].c}`}
                style={iv.status === 'paid' ? { boxShadow: '0 0 12px rgba(16,185,129,0.3)' } :
                       iv.status === 'overdue' ? { boxShadow: '0 0 12px rgba(244,63,94,0.3)' } : {}}>
                <span className="dot" /> {statusBadge[iv.status].t}
              </span>
              {iv.status !== 'paid' && <button className="btn btn-ghost btn-sm" style={{ padding: '4px 10px' }}><Icon name="send" size={11} /> Nhắc</button>}
            </div>
            <div><button className="ico" style={{ width: 32, height: 32 }}><Icon name="moreH" size={14} /></button></div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
};

// ────────────────────────────────────────────────────────
// 5. CHAT (Admin ↔ Customer)
// ────────────────────────────────────────────────────────
const AdminChat = ({ setActive }) => {
  const conversations = [
    { name: 'Nguyễn Mai Ngọc', room: 'A-1502', last: 'Cảm ơn anh, tối nay em sẽ qua xem phòng ạ', time: '2p', unread: 0, online: true, g: 2, active: true },
    { name: 'Trần Quốc Anh', room: 'B-204', last: 'Cho em hỏi điện nước tính sao ạ?', time: '12p', unread: 2, online: true, g: 1 },
    { name: 'Hoàng Lan', room: 'C-601', last: 'Em muốn gia hạn thêm 1 năm', time: '1h', unread: 1, online: false, g: 3 },
    { name: 'Phạm Bảo', room: 'A-808', last: 'Anh đã chuyển khoản tiền nhà', time: '3h', unread: 0, online: false, g: 4 },
    { name: 'Đỗ Hà Linh', room: 'D-1203', last: 'Cảm ơn anh nhiều ạ ❤️', time: '6h', unread: 0, online: false, g: 5 },
    { name: 'Lưu Khánh', room: 'B-501', last: 'Bạn: ok mai gặp nhé', time: '1d', unread: 0, online: false, g: 6 },
  ];
  const messages = [
    { who: 'them', t: 'Chào anh ạ, em đang quan tâm phòng A-1502', time: '10:24' },
    { who: 'me',   t: 'Chào bạn! Phòng A-1502 hiện đang còn trống, vào ngày 15/05 nhé.', time: '10:25' },
    { who: 'them', t: 'Phòng có view như trong ảnh không ạ? Em định ở 1 năm.', time: '10:26' },
    { who: 'me',   t: 'Đúng như ảnh nhé, view nhìn ra trung tâm. Mình gửi bạn lịch xem phòng nha:', time: '10:27', card: 'tour' },
    { who: 'them', t: 'Cảm ơn anh, tối nay em sẽ qua xem phòng ạ', time: '10:31' },
  ];

  return (
    <AdminShell active="chat" setActive={setActive} title="Hộp thư" subtitle="6 cuộc trò chuyện · 3 tin chưa đọc">
      <div className="glass" style={{ padding: 0, height: 'calc(100vh - 180px)', minHeight: 600, display: 'grid', gridTemplateColumns: '320px 1fr 280px', overflow: 'hidden' }}>

        {/* Conversation list */}
        <div style={{ borderRight: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: 16 }}>
            <div className="input" style={{ padding: '8px 14px' }}>
              <Icon name="search" size={15} color="var(--text-mute)" />
              <input placeholder="Tìm khách..." />
            </div>
          </div>
          <div style={{ flex: 1, overflow: 'auto', padding: '0 8px 16px' }}>
            {conversations.map((c, i) => (
              <button key={i} style={{
                width: '100%', padding: 12, borderRadius: 14,
                background: c.active ? 'linear-gradient(135deg, rgba(99,102,241,0.18), rgba(168,85,247,0.12))' : 'transparent',
                border: c.active ? '1px solid rgba(168,85,247,0.3)' : '1px solid transparent',
                display: 'flex', gap: 12, alignItems: 'center',
                cursor: 'pointer', textAlign: 'left',
                transition: 'all .2s',
              }}
                onMouseEnter={e => !c.active && (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                onMouseLeave={e => !c.active && (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ position: 'relative' }}>
                  <Avatar initials={c.name.split(' ').slice(-1)[0][0] + c.name.split(' ')[0][0]} gradient={c.g} size={40} />
                  {c.online && <span style={{ position: 'absolute', bottom: 0, right: 0, width: 11, height: 11, borderRadius: '50%',
                    background: '#10b981', border: '2px solid #0a0e27' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="between" style={{ marginBottom: 2 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }} className="trunc">{c.name}</div>
                    <div className="faint" style={{ fontSize: 11 }}>{c.time}</div>
                  </div>
                  <div className="between">
                    <div className="muted" style={{ fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 170 }}>{c.last}</div>
                    {c.unread > 0 && (
                      <div style={{ width: 18, height: 18, borderRadius: '50%',
                        background: 'linear-gradient(135deg,#a855f7,#ec4899)',
                        fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 8px rgba(168,85,247,0.5)' }}>{c.unread}</div>
                    )}
                  </div>
                  <div className="mono faint" style={{ fontSize: 10, marginTop: 2 }}>{c.room}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat thread */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="between" style={{ padding: '14px 22px', borderBottom: '1px solid var(--glass-border)' }}>
            <div className="row-gap-3">
              <div style={{ position: 'relative' }}>
                <Avatar initials="NM" gradient={2} size={40} />
                <span style={{ position: 'absolute', bottom: 0, right: 0, width: 11, height: 11, borderRadius: '50%',
                  background: '#10b981', border: '2px solid #0a0e27' }} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Nguyễn Mai Ngọc</div>
                <div className="muted row-gap-1" style={{ fontSize: 12 }}>
                  <span className="live-dot" style={{ width: 6, height: 6 }} /> Đang trực tuyến · phòng A-1502
                </div>
              </div>
            </div>
            <div className="row-gap-2">
              <button className="ico"><Icon name="search" size={16} /></button>
              <button className="ico"><Icon name="moreH" size={16} /></button>
            </div>
          </div>

          <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ textAlign: 'center', margin: '8px 0' }}>
              <span className="badge badge-mute">Hôm nay · 06/05/2026</span>
            </div>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, flexDirection: m.who === 'me' ? 'row-reverse' : 'row' }}>
                {m.who === 'them' && <Avatar initials="NM" gradient={2} size={32} />}
                <div style={{ maxWidth: '70%' }}>
                  <div className="glass glass-shine" style={{
                    padding: '12px 16px',
                    borderRadius: m.who === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: m.who === 'me' ? 'linear-gradient(135deg, rgba(99,102,241,0.35), rgba(168,85,247,0.30))' : undefined,
                    fontSize: 14, lineHeight: 1.5,
                  }}>
                    {m.t}
                    {m.card === 'tour' && (
                      <div className="glass-thin" style={{ padding: 12, marginTop: 10, display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div className="ico ico-grad"><Icon name="calendar" size={16} /></div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>Lịch xem phòng</div>
                          <div className="muted" style={{ fontSize: 12 }}>Tối nay · 18:30 · A-1502</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="faint" style={{ fontSize: 11, marginTop: 4, textAlign: m.who === 'me' ? 'right' : 'left' }}>
                    {m.time} {m.who === 'me' && <Icon name="check" size={11} color="var(--ok)" style={{ verticalAlign: '-1px', marginLeft: 4 }} />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '12px 22px 16px' }}>
            <div className="glass-strong" style={{ padding: 6, borderRadius: 22, display: 'flex', alignItems: 'center', gap: 4 }}>
              <button className="ico" style={{ background: 'transparent', border: 'none' }}><Icon name="paperclip" size={18} /></button>
              <button className="ico" style={{ background: 'transparent', border: 'none' }}><Icon name="image" size={18} /></button>
              <input placeholder="Nhập tin nhắn..."
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', padding: '10px 8px', fontSize: 14, color: 'white' }} />
              <button className="btn btn-ghost btn-sm"><Icon name="sparkles" size={14} color="var(--accent)" /> AI gợi ý</button>
              <button className="btn btn-primary btn-sm" style={{ borderRadius: 999 }}><Icon name="send" size={14} /></button>
            </div>
          </div>
        </div>

        {/* Right panel — context */}
        <div style={{ borderLeft: '1px solid var(--glass-border)', padding: 22, overflowY: 'auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 18 }}>
            <Avatar initials="NM" gradient={2} size={72} />
            <div style={{ fontWeight: 700, fontSize: 16, marginTop: 12 }}>Nguyễn Mai Ngọc</div>
            <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>@maingoc · từ 03/2024</div>
          </div>

          <div className="glass-thin" style={{ padding: 14, marginBottom: 14 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Phòng đang ở</div>
            <div className="row-gap-3">
              <div className="photo ph-1" style={{ width: 48, height: 48, borderRadius: 10 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>A-1502 Studio Central</div>
                <div className="muted" style={{ fontSize: 11 }}>HĐ-2026-0142 · 247d</div>
              </div>
            </div>
          </div>

          <div className="glass-thin" style={{ padding: 14, marginBottom: 14 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Tài chính</div>
            <div className="col-gap-2" style={{ fontSize: 13 }}>
              <div className="between"><span className="muted">Đã thanh toán</span><span className="tabular" style={{ color: 'var(--ok)' }}>34M</span></div>
              <div className="between"><span className="muted">Sắp tới</span><span className="tabular">8.95M</span></div>
              <div className="between"><span className="muted">Đúng hạn</span><span style={{ color: 'var(--ok)' }}>100%</span></div>
            </div>
          </div>

          <div className="glass-thin" style={{ padding: 14 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Hành động nhanh</div>
            <div className="col-gap-2">
              {[
                { i: 'file', l: 'Xem hợp đồng' },
                { i: 'receipt', l: 'Tạo hóa đơn' },
                { i: 'calendar', l: 'Đặt lịch xem' },
              ].map((a, i) => (
                <button key={i} className="btn btn-glass btn-sm" style={{ width: '100%', justifyContent: 'flex-start' }}>
                  <Icon name={a.i} size={14} /> {a.l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
};

// ────────────────────────────────────────────────────────
// 6. AI ADMIN ASSISTANT
// ────────────────────────────────────────────────────────
const AdminAI = ({ setActive }) => {
  return (
    <AdminShell active="ai" setActive={setActive} title="AI Assistant" subtitle="Hỏi AI bằng ngôn ngữ tự nhiên · phân tích · báo cáo">

      {/* Hero input */}
      <div className="glass-strong glass-shine" style={{ padding: 28, marginBottom: 22, position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-violet" style={{ width: 300, height: 300, top: -100, right: -50, opacity: 0.5 }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="row-gap-3" style={{ marginBottom: 18 }}>
            <div className="ico ico-grad ico-lg glow-breathe" style={{ width: 52, height: 52 }}>
              <Icon name="sparkles" size={24} />
            </div>
            <div>
              <div className="h2" style={{ marginBottom: 2 }}>Hỏi gì cũng được</div>
              <div className="muted" style={{ fontSize: 14 }}>Glass AI hiểu data của bạn — phòng, hợp đồng, hóa đơn, khách thuê.</div>
            </div>
          </div>

          <div className="glass-strong" style={{ padding: 8, borderRadius: 22, display: 'flex', alignItems: 'center', gap: 4 }}>
            <input
              defaultValue="Phòng nào có ROI cao nhất 6 tháng qua, và tại sao?"
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none',
                padding: '14px 18px', fontSize: 15, color: 'white' }}
            />
            <button className="ico" style={{ background: 'transparent', border: 'none' }}><Icon name="mic" size={18} /></button>
            <button className="btn btn-primary"><Icon name="sparkles" size={14} /> Hỏi AI</button>
          </div>

          <div className="row-gap-2" style={{ marginTop: 14, flexWrap: 'wrap' }}>
            {[
              'Dự báo doanh thu Q3',
              'Khách trả chậm hơn 2 lần',
              'So sánh Tower A vs Tower B',
              'Gợi ý điều chỉnh giá',
              'Vẽ biểu đồ tỉ lệ trống 12 tháng',
            ].map(s => (
              <button key={s} className="pill"><Icon name="sparkles" size={12} /> {s}</button>
            ))}
          </div>
        </div>
      </div>

      {/* AI response */}
      <div className="glass" style={{ padding: 28, marginBottom: 22 }}>
        <div className="row-gap-3" style={{ marginBottom: 18 }}>
          <div className="ico ico-grad"><Icon name="sparkles" size={16} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Glass AI · phân tích ROI 6 tháng</div>
            <div className="muted" style={{ fontSize: 12 }}>Xem trên 50 phòng · 6 tháng · 1.2GB dữ liệu</div>
          </div>
          <span className="badge badge-violet"><Icon name="sparkles" size={11} /> GPT-Glass v3</span>
        </div>

        <div className="lead" style={{ fontSize: 15, marginBottom: 22 }}>
          Top 5 phòng có ROI cao nhất đều thuộc <strong style={{ color: '#a5f3fc' }}>Glass Tower A</strong>, các tầng cao
          (15+). Yếu tố chính: <strong>view & smart-lock</strong> giúp tăng giá thuê 18%, tỉ lệ tái ký 92%.
          Đề xuất: cân nhắc nâng cấp tầng 8-12 của Tower B với cùng cấu hình.
        </div>

        {/* AI-generated chart card */}
        <div className="glass-thin" style={{ padding: 22, marginBottom: 16 }}>
          <div className="between" style={{ marginBottom: 14 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 4 }}>Top 5 phòng ROI cao nhất</div>
              <div className="muted" style={{ fontSize: 12 }}>Tính theo (doanh thu - chi phí) / giá vốn</div>
            </div>
            <button className="btn btn-ghost btn-sm"><Icon name="download" size={12} /> PNG</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 180 }}>
            {[
              { l: 'A-1502', v: 32, t: 'Penthouse' },
              { l: 'A-1601', v: 28, t: 'Studio' },
              { l: 'A-1408', v: 26, t: 'Studio' },
              { l: 'A-1502b', v: 24, t: '2BR' },
              { l: 'A-1306', v: 22, t: 'Studio' },
            ].map((b, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
                <div className="tabular" style={{ fontSize: 13, fontWeight: 700, color: '#a5f3fc' }}>+{b.v}%</div>
                <div style={{
                  width: '60%', height: b.v * 4,
                  background: 'linear-gradient(180deg, #a5f3fc 0%, #6366f1 50%, #a855f7 100%)',
                  borderRadius: '8px 8px 0 0',
                  boxShadow: '0 -4px 16px rgba(99,102,241,0.4)',
                }} />
                <div style={{ fontSize: 12, fontWeight: 600 }}>{b.l}</div>
                <div className="muted" style={{ fontSize: 11 }}>{b.t}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI-generated table card */}
        <div className="glass-thin" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--glass-border)' }}>
            <div className="eyebrow">Yếu tố ảnh hưởng ROI (regression)</div>
          </div>
          {[
            { f: 'View đẹp', i: '+18%', sig: 'Cao', c: '#6ee7b7' },
            { f: 'Smart lock', i: '+11%', sig: 'Cao', c: '#6ee7b7' },
            { f: 'Tầng > 10', i: '+8%', sig: 'Trung bình', c: '#fcd34d' },
            { f: 'Có ban công', i: '+6%', sig: 'Trung bình', c: '#fcd34d' },
            { f: 'Gần MRT', i: '+4%', sig: 'Thấp', c: '#a5f3fc' },
          ].map((row, i, arr) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr',
              padding: '14px 18px', borderBottom: i < arr.length - 1 ? '1px solid var(--glass-border)' : 'none',
              fontSize: 14, alignItems: 'center' }}>
              <div>{row.f}</div>
              <div className="tabular" style={{ fontWeight: 600, color: row.c }}>{row.i}</div>
              <div><span className="badge badge-mute">{row.sig}</span></div>
            </div>
          ))}
        </div>

        <div className="row-gap-2" style={{ marginTop: 16 }}>
          <button className="btn btn-glass btn-sm">👍 Hữu ích</button>
          <button className="btn btn-glass btn-sm">👎</button>
          <button className="btn btn-ghost btn-sm"><Icon name="refresh" size={12} /> Tái tạo</button>
          <div className="spacer" />
          <button className="btn btn-glass btn-sm"><Icon name="download" size={14} /> Xuất báo cáo PDF</button>
        </div>
      </div>
    </AdminShell>
  );
};

// ────────────────────────────────────────────────────────
// 7. TENANTS
// ────────────────────────────────────────────────────────
const AdminTenants = ({ setActive }) => {
  const tenants = [
    { name: 'Nguyễn Mai Ngọc', room: 'A-1502', phone: '0901 234 567', joined: '15/01/26', amount: 8500000, score: 98, g: 2 },
    { name: 'Trần Quốc Anh',  room: 'B-204',  phone: '0912 345 678', joined: '01/12/25', amount: 6200000, score: 95, g: 1 },
    { name: 'Hoàng Lan',      room: 'C-601',  phone: '0923 456 789', joined: '20/06/25', amount: 7200000, score: 92, g: 3 },
    { name: 'Phạm Bảo',       room: 'A-808',  phone: '0934 567 890', joined: '10/03/26', amount: 5800000, score: 78, g: 4 },
    { name: 'Đỗ Hà Linh',     room: 'D-1203', phone: '0945 678 901', joined: '01/04/26', amount: 9200000, score: 99, g: 5 },
    { name: 'Lưu Khánh',      room: 'B-501',  phone: '0956 789 012', joined: '15/05/25', amount: 6800000, score: 88, g: 6 },
    { name: 'Vũ Phương',      room: 'A-902',  phone: '0967 890 123', joined: '01/05/26', amount: 7500000, score: 100, g: 1 },
    { name: 'Bùi Đức',        room: 'C-301',  phone: '0978 901 234', joined: '12/08/25', amount: 5500000, score: 84, g: 4 },
  ];

  return (
    <AdminShell active="tenants" setActive={setActive} title="Khách thuê" subtitle="48 khách đang thuê · 3 mới tháng này"
      actions={<button className="btn btn-primary btn-sm"><Icon name="plus" size={14} /> Thêm khách</button>}>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
        {tenants.map((t, i) => (
          <div key={i} className="glass glass-shine glass-i" style={{ padding: 20 }}>
            <div className="between" style={{ marginBottom: 16 }}>
              <Avatar initials={t.name.split(' ').slice(-1)[0][0] + t.name.split(' ')[0][0]} size={52} gradient={t.g} />
              <div style={{ textAlign: 'right' }}>
                <div className="muted" style={{ fontSize: 11 }}>Trust score</div>
                <div className="row-gap-1">
                  <Icon name="shield" size={14} color={t.score >= 95 ? '#6ee7b7' : t.score >= 85 ? '#fcd34d' : '#fda4af'} />
                  <span style={{ fontWeight: 700, fontSize: 16,
                    color: t.score >= 95 ? '#6ee7b7' : t.score >= 85 ? '#fcd34d' : '#fda4af' }} className="tabular">{t.score}</span>
                </div>
              </div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{t.name}</div>
            <div className="muted row-gap-1" style={{ fontSize: 12, marginBottom: 14 }}>
              <Icon name="building" size={11} /> {t.room} · từ {t.joined}
            </div>

            <div className="glass-thin" style={{ padding: 12, marginBottom: 12 }}>
              <div className="between" style={{ marginBottom: 4 }}>
                <span className="muted" style={{ fontSize: 12 }}>Tiền thuê</span>
                <span className="tabular" style={{ fontWeight: 600, fontSize: 13 }}>{formatVND(t.amount)}</span>
              </div>
              <div className="between">
                <span className="muted" style={{ fontSize: 12 }}>SĐT</span>
                <span className="mono" style={{ fontSize: 12 }}>{t.phone}</span>
              </div>
            </div>

            <div className="row-gap-2">
              <button className="btn btn-glass btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                <Icon name="chat" size={13} /> Nhắn
              </button>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                <Icon name="file" size={13} /> Hồ sơ
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
};

Object.assign(window, {
  AdminShell, AdminDashboard, AdminRooms, AdminContracts, AdminInvoices, AdminChat, AdminAI, AdminTenants,
});

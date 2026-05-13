/* ai-button.jsx — Floating AI button + popover panel (light edition) */

const AIFloatingButton = ({ onOpenFull }) => {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');

  return (
    <>
      <div style={{
        position: 'fixed', bottom: 96, right: 24, zIndex: 999,
        width: 360, maxHeight: 480,
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.96)',
        pointerEvents: open ? 'auto' : 'none',
        transition: 'all .28s cubic-bezier(.2,.8,.2,1)',
      }}>
        <div className="glass-strong" style={{
          padding: 18, borderRadius: 22,
          display: 'flex', flexDirection: 'column', gap: 14,
          height: 460,
        }}>
          <div className="row-gap-3">
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="sparkles" size={16} color="white" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Glass AI</div>
              <div className="muted" style={{ fontSize: 11 }}>Trợ lý tìm phòng riêng của bạn</div>
            </div>
            <button className="ico" onClick={() => setOpen(false)} style={{ width: 28, height: 28 }}>
              <Icon name="x" size={12} />
            </button>
          </div>

          <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{
              padding: 12, fontSize: 13, lineHeight: 1.5,
              background: 'var(--accent-soft)',
              border: '1px solid rgba(79,70,229,0.12)',
              borderRadius: '14px 14px 14px 4px',
              color: 'var(--text)',
            }}>
              Chào bạn 👋 Mình có thể giúp bạn tìm phòng phù hợp, so sánh, hoặc trả lời thắc mắc về hợp đồng.
            </div>
            <div className="eyebrow" style={{ fontSize: 10, marginTop: 4 }}>Gợi ý cho bạn</div>
            {[
              'Studio dưới 8 triệu, có ban công',
              'So sánh A-1502 và B-204',
              'Khi nào nên gia hạn hợp đồng?',
              'Cách tính tiền điện nước',
            ].map(s => (
              <button key={s} style={{
                padding: '10px 12px', textAlign: 'left', fontSize: 12.5,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                background: 'white',
                border: '1px solid var(--line)',
                borderRadius: 10,
                color: 'var(--text)',
                transition: 'border-color .15s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}>
                <Icon name="sparkles" size={11} color="var(--accent)" />
                {s}
              </button>
            ))}
          </div>

          <div className="input" style={{ padding: 4, gap: 4 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Hỏi gì cũng được..."
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none',
                padding: '8px 12px', fontSize: 13, color: 'var(--text)' }}
            />
            <button style={{
              width: 32, height: 32, borderRadius: 8, border: 'none',
              background: input ? 'var(--accent)' : 'rgba(15,23,42,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all .15s',
            }}>
              <Icon name="send" size={13} color={input ? 'white' : 'var(--text-mute)'} />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Mở Glass AI"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
          width: 56, height: 56, borderRadius: '50%', border: 'none',
          background: 'var(--accent)',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(79,70,229,0.28), 0 1px 0 rgba(255,255,255,0.25) inset',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform .2s cubic-bezier(.2,.8,.2,1), box-shadow .2s',
          transform: open ? 'scale(0.94)' : 'scale(1)',
        }}
        onMouseEnter={e => !open && (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={e => !open && (e.currentTarget.style.transform = 'scale(1)')}
      >
        <Icon name="sparkles" size={20} color="white" />
      </button>
    </>
  );
};

window.AIFloatingButton = AIFloatingButton;

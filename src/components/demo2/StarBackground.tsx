export function StarBackground() {
  return (
    <div
      className="site-background"
      style={{
        background: `
          radial-gradient(
            ellipse at 50% 100%,
            rgba(212,160,23,0.30) 0%,
            rgba(212,160,23,0.10) 30%,
            rgba(0,0,0,0.95) 70%
          ),
          linear-gradient(
            to bottom,
            #000000 0%,
            #050505 60%,
            #000000 100%
          )
        `,
      }}
    />
  );
}

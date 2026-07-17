export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(38,32,26,0.12)",
        padding: "2.5rem 0",
        marginTop: "4rem",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.9rem",
        }}
      >
        <span>Michael Ballash · Miami Design District</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <a href="tel:9546518848" style={{ textDecoration: "none" }}>
            954-651-8848
          </a>
          <a href="mailto:Mballash99@gmail.com" style={{ textDecoration: "none" }}>
            Mballash99@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Loading() {
  return (
    <section className="container section">
      <div className="skeleton" style={{ height: 100, marginBottom: 30 }} />
      <div className="product-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton" style={{ height: 190 }} />
        ))}
      </div>
    </section>
  );
}

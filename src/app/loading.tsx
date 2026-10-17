export default function Loading() {
  return (
    <>
      <div className="skeleton" style={{ height: 520, borderRadius: 0 }} />
      <section className="container section">
        <div className="product-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton" style={{ height: 190 }} />
          ))}
        </div>
      </section>
    </>
  );
}

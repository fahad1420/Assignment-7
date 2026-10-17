export default function ProfileLoading() {
  return (
    <section
      className="container profile-page profile-loading"
      aria-label="প্রোফাইল লোড হচ্ছে"
    >
      <div className="profile-card">
        <div className="skeleton profile-avatar-skeleton" />
        <div className="skeleton profile-line short" />
        <div className="skeleton profile-line title" />
        <div className="skeleton profile-line email" />
        <div className="skeleton profile-info-skeleton" />
        <div className="skeleton profile-button-skeleton" />
      </div>
    </section>
  );
}

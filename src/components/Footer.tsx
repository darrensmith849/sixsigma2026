export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer-bg border-t border-border-grey">
      <div className="container py-6 text-center text-[14px] text-muted">
        &copy; {year} &ndash; Six Sigma South Africa
      </div>
    </footer>
  );
}

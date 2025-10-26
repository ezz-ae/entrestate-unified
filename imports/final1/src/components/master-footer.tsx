export default function MasterFooter(){
  return (<footer className="border-t border-white/10 mt-16">
    <div className="container py-10 text-sm opacity-80 flex justify-between">
      <p>© {new Date().getFullYear()} Entrestate Cloud</p>
      <nav className="flex gap-4">
        <a href="/privacy" className="hover:underline">Privacy</a>
        <a href="/terms" className="hover:underline">Terms</a>
      </nav>
    </div>
  </footer>);
}

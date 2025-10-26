import PageHeader from '@/src/components/page-header';
export default function Suite({params}:{params:{slug:string}}){
  return (<div className="space-y-6">
    <PageHeader title={`Solution: ${params.slug}`} subtitle="Multi-section landing"/>
    <div className="grid md:grid-cols-2 gap-4">
      <section className="card"><h2>Overview</h2><p>Use cases, audiences, specs.</p></section>
      <section className="card"><h2>Outcomes</h2><ul className="list-disc pl-6"><li>GTM speed</li><li>Lead quality</li></ul></section>
      <section className="card md:col-span-2"><h2>How it works</h2><p>Backed by GEM flows & Firestore.</p></section>
    </div>
  </div>);
}

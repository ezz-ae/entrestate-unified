import PageHeader from '@/src/components/page-header';
export default function Topic({params}:{params:{slug:string}}){
  return (<div className="space-y-6"><PageHeader title={`Academy: ${params.slug}`} subtitle="SEO-optimized" /><div className="card"><p>Lesson content from flows.</p></div></div>);
}

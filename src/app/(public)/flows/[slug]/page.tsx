import PageHeader from '@/src/components/page-header';
export default function Flow({params}:{params:{slug:string}}){
  return (<div className="space-y-6"><PageHeader title={`Flow: ${params.slug}`} subtitle="Composable & auditable" /><div className="card"><p>Run + details here.</p></div></div>);
}

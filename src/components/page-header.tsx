export default function PageHeader({title,subtitle}:{title:string,subtitle?:string}){
  return (<div className="mb-8"><h1>{title}</h1>{subtitle&&<p className="opacity-70 mt-2">{subtitle}</p>}</div>)
}
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const items=[
  {href:'/me',label:'Home'},
  {href:'/me/flows',label:'Flows'},
  {href:'/me/gem',label:'GEM'},
  {href:'/me/dev',label:'DEV'},
  {href:'/me/appstore',label:'Appstore'},
  {href:'/me/listing-portal',label:'Listing Portal'},
  {href:'/me/meta-intelligence',label:'Meta Intelligence'},
];
export default function WorkspaceSidebar(){
  const path=usePathname();
  return (<aside className="w-64 border-r border-white/10 p-4 sticky top-0 h-[100svh] overflow-auto">
    <div className="text-sm font-semibold mb-4 opacity-80">Workspace</div>
    <ul className="space-y-1">
      {items.map(it=>(
        <li key={it.href}><Link href={it.href} className={`block px-3 py-2 rounded-lg hover:bg-white/10 ${path===it.href?'bg-white/10':''}`}>{it.label}</Link></li>
      ))}
    </ul>
  </aside>);
}

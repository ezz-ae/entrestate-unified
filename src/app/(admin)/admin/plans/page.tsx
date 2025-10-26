export default function AdminPlans() {
  const plans = [
    { id: 'free', name: 'Free', price: '$0/mo' },
    { id: 'pro', name: 'Pro', price: '$25/mo' },
    { id: 'growth', name: 'Growth', price: '$39/mo' },
    { id: 'scale', name: 'Scale', price: '$59/mo' },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Plans</h1>
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left px-4 py-2">ID</th>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(p=> (
              <tr key={p.id} className="border-t border-white/10">
                <td className="px-4 py-2 font-mono">{p.id}</td>
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

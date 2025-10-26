"use client";
export default function BillingPage() {
  const invoices = [
    { id: "INV-1001", amount: 199, date: "2025-09-15", status: "paid" },
    { id: "INV-1002", amount: 199, date: "2025-10-15", status: "due" },
  ];
  return (
    <div>
      <h1 className="text-3xl font-semibold">Billing & Plans</h1>
      <p className="text-neutral-600 mt-1">Choose a plan, view usage, and download invoices.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <h2 className="font-medium">Free</h2>
          <p className="text-sm text-neutral-600 mt-1">Library, basic WhatsMAP</p>
        </div>
        <div className="card p-4 ring-2 ring-black">
          <h2 className="font-medium">Pro</h2>
          <p className="text-sm text-neutral-600 mt-1">Full WhatsMAP, Appstore suites</p>
        </div>
        <div className="card p-4">
          <h2 className="font-medium">Enterprise</h2>
          <p className="text-sm text-neutral-600 mt-1">Custom quotas, data feeds, SLAs</p>
        </div>
      </div>

      <h2 className="font-medium mt-8">Invoices</h2>
      <div className="mt-3 overflow-x-auto card">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="text-left p-3">Invoice</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((i) => (
              <tr key={i.id} className="border-t">
                <td className="p-3">{i.id}</td>
                <td className="p-3">{i.date}</td>
                <td className="p-3">AED {i.amount}</td>
                <td className="p-3">{i.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

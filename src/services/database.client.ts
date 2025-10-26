// client-safe wrappers that call your API routes
export async function saveUserData(uid: string, data: Record<string, any>) {
  const res = await fetch('/api/user/profile', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ uid, ...data }),
  });
  if (!res.ok) throw new Error('Failed to save user data');
  return res.json();
}

export async function getUserData(uid: string) {
  const res = await fetch(`/api/user/profile?uid=${encodeURIComponent(uid)}`);
  if (!res.ok) throw new Error('Failed to fetch user data');
  const j = await res.json();
  return j?.profile ?? null;
}

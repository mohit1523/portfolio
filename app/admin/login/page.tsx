import type { Metadata } from 'next';
import { loginAction } from '../actions';

export const metadata: Metadata = {
  title: 'Admin Login',
};

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <main className="adminLoginPage">
      <div className="adminLoginCard">
        <div className="adminPanelHeader">
          <p className="adminEyebrow">Protected Access</p>
          <h1>Portfolio Admin</h1>
          <p>
            Sign in to manage portfolio content, projects, SEO settings, and recruiter-facing messaging.
          </p>
        </div>

        <form action={loginAction} className="adminForm">
          <label>
            Username
            <input type="text" name="username" placeholder="admin" required />
          </label>
          <label>
            Password
            <input type="password" name="password" placeholder="ChangeMe123!" required />
          </label>
          <button type="submit" className="adminButton">
            Sign In
          </button>
        </form>

        <LoginError searchParams={searchParams} />
      </div>
    </main>
  );
}

async function LoginError({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  if (params.error !== 'invalid') {
    return null;
  }

  return <p className="adminError">Invalid credentials. Update your env values before deploying.</p>;
}

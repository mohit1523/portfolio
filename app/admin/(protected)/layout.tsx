import { requireAdminSession } from '@/lib/auth';
import { logoutAction } from '../actions';
import AdminSidebarNav from '@/components/AdminSidebarNav';

const adminLinks = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/resume', label: 'Resume' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/testimonials', label: 'Testimonials' },
  { href: '/admin/contact', label: 'Contact' },
];

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminSession();

  return (
    <div className="adminShell">
      <aside className="adminSidebar">
        <div className="adminSidebarTop">
          <p className="adminEyebrow">Portfolio CMS</p>
          <h2>Admin</h2>
        </div>

        <AdminSidebarNav links={adminLinks} />

        <form action={logoutAction} className="adminSidebarFooter">
          <button type="submit" className="adminGhostButton">
            Sign Out
          </button>
        </form>
      </aside>

      <main className="adminContent">{children}</main>
    </div>
  );
}

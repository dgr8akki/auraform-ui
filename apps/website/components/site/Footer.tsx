import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-current/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Documentation</h3>
            <ul className="space-y-2 text-sm text-current/60">
              <li>
                <Link href="/docs/getting-started" className="hover:text-current">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/docs/components" className="hover:text-current">
                  Components
                </Link>
              </li>
              <li>
                <Link href="/docs/theming" className="hover:text-current">
                  Theming
                </Link>
              </li>
              <li>
                <Link href="/docs/accessibility" className="hover:text-current">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Packages</h3>
            <ul className="space-y-2 text-sm text-current/60">
              <li>
                <Link href="/docs/components" className="hover:text-current">
                  @auraform/react
                </Link>
              </li>
              <li>
                <Link href="/docs/core-api" className="hover:text-current">
                  @auraform/core
                </Link>
              </li>
              <li>
                <Link href="/docs/react-native" className="hover:text-current">
                  @auraform/native
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Community</h3>
            <ul className="space-y-2 text-sm text-current/60">
              <li>
                <a
                  href="https://github.com/your-org/auraform-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-current"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/org/auraform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-current"
                >
                  npm
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Auraform UI</h3>
            <p className="text-sm text-current/60">
              Accessibility-first neumorphic React components. MIT Licensed.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-current/5 text-center text-sm text-current/40">
          Built with Next.js. Styled with Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}

type FooterProps = {
  name?: string;
  email?: string;
  linkedinUrl?: string;
  productName?: string;
  year?: number;
};

const DEFAULT_PROFILE = {
  name: "Doh Kim",
  email: "whltn8282@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/dohyoungkim1011",
  productName: "readme-flow",
  year: 2026,
};

export function Footer({
  name = DEFAULT_PROFILE.name,
  email = DEFAULT_PROFILE.email,
  linkedinUrl = DEFAULT_PROFILE.linkedinUrl,
  productName = DEFAULT_PROFILE.productName,
  year = DEFAULT_PROFILE.year,
}: FooterProps) {
  return (
    <footer className="h-14 flex justify-center border-t border-(--border) px-4 py-7 text-[13px] text-(--text3) sm:px-6">
      <div className="flex max-w-205 flex-col items-center justify-center">
        <nav
          aria-label="Footer links"
          className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6"
        >
          <span className="text-[13px] font-bold text-(--text3)">
            {productName}
          </span>

          <a
            href={`mailto:${email}`}
            className="text-[13px] font-medium text-(--text3) transition-colors duration-100 hover:text-(--accent) hover:underline"
          >
            {email}
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[13px] font-medium text-(--text3) transition-colors duration-100 hover:text-(--accent) hover:underline"
          >
            LinkedIn
          </a>
        </nav>

        <p className="text-[13px] font-semibold text-(--text3)">
          © {year} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto mb-20 max-w-[30rem] px-4 text-center text-muted-foreground sm:max-w-[50rem]">
      <small className="mb-2 block text-xs">
        &copy; {year} Created by{" "}
        <a
          href="https://github.com/JAHMD"
          target="_blank"
          className="font-semibold text-muted-foreground transition-colors hover:text-white"
        >
          Ahmed Wael
        </a>
        .
      </small>
      <p className="text-xs leading-6">
        <span className="font-semibold">About this website:</span> built with
        React & Next.js (App Router), TypeScript, Tailwind CSS and Vercel
        hosting.
      </p>
    </footer>
  );
}

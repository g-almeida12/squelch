export function Footer() {
  return (
    <footer className="min-h-10 bg-surface flex items-center justify-center -mx-4 px-4">
      <p className="text-center">
        <small className="text-[14px]">
          Desenvolvido por{" "}
          <span className="text-accent-primary font-bold">
            <a
              href="https://www.instagram.com//g_almeida17"
              target="_blank"
              rel="author"
            >
              Gabriel Almeida
            </a>
          </span>{" "}
          para o projeto final do CS50x.
        </small>
      </p>
    </footer>
  );
}

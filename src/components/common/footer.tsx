const Footer = () => {
  return (
    <footer className="bg-accent mt-5 w-full">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs font-medium lg:text-sm">
            © 2025 Copyright BOUTIQUE MODERNA
          </p>
          <p className="text-muted-foreground text-xs font-medium lg:text-sm">
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

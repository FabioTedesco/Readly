export const Footer = () => {
  return (
    <footer className="w-full bg-indigo-600 text-white py-4 mt-10 shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-2 text-sm">
        {/* Left side */}
        <p className="text-center md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">Readly</span>. All rights reserved.
        </p>

        {/* Right side */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-indigo-300 transition">
            Privacy
          </a>
          <a href="#" className="hover:text-indigo-300 transition">
            Terms
          </a>
          <a href="#" className="hover:text-indigo-300 transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export const ContentLayout = ({ children, className }) => {
  return (
    <section
      className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      {children}
    </section>
  );
};

export default function PublicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>PUB</div>
      <main>{children}</main>
    </>
  );
}

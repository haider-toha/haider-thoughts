import Header from "@/components/Header";

const NoPosts = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold font-mono">No thoughts yet.</h2>
        <p className="text-muted-foreground mt-4">Check back soon.</p>
      </div>
    </div>
  );
};

export default NoPosts;

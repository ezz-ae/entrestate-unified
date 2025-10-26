import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teamMembers = [
  { name: "Mahmoud Ezz", role: "Founder & CEO", avatar: "/avatars/01.png" },
  { name: "Jane Doe", role: "Chief Technology Officer", avatar: "/avatars/02.png" },
  { name: "John Smith", role: "Head of Data Science", avatar: "/avatars/03.png" },
];

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">The OS for Real Estate Entrepreneurs</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Entrestate was born from a simple observation: the real estate industry runs on fragmented data, manual processes, and outdated tools. We are building the AI-native operating system to change that, empowering entrepreneurs with the intelligence and automation needed to build empires.
        </p>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-10">Our Mission</h2>
        <p className="max-w-4xl mx-auto text-center text-muted-foreground">
          Our mission is to democratize access to institutional-grade data and AI-powered tools, enabling any real estate professional to operate with the speed and intelligence of a global enterprise. We believe that the future of real estate will be orchestrated, not just managed.
        </p>
      </div>

      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-10">Meet the Team</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
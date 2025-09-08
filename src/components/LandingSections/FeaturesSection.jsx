import { Link, Zap, Lock } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Link className="w-8 h-8 text-emerald-500" />,
      title: "All your links in one place",
      description: "No more losing links in chats, emails, or random notes.",
    },
    {
      icon: <Zap className="w-8 h-8 text-emerald-500" />,
      title: "Fast & simple",
      description:
        "Add and access your links in seconds with our intuitive interface.",
    },
    {
      icon: <Lock className="w-8 h-8 text-emerald-500" />,
      title: "Private & secure",
      description: "Your links stay safe and accessible only to you.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-16 sm:px-36 md:px-14 lg:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why choose <span className="text-emerald-500">Dalil?</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 rounded-2xl  bg-[length:300%_300%] bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 transition-all duration-500 group-hover:scale-105"></div>

              {/* Card Content */}
              <div className="relative bg-white rounded-2xl shadow-lg p-6 text-center transition-transform duration-500 group-hover:scale-105 group-hover:shadow-emerald-200">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

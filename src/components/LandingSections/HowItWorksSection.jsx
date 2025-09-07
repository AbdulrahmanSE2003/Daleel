import { UserPlus, PlusCircle, Folder } from "lucide-react";

export default function HowItWorksGrid() {
  const steps = [
    {
      icon: <UserPlus className="w-12 h-12 text-white" />,
      title: "Create your account",
      description: "Sign up in seconds and get started immediately.",
      bgColor: "bg-emerald-500",
      image: "/Hands - Phone.png",
    },
    {
      icon: <PlusCircle className="w-12 h-12 text-white" />,
      title: "Save your links",
      description: "Add links with one click from anywhere so easy.",
      bgColor: "bg-blue-500",
      image: "/Hands - Tiny Lock.png",
    },
    {
      icon: <Folder className="w-12 h-12 text-white" />,
      title: "Organize & find easily",
      description: "Use folders, tags, or search to stay in control.",
      bgColor: "bg-purple-500",
      image: "/undraw_options_mw73.svg",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-10 md:px-20 lg:px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          How <span className="text-emerald-500">Dalil</span> Works
        </h2>

        <div className="grid lg:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 duration-300 transition-transform ${step.bgColor}`}
            >
              <div className="mb-6">{step.icon}</div>
              <h3 className="text-2xl font-semibold mb-3 text-white">
                {step.title}
              </h3>
              <p className="text-white mb-4">{step.description}</p>
              <img
                src={step.image}
                alt={step.title}
                className="w-32 h-32 opacity-80"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

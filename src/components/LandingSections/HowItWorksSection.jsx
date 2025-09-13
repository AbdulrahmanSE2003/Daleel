import { UserPlus, PlusCircle, Folder } from "lucide-react";

export default function HowItWorksGrid() {
  const steps = [
    {
      icon: <UserPlus className="w-12 h-12 text-white" />,
      title: "Create your account",
      description: "Sign up in seconds and get started immediately.",
      bgColor: "bg-emerald-500",
      image: "/Hands - Phone.png",
      features: [
        "Fast Sign-Up",
        "Easy Onboarding",
        "Secure Login",
        "Data Encryption",
      ],
    },
    {
      icon: <PlusCircle className="w-12 h-12 text-white" />,
      title: "Save your links",
      description: "Add links with one click from anywhere so easy.",
      bgColor: "bg-blue-500",
      image: "/Hands - Tiny Lock.png",
      features: [
        "One-Click Save",
        "Universal Access",
        "Auto-Categorization",
        "Data Encryption",
      ],
    },
    {
      icon: <Folder className="w-12 h-12 text-white" />,
      title: "Organize & find easily",
      description: "Use folders, tags, or search to stay in control.",
      bgColor: "bg-purple-500",
      image: "/undraw_options_mw73.svg",
      features: [
        "Custom Folders",
        "Tagging System",
        "Powerful Search",
        "Data Encryption",
      ],
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-10 md:px-20 lg:px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          How <span className="text-emerald-500">Dalil</span> Works
        </h2>

        {/* <div className="grid lg:grid-cols-3 gap-10">
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
        </div> */}

        <br />

        {/* Some Animation */}
        <div className="grid lg:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`product-card  rounded-2xl shadow-lg p-8 overflow-hidden  relative cursor-pointer snap-start shrink-0 py-8 px-6 flex flex-col items-center justify-center gap-3 hover:scale-105  transition-all duration-300 group ${step.bgColor}`}
            >
              <div className="flex flex-col items-center justify-center text-center leading-none z-40">
                <div className="mb-6">{step.icon}</div>
                <p className="para uppercase mb-4 font-bold text-xl tracking-wider text-white z-30">
                  {step.title}
                </p>
                <p className="text-white ">{step.description}</p>
              </div>
              <div className="flex items-center justify-between  aspect-square relative z-20 after:absolute after:h-1 after:w-full after:opacity-0 after:bg-[#7b956a] after:top-8 after:left-0 after:group-hover:opacity-100 after:translate-x-1/2 after:translate-y-1/2 after:-z-20 after:group-hover:w-full after:transition-all after:duration-300 after:group-hover:origin-right after:group-hover:-translate-x-1/2 group-hover:translate-x-1/2 transition-all duration-300">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-32 h-32 opacity-80"
                />
                <div className=" tooltips absolute   -translate-x-[150%] p-2 flex flex-col items-center justify-center gap-10 transition-all duration-300 group-hover:-translate-x-full">
                  <ul className="flex flex-col items-start gap-2 ">
                    {step.features.map((feature, index) => (
                      <li
                        key={index}
                        className={`inline-flex gap-2 items-center  justify-center group-hover:delay-${
                          200 + index * 100
                        } transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500`}
                      >
                        <svg
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth={3}
                          className="stroke-[#495c48]"
                          stroke="#000000"
                          fill="none"
                          viewBox="0 0 24 24"
                          height={10}
                          width={10}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <p className="text-xs font-semibold text-gray-200 ">
                          {feature}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

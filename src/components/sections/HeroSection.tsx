import { ArrowRight, Play, Zap } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">

      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 pb-20 pt-28 text-center lg:px-8">
        {/* Badge */}

        <Badge variant="secondary" className="p-4 mb-12 border-gray-200">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white">
            <Zap className="h-3 w-3" />
          </div>
          Modern Realtime Infrastructure Platform
        </Badge>

        {/* Heading */}
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Build Powerful
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent"> Realtime Applications </span>
          Without Complexity
        </h1>

        {/* Description */}
        <p className="mt-10 max-w-4xl text-lg leading-8 text-gray-600 sm:text-xl">
          Power scalable messaging, IoT communication, and distributed systems
          with enterprise-grade realtime infrastructure built for modern
          applications.
        </p>

        {/* Buttons */}
        <div className="mt-20 flex flex-col items-center gap-4 sm:flex-row">
          <Button className="p-6">
            Start Building
            <ArrowRight />
          </Button>

          <Button variant="outline" className="p-6">
            <Play />
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

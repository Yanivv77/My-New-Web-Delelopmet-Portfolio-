const data = [
  {
    id: 1,
    image: "/work/plasbit.webp",
    company: "PlasBit",
    role: "Full Stack Developer (70% Frontend, 30% Backend)",
    date: "07/2023 - 07/2024",
    skills: [
      { id: 1, name: "JavaScript", image: "/skills/javascript.webp" },
      { id: 10, name: "React", image: "/skills/react.webp" },
      { id: 20, name: "NodeJS", image: "/skills/node-js.webp" },
      { id: 23, name: "MongoDB", image: "/skills/mongodb.webp" },
      { id: 12, name: "Redux", image: "/skills/redux.webp" },
      { id: 27, name: "Jest", image: "/skills/jest.webp" },
    ],
    options: [
      "Built and launched over 5 new features using JavaScript, React, Node.js, and MongoDB, and consistently delivered high-quality code through well-organized pull requests.",
      "Led the development and testing of the crypto exchange section, a key feature that significantly improved system functionality by delivering clean, efficient, and thoroughly tested code.",
      "Optimized client-side performance by refactoring key sections into reusable components, reducing load times, and improving overall application responsiveness while enhancing code maintainability.",
      "Improved the deployment process, reducing build times by 40% using Linux subsystems, resulting in faster releases and increased team productivity, enabling quicker feature releases."
    ],
  },
  {
    id: 2,
    image: "/work/zionet.webp",
    company: "ZioNet",
    role: "Full Stack Developer",
    date: "05/2022 - 06/2023",
    skills: [
      { id: 2, name: "C#", image: "/skills/csharp.svg" },
      { id: 10, name: "React", image: "/skills/react.webp" },
      { id: 15, name: "AWS", image: "/skills/aws.webp" },
      { id: 16, name: "Git", image: "/skills/git.webp" }
    ],
    options: [
      "Developed a web application from the ground up using C# for the backend and React for the frontend, creating a platform for photographers that sends images to users in real-time using AWS AI recognition.",
      "Worked in an Agile environment, utilizing Git for version control and implementing CI/CD development practices.",
      "Set up automated tests, reducing bugs and ensuring consistent deployment, which improved overall team productivity."
    ],
  },
  {
    id: 3,
    image: "/work/nogacs.webp",
    company: "NogaCS",
    role: "Python Developer",
    date: "05/2022 - 11/2022",
    skills: [
      { id: 3, name: "Python", image: "/skills/python.webp" },
      { id: 30, name: "Linux", image: "/skills/linux.webp" }
    ],
    options: [
      "Developed and maintained a Bluetooth Low Energy driver library to support IoT applications.",
      "Optimized installation processes on Linux servers with Python scripting, improving deployment efficiency by 20%."
    ],
  },
];
export default data;

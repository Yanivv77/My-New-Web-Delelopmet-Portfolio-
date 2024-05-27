export interface Contact {
  id: number;
  name: string;
  label: string;
  link: string;
}

const data: Contact[] = [
  {
    id: 1,
    name: "github",
    label: "github",
    link: "http://github.com/yanivv77",
  },
  {
    id: 2,
    name: "linkedin",
    label: "linkedin",
    link: "http://linkedin.com/in/yanivv77",
  },
  {
    id: 3,
    name: "email",
    label: "email",
    link: "mailto:Yanivv77@gmail.com",
  },
  {
    id: 4,
    name: "cv",
    label: "download cv",
    link: "/files/FullStack_Developer_Yaniv_Bialik_CV.docx",
  },
];

export default data;

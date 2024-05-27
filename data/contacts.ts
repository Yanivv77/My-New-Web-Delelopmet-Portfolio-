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
    link: "http://github.com/username",
  },
  {
    id: 2,
    name: "linkedin",
    label: "linkedin",
    link: "http://linkedin.com/username",
  },
  {
    id: 3,
    name: "email",
    label: "email",
    link: "mailto:email@gmail.com",
  },
  {
    id: 4,
    name: "cv",
    label: "download cv",
    link: "/files/cv.pdf",
  },
];

export default data;

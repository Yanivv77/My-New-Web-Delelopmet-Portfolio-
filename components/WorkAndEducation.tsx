'use client'

import { useState } from 'react'
import Image from "next/image"
import Heading from "./Heading"
import SectionWrapper from "./SectionWrapper"
import data from "../data/work"
import educationData from "../data/education" // Assuming you have this data file
import SkillComponent from "./SkillComponent"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Define the interfaces
interface Skill {
  id: number
  name: string
  image: string
}

interface Work {
  id: number
  image: string
  company: string
  role: string
  date: string
  skills: Skill[]
  options?: string[]
}

interface Education {
  id: number
  image: string
  institution: string
  degree: string
  date: string
  description?: string
}

const WorkHistory = ({ data }: { data: Work[] }) => (
  <>
    {data.map((work: Work) => (
      <Card key={work.id} className="mt-6">
        <CardContent className="flex gap-x-8 p-6">
          <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden border dark:border-zinc-700 flex-shrink-0">
            <Image
              src={work.image}
              fill
              className="rounded-full object-cover border-2 border-cyan-500"
              alt={`${work.company} Logo`}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg text-textwhite-100 font-bold">{work.role}</h3>
            <span className="text-sm font-medium text-muted-foreground">{work.company}</span>
            <div className="text-sm text-muted-foreground mt-1">{work.date}</div>
            {work.skills && (
              <div className="flex gap-2 flex-wrap my-2">
                {work.skills.map((skill, index) => (
                  <SkillComponent key={index} skill={skill} />
                ))}
              </div>
            )}
            {work.options && (
              <ul className="list-disc pl-5 space-y-2 mt-2">
                {work.options.map((option: string, index: number) => (
                  <li key={index} className="text-sm">{option}</li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    ))}
  </>
)

const Education = ({ data }: { data: Education[] }) => (
  <>
    {data.map((edu: Education) => (
      <Card key={edu.id} className="mt-6">
        <CardContent className="flex gap-x-8 p-6">
          <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden border dark:border-zinc-700 flex-shrink-0">
            <Image
              src={edu.image}
              fill
              className="rounded-full object-cover border-2 border-cyan-500"
              alt={`${edu.institution} Logo`}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg text-textwhite-100 font-bold">{edu.degree}</h3>
            <span className="text-sm font-medium text-muted-foreground">{edu.institution}</span>
            <div className="text-sm text-muted-foreground mt-1">{edu.date}</div>
            {edu.description && <p className="mt-2 text-textwhite-100 text-sm">{edu.description}</p>}
          </div>
        </CardContent>
      </Card>
    ))}
  </>
)

export default function WorkAndEducation() {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work')

  return (
    <SectionWrapper>
      <div className="mb-10 relative z-999">
        <Heading>Experience and Education</Heading>
        <div className="flex space-x-2 mt-4 mb-6">
          <Button
            variant={activeTab === 'work' ? 'default' : 'outline'}
            onClick={() => setActiveTab('work')}
          >
            Work History
          </Button>
          <Button
            variant={activeTab === 'education' ? 'default' : 'outline'}
            onClick={() => setActiveTab('education')}
          >
            Education
          </Button>
        </div>
        {activeTab === 'work' ? (
          <WorkHistory data={data} />
        ) : (
          <Education data={educationData} />
        )}
      </div>
    </SectionWrapper>
  )
}
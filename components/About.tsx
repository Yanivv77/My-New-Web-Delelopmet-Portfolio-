'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import SectionWrapper from "./SectionWrapper"
import data from "../data/about"
import Contacts from './Contacts'

const About = () => {
  return (
    <SectionWrapper>
      <Card className="w-full overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700">
        <CardContent className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-8">
            <motion.div 
              className="md:w-1/3 flex justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <Image
                  src="/about.jpg"
                  alt="Portfolio"
                  fill
                  className="rounded-full object-cover border-4 border-cyan-500 shadow-lg shadow-cyan-500/50"
                />
              </div>
            </motion.div>
            <motion.div 
              className="md:w-2/3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
              <p className="text-base md:text-lg text-zinc-300 mb-6 leading-relaxed">
                {data.bio}
              </p>
              <div className="flex flex-wrap gap-4">
               
              </div>
              <div className="flex justify-center relative mb-5 z-10">
                <Contacts />
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </SectionWrapper>
  )
}

export default About
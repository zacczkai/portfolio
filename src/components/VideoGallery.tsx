"use client";

import { motion } from "framer-motion";

export default function VideoGallery() {
  const placeholders = [1, 2, 3]; // Simulating 3 videos

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Meu <span className="text-purple-500">Trabalho</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Uma seleção das melhores campanhas e vídeos produzidos. (Placeholders enquanto não temos os links do YouTube)
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {placeholders.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800"
          >
            <div className="aspect-video w-full bg-zinc-800 flex items-center justify-center">
              {/* Here we will put the YouTube iframe later */}
              <p className="text-zinc-500 font-mono text-sm">[ Vídeo do YouTube {item} ]</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                Campanha Exemplo {item}
              </h3>
              <p className="text-gray-500 text-sm">
                Descrição breve sobre o desafio e a solução criativa deste projeto.
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

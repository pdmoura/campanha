import { motion } from "framer-motion";

export function Sobre() {
  return (
    <section id="sobre" className="pt-32 pb-16 md:pt-40 md:pb-24 min-h-[100dvh] flex flex-col justify-center bg-foreground/5 snap-start snap-always">
      <div className="mx-auto max-w-7xl px-4 w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-5/12"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative aspect-square lg:aspect-[4/5] bg-white">
              <img 
                src="/candidato-family.jpeg" 
                alt="Rodolfo de Ramos e Família" 
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-7/12 space-y-4 lg:space-y-6"
          >
            <div>
              <p className="font-bold text-xs tracking-widest text-[var(--sc-green)] uppercase mb-1 lg:mb-2">
                Conheça a história
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[var(--pt-red)]">
                Sobre o Rodolfo
              </h2>
            </div>
            
            <div className="space-y-3 lg:space-y-4 text-foreground/80 text-base lg:text-[1.05rem] leading-relaxed lg:leading-[1.6]">
              <p>
                <strong>Rodolfo de Ramos, 45 anos, casado e pai de três filhos.</strong> Filho de agricultores, nasceu em Salto do Lontra (PR). Mudou-se para Joinville, SC no ano 2000 e há 22 anos mora no bairro Ulisses Guimarães, onde construiu sua história de vida, trabalho e compromisso com a comunidade.
              </p>
              <p>
                Formou-se Técnico Ferramenteiro pelo SENAI. É torneiro mecânico, técnico em ferramentaria e trabalhador da Metalúrgica Tupy S.A., onde atua há 23 anos.
              </p>
              <p>
                Em 2012, foi eleito dirigente sindical, assumindo a função de vice-presidente do Sindicato dos Trabalhadores Metalúrgicos de Joinville. Em 2016, foi eleito presidente do sindicato, sendo reeleito em 2020 e 2024, exercendo atualmente seu terceiro mandato, sempre com compromisso na defesa dos direitos dos trabalhadores e trabalhadoras.
              </p>
              <p>
                Também atua na vida pública e comunitária, integrando o Conselho Municipal de Emprego, Renda e Trabalho. No bairro onde mora, já contribuiu nos conselhos de saúde e segurança, além de exercer liderança religiosa na comunidade católica Santa Paulina, onde atuou como tesoureiro, ministro da eucaristia e ministro da palavra.
              </p>
              <p className="font-semibold text-foreground p-3 lg:p-4 bg-white rounded-xl shadow-sm border border-foreground/5">
                Rodolfo construiu sua trajetória com base no trabalho, na fé e no compromisso com as pessoas, sempre defendendo melhores condições de vida para os trabalhadores e suas famílias.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

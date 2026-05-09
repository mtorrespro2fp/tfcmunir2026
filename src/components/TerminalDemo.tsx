import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const commands = [
  { text: "neoflow init --business local", delay: 1000 },
  { output: "[i] Conectando con NeoFlow Core...", delay: 2000, type: "info" },
  { output: "✓ Agente IA desplegado correctamente", delay: 3500, type: "success" },
  { output: "✓ Base de datos sincronizada (PostgreSQL)", delay: 4200, type: "success" },
  { output: "✓ Flujos de n8n configurados", delay: 5000, type: "success" },
  { output: "✓ Interfaz frontend generada y optimizada", delay: 6000, type: "success" },
  { output: "🚀 Todo listo. Tu negocio está ahora pilotado por IA.", delay: 7500, type: "highlight" },
];

export const TerminalDemo = () => {
  const [lines, setLines] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    let timeoutIds: NodeJS.Timeout[] = [];
    
    // Animate typing for the first command
    const firstCommand = commands[0].text;
    if (firstCommand) {
      setIsTyping(true);
      for (let i = 0; i <= firstCommand.length; i++) {
        const id = setTimeout(() => {
          setInputText(firstCommand.slice(0, i));
          if (i === firstCommand.length) {
            setIsTyping(false);
            setLines([{ type: "command", text: firstCommand }]);
            setInputText("");
          }
        }, 800 + i * 50);
        timeoutIds.push(id);
      }
    }

    // Schedule the rest of the lines
    const commandDelayOffset = 800 + (firstCommand?.length || 0) * 50 + 500;
    
    commands.slice(1).forEach((cmd) => {
      const id = setTimeout(() => {
        setLines((prev) => [...prev, cmd]);
      }, commandDelayOffset + cmd.delay - 1000);
      timeoutIds.push(id);
    });

    return () => timeoutIds.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full h-full bg-[#0D1117] rounded-2xl overflow-hidden font-mono flex flex-col border border-brand-primary/20 shadow-2xl">
      {/* Mac-style Window Header */}
      <div className="flex items-center px-4 py-3 bg-[#1C2833] border-b border-brand-primary/20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="mx-auto text-xs text-brand-fg/50 tracking-wider">
          admin@neoflow: ~
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-6 text-sm flex-1 overflow-auto text-left space-y-3">
        {lines.map((line, idx) => (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            key={idx}
            className="flex items-start gap-3"
          >
            {line.type === "command" ? (
              <>
                <span className="text-brand-primary font-bold">➜</span>
                <span className="text-brand-fg">{line.text}</span>
              </>
            ) : (
              <span
                className={`
                  ${line.type === "success" ? "text-green-400" : ""}
                  ${line.type === "info" ? "text-blue-400" : ""}
                  ${line.type === "highlight" ? "text-yellow-400 font-bold mt-4 block" : ""}
                `}
              >
                {line.output}
              </span>
            )}
          </motion.div>
        ))}

        {/* Current Prompt Line */}
        {isTyping && (
          <div className="flex items-center gap-3">
            <span className="text-brand-primary font-bold">➜</span>
            <span className="text-brand-fg">
              {inputText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-brand-primary ml-1 align-middle"
              />
            </span>
          </div>
        )}
        
        {!isTyping && lines.length > 0 && (
          <div className="flex items-center gap-3 pt-2">
            <span className="text-brand-primary font-bold">➜</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-4 bg-brand-primary align-middle"
            />
          </div>
        )}
      </div>
    </div>
  );
};

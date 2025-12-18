"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Edit2, Info } from "lucide-react";

// Carrega o Avatar apenas no cliente para evitar erros do servidor
const Avatar3D = dynamic(() => import("./Avatar3D"), { ssr: false });

export default function ProvadorVirtual() {
  const [step, setStep] = useState(1); // 1: Dados, 2: Ajuste, 3: Resultado

  // Estado único para os dados do formulário
  const [formData, setFormData] = useState({
    altura: 175,
    peso: 80,
    idade: 30,
    toraxAdj: 0,
    cinturaAdj: 0,
    quadrilAdj: 0,
  });

  const updateForm = (key: string, value: number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Lógica de cálculo (Simulada)
  const calcularTamanho = () => {
    let baseSize = 46;

    if (formData.peso > 115) baseSize = 60;
    else if (formData.peso > 105) baseSize = 58;
    else if (formData.peso > 95) baseSize = 56;
    else if (formData.peso > 85) baseSize = 54;
    else if (formData.peso > 78) baseSize = 52;
    else if (formData.peso > 70) baseSize = 50;
    else if (formData.peso > 62) baseSize = 48;
    
    // Ajuste fino dos sliders
    if (formData.toraxAdj > 2) {
        baseSize += 2;
    }

    return {
        paleto: baseSize,
        calca: baseSize - 6 // Drop 6
    };
  };

  const tamanho = calcularTamanho();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-5xl h-[650px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* --- LADO ESQUERDO: Visualização --- */}
        <div className="w-full md:w-1/2 bg-gray-100 relative h-1/2 md:h-full">
          {step === 1 ? (
             // Tela Inicial
             <div className="h-full w-full bg-[#0a1a2f] flex items-center justify-center text-white relative overflow-hidden">
                <div className="text-center p-10 z-20 relative">
                    <div className="mb-6 inline-block p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                        <span className="text-2xl font-serif tracking-widest">V</span>
                    </div>
                    <h2 className="text-4xl font-serif mb-2 tracking-wide">4K Ternos</h2>
                    <img src="terno.jpg" />
                </div>
             </div>
          ) : (
             // Tela 2 e 3: Avatar 3D
             <div className="h-full w-full bg-gradient-to-b from-gray-200 to-white relative">
                 <Avatar3D 
                    dados={formData} 
                    showLines={step === 3} 
                 />
                 
                 {step === 3 && (
                     <div className="absolute top-1/2 right-6 transform -translate-y-1/2 space-y-6 z-10 pointer-events-none">
                         <FitIndicator label="Peito" status="Caimento Regular" />
                         <FitIndicator label="Cintura" status="Slim Fit" />
                         <FitIndicator label="Quadril" status="Confortável" />
                     </div>
                 )}
             </div>
          )}
        </div>

        {/* --- LADO DIREITO: UI --- */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between h-1/2 md:h-full overflow-y-auto">
          
          <div>
            <div className="flex items-center gap-2 mb-4">
                <span className="bg-red-700 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider">PROVADOR VIRTUAL</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {step === 1 && "Vamos começar"}
                {step === 2 && "Ajuste Fino"}
                {step === 3 && "Sua Medida"}
            </h1>
            
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              {step === 1 && "Insira suas medidas básicas para criar seu manequim."}
              {step === 2 && "Arraste os pontos para ajustar a silhueta ao seu corpo real."}
              {step === 3 && "Selecionamos o corte ideal para elegância e conforto."}
            </p>
          </div>

          <div className="flex-1 py-2">
            
            {/* ETAPA 1 */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <InputGroup label="Altura" suffix="cm" value={formData.altura} onChange={(v: number) => updateForm('altura', v)} />
                <InputGroup label="Peso" suffix="kg" value={formData.peso} onChange={(v: number) => updateForm('peso', v)} />
                <InputGroup label="Idade" suffix="anos" value={formData.idade} onChange={(v: number) => updateForm('idade', v)} icon />
              </div>
            )}

            {/* ETAPA 2 */}
            {step === 2 && (
              <div className="space-y-8 animate-fade-in">
                 <RangeControl label="Tórax" value={formData.toraxAdj} onChange={(v: number) => updateForm('toraxAdj', v)} />
                 <RangeControl label="Cintura" value={formData.cinturaAdj} onChange={(v: number) => updateForm('cinturaAdj', v)} />
                 <RangeControl label="Quadril" value={formData.quadrilAdj} onChange={(v: number) => updateForm('quadrilAdj', v)} />
                 <p className="text-center text-xs text-gray-400 mt-6">Arraste a bolinha ou use os botões +/-</p>
              </div>
            )}

            {/* ETAPA 3 */}
            {step === 3 && (
              <div className="flex flex-col items-center justify-center h-full animate-fade-in bg-gray-50 rounded-lg border border-gray-100 p-6">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Tamanho Recomendado</p>
                  
                  <div className="flex items-end gap-3 mb-8">
                      <div className="flex flex-col items-center">
                        <span className="text-5xl font-black text-gray-800">{tamanho.paleto}</span>
                        <span className="text-xs text-gray-400 uppercase mt-1">Paletó</span>
                      </div>
                      <span className="text-3xl text-gray-300 font-light mb-4">/</span>
                      <div className="flex flex-col items-center">
                        <span className="text-4xl font-bold text-gray-600 mb-1">{tamanho.calca}</span>
                        <span className="text-xs text-gray-400 uppercase mt-1">Calça</span>
                      </div>
                  </div>

                  <button 
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-blue-600 border border-gray-200 hover:border-blue-200 bg-white px-5 py-2.5 rounded-full transition-all shadow-sm"
                  >
                    <Edit2 size={12} /> Refinar Medidas
                  </button>
              </div>
            )}

          </div>

          {/* NAVEGAÇÃO */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
            {step > 1 && (
                <button 
                    onClick={() => setStep(step - 1)}
                    className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-lg text-sm uppercase tracking-wide"
                >
                    Voltar
                </button>
            )}
            
            {step < 3 ? (
                <button 
                    onClick={() => setStep(step + 1)}
                    className="flex-1 bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2 uppercase tracking-wide shadow-lg"
                >
                    Próximo <ArrowRight size={16} />
                </button>
            ) : (
                <button 
                  onClick={() => {
                      // Cria a mensagem personalizada com os dados do tamanho
                      const mensagem = `Olá André! Fiz a simulação no Provador Virtual. \nMinha sugestão foi: Paletó ${tamanho.paleto} e Calça ${tamanho.calca}. \nGostaria de finalizar a compra!`;
                      
                      // Codifica a mensagem para URL e abre o WhatsApp
                      // 55 = Brasil, 17 = DDD
                      const url = `https://wa.me/5517997614534?text=${encodeURIComponent(mensagem)}`;
                      
                      window.open(url, '_blank');
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg text-sm uppercase tracking-wide shadow-green-200 shadow-lg flex items-center justify-center gap-2"
              >
                  Falar com André
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTES DE UI ---

function InputGroup({ label, suffix, value, onChange, icon }: any) {
    return (
        <div className="group">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 tracking-wide group-focus-within:text-black">{label}</label>
            <div className="relative">
                <input 
                    type="number" 
                    value={value} 
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="w-full border-b border-gray-300 bg-transparent py-2 text-2xl font-medium text-gray-800 focus:border-black focus:outline-none transition-all placeholder-gray-200"
                    placeholder="0"
                />
                <span className="absolute right-0 bottom-3 text-gray-400 text-sm font-medium">{suffix}</span>
                {icon && <Info className="absolute right-10 bottom-3 text-gray-300 hover:text-gray-500 cursor-help" size={16} />}
            </div>
        </div>
    )
}

function RangeControl({ label, value, onChange }: any) {
    const percentage = ((value + 5) / 10) * 100;
    return (
        <div className="flex items-center gap-4 select-none">
            <button 
                onClick={() => onChange(Math.max(-5, value - 1))} 
                className="w-10 h-10 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 text-xl font-medium"
            >
                -
            </button>
            <div className="flex-1 flex flex-col items-center gap-2 relative">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
                <div className="w-full h-8 relative flex items-center">
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden"></div>
                    <div 
                        className="absolute h-4 w-4 bg-black rounded-full shadow-md pointer-events-none transition-all duration-100 ease-out"
                        style={{ left: `calc(${percentage}% - 8px)` }}
                    />
                    <input 
                        type="range" min={-5} max={5} step={1} value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                </div>
                <div className="w-full flex justify-between px-1">
                   <div className="w-px h-1 bg-gray-300"></div>
                   <div className="w-px h-1 bg-gray-300"></div>
                   <div className="w-px h-1 bg-gray-300"></div>
                </div>
            </div>
            <button 
                onClick={() => onChange(Math.min(5, value + 1))} 
                className="w-10 h-10 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 text-xl font-medium"
            >
                +
            </button>
        </div>
    )
}

function FitIndicator({ label, status }: any) {
    return (
        <div className="flex items-center gap-3 justify-end group cursor-default">
            <div className="text-right bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg border border-white shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase">{label}</p>
                <p className="text-xs font-bold text-green-700">{status}</p>
            </div>
            <div className="relative flex items-center justify-center w-4 h-4">
                <div className="absolute w-full h-full rounded-full bg-green-500 opacity-20 animate-ping"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-md border border-white"></div>
            </div>
        </div>
    )
}